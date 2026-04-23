'use client';

import { useState, useRef, useEffect, useMemo } from 'react';
import React from 'react';
import {
  Bell, Search, Settings, User, AlertOctagon, ShieldCheck,
  FileWarning, Clock, PackageCheck, Gavel, CheckCheck, Trash2, FilterX
} from 'lucide-react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

type Notif = {
  id: number;
  type: 'critical' | 'success' | 'warning' | 'info';
  title: string;
  desc: string;
  time: string;
  icon: React.ElementType;
  read: boolean;
  href?: string;
};

const INITIAL_NOTIFICATIONS: Notif[] = [
  {
    id: 1,
    type: 'critical',
    title: 'Phát hiện lô hàng nghi vấn nhãn hiệu',
    desc: 'Lô 40 thùng mỹ phẩm mang nhãn hiệu "CHANEL" tại cửa khẩu Nội Bài có dấu hiệu giả mạo. Cần xác minh gấp trong 24h.',
    time: '3 phút',
    icon: AlertOctagon,
    read: false,
    href: '/tra-cuu',
  },
  {
    id: 2,
    type: 'warning',
    title: 'Hồ sơ PEEL sắp hết hiệu lực',
    desc: 'Giấy chứng nhận mã 284731 (thuốc PEEL) sẽ hết hiệu lực vào 01/04/2028. Đề nghị chủ thể quyền nộp đơn gia hạn.',
    time: '12 phút',
    icon: Clock,
    read: false,
    href: '/tra-cuu',
  },
  {
    id: 3,
    type: 'critical',
    title: 'Yêu cầu tạm dừng thông quan mới',
    desc: 'Chủ thể quyền Nike Inc. gửi đơn yêu cầu tạm dừng lô hàng giày thể thao nghi giả mạo tại cảng Cát Lái.',
    time: '1 giờ',
    icon: Gavel,
    read: false,
    href: '/tra-cuu',
  },
  {
    id: 4,
    type: 'success',
    title: 'Thông quan thành công',
    desc: 'Lô hàng 500 chai thuốc PEEL (mã 284731) đã hoàn tất thủ tục kiểm tra SHTT và được phép thông quan.',
    time: '2 giờ',
    icon: PackageCheck,
    read: true,
    href: '/lich-su-shtt',
  },
  {
    id: 5,
    type: 'info',
    title: 'Cập nhật văn bản pháp luật',
    desc: 'Nghị định 17/2025/NĐ-CP về biện pháp thực thi SHTT tại biên giới đã có hiệu lực từ 15/03/2025.',
    time: '4 giờ',
    icon: FileWarning,
    read: true,
    href: '/van-ban-phap-luat',
  },
  {
    id: 6,
    type: 'success',
    title: 'Cấp mới 3 hồ sơ bảo hộ',
    desc: 'Hệ thống vừa cấp mới 3 giấy chứng nhận đăng ký nhãn hiệu mới vào kho dữ liệu kiểm tra.',
    time: '6 giờ',
    icon: ShieldCheck,
    read: true,
    href: '/thong-ke-shtt',
  },
  {
    id: 7,
    type: 'warning',
    title: 'Giám định chờ kết quả',
    desc: 'Hồ sơ giám định nhãn hiệu "ROLEX" tại cửa khẩu Tân Sơn Nhất đã gửi VIPRI, dự kiến có kết quả trong 30 ngày.',
    time: '1 ngày',
    icon: Clock,
    read: true,
  },
];

