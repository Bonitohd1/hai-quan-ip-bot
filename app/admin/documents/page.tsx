'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  FilePlus, 
  Files, 
  Trash2, 
  Eye, 
  LogOut, 
  Settings, 
  Upload, 
  Info,
  CheckCircle2,
  AlertCircle,
  FileText,
  Search as SearchIcon,
  Filter
} from 'lucide-react';

interface Document {
  id: string;
  code: string;
  date: string;
  name: string;
  filename: string;
  type: string;
  description: string;
}

export default function AdminDocuments() {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [type, setType] = useState('Gia hạn');
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState<'single' | 'bulk'>('single');
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
    loadDocuments();
  }, []);

  const loadDocuments = async () => {
    try {
      const res = await fetch('/api/documents');
      const data = await res.json();
      setDocuments(data.documents || []);
    } catch (error) {
      console.error('Error loading documents:', error);
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !name.trim()) {
      setMessage('Vui lòng chọn file và nhập tên');
      return;
    }

    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('name', name);
    formData.append('date', date || new Date().toLocaleDateString('vi-VN'));
    formData.append('type', type);

    try {
      const res = await fetch('/api/documents', {
        method: 'POST',
        body: formData,
      });

      if (res.ok) {
        setMessage('✓ Upload thành công');
        setFile(null);
        setName('');
        setDate('');
        setType('Gia hạn');
        setTimeout(() => {
          loadDocuments();
          setMessage('');
        }, 1000);
      } else {
        const error = await res.json();
        setMessage(`✗ Lỗi: ${error.error}`);
      }
    } catch (error) {
      setMessage('✗ Lỗi upload');
    } finally {
      setUploading(false);
    }
  };

  const handleBulkUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    setMessage('⏳ Đang upload hàng loạt...');

    let uploaded = 0;
    let failed = 0;

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (!file.name.toLowerCase().endsWith('.pdf')) continue;

      const nameWithoutExt = file.name.replace('.pdf', '').trim();
      const parts = nameWithoutExt.split(/\s+/);
      
      let dateStr = '';
      let nameStr = '';

      if (parts.length >= 3) {
        dateStr = parts[1];
        nameStr = parts.slice(2).join(' ');
      } else if (parts.length === 2) {
        nameStr = parts[1];
      } else {
        nameStr = nameWithoutExt;
      }

      const formData = new FormData();
      formData.append('file', file);
      formData.append('name', nameStr || 'Không xác định');
      formData.append('date', dateStr || new Date().toLocaleDateString('vi-VN'));
      formData.append('type', 'Gia hạn');

      try {
        const res = await fetch('/api/documents', {
          method: 'POST',
          body: formData,
        });

        if (res.ok) uploaded++;
        else failed++;
      } catch (error) {
        failed++;
      }
    }

    setMessage(`✓ Hoàn tất: ${uploaded} thành công, ${failed} lỗi`);
    setTimeout(() => {
      loadDocuments();
      setMessage('');
      setUploading(false);
    }, 2000);
  };

  const handleDelete = async (code: string) => {
    if (!confirm('Xác nhận xóa công văn này?')) return;

    try {
      const res = await fetch('/api/documents', {
        method: 'DELETE',
        body: JSON.stringify({ code }),
      });

      if (res.ok) {
        setMessage('✓ Đã xóa công văn');
        setTimeout(() => {
          loadDocuments();
          setMessage('');
        }, 1000);
      }
    } catch (error) {
      setMessage('✗ Lỗi xóa');
    }
  };

  const handleLogout = async () => {
    await fetch('/api/admin/login', { method: 'DELETE' });
    router.push('/admin/login');
  };

  const filteredDocs = documents.filter(doc => 
    doc.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    doc.code.includes(searchQuery)
  );

  if (!mounted) return null;

  return (
    <div className="flex flex-col gap-10">
      {/* Premium Header */}
      <header className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/5 p-8 lg:p-12 shadow-2xl backdrop-blur-xl">
        <div className="absolute top-0 right-0 p-20 -translate-y-1/2 translate-x-1/2 w-80 h-80 bg-blue-600/10 blur-[100px] rounded-full" />
        <div className="relative flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 rounded-3xl bg-blue-600/20 border border-blue-500/20 flex items-center justify-center shadow-xl">
              <Settings className="w-8 h-8 text-blue-400 animate-spin-slow" />
            </div>
            <div>
              <h1 className="text-3xl font-black text-white tracking-tighter">Bảng Điều Khiển <span className="text-yellow-400 lowercase">Admin</span></h1>
              <p className="text-blue-100/40 text-xs font-bold uppercase tracking-[0.2em] mt-1">Cơ sở dữ liệu Công văn HQ</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="group flex items-center gap-2 bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white px-6 py-3 rounded-2xl font-bold transition-all border border-red-500/20 active:scale-95 text-sm"
          >
            <LogOut className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Đăng xuất
          </button>
        </div>
      </header>

      {/* Main Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
        
        {/* Left: Upload Section */}
        <div className="xl:col-span-4 flex flex-col gap-6">
          <section className="bg-white/5 border border-white/10 glass-effect rounded-[2.5rem] p-8 lg:p-10 shadow-2xl relative overflow-hidden group">
            <h2 className="text-xl font-black text-white mb-8 flex items-center gap-3">
              <span className="p-2 bg-yellow-500/10 rounded-xl text-yellow-500"><Upload className="w-5 h-5" /></span>
              Cập nhật dữ liệu
            </h2>

            {/* Tab Switcher */}
            <div className="flex p-1 bg-black/40 rounded-2xl border border-white/5 mb-8">
              <button
                onClick={() => setActiveTab('single')}
                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-bold transition-all ${
                  activeTab === 'single' ? 'bg-blue-600 text-white shadow-lg' : 'text-gray-500 hover:text-white'
                }`}
              >
                <FilePlus className="w-4 h-4" />
                Đơn lẻ
              </button>
              <button
                onClick={() => setActiveTab('bulk')}
                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-bold transition-all ${
                  activeTab === 'bulk' ? 'bg-blue-600 text-white shadow-lg' : 'text-gray-500 hover:text-white'
                }`}
              >
                <Files className="w-4 h-4" />
                Hàng loạt
              </button>
            </div>

            {activeTab === 'single' ? (
              <form onSubmit={handleUpload} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-blue-100/40 ml-2">File PDF Công văn</label>
                  <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-white/10 rounded-2xl hover:border-blue-500/50 hover:bg-blue-500/5 transition-all cursor-pointer group/upload">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Upload className="w-8 h-8 text-gray-500 group-hover/upload:text-blue-400 group-hover/upload:scale-110 transition-all mb-2" />
                      <p className="text-xs text-gray-500 font-bold group-hover/upload:text-blue-200 transition-colors">
                        {file ? file.name : 'Nhấn để chọn file'}
                      </p>
                    </div>
                    <input type="file" accept=".pdf" className="hidden" onChange={(e) => setFile(e.target.files?.[0] || null)} />
                  </label>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-blue-100/40 ml-2">Tên thương hiệu / Sản phẩm</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="VD: Nike, Adidas, Casio..."
                    className="w-full bg-black/30 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500/30 transition-all font-bold"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-blue-100/40 ml-2">Ngày</label>
                    <input
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full bg-black/30 border border-white/10 rounded-2xl px-4 py-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/30 transition-all font-bold text-sm"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-blue-100/40 ml-2">Loại hình</label>
                    <select
                      value={type}
                      onChange={(e) => setType(e.target.value)}
                      className="w-full bg-black/30 border border-white/10 rounded-2xl px-4 py-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/30 transition-all font-bold text-sm"
                    >
                      <option>Gia hạn</option>
                      <option>Cấp mới</option>
                      <option>Bảo hộ</option>
                      <option>Khác</option>
                    </select>
                  </div>
                </div>

                {message && (
                  <div className={`flex items-center gap-3 p-4 rounded-2xl text-xs font-bold animate-subtle-bounce ${message.startsWith('✓') ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20' : 'bg-red-500/10 text-red-500 border border-red-500/20'}`}>
                    {message.startsWith('✓') ? <CheckCircle2 className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
                    {message}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={uploading}
                  className="w-full bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-black uppercase tracking-widest py-5 rounded-2xl transition-all shadow-xl shadow-blue-600/20 active:scale-95"
                >
                  {uploading ? 'Processing...' : 'Upload Công văn'}
                </button>
              </form>
            ) : (
              <div className="space-y-8 text-center py-4">
                <div className="p-6 bg-blue-600/5 rounded-[2rem] border border-dashed border-blue-500/20">
                   <div className="w-16 h-16 bg-blue-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                     <Files className="w-8 h-8 text-blue-400" />
                   </div>
                   <h3 className="text-white font-bold mb-2">Upload Thư mục</h3>
                   <p className="text-xs text-gray-500 leading-relaxed mb-6">
                     Hệ thống tự động phân tích Mã CV, Ngày và Tên từ định dạng file PDF.
                   </p>
                   <label className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-xs transition-all cursor-pointer shadow-lg shadow-blue-600/20 active:scale-95">
                     <Upload className="w-4 h-4" />
                     Chọn tệp tin
                     <input type="file" multiple accept=".pdf" className="hidden" onChange={handleBulkUpload} disabled={uploading} />
                   </label>
                </div>
                
                <div className="flex items-start gap-4 p-4 bg-yellow-500/5 rounded-2xl border border-yellow-500/10 text-left">
                  <Info className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                  <p className="text-[10px] text-yellow-500/80 font-medium leading-relaxed">
                    <strong>Ghi chú:</strong> Tên file nên có định dạng [Số CV] [Ngày] [Tên].pdf để AI nhận diện tốt nhất.
                  </p>
                </div>
              </div>
            )}
          </section>
        </div>

        {/* Right: Table Section */}
        <div className="xl:col-span-8">
          <section className="bg-white/5 border border-white/10 glass-effect rounded-[2.5rem] p-8 lg:p-10 shadow-2xl overflow-hidden min-h-[600px]">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-10">
              <h2 className="text-xl font-black text-white flex items-center gap-3">
                <span className="p-2 bg-blue-500/10 rounded-xl text-blue-400"><FileText className="w-5 h-5" /></span>
                Dữ liệu Hiện tại
              </h2>
              
              <div className="relative group w-full sm:w-auto">
                <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-blue-400 transition-colors" />
                <input
                  type="text"
                  placeholder="Tìm kiếm mã hoặc tên..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full sm:w-72 bg-black/40 border border-white/10 rounded-2xl px-12 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500/30 transition-all font-medium"
                />
              </div>
            </div>

            <div className="relative rounded-[2rem] overflow-hidden border border-white/5 bg-black/20">
              <div className="overflow-x-auto custom-scrollbar">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-white/5 border-b border-white/10">
                      <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-blue-100/40">Mã CV</th>
                      <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-blue-100/40">Thương hiệu / Tên</th>
                      <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-blue-100/40">Dữ liệu Ngày</th>
                      <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-blue-100/40 text-center">Tác vụ</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {filteredDocs.length === 0 ? (
                      <tr>
                        <td colSpan={4} className="px-6 py-20 text-center">
                          <div className="text-4xl mb-4">🏜️</div>
                          <p className="text-gray-500 font-bold uppercase tracking-widest text-xs">Không có dữ liệu phù hợp</p>
                        </td>
                      </tr>
                    ) : (
                      filteredDocs.map((doc) => (
                        <tr key={doc.code} className="hover:bg-white/[0.03] transition-colors group/row">
                          <td className="px-6 py-5">
                            <span className="font-black text-blue-400 group-hover:text-yellow-400 transition-colors tracking-tight">{doc.code}</span>
                          </td>
                          <td className="px-6 py-5">
                            <div className="flex flex-col">
                              <span className="font-bold text-white tracking-tight">{doc.name}</span>
                              <span className="text-[10px] text-gray-500 font-medium uppercase tracking-tighter mt-1">{doc.type}</span>
                            </div>
                          </td>
                          <td className="px-6 py-5">
                            <span className="text-sm font-medium text-gray-400">{doc.date}</span>
                          </td>
                          <td className="px-6 py-5">
                            <div className="flex items-center justify-center gap-3">
                              <Link
                                href={`/documents/${doc.filename}`}
                                target="_blank"
                                className="p-2 rounded-xl bg-white/5 hover:bg-emerald-500/20 text-gray-400 hover:text-emerald-400 border border-transparent hover:border-emerald-500/20 transition-all"
                                title="Xem văn bản"
                              >
                                <Eye className="w-5 h-5" />
                              </Link>
                              <button
                                onClick={() => handleDelete(doc.code)}
                                className="p-2 rounded-xl bg-white/5 hover:bg-red-500/20 text-gray-400 hover:text-red-400 border border-transparent hover:border-red-500/20 transition-all"
                                title="Xóa"
                              >
                                <Trash2 className="w-5 h-5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
            
            <div className="mt-8 flex justify-between items-center px-4">
              <p className="text-[10px] font-bold text-gray-600 uppercase tracking-widest">
                Đang hiển thị {filteredDocs.length} / {documents.length} bản ghi
              </p>
              <div className="flex gap-2">
                 <button className="p-2 bg-white/5 border border-white/10 rounded-xl text-gray-500 hover:text-white transition-all"><Filter className="w-4 h-4" /></button>
                 <button className="p-2 bg-white/5 border border-white/10 rounded-xl text-gray-500 hover:text-white transition-all"><SearchIcon className="w-4 h-4" /></button>
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* Floating Back Link */}
      <div className="text-center pb-10">
        <Link href="/" className="inline-flex items-center gap-2 text-blue-400/40 hover:text-blue-400 font-black uppercase tracking-widest text-[10px] transition-all hover:gap-4">
          <span>←</span> Quay lại hệ thống chính
        </Link>
      </div>
    </div>
  );
}
