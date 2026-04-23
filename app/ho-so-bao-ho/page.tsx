'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  ShieldCheck, Search, Download, ExternalLink, FileText,
  CheckCircle2, ChevronRight, Loader2, ArrowRight, Filter,
  Building2, Calendar, Hash, AlertCircle
} from 'lucide-react';

interface Document {
  id: string;
  code: string;
  name: string;
  type: string;
  date: string;
  description: string;
  filename?: string;
}

const QUY_TRINH = `Chủ nhãn hiệu (Nike, Adidas, Hermes...)
  → nộp hồ sơ + đặt cọc cho Tổng cục Hải quan
  → khai báo: mã HS, cửa khẩu cần giám sát, cách nhận dạng hàng giả

Cán bộ hải quan khi kiểm hóa
  → tra cứu: lô hàng này có thuộc nhãn hiệu đang bảo hộ không?
  → nếu có → tạm dừng thông quan → báo chủ nhãn hiệu → giám định 24h
  → xác nhận giả → tịch thu / tiêu hủy / xử phạt`;

const Y_NGHIA = [
  { question: 'Nhãn hiệu này có đang được bảo hộ không?', answer: 'Danh sách + trạng thái hiệu lực' },
  { question: 'Mã HS nào cần kiểm tra?', answer: 'Danh sách HS codes' },
  { question: 'Gặp nghi vấn gọi ai?', answer: 'SĐT + email đại diện' },
  { question: 'Cửa khẩu nào được giám sát?', answer: 'Danh sách cảng' },
];

function formatDate(dateStr: string) {
  if (!dateStr || dateStr.length !== 8) return dateStr;
  return `${dateStr.slice(0, 2)}/${dateStr.slice(2, 4)}/${dateStr.slice(4)}`;
}

