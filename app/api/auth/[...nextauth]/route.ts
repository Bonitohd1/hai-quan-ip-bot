import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import type { NextAuthOptions } from 'next-auth';
import type { NextRequest } from 'next/server';

// Lightweight non-secret logging to help debug environment/config issues in Vercel logs
console.log('NextAuth env presence', {
  GOOGLE_ID: !!process.env.GOOGLE_ID,
  NEXTAUTH_URL: !!process.env.NEXTAUTH_URL,
  NEXTAUTH_SECRET: !!process.env.NEXTAUTH_SECRET,
});

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
    async jwt({ token, account }) {
      if (account) {
        (token as any).accessToken = (account as any).access_token;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).accessToken = (token as any).accessToken;
      }
      return session;
    },
  },
};

const handler = NextAuth(options);

export async function GET(request: NextRequest) {
  return handler(request);
}

export async function POST(request: NextRequest) {
  return handler(request);
}