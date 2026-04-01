'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import ChatBot from '@/components/ChatBot';
import Link from 'next/link';
import { ShieldCheck, Search, Database, Lock, Globe, Terminal, ArrowRight, Zap, CircleDashed } from 'lucide-react';

export default function Home() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#020617] flex flex-col font-sans text-white relative overflow-hidden">
      {/* 🚀 ZERO-BLUR CARBON BACKGROUND */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] border border-white/5 rounded-full -z-10 mix-blend-overlay" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-white/5 rounded-full -z-10 mix-blend-overlay" />
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.05] mix-blend-overlay" />

      {/* 🧭 ELITE NAVIGATION (LIQUID CARBON) */}
      <nav className="w-full h-32 flex items-center justify-between px-16 bg-[#020617] border-b-2 border-white/10 sticky top-0 z-[100] shadow-[0_10px_40px_-20px_rgba(37,99,235,0.2)]">
        <div className="flex items-center gap-6 group cursor-pointer" onClick={() => router.push('/')}>
          <div className="w-14 h-14 bg-[#0a192f] border-2 border-white/10 flex items-center justify-center rounded-2xl group-hover:border-blue-500 transition-all duration-300">
             <ShieldCheck className="w-8 h-8 text-[#fbbf24] group-hover:scale-110 transition-transform" />
          </div>
          <div className="flex flex-col">
            <span className="text-3xl font-black tracking-tighter leading-none text-white uppercase italic">HQ REGISTRY<span className="text-[#fbbf24] ml-1">IP</span></span>
            <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.5em] mt-1.5 flex items-center gap-2">
               <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
               National IP Protection Core
            </span>
          </div>
        </div>
        
        <div className="hidden lg:flex items-center gap-16">
          <NavLink label="Command Center" href="/" active />
          <NavLink label="Public Search" href="/tra-cuu" />
          <NavLink label="IP Resources" href="/tra-cuu" />
        </div>

        <Link 
          href="/admin/login"
          className="bg-white hover:bg-[#fbbf24] text-[#020617] px-12 py-5 rounded-2xl font-black text-xs uppercase tracking-widest transition-all duration-300 active:scale-95 shadow-2xl hover:shadow-[0_0_40px_rgba(251,191,36,0.3)] flex items-center gap-4 group"
        >
          <Lock className="w-5 h-5 group-hover:rotate-12 transition-transform" />
          Secure Admin
        </Link>
      </nav>

      <main className="flex-1 max-w-7xl mx-auto w-full px-16 py-40 flex flex-col items-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-40 items-center">
          {/* LEFT: CONTENT - HEROIC */}
          <div className="space-y-16 reveal">
            <div className="inline-flex items-center gap-4 px-6 py-3 bg-[#0f172a] border-2 border-white/10 rounded-2xl text-blue-400 group">
              <Zap className="w-5 h-5 fill-blue-500/20 group-hover:fill-blue-500 group-hover:rotate-12 transition-all" />
              <span className="text-[11px] font-black uppercase tracking-[0.4em] italic mb-[-2px]">HQ-IP-P System Ready v-4.8.1</span>
            </div>
            
            <h1 className="text-[11rem] font-black text-white italic tracking-tighter leading-[0.75] uppercase group">
               Vault <br />
               <span className="text-[#fbbf24] drop-shadow-[0_0_30px_rgba(251,191,36,0.2)]">Internal</span>
               <div className="h-4 w-48 bg-blue-500 mt-4 rounded-full shadow-[0_0_20px_rgba(37,99,235,0.5)]" />
            </h1>
            
            <p className="text-2xl text-slate-400 font-bold leading-relaxed max-w-xl italic border-l-4 border-slate-800 pl-10 opacity-80">
              Chuyên biệt cho Chi cục Hải quan. Đồng bộ, trích xuất và xác minh các văn bản sở hữu trí tuệ bản gốc trong tích tắc. 
              Môi trường làm việc bảo mật cao (Zero-Trust Arch).
            </p>

            <div className="flex flex-wrap gap-10 pt-10">
              <button 
                onClick={() => router.push('/tra-cuu')}
                className="group relative bg-[#fbbf24] hover:bg-yellow-500 text-[#020617] px-16 py-10 rounded-[2.5rem] font-black text-lg uppercase tracking-widest transition-all duration-300 shadow-2xl active:scale-95 border-b-[10px] border-amber-600 hover:border-amber-700 flex items-center gap-6"
              >
                <Search className="w-8 h-8 group-hover:scale-125 transition-transform" />
                Vô hiệu hóa vi phạm
              </button>
              <button 
                className="bg-[#0f172a] hover:bg-white text-white hover:text-[#0a192f] px-16 py-10 rounded-[2.5rem] font-black text-lg border-2 border-white/10 flex items-center justify-center gap-6 transition-all duration-300 active:scale-95 group"
              >
                <Terminal className="w-8 h-8 group-hover:text-blue-500 transition-colors" />
                Lệnh hệ thống
              </button>
            </div>

            <div className="flex items-center gap-24 pt-16 border-t-2 border-white/5 opacity-40">
               <div className="flex flex-col gap-2">
                  <span className="text-4xl font-black italic tracking-tighter">1,240</span>
                  <span className="text-[10px] font-black uppercase tracking-[0.4em]">Authorized Docs</span>
               </div>
               <div className="flex flex-col gap-2">
                  <span className="text-4xl font-black italic tracking-tighter">12.5 G</span>
                  <span className="text-[10px] font-black uppercase tracking-[0.4em]">Vault Capacity</span>
               </div>
               <div className="flex flex-col gap-2 text-emerald-400">
                  <span className="text-4xl font-black italic tracking-tighter">A-LEVEL</span>
                  <span className="text-[10px] font-black uppercase tracking-[0.4em]">Global Node Sync</span>
               </div>
            </div>
          </div>

          {/* RIGHT: DECOR - TECH SHARP */}
          <div className="relative reveal" style={{ animationDelay: '0.2s' }}>
             <div className="bg-[#0f172a] p-12 rounded-[5rem] border-4 border-white/5 shadow-[30px_30px_0_0_rgba(37,99,235,0.7)] rotate-3 overflow-hidden group">
                <div className="bg-[#020617] rounded-[3.5rem] overflow-hidden aspect-[4/5] relative border-4 border-white/10">
                  <Image 
                    src="https://images.unsplash.com/photo-1544006659-f0b21f04cb1d?auto=format&fit=crop&q=80&w=600" 
                    alt="Cyber Terminal Architecture" 
                    fill
                    className="object-cover opacity-60 grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-[2s]"
                  />
                  <div className="absolute inset-x-0 bottom-0 p-16 bg-[#020617]/95 border-t-4 border-[#fbbf24]">
                     <div className="flex flex-col gap-8">
                        <div className="w-24 h-24 bg-[#fbbf24] rounded-[2rem] flex items-center justify-center shadow-2xl group-hover:rotate-12 transition-all duration-700">
                           <Globe className="w-12 h-12 text-[#020617]" />
                        </div>
                        <div className="space-y-4">
                           <p className="text-white text-5xl font-black uppercase tracking-tighter italic leading-none">Security Core</p>
                           <div className="flex items-center gap-4">
                              <span className="h-6 px-4 bg-blue-500/10 text-blue-400 text-[10px] font-black rounded-lg border border-blue-500/20 italic tracking-widest uppercase">Verified Deployment</span>
                              <div className="h-1 flex-1 bg-white/5 rounded-full overflow-hidden">
                                 <div className="h-full w-2/3 bg-[#fbbf24]" />
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
                </div>
             </div>
             
             {/* Tech Decors - No Blur */}
             <div className="absolute -top-12 -left-12 w-48 h-48 bg-[#fbbf24] rounded-full flex flex-col items-center justify-center p-8 -rotate-12 hover:rotate-3 transition-transform duration-700 cursor-pointer shadow-3xl">
               <CircleDashed className="w-20 h-20 text-[#020617] animate-[spin_5s_linear_infinite]" />
               <p className="text-[13px] font-black text-[#020617] uppercase tracking-tighter mt-4 italic">Global Node</p>
             </div>
             <div className="absolute -bottom-16 -right-16 w-56 h-56 bg-[#020617] rounded-[4rem] border-8 border-white/5 p-10 flex flex-col justify-between shadow-2xl group hover:border-[#fbbf24]/30 transition-all duration-700">
                <Database className="w-14 h-14 text-blue-500 group-hover:scale-125 transition-transform" />
                <p className="text-sm font-black uppercase tracking-tighter italic text-white/50 leading-tight">Data Integrity Platform <br /><span className="text-blue-500">v-4.0.01</span></p>
             </div>
          </div>
        </div>
      </main>

      <ChatBot />

      <footer className="w-full py-20 px-16 flex flex-col lg:flex-row items-center justify-between border-t-4 border-white/5 bg-[#020617] gap-12 mt-20">
        <div className="flex flex-col gap-4">
           <span className="text-4xl font-black tracking-tighter text-white uppercase italic">CITADEL <span className="text-[#fbbf24]">IP</span></span>
           <p className="text-slate-600 text-xs font-black uppercase tracking-[0.3em] font-mono">CODE: C-1495A-HQ | SHARP CARBON NODE V-2026.01</p>
        </div>
        <div className="flex gap-20">
          <Link href="#" className="font-black text-[13px] text-slate-500 hover:text-[#fbbf24] uppercase tracking-widest transition-colors italic border-b-2 border-transparent hover:border-[#fbbf24]">Privacy</Link>
          <Link href="#" className="font-black text-[13px] text-slate-500 hover:text-[#fbbf24] uppercase tracking-widest transition-colors italic border-b-2 border-transparent hover:border-[#fbbf24]">Authority Protocol</Link>
          <Link href="#" className="font-black text-[13px] text-slate-500 hover:text-[#fbbf24] uppercase tracking-widest transition-colors italic border-b-2 border-transparent hover:border-[#fbbf24]">System Status</Link>
        </div>
      </footer>
    </div>
  );
}

function NavLink({ label, href, active }: any) {
  return (
    <Link 
      href={href} 
      className={`font-black text-sm uppercase tracking-[0.5em] transition-all hover:text-[#fbbf24] relative py-4 italic ${active ? 'text-[#fbbf24]' : 'text-slate-600'}`}
    >
      {label}
      {active && <div className="absolute bottom-0 left-0 right-0 h-2 bg-[#fbbf24] rounded-full shadow-[0_0_30px_rgba(251,191,36,0.6)]" />}
    </Link>
  );
}
