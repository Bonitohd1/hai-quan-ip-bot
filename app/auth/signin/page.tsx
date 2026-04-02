'use client';

import { useState, useEffect } from 'react';
import { ShieldCheck, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { signIn } from 'next-auth/react';
import Image from 'next/image';

export default function SignIn() {
  const [isLoading, setIsLoading] = useState(false);
  const [showSplash, setShowSplash] = useState(true);
  const [isLoginView, setIsLoginView] = useState(true);

  // Splash Screen Timer
  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    try {
      // Đã kích hoạt Google OAuth thật
      await signIn('google', { callbackUrl: '/' });
    } catch (error) {
      console.error('Lỗi khi gọi Google Login:', error);
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f6f9fc] via-[#eef2f6] to-[#e2e8f0] font-sans relative overflow-hidden">
      
      <AnimatePresence>
        {showSplash && (
          <motion.div 
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
            className="absolute inset-0 z-50 flex items-center justify-center bg-slate-900"
          >
            {/* Splash decorative background */}
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_2px_2px,white_1px,transparent_0)] bg-[size:32px_32px]" />
            <div className="absolute inset-0 bg-gradient-to-t from-blue-900/80 to-transparent" />

            <div className="flex flex-col items-center z-10">
              <motion.div 
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="w-24 h-24 mb-6 rounded-2xl bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/50 relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent" />
                <ShieldCheck className="w-12 h-12 text-white relative z-10" />
                
                {/* Scanning line animation overlay */}
                <motion.div 
                  className="absolute inset-0 border-t-2 border-white/50 bg-gradient-to-b from-white/20 to-transparent z-20"
                  animate={{ y: ['-100%', '100%'] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                />
              </motion.div>
              
              <motion.h1 
                initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 }}
                className="text-2xl font-bold text-white tracking-widest uppercase mb-3"
              >
                HQ IP Bot
              </motion.h1>

              <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
                className="flex flex-col items-center gap-3"
              >
                <Loader2 className="w-5 h-5 text-blue-400 animate-spin" />
                <p className="text-[11px] font-semibold text-blue-300/80 tracking-widest uppercase">
                  Đang thiết lập kênh kết nối an toàn...
                </p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Decorative Pastel Orbs mimicking the soft colorful aesthetic */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-blue-200/40 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-emerald-200/30 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-[20%] w-[400px] h-[300px] rounded-full bg-amber-100/40 blur-[100px] pointer-events-none" />

      {!showSplash && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative w-full h-screen flex flex-col lg:flex-row"
        >
          {/* Left Column: Graphic / Branding */}
          <div className="hidden lg:flex w-3/5 bg-slate-900 relative items-center justify-center overflow-hidden">
             {/* Abstract Background Elements */}
             <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-950 via-slate-900 to-slate-950" />
             <div className="absolute -left-20 top-20 w-96 h-96 bg-blue-600/10 rounded-full blur-[100px]" />
             <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-emerald-600/10 rounded-full blur-[120px]" />
             
             {/* Grid floor */}
             <div className="absolute bottom-0 inset-x-0 h-64 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:linear-gradient(to_bottom,transparent,black)] pointer-events-none" />

             {/* Visual Composition */}
             <div className="relative z-10 p-16 w-full max-w-3xl text-white">
                <motion.div 
                  initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}
                  className="mb-12"
                >
                  <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-slate-800/80 border border-slate-700/50 backdrop-blur shadow-xl mb-6">
                     <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-[pulse_1.5s_ease-in-out_infinite]" />
                     <span className="text-xs font-bold tracking-widest text-slate-300 uppercase">Hệ thống Trí tuệ AI Hải Quan</span>
                  </div>
                  <h1 className="text-5xl font-black leading-[1.15] tracking-tight mb-6">
                    Giám sát tự động <br/>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-emerald-400">
                      Chuỗi cung ứng & Sở hữu trí tuệ
                    </span>
                  </h1>
                  <p className="text-lg text-slate-400 leading-relaxed max-w-lg font-medium">
                    Tự động nhận diện nhãn hiệu ảo, khoanh vùng rủi ro container tại cảng biển và cửa khẩu thông qua mạng lưới AI chuyên sâu.
                  </p>
                </motion.div>

                {/* Customs AI Scanning Animation Scene */}
                <div className="relative w-full h-[280px] bg-slate-800/30 backdrop-blur-sm border border-white/5 rounded-3xl p-6 overflow-hidden">
                   {/* Background ambient light */}
                   <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-cyan-500/5" />
                   
                   {/* Moving Container Box */}
                   <motion.div 
                     initial={{ x: -100 }}
                     animate={{ x: [ -100, 400, 400 ] }}
                     transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                     className="absolute top-16 left-0 w-48 h-24 bg-gradient-to-b from-rose-900/80 to-rose-950 border border-rose-700/50 rounded-lg shadow-2xl flex items-center justify-center relative overflow-hidden"
                   >
                      <div className="absolute inset-x-0 top-0 h-px bg-white/20" />
                      <div className="w-full h-full flex flex-col justify-center px-4">
                         <div className="text-[10px] font-mono text-rose-300/60 mb-1">CONTAINER ID</div>
                         <div className="text-sm font-bold font-mono tracking-widest text-white">SEGU-9382103</div>
                      </div>
                      <div className="absolute right-3 top-3 w-8 h-8 rounded border-2 border-white/10 flex items-center justify-center">
                         <div className="w-4 h-4 bg-white/5 rounded-sm" />
                      </div>
                   </motion.div>

                   {/* Laser Scanner */}
                   <motion.div 
                     animate={{ x: [0, 500, 0] }}
                     transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                     className="absolute top-10 bottom-10 left-32 w-[2px] bg-cyan-400 shadow-[0_0_20px_rgba(34,211,238,1)] z-20"
                   >
                     <div className="absolute top-0 -left-6 w-12 h-full bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent" />
                     <div className="absolute -top-2 -left-1 w-2.5 h-2.5 bg-white rounded-full shadow-[0_0_10px_#fff]" />
                     <div className="absolute -bottom-2 -left-1 w-2.5 h-2.5 bg-white rounded-full shadow-[0_0_10px_#fff]" />
                   </motion.div>

                   {/* AI Detection Result Popup (appears when laser hits container) */}
                   <motion.div
                     initial={{ opacity: 0, scale: 0.9 }}
                     animate={{ opacity: [0, 0, 1, 1, 0, 0], scale: [0.9, 0.9, 1, 1, 0.9, 0.9] }}
                     transition={{ duration: 6, repeat: Infinity, times: [0, 0.3, 0.35, 0.65, 0.7, 1] }}
                     className="absolute top-10 left-72 z-30 bg-white/10 backdrop-blur-xl border border-rose-500/30 p-3 rounded-xl shadow-2xl w-48"
                   >
                     <div className="flex items-center justify-between mb-2">
                        <span className="flex items-center gap-1.5 text-xs font-bold text-slate-200">
                           <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                           Kết quả AI
                        </span>
                        <span className="px-1.5 py-0.5 rounded bg-rose-500/20 text-rose-400 text-[9px] font-black uppercase tracking-wider border border-rose-500/20">
                          GIẢ MẠO
                        </span>
                     </div>
                     <p className="text-[11px] text-slate-300 font-medium">Phát hiện dấu hiệu xâm phạm thương hiệu Adidas.</p>
                     <div className="mt-2 w-full bg-slate-800 rounded-full h-1">
                        <div className="bg-gradient-to-r from-rose-500 to-rose-400 h-1 rounded-full w-[94%]" />
                     </div>
                     <p className="text-[9px] text-right text-rose-400 mt-1 font-mono font-bold">Khớp: 94.2%</p>
                   </motion.div>
                </div>
             </div>
          </div>

          {/* Right Column: Login Form */}
          <div className="w-full lg:w-2/5 min-h-screen flex flex-col items-center justify-center p-8 bg-white relative overflow-y-auto">
            {/* Subtle floating background patterns */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50/50 rounded-bl-[100px] -z-10" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-50/40 rounded-tr-[150px] -z-10" />

            <div className="w-full max-w-[380px] flex flex-col justify-center my-auto py-10">
              {/* Logo & Heading */}
              <div className="flex flex-col items-center mb-8 text-center">
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-xl shadow-slate-200 border border-slate-100 mb-6 shrink-0 relative overflow-hidden">
                   <div className="absolute inset-0 bg-blue-50/50" />
                   <Image src="/logoHQdaxoanen.png" alt="HQ Logo" width={44} height={44} className="object-contain relative z-10" unoptimized />
                </div>
                <h2 className="text-[26px] font-black text-slate-900 tracking-tight mb-2">Hải Quan Việt Nam</h2>
                <p className="text-sm font-bold tracking-widest uppercase text-blue-600">
                  Sở Hữu Trí Tuệ
                </p>
              </div>

              {/* Form Tabs (Login / Register) */}
              <div className="flex items-center gap-6 mb-6 border-b border-slate-200">
                 <button 
                   onClick={() => setIsLoginView(true)}
                   className={`pb-3 border-b-2 text-sm font-bold tracking-wide transition-colors ${isLoginView ? 'border-blue-600 text-slate-900' : 'border-transparent text-slate-400 hover:text-slate-600'}`}
                 >
                    Đăng nhập
                 </button>
                 <button 
                   onClick={() => setIsLoginView(false)}
                   className={`pb-3 border-b-2 text-sm font-bold tracking-wide transition-colors ${!isLoginView ? 'border-blue-600 text-slate-900' : 'border-transparent text-slate-400 hover:text-slate-600'}`}
                 >
                    Đăng ký mới
                 </button>
              </div>

              <div className="space-y-5">
                {/* Primary Google Login Button */}
                <button
                  onClick={handleGoogleLogin}
                  disabled={isLoading}
                  className="w-full relative flex items-center justify-center gap-3 bg-white border border-slate-200 hover:bg-slate-50 hover:border-slate-300 text-slate-700 font-bold py-3.5 px-6 rounded-xl shadow-sm transition-all focus:ring-4 focus:ring-slate-100 active:scale-[0.98]"
                >
                  {isLoading ? (
                    <Loader2 className="w-5 h-5 text-blue-600 animate-spin" />
                  ) : (
                    <img src="https://authjs.dev/img/providers/google.svg" alt="Google" className="w-5 h-5" />
                  )}
                  <span className="text-[14px]">
                    {isLoading ? 'Đang xác thực...' : (isLoginView ? 'Đăng nhập tự động với Gmail' : 'Đăng ký nhanh qua Gmail')}
                  </span>
                </button>

                <div className="relative flex items-center py-2">
                   <div className="flex-grow border-t border-slate-200" />
                   <span className="flex-shrink-0 mx-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                     Hoặc bằng Email
                   </span>
                   <div className="flex-grow border-t border-slate-200" />
                </div>

                <div className="space-y-4">
                  
                  {/* Full Name Input (Only on Register) */}
                  {!isLoginView && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}>
                       <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 ml-1">Cấp bậc / Họ và tên</label>
                       <input 
                         type="text" 
                         placeholder="Nguyễn Văn A" 
                         className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                       />
                    </motion.div>
                  )}

                  {/* Email Input */}
                  <div>
                     <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 ml-1">Email công vụ</label>
                     <input 
                       type="email" 
                       placeholder="canbo@customs.gov.vn" 
                       className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                     />
                  </div>

                  {/* Password Input */}
                  <div>
                     <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 ml-1">Mật khẩu</label>
                     <input 
                       type="password" 
                       placeholder="••••••••••••" 
                       className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                     />
                  </div>
                  
                  {/* Confirm Password Input (Only on Register) */}
                  {!isLoginView && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}>
                       <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 ml-1">Xác nhận mật khẩu</label>
                       <input 
                         type="password" 
                         placeholder="••••••••••••" 
                         className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                       />
                    </motion.div>
                  )}

                  {/* Remember & Forgot Password */}
                  {isLoginView && (
                    <div className="flex items-center justify-between px-1 pt-1 pb-2">
                       <label className="flex items-center gap-2 cursor-pointer">
                          <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500/30" />
                          <span className="text-xs font-semibold text-slate-500">Ghi nhớ đăng nhập</span>
                       </label>
                       <a href="#" className="text-xs font-bold text-blue-600 hover:text-blue-800 transition-colors">Quên mật khẩu?</a>
                    </div>
                  )}

                  {/* Standard Submit Button */}
                  <button
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 px-6 rounded-xl shadow-lg shadow-blue-600/20 transition-all focus:ring-4 focus:ring-blue-100 active:scale-[0.98]"
                  >
                    {isLoginView ? 'Đăng nhập Hệ thống' : 'Gửi yêu cầu Đăng ký'}
                  </button>
                </div>

                <div className="relative flex items-center py-4">
                   <div className="flex-grow border-t border-slate-200" />
                   <span className="flex-shrink-0 mx-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Đăng nhập Biometric</span>
                   <div className="flex-grow border-t border-slate-200" />
                </div>

                {/* Biometric VNeID Login prominent area */}
                <div className="flex flex-col items-center">
                   <button className="relative w-20 h-20 mb-3 rounded-full bg-gradient-to-b from-blue-50 to-white border-2 border-blue-100 shadow-[0_8px_30px_rgb(59,130,246,0.12)] flex flex-col items-center justify-center group hover:border-blue-300 hover:shadow-[0_8px_30px_rgb(59,130,246,0.2)] transition-all active:scale-95 overflow-hidden">
                      <div className="absolute inset-x-0 h-4 bg-gradient-to-b from-blue-400/20 to-transparent -top-4 group-hover:animate-[scan_1.5s_ease-in-out_infinite]" />
                      <div className="relative z-10 w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center group-hover:bg-blue-600 transition-colors">
                        <svg className="w-6 h-6 text-blue-600 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
                        </svg>
                      </div>
                   </button>
                   <p className="text-[13px] font-bold text-slate-800 cursor-pointer hover:text-blue-600 transition-colors">
                      Quét Vân Tay / VNeID
                   </p>
                </div>
              </div>
              
              {/* Footer text */}
              <div className="mt-8 text-center pb-2">
                 <p className="text-xs font-semibold text-slate-400">
                    Cục Giám sát Quản lý về Hải Quan &copy; 2026
                 </p>
              </div>

            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
