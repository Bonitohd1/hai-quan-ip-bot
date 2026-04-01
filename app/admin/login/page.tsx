'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, Mail, ShieldCheck, Fingerprint, ChevronRight, Globe, ShieldAlert } from 'lucide-react';
import Link from 'next/link';

export default function AdminLogin() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleGoogleLogin = () => {
    setIsLoading(true);
    setTimeout(() => {
      router.push('/admin/documents');
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-[#0a192f] relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_20%,#112240_0%,transparent_50%)]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600/5 blur-[120px] rounded-full" />
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay pointer-events-none" />

      <div className="w-full max-w-lg relative z-10 fade-in">
        <div className="mb-14 text-center">
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-[2.5rem] bg-[#112240] shadow-3xl mb-10 relative border border-[#233554] group">
             <ShieldAlert className="w-12 h-12 text-[#eab308] group-hover:scale-110 transition-transform duration-500" />
             <div className="absolute -bottom-2 -right-2 w-10 h-10 rounded-2xl bg-[#0a192f] border-2 border-[#eab308]/50 flex items-center justify-center shadow-lg">
                <Fingerprint className="w-5 h-5 text-[#eab308]" />
             </div>
             {/* Glowing Pulse */}
             <div className="absolute inset-0 rounded-[2.5rem] bg-[#eab308]/10 animate-pulse blur-xl -z-10" />
          </div>
          <h1 className="text-4xl font-black text-white tracking-tighter mb-4 uppercase italic">Admin Portal</h1>
          <div className="flex items-center justify-center gap-4">
             <div className="h-[2px] w-12 bg-gradient-to-r from-transparent to-[#eab308]/40" />
             <p className="text-[#eab308] font-bold text-[10px] uppercase tracking-[0.5em] italic">Secured Gateway</p>
             <div className="h-[2px] w-12 bg-gradient-to-l from-transparent to-[#eab308]/40" />
          </div>
        </div>

        <div className="bg-[#112240] rounded-[4rem] p-16 border border-[#233554] shadow-3xl relative group overflow-hidden">
           <div className="absolute top-0 left-0 w-full h-[3px] bg-[#eab308] shadow-[0_0_20px_rgba(234,179,8,0.3)]" />
           
           <div className="space-y-12">
              <div className="text-center space-y-3">
                 <h2 className="text-2xl font-black text-white italic">Xác thực quyền hạn</h2>
                 <p className="text-slate-500 text-xs font-black uppercase tracking-widest opacity-80">Sử dụng Google Workspace định danh nội bộ</p>
              </div>

              <div className="space-y-5">
                 <button
                   onClick={handleGoogleLogin}
                   disabled={isLoading}
                   className="w-full flex items-center justify-between px-10 py-6 bg-white hover:bg-[#eab308] text-[#0a192f] rounded-[2.5rem] font-black text-sm transition-all duration-500 shadow-2xl active:scale-[0.98] group/btn"
                 >
                    <div className="flex items-center gap-5">
                       <div className="w-10 h-10 rounded-full bg-[#0a192f]/5 flex items-center justify-center group-hover/btn:rotate-12 transition-transform">
                          <img src="https://authjs.dev/img/providers/google.svg" alt="Google" className="w-5 h-5" />
                       </div>
                       <span className="uppercase tracking-widest">Tiếp tục bằng Gmail</span>
                    </div>
                    <ChevronRight className="w-5 h-5 text-[#0a192f]/40 group-hover/btn:translate-x-1 transition-transform" />
                 </button>

                 <div className="flex items-center gap-6 py-4">
                    <div className="h-px flex-1 bg-[#233554]" />
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em] italic">Identify Layer</span>
                    <div className="h-px flex-1 bg-[#233554]" />
                 </div>

                 <div className="relative group/input">
                    <div className="absolute inset-y-0 left-0 pl-7 flex items-center pointer-events-none">
                       <Mail className="h-5 w-5 text-slate-600 group-focus-within/input:text-[#eab308] transition-colors" />
                    </div>
                    <input
                      type="text"
                      className="block w-full pl-16 pr-8 py-6 bg-[#0a192f] border border-[#233554] rounded-[2.5rem] outline-none focus:border-[#eab308]/50 focus:bg-[#0a192f]/80 text-white text-sm font-black tracking-tight transition-all placeholder:text-slate-700 italic shadow-inner"
                      placeholder="Email xác nhận danh tính"
                    />
                 </div>
              </div>

              <div className="pt-10 border-t border-[#233554] flex flex-col items-center gap-8">
                 <div className="flex items-center gap-12 opacity-30">
                    <Globe className="w-5 h-5 text-white" />
                    <div className="h-6 w-px bg-white/20" />
                    <ShieldCheck className="w-5 h-5 text-white" />
                    <div className="h-6 w-px bg-white/20" />
                    <Lock className="w-5 h-5 text-white" />
                 </div>
                 <Link href="/" className="text-[11px] font-black text-slate-600 hover:text-[#eab308] transition-colors uppercase tracking-[0.4em] flex items-center gap-3">
                    ← Trở lại Main Console
                 </Link>
              </div>
           </div>
        </div>

        <p className="mt-16 text-center text-[10px] font-black text-slate-700 uppercase tracking-[0.6em] opacity-40">
           © 2026 Secured Internal Architecture v4.0
        </p>
      </div>
    </div>
  );
}
