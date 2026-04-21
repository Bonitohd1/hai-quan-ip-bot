'use client';

import React, { useState, useEffect } from 'react';
import ChatBot from '@/components/ChatBot';
import { 
  BarChart3, TrendingUp, ShieldAlert, PackageSearch, Award,
  ChevronDown, MoreHorizontal, ArrowUpRight, ArrowDownRight,
  Filter, Download, MapPin, Layers, Briefcase, Zap, ShieldCheck, Activity, X, CheckCircle2, Loader2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// --- DATA SETS — chờ dữ liệu thực từ hệ thống ---
const MOCK_DATA = {
  '2026': { kpis: [] as { label: string; value: string; change: string; trend: string; icon: React.ElementType; color: string; bg: string; desc: string }[], trends: [] as number[] },
  '2025': { kpis: [] as { label: string; value: string; change: string; trend: string; icon: React.ElementType; color: string; bg: string; desc: string }[], trends: [] as number[] },
};

const CATEGORIES: { name: string; count: number; pct: number; color: string }[] = [];
const LOCATION_DATA: { name: string; value: string; level: number }[] = [];
const LOGS_DATA: { status: string; badge: string; dot: string; title: string; loc: string; brands: string }[] = [];

// --- COMPONENTS ---

export default function ThongKeSHTT() {
  const [mounted, setMounted] = useState(false);
  const [year, setYear] = useState<'2026' | '2025'>('2026');
  const [showFilter, setShowFilter] = useState(false);
  const [showLogsModal, setShowLogsModal] = useState(false);
  
  // Export states
  const [exporting, setExporting] = useState(false);
  const [exportDone, setExportDone] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return <div className="min-h-screen bg-[#f8fafc]" />;

  const data = MOCK_DATA[year];
  const maxTrend = data.trends.length > 0 ? Math.max(...data.trends) : 1;
  const hasData = data.kpis.length > 0 || data.trends.length > 0;
  const months = ['T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'T8', 'T9', 'T10', 'T11', 'T12'];

  const handleExport = () => {
    if (exporting) return;
    setExporting(true);
    setExportDone(false);
    setTimeout(() => {
      setExporting(false);
      setExportDone(true);
      setTimeout(() => setExportDone(false), 3000);
    }, 1500);
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#f8fafc] -m-6 lg:-m-12 p-6 lg:p-10 font-sans text-slate-800 relative">
      
      {/* EXPORT TOAST */}
      <AnimatePresence>
        {(exporting || exportDone) && (
          <motion.div 
            initial={{ opacity: 0, y: -50, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: -20, x: '-50%' }}
            className={`fixed top-6 left-1/2 z-50 flex items-center gap-3 px-6 py-3 rounded-xl shadow-2xl ${exportDone ? 'bg-emerald-600' : 'bg-slate-800'} text-white font-semibold`}
          >
            {exporting ? <Loader2 className="w-5 h-5 animate-spin" /> : <CheckCircle2 className="w-5 h-5" />}
            {exporting ? 'Đang trích xuất báo cáo...' : 'Tải xuống báo cáo thành công!'}
          </motion.div>
        )}
      </AnimatePresence>

      {/* HEADER / EXECUTIVE SUMMARY */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 relative z-20"
      >
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100/50 text-blue-700 rounded-full text-xs font-bold tracking-wide uppercase mb-3 border border-blue-200">
            <BarChart3 className="w-3.5 h-3.5" />
            Executive Dashboard
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">
            Báo Cáo Toàn Cảnh SHTT
          </h1>
          <p className="text-slate-500 mt-2 font-medium">
            Thông tin tác nghiệp & phân tích chuyên sâu dữ liệu thực thi quyền SHTT tại biên giới.
          </p>
        </div>
        
        <div className="flex items-center gap-3 relative">
          {/* FILTER DROPDOWN */}
          <div className="relative">
            <button 
              onClick={() => setShowFilter(!showFilter)}
              className="flex items-center gap-2 px-4 py-2 bg-white hover:bg-slate-50 text-slate-700 text-sm font-semibold rounded-xl border border-slate-200 shadow-sm transition-all focus:ring-2 focus:ring-blue-100"
            >
              <Filter className="w-4 h-4 text-slate-400" />
              Lọc: Năm {year} <ChevronDown className={`w-4 h-4 opacity-50 transition-transform ${showFilter ? 'rotate-180' : ''}`} />
            </button>
            <AnimatePresence>
              {showFilter && (
                <motion.div 
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute top-12 right-0 w-40 bg-white rounded-xl shadow-xl border border-slate-100 overflow-hidden z-50"
                >
                  <button onClick={() => { setYear('2026'); setShowFilter(false); }} className={`w-full text-left px-4 py-3 text-sm font-bold hover:bg-slate-50 transition-colors ${year === '2026' ? 'text-blue-600 bg-blue-50' : 'text-slate-700'}`}>Năm 2026</button>
                  <button onClick={() => { setYear('2025'); setShowFilter(false); }} className={`w-full text-left px-4 py-3 text-sm font-bold hover:bg-slate-50 transition-colors ${year === '2025' ? 'text-blue-600 bg-blue-50' : 'text-slate-700'}`}>Năm 2025</button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <button 
            onClick={handleExport}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-xl shadow-md shadow-blue-600/20 transition-all active:scale-95"
          >
            <Download className="w-4 h-4" />
            Xuất Báo Cáo
          </button>
        </div>
      </motion.div>

      {/* Thông báo chưa có dữ liệu thực */}
      {!hasData && (
        <div className="mb-8 p-8 bg-white rounded-2xl border border-dashed border-slate-300 flex flex-col items-center gap-3 text-slate-400">
          <BarChart3 className="w-10 h-10 opacity-30" />
          <p className="text-sm font-semibold text-center">Chưa có dữ liệu thống kê.<br/>Số liệu sẽ được cập nhật khi có căn cứ chính xác từ hệ thống.</p>
        </div>
      )}

      {/* KPI METRICS ROW */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8 relative z-10">
        {data.kpis.map((item, i) => (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            key={`${year}-${i}`} 
            className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300 relative overflow-hidden group"
          >
            {/* Background Glow */}
            <div className={`absolute -right-6 -top-6 w-24 h-24 rounded-full ${item.bg} blur-2xl opacity-50 group-hover:opacity-100 transition-opacity`} />
            
            <div className="flex justify-between items-start mb-6 relative z-10">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${item.bg} ${item.color}`}>
                <item.icon className="w-6 h-6" />
              </div>
              <div className={`flex items-center gap-1 font-bold text-sm px-2.5 py-1 rounded-full ${item.trend === 'up' ? 'text-emerald-700 bg-emerald-50' : 'text-rose-700 bg-rose-50'}`}>
                {item.trend === 'up' ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                {item.change}
              </div>
            </div>
            
            <div className="relative z-10">
              <motion.h3 
                key={item.value}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-[2.25rem] font-bold text-slate-900 tracking-tight leading-none mb-2"
              >
                {item.value}
              </motion.h3>
              <p className="text-[13px] font-medium text-slate-800 mb-1">{item.label}</p>
              <p className="text-[12px] text-slate-500 font-medium">{item.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* MAIN CHARTS GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8 relative z-10">
         
         {/* LARGE CHART: TRENDS (2/3 width) */}
         <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-2 bg-white rounded-2xl border border-slate-100 shadow-sm flex flex-col overflow-hidden"
         >
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
              <div>
                <h2 className="text-lg font-bold text-slate-900">Biến động vụ việc bắt giữ</h2>
                <p className="text-sm text-slate-500 font-medium mt-1">Xu hướng hàng tháng năm {year}</p>
              </div>
            </div>
            
            <div className="p-6 flex-1 flex flex-col relative h-[380px]">
              {/* Chart Overlay Stats */}
              <div className="flex gap-8 mb-8 z-10">
                <div>
                  <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">Đỉnh điểm</p>
                  <p className="text-2xl font-bold text-slate-800">{Math.max(...data.trends)} <span className="text-sm font-semibold text-slate-500">Vụ</span></p>
                </div>
                <div>
                  <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">Trung bình</p>
                  <p className="text-2xl font-bold text-slate-800">{Math.round(data.trends.reduce((a,b)=>a+b,0)/12)} <span className="text-sm font-semibold text-slate-500">Vụ/tháng</span></p>
                </div>
              </div>
              
              <div className="flex-1 flex items-end justify-between w-full relative pt-10">
                 {/* Fake Grid lines */}
                 <div className="absolute inset-x-0 inset-y-0 flex flex-col justify-between pointer-events-none pb-8 pt-10">
                   {[4,3,2,1,0].map(val => (
                     <div key={val} className="w-full border-b border-slate-100 border-dashed relative">
                        <span className="absolute -top-3.5 -left-1 text-[10px] font-bold text-slate-300">
                          {Math.round(maxTrend * (val/4))}
                        </span>
                     </div>
                   ))}
                 </div>

                 {/* The Bars */}
                 <div className="relative z-10 w-full h-full flex items-end justify-between pb-8 pl-8">
                   {data.trends.map((val, i) => {
                      const heightPct = (val / maxTrend) * 100;
                      return (
                         <div key={`${year}-${i}`} className="flex flex-col items-center group relative w-full px-1 sm:px-2 h-full justify-end">
                            {/* Value tooltip */}
                            <motion.span 
                               initial={{ opacity: 0, y: 10 }}
                               whileHover={{ opacity: 1, y: 0 }}
                               className="absolute -top-10 bg-slate-800 text-white text-[12px] font-bold px-2.5 py-1 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-all z-20 pointer-events-none"
                            >
                               {val}
                            </motion.span>
                            
                            {/* Animated Line/Bar */}
                            <motion.div 
                               initial={{ height: 0 }}
                               animate={{ height: `${heightPct}%` }}
                               transition={{ duration: 1, delay: 0.1 + (i * 0.05), type: "spring", bounce: 0.3 }}
                               className="w-full max-w-[40px] rounded-t-lg bg-gradient-to-t from-blue-600 to-indigo-400 opacity-80 group-hover:opacity-100 group-hover:from-blue-500 group-hover:to-indigo-300 transition-all cursor-pointer relative"
                            >
                                {/* Glow on hover */}
                                <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity rounded-t-lg" />
                            </motion.div>
                            
                            <span className="absolute -bottom-6 text-[12px] font-bold text-slate-400 group-hover:text-blue-600 transition-colors uppercase">{months[i]}</span>
                         </div>
                      );
                   })}
                 </div>
              </div>
            </div>
         </motion.div>

         {/* PIE/DISTRIBUTION (1/3 width) */}
         <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white rounded-2xl border border-slate-100 shadow-sm flex flex-col overflow-hidden"
         >
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
              <div>
                <h2 className="text-lg font-bold text-slate-900">Mặt hàng vi phạm</h2>
                <p className="text-sm text-slate-500 font-medium mt-1">Cơ cấu theo ngành hàng</p>
              </div>
            </div>
            
            <div className="p-6 flex-1 flex flex-col items-center justify-start">
              {/* CSS Donut Chart */}
              <div className="relative w-52 h-52 rounded-full flex items-center justify-center mt-4 mb-8 shadow-xl shadow-slate-200/50"
                   style={{
                     background: `conic-gradient(
                       ${CATEGORIES[0].color} 0% ${CATEGORIES[0].pct}%, 
                       ${CATEGORIES[1].color} ${CATEGORIES[0].pct}% ${CATEGORIES[0].pct + CATEGORIES[1].pct}%, 
                       ${CATEGORIES[2].color} ${CATEGORIES[0].pct + CATEGORIES[1].pct}% ${CATEGORIES[0].pct + CATEGORIES[1].pct + CATEGORIES[2].pct}%, 
                       ${CATEGORIES[3].color} ${CATEGORIES[0].pct + CATEGORIES[1].pct + CATEGORIES[2].pct}% 100%
                     )`
                   }}
              >
                {/* Donut hole */}
                <div className="absolute inset-2 bg-white rounded-full shadow-inner flex flex-col items-center justify-center">
                  <span className="text-3xl font-bold text-slate-800">100%</span>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Tỷ trọng</span>
                </div>
              </div>

              <div className="w-full space-y-4">
                {CATEGORIES.map((cat, i) => (
                  <div key={i} className="flex items-center justify-between group p-2 hover:bg-slate-50 rounded-lg transition-colors cursor-pointer">
                    <div className="flex items-center gap-3">
                       <div className="w-3 h-3 rounded-full shadow-sm" style={{ backgroundColor: cat.color }} />
                       <span className="text-[13px] font-bold text-slate-700 group-hover:text-blue-600 transition-colors">{cat.name}</span>
                    </div>
                    <div className="flex items-center gap-3">
                       <span className="text-[13px] font-bold text-slate-900">{cat.pct}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
         </motion.div>
      </div>

      {/* BOTTOM REPORTS ROW */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 relative z-10">
        
        {/* TOP LOCATIONS / HEATMAP STAND-IN */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden"
        >
          <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
            <div className="flex items-center gap-3">
               <div className="p-2 bg-rose-100 text-rose-600 rounded-lg">
                  <MapPin className="w-5 h-5" />
               </div>
               <h3 className="text-base font-bold text-slate-900">Điểm nóng vi phạm</h3>
            </div>
            <span className="text-xs font-bold text-rose-600 uppercase tracking-wider bg-rose-50 px-3 py-1 rounded-full">Top Cửa khẩu</span>
          </div>
          <div className="p-6 space-y-6">
             {LOCATION_DATA.map((loc, i) => (
               <div key={i} className="group">
                 <div className="flex justify-between items-end mb-2">
                   <span className="text-[14px] font-bold text-slate-700">{loc.name}</span>
                   <span className="text-[14px] font-bold text-slate-900">{loc.value}</span>
                 </div>
                 <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                    <motion.div 
                       initial={{ width: 0 }}
                       whileInView={{ width: `${loc.level}%` }}
                       transition={{ duration: 1, delay: 0.2 + (i * 0.1) }}
                       className={`h-full rounded-full ${i === 0 ? 'bg-rose-500' : i === 1 ? 'bg-orange-500' : 'bg-blue-500'}`}
                    />
                 </div>
               </div>
             ))}
          </div>
        </motion.div>

        {/* RECENT INTELLIGENCE LOGS */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden flex flex-col"
        >
          <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
            <div className="flex items-center gap-3">
               <div className="p-2 bg-indigo-100 text-indigo-600 rounded-lg">
                  <Activity className="w-5 h-5" />
               </div>
               <h3 className="text-base font-bold text-slate-900">Nhật ký tác nghiệp trực tiếp</h3>
            </div>
            <button 
              onClick={() => setShowLogsModal(true)}
              className="text-sm font-bold text-blue-600 hover:text-blue-800"
            >
              Xem tất cả
            </button>
          </div>
          <div className="p-0 flex-1 overflow-x-auto">
            <table className="w-full text-left text-sm whitespace-nowrap">
               <thead className="bg-white text-slate-400 text-xs uppercase tracking-wider font-bold">
                  <tr>
                     <th className="px-6 py-4">Tình trạng</th>
                     <th className="px-6 py-4">Sự vụ / Lô hàng</th>
                     <th className="px-6 py-4">Nhãn hiệu</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-slate-50">
                  {LOGS_DATA.slice(0,3).map((log, i) => (
                    <tr key={i} className="hover:bg-slate-50/80 transition-colors">
                       <td className="px-6 py-4">
                          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold ${log.badge}`}>
                             <div className={`w-1.5 h-1.5 rounded-full ${log.dot}`} /> {log.status}
                          </span>
                       </td>
                       <td className="px-6 py-4 font-bold text-slate-800">
                          {log.title}
                          <span className="block text-xs font-medium text-slate-500 mt-0.5">{log.loc}</span>
                       </td>
                       <td className="px-6 py-4 font-semibold text-slate-600">{log.brands}</td>
                    </tr>
                  ))}
               </tbody>
            </table>
          </div>
        </motion.div>
      </div>

      {/* FULL LOGS MODAL */}
      <AnimatePresence>
        {showLogsModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              onClick={() => setShowLogsModal(false)}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }} 
              animate={{ opacity: 1, scale: 1, y: 0 }} 
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-4xl max-h-[80vh] flex flex-col bg-white rounded-3xl shadow-2xl overflow-hidden"
            >
              <div className="flex items-center justify-between p-6 border-b border-slate-100 bg-slate-50/50">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-blue-100 text-blue-600">
                    <Activity className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-slate-900">Chi tiết nhật ký tác nghiệp</h2>
                    <p className="text-sm font-medium text-slate-500">Toàn bộ 24h qua</p>
                  </div>
                </div>
                <button 
                  onClick={() => setShowLogsModal(false)}
                  className="p-2 rounded-full hover:bg-slate-200 text-slate-500 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <div className="flex-1 overflow-y-auto p-0">
                <table className="w-full text-left text-sm whitespace-nowrap">
                   <thead className="bg-white sticky top-0 shadow-sm text-slate-400 text-xs uppercase tracking-wider font-bold z-10">
                      <tr>
                         <th className="px-6 py-4">Tình trạng</th>
                         <th className="px-6 py-4">Sự vụ / Lô hàng</th>
                         <th className="px-6 py-4">Địa điểm</th>
                         <th className="px-6 py-4">Nhãn hiệu liên quan</th>
                      </tr>
                   </thead>
                   <tbody className="divide-y divide-slate-50">
                      {LOGS_DATA.map((log, i) => (
                        <tr key={i} className="hover:bg-slate-50/80 transition-colors">
                           <td className="px-6 py-4">
                              <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold ${log.badge}`}>
                                 <div className={`w-1.5 h-1.5 rounded-full ${log.dot}`} /> {log.status}
                              </span>
                           </td>
                           <td className="px-6 py-4 font-semibold text-slate-800">{log.title}</td>
                           <td className="px-6 py-4 font-medium text-slate-500">{log.loc}</td>
                           <td className="px-6 py-4 font-semibold text-slate-600">{log.brands}</td>
                        </tr>
                      ))}
                   </tbody>
                </table>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <ChatBot />
    </div>
  );
}
