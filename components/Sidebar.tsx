'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter, usePathname } from 'next/navigation';
import { useState } from 'react';
import UserMenuButton from './UserMenuButton';

export default function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const menuItems = [
    { 
      id: 'home', 
      label: 'Trợ lý SHTT', 
      icon: '🤖', 
      href: '/' 
    },
    { 
      id: 'lich-su', 
      label: 'Lịch sử SHTT', 
      subtext: '3 trợ lý', 
      href: '/lich-su-shtt' 
    },
    { 
      id: 'van-ban', 
      label: 'Văn Bản Pháp Luật', 
      subtext: '3 trợ lý', 
      href: '/van-ban-phap-luat' 
    },
    { 
      id: 'tra-cuu', 
      label: 'Tra Cứu', 
      subtext: '3 trợ lý', 
      href: '/tra-cuu' 
    },
    { 
      id: 'thong-ke', 
      label: 'Thống Kê SHTT', 
      subtext: '2 trợ lý', 
      href: '#' 
    },
    { 
      id: 'quy-dinh', 
      label: 'Quy Định Pháp Luật', 
      subtext: '6 trợ lý', 
      href: '#' 
    },
  ];

  return (
    <>
      <aside className={`bg-gradient-to-b from-blue-900 to-blue-950 text-white h-screen p-4 border-r-4 border-yellow-500 overflow-y-auto fixed left-0 top-0 transition-all duration-300 ease-in-out z-40 ${
        isCollapsed ? 'w-20' : 'w-56'
      }`}>
        {/* Toggle Button */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="absolute -right-3 top-6 w-6 h-6 bg-yellow-500 hover:bg-yellow-400 rounded-full flex items-center justify-center shadow-lg transition-all duration-200 hover:scale-110 z-50"
          aria-label={isCollapsed ? 'Mở sidebar' : 'Đóng sidebar'}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2.5}
            stroke="currentColor"
            className={`w-4 h-4 text-blue-950 transition-transform duration-300 ${
              isCollapsed ? 'rotate-180' : ''
            }`}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </button>

        {/* Logo */}
        <div className={`mb-8 pb-6 border-b-2 border-yellow-500 text-center transition-all duration-300 ${
          isCollapsed ? 'opacity-0 h-0 overflow-hidden' : 'opacity-100'
        }`}>
        <div className="flex justify-center mb-3">
          <Image 
            src="/logoHQdaxoanen.png" 
            alt="Logo Hải Quan Việt Nam" 
            width={80} 
            height={80}
            className="rounded-full"
          />
        </div>
        <h2 className="font-bold text-lg text-yellow-400">
          SHTT Hải Quan
        </h2>
        <p className="text-xs text-blue-200 mt-2">Sở hữu trí tuệ Hải quan</p>
      </div>

      {/* Navigation */}
      <nav className="space-y-3">
        {menuItems.map((item, idx) => {
          const isActive = pathname === item.href;
          const icons = ['🤖', '📚', '⚖️', '🔍', '📊', '📋'];
          return (
            <button
              key={item.id}
              onClick={() => router.push(item.href)}
              title={isCollapsed ? item.label : ''}
              className={`group w-full text-left rounded-lg font-semibold transition-all duration-300 ease-out relative overflow-hidden ${
                isCollapsed ? 'p-3 flex justify-center' : 'p-4'
              } ${
                isActive 
                  ? 'bg-gradient-to-r from-yellow-500/20 to-yellow-600/10 border-l-4 border-yellow-400 text-white shadow-lg shadow-yellow-500/20 scale-[1.02]' 
                  : 'bg-white/5 hover:bg-gradient-to-r hover:from-blue-500/20 hover:to-blue-600/10 text-blue-100 hover:text-white border-l-4 border-transparent hover:border-blue-400/50 hover:shadow-md hover:scale-[1.02]'
              } active:scale-95`}
            >
              {!isActive && (
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out" />
              )}
              <div className="relative z-10">
                {isCollapsed ? (
                  <div className="text-2xl flex items-center justify-center">
                    {icons[idx]}
                  </div>
                ) : (
                  <>
                    <div className="text-[15px] flex items-center gap-2">
                      <span>{icons[idx]}</span>
                      {item.label}
                      {isActive && <span className="text-yellow-300 animate-pulse">✦</span>}
                    </div>
                    {item.subtext && <div className="text-xs opacity-75 mt-1 ml-6">{item.subtext}</div>}
                  </>
                )}
              </div>
            </button>
          );
        })}
      </nav>
      </aside>

      {/* Spacer div to push content */}
      <div className={`transition-all duration-300 ${
        isCollapsed ? 'w-20' : 'w-56'
      }`} />
    </>
  );
}
