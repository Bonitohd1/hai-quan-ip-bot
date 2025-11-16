'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function TraCuu() {
  const [searchType, setSearchType] = useState('san-pham');
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [searched, setSearched] = useState(false);

  const stats = [
    { label: 'Tổng kết quả', value: '52,340', color: 'bg-blue-500' },
    { label: 'Sản phẩm xác thực', value: '48,200', color: 'bg-green-500' },
    { label: 'Hàng giả phát hiện', value: '3,540', color: 'bg-red-500' },
    { label: 'Chưa xác định', value: '600', color: 'bg-yellow-500' },
  ];

  const handleSearch = () => {
    if (!searchQuery.trim()) return;
    
    // Mock results
    const mockResults = [
      {
        id: 1,
        name: 'Sản phẩm: ' + searchQuery,
        type: 'Hàng hóa',
        status: 'Có hàng giả',
        description: 'Đã phát hiện vi phạm sở hữu trí tuệ'
      },
      {
        id: 2,
        name: 'Nhà sản xuất: ' + searchQuery,
        type: 'Nhà sản xuất',
        status: 'Bình thường',
        description: 'Không phát hiện vi phạm'
      }
    ];
    
    setResults(mockResults);
    setSearched(true);
  };

  return (
    <div className="flex flex-col gap-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-900 to-blue-950 text-white p-8 rounded-lg shadow-lg border-b-4 border-yellow-500">
        <h1 className="text-3xl font-bold">🔎 Tra Cứu Sở hữu Trí tuệ</h1>
        <p className="text-sm opacity-90 mt-2">Tìm kiếm thông tin về sản phẩm, nhà sản xuất và các vi phạm SHTT</p>
      </div>

      {/* Search Section */}
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-4xl">
        <h2 className="text-xl font-bold text-gray-800 mb-6">Tìm kiếm</h2>
        
        {/* Statistics */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          {stats.map((stat, i) => (
            <div key={i} className={`${stat.color} text-white rounded-lg p-6 shadow-md`}>
              <p className="text-sm opacity-90 mb-2">{stat.label}</p>
              <p className="text-3xl font-bold">{stat.value}</p>
            </div>
          ))}
        </div>
        
        {/* Search Type */}
        <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-3">Loại tra cứu:</label>
          <div className="grid grid-cols-3 gap-4">
            {[
              { value: 'san-pham', label: '📦 Sản phẩm' },
              { value: 'nha-san-xuat', label: '🏭 Nhà sản xuất' },
              { value: 'vi-pham', label: '⚠️ Vi phạm' }
            ].map(option => (
              <button
                key={option.value}
                onClick={() => setSearchType(option.value)}
                className={`p-4 rounded-lg font-semibold transition ${
                  searchType === option.value
                    ? 'bg-blue-900 text-yellow-400'
                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {/* Search Input */}
        <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-3">Nhập từ khóa:</label>
          <div className="flex gap-3">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              placeholder="Ví dụ: Áo thun, Nike, sản phẩm giả..."
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-teal-500"
            />
            <button
              onClick={handleSearch}
              className="bg-blue-900 text-yellow-400 px-8 py-3 rounded-lg font-semibold hover:bg-blue-950 transition border-2 border-yellow-500"
            >
              🔍 Tra cứu
            </button>
          </div>
        </div>

        {/* Filter Options */}
        <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-3">Bộ lọc:</label>
          <div className="flex gap-3 flex-wrap">
            {['Tất cả', 'Hàng giả', 'Sản phẩm xác thực', 'Chưa rõ'].map(filter => (
              <button
                key={filter}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition text-sm"
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results */}
      {searched && (
        <div className="max-w-4xl">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Kết quả tìm kiếm ({results.length})</h2>
          <div className="space-y-4">
            {results.map((result) => (
              <div key={result.id} className="bg-white p-6 rounded-lg border-l-4 border-indigo-600 shadow hover:shadow-lg transition">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-blue-900">{result.name}</h3>
                    <p className="text-gray-600 text-sm mt-1">{result.description}</p>
                  </div>
                  <span className={`px-4 py-2 rounded-full text-sm font-semibold ${
                    result.status === 'Có hàng giả'
                      ? 'bg-red-100 text-red-700'
                      : 'bg-green-100 text-green-700'
                  }`}>
                    {result.status}
                  </span>
                </div>
                <div className="flex gap-3 mt-4">
                  <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded text-xs font-semibold">{result.type}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {searched && results.length === 0 && (
        <div className="bg-blue-50 p-8 rounded-lg text-center max-w-4xl">
          <p className="text-gray-600">Không tìm thấy kết quả. Vui lòng thử từ khóa khác.</p>
        </div>
      )}

      {/* Back Link */}
      <Link href="/" className="text-blue-600 hover:underline">
        ← Quay lại trang chính
      </Link>
    </div>
  );
}
