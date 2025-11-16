'use client';

import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { useState } from 'react';

export default function UserMenuButton() {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);

  if (!session) {
    return (
      <Link
        href="/auth/signin"
        className="bg-yellow-500 text-blue-900 px-6 py-2 rounded-lg font-semibold hover:bg-yellow-400 transition"
      >
        ➜ Đăng nhập
      </Link>
    );
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-yellow-500 text-blue-900 px-6 py-2 rounded-lg font-semibold hover:bg-yellow-400 transition flex items-center gap-2"
      >
        👤 {session.user?.name?.split(' ')[0]}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
          <div className="px-4 py-3 border-b border-gray-200">
            <p className="text-sm font-semibold text-gray-800">{session.user?.name}</p>
            <p className="text-xs text-gray-500">{session.user?.email}</p>
          </div>
          <button
            onClick={() => signOut({ callbackUrl: '/auth/signin' })}
            className="w-full text-left px-4 py-3 text-red-600 hover:bg-red-50 font-semibold transition"
          >
            🚪 Đăng xuất
          </button>
        </div>
      )}
    </div>
  );
}
