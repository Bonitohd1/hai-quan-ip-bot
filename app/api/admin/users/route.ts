import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import prisma from '@/lib/prisma';

async function requireAdmin() {
  const session = await getServerSession();
  if (!session?.user?.email) return null;
  const profile = await (prisma as any).userProfile.findUnique({ where: { email: session.user.email } });
  return profile?.role === 'ADMIN' ? profile : null;
}

export async function GET() {
  if (!await requireAdmin()) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  const users = await (prisma as any).userProfile.findMany({ orderBy: { createdAt: 'desc' } });
  return NextResponse.json(users);
}

export async function PATCH(req: NextRequest) {
  if (!await requireAdmin()) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

  const { id, role, isActive } = await req.json();
  if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 });

  const allowed = ['VIEWER', 'OFFICER', 'ADMIN'];
  const data: Record<string, unknown> = {};
  if (role && allowed.includes(role)) data.role = role;
  if (typeof isActive === 'boolean') data.isActive = isActive;

  const updated = await (prisma as any).userProfile.update({ where: { id }, data });
  return NextResponse.json(updated);
}
