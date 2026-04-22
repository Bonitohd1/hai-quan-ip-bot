'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  Users, Crown, Shield, Eye, Search, RefreshCw,
  CheckCircle2, AlertTriangle, UserX, UserCheck, Settings
} from 'lucide-react';

type Role = 'VIEWER' | 'OFFICER' | 'ADMIN';

interface UserProfile {
  id: string;
  email: string;
  fullName: string | null;
  employeeId: string | null;
  unit: string | null;
  department: string | null;
  position: string | null;
  role: Role;
  isActive: boolean;
  createdAt: string;
  lastLoginAt: string | null;
}

const ROLE_CONFIG: Record<Role, { label: string; color: string; bg: string; icon: React.ElementType }> = {
  VIEWER:  { label: 'Tra cứu viên', color: 'text-blue-700', bg: 'bg-blue-50 border-blue-200', icon: Eye },
  OFFICER: { label: 'Cán bộ tác nghiệp', color: 'text-emerald-700', bg: 'bg-emerald-50 border-emerald-200', icon: Shield },
  ADMIN:   { label: 'Quản trị viên', color: 'text-purple-700', bg: 'bg-purple-50 border-purple-200', icon: Crown },
};

export default function QuanTri() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');
  const [updating, setUpdating] = useState<string | null>(null);
  const [msg, setMsg] = useState('');

  const isAdmin = session?.user?.role === 'ADMIN';

  useEffect(() => {
    if (status === 'authenticated' && !isAdmin) {
      router.replace('/');
    }
  }, [status, isAdmin, router]);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/users');
      if (res.ok) setUsers(await res.json());
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAdmin) fetchUsers();
  }, [isAdmin]);

  const updateUser = async (id: string, patch: { role?: Role; isActive?: boolean }) => {
    setUpdating(id);
    try {
      const res = await fetch('/api/admin/users', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, ...patch }),
      });
      if (res.ok) {
        const updated = await res.json();
        setUsers(prev => prev.map(u => u.id === id ? updated : u));
        setMsg('Đã cập nhật');
        setTimeout(() => setMsg(''), 2500);
      }
    } finally {
      setUpdating(null);
    }
  };

  const filtered = users.filter(u => {
    const q = query.toLowerCase();
    return !q || (u.email + (u.fullName ?? '') + (u.unit ?? '')).toLowerCase().includes(q);
  });

  const stats = {
    total: users.length,
    active: users.filter(u => u.isActive).length,
    byRole: {
      ADMIN: users.filter(u => u.role === 'ADMIN').length,
      OFFICER: users.filter(u => u.role === 'OFFICER').length,
      VIEWER: users.filter(u => u.role === 'VIEWER').length,
    },
  };

  if (status === 'loading') return null;
  if (!isAdmin) return null;

  return (
    <div className="flex flex-col min-h-screen bg-[#f1f5f9] -m-6 lg:-m-12 p-6 lg:p-10 space-y-6 max-w-[1600px] mx-auto font-sans">

      {/* HEADER */}
      <div className="bg-[#0a192f] rounded-3xl p-8 lg:p-10 shadow-2xl relative overflow-hidden border border-slate-800">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-purple-500/10 to-transparent pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-purple-500 text-white text-[11px] font-bold uppercase tracking-wider rounded-full mb-4 shadow-lg shadow-purple-500/30">
              <Settings className="w-3.5 h-3.5" /> Quản trị hệ thống
            </div>
            <h1 className="text-3xl lg:text-4xl font-extrabold text-white tracking-tight mb-2">
              Quản lý <span className="text-purple-400">người dùng</span>
            </h1>
            <p className="text-slate-400 font-medium">Phân quyền, kích hoạt / khóa tài khoản cán bộ trong hệ thống.</p>
          </div>
          <div className="grid grid-cols-4 gap-3 shrink-0">
            {[
              { label: 'Tổng', value: stats.total, color: 'text-white' },
              { label: 'Admin', value: stats.byRole.ADMIN, color: 'text-purple-400' },
              { label: 'Cán bộ', value: stats.byRole.OFFICER, color: 'text-emerald-400' },
              { label: 'Tra cứu', value: stats.byRole.VIEWER, color: 'text-blue-400' },
            ].map((s, i) => (
              <div key={i} className="bg-white/10 rounded-2xl p-3 text-center border border-white/10">
                <p className={`text-2xl font-black ${s.color}`}>{s.value}</p>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* TOOLBAR */}
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input value={query} onChange={e => setQuery(e.target.value)}
            placeholder="Tìm theo email, tên, đơn vị..."
            className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-2xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-sm" />
        </div>
        <div className="flex items-center gap-3">
          {msg && (
            <span className="flex items-center gap-1.5 text-sm font-bold text-emerald-600 bg-emerald-50 px-3 py-2 rounded-xl border border-emerald-200">
              <CheckCircle2 className="w-4 h-4" /> {msg}
            </span>
          )}
          <button onClick={fetchUsers} className="flex items-center gap-2 px-4 py-3 bg-white border border-slate-200 rounded-2xl text-sm font-bold text-slate-600 hover:bg-slate-50 shadow-sm transition-colors">
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} /> Làm mới
          </button>
        </div>
      </div>

      {/* USER TABLE */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <h2 className="text-base font-bold text-[#0a192f] flex items-center gap-2">
            <Users className="w-5 h-5 text-purple-500" /> DANH SÁCH NGƯỜI DÙNG
          </h2>
          <span className="px-3 py-1 bg-white border border-slate-200 rounded-full text-xs font-bold text-slate-500">
            {filtered.length} tài khoản
          </span>
        </div>

        {loading ? (
          <div className="flex items-center justify-center h-48 gap-3">
            <RefreshCw className="w-5 h-5 text-slate-400 animate-spin" />
            <p className="text-sm font-bold text-slate-400">Đang tải...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-48 gap-3">
            <Users className="w-10 h-10 text-slate-200" />
            <p className="text-sm font-bold text-slate-400">Chưa có người dùng nào</p>
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {filtered.map((u, i) => {
              const rc = ROLE_CONFIG[u.role];
              const RoleIcon = rc.icon;
              const isUpdating = updating === u.id;
              return (
                <motion.div key={u.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }}
                  className={`p-5 flex items-center gap-4 hover:bg-slate-50/60 transition-colors ${!u.isActive ? 'opacity-60' : ''}`}>

                  {/* Avatar */}
                  <div className="w-11 h-11 rounded-xl bg-slate-100 flex items-center justify-center shrink-0 font-black text-slate-500 text-base">
                    {(u.fullName ?? u.email)[0].toUpperCase()}
                  </div>

                  {/* User info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <p className="font-bold text-sm text-[#0a192f] truncate">
                        {u.fullName ?? <span className="text-slate-400 italic">Chưa cập nhật tên</span>}
                      </p>
                      {!u.isActive && (
                        <span className="px-2 py-0.5 bg-slate-100 text-slate-500 text-[10px] font-bold rounded-full border border-slate-200 shrink-0">Đã khóa</span>
                      )}
                    </div>
                    <p className="text-xs font-medium text-slate-500 truncate">{u.email}</p>
                    <p className="text-[11px] font-medium text-slate-400 truncate mt-0.5">
                      {[u.position, u.unit].filter(Boolean).join(' · ') || 'Chưa cập nhật đơn vị'}
                    </p>
                  </div>

                  {/* Role badge + selector */}
                  <div className="flex items-center gap-2 shrink-0">
                    <span className={`hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold border ${rc.bg} ${rc.color}`}>
                      <RoleIcon className="w-3 h-3" /> {rc.label}
                    </span>

                    <select
                      value={u.role}
                      disabled={isUpdating || u.email === session?.user?.email}
                      onChange={e => updateUser(u.id, { role: e.target.value as Role })}
                      className="text-xs font-bold border border-slate-200 rounded-xl px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <option value="VIEWER">Tra cứu viên</option>
                      <option value="OFFICER">Cán bộ tác nghiệp</option>
                      <option value="ADMIN">Quản trị viên</option>
                    </select>

                    <button
                      disabled={isUpdating || u.email === session?.user?.email}
                      onClick={() => updateUser(u.id, { isActive: !u.isActive })}
                      title={u.isActive ? 'Khóa tài khoản' : 'Kích hoạt tài khoản'}
                      className={`w-9 h-9 rounded-xl flex items-center justify-center border transition-colors disabled:opacity-40 disabled:cursor-not-allowed ${u.isActive ? 'bg-rose-50 border-rose-200 text-rose-600 hover:bg-rose-100' : 'bg-emerald-50 border-emerald-200 text-emerald-600 hover:bg-emerald-100'}`}>
                      {u.isActive ? <UserX className="w-4 h-4" /> : <UserCheck className="w-4 h-4" />}
                    </button>
                  </div>

                  {/* Last login */}
                  <div className="text-right shrink-0 hidden lg:block">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Đăng nhập gần nhất</p>
                    <p className="text-xs font-semibold text-slate-600 mt-0.5">
                      {u.lastLoginAt ? new Date(u.lastLoginAt).toLocaleDateString('vi-VN') : '—'}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>

      {/* Role guide */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {(Object.entries(ROLE_CONFIG) as [Role, typeof ROLE_CONFIG[Role]][]).map(([role, rc]) => {
          const Icon = rc.icon;
          const perms: Record<Role, string[]> = {
            VIEWER: ['Xem tra cứu hồ sơ nhãn hiệu', 'Xem văn bản pháp luật', 'Xem lịch sử SHTT', 'Xem hồ sơ bảo hộ biên giới'],
            OFFICER: ['Tất cả quyền Tra cứu viên', 'Sử dụng quy trình xử lý vi phạm', 'Xuất báo cáo', 'Thêm ghi chú vào hồ sơ'],
            ADMIN: ['Tất cả quyền Cán bộ', 'Quản lý tài khoản người dùng', 'Phân quyền / khóa tài khoản', 'Cấu hình hệ thống'],
          };
          return (
            <div key={role} className={`p-5 rounded-2xl border ${rc.bg}`}>
              <div className="flex items-center gap-2 mb-3">
                <Icon className={`w-5 h-5 ${rc.color}`} />
                <p className={`font-black text-sm ${rc.color}`}>{rc.label}</p>
              </div>
              <ul className="space-y-1.5">
                {perms[role].map(p => (
                  <li key={p} className="flex items-start gap-2 text-xs font-medium text-slate-700">
                    <CheckCircle2 className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" /> {p}
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
}
