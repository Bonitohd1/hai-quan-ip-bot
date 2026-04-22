import 'next-auth';
import 'next-auth/jwt';

declare module 'next-auth' {
  interface Session {
    user: {
      name?: string | null;
      email?: string | null;
      image?: string | null;
      role: 'VIEWER' | 'OFFICER' | 'ADMIN';
      fullName?: string | null;
      employeeId?: string | null;
      unit?: string | null;
      department?: string | null;
      position?: string | null;
      phoneInternal?: string | null;
    };
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    role?: 'VIEWER' | 'OFFICER' | 'ADMIN';
    fullName?: string | null;
    employeeId?: string | null;
    unit?: string | null;
    department?: string | null;
    position?: string | null;
    phoneInternal?: string | null;
  }
}
