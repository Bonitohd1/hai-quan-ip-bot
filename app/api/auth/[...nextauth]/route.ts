import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import type { NextAuthOptions } from 'next-auth';
import prisma from '@/lib/prisma';

const options: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID ?? '',
      clientSecret: process.env.GOOGLE_SECRET ?? '',
    }),
  ],
  pages: {
    signIn: '/auth/signin',
  },
  callbacks: {
    async signIn({ user }) {
      if (!user.email) return false;
      try {
        // Upsert profile on first login
        await (prisma as any).userProfile.upsert({
          where: { email: user.email },
          create: {
            email: user.email,
            fullName: user.name ?? null,
            avatarUrl: user.image ?? null,
            role: 'VIEWER',
            isActive: true,
            lastLoginAt: new Date(),
          },
          update: {
            lastLoginAt: new Date(),
            avatarUrl: user.image ?? null,
          },
        });
      } catch {
        // Non-fatal: let sign in proceed even if DB write fails
      }
      return true;
    },

    async jwt({ token, account }) {
      if (account) {
        (token as any).accessToken = account.access_token;
      }
      // Refresh profile from DB on each token creation
      if (token.email) {
        try {
          const profile = await (prisma as any).userProfile.findUnique({
            where: { email: token.email },
          });
          if (profile) {
            token.role = profile.role as 'VIEWER' | 'OFFICER' | 'ADMIN';
            token.fullName = profile.fullName;
            token.employeeId = profile.employeeId;
            token.unit = profile.unit;
            token.department = profile.department;
            token.position = profile.position;
            token.phoneInternal = profile.phoneInternal;
          }
        } catch {
          token.role = 'VIEWER';
        }
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        (session.user as any).accessToken = (token as any).accessToken;
        session.user.role = (token.role ?? 'VIEWER') as 'VIEWER' | 'OFFICER' | 'ADMIN';
        session.user.fullName = token.fullName as string | null | undefined;
        session.user.employeeId = token.employeeId as string | null | undefined;
        session.user.unit = token.unit as string | null | undefined;
        session.user.department = token.department as string | null | undefined;
        session.user.position = token.position as string | null | undefined;
        session.user.phoneInternal = token.phoneInternal as string | null | undefined;
      }
      return session;
    },
  },
};

const handler = NextAuth(options);

export const GET = handler;
export const POST = handler;
