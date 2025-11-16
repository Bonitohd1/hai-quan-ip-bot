import './globals.css'
import Sidebar from '../components/Sidebar'
import { ReactNode } from "react";
import { AuthProvider } from './providers';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="vi">
      <head>
        <title>Sở hữu trí tuệ Hải quan - Trợ lý AI</title>
      </head>
      <body className="bg-gray-50">
        <AuthProvider>
          <div className="flex">
            <Sidebar />
            <main className="flex-1 min-h-screen p-8 overflow-y-auto transition-all duration-300">{children}</main>
          </div>
        </AuthProvider>
      </body>
    </html>
  )
}
