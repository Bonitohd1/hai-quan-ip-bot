'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import ChatBot from '@/components/ChatBot';

export default function Home() {
  const router = useRouter();
  
  const bentoItems = [
    { 
      id: 'history', 
      title: 'Lịch sử SHTT', 
      desc: 'Tìm hiểu lịch sử phát triển của sở hữu trí tuệ', 
      icon: '📚', 
      href: '/lich-su-shtt',
      borderColor: 'border-l-[#facc15]' 
    },
    { 
      id: 'law', 
      title: 'Văn Bản Pháp Luật', 
      desc: 'Xem các quy định và pháp luật liên quan', 
      icon: '⚖️', 
      href: '/van-ban-phap-luat',
      borderColor: 'border-l-[#1a2b56]' 
    },
    { 
      id: 'search', 
      title: 'Tra Cứu', 
      desc: 'Tra cứu thông tin và dữ liệu sở hữu trí tuệ', 
      icon: '🔎', 
      href: '/tra-cuu',
      borderColor: 'border-l-[#1a2b56]' 
    },
    { 
      id: 'stats', 
      title: 'Thống Kê SHTT', 
      desc: 'Xem các con số và thống kê liên quan', 
      icon: '📊', 
      href: '#',
      borderColor: 'border-l-[#1a2b56]' 
    },
  ];

  return (
    <div className="min-h-screen bg-[#f8fafc] pb-24 font-sans">
      <div className="mx-auto max-w-5xl px-4 lg:px-0">
        
        {/* Global Page Header Card */}
        <header className="mb-14 overflow-hidden rounded-xl bg-[#1a2b56] p-10 shadow-2xl text-white relative">
          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="p-2.5 bg-[#facc15] rounded-xl shadow-lg shadow-yellow-500/20 mt-1">
                 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-[#1a2b56]">
                   <path fillRule="evenodd" d="M12.516 2.17a.75.75 0 00-1.032 0 11.209 11.209 0 01-7.877 3.08.75.75 0 00-.722.515A12.74 12.74 0 002.25 9.75c0 5.942 4.064 10.933 9.563 12.348a.749.749 0 00.374 0c5.499-1.415 9.563-6.406 9.563-12.348 0-1.39-.223-2.73-.635-3.985a.75.75 0 00-.722-.516l-.143.001c-2.996 0-5.717-1.17-7.734-3.08zm3.094 8.016a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
                 </svg>
              </div>
              <div>
                <h1 className="text-2xl font-black tracking-tight mb-1">Sở hữu Trí tuệ Hải quan</h1>
                <p className="text-blue-200/80 font-bold text-sm">Tra cứu và tư vấn sở hữu trí tuệ</p>
              </div>
            </div>
            <button className="bg-[#facc15] hover:bg-yellow-500 text-[#1a2b56] px-6 py-3 rounded-xl font-black text-xs flex items-center gap-2 transition-all shadow-xl shadow-yellow-500/20 active:scale-95 self-start lg:self-center">
              ➜ Đăng nhập
            </button>
          </div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-400/5 blur-[80px] rounded-full translate-x-1/2 -translate-y-1/2" />
        </header>

        {/* Hero Section - Assistant Intro */}
        <section className="flex flex-col items-center text-center mb-16 px-4">
          <div className="mb-8 p-6 bg-[#1a2b56] rounded-2xl shadow-xl shadow-blue-900/10 inline-block">
             <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1.75 1.75 0 011.237.513l5.664 5.664A1.75 1.75 0 0120 10.414V19a2 2 0 01-2 2z" />
             </svg>
          </div>
          <h2 className="text-3xl lg:text-4xl font-black text-slate-900 mb-4 tracking-tight">Trợ lý AI Sở hữu Trí tuệ Hải quan</h2>
          <p className="text-slate-500 text-lg font-bold">Tôi có thể giúp bạn việc gì?</p>
        </section>

        {/* Bento Grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-4 lg:px-0">
          {bentoItems.map((item) => (
            <div 
              key={item.id}
              onClick={() => router.push(item.href)}
              className={`bg-white p-10 rounded-2xl shadow-md border-l-[6px] ${item.borderColor} cursor-pointer transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 active:scale-95 group relative overflow-hidden`}
            >
              <div className="relative z-10">
                <div className="text-4xl mb-6 transform group-hover:scale-110 transition-transform duration-300">{item.icon}</div>
                <h3 className="text-xl font-black text-slate-900 mb-2">{item.title}</h3>
                <p className="text-slate-500 font-bold opacity-80 text-sm">{item.desc}</p>
              </div>
              <div className="absolute top-0 right-0 p-10 -translate-y-1/2 translate-x-1/2 w-48 h-48 bg-slate-50 rounded-full blur-3xl opacity-30 transition-opacity group-hover:opacity-60" />
            </div>
          ))}
        </div>
      </div>

      {/* Replicated Chat Button Floating UI */}
      <div className="fixed bottom-6 right-6 z-50">
        <button className="flex items-center gap-3 bg-[#1a2b56] text-white pl-4 pr-6 py-3 rounded-xl shadow-2xl shadow-blue-900/40 hover:scale-[1.02] transition-all group active:scale-95">
          <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center p-1.5 transition-transform group-hover:rotate-12">
             <Image 
               src="/logoHQdaxoanen.png" 
               alt="HQ" 
               width={24} 
               height={24}
               className="object-contain"
             />
          </div>
          <div className="flex flex-col items-start leading-none text-left">
            <span className="text-xs font-black tracking-tight mb-1">Trợ lý SHTT</span>
            <span className="text-[10px] font-bold opacity-70">Mở</span>
          </div>
        </button>
      </div>

      <ChatBot />
    </div>
  );
}

