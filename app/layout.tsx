import './globals.css'
import Sidebar from '../components/Sidebar'
import { ReactNode } from "react";
import { AuthProvider } from './providers';
import { Inter } from 'next/font/google';

const inter = Inter({ 
  subsets: ['latin', 'vietnamese'],
  display: 'swap',
  variable: '--font-inter',
});

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="vi" className={`${inter.variable}`}>
      <head>
        <title>Hải Quan SHTT - Trợ lý AI Thông Minh</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <style>{`
          * { -webkit-tap-highlight-color: transparent; }
          input, textarea, select { font-size: 16px !important; }
          body { -webkit-text-size-adjust: 100%; text-size-adjust: 100%; }
        `}</style>
      </head>
      <body className="bg-[#f8fafc] text-slate-900 antialiased selection:bg-blue-600/10">
        <AuthProvider>
          <div className="flex min-h-screen relative overflow-hidden">
            {/* Ambient Background Accents */}
            <div className="fixed inset-0 pointer-events-none -z-10">
              <div className="absolute top-0 right-[-10%] w-[50%] h-[50%] bg-blue-100/30 blur-[130px] rounded-full" />
              <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-100/20 blur-[120px] rounded-full" />
            </div>

            <Sidebar />
            <main className="flex-1 min-h-screen relative z-10 transition-all duration-500 ease-in-out">
              <div className="p-4 pt-24 lg:p-10 lg:pt-10 max-w-7xl mx-auto">
                {children}
              </div>
            </main>
          </div>
        </AuthProvider>
      </body>
    </html>
  )
}
