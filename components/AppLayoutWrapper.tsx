'use client';

import { usePathname } from 'next/navigation';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import MobileNav from './MobileNav';
import { ReactNode } from 'react';

export default function AppLayoutWrapper({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isAuthPage = pathname?.startsWith('/auth');

  if (isAuthPage) {
    return (
      <main className="w-full min-h-screen bg-slate-50 relative">
        {children}
      </main>
    );
  }

  return (
    <>
      {/* Sidebar - only visible on large screens */}
      <Sidebar />

      <main className="flex-1 w-full min-w-0 flex flex-col h-screen overflow-hidden relative">
        {/* Topbar: has left padding on mobile to clear hamburger */}
        <Topbar />

        <div className="flex-1 overflow-y-auto w-full">
          {/* Extra bottom padding on mobile for the bottom nav bar */}
          <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-12 py-4 sm:py-6 lg:py-10 pb-20 lg:pb-10">
            {children}
          </div>
        </div>
      </main>

      {/* Mobile bottom navigation bar */}
      <MobileNav />
    </>
  );
}
