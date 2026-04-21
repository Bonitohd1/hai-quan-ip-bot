'use client';

import { useState, useRef, useEffect } from 'react';
import React from 'react';
import {
  Bell, Search, Settings, User
} from 'lucide-react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

const NOTIFICATIONS: { id: number; type: string; title: string; desc: string; time: string; icon: React.ElementType; read: boolean }[] = [];

export default function Topbar() {
  const [showNotifications, setShowNotifications] = useState(false);
  const notifRef = useRef<HTMLDivElement>(null);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full h-14 lg:h-16 bg-white/90 backdrop-blur-xl border-b border-slate-200/50 flex items-center justify-between px-4 sm:px-6 lg:px-12 transition-all">
      {/* Left side: Search with subtle hover lift */}
      <div className="flex-1 flex items-center">
        <motion.div 
          whileHover={{ x: 5 }}
          className="hidden lg:flex items-center gap-2 px-4 py-2 bg-slate-100/80 rounded-2xl text-slate-500 hover:bg-white transition-all cursor-pointer border border-slate-200/60 w-72 shadow-sm hover:shadow-md group"
        >
           <Search className="w-4 h-4 shrink-0 group-hover:text-blue-600 transition-colors" />
           <span className="text-sm font-bold tracking-tight text-slate-400 group-hover:text-slate-600">Tìm kiếm hồ sơ hệ thống...</span>
        </motion.div>
      </div>

      {/* Right side: Actions & Profile */}
      <div className="flex items-center gap-2 sm:gap-4 relative">
        {/* Notifications Popover */}
        <div ref={notifRef} className="relative">
          <motion.button 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setShowNotifications(!showNotifications)}
            className={`relative p-2.5 rounded-xl transition-all duration-300 ${showNotifications ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30' : 'hover:bg-slate-100 text-slate-500 ring-1 ring-transparent hover:ring-slate-200'}`}
          >
            <motion.div
              animate={!showNotifications ? {
                rotate: [0, -10, 10, -10, 10, 0],
              } : {}}
              transition={{
                duration: 0.5,
                repeat: Infinity,
                repeatDelay: 3,
                ease: "easeInOut"
              }}
            >
              <Bell className="w-5 h-5" />
            </motion.div>
            
            {/* Pulsing Notification Dot — hiển thị khi có thông báo chưa đọc */}
            {NOTIFICATIONS.some(n => !n.read) && (
              <div className="absolute top-2 right-2 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-rose-500 border-2 border-white shadow-[0_0_10px_rgba(244,63,94,0.6)]"></span>
              </div>
            )}
          </motion.button>

          <AnimatePresence>
            {showNotifications && (
              <motion.div 
                initial={{ opacity: 0, y: 15, scale: 0.95, filter: "blur(4px)" }}
                animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: 15, scale: 0.95, filter: "blur(4px)" }}
                transition={{ type: "spring", damping: 20, stiffness: 300 }}
                className="fixed sm:absolute right-0 sm:right-0 top-14 sm:top-14 w-screen sm:w-80 md:w-[400px] bg-white rounded-none sm:rounded-3xl shadow-2xl border-t sm:border border-slate-200/60 overflow-hidden z-50 ring-1 ring-black/5 max-h-[80vh] overflow-y-auto"
              >
                <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/80 backdrop-blur-md">
                   <div>
                    <h3 className="text-base font-black text-slate-900 tracking-tight">Trung tâm Thông báo</h3>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Thời gian thực</p>
                   </div>
                  <button className="text-xs font-bold text-blue-600 hover:text-blue-800 transition-colors px-3 py-1.5 rounded-lg hover:bg-blue-50">Đánh dấu tất cả</button>
                </div>
                
                <div className="max-h-[420px] overflow-y-auto divide-y divide-slate-50 custom-scrollbar">
                  {NOTIFICATIONS.map((notif, i) => (
                    <motion.div 
                      key={notif.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className={`p-5 flex gap-4 hover:bg-slate-50 transition-all cursor-pointer relative group ${!notif.read ? 'bg-blue-50/30' : ''}`}
                    >
                      {!notif.read && <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-600 rounded-r-full" />}
                      
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-sm border border-white transition-transform group-hover:scale-110 duration-300 ${
                        notif.type === 'critical' ? 'bg-rose-50 text-rose-600' :
                        notif.type === 'success' ? 'bg-emerald-50 text-emerald-600' :
                        'bg-amber-50 text-amber-600'
                      }`}>
                        <notif.icon className="w-6 h-6" />
                      </div>
                      
                      <div className="flex-1">
                         <div className="flex justify-between items-start mb-1">
                           <h4 className={`text-sm tracking-tight ${!notif.read ? 'font-black text-slate-900' : 'font-bold text-slate-700'}`}>{notif.title}</h4>
                           <span className="text-[9px] font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full border border-slate-200">{notif.time}</span>
                         </div>
                         <p className="text-[13px] text-slate-500 font-medium leading-relaxed mb-2 line-clamp-2">{notif.desc}</p>
                         <div className="flex items-center gap-4">
                            <span className="text-[10px] font-black text-blue-600/80 flex items-center gap-1.5 uppercase hover:underline">
                              <Search className="w-3 h-3" /> Chi tiết hồ sơ
                            </span>
                         </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
                <Link 
                  href="/thong-bao" 
                  onClick={() => setShowNotifications(false)} 
                  className="block p-4 border-t border-slate-100 text-center bg-slate-50/50 hover:bg-blue-600 hover:text-white transition-all duration-300 group"
                >
                  <span className="text-xs font-black uppercase tracking-[0.15em] transition-colors">Xem toàn bộ lịch trình</span>
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Global Settings */}
        <motion.div whileHover={{ rotate: 90 }} transition={{ duration: 0.5 }}>
          <Link href="/tai-khoan" className="hidden sm:flex p-2.5 rounded-xl hover:bg-slate-100 text-slate-500 transition-all border border-transparent hover:border-slate-200 shadow-sm hover:shadow-md">
            <Settings className="w-5 h-5" />
          </Link>
        </motion.div>

        <div className="h-8 w-px bg-slate-200/80 mx-1 hidden sm:block" />

        {/* User Profile Hook */}
        <Link href="/tai-khoan" className="flex items-center gap-2 sm:gap-3.5 p-1.5 sm:pl-3 sm:pr-4 rounded-2xl hover:bg-white transition-all border border-transparent hover:border-slate-200 hover:shadow-lg group relative overflow-hidden bg-slate-50/40">
          <div className="hidden sm:block text-right">
             <p className="text-[13px] font-black text-slate-900 group-hover:text-blue-600 transition-colors tracking-tight">Cán bộ Hải quan</p>
          </div>
          <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl sm:rounded-2xl bg-gradient-to-tr from-slate-200 to-slate-100 flex items-center justify-center border-2 border-white shadow-md shrink-0 relative overflow-hidden group-hover:ring-4 group-hover:ring-blue-50 transition-all">
             <User className="w-5 h-5 sm:w-6 sm:h-6 text-slate-400 group-hover:text-blue-600 transition-colors" />
             <div className="absolute inset-0 bg-blue-600/5 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        </Link>
      </div>
    </header>
  );
}
