'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  FilePlus, 
  Upload, 
  Trash2, 
  FileText, 
  Search, 
  Settings, 
  LogOut, 
  LayoutDashboard, 
  Download,
  AlertTriangle,
  CheckCircle2,
  Package,
  ShieldAlert,
  Plus,
  Filter,
  MoreHorizontal,
  ChevronLeft,
  X,
  Database,
  Users,
  LineChart,
  HardDrive,
  CloudLightning,
  Lock,
  Cpu
} from 'lucide-react';

interface Document {
  id: string;
  code: string;
  name: string;
  type: string;
  date: string;
  filename: string;
}

export default function AdminDashboard() {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadLoading, setUploadLoading] = useState(false);
  const [uploadMessage, setUploadMessage] = useState({ text: '', type: '' });
  const router = useRouter();

  const [form, setForm] = useState({
    code: '',
    name: '',
    type: 'Gia hạn',
    date: new Date().toLocaleDateString('vi-VN').replace(/\//g, ''),
    description: '',
    file: null as File | null
  });

  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async (q = '') => {
    setIsLoading(true);
    try {
      const res = await fetch(`/api/documents?q=${encodeURIComponent(q)}`);
      const data = await res.json();
      setDocuments(data.documents || []);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSingleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploadLoading(true);
    try {
      const formData = new FormData();
      Object.entries(form).forEach(([key, value]) => {
        if (value) formData.append(key, value);
      });
      const res = await fetch('/api/documents', { method: 'POST', body: formData });
      if (res.ok) {
        setUploadMessage({ text: 'Authorize Success: Dữ liệu đã được nạp.', type: 'success' });
        setTimeout(() => {
          setShowUploadModal(false);
          setUploadMessage({ text: '', type: '' });
          fetchDocuments();
        }, 1500);
      }
    } catch (error) {
      setUploadMessage({ text: 'Authorize Failure!', type: 'error' });
    } finally {
      setUploadLoading(false);
    }
  };

  const handleBulkIngestLocal = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/admin/bulk-ingest');
      const data = await res.json();
      alert(data.message);
      fetchDocuments();
    } catch (err) {
      alert("Lỗi đồng bộ!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen bg-[#020617] text-white overflow-hidden font-sans selection:bg-blue-600/30">
      {/* 🧭 ELITE SIDEBAR - SOLID CARBON */}
      <aside className={`${isSidebarOpen ? 'w-96' : 'w-24'} bg-[#0a192f] border-r-8 border-[#1e293b] transition-all duration-500 ease-in-out flex flex-col z-[100] shadow-[10px_0_40px_rgba(0,0,0,0.5)]`}>
         <div className="h-32 flex items-center justify-center p-8 bg-[#020617] border-b-8 border-[#1e293b]">
            <div className="flex items-center gap-6">
               <div className="w-14 h-14 bg-white/5 border-4 border-white/10 rounded-2xl flex items-center justify-center group cursor-pointer hover:border-[#fbbf24] transition-all duration-300">
                  <ShieldAlert className="w-8 h-8 text-[#fbbf24] group-hover:scale-125 transition-transform" />
               </div>
               {isSidebarOpen && (
                 <div className="flex flex-col reveal">
                    <span className="text-2xl font-black text-white italic tracking-tighter uppercase leading-none">THE CITADEL</span>
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.5em] mt-1.5 leading-none">System Admin Node</span>
                 </div>
               )}
            </div>
         </div>

         <nav className="flex-1 p-8 space-y-4">
            <SidebarLink icon={<LayoutDashboard />} label="VAULT OVERVIEW" active={true} collapsed={!isSidebarOpen} />
            <SidebarLink icon={<FileText />} label="DOCUMENT REGISTRY" active={false} collapsed={!isSidebarOpen} />
            <SidebarLink icon={<Database />} label="IP CORE SYNC" active={false} collapsed={!isSidebarOpen} />
            <SidebarLink icon={<LineChart />} label="VISUAL METRICS" active={false} collapsed={!isSidebarOpen} />
            <SidebarLink icon={<Users />} label="AUTHORITY ACCESS" active={false} collapsed={!isSidebarOpen} />
            <SidebarLink icon={<Cpu />} label="CORE SETTINGS" active={false} collapsed={!isSidebarOpen} />
         </nav>

         <div className="p-8 border-t-8 border-[#1e293b] bg-[#020617] space-y-4">
            <button 
              onClick={() => router.push('/admin/login')}
              className="w-full flex items-center gap-6 p-6 rounded-3xl text-red-500 hover:bg-red-500/10 transition-all group overflow-hidden border-4 border-transparent hover:border-red-500/20"
            >
               <LogOut className="w-7 h-7 group-hover:translate-x-2 transition-transform" />
               {isSidebarOpen && <span className="text-xs font-black uppercase tracking-widest italic">Terminate Session</span>}
            </button>
         </div>
      </aside>

      {/* 🖥️ MAIN WORKSTATION - NO BLUR, SHARP CORE */}
      <main className="flex-1 flex flex-col relative overflow-hidden">
         <header className="h-32 border-b-8 border-[#1e293b] flex items-center justify-between px-16 bg-[#020617] z-50">
            <div className="flex items-center gap-12">
               <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-4 bg-[#0f172a] rounded-2xl border-4 border-[#1e293b] hover:border-blue-500 transition-all active:scale-95">
                  <ChevronLeft className={`w-7 h-7 text-blue-500 transition-transform duration-500 ${!isSidebarOpen ? 'rotate-180' : ''}`} />
               </button>
               <div className="space-y-1.5 reveal">
                  <h1 className="text-4xl font-black text-white uppercase italic tracking-tighter leading-none">Internal IP Command</h1>
                  <p className="text-[11px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-4">
                    <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full shadow-[0_0_15px_#10b981] animate-pulse" />
                    AUTONOMOUS SERVER STATUS: SYNC ACTIVE • {documents.length} RECORDS IN VAULT
                  </p>
               </div>
            </div>

            <div className="flex items-center gap-10">
               <div className="relative group hidden lg:block">
                  <input 
                    type="text" 
                    value={searchTerm}
                    onChange={(e) => {setSearchTerm(e.target.value); fetchDocuments(e.target.value);}}
                    placeholder="Search encrypted data..."
                    className="w-[450px] pl-16 pr-10 py-6 bg-[#0f172a] border-4 border-[#1e293b] rounded-[2rem] outline-none focus:border-[#fbbf24] transition-all text-base font-black italic placeholder:text-slate-800 shadow-inner text-white group-hover:border-white/10"
                  />
                  <Search className="absolute left-7 top-1/2 -translate-y-1/2 w-6 h-6 text-slate-700 group-focus-within:text-[#fbbf24] transition-colors" />
               </div>
               
               <button 
                onClick={() => setShowUploadModal(true)}
                className="bg-[#fbbf24] hover:bg-yellow-500 text-[#020617] px-12 py-6 rounded-[2.5rem] font-black text-sm uppercase tracking-widest flex items-center gap-6 transition-all shadow-3xl border-b-[10px] border-amber-600 active:scale-95 active:translate-y-2 active:border-b-4 hover:shadow-[0_0_40px_rgba(251,191,36,0.3)]"
               >
                  <Plus className="w-7 h-7" />
                  INITIATE INGEST
               </button>
            </div>
         </header>

         {/* 📦 WORKSPACE SCROLL AREA */}
         <section className="flex-1 overflow-y-auto p-16 custom-scrollbar bg-[#020617] space-y-16">
            {/* Quick Metrics (Liquid Carbon Bento) */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 reveal">
               <AdminStat icon={<FileText />} label="GIA HẠN" value={documents.filter(d => d.type === 'Gia hạn').length} color="amber" />
               <AdminStat icon={<Package />} label="CẤP MỚI" value={documents.filter(d => d.type === 'Cấp mới').length} color="blue" />
               <AdminStat icon={<ShieldAlert />} label="VI PHẠM" value={documents.filter(d => d.type === 'Vi phạm').length} color="red" />
               <AdminStat icon={<HardDrive />} label="VAULT" value="95%" color="emerald" />
            </div>

            {/* Main Action Bar for Data Force Sync */}
            <div className="bg-[#0f172a] p-10 rounded-[4rem] border-8 border-white/5 flex flex-col md:flex-row items-center justify-between gap-10 reveal" style={{ animationDelay: '0.1s' }}>
                <div className="flex items-center gap-10">
                   <div className="w-16 h-16 bg-[#020617] rounded-3xl border-4 border-white/10 flex items-center justify-center text-blue-500">
                      <CloudLightning className="w-8 h-8" />
                   </div>
                   <div className="space-y-1">
                      <h3 className="text-2xl font-black text-white italic tracking-tighter uppercase">Local Source Master-Sync</h3>
                      <p className="text-[11px] font-black text-slate-500 uppercase tracking-widest italic">Synchronize with Desktop source directories</p>
                   </div>
                </div>
                <button 
                  onClick={handleBulkIngestLocal}
                  className="bg-white hover:bg-[#fbbf24] text-[#020617] px-14 py-6 rounded-[2rem] font-black text-sm uppercase tracking-widest hover:-translate-y-1 transition-all active:scale-95 shadow-3xl flex items-center gap-5 border-b-[8px] border-slate-300 hover:border-amber-600"
                >
                  <Search className="w-6 h-6" /> Force Folder Scrape
                </button>
            </div>

            {/* Registry Vault Table (Liquid Carbon SHARP) */}
            <div className="bg-[#0f172a] rounded-[5rem] border-8 border-white/5 shadow-3xl overflow-hidden reveal lg:-mx-4" style={{ animationDelay: '0.2s' }}>
               <div className="p-12 border-b-8 border-[#020617] bg-[#0f172a] flex items-center justify-between">
                  <div className="flex items-center gap-8">
                     <Database className="w-10 h-10 text-blue-500" />
                     <h2 className="text-3xl font-black text-white italic tracking-tighter uppercase">AUTHORIZED REGISTRY DATA</h2>
                  </div>
                  <div className="flex items-center gap-6">
                     <button className="flex items-center gap-4 px-10 py-4 bg-[#020617] rounded-2xl border-4 border-[#1e293b] text-[11px] font-black uppercase tracking-widest hover:border-white/30 transition-all italic">
                        <Filter className="w-5 h-5 text-slate-500" /> FILTER VAULT
                     </button>
                     <button className="p-4 bg-[#020617] rounded-2xl border-4 border-[#1e293b] text-slate-500 hover:text-white hover:border-[#fbbf24] transition-all shadow-2xl">
                        <Download className="w-6 h-6" />
                     </button>
                  </div>
               </div>

               <div className="overflow-x-auto">
                  {isLoading ? (
                    <div className="py-40 flex flex-col items-center justify-center gap-12">
                       <div className="w-24 h-24 border-8 border-white/5 border-t-[#fbbf24] rounded-full animate-spin shadow-[0_0_40px_rgba(251,191,36,0.1)]" />
                       <p className="text-[13px] font-black text-slate-700 uppercase tracking-[0.8em] animate-pulse italic">RE-ESTABLISHING SECURE CONNECTION...</p>
                    </div>
                  ) : documents.length > 0 ? (
                    <table className="w-full text-left border-collapse">
                       <thead>
                          <tr className="bg-[#020617] text-slate-500 border-b-8 border-[#020617]">
                             <th className="py-10 pl-16 text-[11px] font-black uppercase tracking-[0.6em]">CASE CORE ID</th>
                             <th className="py-10 text-[11px] font-black uppercase tracking-[0.6em]">SUBJECT / TRADEMARK IDENTITY</th>
                             <th className="py-10 text-[11px] font-black uppercase tracking-[0.6em]">CLASSIFICATION</th>
                             <th className="py-10 text-[11px] font-black uppercase tracking-[0.6em]">MODIFIED</th>
                             <th className="py-10 text-center text-[11px] font-black uppercase tracking-[0.6em]">TASK COMMANDS</th>
                          </tr>
                       </thead>
                       <tbody className="divide-y-8 divide-[#020617]">
                          {documents.map((doc) => (
                            <tr key={doc.id} className="group hover:bg-white/5 transition-all">
                               <td className="py-10 pl-16">
                                  <span className="px-6 py-3 bg-[#020617] text-[#fbbf24] border-4 border-white/5 rounded-2xl text-base font-black italic tracking-widest group-hover:border-[#fbbf24]/50 group-hover:shadow-[0_0_20px_rgba(251,191,36,0.1)] transition-all">
                                     #{doc.code}
                                  </span>
                               </td>
                               <td className="py-10">
                                  <div className="flex items-center gap-8">
                                     <div className="w-16 h-16 bg-[#020617] rounded-3xl flex items-center justify-center border-4 border-white/5 text-slate-800 group-hover:text-white group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-2xl">
                                        <FileText className="w-8 h-8" />
                                     </div>
                                     <div className="flex flex-col gap-2">
                                        <span className="text-xl font-black italic text-white leading-none tracking-tighter uppercase group-hover:text-[#fbbf24] transition-colors">{doc.name}</span>
                                        <span className="text-[11px] font-black text-slate-700 uppercase tracking-widest italic">{doc.filename}</span>
                                     </div>
                                  </div>
                               </td>
                               <td className="py-10">
                                  <span className="px-5 py-2 bg-blue-600/10 text-blue-500 text-[12px] font-black rounded-xl border-2 border-blue-600/20 uppercase tracking-widest italic">{doc.type}</span>
                               </td>
                               <td className="py-10">
                                  <div className="flex flex-col gap-1.5 text-white italic">
                                     <span className="text-base font-black tracking-tighter">{doc.date.slice(0,2)}/{doc.date.slice(2,4)}/{doc.date.slice(4)}</span>
                                     <span className="text-[9px] font-black text-slate-700 uppercase tracking-[0.4em] italic flex items-center gap-2">
                                        <div className="w-2 h-2 bg-emerald-500 rounded-full" /> Verified Signal
                                     </span>
                                  </div>
                               </td>
                               <td className="py-10 text-center">
                                  <div className="flex items-center justify-center gap-6 px-10">
                                     <button className="flex-1 h-14 bg-[#020617] hover:bg-white text-slate-700 hover:text-[#020617] rounded-2xl border-4 border-white/5 transition-all active:scale-95 flex items-center justify-center gap-4 group/dl">
                                        <Download className="w-6 h-6 group-hover/dl:scale-125 transition-transform" />
                                        <span className="text-[10px] font-black uppercase tracking-widest">INGEST PDF</span>
                                     </button>
                                     <button 
                                      onClick={() => {}}
                                      className="w-14 h-14 bg-red-500/5 hover:bg-red-500 text-red-500/40 hover:text-white rounded-2xl border-4 border-white/5 transition-all active:scale-90 flex items-center justify-center shadow-2xl"
                                     >
                                        <Trash2 className="w-6 h-6" />
                                     </button>
                                  </div>
                               </td>
                            </tr>
                          ))}
                       </tbody>
                    </table>
                  ) : (
                    <div className="py-48 flex flex-col items-center justify-center gap-12 opacity-30">
                       <ShieldAlert className="w-32 h-32 text-slate-800" />
                       <p className="text-4xl font-black italic uppercase tracking-tighter text-white">RECORDS_MISSING_ERROR</p>
                    </div>
                  )}
               </div>
            </div>
         </section>
      </main>

      {/* 🗝️ ELITE SLIDING INGEST PANEL - LIQUID CYBER */}
      {showUploadModal && (
        <>
          <div className="fixed inset-0 bg-[#020617]/90 z-[100] transition-all duration-500 reveal" onClick={() => setShowUploadModal(false)} />
          <div className="fixed right-0 top-0 bottom-0 w-full lg:w-[750px] bg-[#0a192f] z-[101] border-l-[16px] border-[#fbbf24] p-24 shadow-[-50px_0_120px_rgba(0,0,0,0.8)] flex flex-col gap-20 overflow-y-auto custom-scrollbar">
             <div className="flex items-center justify-between border-b-8 border-white/5 pb-16">
                <div className="flex items-center gap-10">
                   <div className="w-24 h-24 bg-[#fbbf24] border-b-8 border-amber-700 rounded-3xl flex items-center justify-center shadow-2xl animate-float">
                      <FilePlus className="w-12 h-12 text-[#020617]" />
                   </div>
                   <div className="flex flex-col">
                      <h2 className="text-5xl font-black text-white italic tracking-tighter uppercase leading-none">DATA INGEST</h2>
                      <p className="text-[12px] font-black text-slate-500 uppercase tracking-[0.5em] mt-3 italic">CITADEL AUTHORIZATION GATEWAY</p>
                   </div>
                </div>
                <button 
                  onClick={() => setShowUploadModal(false)}
                  className="w-20 h-20 bg-[#020617] rounded-3xl flex items-center justify-center group hover:bg-white border-8 border-white/5 transition-all duration-500"
                >
                   <X className="w-10 h-10 text-slate-700 group-hover:rotate-90 group-hover:text-[#020617] transition-all duration-500" />
                </button>
             </div>

             <form onSubmit={handleSingleUpload} className="space-y-16">
                <InputGroup label="IDENTIFICATION (TRADEMARK / SUBJECT)" value={form.name} onChange={v => setForm({...form, name: v})} placeholder="Ex: Gia hạn Ray-ban 2026 Registry..." />
                
                <div className="grid grid-cols-2 gap-12">
                   <InputGroup label="CASE CODE (HQ-ID)" value={form.code} onChange={v => setForm({...form, code: v})} placeholder="Ex: 27812" uppercase />
                   <div className="space-y-6">
                      <label className="text-[12px] font-black text-slate-500 uppercase tracking-[0.6em] ml-4">FILE CLASS</label>
                      <select 
                        className="w-full px-10 py-8 bg-[#020617] border-4 border-white/5 rounded-[2rem] outline-none focus:border-[#fbbf24] text-white font-black italic uppercase appearance-none cursor-pointer shadow-inner pr-20"
                        value={form.type}
                        onChange={(e) => setForm({...form, type: e.target.value})}
                      >
                         <option>Gia hạn</option>
                         <option>Cấp mới</option>
                         <option>P.Lý Vi phạm</option>
                         <option>Bảo hộ HK</option>
                      </select>
                   </div>
                </div>

                <div className="space-y-6">
                   <label className="text-[12px] font-black text-slate-500 uppercase tracking-[0.6em] ml-4">AUTHORIZED PDF SOURCE</label>
                   <div className="relative border-[12px] border-dotted border-white/5 rounded-[6rem] p-32 flex flex-col items-center justify-center gap-10 bg-[#020617] hover:border-blue-500/30 transition-all cursor-pointer group/upload group-hover:bg-[#020617]/50 shadow-inner">
                      <input 
                        type="file" 
                        onChange={(e) => setForm({...form, file: e.target.files?.[0] || null})}
                        className="absolute inset-0 opacity-0 cursor-pointer" 
                      />
                      <div className="w-32 h-32 bg-[#0a192f] rounded-[3rem] border-8 border-white/5 flex items-center justify-center shadow-3xl group-hover/upload:scale-125 transition-transform duration-700">
                         <Upload className="w-14 h-14 text-slate-700 group-hover/upload:text-[#fbbf24] transition-colors" />
                      </div>
                      <div className="text-center space-y-3">
                         <p className="text-xl font-black text-white italic tracking-tighter uppercase">{form.file ? form.file.name : 'CLICK OR DRAG MASTER PDF'}</p>
                         <p className="text-[10px] font-black text-slate-700 uppercase tracking-[0.5em] italic">FILE MUST BE SIGNED BY AUTHORITY (.PDF ONLY)</p>
                      </div>
                   </div>
                </div>

                {uploadMessage.text && (
                  <div className={`p-10 rounded-[3rem] flex items-center gap-8 bg-[#020617] border-8 reveal ${uploadMessage.type === 'success' ? 'text-emerald-500 border-emerald-500/20' : 'text-red-500 border-red-500/20'}`}>
                     {uploadMessage.type === 'success' ? <CheckCircle2 className="w-10 h-10" /> : <AlertTriangle className="w-10 h-10" />}
                     <p className="text-base font-black uppercase tracking-widest italic">{uploadMessage.text}</p>
                  </div>
                )}

                <button 
                  type="submit"
                  disabled={uploadLoading}
                  className="w-full py-10 bg-[#fbbf24] hover:bg-yellow-500 text-[#020617] rounded-[3rem] font-black text-xl uppercase tracking-[0.8em] shadow-3xl active:scale-[0.98] transition-all flex items-center justify-center gap-10 mt-16 border-b-[16px] border-amber-700 active:translate-y-4 active:border-b-8 group/submit"
                >
                   {uploadLoading ? <div className="w-10 h-10 border-8 border-[#020617]/20 border-t-[#020617] rounded-full animate-spin" /> : <ShieldAlert className="w-10 h-10 group-hover/submit:rotate-12 transition-transform" />}
                   {uploadLoading ? 'AUTHORIZING...' : 'VALIDATE & INGEST'}
                </button>
             </form>
             
             <p className="mt-10 text-center text-[10px] font-black text-slate-700 uppercase tracking-[1em] opacity-30">SECURE DATA NODE v-2026.1</p>
          </div>
        </>
      )}
    </div>
  );
}

function SidebarLink({ icon, label, active, collapsed }: any) {
  return (
    <button className={`w-full flex items-center gap-8 p-6 rounded-[2.5rem] transition-all duration-300 relative group overflow-hidden ${active ? 'bg-white text-[#020617] shadow-[0_20px_50px_rgba(255,255,255,0.2)]' : 'text-slate-600 hover:text-white hover:bg-white/5'}`}>
       <div className={`transition-transform duration-500 group-hover:scale-125 ${active ? 'text-[#020617]' : 'text-slate-600'}`}>
          {icon}
       </div>
       {!collapsed && (
          <span className="text-[14px] font-black uppercase tracking-[0.4em] italic mb-[-2px]">{label}</span>
       )}
       {active && <div className="absolute left-0 top-0 bottom-0 w-4 bg-[#fbbf24] shadow-[10px_0_30px_rgba(251,191,36,0.6)]" />}
    </button>
  );
}

function AdminStat({ icon, label, value, color }: any) {
  const themes: any = {
    blue: 'text-blue-500 border-blue-500/20',
    amber: 'text-[#fbbf24] border-[#fbbf24]/20',
    red: 'text-red-500 border-red-500/20',
    emerald: 'text-emerald-500 border-emerald-500/20'
  };

  return (
    <div className={`p-16 rounded-[4rem] bg-[#0f172a] border-8 ${themes[color]} shadow-3xl group hover:scale-[1.03] transition-all duration-700 cursor-pointer overflow-hidden relative`}>
       <div className="relative z-10 space-y-10">
          <div className="w-20 h-20 bg-[#020617] border-4 border-white/5 flex items-center justify-center rounded-[2rem] group-hover:rotate-12 transition-transform duration-700 shadow-2xl">
             {icon}
          </div>
          <div className="space-y-2">
             <p className="text-[12px] font-black uppercase tracking-[0.5em] text-slate-700 italic leading-none">{label}</p>
             <p className="text-7xl font-black italic tracking-tighter text-white drop-shadow-[0_4px_10px_rgba(0,0,0,0.5)]">{value}</p>
          </div>
       </div>
       <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-current rounded-full blur-[120px] opacity-[0.03] group-hover:scale-125 transition-transform duration-1000" />
    </div>
  );
}

function InputGroup({ label, value, onChange, placeholder, uppercase }: any) {
   return (
      <div className="space-y-6">
         <label className="text-[12px] font-black text-slate-500 uppercase tracking-[0.6em] ml-4">{label}</label>
         <input 
            type="text" 
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className={`w-full px-12 py-8 bg-[#020617] border-8 border-white/5 rounded-[2.5rem] outline-none focus:border-[#fbbf24] text-xl font-black italic transition-all shadow-inner text-white placeholder:text-slate-800 ${uppercase ? 'uppercase tracking-widest' : ''}`}
            required
         />
      </div>
   );
}
