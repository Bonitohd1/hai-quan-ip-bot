'use client';

import { useState, useEffect } from 'react';
import { Search, Info, FileText, Package, AlertTriangle, ArrowRight, Download, Filter, LayoutGrid, List as ListIcon, ChevronRight, Zap, Database, ShieldCheck, Fingerprint, Lock, ShieldAlert } from 'lucide-react';
import Sidebar from '@/components/Sidebar';
import Link from 'next/link';

interface Document {
  id: string;
  code: string;
  name: string;
  type: string;
  date: string;
  description: string;
}

export default function TraCuu() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeType, setActiveType] = useState('all');
  const [results, setResults] = useState<Document[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/documents');
      const data = await res.json();
      setResults((data.documents || []).slice(0, 9));
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    
    setIsLoading(true);
    try {
      const res = await fetch(`/api/documents?q=${encodeURIComponent(searchQuery)}&type=${activeType}`);
      const data = await res.json();
      setResults(data.documents || []);
      setSearched(true);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen bg-[#020617] text-white selection:bg-blue-500/30">
      <Sidebar />
      <main className="flex-1 overflow-y-auto p-16 lg:p-24 relative bg-[#020617] custom-scrollbar">
        {/* 🎯 ELITE HEADER (LIQUID CARBON) */}
        <div className="max-w-7xl mx-auto space-y-24 pb-40">
          <header className="flex flex-col gap-8 items-start reveal">
             <div className="inline-flex items-center gap-5 px-8 py-3.5 bg-[#0f172a] border-4 border-white/5 rounded-3xl text-blue-400 group">
                <ShieldAlert className="w-6 h-6 shadow-[0_0_20px_rgba(37,99,235,0.4)] group-hover:scale-125 transition-transform" />
                <span className="text-[12px] font-black uppercase tracking-[0.5em] italic">SECURE IP SEARCH TERMINAL v-2026.04</span>
             </div>
             <h1 className="text-9xl font-black italic tracking-tighter uppercase leading-none text-white drop-shadow-2xl">
                 Tra cứu <br /><span className="text-[#fbbf24] shadow-[#fbbf24]/20 border-b-8 border-[#fbbf24]">Bản gốc</span>
             </h1>
             <p className="text-slate-500 font-bold max-w-2xl text-2xl uppercase tracking-widest text-[13px] leading-relaxed italic border-l-8 border-blue-600 pl-10 opacity-80">
                 Hệ thống xác thực pháp lý đối với hàng hóa XNK. Toàn bộ dữ liệu được đồng bộ trực tiếp từ tổng cục Hải quan & Cục SHTT.
             </p>
          </header>

          {/* 🔍 SEARCH CORE (LIQUID CARBON) */}
          <div className="bg-[#0f172a] p-20 rounded-[5rem] border-8 border-white/5 shadow-3xl space-y-20 reveal relative overflow-hidden" style={{ animationDelay: '0.1s' }}>
            <div className="absolute top-0 inset-x-0 h-4 bg-gradient-to-r from-transparent via-[#fbbf24] to-transparent shadow-[0_0_30px_rgba(251,191,36,0.5)]" />
            
            <div className="flex flex-col lg:flex-row gap-16 items-end">
              <div className="flex-1 w-full space-y-6">
                <label className="text-[11px] font-black text-slate-700 uppercase tracking-[0.6em] ml-6">Phân loại truy vấn</label>
                <div className="flex flex-wrap gap-5">
                  <TypeButton active={activeType === 'all'} label="TẤT CẢ" onClick={() => setActiveType('all')} />
                  <TypeButton active={activeType === 'Gia hạn'} label="GIA HẠN" onClick={() => setActiveType('Gia hạn')} />
                  <TypeButton active={activeType === 'Vi phạm'} label="PHÁP LÝ" onClick={() => setActiveType('Vi phạm')} />
                </div>
              </div>
              <div className="flex-[2] w-full space-y-6">
                <label className="text-[11px] font-black text-slate-700 uppercase tracking-[0.6em] ml-6">Mã CV / Thương hiệu / Tên sản phẩm</label>
                <div className="relative group">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                    placeholder="VD: 24541, Hermes, Nike, Ray-ban..."
                    className="w-full px-12 py-9 bg-[#020617] border-4 border-white/5 rounded-[3rem] outline-none focus:border-[#fbbf24] transition-all text-base font-black tracking-tighter pr-64 italic text-white placeholder:text-slate-800 shadow-inner group-hover:border-white/10"
                  />
                  <button
                    onClick={handleSearch}
                    disabled={isLoading}
                    className="absolute right-5 top-4 bottom-4 px-14 bg-[#fbbf24] hover:bg-yellow-500 text-[#020617] rounded-[2.5rem] font-black text-[15px] uppercase tracking-[0.3em] flex items-center justify-center gap-5 transition-all shadow-2xl active:scale-95 disabled:opacity-50 border-b-8 border-amber-600 hover:border-amber-700 active:translate-y-2 active:border-b-4 group/btn"
                  >
                    {isLoading ? <div className="w-6 h-6 border-[4px] border-[#020617]/20 border-t-[#020617] rounded-full animate-spin" /> : <Fingerprint className="w-7 h-7 group-hover/btn:scale-125 transition-transform" />}
                    <span>Xác minh</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* 📦 RESULTS GRID (LIQUID CARBON SHARP) */}
          <div className="space-y-16 reveal" style={{ animationDelay: '0.2s' }}>
            <div className="flex items-center justify-between border-b-8 border-white/5 pb-12 pr-10">
               <div className="flex items-center gap-10">
                  <h2 className="text-4xl font-black italic uppercase tracking-tighter text-white">Registry Vault</h2>
                  <div className="px-5 py-2.5 bg-blue-600 text-white rounded-2xl text-xs font-black shadow-2xl shadow-blue-600/30 uppercase tracking-widest">{results.length} Files</div>
               </div>
               <div className="flex items-center gap-4 p-2 bg-[#0f172a] rounded-3xl border-2 border-white/5">
                  <button className="p-4 bg-[#020617] text-[#fbbf24] rounded-2xl border-2 border-white/10"><LayoutGrid className="w-5 h-5" /></button>
                  <button className="p-4 text-slate-700 hover:text-white transition-colors"><ListIcon className="w-5 h-5" /></button>
               </div>
            </div>

            {results.length > 0 ? (
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
                 {results.map((doc, i) => (
                   <div 
                     key={doc.id} 
                     className="bg-[#0f172a] p-16 rounded-[4.5rem] border-4 border-white/5 flex flex-col gap-10 group hover:border-[#fbbf24] transition-all duration-300 shadow-3xl relative overflow-hidden"
                     style={{ animationDelay: `${0.1 + i * 0.05}s` }}
                   >
                     <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-white/5 to-transparent rounded-bl-[5rem] -z-10" />
                     <div className="flex justify-between items-start">
                        <div className="w-20 h-20 rounded-3xl bg-[#020617] border-2 border-white/5 flex items-center justify-center text-slate-700 group-hover:text-[#fbbf24] group-hover:rotate-12 transition-all duration-500 shadow-inner">
                           <FileText className="w-10 h-10" />
                        </div>
                        <span className="px-6 py-3 bg-[#020617] text-[#fbbf24] text-[11px] font-black rounded-2xl uppercase tracking-widest border-2 border-[#fbbf24]/20 group-hover:border-[#fbbf24] italic transition-all">
                          {doc.type}
                        </span>
                     </div>
                     <div className="space-y-6">
                        <div className="flex items-center gap-6 text-[11px] font-black text-slate-700 uppercase tracking-[0.4em] italic mb-2">
                           <span className="text-blue-500 flex items-center gap-2">
                             <Lock className="w-3.5 h-3.5" /> ID: {doc.code}
                           </span>
                           <div className="w-2 h-2 bg-slate-800 rounded-full" />
                           <span>MOD: {doc.date.slice(0,2)}/{doc.date.slice(2,4)}/{doc.date.slice(4)}</span>
                        </div>
                        <h3 className="text-4xl font-black text-white italic group-hover:text-[#fbbf24] transition-colors leading-none tracking-tighter uppercase">{doc.name}</h3>
                        <p className="text-lg text-slate-500 font-bold line-clamp-3 leading-relaxed italic opacity-80">{doc.description}</p>
                     </div>
                     <div className="pt-12 mt-auto border-t-4 border-[#020617] flex items-center justify-between gap-8">
                        <button className="flex-1 flex items-center justify-center gap-5 py-6 bg-white text-[#020617] rounded-2xl text-[14px] font-black uppercase tracking-widest hover:bg-[#fbbf24] transition-all active:scale-95 shadow-3xl border-b-8 border-slate-300 hover:border-amber-700">
                           <Download className="w-6 h-6" />
                           Download PDF
                        </button>
                        <button className="w-16 h-16 flex items-center justify-center bg-[#020617] text-slate-700 rounded-2xl border-2 border-white/5 hover:text-white hover:bg-blue-600 transition-all active:scale-90 group/info shadow-2xl">
                           <Info className="w-7 h-7 group-hover/info:scale-125 transition-transform" />
                        </button>
                     </div>
                   </div>
                 ))}
               </div>
            ) : searched ? (
               <div className="bg-[#0f172a] border-8 border-dashed border-red-500/20 p-40 rounded-[6rem] text-center flex flex-col items-center gap-14 shadow-3xl reveal">
                  <div className="w-40 h-40 bg-[#020617] rounded-[5rem] flex items-center justify-center relative shadow-inner group">
                     <AlertTriangle className="w-20 h-20 text-red-500 group-hover:animate-shake transition-all" />
                     <div className="absolute inset-0 bg-red-500/5 animate-pulse rounded-[5rem]" />
                  </div>
                  <div className="space-y-6">
                     <h3 className="text-5xl font-black italic uppercase tracking-tighter text-white">AUTHORITY SEARCH FAILED</h3>
                     <p className="text-slate-600 font-bold max-w-md mx-auto text-xl leading-relaxed italic uppercase tracking-widest text-sm opacity-60">Hệ thống KHÔNG tìm thấy tài liệu gốc trùng khớp với truy vấn pháp lý. Vui lòng kiểm tra lại bộ gõ hoặc mã công văn.</p>
                  </div>
               </div>
            ) : (
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 opacity-10">
                  {[1,2,3].map(i => (
                    <div key={i} className="bg-[#0f172a] p-16 rounded-[4.5rem] h-96 border-4 border-white/10" />
                  ))}
               </div>
            )}
          </div>

          {/* 🏁 FOOTER NAV */}
          <footer className="pt-24 flex border-t-8 border-white/5 pb-40 justify-center">
             <Link href="/" className="text-[13px] font-black text-slate-700 flex items-center gap-8 hover:translate-x-5 transition-all uppercase tracking-[0.7em] hover:text-[#fbbf24] group italic">
               <ChevronRight className="w-8 h-8 group-hover:text-[#fbbf24] transition-colors" />
               Re-establish Console Connection
             </Link>
          </footer>
        </div>
      </main>
    </div>
  );
}

function TypeButton({ active, label, onClick }: any) {
  return (
    <button
      onClick={onClick}
      className={`px-12 py-6 rounded-3xl flex items-center gap-4 transition-all font-black text-[12px] uppercase tracking-widest active:scale-95 border-b-[6px] ${
        active 
        ? 'bg-[#fbbf24] text-[#020617] border-amber-600 shadow-2xl translate-y-[-2px]' 
        : 'bg-[#020617] text-slate-700 border-white/5 hover:text-white hover:border-white/20'
      }`}
    >
      <span>{label}</span>
    </button>
  );
}
