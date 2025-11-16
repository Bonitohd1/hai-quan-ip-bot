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
          <Sidebar />
          <main className="ml-56 min-h-screen p-8 overflow-y-auto">{children}</main>
        </AuthProvider>
      </body>
    </html>
  )
}
