'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, FileText, Package, AlertTriangle } from 'lucide-react';
import ChatBot from '@/components/ChatBot';

interface Document {
  id: string;
  code: string;
  date: string;
  name: string;
  filename: string;
  type: string;
  description: string;
}

export default function TraCuuPage() {
  const [activeType, setActiveType] = useState('cong-van');
  const [searchQuery, setSearchQuery] = useState('');
  const [documents, setDocuments] = useState<Document[]>([]);
  const [results, setResults] = useState<Document[]>([]);
  const [searched, setSearched] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadDocuments();
  }, []);

  const loadDocuments = async () => {
    try {
      const res = await fetch('/api/documents');
      const data = await res.json();
      setDocuments(data.documents || []);
    } catch (error) {
      console.error('Error loading documents:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = () => {
    if (!searchQuery.trim()) {
      setResults([]);
      setSearched(false);
      return;
    }
    const filtered = documents.filter(doc => 
      doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.code.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setResults(filtered);
    setSearched(true);
  };

  const statCards = [
    { id: 'cong-van', label: 'Tổng công văn', count: documents.length, color: 'bg-blue-500' },
    { id: 'gia-han', label: 'Gia hạn', count: documents.filter(d => d.type.toLowerCase().includes('gia hạn')).length, color: 'bg-green-500' },
    { id: 'cap-moi', label: 'Cấp mới', count: documents.filter(d => d.type.includes('SHTT') || d.type.includes('Cấp')).length, color: 'bg-yellow-500' },
    { id: 'khac', label: 'Khác', count: documents.filter(d => !d.type.includes('Gia hạn') && !d.type.includes('SHTT')).length, color: 'bg-purple-500' },
  ];

  const searchTypes = [
    { id: 'cong-van', label: 'Công văn', icon: FileText },
    { id: 'san-pham', label: 'Sản phẩm', icon: Package },
    { id: 'vi-pham', label: 'Vi phạm', icon: AlertTriangle },
  ];

  return (
    <div className="flex flex-col gap-8 pb-20 px-4 lg:px-0 bg-[#f8fafc] min-h-screen font-sans">
      
      {/* Search Page Header */}
      <header className="bg-[#1a2b56] text-white p-10 rounded-xl shadow-2xl relative overflow-hidden mt-4">
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-2">
            <Search className="w-7 h-7 text-[#facc15]" />
            <h1 className="text-2xl font-black tracking-tight uppercase">Tra Cứu Sở hữu Trí tuệ</h1>
          </div>
          <p className="text-blue-200/80 font-bold text-sm tracking-tight">Tìm kiếm thông tin về sản phẩm, nhà sản xuất và các vi phạm SHTT</p>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-400/5 blur-[80px] rounded-full translate-x-1/2 -translate-y-1/2" />
      </header>

      {/* Main Container */}
      <main className="mx-auto max-w-5xl w-full">
        {/* Search Dashboard Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-10">
          <h2 className="text-xl font-black text-slate-800 mb-8 px-1">Tìm kiếm</h2>

          {/* Statistics Row */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
            {statCards.map((stat) => (
              <div key={stat.id} className={`${stat.color} rounded-2xl p-6 text-white shadow-lg transition-transform hover:scale-[1.02] cursor-default`}>
                <p className="text-[10px] font-black uppercase tracking-widest opacity-80 mb-2">{stat.label}</p>
                <p className="text-4xl font-black">{stat.count}</p>
              </div>
            ))}
          </div>

          {/* Search Type Selector */}
          <div className="space-y-4 mb-8">
            <label className="text-xs font-black text-slate-800 uppercase tracking-widest px-1">Loại tra cứu:</label>
            <div className="flex flex-wrap gap-2">
              {searchTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => setActiveType(type.id)}
                  className={`flex items-center gap-2 px-8 py-3.5 rounded-xl font-black text-xs transition-all ${
                    activeType === type.id 
                      ? 'bg-[#1a2b56] text-white shadow-lg shadow-blue-900/20' 
                      : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                  }`}
                >
                  <type.icon size={16} />
                  {type.label}
                </button>
              ))}
            </div>
          </div>

          {/* Main Search Input Section */}
          <div className="space-y-4 mb-8">
            <label className="text-xs font-black text-slate-800 uppercase tracking-widest px-1">Nhập từ khóa:</label>
            <div className="flex flex-col md:flex-row gap-3">
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                placeholder="Ví dụ: Áo thun, Nike..."
                className="flex-1 bg-white border-2 border-slate-100 rounded-xl px-6 py-4 font-bold text-slate-700 placeholder:text-slate-300 focus:outline-none focus:border-slate-200 focus:shadow-inner transition-all shadow-sm"
              />
              <button 
                onClick={handleSearch}
                className="bg-[#1a2b56] hover:bg-blue-900 border-2 border-[#facc15] text-white px-8 py-4 rounded-xl font-black text-xs flex items-center justify-center gap-2 transition-all shadow-xl shadow-blue-900/20 active:scale-95 group"
              >
                <Search className="w-4 h-4 text-[#facc15] group-hover:scale-110 transition-transform" />
                Tra cứu
              </button>
            </div>
          </div>

          {/* Filter Selection Section */}
          <div className="space-y-4">
            <label className="text-xs font-black text-slate-800 uppercase tracking-widest px-1">Bộ lọc:</label>
            <div className="flex flex-wrap gap-3">
              {['Tất cả', 'Hàng giả', 'Sản phẩm xác thực', 'Chưa rõ'].map((filter) => (
                <button 
                  key={filter}
                  className="bg-white border-2 border-slate-100 px-5 py-2.5 rounded-lg text-[10px] font-black text-slate-600 hover:border-slate-200 hover:bg-slate-50 transition-all shadow-sm"
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results Area */}
        {searched && (
          <div className="mt-12 animate-in fade-in slide-in-from-bottom-8 duration-700">
            <h3 className="text-2xl font-black text-slate-900 flex items-center gap-3 mb-8 px-1">
              Kết quả tìm kiếm
              <span className="text-sm font-bold bg-blue-100 text-[#1a2b56] px-4 py-1.5 rounded-full">{results.length}</span>
            </h3>

            {results.length === 0 ? (
              <div className="bg-white border border-slate-100 rounded-2xl p-24 text-center shadow-lg">
                <div className="text-7xl mb-8">🏜️</div>
                <h4 className="text-2xl font-black text-slate-800 mb-3">Không tìm thấy dữ liệu</h4>
                <p className="text-slate-500 text-lg font-bold">Vui lòng thử từ khóa khác hoặc kiểm tra lại phạm vi tra cứu</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6">
                {results.map((doc) => (
                  <article key={doc.id} className="bg-white border border-slate-100 rounded-2xl p-8 shadow-md flex flex-col md:flex-row justify-between items-start md:items-center gap-8 hover:shadow-2xl transition-all duration-300 border-l-[8px] border-blue-500">
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-3 mb-4">
                        <span className="bg-[#1a2b56] text-white px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest">{doc.code}</span>
                        <span className="bg-blue-50 text-blue-700 px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest">{doc.type}</span>
                      </div>
                      <h4 className="font-black text-slate-900 text-2xl mb-3 leading-tight">{doc.name}</h4>
                      <p className="text-slate-500 leading-relaxed font-bold opacity-70 text-sm line-clamp-2">{doc.description}</p>
                    </div>
                    <div className="flex gap-4 w-full md:w-auto">
                      <a href={`/documents/${doc.filename}`} target="_blank" className="flex-1 md:flex-none text-center px-8 py-4 bg-slate-100 text-slate-700 rounded-xl text-[10px] font-black hover:bg-slate-200 transition-all uppercase tracking-widest">Xem File</a>
                      <a href={`/documents/${doc.filename}`} download className="flex-1 md:flex-none text-center px-8 py-4 bg-[#1a2b56] text-white rounded-xl text-[10px] font-black hover:bg-blue-900 transition-all shadow-xl shadow-blue-900/20 uppercase tracking-widest">Tải PDF</a>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Footnote Link */}
        <div className="px-1 mt-12 mb-10">
          <Link href="/" className="text-slate-400 hover:text-[#1a2b56] text-sm font-black transition-all flex items-center gap-2 group">
            <span className="text-xl transition-transform group-hover:-translate-x-1">←</span>
            Quay lại trang chính
          </Link>
        </div>
      </main>

      <ChatBot />
    </div>
  );
}
