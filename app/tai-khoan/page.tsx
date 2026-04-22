'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { signOut } from 'next-auth/react';
import { 
  ShieldCheck, Smartphone, Key, MonitorSmartphone, MapPin, 
  Clock, Activity, Edit3, LogOut, CheckCircle2, User, ChevronRight, Fingerprint
} from 'lucide-react';

export default function TaiKhoan() {
  const [activeTab, setActiveTab] = useState<'profile' | 'security'>('profile');

  const handleLogout = async () => {
    try {
      await signOut({ redirect: false });
    } catch (e) {}
    window.location.href = '/auth/signin';
  };

  return (
    <div className="max-w-6xl mx-auto w-full font-sans">
      <div className="flex items-center justify-between mb-8">
         <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Cài đặt tài khoản</h1>
         <button onClick={handleLogout} className="flex items-center gap-2 px-4 py-2 bg-rose-50 text-rose-600 hover:bg-rose-100 font-bold rounded-xl transition-colors">
            <LogOut className="w-4 h-4" /> Đăng xuất
         </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* LEFT PROFILE CARD */}
        <div className="lg:col-span-4 space-y-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-[2rem] shadow-sm border border-slate-200 overflow-hidden"
          >
            {/* Header / Avatar */}
            <div className="relative pt-12 pb-8 px-6 flex flex-col items-center bg-gradient-to-b from-blue-50 to-white text-center border-b border-slate-100">
               <button className="absolute top-4 right-4 z-10 w-8 h-8 bg-blue-100 hover:bg-blue-200 text-blue-600 rounded-full flex items-center justify-center transition-colors">
                 <Edit3 className="w-4 h-4" />
               </button>

               <div className="w-24 h-24 rounded-full bg-blue-100 flex items-center justify-center border-4 border-white shadow-lg overflow-hidden mb-4 ring-2 ring-blue-50 relative group">
                 <User className="w-10 h-10 text-blue-400 group-hover:text-blue-500 transition-colors" />
                 <div className="absolute inset-x-0 bottom-0 py-1 bg-black/50 text-[10px] items-center justify-center text-white font-bold opacity-0 group-hover:opacity-100 transition-opacity flex cursor-pointer">SỬA</div>
               </div>

               <h2 className="text-xl font-bold text-slate-900 mb-1">Cán bộ Quản trị AI</h2>
               <p className="text-[13px] font-semibold text-slate-500 uppercase tracking-wider mb-3">Tổ SHTT & Kiểm soát CL</p>

               <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full text-xs font-bold ring-1 ring-emerald-500/20">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> Trực tuyến
               </div>
            </div>

            {/* Profile Info details */}
            <div className="p-6">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Thông tin liên lạc</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-[11px] font-bold text-slate-400 uppercase">Email công vụ</p>
                  <p className="text-sm font-semibold text-slate-900 mt-0.5 truncate">hq.admin@customs.gov.vn</p>
                </div>
                <div>
                  <p className="text-[11px] font-bold text-slate-400 uppercase">Phòng ban</p>
                  <p className="text-sm font-semibold text-slate-900 mt-0.5">Cục Giám sát Quản lý</p>
                </div>
                <div>
                  <p className="text-[11px] font-bold text-slate-400 uppercase">Đơn vị công tác</p>
                  <p className="text-sm font-semibold text-slate-900 mt-0.5 flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-blue-500" /> Trụ sở chính HQVN
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* RIGHT CONTENT TABS */}
        <div className="lg:col-span-8">
          <div className="bg-white rounded-[2rem] shadow-sm border border-slate-200 min-h-full">
            {/* TABS HEADER */}
            <div className="flex items-center gap-6 p-2 px-6 border-b border-slate-100">
              <button 
                onClick={() => setActiveTab('profile')}
                className={`relative py-4 text-sm font-bold transition-colors flex items-center gap-2 ${activeTab === 'profile' ? 'text-blue-600' : 'text-slate-500 hover:text-slate-900'}`}
              >
                <Activity className="w-4 h-4" /> Tổng quan hoạt động
                {activeTab === 'profile' && <motion.div layoutId="tab-indicator" className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600" />}
              </button>
              <button 
                onClick={() => setActiveTab('security')}
                className={`relative py-4 text-sm font-bold transition-colors flex items-center gap-2 ${activeTab === 'security' ? 'text-blue-600' : 'text-slate-500 hover:text-slate-900'}`}
              >
                <ShieldCheck className="w-4 h-4" /> Cấu hình định danh & Bảo mật
                {activeTab === 'security' && <motion.div layoutId="tab-indicator" className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600" />}
              </button>
            </div>

            {/* TAB CONTENT */}
            <div className="p-8">
              {activeTab === 'profile' && (
                <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }}>
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-bold text-slate-900">Chỉ số tác nghiệp cá nhân</h3>
                    <div className="px-3 py-1 bg-slate-100 text-slate-600 text-xs font-bold rounded-lg uppercase tracking-wider">Tháng 4, 2026</div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-10">
                    <div className="p-6 rounded-2xl bg-blue-50 border border-blue-100/50 flex flex-col justify-center">
                      <p className="text-sm font-bold text-blue-600/80 mb-2 uppercase tracking-wide">Hồ sơ đã can thiệp</p>
                      <div className="flex items-end gap-2">
                         <p className="text-5xl font-black text-slate-400 tracking-tight">—</p>
                         <p className="text-sm font-bold text-slate-400 mb-1.5">vụ việc</p>
                      </div>
                    </div>
                    <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-100/50 flex flex-col justify-center">
                      <p className="text-sm font-bold text-emerald-600/80 mb-2 uppercase tracking-wide">Khoanh vùng chính xác</p>
                      <div className="flex items-end gap-2">
                         <p className="text-5xl font-black text-slate-400 tracking-tight">—</p>
                         <p className="text-sm font-bold text-slate-400 mb-1.5">rủi ro SHTT</p>
                      </div>
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                    Lịch sử đăng nhập <span className="text-xs font-medium text-slate-500 bg-slate-100 px-2 rounded-full">3 lần gần nhất</span>
                  </h3>
                  
                  <div className="space-y-4">
                    {[
                      { time: '10:24 AM - Hôm nay', ip: '103.119.52.22', device: 'Edge / Windows', loc: 'Hà Nội, VN', status: 'success' },
                      { time: '08:15 AM - Hôm nay', ip: '103.119.52.22', device: 'Edge / Windows', loc: 'Hà Nội, VN', status: 'success' },
                      { time: '09:30 PM - Hôm qua', ip: '14.224.120.15', device: 'VNeID App / iOS', loc: 'Hà Nội, VN', status: 'success' },
                    ].map((log, i) => (
                      <div key={i} className="flex items-center justify-between p-4 rounded-xl border border-slate-100 bg-slate-50 hover:bg-slate-100/50 transition-colors">
                         <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center shrink-0">
                               <MonitorSmartphone className="w-5 h-5 text-slate-600" />
                            </div>
                            <div>
                               <p className="font-bold text-slate-900 text-sm flex items-center gap-2">
                                 {log.device} 
                                 <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                               </p>
                               <p className="text-xs font-semibold text-slate-500 flex items-center gap-2 mt-0.5">
                                  {log.ip} <span className="text-slate-300">•</span> {log.loc}
                               </p>
                            </div>
                         </div>
                         <div className="text-right">
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">{log.time}</p>
                            <p className="text-[10px] font-bold text-emerald-600 mt-1 uppercase">Thành công</p>
                         </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {activeTab === 'security' && (
                <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} className="space-y-6">
                   <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-100/60 flex items-start gap-5">
                      <div className="w-12 h-12 bg-white rounded-xl shadow-sm border border-emerald-100 flex items-center justify-center shrink-0">
                         <ShieldCheck className="w-6 h-6 text-emerald-600" />
                      </div>
                      <div>
                        <h4 className="text-lg font-bold text-slate-900">Google Workspace SSO</h4>
                        <p className="text-sm font-medium text-slate-700 mt-1 mb-4 leading-relaxed">
                          Tài khoản của bạn được quản lý và bảo vệ trực tiếp bởi hệ thống Google Workspace nội bộ. Tuân thủ tiêu chuẩn an ninh mạng cấp độ 3.
                        </p>
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-emerald-600 text-white rounded-lg text-xs font-bold shadow-sm">
                          <CheckCircle2 className="w-4 h-4" /> Đang bảo vệ
                        </div>
                      </div>
                   </div>

                   <div className="p-6 rounded-2xl bg-white border border-slate-200">
                      <div className="flex items-center justify-between mb-4">
                         <div className="flex items-center gap-3">
                            <Fingerprint className="w-5 h-5 text-blue-600" />
                            <h4 className="font-bold text-slate-900 text-base">Xác thực bằng Sinh trắc học / VNeID</h4>
                         </div>
                         <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" value="" className="sr-only peer" defaultChecked />
                            <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                         </label>
                      </div>
                      <p className="text-sm font-medium text-slate-500 pl-8">
                         Yêu cầu xác thực khuôn mặt qua VNeID khi ký duyệt những văn bản quyết định ngăn chặn lô hàng quan trọng để đảm bảo tính pháp lý.
                      </p>
                   </div>

                   <div className="p-6 rounded-2xl bg-white border border-slate-200">
                      <div className="flex items-center justify-between mb-4">
                         <div className="flex items-center gap-3">
                            <Key className="w-5 h-5 text-slate-600" />
                            <h4 className="font-bold text-slate-900 text-base">Mã thông báo API (API Keys)</h4>
                         </div>
                         <button className="text-sm font-bold text-blue-600 hover:text-blue-800 transition-colors flex items-center gap-1">
                            Tạo mới <ChevronRight className="w-4 h-4" />
                         </button>
                      </div>
                      <p className="text-sm font-medium text-slate-500 pl-8 mb-4">
                         Dùng để kết nối ứng dụng bên thứ 3 (phân hệ Hải quan vệ tinh) vào bot AI.
                      </p>
                      
                      <div className="ml-8 px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between">
                         <div className="font-mono text-sm font-semibold text-slate-700 tracking-wider">
                           HQ-IP-BOT-****-****-982A
                         </div>
                         <div className="px-2 py-1 bg-emerald-100 text-emerald-700 text-[10px] font-bold uppercase rounded leading-none">
                           Active
                         </div>
                      </div>
                   </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
