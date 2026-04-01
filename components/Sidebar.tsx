'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { 
  Bot, 
  History, 
  FileText, 
  Search, 
  BarChart3, 
  BookOpen, 
  Menu, 
  X,
  Sparkles,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';

export default function Sidebar() {
  const pathname = usePathname();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    setIsMobileOpen(false);
  }, [pathname]);

  const menuItems = [
    { id: 'trợ lý shtt', label: 'Trợ lý SHTT', subLabel: '3 trợ lý', icon: Bot, href: '/', activeIcon: true },
    { id: 'lịch sử shtt', label: 'Lịch sử SHTT', subLabel: '3 trợ lý', icon: History, href: '/lich-su-shtt' },
    { id: 'văn bản pháp luật', label: 'Văn Bản Pháp Luật', subLabel: '3 trợ lý', icon: FileText, href: '/van-ban-phap-luat' },
    { id: 'tra cứu', label: 'Tra Cứu', subLabel: '3 trợ lý', icon: Search, href: '/tra-cuu' },
    { id: 'thống kê shtt', label: 'Thống Kê SHTT', subLabel: '2 trợ lý', icon: BarChart3, href: '#' },
    { id: 'quy định pháp luật', label: 'Quy Định Pháp Luật', subLabel: '6 trợ lý', icon: ShieldCheck, href: '#' },
  ];

  return (
    <>
      {/* Mobile Menu Trigger */}
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="fixed top-5 left-5 z-50 lg:hidden w-10 h-10 bg-[#1a2b56] text-white rounded-lg flex items-center justify-center shadow-lg active:scale-90"
      >
        {isMobileOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Sidebar Container */}
      <aside className={`fixed left-0 top-0 h-screen z-40 transition-transform duration-300 lg:translate-x-0 ${
        isMobileOpen ? 'translate-x-0' : '-translate-x-full'
      } w-64 bg-[#1a2b56] border-r border-white/5 flex flex-col`}>
        
        {/* Gold Accent Line (Active Indicator global) - handled item by item */}

        {/* Logo Section */}
        <div className="pt-10 pb-8 px-6 flex flex-col items-center">
          <div className="relative w-20 h-20 mb-4">
             <Image 
               src="/logoHQdaxoanen.png" 
               alt="SHTT Hải Quan" 
               fill
               className="object-contain"
             />
          </div>
          <div className="text-center">
            <h1 className="text-lg font-black text-[#facc15] tracking-tight leading-none mb-1">SHTT Hải Quan</h1>
            <p className="text-[10px] font-bold text-white uppercase tracking-wider opacity-90">Sở hữu trí tuệ Hải quan</p>
          </div>
          <div className="w-full h-[1px] bg-white/10 mt-6" />
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 px-3 space-y-1 overflow-y-auto custom-scrollbar pt-2">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            
            return (
              <Link
                key={item.id}
                href={item.href}
                className={`group flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 relative ${
                  isActive 
                    ? 'bg-white/10 text-white' 
                    : 'text-blue-200/60 hover:bg-white/5 hover:text-white'
                }`}
              >
                {/* Gold Indicator Line */}
                {isActive && (
                  <div className="absolute left-0 top-1.5 bottom-1.5 w-1 bg-[#facc15] rounded-r-full shadow-[2px_0_10px_#facc15]" />
                )}

                <div className={`p-1.5 rounded-lg transition-colors ${
                  isActive ? 'text-[#facc15]' : 'group-hover:text-[#facc15]'
                }`}>
                  <Icon size={18} strokeWidth={2.5} />
                </div>

                <div className="flex flex-col">
                  <span className="text-xs font-black tracking-tight flex items-center gap-1.5 line-clamp-1">
                    {item.label}
                    {item.activeIcon && isActive && <span className="text-[#facc15] text-[10px]">+</span>}
                  </span>
                  <span className="text-[9px] font-bold opacity-60 tracking-wider group-hover:opacity-100">{item.subLabel}</span>
                </div>

                {isActive && <div className="ml-auto w-1.5 h-1.5 bg-[#facc15] rounded-full" />}
              </Link>
            );
          })}
        </nav>

        {/* Floating Chat Status (Optional but for consistency) */}
        <div className="p-6">
          <div className="bg-yellow-500/5 rounded-2xl p-4 border border-yellow-500/10 mb-4 hidden lg:block">
            <div className="flex items-center gap-2 mb-2">
               <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
               <span className="text-[10px] font-black text-blue-200 uppercase tracking-widest">Hệ thống sẵn sàng</span>
            </div>
            <p className="text-[9px] font-bold text-blue-300 leading-tight">Mọi truy vấn SHTT đều được bảo mật và mã hóa.</p>
          </div>
        </div>

        {/* Sidebar Border Decor */}
        <div className="absolute top-0 right-0 h-full w-[2px] bg-[#facc15]" />
      </aside>

      {/* Spacer for Desktop */}
      <div className="hidden lg:block w-64 shrink-0" />
    </>
  );
}
