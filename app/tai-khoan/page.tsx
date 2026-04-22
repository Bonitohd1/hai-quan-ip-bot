'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useSession, signOut } from 'next-auth/react';
import {
  ShieldCheck, Smartphone, Key, MonitorSmartphone, MapPin,
  Clock, Activity, Edit3, LogOut, CheckCircle2, User, ChevronRight,
  Fingerprint, Save, X, Shield, Crown, Eye
} from 'lucide-react';

type Role = 'VIEWER' | 'OFFICER' | 'ADMIN';

const ROLE_CONFIG: Record<Role, { label: string; desc: string; color: string; bg: string; icon: React.ElementType }> = {
  VIEWER:  { label: 'Tra cứu viên', desc: 'Xem tra cứu, văn bản pháp luật, lịch sử', color: 'text-blue-700', bg: 'bg-blue-50 border-blue-200', icon: Eye },
  OFFICER: { label: 'Cán bộ tác nghiệp', desc: 'Thêm ghi chú, xuất báo cáo, thao tác hồ sơ', color: 'text-emerald-700', bg: 'bg-emerald-50 border-emerald-200', icon: Shield },
  ADMIN:   { label: 'Quản trị viên', desc: 'Quản lý người dùng, cấu hình hệ thống', color: 'text-purple-700', bg: 'bg-purple-50 border-purple-200', icon: Crown },
};

const UNITS = [
  'Tổng cục Hải quan', 'Cục Hải quan TP. Hồ Chí Minh', 'Cục Hải quan TP. Hà Nội',
  'Cục Hải quan TP. Hải Phòng', 'Cục Hải quan Đà Nẵng', 'Cục Hải quan Bình Dương',
  'Cục Hải quan Đồng Nai', 'Cục Hải quan Long An', 'Cục Hải quan Lạng Sơn',
  'Cục Hải quan Quảng Ninh', 'Cục Giám sát Quản lý (GSQL)', 'Khác',
];

const DEPARTMENTS = [
  'Phòng Kiểm soát Hải quan', 'Phòng Nghiệp vụ', 'Phòng Pháp chế',
  'Phòng CNTT', 'Phòng Tổ chức Cán bộ', 'Chi cục Hải quan cửa khẩu',
  'Tổ SHTT & Kiểm soát chất lượng', 'Khác',
];

interface ProfileForm {
  fullName: string;
  employeeId: string;
  unit: string;
  department: string;
  position: string;
  phoneInternal: string;
}

