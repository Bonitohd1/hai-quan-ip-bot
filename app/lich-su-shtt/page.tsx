'use client';

import Link from 'next/link';

export default function LichSuSHTT() {
  const stats = [
    { label: 'Năm thành lập', value: '1965', color: 'bg-blue-500' },
    { label: 'Số công ty đăng ký', value: '15,240', color: 'bg-green-500' },
    { label: 'Số bằng độc quyền', value: '8,540', color: 'bg-yellow-500' },
    { label: 'Số nhãn hiệu', value: '12,890', color: 'bg-purple-500' },
  ];

  const history = [
    {
      year: '2010',
      title: 'Khởi đầu',
      description: 'Thiết lập khung pháp lý cơ bản cho sở hữu trí tuệ trong hải quan'
    },
    {
      year: '2015',
      title: 'Phát triển',
      description: 'Mở rộng các quy định và nâng cao nhận thức về SHTT'
    },
    {
      year: '2020',
      title: 'Hiện đại hóa',
      description: 'Ứng dụng công nghệ và hệ thống điện tử để quản lý SHTT'
    },
    {
      year: '2024',
      title: 'Hoàn thiện',
      description: 'Nâng cao hiệu quả kiểm soát và bảo vệ sở hữu trí tuệ tại cực'
    }
  ];

  return (
    <div className="flex flex-col gap-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-900 to-blue-950 text-white p-8 rounded-lg shadow-lg border-b-4 border-yellow-500">
        <h1 className="text-3xl font-bold">📚 Lịch sử Sở hữu Trí tuệ Hải quan</h1>
        <p className="text-sm opacity-90 mt-2">Khám phá quá trình phát triển của SHTT qua các giai đoạn</p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <div key={i} className={`${stat.color} text-white rounded-lg p-6 shadow-md`}>
            <p className="text-sm opacity-90 mb-2">{stat.label}</p>
            <p className="text-3xl font-bold">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Timeline */}
      <div className="max-w-4xl">
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-8 top-0 bottom-0 w-1 bg-yellow-500"></div>

          {/* Timeline items */}
          <div className="space-y-8">
            {history.map((item, index) => (
              <div key={index} className="relative ml-24">
                {/* Dot */}
                <div className="absolute left-0 top-2 transform -translate-x-9 w-5 h-5 bg-yellow-500 border-4 border-white rounded-full"></div>

                {/* Content */}
                <div className="bg-white p-6 rounded-lg border-l-4 border-yellow-500 shadow hover:shadow-lg transition">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold text-blue-900">{item.title}</h3>
                    <span className="bg-blue-900 text-yellow-400 px-3 py-1 rounded-full text-sm font-semibold">{item.year}</span>
                  </div>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Additional info */}
      <div className="grid grid-cols-2 gap-6 max-w-4xl">
        <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-900">
          <h3 className="font-bold text-blue-900 mb-2">📖 Tài liệu tham khảo</h3>
          <p className="text-gray-600 text-sm">Xem thêm các tài liệu và nghiên cứu về lịch sử SHTT</p>
        </div>
        <div className="bg-yellow-50 p-6 rounded-lg border-l-4 border-yellow-500">
          <h3 className="font-bold text-blue-900 mb-2">🎓 Học tập</h3>
          <p className="text-gray-600 text-sm">Các bài giảng và khóa học về lịch sử SHTT</p>
        </div>
      </div>

      {/* Back Link */}
      <Link href="/" className="text-blue-600 hover:underline">
        ← Quay lại trang chính
      </Link>
    </div>
  );
}
