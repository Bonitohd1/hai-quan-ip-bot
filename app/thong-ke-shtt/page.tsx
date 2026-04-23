'use client';

import React, { useState, useEffect, useMemo } from 'react';
import ChatBot from '@/components/ChatBot';
import rawDocs from '@/lib/documents.json';
import {
  BarChart3, TrendingUp, ShieldAlert, PackageSearch,
  ChevronDown, Download, Activity, X, CheckCircle2,
  Loader2, ShieldCheck, FileText, Tag, Calendar, ArrowRight,
  TrendingDown, Minus
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// ── Types ─────────────────────────────────────────────────────────────────────
interface Doc { id: string; code: string; date: string; name: string; filename?: string; type: string; description: string; }

// ── Helpers ───────────────────────────────────────────────────────────────────
function parseDMY(s: string) {
  return { d: +s.slice(0,2), m: +s.slice(2,4), y: +s.slice(4,8) };
}
function fmtDate(s: string) {
  const { d, m, y } = parseDMY(s);
  return `${String(d).padStart(2,'0')}/${String(m).padStart(2,'0')}/${y}`;
}

const ALL: Doc[] = (rawDocs as { documents: Doc[] }).documents;

// ── Category classification ───────────────────────────────────────────────────
function classify(doc: Doc): string {
  const n = doc.name.toLowerCase();
  if (['hermes','oakley','ray-ban','persol','dodgers','mlb','yankees','lakers','nba'].some(k=>n.includes(k)))
    return 'Thời trang & Thể thao';
  if (['peel','chunghwa','marlboro','peony'].some(k=>n.includes(k)))
    return 'Thuốc lá';
  if (['micro sd','nokia','pixel','ingco','blum','sd smart'].some(k=>n.includes(k)))
    return 'Điện tử & Thiết bị';
  if (['comfort','lifebuoy','dove','sunsilk','innisfree','viagra','wahl','super taper','jtekt'].some(k=>n.includes(k)))
    return 'Tiêu dùng & Y tế';
  return 'Công nghiệp & Khác';
}

// ── Derived data ──────────────────────────────────────────────────────────────
const CATEGORIES_DEF = [
  { name: 'Thời trang & Thể thao', color: '#6366f1' },
  { name: 'Tiêu dùng & Y tế',      color: '#10b981' },
  { name: 'Điện tử & Thiết bị',    color: '#3b82f6' },
  { name: 'Thuốc lá',              color: '#f59e0b' },
  { name: 'Công nghiệp & Khác',    color: '#94a3b8' },
];

function buildYearData(year: number) {
  const docs = ALL.filter(d => parseDMY(d.date).y === year);
  const capMoi = docs.filter(d => d.type === 'Cấp mới');
  const giaHan = docs.filter(d => d.type === 'Gia hạn');

  // monthly counts
  const monthly = Array(12).fill(0);
  docs.forEach(d => { const { m } = parseDMY(d.date); if (m>=1&&m<=12) monthly[m-1]++; });

  // categories
  const catCounts: Record<string, number> = {};
  docs.forEach(d => { const c = classify(d); catCounts[c] = (catCounts[c]||0)+1; });
  const total = docs.length || 1;
  const categories = CATEGORIES_DEF.map(c => ({
    ...c,
    count: catCounts[c.name] || 0,
    pct: Math.round(((catCounts[c.name]||0)/total)*100),
  })).filter(c => c.count > 0);

  // recent docs (last 6)
  const sorted = [...docs].sort((a,b) => {
    const { y:ay, m:am, d:ad } = parseDMY(a.date);
    const { y:by, m:bm, d:bd } = parseDMY(b.date);
    return new Date(by,bm-1,bd).getTime() - new Date(ay,am-1,ad).getTime();
  }).reverse().slice(0,8);

  return { docs, capMoi, giaHan, monthly, categories, recent: sorted };
}

const DATA: Record<string,ReturnType<typeof buildYearData>> = {
  '2025': buildYearData(2025),
  '2026': buildYearData(2026),
  'all':  buildYearData(0),   // placeholder – overridden below
};
// "all" = full corpus
DATA['all'] = (() => {
  const docs = ALL;
  const capMoi = docs.filter(d=>d.type==='Cấp mới');
  const giaHan = docs.filter(d=>d.type==='Gia hạn');
  const monthly = Array(12).fill(0);
  docs.forEach(d=>{const{m}=parseDMY(d.date);if(m>=1&&m<=12)monthly[m-1]++;});
  const catCounts:Record<string,number>={};
  docs.forEach(d=>{const c=classify(d);catCounts[c]=(catCounts[c]||0)+1;});
  const total=docs.length||1;
  const categories=CATEGORIES_DEF.map(c=>({...c,count:catCounts[c.name]||0,pct:Math.round(((catCounts[c.name]||0)/total)*100)})).filter(c=>c.count>0);
  const sorted=[...docs].sort((a,b)=>{
    const{y:ay,m:am,d:ad}=parseDMY(a.date);
    const{y:by,m:bm,d:bd}=parseDMY(b.date);
    return new Date(by,bm-1,bd).getTime()-new Date(ay,am-1,ad).getTime();
  }).reverse().slice(0,8);
  return{docs,capMoi,giaHan,monthly,categories,recent:sorted};
})();

const MONTHS = ['T1','T2','T3','T4','T5','T6','T7','T8','T9','T10','T11','T12'];

// ── Subcomponents ─────────────────────────────────────────────────────────────
function KpiCard({ label, value, sub, icon: Icon, color, bg, change, changeDir, delay }:
  { label:string; value:string; sub:string; icon:React.ElementType; color:string; bg:string; change:string; changeDir:'up'|'down'|'flat'; delay:number }) {
  return (
    <motion.div
      initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay }}
      className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm hover:shadow-lg hover:shadow-slate-200/50 transition-all duration-300 relative overflow-hidden group"
    >
      <div className={`absolute -right-6 -top-6 w-24 h-24 rounded-full ${bg} blur-2xl opacity-40 group-hover:opacity-80 transition-opacity`} />
      <div className="flex justify-between items-start mb-5 relative z-10">
        <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${bg} ${color}`}>
          <Icon className="w-5 h-5" />
        </div>
        <span className={`flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full ${
          changeDir==='up' ? 'text-emerald-700 bg-emerald-50' :
          changeDir==='down' ? 'text-rose-700 bg-rose-50' :
          'text-slate-500 bg-slate-100'
        }`}>
          {changeDir==='up' ? <TrendingUp className="w-3 h-3"/> : changeDir==='down' ? <TrendingDown className="w-3 h-3"/> : <Minus className="w-3 h-3"/>}
          {change}
        </span>
      </div>
      <div className="relative z-10">
        <div className="text-[2.2rem] font-black text-slate-900 tracking-tight leading-none mb-1">{value}</div>
        <p className="text-[13px] font-bold text-slate-800">{label}</p>
        <p className="text-[11px] text-slate-400 font-medium mt-0.5">{sub}</p>
      </div>
    </motion.div>
  );
}

function TypeBadge({ type }: { type: string }) {
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
      type === 'Cấp mới' ? 'bg-blue-50 text-blue-700 border border-blue-200' : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
    }`}>
      {type === 'Cấp mới' ? <ShieldCheck className="w-2.5 h-2.5"/> : <CheckCircle2 className="w-2.5 h-2.5"/>}
      {type}
    </span>
  );
}

