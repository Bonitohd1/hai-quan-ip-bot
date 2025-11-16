'use client';

import Link from 'next/link';

export default function ThongKeSHTT() {
  const stats = [
    { label: 'Tổng sáng chế', value: '18,540', change: '+2.5%', color: 'bg-blue-500' },
    { label: 'Nhãn hiệu', value: '24,890', change: '+3.1%', color: 'bg-green-500' },
    { label: 'Thiết kế công nghiệp', value: '8,240', change: '+1.8%', color: 'bg-purple-500' },
    { label: 'Quyền tác giả', value: '12,560', change: '+4.2%', color: 'bg-yellow-500' },
  ];

  const categories = [
    { name: 'Sáng chế', count: 18540, icon: '💡', percentage: 32 },
    { name: 'Nhãn hiệu', count: 24890, icon: '🏷️', percentage: 43 },
    { name: 'Thiết kế', count: 8240, icon: '🎨', percentage: 14 },
    { name: 'Quyền tác giả', count: 12560, icon: '📝', percentage: 11 },
  ];

  const yearlyData = [
    { year: '2020', value: 32400 },
    { year: '2021', value: 38200 },
    { year: '2022', value: 42800 },
    { year: '2023', value: 48900 },
    { year: '2024', value: 58230 },
  ];

  return (
    <div className="flex flex-col gap-8">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-900 to-blue-950 text-white p-8 rounded-lg shadow-lg border-b-4 border-yellow-500">
        <div className="flex items-center gap-4">
          <span className="text-4xl">📊</span>
          <div>
            <h1 className="text-3xl font-bold">Thống kê Sở hữu Trí tuệ Hải quan</h1>
            <p className="text-sm opacity-90 mt-2">Số liệu thống kê tổng hợp về SHTT năm 2024</p>
          </div>
        </div>
      </header>

      {/* KPI Cards */}
      <div className="grid grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <div key={i} className={`${stat.color} text-white rounded-lg p-6 shadow-md`}>
            <p className="text-sm opacity-90 mb-2">{stat.label}</p>
            <p className="text-3xl font-bold">{stat.value}</p>
            <p className="text-xs opacity-75 mt-2 text-green-100">{stat.change} so với năm trước</p>
          </div>
        ))}
      </div>

      {/* Category Breakdown */}
      <div className="bg-white rounded-lg p-6 shadow-md">
        <h2 className="text-2xl font-bold text-blue-900 mb-6">📈 Phân bổ theo loại</h2>
        <div className="grid grid-cols-4 gap-6">
          {categories.map((cat, i) => (
            <div key={i} className="text-center">
              <div className="text-5xl mb-3">{cat.icon}</div>
              <h3 className="text-lg font-bold text-blue-900 mb-2">{cat.name}</h3>
              <p className="text-2xl font-bold text-gray-800 mb-2">{cat.count.toLocaleString()}</p>
              <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                <div className="bg-blue-900 h-2 rounded-full" style={{ width: `${cat.percentage}%` }}></div>
              </div>
              <p className="text-sm text-gray-600">{cat.percentage}% tổng số</p>
            </div>
          ))}
        </div>
      </div>

      {/* Yearly Trend */}
      <div className="bg-white rounded-lg p-6 shadow-md">
        <h2 className="text-2xl font-bold text-blue-900 mb-6">📅 Xu hướng qua năm</h2>
        <div className="flex items-end justify-center gap-6 h-64">
          {yearlyData.map((data, i) => {
            const maxValue = Math.max(...yearlyData.map(d => d.value));
            const height = (data.value / maxValue) * 100;
            return (
              <div key={i} className="flex flex-col items-center flex-1">
                <div className="relative w-full flex justify-center mb-4">
                  <div
                    className="bg-gradient-to-t from-blue-600 to-blue-400 rounded-t-lg w-12"
                    style={{ height: `${height * 2}px` }}
                  ></div>
                </div>
                <p className="text-sm font-semibold text-gray-700">{data.year}</p>
                <p className="text-xs text-gray-600 mt-1">{data.value.toLocaleString()}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 gap-6">
        <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-900">
          <h3 className="font-bold text-blue-900 mb-2">📌 Điểm nổi bật</h3>
          <ul className="text-gray-700 text-sm space-y-2">
            <li>✓ Tăng 19.3% so với năm trước</li>
            <li>✓ Nhãn hiệu là loại chiếm tỷ lệ lớn nhất (43%)</li>
            <li>✓ Tất cả loại SHTT đều tăng trưởng dương</li>
          </ul>
        </div>
        <div className="bg-yellow-50 p-6 rounded-lg border-l-4 border-yellow-500">
          <h3 className="font-bold text-blue-900 mb-2">🎯 Mục tiêu 2025</h3>
          <ul className="text-gray-700 text-sm space-y-2">
            <li>• Đạt 65,000 đăng ký SHTT</li>
            <li>• Giảm 30% hàng giả nhập khẩu</li>
            <li>• Cải thiện thời gian xử lý hồ sơ</li>
          </ul>
        </div>
      </div>

      {/* Back Link */}
      <Link href="/" className="text-blue-600 hover:underline">
        ← Quay lại trang chính
      </Link>
    </div>
  );
}