export default function TaiKhoan() {
  const { data: session, status } = useSession();
  const [activeTab, setActiveTab] = useState<'profile' | 'security'>('profile');
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveMsg, setSaveMsg] = useState('');
  const [form, setForm] = useState<ProfileForm>({
    fullName: '', employeeId: '', unit: '', department: '', position: '', phoneInternal: '',
  });

  useEffect(() => {
    if (session?.user) {
      setForm({
        fullName: session.user.fullName ?? session.user.name ?? '',
        employeeId: session.user.employeeId ?? '',
        unit: session.user.unit ?? '',
        department: session.user.department ?? '',
        position: session.user.position ?? '',
        phoneInternal: session.user.phoneInternal ?? '',
      });
    }
  }, [session]);

  const handleLogout = async () => {
    try { await signOut({ redirect: false }); } catch {}
    window.location.href = '/auth/signin';
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch('/api/user/profile', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setSaveMsg('Đã lưu thành công');
        setEditing(false);
        setTimeout(() => setSaveMsg(''), 3000);
      }
    } finally {
      setSaving(false);
    }
  };

  const role = (session?.user?.role ?? 'VIEWER') as Role;
  const rc = ROLE_CONFIG[role];
  const RoleIcon = rc.icon;

  if (status === 'loading') return null;

  return (
    <div className="max-w-6xl mx-auto w-full font-sans">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Cài đặt tài khoản</h1>
        <div className="flex items-center gap-3">
          {saveMsg && (
            <span className="flex items-center gap-1.5 text-sm font-bold text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200">
              <CheckCircle2 className="w-4 h-4" /> {saveMsg}
            </span>
          )}
          <button onClick={handleLogout} className="flex items-center gap-2 px-4 py-2 bg-rose-50 text-rose-600 hover:bg-rose-100 font-bold rounded-xl transition-colors">
            <LogOut className="w-4 h-4" /> Đăng xuất
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

        {/* LEFT PROFILE CARD */}
        <div className="lg:col-span-4 space-y-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-[2rem] shadow-sm border border-slate-200 overflow-hidden">
            {/* Header */}
            <div className="relative pt-12 pb-8 px-6 flex flex-col items-center bg-gradient-to-b from-blue-50 to-white text-center border-b border-slate-100">
              {!editing ? (
                <button onClick={() => setEditing(true)} className="absolute top-4 right-4 z-10 w-8 h-8 bg-blue-100 hover:bg-blue-200 text-blue-600 rounded-full flex items-center justify-center transition-colors">
                  <Edit3 className="w-4 h-4" />
                </button>
              ) : (
                <button onClick={() => setEditing(false)} className="absolute top-4 right-4 z-10 w-8 h-8 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-full flex items-center justify-center transition-colors">
                  <X className="w-4 h-4" />
                </button>
              )}

              <div className="w-24 h-24 rounded-full bg-blue-100 flex items-center justify-center border-4 border-white shadow-lg overflow-hidden mb-4 ring-2 ring-blue-50 relative">
                {session?.user?.image
                  ? <img src={session.user.image} alt="Avatar" className="w-full h-full object-cover" />
                  : <User className="w-10 h-10 text-blue-400" />
                }
              </div>

              <h2 className="text-xl font-bold text-slate-900 mb-0.5">
                {form.fullName || session?.user?.name || 'Công chức Hải quan'}
              </h2>
              <p className="text-[13px] font-semibold text-slate-500 uppercase tracking-wider mb-2">
                {form.position || 'Chức vụ chưa cập nhật'}
              </p>
              <p className="text-[12px] font-medium text-slate-400 mb-3">
                {form.unit || 'Đơn vị chưa cập nhật'}
              </p>

              {/* Role badge */}
              <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold border ${rc.bg} ${rc.color}`}>
                <RoleIcon className="w-3.5 h-3.5" /> {rc.label}
              </div>

              <div className="flex items-center gap-2 mt-3">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs font-bold text-slate-400">Trực tuyến</span>
              </div>
            </div>

            {/* Profile Info / Edit Form */}
            <div className="p-6">
              {editing ? (
                <div className="space-y-4">
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Chỉnh sửa hồ sơ</h3>

                  {[
                    { label: 'Họ và tên', key: 'fullName', type: 'text', placeholder: 'Nguyễn Văn A' },
                    { label: 'Mã số công chức', key: 'employeeId', type: 'text', placeholder: 'HQ-0001234' },
                    { label: 'Chức vụ', key: 'position', type: 'text', placeholder: 'Kiểm soát viên Hải quan' },
                    { label: 'Số nội bộ', key: 'phoneInternal', type: 'text', placeholder: '(+84) 24...' },
                  ].map(f => (
                    <div key={f.key}>
                      <label className="text-[11px] font-bold text-slate-400 uppercase block mb-1">{f.label}</label>
                      <input
                        type={f.type}
                        value={form[f.key as keyof ProfileForm]}
                        onChange={e => setForm(prev => ({ ...prev, [f.key]: e.target.value }))}
                        placeholder={f.placeholder}
                        className="w-full px-3 py-2 text-sm font-medium border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  ))}

                  <div>
                    <label className="text-[11px] font-bold text-slate-400 uppercase block mb-1">Đơn vị công tác</label>
                    <select value={form.unit} onChange={e => setForm(prev => ({ ...prev, unit: e.target.value }))}
                      className="w-full px-3 py-2 text-sm font-medium border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white">
                      <option value="">-- Chọn đơn vị --</option>
                      {UNITS.map(u => <option key={u} value={u}>{u}</option>)}
                    </select>
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-slate-400 uppercase block mb-1">Phòng ban</label>
                    <select value={form.department} onChange={e => setForm(prev => ({ ...prev, department: e.target.value }))}
                      className="w-full px-3 py-2 text-sm font-medium border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white">
                      <option value="">-- Chọn phòng ban --</option>
                      {DEPARTMENTS.map(d => <option key={d} value={d}>{d}</option>)}
                    </select>
                  </div>

                  <button onClick={handleSave} disabled={saving}
                    className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-xl flex items-center justify-center gap-2 transition-colors disabled:opacity-50">
                    <Save className="w-4 h-4" /> {saving ? 'Đang lưu...' : 'Lưu thay đổi'}
                  </button>
                </div>
              ) : (
                <div>
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Thông tin liên lạc</h3>
                  <div className="space-y-4">
                    <div>
                      <p className="text-[11px] font-bold text-slate-400 uppercase">Email công vụ</p>
                      <p className="text-sm font-semibold text-slate-900 mt-0.5 truncate">{session?.user?.email ?? '—'}</p>
                    </div>
                    <div>
                      <p className="text-[11px] font-bold text-slate-400 uppercase">Mã số công chức</p>
                      <p className="text-sm font-semibold text-slate-900 mt-0.5">{form.employeeId || <span className="text-slate-400 italic">Chưa cập nhật</span>}</p>
                    </div>
                    <div>
                      <p className="text-[11px] font-bold text-slate-400 uppercase">Phòng ban</p>
                      <p className="text-sm font-semibold text-slate-900 mt-0.5">{form.department || <span className="text-slate-400 italic">Chưa cập nhật</span>}</p>
                    </div>
                    <div>
                      <p className="text-[11px] font-bold text-slate-400 uppercase">Đơn vị công tác</p>
                      <p className="text-sm font-semibold text-slate-900 mt-0.5 flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-blue-500 shrink-0" />
                        {form.unit || <span className="text-slate-400 italic">Chưa cập nhật</span>}
                      </p>
                    </div>
                    {form.phoneInternal && (
                      <div>
                        <p className="text-[11px] font-bold text-slate-400 uppercase">Số nội bộ</p>
                        <p className="text-sm font-semibold text-slate-900 mt-0.5">{form.phoneInternal}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </motion.div>

          {/* Role info card */}
          <div className={`rounded-2xl p-4 border ${rc.bg}`}>
            <div className="flex items-center gap-3 mb-2">
              <RoleIcon className={`w-5 h-5 ${rc.color}`} />
              <p className={`text-sm font-black ${rc.color}`}>{rc.label}</p>
            </div>
            <p className="text-xs font-medium text-slate-600">{rc.desc}</p>
            <p className="text-[10px] font-bold text-slate-400 mt-2 uppercase tracking-wider">Liên hệ admin để thay đổi quyền</p>
          </div>
        </div>

        {/* RIGHT CONTENT TABS */}
        <div className="lg:col-span-8">
          <div className="bg-white rounded-[2rem] shadow-sm border border-slate-200 min-h-full">
            <div className="flex items-center gap-6 p-2 px-6 border-b border-slate-100">
              <button onClick={() => setActiveTab('profile')}
                className={`relative py-4 text-sm font-bold transition-colors flex items-center gap-2 ${activeTab === 'profile' ? 'text-blue-600' : 'text-slate-500 hover:text-slate-900'}`}>
                <Activity className="w-4 h-4" /> Tổng quan hoạt động
                {activeTab === 'profile' && <motion.div layoutId="tab-indicator" className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600" />}
              </button>
              <button onClick={() => setActiveTab('security')}
                className={`relative py-4 text-sm font-bold transition-colors flex items-center gap-2 ${activeTab === 'security' ? 'text-blue-600' : 'text-slate-500 hover:text-slate-900'}`}>
                <ShieldCheck className="w-4 h-4" /> Bảo mật & Định danh
                {activeTab === 'security' && <motion.div layoutId="tab-indicator" className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600" />}
              </button>
            </div>

            <div className="p-8">
              {activeTab === 'profile' && (
                <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }}>
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-bold text-slate-900">Chỉ số tác nghiệp cá nhân</h3>
                    <div className="px-3 py-1 bg-slate-100 text-slate-600 text-xs font-bold rounded-lg uppercase tracking-wider">
                      {new Date().toLocaleDateString('vi-VN', { month: 'long', year: 'numeric' })}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-10">
                    <div className="p-6 rounded-2xl bg-blue-50 border border-blue-100/50 flex flex-col justify-center">
                      <p className="text-sm font-bold text-blue-600/80 mb-2 uppercase tracking-wide">Hồ sơ đã can thiệp</p>
                      <div className="flex items-end gap-2">
                        <p className="text-5xl font-black text-slate-400 tracking-tight">—</p>
                        <p className="text-sm font-bold text-slate-400 mb-1.5">vụ việc</p>
                      </div>
                      <p className="text-[10px] font-bold text-slate-400 mt-2">Dữ liệu sẽ cập nhật khi có căn cứ</p>
                    </div>
                    <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-100/50 flex flex-col justify-center">
                      <p className="text-sm font-bold text-emerald-600/80 mb-2 uppercase tracking-wide">Khoanh vùng chính xác</p>
                      <div className="flex items-end gap-2">
                        <p className="text-5xl font-black text-slate-400 tracking-tight">—</p>
                        <p className="text-sm font-bold text-slate-400 mb-1.5">rủi ro SHTT</p>
                      </div>
                      <p className="text-[10px] font-bold text-slate-400 mt-2">Dữ liệu sẽ cập nhật khi có căn cứ</p>
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                    Lịch sử đăng nhập
                    <span className="text-xs font-medium text-slate-500 bg-slate-100 px-2 rounded-full">phiên hiện tại</span>
                  </h3>

                  <div className="p-4 rounded-xl border border-slate-100 bg-slate-50 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center shrink-0">
                        <MonitorSmartphone className="w-5 h-5 text-slate-600" />
                      </div>
                      <div>
                        <p className="font-bold text-slate-900 text-sm flex items-center gap-2">
                          Trình duyệt web
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        </p>
                        <p className="text-xs font-semibold text-slate-500 mt-0.5">{session?.user?.email}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Phiên hiện tại</p>
                      <p className="text-[10px] font-bold text-emerald-600 mt-1 uppercase">Đang hoạt động</p>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'security' && (
                <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                  <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-100/60 flex items-start gap-5">
                    <div className="w-12 h-12 bg-white rounded-xl shadow-sm border border-emerald-100 flex items-center justify-center shrink-0">
                      <ShieldCheck className="w-6 h-6 text-emerald-600" />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-slate-900">Google Workspace SSO</h4>
                      <p className="text-sm font-medium text-slate-700 mt-1 mb-4 leading-relaxed">
                        Tài khoản được xác thực qua Google. Mật khẩu và bảo mật 2 bước quản lý bởi Google Account.
                      </p>
                      <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-emerald-600 text-white rounded-lg text-xs font-bold shadow-sm">
                        <CheckCircle2 className="w-4 h-4" /> Đang bảo vệ
                      </div>
                    </div>
                  </div>

                  <div className="p-6 rounded-2xl bg-white border border-slate-200">
                    <div className="flex items-center gap-3 mb-3">
                      <Fingerprint className="w-5 h-5 text-blue-600" />
                      <h4 className="font-bold text-slate-900 text-base">Xác thực VNeID</h4>
                    </div>
                    <p className="text-sm font-medium text-slate-500 leading-relaxed">
                      Kết nối VNeID để xác thực sinh trắc học khi ký duyệt quyết định tạm dừng thông quan quan trọng.
                    </p>
                    <button className="mt-4 px-4 py-2 bg-blue-600 text-white text-xs font-bold rounded-xl hover:bg-blue-700 transition-colors">
                      Kết nối VNeID
                    </button>
                  </div>

                  <div className="p-6 rounded-2xl bg-white border border-slate-200">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <Key className="w-5 h-5 text-slate-600" />
                        <h4 className="font-bold text-slate-900 text-base">Phân quyền hệ thống</h4>
                      </div>
                    </div>
                    <div className={`p-4 rounded-xl border ${rc.bg} flex items-center gap-3`}>
                      <RoleIcon className={`w-5 h-5 ${rc.color} shrink-0`} />
                      <div>
                        <p className={`text-sm font-black ${rc.color}`}>{rc.label}</p>
                        <p className="text-xs font-medium text-slate-600 mt-0.5">{rc.desc}</p>
                      </div>
                    </div>
                    <p className="text-xs font-medium text-slate-400 mt-3">
                      Để thay đổi quyền, liên hệ Quản trị viên hệ thống.
                    </p>
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
