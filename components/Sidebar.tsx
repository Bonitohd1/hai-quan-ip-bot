'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter, usePathname } from 'next/navigation';
import UserMenuButton from './UserMenuButton';

export default function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();

  const menuItems = [
    { 
      id: 'home', 
      label: 'Trợ lý SHTT', 
      icon: '🤖', 
      color: 'bg-blue-700 hover:bg-blue-800', 
      href: '/' 
    },
    { 
      id: 'lich-su', 
      label: 'Lịch sử SHTT', 
      subtext: '3 trợ lý', 
      color: 'bg-yellow-600 hover:bg-yellow-700', 
      href: '/lich-su-shtt' 
    },
    { 
      id: 'van-ban', 
      label: 'Văn Bản Pháp Luật', 
      subtext: '3 trợ lý', 
      color: 'bg-blue-600 hover:bg-blue-700', 
      href: '/van-ban-phap-luat' 
    },
    { 
      id: 'tra-cuu', 
      label: 'Tra Cứu', 
      subtext: '3 trợ lý', 
      color: 'bg-indigo-600 hover:bg-indigo-700', 
      href: '/tra-cuu' 
    },
    { 
      id: 'thong-ke', 
      label: 'Thống Kê SHTT', 
      subtext: '2 trợ lý', 
      color: 'bg-blue-500 hover:bg-blue-600', 
      href: '#' 
    },
    { 
      id: 'quy-dinh', 
      label: 'Quy Định Pháp Luật', 
      subtext: '6 trợ lý', 
      color: 'bg-slate-600 hover:bg-slate-700', 
      href: '#' 
    },
  ];

  return (
    <aside className="w-56 bg-gradient-to-b from-blue-900 to-blue-950 text-white h-screen p-4 border-r-4 border-yellow-500 overflow-y-auto fixed left-0 top-0">
      {/* Logo */}
      <div className="mb-8 pb-6 border-b-2 border-yellow-500 text-center">
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
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => router.push(item.href)}
            className={`w-full text-left p-4 rounded-lg text-white font-semibold transition-all ${item.color} active:scale-95`}
          >
            <div className="text-sm">{item.label}</div>
            {item.subtext && <div className="text-xs opacity-80 mt-1">{item.subtext}</div>}
          </button>
        ))}
      </nav>
    </aside>
  );
}
