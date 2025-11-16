'use client';

import Link from 'next/link';

export default function VanBanPhapLuat() {
  const stats = [
    { label: 'Tổng số văn bản', value: '127', color: 'bg-blue-500' },
    { label: 'Luật', value: '8', color: 'bg-yellow-500' },
    { label: 'Thông tư', value: '42', color: 'bg-green-500' },
    { label: 'Hiệp định quốc tế', value: '12', color: 'bg-purple-500' },
  ];

  const documents = [
    {
      id: 1,
      title: 'Luật Sở hữu Trí tuệ năm 2005',
      type: 'Luật',
      year: '2005',
      description: 'Quy định về quyền tác giả, quyền liên quan, sáng chế và mẫu dáng công nghiệp'
    },
    {
      id: 2,
      title: 'Thông tư 12/2014/TT-BKHCN',
      type: 'Thông tư',
      year: '2014',
      description: 'Hướng dẫn thủ tục xin cấp giấy chứng chỉ sáng chế'
    },
    {
      id: 3,
      title: 'Quyết định 59/2013/QĐ-TTg',
      type: 'Quyết định',
      year: '2013',
      description: 'Phê duyệt chiến lược phát triển sở hữu trí tuệ'
    },
    {
      id: 4,
      title: 'Nghị định 82/2014/NĐ-CP',
      type: 'Nghị định',
      year: '2014',
      description: 'Sửa đổi bổ sung một số điều của Nghị định liên quan sở hữu trí tuệ'
    },
    {
      id: 5,
      title: 'Thông tư 41/2015/TT-BKHCN',
      type: 'Thông tư',
      year: '2015',
      description: 'Quy định về xử lý vi phạm sở hữu trí tuệ'
    },
    {
      id: 6,
      title: 'Hiệp định CPTPP',
      type: 'Hiệp định quốc tế',
      year: '2019',
      description: 'Cam kết bảo vệ sở hữu trí tuệ theo tiêu chuẩn quốc tế'
    }
  ];

  return (
    <div className="flex flex-col gap-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-900 to-blue-950 text-white p-8 rounded-lg shadow-lg border-b-4 border-yellow-500">
        <h1 className="text-3xl font-bold">⚖️ Văn Bản Pháp Luật</h1>
        <p className="text-sm opacity-90 mt-2">Tập hợp các quy định và văn bản pháp luật về sở hữu trí tuệ</p>
      </div>

      {/* Documents List */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        {stats.map((stat, i) => (
          <div key={i} className={`${stat.color} text-white rounded-lg p-6 shadow-md`}>
            <p className="text-sm opacity-90 mb-2">{stat.label}</p>
            <p className="text-3xl font-bold">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Documents List */}
      <div className="grid grid-cols-1 gap-4 max-w-5xl">
        {documents.map((doc) => (
          <div key={doc.id} className="bg-white p-6 rounded-lg border-l-4 border-blue-900 shadow hover:shadow-lg transition">
            <div className="flex justify-between items-start mb-3">
              <div className="flex-1">
                <h3 className="text-lg font-bold text-blue-900">{doc.title}</h3>
                <p className="text-gray-600 text-sm mt-2">{doc.description}</p>
              </div>
              <div className="flex gap-2 ml-4">
                <span className="bg-blue-100 text-blue-900 px-3 py-1 rounded-full text-xs font-semibold">{doc.type}</span>
                <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-xs font-semibold">{doc.year}</span>
              </div>
            </div>
            <div className="flex gap-3 mt-4">
              <button className="bg-blue-900 text-white px-4 py-2 rounded text-sm font-semibold hover:bg-blue-950 transition">
                📄 Xem chi tiết
              </button>
              <button className="border border-blue-900 text-blue-900 px-4 py-2 rounded text-sm font-semibold hover:bg-blue-50 transition">
                ⬇️ Tải xuống
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Search/Filter */}
      <div className="bg-yellow-50 p-6 rounded-lg border-l-4 border-yellow-500 max-w-5xl">
        <h3 className="font-bold text-blue-900 mb-3">🔍 Tìm kiếm văn bản</h3>
        <input
          type="text"
          placeholder="Nhập từ khóa tìm kiếm..."
          className="w-full px-4 py-2 border-2 border-yellow-500 rounded-lg focus:outline-none focus:border-blue-900"
        />
      </div>

      {/* Back Link */}
      <Link href="/" className="text-blue-600 hover:underline">
        ← Quay lại trang chính
      </Link>
    </div>
  );
}
