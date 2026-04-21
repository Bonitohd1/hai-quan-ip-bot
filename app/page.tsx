'use client';

import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import ChatBot from '@/components/ChatBot';
import Link from 'next/link';
import FireworksCanvas from '@/components/FireworksCanvas';
import {
  Search, FileText, History, BarChart3,
  AlertTriangle, ArrowRight, Sparkles, ChevronRight, FileSearch
} from 'lucide-react';
import { useEffect, useState } from 'react';

const MODULES = [
  { 
    title: 'Tra cứu Thông minh', 
    desc: 'Sử dụng AI phân tích hình ảnh, text để tìm kiếm hồ sơ nhãn hiệu, kiểu dáng.',
    href: '/tra-cuu',
    icon: Search,
    color: 'text-blue-900',
    bg: 'bg-blue-50',
    border: 'group-hover:border-blue-900',
  },
  { 
    title: 'Hệ thống Pháp lý', 
    desc: 'Hỏi đáp AI về Luật, Nghị định và Thông tư kiểm soát biên giới.',
    href: '/van-ban-phap-luat',
    icon: FileText,
    color: 'text-orange-600',
    bg: 'bg-orange-50',
    border: 'group-hover:border-orange-500',
  },
  { 
    title: 'Lịch sử & Thay đổi', 
    desc: 'Truy xuất dòng thời gian bảo hộ của một thương hiệu cụ thể.',
    href: '/lich-su-shtt',
    icon: History,
    color: 'text-blue-900',
    bg: 'bg-blue-50',
    border: 'group-hover:border-blue-900',
  },
  { 
    title: 'Báo cáo Chi tiết', 
    desc: 'Kết xuất báo cáo lượng hàng giả, vi phạm SHTT theo thời gian thực.',
    href: '/thong-ke-shtt',
    icon: BarChart3,
    color: 'text-orange-600',
    bg: 'bg-orange-50',
    border: 'group-hover:border-orange-500',
  },
];

const AI_INSIGHTS: { time: string; title: string; desc: string; type: string }[] = [];

