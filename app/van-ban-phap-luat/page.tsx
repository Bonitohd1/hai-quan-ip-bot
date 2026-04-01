'use client';

import React from 'react';
import Link from 'next/link';
import { FileText, Download, Scale } from 'lucide-react';
import ChatBot from '@/components/ChatBot';

const STATS = [
  { label: 'Tổng số văn bản', value: '127', color: 'bg-blue-500' },
  { label: 'Luật', value: '8', color: 'bg-yellow-500' },
  { label: 'Thông tư', value: '42', color: 'bg-green-500' },
  { label: 'Hiệp định quốc tế', value: '12', color: 'bg-purple-500' },
];

const DOCUMENTS = [
  {
    id: 1,
    title: 'Luật Sở hữu Trí tuệ năm 2005',
    type: 'Luật',
    year: '2005',
    description: 'Quy định về quyền tác giả, quyền liên quan, sáng chế và mẫu dáng công nghiệp'
  },
  {
    id: 2,
    title: 'Thông tư 12/2014/TT-BKHCN',
    type: 'Thông tư',
    year: '2014',
    description: 'Hướng dẫn thủ tục xin cấp giấy chứng chỉ sáng chế'
  },
  {
    id: 3,
    title: 'Quyết định 59/2013/QĐ-TTg',
    type: 'Quyết định',
    year: '2013',
    description: 'Phê duyệt chiến lược phát triển sở hữu trí tuệ'
  },
  {
    id: 4,
    title: 'Nghị định 82/2014/NĐ-CP',
    type: 'Nghị định',
    year: '2014',
    description: 'Sửa đổi bổ sung một số điều của Nghị định liên quan sở hữu trí tuệ'
  }
];

export default function VanBanPhapLuat() {
  return (
    <div className="flex flex-col gap-8 pb-20 px-4 lg:px-0 bg-[#f8fafc] min-h-screen font-sans">
      
      {/* Header Section */}
      <header className="bg-[#1a2b56] text-white p-10 rounded-xl shadow-2xl relative overflow-hidden mt-4">
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-2">
            <Scale className="w-7 h-7 text-[#facc15]" />
            <h1 className="text-2xl font-black tracking-tight uppercase">Văn Bản Pháp Luật</h1>
          </div>
          <p className="text-blue-200/80 font-bold text-sm tracking-tight">Tập hợp các quy định và văn bản pháp luật về sở hữu trí tuệ</p>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-400/5 blur-[80px] rounded-full translate-x-1/2 -translate-y-1/2" />
      </header>

      {/* Statistics Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {STATS.map((stat, i) => (
          <div key={i} className={`${stat.color} rounded-2xl p-6 text-white shadow-lg transition-transform hover:scale-[1.02] cursor-default`}>
            <p className="text-[10px] font-black uppercase tracking-widest opacity-80 mb-2">{stat.label}</p>
            <p className="text-4xl font-black">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Documents List */}
      <div className="flex flex-col gap-6 mt-4">
        {DOCUMENTS.map((doc) => (
          <article key={doc.id} className="bg-white p-10 rounded-2xl shadow-md border-l-[6px] border-[#1a2b56] hover:shadow-xl transition-all duration-300 group">
            <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 mb-8">
              <div className="flex-1">
                <h3 className="text-xl font-black text-[#1a2b56] mb-3 group-hover:text-blue-700 transition-colors">{doc.title}</h3>
                <p className="text-slate-500 font-bold opacity-70 text-sm leading-relaxed max-w-3xl">{doc.description}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="bg-blue-50 text-blue-700 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest">{doc.type}</span>
                <span className="bg-yellow-50 text-yellow-700 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest">{doc.year}</span>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-4">
               <button className="bg-[#1a2b56] text-white px-8 py-3.5 rounded-xl text-[10px] font-black hover:bg-blue-950 transition-all shadow-xl shadow-blue-900/20 flex items-center gap-2 uppercase tracking-widest active:scale-95">
                 <FileText size={14} />
                 Xem chi tiết
               </button>
               <button className="border-2 border-[#1a2b56] text-[#1a2b56] px-8 py-3.5 rounded-xl text-[10px] font-black hover:bg-blue-50 transition-all flex items-center gap-2 uppercase tracking-widest active:scale-95">
                 <Download size={14} />
                 Tải xuống
               </button>
            </div>
          </article>
        ))}
      </div>

      {/* Footnote Link */}
      <div className="px-1 mt-4">
        <Link href="/" className="text-slate-400 hover:text-[#1a2b56] text-sm font-black transition-all flex items-center gap-2 group">
          <span className="text-xl transition-transform group-hover:-translate-x-1">←</span>
          Quay lại trang chính
        </Link>
      </div>

      <ChatBot />
    </div>
  );
}
