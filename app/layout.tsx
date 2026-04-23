import './globals.css'
import { ReactNode } from "react";
import { AuthProvider } from './providers';
import { Montserrat } from 'next/font/google';
import AppLayoutWrapper from '../components/AppLayoutWrapper';

const montserrat = Montserrat({ 
  subsets: ['latin', 'vietnamese'],
  display: 'swap',
  variable: '--font-sans',
});

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="vi" className={`${montserrat.variable} selection:bg-blue-200 selection:text-blue-900`}>
      <head>
        <title>Hải Quan SHTT — Hệ thống quản lý chuyên ngành</title>
        <meta name="description" content="Hệ thống quản trị và tra cứu Sở hữu trí tuệ Hải quan Việt Nam" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
      </head>
      <body className="antialiased min-h-screen flex bg-slate-50 text-slate-900 font-sans">
        <AuthProvider>
          <AppLayoutWrapper>
             {children}
          </AppLayoutWrapper>
        </AuthProvider>
      </body>
    </html>
  )
}
