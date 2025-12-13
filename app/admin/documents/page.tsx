'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Document {
  id: string;
  code: string;
  date: string;
  name: string;
  filename: string;
  type: string;
  description: string;
}

export default function AdminDocuments() {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [type, setType] = useState('Gia hạn');
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    loadDocuments();
  }, []);

  const loadDocuments = async () => {
    try {
      const res = await fetch('/api/documents');
      const data = await res.json();
      setDocuments(data.documents || []);
    } catch (error) {
      console.error('Error loading documents:', error);
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !name.trim()) {
      setMessage('Vui lòng chọn file và nhập tên');
      return;
    }

    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('name', name);
    formData.append('date', date || new Date().toLocaleDateString('vi-VN'));
    formData.append('type', type);

    try {
      const res = await fetch('/api/documents', {
        method: 'POST',
        body: formData,
      });

      if (res.ok) {
        setMessage('✓ Upload thành công');
        setFile(null);
        setName('');
        setDate('');
        setType('Gia hạn');
        setTimeout(() => {
          loadDocuments();
          setMessage('');
        }, 1000);
      } else {
        const error = await res.json();
        setMessage(`✗ Lỗi: ${error.error}`);
      }
    } catch (error) {
      setMessage('✗ Lỗi upload');
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (code: string) => {
    if (!confirm('Xác nhận xóa công văn này?')) return;

    try {
      const res = await fetch('/api/documents', {
        method: 'DELETE',
        body: JSON.stringify({ code }),
      });

      if (res.ok) {
        setMessage('✓ Xóa thành công');
        setTimeout(() => {
          loadDocuments();
          setMessage('');
        }, 1000);
      }
    } catch (error) {
      setMessage('✗ Lỗi xóa');
    }
  };

  return (
    <div className="flex flex-col gap-8 max-w-6xl mx-auto">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-900 to-blue-950 text-white p-5 lg:p-8 rounded-lg shadow-lg border-b-4 border-yellow-500">
        <h1 className="text-2xl lg:text-3xl font-bold">⚙️ Admin: Quản lý Công văn</h1>
        <p className="text-sm opacity-90 mt-2">Upload và quản lý danh sách công văn</p>
      </header>

      {/* Upload Form */}
      <div className="bg-white p-5 lg:p-8 rounded-xl shadow-lg border-l-4 border-blue-900">
        <h2 className="text-lg lg:text-xl font-bold text-gray-800 mb-5 lg:mb-6">📤 Thêm Công văn Mới</h2>

        <form onSubmit={handleUpload} className="space-y-4 lg:space-y-5">
          {/* File Input */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2 text-sm lg:text-base">Chọn File PDF:</label>
            <input
              type="file"
              accept=".pdf"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-900 text-sm"
            />
            {file && <p className="text-sm text-green-600 mt-1">✓ {file.name}</p>}
          </div>

          {/* Name Input */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2 text-sm lg:text-base">Tên Sản phẩm / Thương hiệu:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ví dụ: Hermes, MICRO SD HC, Nike..."
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-900 text-sm"
            />
          </div>

          {/* Date Input */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2 text-sm lg:text-base">Ngày (tuỳ chọn):</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-900 text-sm"
            />
          </div>

          {/* Type Select */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2 text-sm lg:text-base">Loại Công văn:</label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-900 text-sm"
            >
              <option>Gia hạn</option>
              <option>Cấp mới</option>
              <option>Bảo hộ</option>
              <option>Vi phạm</option>
              <option>Khác</option>
            </select>
          </div>

          {/* Message */}
          {message && (
            <div className={`p-3 rounded-lg text-sm font-semibold ${message.startsWith('✓') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
              {message}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={uploading}
            className="w-full bg-blue-900 hover:bg-blue-950 disabled:opacity-60 text-white px-6 py-3 rounded-lg font-semibold border-2 border-yellow-500 transition active:scale-95 text-sm lg:text-base"
          >
            {uploading ? '⏳ Đang upload...' : '📤 Upload Công văn'}
          </button>
        </form>
      </div>

      {/* Documents List */}
      <div className="bg-white p-5 lg:p-8 rounded-xl shadow-lg">
        <h2 className="text-lg lg:text-xl font-bold text-gray-800 mb-4 lg:mb-6">📋 Danh sách Công văn ({documents.length})</h2>

        {documents.length === 0 ? (
          <p className="text-gray-600 text-center py-8">Chưa có công văn nào. Hãy thêm công văn đầu tiên.</p>
        ) : (
          <div className="space-y-3 lg:space-y-4 overflow-x-auto">
            <table className="w-full text-sm lg:text-base">
              <thead>
                <tr className="bg-gray-100 border-b-2 border-gray-300">
                  <th className="px-3 lg:px-4 py-2 lg:py-3 text-left font-semibold">Mã CV</th>
                  <th className="px-3 lg:px-4 py-2 lg:py-3 text-left font-semibold">Tên</th>
                  <th className="px-3 lg:px-4 py-2 lg:py-3 text-left font-semibold">Ngày</th>
                  <th className="px-3 lg:px-4 py-2 lg:py-3 text-left font-semibold">Loại</th>
                  <th className="px-3 lg:px-4 py-2 lg:py-3 text-center font-semibold">Hành động</th>
                </tr>
              </thead>
              <tbody>
                {documents.map((doc) => (
                  <tr key={doc.code} className="border-b hover:bg-gray-50">
                    <td className="px-3 lg:px-4 py-2 lg:py-3 font-bold text-blue-900">{doc.code}</td>
                    <td className="px-3 lg:px-4 py-2 lg:py-3">{doc.name}</td>
                    <td className="px-3 lg:px-4 py-2 lg:py-3 text-gray-600">{doc.date}</td>
                    <td className="px-3 lg:px-4 py-2 lg:py-3">
                      <span className="bg-blue-100 text-blue-900 px-2 lg:px-3 py-1 rounded-full text-xs lg:text-sm font-semibold">
                        {doc.type}
                      </span>
                    </td>
                    <td className="px-3 lg:px-4 py-2 lg:py-3 text-center">
                      <div className="flex gap-2 justify-center flex-wrap">
                        <a
                          href={`/documents/${doc.filename}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-green-600 hover:bg-green-700 text-white px-2 lg:px-3 py-1.5 rounded text-xs lg:text-sm font-semibold transition"
                        >
                          👁️ Xem
                        </a>
                        <button
                          onClick={() => handleDelete(doc.code)}
                          className="bg-red-600 hover:bg-red-700 text-white px-2 lg:px-3 py-1.5 rounded text-xs lg:text-sm font-semibold transition"
                        >
                          🗑️ Xóa
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Back Link */}
      <Link href="/" className="text-blue-600 hover:underline text-sm lg:text-base">
        ← Quay lại trang chính
      </Link>
    </div>
  );
}
