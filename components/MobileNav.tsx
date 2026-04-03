'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Search, FileText, BarChart3 } from 'lucide-react';

const TABS = [
  { label: 'Tổng quan', icon: Home, href: '/' },
  { label: 'Tra cứu', icon: Search, href: '/tra-cuu' },
  { label: 'Văn bản', icon: FileText, href: '/van-ban-phap-luat' },
  { label: 'Thống kê', icon: BarChart3, href: '/thong-ke-shtt' },
];

export default function MobileNav() {
  const pathname = usePathname();

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-[9998] bg-white/95 backdrop-blur-2xl border-t border-slate-200 shadow-[0_-4px_30px_rgba(0,0,0,0.08)]">
      {/* Safe area support for iPhone */}
      <div className="flex items-stretch h-16 pb-safe">
        {TABS.map((tab) => {
          const isActive = pathname === tab.href;
          const Icon = tab.icon;
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={`flex-1 flex flex-col items-center justify-center gap-1 pt-2 pb-1 relative transition-all duration-200 ${
                isActive ? 'text-blue-900' : 'text-slate-400'
              }`}
            >
              {/* Active indicator bar */}
              {isActive && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-[3px] bg-blue-900 rounded-b-full" />
              )}

              {/* Icon */}
              <div className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-200 ${
                isActive
                  ? 'bg-blue-900 shadow-md shadow-blue-900/30'
                  : 'bg-transparent'
              }`}>
                <Icon className={`w-4 h-4 transition-colors ${isActive ? 'text-white' : 'text-slate-400'}`} />
              </div>

              {/* Label */}
              <span className={`text-[10px] font-black uppercase tracking-widest transition-colors ${
                isActive ? 'text-blue-900' : 'text-slate-400'
              }`}>
                {tab.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