export default function Home() {
  const { data: session } = useSession();
  const [mounted, setMounted] = useState(false);
  const [showFireworks, setShowFireworks] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!session?.user) return;
    // Detect first login: check sessionStorage flag
    const key = 'hq_greeted';
    if (!sessionStorage.getItem(key)) {
      sessionStorage.setItem(key, '1');
      setShowFireworks(true);
      setShowWelcome(true);
      setTimeout(() => setShowWelcome(false), 4000);
    }
  }, [session]);

  if (!mounted) return null;

  return (
    <>
      {/* Fireworks on first login */}
      {showFireworks && (
        <FireworksCanvas onDone={() => setShowFireworks(false)} />
      )}

      {/* Welcome toast */}
      {showWelcome && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-[9998] animate-fade-in-up">
          <div className="flex items-center gap-3 bg-[#0a192f] text-white px-6 py-3.5 rounded-2xl shadow-2xl border border-amber-500/30 backdrop-blur-xl">
            <span className="text-2xl">🎉</span>
            <div>
              <p className="font-black text-sm tracking-wide">Chào mừng trở lại!</p>
              <p className="text-xs text-slate-400 font-medium">
                {session?.user?.name ?? 'Công chức Hải quan'} — Hệ thống sẵn sàng
              </p>
            </div>
            <span className="text-2xl">🎆</span>
          </div>
        </div>
      )}

      <div className="flex flex-col min-h-screen bg-[#f1f5f9] -mx-4 sm:-mx-6 lg:-mx-12 px-4 sm:px-6 lg:px-10 py-4 sm:py-6 lg:py-0 space-y-4 sm:space-y-6 lg:space-y-8 max-w-[1600px] mx-auto font-sans">
      
      {/* ── HEADER BANNER ── */}
      <div className="animate-fade-in-up delay-100 relative bg-[#0a192f] rounded-2xl sm:rounded-3xl p-5 sm:p-8 lg:p-10 overflow-hidden shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-5 sm:gap-8 border border-slate-800">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-blue-900/40 to-transparent pointer-events-none" />
        
        <div className="relative z-10 w-full md:w-2/3">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight mb-2">
            Trợ lý thông tin về <span className="text-orange-500">Sở hữu trí tuệ</span>
          </h1>
          <p className="text-slate-400 text-sm font-semibold uppercase tracking-widest mb-3">trong lĩnh vực Hải quan</p>
          <p className="text-slate-300 text-sm lg:text-base leading-relaxed max-w-xl font-medium">
            Tra cứu thông tin SHTT bằng ngôn ngữ tự nhiên.
          </p>
        </div>

        <div className="relative z-10 w-full md:w-1/3 flex justify-start md:justify-end">
           <div className="bg-white/10 backdrop-blur-md p-2 rounded-2xl border border-white/10 w-full max-w-sm">
             <div className="relative">
                <Search className="w-5 h-5 text-white/50 absolute left-4 top-1/2 -translate-y-1/2" />
                <input 
                   type="text" 
                   placeholder="Nhập mã hồ sơ / nhãn hiệu / luật..." 
                   className="w-full pl-12 pr-4 py-3 sm:py-3.5 bg-slate-900/50 hover:bg-slate-900/80 border border-white/10 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all text-white placeholder:text-white/40"
                />
             </div>
           </div>
        </div>
      </div>

      {/* KPI METRICS — tạm ẩn chờ dữ liệu thực */}

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
         
         {/* ── MODULE CHÍNH (2/3) ── */}
         <div className="xl:col-span-2 space-y-6 animate-fade-in-up delay-300">
            <div className="flex items-center gap-3 px-1">
              <div className="w-1.5 h-6 bg-orange-500 rounded-full" />
              <h2 className="text-lg font-bold text-[#0a192f] uppercase tracking-wide">Điều hướng nghiệp vụ</h2>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-2 gap-3 sm:gap-4 lg:gap-6">
               {MODULES.map((module, i) => (
                  <Link 
                     key={i} 
                     href={module.href}
                     className={`bg-white rounded-xl sm:rounded-2xl p-4 sm:p-7 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border-2 border-transparent ${module.border} hover:shadow-xl group flex flex-col justify-between min-h-[150px] sm:min-h-[200px] transition-all duration-300 hover:-translate-y-1`}
                  >
                     <div className="flex justify-between items-start mb-3 sm:mb-6">
                        <div className={`w-10 h-10 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl ${module.bg} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                           <module.icon className={`w-5 h-5 sm:w-7 sm:h-7 ${module.color}`} />
                        </div>
                        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center bg-slate-50 text-slate-400 group-hover:bg-orange-500 group-hover:text-white transition-colors duration-300">
                           <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 -rotate-45 group-hover:rotate-0 transition-transform duration-300" />
                        </div>
                     </div>
                     <div>
                        <h3 className="text-sm sm:text-xl font-bold text-[#0a192f] mb-1 sm:mb-2 leading-tight">{module.title}</h3>
                        <p className="text-sm text-slate-600 font-medium leading-relaxed">{module.desc}</p>
                     </div>
                  </Link>
               ))}
            </div>
         </div>

         {/* ── AI INSIGHTS (1/3) ── */}
         <div className="space-y-6 animate-fade-in-up delay-400">
             <div className="flex items-center gap-3 px-1">
              <div className="w-1.5 h-6 bg-blue-900 rounded-full" />
              <h2 className="text-lg font-bold text-[#0a192f] uppercase tracking-wide">Phân tích & Gợi ý</h2>
            </div>

             <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-200/60 p-6 flex-1 flex flex-col">
                <div className="space-y-5 flex-1">
                   {AI_INSIGHTS.map((log, i) => (
                      <div key={i} className="group flex gap-4 p-4 rounded-xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100 cursor-pointer">
                         <div className="mt-1">
                            {log.type === 'warning' ? (
                               <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center text-red-600">
                                 <AlertTriangle className="w-4 h-4" />
                               </div>
                            ) : log.type === 'action' ? (
                               <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center text-orange-600">
                                 <FileSearch className="w-4 h-4" />
                               </div>
                            ) : (
                               <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700">
                                 <Sparkles className="w-4 h-4" />
                               </div>
                            )}
                         </div>
                         <div>
                            <div className="flex justify-between items-center mb-1">
                               <h4 className="text-sm font-bold text-[#0a192f] group-hover:text-blue-700 transition-colors">{log.title}</h4>
                            </div>
                            <p className="text-xs text-slate-600 font-medium leading-relaxed mb-2">{log.desc}</p>
                            <span className="text-[10px] font-bold text-slate-400 uppercase">{log.time}</span>
                         </div>
                      </div>
                   ))}
                </div>
                
                <button className="mt-6 w-full py-3.5 rounded-xl border-2 border-[#0a192f] text-[#0a192f] hover:bg-[#0a192f] hover:text-white font-bold text-sm transition-colors flex items-center justify-center gap-2">
                   MỞ TRUNG TÂM CẢNH BÁO
                   <ChevronRight className="w-4 h-4" />
                </button>
             </div>
         </div>
      </div>

      <ChatBot />
    </div>
    </>
  );
}
