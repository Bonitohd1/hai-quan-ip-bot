import './globals.css'
import Sidebar from '../components/Sidebar'
import { ReactNode } from "react";
import { AuthProvider } from './providers';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="vi">
      <head>
        <title>Sở hữu trí tuệ Hải quan - Trợ lý AI</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      </head>
      <body className="bg-gray-50">
        <AuthProvider>
          <div className="flex">
            <Sidebar />
            <main className="flex-1 min-h-screen p-4 pt-16 lg:p-8 lg:pt-8 overflow-y-auto transition-all duration-300">{children}</main>
          </div>
        </AuthProvider>
      </body>
    </html>
  )
}
