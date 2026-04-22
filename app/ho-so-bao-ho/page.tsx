'use client';

import { useState, useEffect } from 'react';
import { Search, Filter, Shield, Calendar, Phone, Mail, Tag, ChevronRight, X, Building2, Package, AlertTriangle, CheckCircle, Clock, FileText, Download, ExternalLink, MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ProtectionRequest {
  id: string;
  trademark: string;
  owner: string;
  ownerShort: string;
  representative: string;
  repPhone: string;
  repEmail: string;
  certNumber: string;
  hsCodes: string[];
  goods: string;
  ports: string[];
  validFrom: string;
  validTo: string;
  status: 'active' | 'expiring' | 'expired';
  origin: string;
  logo?: string;
  notes: string;
  category: string;
}

const DATA: ProtectionRequest[] = [
  {
    id: '1',
    trademark: 'NIKE / Swoosh',
    owner: 'Nike, Inc.',
    ownerShort: 'Nike',
    representative: 'Công ty TNHH BMVN (Baker McKenzie)',
    repPhone: '024 3825 1428',
    repEmail: 'hanoi@bakermckenzie.com',
    certNumber: '4-0045231-000',
    hsCodes: ['6401', '6402', '6403', '6404', '6405', '6101', '6102', '6201', '6202', '9506'],
    goods: 'Giày dép, quần áo, phụ kiện thể thao, dụng cụ thể dục thể thao',
    ports: ['HCM - Tân Sơn Nhất', 'HN - Nội Bài', 'ĐN - Tiên Sa', 'HN - Cảng ICD Phước Long'],
    validFrom: '2024-03-01',
    validTo: '2029-03-01',
    status: 'active',
    origin: 'Hoa Kỳ',
    category: 'Thể thao & Thời trang',
    notes: 'Hàng giả phổ biến nhất. Kiểm tra logo Swoosh, tem QR trên lưỡi giày. Liên hệ đại diện nếu nghi ngờ để giám định nhanh trong 24h.'
  },
  {
    id: '2',
    trademark: 'ADIDAS / Ba sọc',
    owner: 'Adidas AG',
    ownerShort: 'Adidas',
    representative: 'Công ty Luật DFDL Mekong',
    repPhone: '024 3772 9900',
    repEmail: 'hanoi@dfdl.com',
    certNumber: '4-0052817-000',
    hsCodes: ['6401', '6402', '6403', '6404', '6101', '6201', '9506'],
    goods: 'Giày dép, quần áo thể thao, phụ kiện',
    ports: ['HCM - Tân Sơn Nhất', 'HN - Nội Bài', 'HCM - Cảng Cát Lái'],
    validFrom: '2023-06-15',
    validTo: '2028-06-15',
    status: 'active',
    origin: 'Đức',
    category: 'Thể thao & Thời trang',
    notes: 'Nhận dạng: ba sọc song song đặc trưng. Hàng giả thường có sọc nghiêng hoặc khoảng cách không đều. Tem chính hãng có mã QR hạn chế scan lại.'
  },
  {
    id: '3',
    trademark: 'LOUIS VUITTON / LV Monogram',
    owner: 'Louis Vuitton Malletier',
    ownerShort: 'Louis Vuitton',
    representative: 'Tilleke & Gibbins Việt Nam',
    repPhone: '028 3824 6001',
    repEmail: 'vietnam@tilleke.com',
    certNumber: '4-0018934-000',
    hsCodes: ['4202', '4203', '6116', '9102', '7113'],
    goods: 'Túi xách, ví, đồ da, phụ kiện thời trang cao cấp',
    ports: ['HCM - Tân Sơn Nhất', 'HN - Nội Bài', 'HCM - Cảng Cát Lái'],
    validFrom: '2024-01-10',
    validTo: '2034-01-10',
    status: 'active',
    origin: 'Pháp',
    category: 'Hàng xa xỉ',
    notes: 'Hàng giả LV rất tinh vi. Yêu cầu giám định chuyên gia từ đại diện khi phát hiện lô số lượng lớn. Monogram hàng thật có pattern đối xứng chính xác.'
  },
  {
    id: '4',
    trademark: 'HONDA',
    owner: 'Honda Motor Co., Ltd.',
    ownerShort: 'Honda',
    representative: 'Công ty Honda Việt Nam',
    repPhone: '0221 368 5555',
    repEmail: 'legal@honda.com.vn',
    certNumber: '4-0007823-000',
    hsCodes: ['8711', '8712', '8714', '8483', '8409', '8501'],
    goods: 'Xe máy, phụ tùng xe máy, động cơ, linh kiện điện',
    ports: ['HN - Cảng ICD Mỹ Đình', 'HCM - Cảng Cát Lái', 'HP - Cảng Hải Phòng'],
    validFrom: '2023-09-01',
    validTo: '2028-09-01',
    status: 'active',
    origin: 'Nhật Bản',
    category: 'Phụ tùng & Xe máy',
    notes: 'Phụ tùng giả Honda rất phổ biến. Kiểm tra mã sản phẩm dập nổi, tem hologram trên hộp. Phụ tùng thật luôn có mã QR tra cứu tại website Honda Việt Nam.'
  },
  {
    id: '5',
    trademark: 'SAMSUNG',
    owner: 'Samsung Electronics Co., Ltd.',
    ownerShort: 'Samsung',
    representative: 'Công ty TNHH Samsung Việt Nam',
    repPhone: '028 3742 4500',
    repEmail: 'legal@samsung.vn',
    certNumber: '4-0031205-000',
    hsCodes: ['8517', '8471', '8504', '8507', '9013'],
    goods: 'Điện thoại, máy tính bảng, linh kiện điện tử, pin, màn hình',
    ports: ['HCM - Tân Sơn Nhất', 'HN - Nội Bài', 'HP - Cảng Hải Phòng'],
    validFrom: '2024-05-20',
    validTo: '2029-05-20',
    status: 'active',
    origin: 'Hàn Quốc',
    category: 'Điện tử & Công nghệ',
    notes: 'Chú ý linh kiện thay thế giả (pin, màn hình). Sản phẩm thật có IMEI/Serial đăng ký tại VNPT VinaPhone hoặc tra cứu tại website Samsung. Bao bì giả thường in mờ, màu lệch.'
  },
  {
    id: '6',
    trademark: 'APPLE / Apple Logo',
    owner: 'Apple Inc.',
    ownerShort: 'Apple',
    representative: 'Hogan Lovells (Việt Nam)',
    repPhone: '028 3823 8668',
    repEmail: 'hochiminh@hoganlovells.com',
    certNumber: '4-0029876-000',
    hsCodes: ['8517', '8471', '8473', '8504', '8507', '8543'],
    goods: 'Điện thoại, máy tính, phụ kiện, linh kiện Apple',
    ports: ['HCM - Tân Sơn Nhất', 'HN - Nội Bài'],
    validFrom: '2024-02-14',
    validTo: '2029-02-14',
    status: 'active',
    origin: 'Hoa Kỳ',
    category: 'Điện tử & Công nghệ',
    notes: 'Hàng refurbished giả nhãn hiệu phổ biến. Kiểm tra serial trên apple.com/support/activation. Logo táo thật sắc nét, bề mặt đồng nhất. Hộp thật in sắc, seal nguyên vẹn.'
  },
  {
    id: '7',
    trademark: 'ROLEX / Crown Logo',
    owner: 'Rolex SA',
    ownerShort: 'Rolex',
    representative: 'Villarreal & Asociados (đại diện VN)',
    repPhone: '028 3914 2020',
    repEmail: 'vietnam@rolex-legal.com',
    certNumber: '4-0005512-000',
    hsCodes: ['9101', '9102', '9103', '9114'],
    goods: 'Đồng hồ đeo tay, phụ kiện đồng hồ cao cấp',
    ports: ['HCM - Tân Sơn Nhất', 'HN - Nội Bài'],
    validFrom: '2023-11-30',
    validTo: '2033-11-30',
    status: 'active',
    origin: 'Thụy Sĩ',
    category: 'Hàng xa xỉ',
    notes: 'Đồng hồ giả Rolex tinh xảo, cần thiết bị chuyên dụng để kiểm tra. Kim giây hàng thật chuyển động trơn (sweep), không tích tắc. Luôn yêu cầu giám định chuyên gia.'
  },
  {
    id: '8',
    trademark: 'VINAMILK',
    owner: 'Công ty CP Sữa Việt Nam (Vinamilk)',
    ownerShort: 'Vinamilk',
    representative: 'Phòng Pháp chế Vinamilk',
    repPhone: '028 5416 7100',
    repEmail: 'legal@vinamilk.com.vn',
    certNumber: '4-0088123-000',
    hsCodes: ['0401', '0402', '0403', '0404', '1901', '2106'],
    goods: 'Sữa tươi, sữa bột, sản phẩm từ sữa, thực phẩm chức năng',
    ports: ['HCM - Cảng Cát Lái', 'HP - Cảng Hải Phòng', 'ĐN - Tiên Sa'],
    validFrom: '2024-07-01',
    validTo: '2034-07-01',
    status: 'active',
    origin: 'Việt Nam',
    category: 'Thực phẩm & Đồ uống',
    notes: 'Hàng nhập khẩu mang nhãn Vinamilk giả thường từ Trung Quốc. Kiểm tra ngày sản xuất, tem phụ tiếng Việt, mã vạch GS1 Việt Nam (893-xxx).'
  },
  {
    id: '9',
    trademark: 'MICHELIN / Bibendum',
    owner: 'Compagnie Générale des Établissements Michelin',
    ownerShort: 'Michelin',
    representative: 'Công ty Luật Frasers Law',
    repPhone: '028 3911 0950',
    repEmail: 'vietnam@frasers-law.com',
    certNumber: '4-0041678-000',
    hsCodes: ['4011', '4012', '4013'],
    goods: 'Lốp xe ô tô, lốp xe máy, lốp xe tải',
    ports: ['HP - Cảng Hải Phòng', 'HCM - Cảng Cát Lái', 'ĐN - Tiên Sa'],
    validFrom: '2023-04-15',
    validTo: '2028-04-15',
    status: 'active',
    origin: 'Pháp',
    category: 'Phụ tùng & Xe máy',
    notes: 'Lốp giả Michelin nguy hiểm tính mạng. Ưu tiên kiểm tra kỹ. Sản phẩm thật có mã DOT trên thành lốp và tem phân phối chính hãng. Báo ngay về Cục khi phát hiện.'
  },
  {
    id: '10',
    trademark: 'PANASONIC',
    owner: 'Panasonic Corporation',
    ownerShort: 'Panasonic',
    representative: 'Công ty TNHH Panasonic Việt Nam',
    repPhone: '028 3823 0333',
    repEmail: 'legal@panasonic.com.vn',
    certNumber: '4-0034521-000',
    hsCodes: ['8509', '8516', '8528', '8539', '8501', '8504'],
    goods: 'Thiết bị điện gia dụng, pin, bóng đèn, linh kiện điện tử',
    ports: ['HCM - Cảng Cát Lái', 'HP - Cảng Hải Phòng'],
    validFrom: '2024-09-10',
    validTo: '2027-09-10',
    status: 'expiring',
    origin: 'Nhật Bản',
    category: 'Điện tử & Công nghệ',
    notes: 'Chú ý pin và bóng đèn Panasonic giả. Sản phẩm thật có tem hologram bạc, mã sản phẩm khắc chìm trên thân máy. Hàng giả thường nhẹ hơn hàng thật đáng kể.'
  },
  {
    id: '11',
    trademark: 'BITI\'S',
    owner: 'Công ty TNHH SX-XNK Bình Tiên (Biti\'s)',
    ownerShort: "Biti's",
    representative: "Phòng Pháp chế Biti's",
    repPhone: '028 3855 4356',
    repEmail: 'legal@bitis.com.vn',
    certNumber: '4-0091234-000',
    hsCodes: ['6401', '6402', '6403', '6404', '6405'],
    goods: 'Giày dép các loại',
    ports: ['HCM - Tân Sơn Nhất', 'HCM - Cảng Cát Lái', 'HP - Cảng Hải Phòng'],
    validFrom: '2024-01-01',
    validTo: '2034-01-01',
    status: 'active',
    origin: 'Việt Nam',
    category: 'Thể thao & Thời trang',
    notes: "Thương hiệu Việt bị giả từ Trung Quốc nhập khẩu. Kiểm tra đế giày có chữ BITI'S nổi, chất liệu đế đồng nhất. Hàng giả đế mềm, chữ in mờ hoặc sai font."
  },
  {
    id: '12',
    trademark: 'CASIO',
    owner: 'Casio Computer Co., Ltd.',
    ownerShort: 'Casio',
    representative: 'Deloitte Legal Việt Nam',
    repPhone: '028 7101 4555',
    repEmail: 'legal@deloitte.com.vn',
    certNumber: '4-0028765-000',
    hsCodes: ['9101', '9102', '8470', '8473'],
    goods: 'Đồng hồ, máy tính bỏ túi, nhạc cụ điện tử',
    ports: ['HCM - Tân Sơn Nhất', 'HN - Nội Bài', 'HP - Cảng Hải Phòng'],
    validFrom: '2022-06-01',
    validTo: '2025-06-01',
    status: 'expiring',
    origin: 'Nhật Bản',
    category: 'Điện tử & Công nghệ',
    notes: 'Hồ sơ sắp hết hạn — liên hệ đại diện để gia hạn. Đồng hồ giả Casio G-Shock rất phổ biến. Nhận dạng: nút bấm hàng thật cứng, mặt kính sáng, back case có serial rõ nét.'
  }
];

const CATEGORIES = ['Tất cả', 'Thể thao & Thời trang', 'Hàng xa xỉ', 'Điện tử & Công nghệ', 'Phụ tùng & Xe máy', 'Thực phẩm & Đồ uống'];
const STATUS_FILTERS = ['Tất cả', 'Đang hiệu lực', 'Sắp hết hạn', 'Hết hạn'];

function statusProps(s: ProtectionRequest['status']) {
  if (s === 'active') return { label: 'Đang hiệu lực', cls: 'bg-emerald-50 text-emerald-700 border-emerald-200', dot: 'bg-emerald-500' };
  if (s === 'expiring') return { label: 'Sắp hết hạn', cls: 'bg-amber-50 text-amber-700 border-amber-200', dot: 'bg-amber-500' };
  return { label: 'Hết hạn', cls: 'bg-slate-100 text-slate-500 border-slate-200', dot: 'bg-slate-400' };
}

function daysLeft(validTo: string) {
  const diff = Math.ceil((new Date(validTo).getTime() - Date.now()) / 86400000);
  return diff;
}

export default function HoSoBaoHo() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('Tất cả');
  const [statusFilter, setStatusFilter] = useState('Tất cả');
  const [selected, setSelected] = useState<ProtectionRequest | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  const filtered = DATA.filter(d => {
    const matchCat = category === 'Tất cả' || d.category === category;
    const matchStatus = statusFilter === 'Tất cả' ||
      (statusFilter === 'Đang hiệu lực' && d.status === 'active') ||
      (statusFilter === 'Sắp hết hạn' && d.status === 'expiring') ||
      (statusFilter === 'Hết hạn' && d.status === 'expired');
    const q = query.toLowerCase();
    const matchQ = !q || d.trademark.toLowerCase().includes(q) || d.owner.toLowerCase().includes(q) ||
      d.hsCodes.some(h => h.includes(q)) || d.goods.toLowerCase().includes(q);
    return matchCat && matchStatus && matchQ;
  });

  if (!mounted) return null;

  return (
    <div className="flex flex-col min-h-screen bg-[#f1f5f9] -m-6 lg:-m-12 p-6 lg:p-10 space-y-6 max-w-[1600px] mx-auto font-sans">

      {/* HEADER */}
      <div className="bg-[#0a192f] rounded-3xl p-8 lg:p-10 shadow-2xl relative overflow-hidden border border-slate-800">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-emerald-500/10 to-transparent pointer-events-none" />
        <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-emerald-500/10 blur-[80px] rounded-full pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-500 text-white text-[11px] font-bold uppercase tracking-wider rounded-full mb-4 shadow-lg shadow-emerald-500/30">
              <Shield className="w-3.5 h-3.5" /> Kiểm soát biên giới
            </div>
            <h1 className="text-3xl lg:text-4xl font-extrabold text-white tracking-tight mb-2">
              Hồ sơ <span className="text-emerald-400">bảo hộ biên giới</span>
            </h1>
            <p className="text-slate-400 font-medium max-w-xl">
              Danh sách chủ thể quyền đã đăng ký giám sát — tra cứu nhanh khi kiểm hóa phát hiện dấu hiệu vi phạm.
            </p>
          </div>
          <div className="grid grid-cols-3 gap-4 shrink-0">
            {[
              { label: 'Tổng hồ sơ', value: DATA.length, color: 'text-white' },
              { label: 'Đang hiệu lực', value: DATA.filter(d => d.status === 'active').length, color: 'text-emerald-400' },
              { label: 'Sắp hết hạn', value: DATA.filter(d => d.status === 'expiring').length, color: 'text-amber-400' },
            ].map((s, i) => (
              <div key={i} className="bg-white/10 rounded-2xl p-4 text-center border border-white/10">
                <p className={`text-3xl font-black ${s.color}`}>{s.value}</p>
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* SEARCH + FILTER */}
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Tìm theo nhãn hiệu, chủ sở hữu, mã HS..."
            className="w-full pl-12 pr-4 py-3.5 bg-white border border-slate-200 rounded-2xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-sm"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {STATUS_FILTERS.map(s => (
            <button key={s} onClick={() => setStatusFilter(s)}
              className={`px-4 py-2.5 rounded-xl text-sm font-bold transition-all ${statusFilter === s ? 'bg-[#0a192f] text-white shadow-md' : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'}`}>
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* SIDEBAR CATEGORIES */}
        <div className="w-full lg:w-56 shrink-0">
          <div className="bg-white rounded-2xl border border-slate-200 p-4 sticky top-4 shadow-sm">
            <p className="text-[11px] font-extrabold text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2">
              <Filter className="w-3.5 h-3.5" /> Nhóm hàng
            </p>
            <div className="space-y-1">
              {CATEGORIES.map(c => (
                <button key={c} onClick={() => setCategory(c)}
                  className={`w-full text-left px-3 py-2.5 rounded-xl text-[13px] font-semibold transition-all flex items-center justify-between ${category === c ? 'bg-[#0a192f] text-white' : 'text-slate-600 hover:bg-slate-50'}`}>
                  <span>{c}</span>
                  {category === c && <ChevronRight className="w-3.5 h-3.5" />}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* CARD GRID */}
        <div className="flex-1">
          <div className="flex items-center justify-between mb-4 px-1">
            <p className="text-sm font-bold text-slate-500">{filtered.length} hồ sơ</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {filtered.map((d, i) => {
              const sp = statusProps(d.status);
              const days = daysLeft(d.validTo);
              return (
                <motion.div
                  key={d.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.04 }}
                  onClick={() => setSelected(d)}
                  className="bg-white rounded-2xl border border-slate-200 p-5 hover:border-emerald-300 hover:shadow-lg transition-all duration-300 cursor-pointer group"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0 group-hover:bg-emerald-50 transition-colors">
                      <Shield className="w-6 h-6 text-slate-400 group-hover:text-emerald-600 transition-colors" />
                    </div>
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold border flex items-center gap-1.5 ${sp.cls}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${sp.dot}`} />
                      {sp.label}
                    </span>
                  </div>

                  <h3 className="text-base font-black text-[#0a192f] group-hover:text-emerald-700 transition-colors mb-0.5">{d.trademark}</h3>
                  <p className="text-xs font-semibold text-slate-500 mb-3">{d.owner}</p>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-xs text-slate-600">
                      <Tag className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span className="font-medium truncate">HS: {d.hsCodes.slice(0, 3).join(', ')}{d.hsCodes.length > 3 ? ` +${d.hsCodes.length - 3}` : ''}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-600">
                      <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span className="font-medium truncate">{d.ports.slice(0, 2).join(', ')}{d.ports.length > 2 ? ` +${d.ports.length - 2}` : ''}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-600">
                      <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span className="font-medium">Hết hạn: {d.validTo} {days <= 180 && days > 0 && <span className="text-amber-600 font-bold">({days} ngày)</span>}</span>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-[11px] font-bold text-slate-400 px-2 py-1 bg-slate-50 rounded-lg">{d.category}</span>
                    <span className="text-[11px] font-bold text-emerald-600 flex items-center gap-1 group-hover:gap-2 transition-all">
                      Chi tiết <ChevronRight className="w-3 h-3" />
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>
          {filtered.length === 0 && (
            <div className="flex flex-col items-center justify-center h-64 bg-white rounded-2xl border border-slate-200">
              <Search className="w-10 h-10 text-slate-300 mb-3" />
              <p className="font-bold text-slate-500">Không tìm thấy hồ sơ phù hợp</p>
            </div>
          )}
        </div>
      </div>

      {/* DETAIL MODAL */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 20, scale: 0.97 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
              onClick={e => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="bg-[#0a192f] rounded-t-3xl p-6 flex items-start justify-between">
                <div>
                  <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold border mb-3 ${statusProps(selected.status).cls}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${statusProps(selected.status).dot}`} />
                    {statusProps(selected.status).label}
                  </div>
                  <h2 className="text-2xl font-black text-white">{selected.trademark}</h2>
                  <p className="text-slate-400 text-sm font-medium mt-1">{selected.owner} · {selected.origin}</p>
                </div>
                <button onClick={() => setSelected(null)} className="w-9 h-9 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors shrink-0 mt-1">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 space-y-5">
                {/* Cert + validity */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-1">Số GCN</p>
                    <p className="text-sm font-black text-[#0a192f]">{selected.certNumber}</p>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-1">Hiệu lực</p>
                    <p className="text-sm font-black text-[#0a192f]">{selected.validFrom} → {selected.validTo}</p>
                    {daysLeft(selected.validTo) <= 180 && daysLeft(selected.validTo) > 0 && (
                      <p className="text-[11px] font-bold text-amber-600 mt-0.5">Còn {daysLeft(selected.validTo)} ngày</p>
                    )}
                  </div>
                </div>

                {/* Goods */}
                <div>
                  <p className="text-[11px] font-extrabold text-slate-400 uppercase tracking-widest mb-2">Hàng hóa bảo hộ</p>
                  <p className="text-sm font-medium text-slate-700 bg-slate-50 rounded-xl p-3 border border-slate-100">{selected.goods}</p>
                </div>

                {/* HS Codes */}
                <div>
                  <p className="text-[11px] font-extrabold text-slate-400 uppercase tracking-widest mb-2">Mã HS áp dụng</p>
                  <div className="flex flex-wrap gap-2">
                    {selected.hsCodes.map(h => (
                      <span key={h} className="px-3 py-1.5 bg-blue-50 text-blue-700 rounded-lg text-xs font-bold border border-blue-100">{h}</span>
                    ))}
                  </div>
                </div>

                {/* Ports */}
                <div>
                  <p className="text-[11px] font-extrabold text-slate-400 uppercase tracking-widest mb-2">Cửa khẩu giám sát</p>
                  <div className="flex flex-wrap gap-2">
                    {selected.ports.map(p => (
                      <span key={p} className="px-3 py-1.5 bg-emerald-50 text-emerald-700 rounded-lg text-xs font-bold border border-emerald-100 flex items-center gap-1.5">
                        <MapPin className="w-3 h-3" /> {p}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Contact */}
                <div className="bg-blue-50 rounded-2xl p-4 border border-blue-100">
                  <p className="text-[11px] font-extrabold text-blue-800 uppercase tracking-widest mb-3">Đại diện liên hệ khi phát hiện vi phạm</p>
                  <p className="text-sm font-bold text-[#0a192f] mb-2">{selected.representative}</p>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <a href={`tel:${selected.repPhone}`} className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl text-sm font-bold text-[#0a192f] border border-blue-200 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-colors">
                      <Phone className="w-4 h-4" /> {selected.repPhone}
                    </a>
                    <a href={`mailto:${selected.repEmail}`} className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl text-sm font-bold text-[#0a192f] border border-blue-200 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-colors">
                      <Mail className="w-4 h-4" /> {selected.repEmail}
                    </a>
                  </div>
                </div>

                {/* Notes */}
                <div className="bg-amber-50 rounded-2xl p-4 border border-amber-200">
                  <p className="text-[11px] font-extrabold text-amber-800 uppercase tracking-widest mb-2 flex items-center gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5" /> Lưu ý nghiệp vụ
                  </p>
                  <p className="text-sm font-medium text-amber-900 leading-relaxed">{selected.notes}</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
