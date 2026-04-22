import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import prisma from '@/lib/prisma';

export async function GET() {
  const session = await getServerSession();
  if (!session?.user?.email) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const profile = await (prisma as any).userProfile.findUnique({
    where: { email: session.user.email },
  });
  return NextResponse.json(profile ?? {});
}

export async function PATCH(req: NextRequest) {
  const session = await getServerSession();
  if (!session?.user?.email) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await req.json();
  const allowed = ['fullName', 'employeeId', 'unit', 'department', 'position', 'phoneInternal'];
  const data: Record<string, string> = {};
  for (const key of allowed) {
    if (key in body) data[key] = body[key];
  }

  const updated = await (prisma as any).userProfile.update({
    where: { email: session.user.email },
    data,
  });
  return NextResponse.json(updated);
}