function DocCard({ doc }: { doc: Document }) {
  const isGiaHan = doc.type === 'Gia hạn';
  const isCapMoi = doc.type === 'Cấp mới';

  return (
    <div className={`bg-white rounded-2xl border p-5 flex flex-col gap-3 shadow-sm hover:shadow-md transition-all duration-200 group ${
      isCapMoi ? 'border-blue-100 hover:border-blue-300' : 'border-emerald-100 hover:border-emerald-300'
    }`}>
      {/* Header */}
      <div className="flex items-start justify-between gap-2">
        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wide ${
          isCapMoi
            ? 'bg-blue-50 text-blue-700 border border-blue-200'
            : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
        }`}>
          <ShieldCheck className="w-3 h-3" />
          {doc.type}
        </span>
        <span className="text-[11px] text-slate-400 font-semibold flex items-center gap-1">
          <Calendar className="w-3 h-3" />
          {formatDate(doc.date)}
        </span>
      </div>

      {/* ID + Name */}
      <div>
        <div className="flex items-center gap-1.5 mb-1">
          <Hash className="w-3 h-3 text-slate-400" />
          <span className="text-[11px] text-slate-400 font-semibold">ID: {doc.code}</span>
        </div>
        <h3 className="text-[14px] font-black text-slate-800 leading-snug">{doc.name}</h3>
      </div>

      {/* Description */}
      <p className="text-[12px] text-slate-500 font-medium leading-relaxed line-clamp-3">
        {doc.description}
      </p>

      {/* Actions */}
      <div className="flex items-center gap-2 pt-1 mt-auto border-t border-slate-100">
        {doc.filename && (
          <a
            href={`/documents/${doc.filename}`}
            download
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 hover:bg-slate-100 text-slate-600 hover:text-slate-800 rounded-lg text-[11px] font-bold transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            Tải PDF
          </a>
        )}
        <span className="text-[11px] text-slate-400 font-medium ml-auto flex items-center gap-1">
          <Building2 className="w-3 h-3" />
          Cục Hải quan
        </span>
      </div>
    </div>
  );
}

export default function HoSoBaoHo() {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    fetch('/api/documents')
      .then(r => r.json())
      .then(data => {
        const docs: Document[] = data.documents ?? data ?? [];
        setDocuments(docs);
      })
      .catch(() => setDocuments([]))
      .finally(() => setLoading(false));
  }, []);

  if (!mounted) return <div className="min-h-screen bg-[#f8fafc]" />;

  const filtered = documents.filter(doc => {
    const matchType = filterType === 'all' || doc.type === filterType;
    const q = query.toLowerCase();
    const matchQuery = !q || doc.name.toLowerCase().includes(q) || doc.code.toLowerCase().includes(q) || doc.description.toLowerCase().includes(q);
    return matchType && matchQuery;
  });

  const capMois = filtered.filter(d => d.type === 'Cấp mới');
  const giaHans = filtered.filter(d => d.type === 'Gia hạn');

  return (
    <div className="flex flex-col min-h-screen bg-[#f8fafc] -m-6 lg:-m-12 p-6 lg:p-10 font-sans text-slate-800">

      {/* HERO */}
      <div className="bg-gradient-to-br from-[#0a192f] via-[#0f2744] to-[#0a192f] rounded-3xl p-8 lg:p-12 mb-10 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(16,185,129,0.08),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(245,158,11,0.05),transparent_60%)]" />

        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full text-[11px] font-bold uppercase tracking-wider mb-5">
            <ShieldCheck className="w-3.5 h-3.5" />
            Cơ sở dữ liệu bảo hộ SHTT
          </div>

          <h1 className="text-3xl lg:text-4xl font-black text-white leading-tight mb-3">
            Hồ sơ <span className="text-emerald-400">bảo hộ</span> nhãn hiệu
          </h1>
          <p className="text-slate-400 text-base font-medium mb-8 max-w-xl">
            Danh sách nhãn hiệu đã được Cục Hải quan cấp phép giám sát tại các cửa khẩu. Tra cứu nhanh theo tên thương hiệu hoặc mã hồ sơ.
          </p>

          {/* Search */}
          <div className="flex gap-3 max-w-xl">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Tên nhãn hiệu, mã hồ sơ..."
                className="w-full pl-11 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm font-medium backdrop-blur-sm"
              />
            </div>
            <select
              value={filterType}
              onChange={e => setFilterType(e.target.value)}
              className="px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white text-sm font-bold focus:outline-none focus:ring-2 focus:ring-emerald-500 backdrop-blur-sm"
            >
              <option value="all" className="bg-slate-800">Tất cả</option>
              <option value="Cấp mới" className="bg-slate-800">Cấp mới</option>
              <option value="Gia hạn" className="bg-slate-800">Gia hạn</option>
            </select>
          </div>
        </div>

        {/* Stats */}
        <div className="relative z-10 mt-8 flex flex-wrap gap-4">
          {[
            { label: 'Tổng hồ sơ', value: documents.length, color: 'text-white' },
            { label: 'Cấp mới', value: documents.filter(d => d.type === 'Cấp mới').length, color: 'text-blue-400' },
            { label: 'Gia hạn', value: documents.filter(d => d.type === 'Gia hạn').length, color: 'text-emerald-400' },
          ].map(s => (
            <div key={s.label} className="bg-white/5 border border-white/10 rounded-xl px-5 py-3">
              <div className={`text-2xl font-black ${s.color}`}>{s.value}</div>
              <div className="text-[11px] text-slate-400 font-semibold uppercase tracking-wide mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* QUY TRÌNH + Ý NGHĨA — 2 col on desktop */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">

        {/* Quy trình thực tế */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100 flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-amber-500" />
            <h2 className="text-[13px] font-black text-slate-700 uppercase tracking-wide">Quy trình thực tế</h2>
          </div>
          <div className="p-5">
            <pre className="text-[12px] font-mono text-slate-600 leading-relaxed whitespace-pre-wrap bg-slate-50 rounded-xl p-4 border border-slate-100 overflow-x-auto">
              {QUY_TRINH}
            </pre>
          </div>
        </div>

        {/* Ý nghĩa */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100 flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500" />
            <h2 className="text-[13px] font-black text-slate-700 uppercase tracking-wide">Ý nghĩa với ứng dụng này</h2>
          </div>
          <div className="p-5">
            <p className="text-[12px] text-slate-500 font-medium mb-4">
              Trang <code className="bg-slate-100 px-1.5 py-0.5 rounded text-slate-700 font-mono">/ho-so-bao-ho</code> hỗ trợ cán bộ tra cứu nhanh tại cửa khẩu:
            </p>
            <table className="w-full text-[12px]">
              <thead>
                <tr className="border-b border-slate-100">
                  <th className="text-left py-2 pr-4 font-black text-slate-600">Cán bộ cần biết</th>
                  <th className="text-left py-2 font-black text-slate-600">Trang cung cấp</th>
                </tr>
              </thead>
              <tbody>
                {Y_NGHIA.map((row, i) => (
                  <tr key={i} className="border-b border-slate-50 last:border-0">
                    <td className="py-2.5 pr-4 text-slate-600 font-medium">{row.question}</td>
                    <td className="py-2.5">
                      <span className="inline-flex items-center gap-1.5 text-emerald-700 font-bold">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                        {row.answer}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <Link
              href="/tra-cuu"
              className="mt-5 inline-flex items-center gap-2 px-4 py-2.5 bg-[#0a192f] hover:bg-[#0f2744] text-white text-[12px] font-bold rounded-xl transition-colors"
            >
              Mở trang tra cứu hồ sơ <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* DOCUMENT LISTS */}
      {loading ? (
        <div className="flex items-center justify-center py-20 gap-3 text-slate-400">
          <Loader2 className="w-6 h-6 animate-spin" />
          <span className="text-sm font-semibold">Đang tải dữ liệu...</span>
        </div>
      ) : filtered.length === 0 ? (
        <div className="bg-white rounded-2xl border border-dashed border-slate-300 p-16 text-center">
          <AlertCircle className="w-10 h-10 text-slate-300 mx-auto mb-3" />
          <p className="text-slate-400 font-semibold text-sm">Không tìm thấy hồ sơ phù hợp</p>
        </div>
      ) : (
        <div className="space-y-10">
          {/* Cấp mới */}
          {capMois.length > 0 && (
            <div>
              <div className="flex items-center gap-3 mb-5 px-1">
                <div className="w-1.5 h-6 bg-blue-600 rounded-full" />
                <div>
                  <h2 className="text-base font-black text-[#0a192f] uppercase tracking-wide">Hồ sơ cấp mới</h2>
                  <p className="text-xs text-slate-400 font-semibold mt-0.5">Nhãn hiệu mới được cấp phép bảo hộ tại cửa khẩu</p>
                </div>
                <span className="ml-auto px-3 py-1 bg-blue-50 text-blue-600 text-[11px] font-black rounded-full border border-blue-200">
                  {capMois.length} hồ sơ
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {capMois.map(doc => <DocCard key={doc.id} doc={doc} />)}
              </div>
            </div>
          )}

          {/* Gia hạn */}
          {giaHans.length > 0 && (
            <div>
              <div className="flex items-center gap-3 mb-5 px-1">
                <div className="w-1.5 h-6 bg-emerald-500 rounded-full" />
                <div>
                  <h2 className="text-base font-black text-[#0a192f] uppercase tracking-wide">Hồ sơ gia hạn</h2>
                  <p className="text-xs text-slate-400 font-semibold mt-0.5">Nhãn hiệu vừa được gia hạn hiệu lực bảo hộ</p>
                </div>
                <span className="ml-auto px-3 py-1 bg-emerald-50 text-emerald-600 text-[11px] font-black rounded-full border border-emerald-200">
                  {giaHans.length} hồ sơ
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {giaHans.map(doc => <DocCard key={doc.id} doc={doc} />)}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Ghi chú 2 PEEL */}
      {documents.some(d => d.name.toLowerCase().includes('peel')) && (
        <div className="mt-8 p-4 bg-amber-50 border border-amber-200 rounded-xl flex items-start gap-3">
          <AlertCircle className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />
          <p className="text-[12px] text-amber-700 font-medium">
            <span className="font-black">Lưu ý PEEL:</span> Có 2 hồ sơ liên quan đến nhãn hiệu PEEL — một là công văn chỉ đạo (14722/CHQ-GSQL) và một là bộ hồ sơ SHTT đầy đủ cho 4 dòng sản phẩm tút thuốc lá (VB 284731). Đây là 2 tài liệu độc lập, đều hợp lệ.
          </p>
        </div>
      )}

    </div>
  );
}
