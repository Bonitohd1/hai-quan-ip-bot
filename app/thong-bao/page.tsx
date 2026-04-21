'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Bell, CheckCircle, Clock, ShieldAlert } from 'lucide-react';

const NOTIFICATIONS: { id: number; type: string; title: string; desc: string; time: string; icon: React.ElementType; read: boolean }[] = [];

export default function ThongBao() {
  return (
    <div className="max-w-4xl mx-auto w-full font-sans">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight flex items-center gap-3">
            Thông báo hệ thống
            {NOTIFICATIONS.filter(n => !n.read).length > 0 && (
              <span className="inline-flex items-center justify-center px-2 py-0.5 rounded-md bg-rose-500 text-white text-xs font-bold shadow-sm shadow-rose-500/30">
                {NOTIFICATIONS.filter(n => !n.read).length} mới
              </span>
            )}
          </h1>
          <p className="text-slate-500 mt-2 text-sm font-medium">Trung tâm theo dõi sự kiện & tín hiệu cảnh báo.</p>
        </div>
        
        <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-600 text-sm font-semibold rounded-xl hover:bg-slate-50 transition-colors shadow-sm focus:ring-4 focus:ring-slate-100">
          <CheckCircle className="w-4 h-4 text-emerald-500" /> Đánh dấu đã đọc tất cả
        </button>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
        {/* Header filter tags */}
        <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex flex-wrap items-center gap-3">
          <button className="px-4 py-2 bg-blue-600 text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-sm shadow-blue-500/20 whitespace-nowrap">Tất cả</button>
          <button className="px-4 py-2 bg-white border border-slate-200 text-slate-500 text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-slate-50 transition-colors whitespace-nowrap">Chưa đọc ({NOTIFICATIONS.filter(n => !n.read).length})</button>
          <button className="px-4 py-2 bg-white border border-slate-200 text-slate-500 text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-slate-50 transition-colors whitespace-nowrap flex items-center gap-2"><ShieldAlert className="w-4 h-4 text-rose-500"/> Cảnh báo đỏ</button>
          <button className="px-4 py-2 bg-white border border-slate-200 text-slate-500 text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-slate-50 transition-colors whitespace-nowrap">Hành chính</button>
        </div>

        {/* List */}
        <div className="divide-y divide-slate-100">
          {NOTIFICATIONS.length === 0 && (
            <div className="py-20 flex flex-col items-center gap-3 text-slate-400">
              <Bell className="w-10 h-10 opacity-30" />
              <p className="text-sm font-semibold">Chưa có thông báo nào.</p>
            </div>
          )}
          {NOTIFICATIONS.map((notif, i) => {
            const bgBadge = notif.type === 'critical' ? 'bg-rose-100 text-rose-600' :
                            notif.type === 'success' ? 'bg-emerald-100 text-emerald-600' :
                            notif.type === 'warning' ? 'bg-amber-100 text-amber-600' :
                            notif.type === 'info' ? 'bg-blue-100 text-blue-600' : 
                            'bg-slate-100 text-slate-600';
            
            const borderLeft = notif.type === 'critical' ? 'border-l-rose-500' :
                               notif.type === 'success' ? 'border-l-emerald-500' :
                               notif.type === 'warning' ? 'border-l-amber-500' :
                               notif.type === 'info' ? 'border-l-blue-500' : 
                               'border-l-slate-300';
            
            return (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                key={notif.id}
                className={`relative p-6 hover:bg-slate-50 transition-colors border-l-4 ${borderLeft} ${notif.read ? 'opacity-70' : 'bg-blue-50/20'}`}
              >
                {!notif.read && (
                  <div className="absolute top-6 right-6 w-2.5 h-2.5 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
                )}
                
                <div className="flex gap-5">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-sm ${bgBadge}`}>
                    <notif.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className={`text-base flex-1 ${!notif.read ? 'font-bold text-slate-900' : 'font-semibold text-slate-700'}`}>
                        {notif.title}
                      </h3>
                    </div>
                    <p className="text-sm font-medium text-slate-500 mb-3 leading-relaxed max-w-2xl">
                      {notif.desc}
                    </p>
                    <span className="text-xs font-semibold text-slate-400 flex items-center gap-1.5 uppercase tracking-wide">
                      <Clock className="w-3.5 h-3.5" /> {notif.time}
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="p-4 bg-slate-50/50 border-t border-slate-100 flex justify-center">
          <button className="text-sm font-bold text-blue-600 hover:text-blue-800 transition-colors">
            Tải thêm 20 thông báo cũ...
          </button>
        </div>
      </div>
    </div>
  );
}