// ── Main component ────────────────────────────────────────────────────────────
export default function ThongKeSHTT() {
  const [mounted, setMounted] = useState(false);
  const [yearKey, setYearKey] = useState<'2026'|'2025'|'all'>('all');
  const [showFilter, setShowFilter] = useState(false);
  const [showLogsModal, setShowLogsModal] = useState(false);
  const [exporting, setExporting] = useState(false);
  const [exportDone, setExportDone] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return <div className="min-h-screen bg-[#f8fafc]"/>;

  const d = DATA[yearKey];
  const maxMonthly = Math.max(...d.monthly, 1);
  const totalUniqueNames = new Set(ALL.map(doc => doc.name.split(',')[0].trim())).size;

  const handleExport = () => {
    if (exporting) return;
    setExporting(true);
    setTimeout(() => { setExporting(false); setExportDone(true); setTimeout(()=>setExportDone(false),3000); }, 1500);
  };

  const yearLabel = yearKey === 'all' ? 'Tất cả' : `Năm ${yearKey}`;

  return (
    <div className="flex flex-col min-h-screen bg-[#f8fafc] -m-6 lg:-m-12 p-6 lg:p-10 font-sans text-slate-800 relative">

      {/* TOAST */}
      <AnimatePresence>
        {(exporting || exportDone) && (
          <motion.div
            initial={{ opacity:0, y:-50, x:'-50%' }} animate={{ opacity:1, y:0, x:'-50%' }} exit={{ opacity:0, y:-20, x:'-50%' }}
            className={`fixed top-6 left-1/2 z-50 flex items-center gap-3 px-6 py-3 rounded-xl shadow-2xl font-semibold text-white ${exportDone?'bg-emerald-600':'bg-slate-800'}`}
          >
            {exporting ? <Loader2 className="w-5 h-5 animate-spin"/> : <CheckCircle2 className="w-5 h-5"/>}
            {exporting ? 'Đang trích xuất báo cáo...' : 'Báo cáo đã được tải xuống!'}
          </motion.div>
        )}
      </AnimatePresence>

      {/* HEADER */}
      <motion.div initial={{ opacity:0, y:-20 }} animate={{ opacity:1, y:0 }}
        className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 relative z-20">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100/50 text-blue-700 rounded-full text-[11px] font-bold tracking-wide uppercase mb-3 border border-blue-200">
            <BarChart3 className="w-3.5 h-3.5"/> Executive Dashboard
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">Báo cáo toàn cảnh SHTT</h1>
          <p className="text-slate-500 mt-1.5 font-medium text-sm">
            Dữ liệu thực thi quyền SHTT tại biên giới hải quan · {ALL.length} hồ sơ · Cập nhật {fmtDate(ALL.slice().sort((a,b)=>parseDMY(b.date).y-parseDMY(a.date).y||parseDMY(b.date).m-parseDMY(a.date).m||parseDMY(b.date).d-parseDMY(a.date).d)[0].date)}
          </p>
        </div>
        <div className="flex items-center gap-3 relative">
          <div className="relative">
            <button onClick={()=>setShowFilter(!showFilter)}
              className="flex items-center gap-2 px-4 py-2 bg-white hover:bg-slate-50 text-slate-700 text-sm font-semibold rounded-xl border border-slate-200 shadow-sm transition-all">
              Lọc: {yearLabel} <ChevronDown className={`w-4 h-4 opacity-50 transition-transform ${showFilter?'rotate-180':''}`}/>
            </button>
            <AnimatePresence>
              {showFilter && (
                <motion.div initial={{ opacity:0, y:10, scale:0.95 }} animate={{ opacity:1, y:0, scale:1 }} exit={{ opacity:0, y:10, scale:0.95 }}
                  className="absolute top-12 right-0 w-44 bg-white rounded-xl shadow-xl border border-slate-100 overflow-hidden z-50">
                  {(['all','2026','2025'] as const).map(y=>(
                    <button key={y} onClick={()=>{setYearKey(y);setShowFilter(false);}}
                      className={`w-full text-left px-4 py-3 text-sm font-bold hover:bg-slate-50 transition-colors ${yearKey===y?'text-blue-600 bg-blue-50':'text-slate-700'}`}>
                      {y==='all'?'Tất cả thời gian':`Năm ${y}`}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <button onClick={handleExport}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-xl shadow-md shadow-blue-600/20 transition-all active:scale-95">
            <Download className="w-4 h-4"/> Xuất báo cáo
          </button>
        </div>
      </motion.div>

      {/* KPI CARDS */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-5 mb-8 relative z-10">
        <KpiCard label="Tổng hồ sơ bảo hộ" value={String(d.docs.length || ALL.length)} sub={`Toàn bộ hồ sơ ${yearLabel.toLowerCase()}`} icon={FileText} color="text-blue-600" bg="bg-blue-50" change={`${ALL.length} tổng`} changeDir="up" delay={0}/>
        <KpiCard label="Hồ sơ cấp mới" value={String(d.capMoi.length)} sub="Nhãn hiệu được cấp phép mới" icon={ShieldCheck} color="text-indigo-600" bg="bg-indigo-50" change="Mới nhất 04/2026" changeDir="up" delay={0.07}/>
        <KpiCard label="Hồ sơ gia hạn" value={String(d.giaHan.length)} sub="Nhãn hiệu gia hạn hiệu lực" icon={CheckCircle2} color="text-emerald-600" bg="bg-emerald-50" change={`${Math.round((d.giaHan.length/(d.docs.length||1))*100)}% tổng hồ sơ`} changeDir="flat" delay={0.14}/>
        <KpiCard label="Nhãn hiệu theo dõi" value={String(totalUniqueNames)} sub="Thương hiệu đang được giám sát" icon={Tag} color="text-orange-600" bg="bg-orange-50" change="Đa ngành hàng" changeDir="up" delay={0.21}/>
      </div>

      {/* CHARTS ROW */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8 relative z-10">

        {/* BAR CHART — monthly trend (2/3) */}
        <motion.div initial={{ opacity:0, scale:0.98 }} animate={{ opacity:1, scale:1 }} transition={{ delay:0.3 }}
          className="lg:col-span-2 bg-white rounded-2xl border border-slate-100 shadow-sm flex flex-col overflow-hidden">
          <div className="px-6 py-5 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
            <div>
              <h2 className="text-base font-bold text-slate-900">Biến động hồ sơ theo tháng</h2>
              <p className="text-[12px] text-slate-400 font-medium mt-0.5">Số hồ sơ được xử lý / cấp phép · {yearLabel}</p>
            </div>
            <div className="flex items-center gap-4 text-[12px]">
              <span className="flex items-center gap-1.5 font-bold text-slate-600">
                <span className="w-3 h-3 rounded bg-blue-500 inline-block"/> Cấp mới
              </span>
              <span className="flex items-center gap-1.5 font-bold text-slate-600">
                <span className="w-3 h-3 rounded bg-emerald-400 inline-block"/> Gia hạn
              </span>
            </div>
          </div>
          <div className="p-6 flex-1 relative" style={{ minHeight: 280 }}>
            {/* Axis labels left */}
            <div className="absolute left-2 inset-y-6 flex flex-col justify-between pointer-events-none pb-8">
              {[maxMonthly, Math.round(maxMonthly*0.75), Math.round(maxMonthly*0.5), Math.round(maxMonthly*0.25), 0].map(v=>(
                <span key={v} className="text-[10px] text-slate-300 font-bold leading-none">{v}</span>
              ))}
            </div>
            {/* Grid */}
            <div className="absolute inset-x-8 inset-y-6 flex flex-col justify-between pb-8 pointer-events-none">
              {[0,1,2,3,4].map(i=>(
                <div key={i} className="w-full border-t border-dashed border-slate-100"/>
              ))}
            </div>
            {/* Bars */}
            <div className="relative flex items-end justify-between h-full pb-8 pl-8 gap-1">
              {d.monthly.map((val,i) => {
                const month = i+1;
                const cmCount = d.capMoi.filter(doc=>parseDMY(doc.date).m===month).length;
                const ghCount = d.giaHan.filter(doc=>parseDMY(doc.date).m===month).length;
                const pct = (val/maxMonthly)*100;
                return (
                  <div key={i} className="flex-1 flex flex-col items-center justify-end group h-full relative">
                    {val>0 && (
                      <span className="absolute -top-5 text-[10px] font-black text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">{val} hồ sơ</span>
                    )}
                    <div className="w-full relative flex flex-col justify-end" style={{ height: '100%' }}>
                      <motion.div
                        initial={{ height:0 }} animate={{ height:`${pct}%` }}
                        transition={{ duration:0.7, delay:0.1+i*0.04, type:'spring', bounce:0.25 }}
                        className="w-full rounded-t-lg overflow-hidden flex flex-col"
                        style={{ minHeight: val>0?4:0 }}
                      >
                        {/* stack: green bottom (gia han), blue top (cap moi) */}
                        {ghCount>0 && <div className="flex-1 bg-emerald-400 group-hover:bg-emerald-500 transition-colors"/>}
                        {cmCount>0 && <div style={{ flex: cmCount/(val||1) }} className="bg-blue-500 group-hover:bg-blue-600 transition-colors"/>}
                        {val===0 && <div className="h-1 bg-slate-100 rounded"/>}
                      </motion.div>
                    </div>
                    <span className="absolute -bottom-6 text-[10px] font-bold text-slate-400 group-hover:text-blue-600 transition-colors">{MONTHS[i]}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* DONUT CHART — category (1/3) */}
        <motion.div initial={{ opacity:0, x:20 }} animate={{ opacity:1, x:0 }} transition={{ delay:0.5 }}
          className="bg-white rounded-2xl border border-slate-100 shadow-sm flex flex-col overflow-hidden">
          <div className="px-6 py-5 border-b border-slate-100 bg-slate-50/50">
            <h2 className="text-base font-bold text-slate-900">Phân loại nhãn hiệu</h2>
            <p className="text-[12px] text-slate-400 font-medium mt-0.5">Cơ cấu theo ngành hàng</p>
          </div>
          <div className="p-6 flex flex-col items-center">
            {/* CSS Conic Donut */}
            {d.categories.length > 0 ? (() => {
              let acc = 0;
              const segments = d.categories.map(c => { const from=acc; acc+=c.pct; return { ...c, from, to: acc }; });
              const grad = segments.map(s=>`${s.color} ${s.from}% ${s.to}%`).join(', ');
              return (
                <div className="relative w-44 h-44 rounded-full mb-6 shadow-xl shadow-slate-200/60 flex items-center justify-center"
                     style={{ background: `conic-gradient(${grad})` }}>
                  <div className="absolute inset-3 bg-white rounded-full flex flex-col items-center justify-center shadow-inner">
                    <span className="text-2xl font-black text-slate-800">{d.docs.length}</span>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide mt-0.5">Hồ sơ</span>
                  </div>
                </div>
              );
            })() : (
              <div className="w-44 h-44 rounded-full bg-slate-100 flex items-center justify-center mb-6">
                <span className="text-slate-300 text-sm font-bold">Không có dữ liệu</span>
              </div>
            )}
            <div className="w-full space-y-2.5">
              {d.categories.map((cat,i) => (
                <div key={i} className="flex items-center gap-2.5 group">
                  <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: cat.color }}/>
                  <span className="text-[12px] font-semibold text-slate-600 flex-1 truncate">{cat.name}</span>
                  <span className="text-[12px] font-black text-slate-800">{cat.count}</span>
                  <span className="text-[11px] font-bold text-slate-400 w-8 text-right">{cat.pct}%</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* BOTTOM: Type split + Recent log */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 relative z-10">

        {/* TYPE SPLIT (2/5) */}
        <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.7 }}
          className="lg:col-span-2 bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="px-6 py-5 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900">Phân loại hồ sơ</h3>
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wide">{yearLabel}</span>
          </div>
          <div className="p-6 space-y-5">
            {/* Cấp mới */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-blue-500"/>
                  <span className="text-sm font-bold text-slate-700">Cấp mới</span>
                </div>
                <span className="text-sm font-black text-slate-900">{d.capMoi.length} hồ sơ</span>
              </div>
              <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                <motion.div initial={{ width:0 }} animate={{ width:`${Math.round((d.capMoi.length/(d.docs.length||1))*100)}%` }}
                  transition={{ duration:1, delay:0.8 }} className="h-full bg-blue-500 rounded-full"/>
              </div>
              <p className="text-[11px] text-slate-400 mt-1">{Math.round((d.capMoi.length/(d.docs.length||1))*100)}% tổng hồ sơ</p>
            </div>
            {/* Gia hạn */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500"/>
                  <span className="text-sm font-bold text-slate-700">Gia hạn</span>
                </div>
                <span className="text-sm font-black text-slate-900">{d.giaHan.length} hồ sơ</span>
              </div>
              <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                <motion.div initial={{ width:0 }} animate={{ width:`${Math.round((d.giaHan.length/(d.docs.length||1))*100)}%` }}
                  transition={{ duration:1, delay:0.9 }} className="h-full bg-emerald-500 rounded-full"/>
              </div>
              <p className="text-[11px] text-slate-400 mt-1">{Math.round((d.giaHan.length/(d.docs.length||1))*100)}% tổng hồ sơ</p>
            </div>
            {/* Divider */}
            <div className="border-t border-slate-100 pt-4 space-y-2">
              <div className="flex justify-between text-[12px]">
                <span className="text-slate-500 font-medium">Tổng nhãn hiệu theo dõi</span>
                <span className="font-black text-slate-800">{totalUniqueNames}</span>
              </div>
              <div className="flex justify-between text-[12px]">
                <span className="text-slate-500 font-medium">Hồ sơ mới nhất</span>
                <span className="font-black text-slate-800">{fmtDate(DATA['all'].recent[0]?.date || '01042026')}</span>
              </div>
              <div className="flex justify-between text-[12px]">
                <span className="text-slate-500 font-medium">Hồ sơ cũ nhất</span>
                <span className="font-black text-slate-800">{fmtDate(DATA['all'].docs.slice().sort((a,b)=>{
                  const{y:ay,m:am,d:ad}=parseDMY(a.date);const{y:by,m:bm,d:bd}=parseDMY(b.date);
                  return new Date(ay,am-1,ad).getTime()-new Date(by,bm-1,bd).getTime();
                })[0]?.date||'05082025')}</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* RECENT LOG (3/5) */}
        <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.85 }}
          className="lg:col-span-3 bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden flex flex-col">
          <div className="px-6 py-5 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-1.5 bg-indigo-100 text-indigo-600 rounded-lg"><Activity className="w-4 h-4"/></div>
              <h3 className="text-base font-bold text-slate-900">Hồ sơ gần đây</h3>
            </div>
            <button onClick={()=>setShowLogsModal(true)} className="flex items-center gap-1 text-[12px] font-bold text-blue-600 hover:text-blue-800 transition-colors">
              Xem tất cả <ArrowRight className="w-3.5 h-3.5"/>
            </button>
          </div>
          <div className="flex-1 overflow-y-auto">
            <table className="w-full text-sm">
              <thead className="text-[11px] uppercase tracking-wider font-bold text-slate-400 bg-slate-50 sticky top-0">
                <tr>
                  <th className="px-5 py-3 text-left">Ngày</th>
                  <th className="px-5 py-3 text-left">Nhãn hiệu</th>
                  <th className="px-5 py-3 text-left">Loại</th>
                  <th className="px-5 py-3 text-left">Mã số</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {(yearKey==='all' ? DATA['all'] : d).recent.map((doc,i)=>(
                  <tr key={doc.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="px-5 py-3.5 text-[12px] font-medium text-slate-500 whitespace-nowrap">{fmtDate(doc.date)}</td>
                    <td className="px-5 py-3.5 font-bold text-slate-800 max-w-[160px] truncate text-[13px]">{doc.name}</td>
                    <td className="px-5 py-3.5"><TypeBadge type={doc.type}/></td>
                    <td className="px-5 py-3.5 text-[11px] font-mono text-slate-400">{doc.code}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>

      {/* ALL LOGS MODAL */}
      <AnimatePresence>
        {showLogsModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
              onClick={()=>setShowLogsModal(false)} className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"/>
            <motion.div initial={{ opacity:0, scale:0.95, y:20 }} animate={{ opacity:1, scale:1, y:0 }} exit={{ opacity:0, scale:0.95, y:20 }}
              className="relative w-full max-w-4xl max-h-[80vh] flex flex-col bg-white rounded-3xl shadow-2xl overflow-hidden">
              <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100 bg-slate-50/50">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-blue-100 text-blue-600"><Activity className="w-5 h-5"/></div>
                  <div>
                    <h2 className="text-lg font-bold text-slate-900">Toàn bộ hồ sơ bảo hộ</h2>
                    <p className="text-[12px] font-medium text-slate-500">{ALL.length} hồ sơ · Cục Hải quan Việt Nam</p>
                  </div>
                </div>
                <button onClick={()=>setShowLogsModal(false)} className="p-2 rounded-full hover:bg-slate-200 text-slate-500 transition-colors">
                  <X className="w-5 h-5"/>
                </button>
              </div>
              <div className="flex-1 overflow-y-auto">
                <table className="w-full text-sm">
                  <thead className="text-[11px] uppercase tracking-wider font-bold text-slate-400 bg-white sticky top-0 shadow-sm z-10">
                    <tr>
                      <th className="px-6 py-4 text-left">Ngày</th>
                      <th className="px-6 py-4 text-left">Nhãn hiệu</th>
                      <th className="px-6 py-4 text-left">Loại</th>
                      <th className="px-6 py-4 text-left">Mã số</th>
                      <th className="px-6 py-4 text-left">Ngành hàng</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {ALL.slice().sort((a,b)=>{
                      const{y:ay,m:am,d:ad}=parseDMY(a.date);const{y:by,m:bm,d:bd}=parseDMY(b.date);
                      return new Date(by,bm-1,bd).getTime()-new Date(ay,am-1,ad).getTime();
                    }).map((doc,i)=>(
                      <tr key={doc.id} className={`hover:bg-slate-50/80 transition-colors ${i%2===0?'bg-white':'bg-slate-50/30'}`}>
                        <td className="px-6 py-3.5 text-[12px] font-medium text-slate-500 whitespace-nowrap">{fmtDate(doc.date)}</td>
                        <td className="px-6 py-3.5 font-bold text-slate-800 max-w-[200px]">
                          <div className="truncate">{doc.name}</div>
                        </td>
                        <td className="px-6 py-3.5"><TypeBadge type={doc.type}/></td>
                        <td className="px-6 py-3.5 text-[11px] font-mono text-slate-400">{doc.code}</td>
                        <td className="px-6 py-3.5 text-[11px] text-slate-500 font-medium">{classify(doc)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <ChatBot/>
    </div>
  );
}
