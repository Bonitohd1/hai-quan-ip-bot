'use client';

import React from 'react';
import Link from 'next/link';
import { BookOpen, GraduationCap } from 'lucide-react';
import ChatBot from '@/components/ChatBot';

const STATS = [
  { label: 'Năm thành lập', value: '1965', color: 'bg-blue-500' },
  { label: 'Số công ty đăng ký', value: '15,240', color: 'bg-green-500' },
  { label: 'Số bằng độc quyền', value: '8,540', color: 'bg-yellow-500' },
  { label: 'Số nhãn hiệu', value: '12,890', color: 'bg-purple-500' },
];

const HISTORY_TIMELINE = [
  {
    year: '2010',
    title: 'Khởi đầu',
    description: 'Thiết lập khung pháp lý cơ bản cho sở hữu trí tuệ trong hải quan'
  },
  {
    year: '2015',
    title: 'Phát triển',
    description: 'Mở rộng các quy định và nâng cao nhận thức về SHTT'
  },
  {
    year: '2020',
    title: 'Hiện đại hóa',
    description: 'Ứng dụng công nghệ và hệ thống điện tử để quản lý SHTT'
  },
  {
    year: '2024',
    title: 'Hoàn thiện',
    description: 'Nâng cao hiệu quả kiểm soát và bảo vệ sở hữu trí tuệ tại cực'
  }
];

export default function LichSuSHTT() {
  return (
    <div className="flex flex-col gap-8 pb-20 px-4 lg:px-0 bg-[#f8fafc] min-h-screen font-sans">
      
      {/* Header Section */}
      <header className="bg-[#1a2b56] text-white p-10 rounded-xl shadow-2xl relative overflow-hidden mt-4">
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-3xl">📚</span>
            <h1 className="text-2xl font-black tracking-tight uppercase">Lịch sử Sở hữu Trí tuệ Hải quan</h1>
          </div>
          <p className="text-blue-200/80 font-bold text-sm tracking-tight">Khám phá quá trình phát triển của SHTT qua các giai đoạn</p>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-400/5 blur-[80px] rounded-full translate-x-1/2 -translate-y-1/2" />
      </header>

      {/* Stats row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {STATS.map((stat, i) => (
          <div key={i} className={`${stat.color} rounded-2xl p-6 text-white shadow-lg transition-all hover:scale-[1.02] cursor-default`}>
            <p className="text-[10px] font-black uppercase tracking-widest opacity-80 mb-2">{stat.label}</p>
            <p className="text-4xl font-black">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Timeline Section */}
      <div className="relative pl-10 lg:pl-16 mt-4">
        {/* Main Vertical line */}
        <div className="absolute left-4 lg:left-8 top-0 bottom-0 w-1 bg-yellow-500/20" />

        <div className="space-y-6">
          {HISTORY_TIMELINE.map((item, index) => (
            <div key={index} className="relative">
              {/* Timeline Dot */}
              <div className="absolute -left-6 lg:-left-8 top-1/2 -translate-y-1/2 transform w-2 h-2 bg-yellow-500 rounded-full shadow-[0_0_10px_#facc15]" />
              
              {/* Timeline Card */}
              <div className="bg-white p-8 rounded-2xl shadow-md border-l-[6px] border-yellow-500 hover:shadow-xl transition-all duration-300 group flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-black text-[#1a2b56] mb-2">{item.title}</h3>
                  <p className="text-slate-500 font-bold opacity-70 text-sm leading-relaxed max-w-2xl">{item.description}</p>
                </div>
                <div className="bg-[#1a2b56] text-[#facc15] px-4 py-1.5 rounded-full text-xs font-black shadow-lg">
                  {item.year}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <div className="bg-white p-8 rounded-2xl shadow-md border-l-[6px] border-blue-500 hover:shadow-xl transition-all group flex items-start gap-4">
          <div className="p-3 bg-blue-50 rounded-xl text-blue-600 transition-transform group-hover:scale-110">
            <BookOpen size={24} />
          </div>
          <div>
            <h3 className="font-black text-[#1a2b56] mb-1 text-base">Tài liệu tham khảo</h3>
            <p className="text-slate-500 font-bold opacity-70 text-sm">Xem thêm các tài liệu và nghiên cứu về lịch sử SHTT</p>
          </div>
        </div>
        <div className="bg-white p-8 rounded-2xl shadow-md border-l-[6px] border-yellow-500 hover:shadow-xl transition-all group flex items-start gap-4">
          <div className="p-3 bg-yellow-50 rounded-xl text-yellow-600 transition-transform group-hover:scale-110">
            <GraduationCap size={24} />
          </div>
          <div>
            <h3 className="font-black text-[#1a2b56] mb-1 text-base">Học tập</h3>
            <p className="text-slate-500 font-bold opacity-70 text-sm">Các bài giảng và khóa học về lịch sử SHTT</p>
          </div>
        </div>
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