export default function Topbar() {
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState<Notif[]>(INITIAL_NOTIFICATIONS);
  const [filter, setFilter] = useState<'all' | 'unread'>('all');
  const notifRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const unreadCount = useMemo(() => notifications.filter(n => !n.read).length, [notifications]);
  const criticalUnread = useMemo(
    () => notifications.some(n => !n.read && n.type === 'critical'),
    [notifications],
  );
  const filtered = useMemo(
    () => (filter === 'unread' ? notifications.filter(n => !n.read) : notifications),
    [notifications, filter],
  );

  const markAllRead = () => setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  const markOneRead = (id: number) =>
    setNotifications(prev => prev.map(n => (n.id === id ? { ...n, read: true } : n)));
  const removeOne = (id: number) =>
    setNotifications(prev => prev.filter(n => n.id !== id));
  const clearAll = () => setNotifications([]);

  return (
    <header className="sticky top-0 z-50 w-full h-14 lg:h-16 bg-white/90 backdrop-blur-xl border-b border-slate-200/50 flex items-center justify-between px-4 sm:px-6 lg:px-12 transition-all">
      {/* Search placeholder */}
      <div className="flex-1 flex items-center">
        <motion.div
          whileHover={{ x: 5 }}
          className="hidden lg:flex items-center gap-2 px-4 py-2 bg-slate-100/80 rounded-2xl text-slate-500 hover:bg-white transition-all cursor-pointer border border-slate-200/60 w-72 shadow-sm hover:shadow-md group"
        >
          <Search className="w-4 h-4 shrink-0 group-hover:text-blue-600 transition-colors" />
          <span className="text-sm font-bold tracking-tight text-slate-400 group-hover:text-slate-600">
            Tìm kiếm hồ sơ hệ thống...
          </span>
        </motion.div>
      </div>

      <div className="flex items-center gap-2 sm:gap-4 relative">
        {/* Notifications */}
        <div ref={notifRef} className="relative">
          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            onClick={() => setShowNotifications(!showNotifications)}
            className={`relative p-2.5 rounded-xl transition-all duration-300 ${
              showNotifications
                ? 'bg-rose-600 text-white shadow-lg shadow-rose-500/40'
                : criticalUnread
                  ? 'bg-rose-50 text-rose-600 ring-1 ring-rose-200 hover:bg-rose-100'
                  : 'hover:bg-slate-100 text-slate-500 ring-1 ring-transparent hover:ring-slate-200'
            }`}
          >
            {/* Aura đỏ nhấp nháy khi có thông báo khẩn */}
            {criticalUnread && !showNotifications && (
              <span className="absolute inset-0 rounded-xl bg-rose-500/40 animate-ping-slow pointer-events-none" />
            )}

            <motion.div
              animate={
                !showNotifications && unreadCount > 0
                  ? { rotate: [0, -12, 12, -10, 10, -6, 6, 0] }
                  : {}
              }
              transition={{ duration: 0.7, repeat: Infinity, repeatDelay: criticalUnread ? 1.2 : 3, ease: 'easeInOut' }}
              className="relative z-10"
            >
              <Bell className="w-5 h-5" />
            </motion.div>

            {/* Badge đếm thông báo chưa đọc + nhấp nháy đỏ */}
            {unreadCount > 0 && (
              <div className="absolute -top-1 -right-1 flex items-center justify-center">
                <span className="absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75 animate-ping" />
                <span className="relative inline-flex min-w-[18px] h-[18px] px-1 items-center justify-center rounded-full bg-gradient-to-br from-rose-500 to-red-600 text-white text-[10px] font-black border-2 border-white shadow-[0_0_12px_rgba(244,63,94,0.8)]">
                  {unreadCount > 9 ? '9+' : unreadCount}
                </span>
              </div>
            )}
          </motion.button>

          <AnimatePresence>
            {showNotifications && (
              <motion.div
                initial={{ opacity: 0, y: 15, scale: 0.95, filter: 'blur(4px)' }}
                animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: 15, scale: 0.95, filter: 'blur(4px)' }}
                transition={{ type: 'spring', damping: 20, stiffness: 300 }}
                className="fixed sm:absolute right-0 sm:right-0 top-14 sm:top-14 w-screen sm:w-[380px] md:w-[420px] bg-white rounded-none sm:rounded-3xl shadow-2xl border-t sm:border border-slate-200/60 overflow-hidden z-50 ring-1 ring-black/5 max-h-[85vh] flex flex-col"
              >
                {/* Header */}
                <div className="p-5 border-b border-slate-100 bg-gradient-to-br from-slate-50 to-white flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-rose-500 to-red-600 flex items-center justify-center shadow-md shadow-rose-500/30 shrink-0">
                      <Bell className="w-5 h-5 text-white" />
                      {unreadCount > 0 && (
                        <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-emerald-400 border-2 border-white animate-pulse" />
                      )}
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-base font-black text-slate-900 tracking-tight">Trung tâm Thông báo</h3>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                        {unreadCount > 0 ? `${unreadCount} chưa đọc` : 'Tất cả đã đọc'}
                      </p>
                    </div>
                  </div>
                  {notifications.length > 0 && (
                    <button
                      onClick={markAllRead}
                      disabled={unreadCount === 0}
                      title="Đánh dấu tất cả đã đọc"
                      className="text-xs font-bold text-blue-600 hover:text-blue-800 disabled:text-slate-300 disabled:cursor-not-allowed transition-colors px-2.5 py-1.5 rounded-lg hover:bg-blue-50 flex items-center gap-1 shrink-0"
                    >
                      <CheckCheck className="w-3.5 h-3.5" /> Đã đọc
                    </button>
                  )}
                </div>

                {/* Filter tabs */}
                {notifications.length > 0 && (
                  <div className="flex items-center gap-1 px-5 py-2 border-b border-slate-100 bg-white">
                    {(['all', 'unread'] as const).map(f => (
                      <button
                        key={f}
                        onClick={() => setFilter(f)}
                        className={`px-3 py-1.5 rounded-lg text-[11px] font-black uppercase tracking-wider transition-all ${
                          filter === f
                            ? 'bg-slate-900 text-white shadow'
                            : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'
                        }`}
                      >
                        {f === 'all' ? `Tất cả · ${notifications.length}` : `Chưa đọc · ${unreadCount}`}
                      </button>
                    ))}
                    <button
                      onClick={clearAll}
                      title="Xoá tất cả"
                      className="ml-auto p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}

                {/* List */}
                <div className="flex-1 overflow-y-auto divide-y divide-slate-50 custom-scrollbar min-h-0">
                  {filtered.length === 0 ? (
                    <div className="py-16 flex flex-col items-center justify-center gap-3 text-slate-300">
                      <FilterX className="w-10 h-10" />
                      <p className="text-sm font-bold text-slate-400">
                        {notifications.length === 0 ? 'Chưa có thông báo nào' : 'Không có thông báo khớp bộ lọc'}
                      </p>
                    </div>
                  ) : (
                    filtered.map((notif, i) => (
                      <NotificationItem
                        key={notif.id}
                        notif={notif}
                        index={i}
                        onClick={() => {
                          markOneRead(notif.id);
                          if (notif.href) {
                            setShowNotifications(false);
                          }
                        }}
                        onRemove={() => removeOne(notif.id)}
                      />
                    ))
                  )}
                </div>

                {/* Footer */}
                <Link
                  href="/thong-bao"
                  onClick={() => setShowNotifications(false)}
                  className="block p-4 border-t border-slate-100 text-center bg-slate-50/50 hover:bg-blue-600 hover:text-white transition-all duration-300 group shrink-0"
                >
                  <span className="text-xs font-black uppercase tracking-[0.15em] transition-colors">
                    Xem toàn bộ lịch trình
                  </span>
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Global Settings */}
        <motion.div whileHover={{ rotate: 90 }} transition={{ duration: 0.5 }}>
          <Link
            href="/tai-khoan"
            className="hidden sm:flex p-2.5 rounded-xl hover:bg-slate-100 text-slate-500 transition-all border border-transparent hover:border-slate-200 shadow-sm hover:shadow-md"
          >
            <Settings className="w-5 h-5" />
          </Link>
        </motion.div>

        <div className="h-8 w-px bg-slate-200/80 mx-1 hidden sm:block" />

        <Link
          href="/tai-khoan"
          className="flex items-center gap-2 sm:gap-3.5 p-1.5 sm:pl-3 sm:pr-4 rounded-2xl hover:bg-white transition-all border border-transparent hover:border-slate-200 hover:shadow-lg group relative overflow-hidden bg-slate-50/40"
        >
          <div className="hidden sm:block text-right">
            <p className="text-[13px] font-black text-slate-900 group-hover:text-blue-600 transition-colors tracking-tight">
              Công chức Hải quan
            </p>
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

function NotificationItem({
  notif,
  index,
  onClick,
  onRemove,
}: {
  notif: Notif;
  index: number;
  onClick: () => void;
  onRemove: () => void;
}) {
  const typeColor =
    notif.type === 'critical'
      ? 'bg-rose-50 text-rose-600 ring-rose-100'
      : notif.type === 'success'
        ? 'bg-emerald-50 text-emerald-600 ring-emerald-100'
        : notif.type === 'warning'
          ? 'bg-amber-50 text-amber-600 ring-amber-100'
          : 'bg-blue-50 text-blue-600 ring-blue-100';

  const content = (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.04 }}
      onClick={onClick}
      className={`p-4 flex gap-3 hover:bg-slate-50 transition-all cursor-pointer relative group ${
        !notif.read ? 'bg-blue-50/30' : ''
      }`}
    >
      {!notif.read && (
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 to-blue-600 rounded-r-full" />
      )}

      <div
        className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 border border-white shadow-sm ring-1 ${typeColor} transition-transform group-hover:scale-110 duration-300 ${
          notif.type === 'critical' && !notif.read ? 'animate-pulse-glow' : ''
        }`}
      >
        <notif.icon className="w-5 h-5" />
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-start gap-2 mb-1">
          <h4
            className={`text-[13px] tracking-tight leading-snug ${
              !notif.read ? 'font-black text-slate-900' : 'font-bold text-slate-600'
            } line-clamp-2`}
          >
            {notif.title}
          </h4>
          <span className="text-[9px] font-bold text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded-full border border-slate-200 shrink-0">
            {notif.time}
          </span>
        </div>
        <p className="text-[12px] text-slate-500 font-medium leading-relaxed mb-2 line-clamp-2">{notif.desc}</p>
        <div className="flex items-center gap-3">
          {notif.href && (
            <span className="text-[10px] font-black text-blue-600/80 flex items-center gap-1 uppercase group-hover:underline">
              <Search className="w-3 h-3" /> Chi tiết
            </span>
          )}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onRemove();
            }}
            className="text-[10px] font-black text-slate-300 hover:text-rose-600 flex items-center gap-1 uppercase opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <Trash2 className="w-3 h-3" /> Xoá
          </button>
        </div>
      </div>
    </motion.div>
  );

  return notif.href ? <Link href={notif.href}>{content}</Link> : content;
}
