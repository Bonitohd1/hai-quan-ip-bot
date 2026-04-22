'use client';

import Link from 'next/link';
import { LOGO_HQ_BASE64 } from '../lib/logoBase64';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import {
  Home, Search, FileText, History, BarChart3,
  Menu, X, Shield, ChevronRight, UserCircle, BookMarked, Workflow
} from 'lucide-react';

const NAV_ITEMS = [
  { label: 'Tổng quan', icon: Home, href: '/' },
  { label: 'Tra cứu hồ sơ', icon: Search, href: '/tra-cuu' },
  { label: 'Hồ sơ bảo hộ', icon: BookMarked, href: '/ho-so-bao-ho' },
  { label: 'Quy trình xử lý', icon: Workflow, href: '/quy-trinh-xu-ly' },
  { label: 'Văn bản pháp luật', icon: FileText, href: '/van-ban-phap-luat' },
  { label: 'Lịch sử SHTT', icon: History, href: '/lich-su-shtt' },
  { label: 'Báo cáo thống kê', icon: BarChart3, href: '/thong-ke-shtt' },
];

const USER_ITEMS = [
  { label: 'Tài khoản cá nhân', icon: UserCircle, href: '/tai-khoan' },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <>
      {/* Hamburger button hidden on mobile - MobileNav handles navigation */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="hidden"
        aria-hidden="true"
      >
        {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {mobileOpen && (
        <div 
          className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-40 lg:hidden transition-all" 
          onClick={() => setMobileOpen(false)} 
        />
      )}

      <aside className={`
        fixed top-0 left-0 h-screen z-40 w-[270px]
        bg-[#090e17] text-slate-300
        flex flex-col border-r border-[#1a2333]
        shadow-[4px_0_24px_rgba(0,0,0,0.5)]
        transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]
        lg:translate-x-0 lg:sticky lg:shadow-none
        ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        {/* Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-48 bg-amber-500/5 rounded-full blur-[80px] pointer-events-none" />

        {/* BRANDING */}
        <div className="px-6 pt-6 pb-2 relative z-10 flex-shrink-0">
          <div className="flex flex-col items-center text-center mb-5 relative group cursor-pointer transition-transform duration-300 hover:scale-[1.02] border border-slate-700/60 rounded-2xl px-4 py-4 hover:border-amber-500/30 transition-colors">
            {/* Logo — no ring */}
            <div className="relative mb-3">
              <div className="w-16 h-16 bg-[#0d1421] rounded-2xl flex items-center justify-center overflow-hidden relative shadow-lg">
                <div className="absolute inset-x-0 -top-2 h-4 bg-white/5 blur-sm" />
                <img src={LOGO_HQ_BASE64} alt="HQ Logo" width={44} height={44} className="object-contain relative z-10" />
              </div>
            </div>
            {/* Text — ALL CAPS */}
            <h1 className="text-[12px] font-black tracking-wide text-white leading-snug uppercase px-1">
              SỔ TAY TRA CỨU THÔNG TIN<br/>SỞ HỮU TRÍ TUỆ
            </h1>
            <p className="text-[9px] font-black mt-1.5 tracking-[0.18em] uppercase text-amber-500/90 drop-shadow-[0_0_8px_rgba(245,158,11,0.5)]">
              TRONG LĨNH VỰC HẢI QUAN
            </p>
          </div>
          <div className="w-full h-px bg-gradient-to-r from-transparent via-slate-700/50 to-transparent" />
        </div>

        {/* NAVIGATION */}
        <nav className="flex-1 px-4 mt-4 space-y-1 overflow-y-auto relative z-10">
          <div className="px-3 mb-3 mt-2">
             <span className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-slate-400">Nghiệp vụ cốt lõi</span>
          </div>
          
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`
                  group flex items-center justify-between px-3.5 py-3.5 rounded-xl text-[13px] font-bold tracking-wide transition-all duration-300 relative overflow-hidden mb-1
                  ${isActive 
                    ? 'text-amber-400 bg-slate-800/80 shadow-[0_0_20px_rgba(0,0,0,0.2)] ring-1 ring-slate-700/50' 
                    : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/40'
                  }
                `}
              >
                {isActive && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-amber-400 to-amber-600 rounded-r-lg shadow-[0_0_12px_rgba(245,158,11,0.8)]" />
                )}
                <div className="absolute inset-0 bg-gradient-to-r from-slate-800/0 via-slate-800/60 to-slate-800/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out" />
                
                <div className="flex items-center gap-3.5 relative z-10">
                  <Icon className={`w-[18px] h-[18px] transition-all duration-300 ${isActive ? 'text-amber-400 drop-shadow-[0_0_5px_rgba(245,158,11,0.5)]' : 'text-slate-500 group-hover:text-amber-200'}`} />
                  {item.label}
                </div>
                {isActive && <ChevronRight className="w-4 h-4 text-amber-500/50 relative z-10" />}
              </Link>
            );
          })}
        </nav>

        {/* SYSTEM STATUS */}
        <div className="p-4 relative z-10">
          <div className="px-3 mb-3">
             <span className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-slate-400">Hệ thống</span>
          </div>

          {USER_ITEMS.map((item) => {
             const Icon = item.icon;
             return (
              <Link
                key={item.href}
                href={item.href}
                className="group flex items-center gap-3.5 px-3.5 py-3 rounded-xl text-[13px] font-bold tracking-wide text-slate-400 hover:text-white hover:bg-slate-800/40 transition-all duration-300 relative overflow-hidden mb-4"
              >
                 <div className="absolute inset-0 bg-gradient-to-r from-slate-800/0 via-slate-800/50 to-slate-800/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out" />
                 <Icon className="w-[18px] h-[18px] text-slate-500 group-hover:text-blue-400 transition-colors relative z-10" />
                 <span className="relative z-10">{item.label}</span>
              </Link>
             )
          })}

          <div className="bg-[#0f172a] border border-[#1e293b] rounded-2xl p-4 flex flex-col items-center relative overflow-hidden group hover:border-[#334155] transition-colors cursor-default shadow-lg gap-2">
            <div className="absolute left-1/2 top-6 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-emerald-500/20 animate-ping" />
            <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center shrink-0 border border-emerald-500/30 relative z-10">
              <Shield className="w-4 h-4 text-emerald-400 drop-shadow-[0_0_5px_rgba(52,211,153,0.5)]" />
            </div>
            <div className="relative z-10 text-center">
              <h4 className="text-[12px] font-black text-slate-200 tracking-wide uppercase">Bảo vệ</h4>
              <p className="text-[10px] font-bold tracking-widest uppercase text-emerald-400 flex items-center justify-center gap-1.5 mt-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-[pulse_1.5s_ease-in-out_infinite] shadow-[0_0_5px_rgba(52,211,153,0.8)]" />
                Sản phẩm &amp; Trí tuệ
              </p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
