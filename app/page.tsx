'use client';

import { useRouter } from 'next/navigation';
import UserMenuButton from '@/components/UserMenuButton';
import ChatBot from '@/components/ChatBot';

export default function Home() {
  const router = useRouter();
  return (
    <div className="flex flex-col gap-8">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-900 to-blue-950 text-white p-8 rounded-lg shadow-lg border-b-4 border-yellow-500">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10 text-yellow-400">
                <path fillRule="evenodd" d="M12.516 2.17a.75.75 0 00-1.032 0 11.209 11.209 0 01-7.877 3.08.75.75 0 00-.722.515A12.74 12.74 0 002.25 9.75c0 5.942 4.064 10.933 9.563 12.348a.749.749 0 00.374 0c5.499-1.415 9.563-6.406 9.563-12.348 0-1.39-.223-2.73-.635-3.985a.75.75 0 00-.722-.516l-.143.001c-2.996 0-5.717-1.17-7.734-3.08zm3.094 8.016a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
              </svg>
              Sở hữu Trí tuệ Hải quan
            </h1>
            <p className="text-sm opacity-90 mt-2 italic">Tra cứu và tư vấn sở hữu trí tuệ</p>
          </div>
          <div className="flex gap-3">
            <UserMenuButton />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1">
        {/* Logo and Title */}
        <div className="text-center mb-12">
          <div className="inline-block mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-16 h-16 text-blue-900 mx-auto">
              <path d="M5.625 1.5c-1.036 0-1.875.84-1.875 1.875v17.25c0 1.035.84 1.875 1.875 1.875h12.75c1.035 0 1.875-.84 1.875-1.875V12.75A3.75 3.75 0 0016.5 9h-1.875a1.875 1.875 0 01-1.875-1.875V5.25A3.75 3.75 0 009 1.5H5.625z" />
              <path d="M12.971 1.816A5.23 5.23 0 0114.25 5.25v1.875c0 .207.168.375.375.375H16.5a5.23 5.23 0 013.434 1.279 9.768 9.768 0 00-6.963-6.963z" />
            </svg>
          </div>
          <h2 className="text-4xl font-bold text-gray-800 mb-2">Trợ lý AI Sở hữu Trí tuệ Hải quan</h2>
          <p className="text-gray-600 text-lg">Tôi có thể giúp bạn việc gì?</p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-2 gap-5 max-w-3xl mx-auto">
          {/* Card 1 - Lịch sử SHTT */}
          <div onClick={() => router.push('/lich-su-shtt')} className="bg-white border-l-4 border-yellow-500 rounded-xl p-6 shadow-sm hover:shadow-xl transition-all duration-200 cursor-pointer hover:bg-yellow-50 hover:scale-105 active:scale-100">
            <div className="text-4xl mb-3">📚</div>
            <h3 className="text-lg font-bold text-blue-900 mb-2">Lịch sử SHTT</h3>
            <p className="text-gray-600 text-[15px]">Tìm hiểu lịch sử phát triển của sở hữu trí tuệ</p>
          </div>

          {/* Card 2 - Văn bản Pháp luật */}
          <div onClick={() => router.push('/van-ban-phap-luat')} className="bg-white border-l-4 border-blue-600 rounded-xl p-6 shadow-sm hover:shadow-xl transition-all duration-200 cursor-pointer hover:bg-blue-50 hover:scale-105 active:scale-100">
            <div className="text-4xl mb-3">⚖️</div>
            <h3 className="text-lg font-bold text-blue-900 mb-2">Văn Bản Pháp Luật</h3>
            <p className="text-gray-600 text-[15px]">Xem các quy định và pháp luật liên quan</p>
          </div>

          {/* Card 3 - Tra cứu */}
          <div onClick={() => router.push('/tra-cuu')} className="bg-white border-l-4 border-indigo-600 rounded-xl p-6 shadow-sm hover:shadow-xl transition-all duration-200 cursor-pointer hover:bg-indigo-50 hover:scale-105 active:scale-100">
            <div className="text-4xl mb-3">🔎</div>
            <h3 className="text-lg font-bold text-blue-900 mb-2">Tra Cứu</h3>
            <p className="text-gray-600 text-[15px]">Tra cứu thông tin và dữ liệu sở hữu trí tuệ</p>
          </div>

          {/* Card 4 - Thống kê */}
          <div onClick={() => router.push('/thong-ke-shtt')} className="bg-white border-l-4 border-blue-500 rounded-xl p-6 shadow-sm hover:shadow-xl transition-all duration-200 cursor-pointer hover:bg-blue-50 hover:scale-105 active:scale-100">
            <div className="text-4xl mb-3">📊</div>
            <h3 className="text-lg font-bold text-blue-900 mb-2">Thống Kê SHTT</h3>
            <p className="text-gray-600 text-[15px]">Xem các con số và thống kê liên quan</p>
          </div>
        </div>
      </div>
      <ChatBot />
    </div>
  );
}
