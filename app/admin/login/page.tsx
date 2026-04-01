'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ShieldCheck, User, Lock, ArrowRight, Loader2, Sparkles } from 'lucide-react';
import Link from 'next/link';

export default function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
    const checkAuth = async () => {
      const res = await fetch('/api/admin/check');
      if (res.ok) {
        router.push('/admin/documents');
      }
    };
    checkAuth();
  }, [router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (res.ok) {
        router.push('/admin/documents');
      } else {
        const data = await res.json();
        setError(data.error || 'Thông tin đăng nhập không chính xác');
      }
    } catch (err) {
      setError('Lỗi kết nối máy chủ');
    } finally {
      setLoading(false);
    }
  };

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center p-6 overflow-hidden">
      {/* Dynamic Background */}
      <div className="absolute inset-0 bg-[#0a0a0c] -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-600/10 blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-600/10 blur-[120px] animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute top-[30%] right-[10%] w-[30%] h-[30%] rounded-full bg-blue-400/5 blur-[100px]" />
      </div>

      <div className="w-full max-w-lg relative">
        {/* Back to Home Link */}
        <Link 
          href="/" 
          className="absolute -top-12 left-0 text-blue-400/60 hover:text-blue-400 font-bold text-xs uppercase tracking-widest flex items-center gap-2 transition-all"
        >
          <ArrowRight className="w-3 h-3 rotate-180" />
          Quay lại Trang chủ
        </Link>

        {/* Login Card */}
        <div className="glass-effect rounded-[2.5rem] border border-white/10 p-10 lg:p-14 shadow-3xl overflow-hidden relative group">
          {/* Top Decorative Line */}
          <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-blue-600 via-yellow-400 to-blue-600 shadow-[0_0_20px_rgba(59,130,246,0.3)]" />
          
          {/* Header */}
           <div className="text-center mb-12 relative">
             <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-blue-600/10 border border-blue-500/20 mb-6 relative group-hover:scale-110 transition-transform duration-500">
               <ShieldCheck className="w-10 h-10 text-blue-400" />
               <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-500 rounded-lg flex items-center justify-center shadow-lg border-2 border-[#0a0a0c]">
                 <Sparkles className="w-3 h-3 text-blue-950" />
               </div>
             </div>
             <h1 className="text-3xl font-black text-white tracking-tighter mb-2">
               Hệ thống <span className="text-yellow-400 uppercase">Admin</span>
             </h1>
             <p className="text-blue-100/40 text-xs font-bold uppercase tracking-[0.25em]">Quản trị Dữ liệu SHTT</p>
           </div>

           {/* Form */}
           <form onSubmit={handleLogin} className="space-y-6 relative">
              <div className="space-y-2">
                <label className="block text-[10px] font-black uppercase tracking-widest text-blue-100/40 ml-4">Định danh admin</label>
                <div className="relative group/input">
                  <div className="absolute left-5 top-1/2 -translate-y-1/2 text-blue-400/40 group-focus-within/input:text-blue-400 transition-colors">
                    <User className="w-5 h-5" />
                  </div>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Tên đăng nhập"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-14 py-5 text-white placeholder-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:bg-white/[0.08] transition-all font-bold"
                    disabled={loading}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-[10px] font-black uppercase tracking-widest text-blue-100/40 ml-4">Mã bảo mật</label>
                <div className="relative group/input">
                  <div className="absolute left-5 top-1/2 -translate-y-1/2 text-blue-400/40 group-focus-within/input:text-blue-400 transition-colors">
                    <Lock className="w-5 h-5" />
                  </div>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Mật khẩu truy cập"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-14 py-5 text-white placeholder-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:bg-white/[0.08] transition-all font-bold"
                    disabled={loading}
                    required
                  />
                </div>
              </div>

              {error && (
                <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-500 rounded-2xl text-xs font-bold flex items-center gap-3 animate-shake">
                  <span className="text-lg">⚠️</span> {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full group/btn relative overflow-hidden bg-blue-600 hover:bg-blue-500 text-white font-black uppercase tracking-widest py-5 rounded-2xl transition-all shadow-xl shadow-blue-600/20 active:scale-95 disabled:opacity-50"
              >
                <div className="relative z-10 flex items-center justify-center gap-3">
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Đang xác thực...
                    </>
                  ) : (
                    <>
                      Xác nhận đăng nhập
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </div>
                {/* Button Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400/0 via-white/20 to-blue-400/0 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-700" />
              </button>
           </form>

           {/* Footer Info */}
           <div className="mt-12 text-center">
             <p className="text-[10px] text-blue-100/20 font-medium">BẢN QUYỀN THUỘC VỀ TRUNG TÂM DỮ LIỆU SỮ HỮU TRÍ TUỆ HẢI QUAN © 2025</p>
           </div>
        </div>

        {/* Floating Demo Info */}
        <div className="mt-8 flex justify-center gap-6">
           <div className="text-[10px] text-gray-600 bg-white/5 px-4 py-2 rounded-full border border-white/5">
             USER: <span className="text-blue-400 font-bold ml-1">admin</span>
           </div>
           <div className="text-[10px] text-gray-600 bg-white/5 px-4 py-2 rounded-full border border-white/5">
             PASS: <span className="text-blue-400 font-bold ml-1">admin123</span>
           </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        .animate-shake {
          animation: shake 0.2s ease-in-out 0s 2;
        }
      `}</style>
    </div>
  );
}
