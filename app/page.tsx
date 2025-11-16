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
              <span className="text-4xl">⚓</span>
              Sở hữu Trí tuệ Hải quan
            </h1>
            <p className="text-sm opacity-90 mt-2">Hỗ trợ tư vấn và tra cứu thông tin sở hữu trí tuệ trong hoạt động hải quan</p>
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
          <div className="inline-block mb-6 text-6xl">🔍</div>
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
