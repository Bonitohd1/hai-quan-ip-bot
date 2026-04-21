'use client';

import { useState, useEffect, useRef } from 'react';
import { Scale, FileText, Download, ExternalLink, BookOpen, Search, Filter, Sparkles, ChevronRight, Loader2, ArrowRight, ShieldCheck, Database, X, Bot, Zap, Network, AlignLeft, Send, User, CheckCircle, AlertTriangle, History, AlertOctagon, CornerRightDown } from 'lucide-react';

interface LawDocument {
  id: string;
  title: string;
  type: string;
  number: string;
  year: string;
  desc: string;
  agency: string;
  status: 'active' | 'partial' | 'expired';
  articles: { title: string; content: string }[];
  expertSummary: string;
}

const DOCUMENTS: LawDocument[] = [
  {
    id: '1',
    title: 'Luật Sở hữu trí tuệ 2005 (sửa đổi, bổ sung 2009, 2019, 2022)',
    type: 'Luật',
    number: '07/2022/QH15',
    year: '2022',
    desc: 'Văn bản cốt lõi định hình khung pháp lý toàn diện về quyền sở hữu công nghiệp và bảo vệ quyền SHTT tại biên giới hải quan.',
    agency: 'Quốc hội',
    status: 'active',
    articles: [
      { title: 'CHƯƠNG I. NHỮNG QUY ĐỊNH CHUNG', content: '' },
      { title: 'Điều 1. Phạm vi điều chỉnh', content: 'Luật này quy định về quyền tác giả, quyền liên quan đến quyền tác giả, quyền sở hữu công nghiệp, quyền đối với giống cây trồng và việc bảo hộ các quyền đó. Quy định rõ khung ràng buộc cho hàng hóa nhập khẩu có tính chất thương mại biên mậu.' },
      { title: 'Điều 2. Đối tượng áp dụng', content: 'Luật này áp dụng đối với tổ chức, cá nhân Việt Nam; tổ chức, cá nhân nước ngoài đáp ứng các điều kiện quy định tại Luật này và điều ước quốc tế mà Cộng hoà xã hội chủ nghĩa Việt Nam là thành viên.' },
      { title: 'Điều 3. Đối tượng quyền sở hữu trí tuệ', content: '1. Đối tượng quyền tác giả bao gồm tác phẩm văn học, nghệ thuật, khoa học; đối tượng quyền liên quan đến quyền tác giả bao gồm cuộc biểu diễn, bản ghi âm, ghi hình, chương trình phát sóng, tín hiệu vệ tinh mang chương trình được mã hoá.\n2. Đối tượng quyền sở hữu công nghiệp bao gồm sáng chế, kiểu dáng công nghiệp, thiết kế bố trí mạch tích hợp bán dẫn, bí mật kinh doanh, nhãn hiệu, tên thương mại và chỉ dẫn địa lý.' },
      { title: 'CHƯƠNG P. KIỂM SOÁT HẢI QUAN', content: '' },
      { title: 'Điều 211. Các hành vi xâm phạm quyền SHTT', content: 'Tổ chức, cá nhân thực hiện hành vi xâm phạm quyền SHTT với hàng hóa nhập lậu, chưa qua thông quan, làm giả bao bì, sẽ chịu chế tài tịch thu, tiêu hủy và có thể bị truy cứu trách nhiệm hình sự.' },
      { title: 'Điều 216. Biện pháp kiểm soát của cơ quan Hải quan', content: '1. Cơ quan hải quan tiếp nhận đơn yêu cầu bảo hộ từ chủ thể sở hữu và tiến hành các biện pháp giám sát tập trung hoặc ngẫu nhiên tại cửa khẩu.\n2. Việc tạm dừng thông quan để giám định không vượt quá 20 ngày làm việc.\n3. Chủ sở hữu tài sản hoặc người đại diện hợp pháp phải nộp chi phí lưu kho, bảo quản hàng hóa trong suốt thời gian nghị án theo biểu phí quy định của hải quan khu vực.' },
      { title: 'Điều 218. Xử lý hàng hóa giả mạo nhãn hiệu và hàng hóa xâm phạm quyền bản quyền', content: '1. Hàng hóa giả mạo nhãn hiệu và hàng hóa xâm phạm bản quyền bị coi là tang vật vi phạm hành chính, và sẽ bị tịch thu tiêu hủy theo quy định của pháp luật.\n2. Lực lượng hải quan có thẩm quyền đình chỉ phương tiện vận tải tham gia vào quá trình buôn lậu và cấu kết vận chuyển hàng hóa vi phạm SHTT.' }
    ],
    expertSummary: 'Luật SHTT 2022 đã nới rộng quyền hạn của Chi cục Hải quan trong việc chủ động thiết lập hàng rào rà soát. Điểm cốt lõi là sự bao trùm không chỉ nhãn hiệu (như trước 2019) mà cập nhật thêm kiểu dáng công nghiệp và bản quyền tác giả. Cán bộ hải quan cần lưu ý thời gian thụ lý đơn yêu cầu bảo hộ đã được rút gọn chỉ còn 20 ngày.'
  },
  {
    id: '2',
    title: 'Nghị định 65/2023/NĐ-CP hướng dẫn Luật SHTT về sở hữu công nghiệp',
    type: 'Nghị định',
    number: '65/2023/NĐ-CP',
    year: '2023',
    desc: 'Bản phân tích chi tiết biện pháp thi hành chế tài SHTT, xác lập quyền bảo vệ với sáng chế, nhãn hiệu và kiểu dáng công nghiệp.',
    agency: 'Chính phủ',
    status: 'active',
    articles: [
      { title: 'Chương I: Quy định thực tiễn', content: '' },
      { title: 'Điều 12. Phạm vi bảo hộ nhãn hiệu', content: 'Nghị định này định nghĩa rõ ranh giới các dấu hiệu trùng lắp, tương tự gây nhầm lẫn trên bao bì hàng hóa nhập khẩu.' },
      { title: 'Điều 45. Trình tự xác lập thủ tục', content: 'Mọi hàng hóa nhập khẩu nếu bị tình nghi, cơ quan hải quan có quyền tạm dừng thông quan tối đa 20 ngày làm việc để xác minh.' },
      { title: 'Điều 48. Đánh giá tính pháp lý của tài liệu', content: 'Yêu cầu các đơn vị liên quan nộp đủ giấy chứng nhận độc quyền hoặc hợp đồng chuyển giao công nghệ do Cục SHTT cấp phép. Hàng hóa không chứng minh được nguồn gốc bị liệt vào diện nghi ngờ bắt buộc.' }
    ],
    expertSummary: 'Nghị định 65/2023 cung cấp một "chiếc đũa thần" cho lực lượng hải quan qua Điều 45: Quyền được tạm dừng thông quan để xác minh. Doanh nghiệp giờ đây phải tự nộp phí lưu kho trong quá trình chờ giám định, giảm thiểu gánh nặng cho ngân sách hải quan nhà nước.'
  },
  {
    id: '3',
    title: 'Thông tư 13/2023/TT-BKHCN hướng dẫn Nghị định 65/2023',
    type: 'Thông tư',
    number: '13/2023/TT-BKHCN',
    year: '2023',
    desc: 'Trình tự, thủ tục thẩm định quyền sở hữu công nghiệp làm cơ sở rà soát hàng hóa vi phạm tại các chi cục Hải quan.',
    agency: 'Bộ KH&CN',
    status: 'partial',
    articles: [
      { title: 'Chương I. Thủ tục khiếu nại', content: '' },
      { title: 'Điều 5. Thẩm định hình thức', content: 'Quy định chi tiết các bước tiếp nhận hồ sơ khiếu nại SHTT, từ kiểm tra thực thể đến đối chiếu catalog. Hồ sơ phải được phân loại và thụ lý trong vòng 48 giờ làm việc kể từ khi nộp qua cổng DVCHQ.' },
      { title: 'Chương II. Phân loại và kết luận', content: '' },
      { title: 'Điều 8. Phân loại kỹ thuật', content: 'Xác định các phương pháp kỹ thuật được phép sử dụng tại bãi kiểm hóa để đối chứng vi phạm. Chỉ áp dụng các phân tích cảm quan đối với mặt hàng quần áo, giày dép hạng nhẹ.' },
      { title: 'Điều 12. Trích lục báo cáo', content: 'Sau quá trình thẩm định nhanh, hải quan khu vực bắt buộc xuất báo cáo điện tử kèm hình ảnh hiện trường.' }
    ],
    expertSummary: 'Đây là cẩm nang cầm tay của đội kiểm hóa. Thông tư 13 cung cấp bảng phân loại kỹ thuật, giúp phân biệt nhanh đâu là hàng nhái "fake loại 1" thông qua các tiêu chí đo lường vật lý (Được chi tiết hóa ở Điều 8).'
  },
  {
    id: '4',
    title: 'Nghị định 99/2013/NĐ-CP về xử phạt vi phạm hành chính trong lĩnh vực SHCN',
    type: 'Nghị định',
    number: '99/2013/NĐ-CP',
    year: '2013',
    desc: 'Khung quy định xử phạt vi phạm hành chính, tiền đề cho các chức năng cưỡng chế và tịch thu tang vật vi phạm của cán bộ hải quan.',
    agency: 'Chính phủ',
    status: 'active',
    articles: [
      { title: 'Chương I. NHỮNG QUY ĐỊNH CHUNG', content: '' },
      { title: 'Điều 1. Phạm vi điều chỉnh', content: 'Nghị định này quy định về hành vi vi phạm hành chính, hình thức, mức xử phạt, biện pháp khắc phục hậu quả, thẩm quyền và thủ tục xử phạt vi phạm hành chính trong lĩnh vực sở hữu công nghiệp.' },
      { title: 'Điều 2. Đối tượng bị xử phạt', content: '1. Tổ chức, cá nhân Việt Nam có hành vi vi phạm hành chính.\n2. Tổ chức, cá nhân nước ngoài có hành vi vi phạm hành chính trong mảng logistics quá cảnh.' },
      { title: 'Điều 3. Hình thức Xử phạt và Biện pháp khắc phục', content: '1. Phạt tiền từ 1.000.000 VND đến 500.000.000 VND.\n2. Hình thức xử phạt bổ sung: Tịch thu tang vật, phương tiện vi phạm hành chính, bao gồm container, xe tải trung chuyển. Đình chỉ hoạt động xuất nhập khẩu đối với doanh nghiệp từ 01 tháng đến 03 tháng.' },
      { title: 'Chương II. MỨC PHẠT VÀ THẨM QUYỀN HẢI QUAN', content: '' },
      { title: 'Điều 14. Vi phạm quy định về bảo vệ quyền SHTT', content: 'Phạt tiền từ 10.000.000 đồng đến 20.000.000 đồng đối với hành vi làm mang nhãn hiệu, chỉ dẫn địa lý, kiểu dáng công nghiệp, tên thương mại đã được bảo hộ lên hàng hoá, bao bì hàng hoá nhập khẩu nhằm mục đích kinh doanh.' },
      { title: 'Điều 15. Phạt tiền theo giá trị hàng hóa', content: 'Giá trị hàng hóa vi phạm được tính theo giá CIF (đối với hàng nhập khẩu) để làm căn cứ tính tiền phạt. Nếu hàng hóa vi phạm có giá trị trên 500 triệu đồng sẽ chuyển ngay hồ sơ sang cơ quan điều tra hình sự.' },
      { title: 'Chương III. THỦ TỤC VÀ ĐÌNH CHỈ', content: '' },
      { title: 'Điều 21. Thẩm quyền xử phạt của Hải quan', content: 'Lực lượng hải quan có thẩm quyền tạm dừng thông quan tại chỗ đối với hàng hóa bị tình nghi, không bắt buộc phải có lệnh của tòa án. Mọi tổn thất do dừng thông quan sai lệnh sẽ được cấu thành vào rủi ro nghiệp vụ.' }
    ],
    expertSummary: 'Nghị định 99/2013 vẫn là kim chỉ nam quan trọng nhất trong việc ra quyết định xử phạt vi phạm hành chính. Mức phạt tiền bám sát giá trị CIF của hàng hóa nhập khẩu là một điều khoản then chốt mà cán bộ hải quan cần đặc biệt lưu ý để tránh thất thoát án phí.'
  },
  {
    id: '5',
    title: 'Nghị định 17/2023/NĐ-CP hướng dẫn Luật SHTT về quyền tác giả',
    type: 'Nghị định',
    number: '17/2023/NĐ-CP',
    year: '2023',
    desc: 'Chi tiết hóa quyền tác giả và quyền liên quan, áp dụng cho quá trình giám sát hàng hóa xuất nhập khẩu, ấn phẩm văn hóa.',
    agency: 'Chính phủ',
    status: 'expired',
    articles: [
      { title: 'Chương I: Những khái niệm', content: '' },
      { title: 'Điều 1. Khái niệm quyền tác giả', content: 'Quyền tác giả áp dụng đối với hàng in ấn, xuất bản phẩm ngoại nhập, thiết bị công nghệ mang mã nguồn độc quyền.' },
      { title: 'Điều 8. Kiểm duyệt tác phẩm', content: 'Toàn bộ băng đĩa và văn hóa phẩm đục lậu qua biên giới sẽ được xếp vào vi phạm tác quyền nghiêm trọng, chịu xử lý 100% hình sự nếu số lượng trên 1000 bản sao.' }
    ],
    expertSummary: 'Cảnh báo: Nghị định 17/2023 đã lỗi thời trong một số quy định về bản quyền số học. Cần cẩn trọng khi áp dụng cho các phần mềm nhúng trong phần cứng nhập khẩu (như vi mạch ô tô).'
  },
  {
    id: '6',
    title: 'Thông tư 11/2015/TT-BKHCN hướng dẫn Nghị định 99/2013',
    type: 'Thông tư',
    number: '11/2015/TT-BKHCN',
    year: '2015',
    desc: 'Các diễn giải cụ thể về hành vi xâm phạm và áp dụng hình thức xử lý vi phạm sở hữu công nghiệp.',
    agency: 'Bộ KH&CN',
    status: 'expired',
    articles: [
      { title: 'Điều 4. Yếu tố xâm phạm', content: 'Định hình khái niệm tương tự đến mức gây nhầm lẫn trên bao bì thương phẩm.' }
    ],
    expertSummary: 'Văn bản đã hết hiệu lực. Khuyến nghị không sử dụng Thông tư 11/2015 làm căn cứ bắt giữ tại thời điểm hiện tại.'
  }
];

const STATS = [
  { label: 'Tổng văn bản rà soát', value: String(DOCUMENTS.length), icon: Database, color: 'text-blue-600', bg: 'bg-blue-100' },
  { label: 'Bộ luật hiện hành', value: String(DOCUMENTS.filter(d => d.type === 'Luật').length), icon: Scale, color: 'text-orange-600', bg: 'bg-orange-100' },
  { label: 'Nghị định liên quan', value: String(DOCUMENTS.filter(d => d.type === 'Nghị định').length), icon: ShieldCheck, color: 'text-emerald-600', bg: 'bg-emerald-100' },
  { label: 'Thông tư thi hành', value: String(DOCUMENTS.filter(d => d.type === 'Thông tư').length), icon: BookOpen, color: 'text-purple-600', bg: 'bg-purple-100' },
];

const FILTER_TYPES = ['Tất cả', 'Luật', 'Nghị định', 'Thông tư'];

function getStatusProps(status: 'active' | 'partial' | 'expired') {
   switch (status) {
      case 'active': return { label: 'Đang hiệu lực', className: 'bg-emerald-50 text-emerald-600 border-emerald-200', icon: CheckCircle };
      case 'partial': return { label: 'Sửa đổi 1 phần', className: 'bg-amber-50 text-amber-600 border-amber-200', icon: AlertTriangle };
      case 'expired': return { label: 'Hết hiệu lực', className: 'bg-slate-100 text-slate-500 border-slate-200', icon: History };
   }
}

export default function VanBanPhapLuat() {
  const [query, setQuery] = useState('');
  const [filterType, setFilterType] = useState('Tất cả');
  const [isSearching, setIsSearching] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [selectedDoc, setSelectedDoc] = useState<LawDocument | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const filteredDocs = DOCUMENTS.filter((doc) => {
    const matchType = filterType === 'Tất cả' || doc.type === filterType;
    const matchQuery = doc.title.toLowerCase().includes(query.toLowerCase()) || 
                       doc.number.toLowerCase().includes(query.toLowerCase()) ||
                       doc.desc.toLowerCase().includes(query.toLowerCase());
    return matchType && matchQuery;
  });

  const handleSearch = () => {
    setIsSearching(true);
    setTimeout(() => setIsSearching(false), 600);
  };

  if (!mounted) return null;

  return (
    <div className="flex flex-col min-h-screen bg-[#f1f5f9] -m-6 lg:-m-12 p-6 lg:p-10 space-y-8 max-w-[1600px] mx-auto font-sans">
      
      {/* ── HEADER KHÔNG GIAN CITADEL ── */}
      <div className="animate-fade-in-up bg-[#0a192f] rounded-3xl p-8 lg:p-12 shadow-2xl relative overflow-hidden border border-slate-800">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-orange-500/10 via-orange-500/5 to-transparent pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-orange-500/20 blur-[100px] rounded-full pointer-events-none" />
        
        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-orange-500 text-white text-[11px] font-bold uppercase tracking-wider rounded-full shadow-lg shadow-orange-500/30">
            <Sparkles className="w-3.5 h-3.5" />
            Trợ lý Pháp lý Điện tử
          </div>
          
          <h1 className="text-3xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
             Thư viện <span className="text-orange-500">Chuẩn Mực Pháp Lý</span>
          </h1>
          <p className="text-slate-400 text-base font-medium max-w-2xl mx-auto leading-relaxed">
             Truy xuất bộ khung pháp luật về Sở hữu Trí tuệ được liên kết trực tiếp với hoạt động giám sát thông quan của Tổng Cục Hải Quan.
          </p>

          <div className="flex flex-col md:flex-row gap-3 pt-6 max-w-3xl mx-auto relative">
            <div className="flex-1 relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-orange-500 transition-colors" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                placeholder="Nhập số ký hiệu, trích yếu hoặc cơ quan ban hành..."
                className="w-full pl-12 pr-4 py-4 bg-white/10 hover:bg-white/15 border border-white/20 rounded-2xl text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white/20 transition-all shadow-inner backdrop-blur-sm"
              />
            </div>
            <button 
              onClick={handleSearch} 
              disabled={isSearching} 
              className="bg-orange-600 hover:bg-orange-500 text-white font-bold px-8 py-4 rounded-2xl flex items-center justify-center gap-2 shadow-[0_8px_30px_rgb(234,88,12,0.3)] transition-all hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:hover:translate-y-0"
            >
              {isSearching ? <Loader2 className="w-5 h-5 animate-spin" /> : <Search className="w-5 h-5" />}
              TRA CỨU LẬP TỨC
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-fade-in-up delay-100">
        {STATS.map((stat, i) => (
          <div key={i} className="bg-white rounded-3xl p-6 border border-slate-200/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex items-center gap-5 hover:-translate-y-1 hover:shadow-xl transition-all duration-300 group">
             <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 ${stat.bg} ${stat.color} group-hover:scale-110 transition-transform duration-300`}>
                <stat.icon className="w-6 h-6" />
             </div>
             <div>
                <p className="text-[13px] font-bold text-slate-500 uppercase tracking-widest leading-none mb-1.5">{stat.label}</p>
                <p className="text-3xl font-extrabold text-[#0a192f]">{stat.value}</p>
             </div>
          </div>
        ))}
      </div>

      {/* ── DANH SÁCH & BỘ LỌC ── */}
      <div className="flex flex-col lg:flex-row gap-8 animate-fade-in-up delay-200">
        
        {/* Bộ lọc Sidebar */}
        <div className="w-full lg:w-64 shrink-0 space-y-6">
           <div className="bg-white rounded-3xl p-6 border border-slate-200/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] sticky top-8">
              <h3 className="text-[13px] font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                 <Filter className="w-4 h-4" /> BỘ LỌC VĂN BẢN
              </h3>
              <div className="space-y-2">
                 {FILTER_TYPES.map(type => (
                    <button
                       key={type}
                       onClick={() => setFilterType(type)}
                       className={`w-full text-left px-4 py-3 rounded-xl transition-all font-semibold flex items-center justify-between ${
                          filterType === type 
                             ? 'bg-[#0a192f] text-white shadow-md' 
                             : 'bg-slate-50 text-slate-600 hover:bg-slate-100 hover:text-[#0a192f]'
                       }`}
                    >
                       <span>{type}</span>
                       {filterType === type && <ChevronRight className="w-4 h-4" />}
                    </button>
                 ))}
              </div>

              <div className="pt-6 mt-6 border-t border-slate-100">
                 <div className="p-4 bg-orange-50 rounded-2xl border border-orange-100">
                    <p className="text-xs font-bold text-orange-800 leading-relaxed text-center mb-3">
                       AI đã được tích hợp để giải thích trực tiếp các thuật ngữ pháp lý.
                    </p>
                    <button className="w-full py-2 bg-white rounded-lg text-orange-600 font-bold text-xs hover:bg-orange-600 hover:text-white transition-colors border border-orange-200 hover:border-orange-600">
                       KÍCH HOẠT HỔ TRỢ AI
                    </button>
                 </div>
              </div>
           </div>
        </div>

        {/* Khung kết quả hiển thị Danh sách */}
        <div className="flex-1 bg-white rounded-3xl border border-slate-200/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden flex flex-col">
           <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <h2 className="text-lg font-bold text-[#0a192f] flex items-center gap-2">
                 <FileText className="w-5 h-5 text-orange-500" />
                 DANH MỤC TÀI LIỆU PHÁP LÝ
              </h2>
              <span className="px-3 py-1 bg-white border border-slate-200 rounded-full text-xs font-bold text-slate-500 shadow-sm">
                 HIỂN THỊ {filteredDocs.length} KẾT QUẢ
              </span>
           </div>

           <div className="flex-1 p-6 space-y-4">
              {isSearching ? (
                 <div className="flex flex-col items-center justify-center h-64 gap-4">
                    <Loader2 className="w-8 h-8 text-orange-500 animate-spin" />
                    <p className="text-sm font-bold text-slate-500">Đang đồng bộ dữ liệu thư viện...</p>
                 </div>
              ) : filteredDocs.length > 0 ? (
                 <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                    {filteredDocs.map((doc, idx) => {
                       const isLaw = doc.type === 'Luật';
                       const isDecree = doc.type === 'Nghị định';
                       const docStatus = getStatusProps(doc.status);
                       
                       return (
                          <div 
                             key={doc.id} 
                             className="group bg-white rounded-2xl border border-slate-200 p-5 hover:border-orange-300 hover:shadow-[0_8px_30px_rgb(234,88,12,0.1)] transition-all duration-300 flex flex-col relative"
                          >
                             {doc.status !== 'active' && (
                                <div className="absolute -top-3 -right-3 z-10">
                                   <div className={`px-3 py-1 rounded-full border shadow-sm flex items-center gap-1.5 text-xs font-bold ${docStatus.className}`}>
                                      <docStatus.icon className="w-3.5 h-3.5" />
                                      {docStatus.label}
                                   </div>
                                </div>
                             )}

                             <div className="flex items-start justify-between gap-4 mb-3 mt-2 lg:mt-0">
                                <div className="flex flex-wrap items-center gap-2">
                                   <span className={`px-2.5 py-1 rounded-md text-[10px] font-extrabold uppercase tracking-wider ${
                                      isLaw ? 'bg-red-50 text-red-600 border border-red-100' :
                                      isDecree ? 'bg-blue-50 text-blue-600 border border-blue-100' :
                                      'bg-purple-50 text-purple-600 border border-purple-100'
                                   }`}>
                                      {doc.type}
                                   </span>
                                   <span className="text-[11px] font-bold text-slate-400 bg-slate-50 border border-slate-100 px-2 py-0.5 rounded-md">
                                      Số: {doc.number}
                                   </span>
                                   <span className="text-[11px] font-bold text-slate-400 bg-slate-50 border border-slate-100 px-2 py-0.5 rounded-md">
                                      Năm {doc.year}
                                   </span>
                                </div>
                             </div>

                             <h3 className="text-[15px] font-bold text-[#0a192f] leading-snug group-hover:text-orange-600 transition-colors line-clamp-2 h-11 mb-2">
                                {doc.title}
                             </h3>
                             
                             <p className="text-sm text-slate-600 font-medium leading-relaxed line-clamp-3 mb-4 flex-1">
                                {doc.desc}
                             </p>

                             <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between">
                                <div className="flex items-center gap-1.5 text-xs font-bold text-slate-400 uppercase">
                                   <Database className="w-3.5 h-3.5" />
                                   Cơ quan: <span className="text-slate-600">{doc.agency}</span>
                                </div>

                                <div className="flex items-center gap-2">
                                   <button className="w-8 h-8 rounded-full bg-slate-50 hover:bg-slate-200 text-slate-500 hover:text-[#0a192f] flex items-center justify-center transition-colors">
                                      <Download className="w-4 h-4" />
                                   </button>
                                   <button 
                                      onClick={() => setSelectedDoc(doc)}
                                      className="px-4 py-1.5 bg-[#0a192f] hover:bg-orange-600 text-white text-xs font-bold rounded-full transition-colors flex items-center gap-1"
                                   >
                                      ĐỌC NGAY <ArrowRight className="w-3.5 h-3.5" />
                                   </button>
                                </div>
                             </div>
                          </div>
                       );
                    })}
                 </div>
              ) : (
                 <div className="flex flex-col items-center justify-center h-64 gap-4 bg-slate-50/50 rounded-2xl border border-slate-100">
                    <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mb-2">
                       <Search className="w-8 h-8 text-slate-300" />
                    </div>
                    <p className="text-lg font-bold text-[#0a192f]">Không tìm thấy văn bản phù hợp</p>
                    <p className="text-sm text-slate-500 font-medium">Vui lòng thử bộ lọc hoặc từ khóa tìm kiếm khác.</p>
                 </div>
              )}
           </div>
        </div>

      </div>

      {/* ── MODAL ĐỌC & TƯƠNG TÁC AI ── */}
      {selectedDoc && (
         <LegalDocumentAnalysisModal doc={selectedDoc} onClose={() => setSelectedDoc(null)} />
      )}
    </div>
  );
}

function TooltipWrapper({ children, content }: { children: React.ReactNode, content: string }) {
  const [show, setShow] = useState(false);
  return (
     <span 
        className="relative inline-block cursor-help font-bold text-orange-600 underline decoration-orange-300 decoration-dashed underline-offset-4 hover:bg-orange-50 transition-colors"
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
     >
        {children}
        {show && (
           <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 p-3 bg-[#0a192f] text-white text-xs font-medium rounded-xl shadow-xl z-50 text-left pointer-events-none border border-slate-700 after:content-[''] after:absolute after:top-full after:left-1/2 after:-translate-x-1/2 after:border-4 after:border-transparent after:border-t-[#0a192f]">
              <span className="block text-orange-400 font-bold mb-1.5 border-b border-slate-700 pb-1.5 flex items-center gap-1.5"><Search className="w-3.5 h-3.5" /> Trích xuất tự động:</span>
              {content}
           </span>
        )}
     </span>
  );
}

function LegalDocumentAnalysisModal({ doc, onClose }: { doc: LawDocument, onClose: () => void }) {
  const [activeTab, setActiveTab] = useState<'read' | 'expert' | 'summary' | 'chat' | 'diff'>('expert');
  const docStatus = getStatusProps(doc.status);
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState<{role: 'ai' | 'user', text: string}[]>([
    { role: 'ai', text: `Chào bạn, tôi là AI Pháp lý. Tôi đã đọc văn bản ${doc.number} (${doc.title}). Bạn có câu hỏi nào về các điều khoản, định nghĩa hay cách thức áp dụng không?` }
  ]);
  const [isChatLoading, setIsChatLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const handleExportPDF = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    const articlesHtml = doc.articles?.map(a => `
      <br/><p class="bold" style="color: #0a192f; margin-bottom: 2px;">${a.title}</p>
      ${a.content ? `<p>${a.content.replace(/\n/g, '<br/>')}</p>` : ''}
    `).join('') || '';

    printWindow.document.write(`
      <html><head><title>VanBan_${doc.number}</title><style>
         @page { margin: 2.5cm; }
         body { font-family: "Times New Roman", Times, serif; line-height: 1.6; font-size: 14pt; color: #000; }
         .header { text-align: center; font-weight: bold; margin-bottom: 2rem; }
         .header-line { width: 15rem; border-bottom: 1.5px solid #000; margin: 5px auto; }
         .title { text-align: center; font-size: 16pt; font-weight: bold; margin: 3rem 0; text-transform: uppercase;}
         .meta { display: flex; justify-content: space-between; font-style: italic; font-size: 13pt; margin-bottom: 2rem;}
         .content p { text-align: justify; margin-bottom: 1rem; }
         .bold { font-weight: bold; }
         .desc { background: #f9f9f9; padding: 15px; border-left: 4px solid #555; }
         .seal { text-align: center; float: right; margin-top: 50px; font-weight: bold; width: 40%;}
      </style></head>
      <body>
         <div class="header">
            CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM<br/>
            Độc lập - Tự do - Hạnh phúc
            <div class="header-line"></div>
         </div>
         <div class="meta">
            <div>Hà Nội, ngày ... tháng ... năm ${doc.year}</div>
            <div>Số: ${doc.number}</div>
         </div>
         <div class="title">${doc.title}</div>
         <div class="content">
            <p class="bold" style="text-decoration: underline;">TRÍCH YẾU NỘI DUNG:</p>
            <p class="desc">${doc.desc}</p>
            <p>Căn cứ các quy định hiện hành và thủ tục hải quan điện tử, hệ thống tự động ghi nhận văn bản pháp luật số <strong>${doc.number}</strong> do <strong>${doc.agency}</strong> ban hành nhằm tạo căn cứ xử lý nghiệp vụ sở hữu trí tuệ tại biên giới.</p>
            
            ${articlesHtml}

            <div class="seal">
               CƠ QUAN BAN HÀNH<br/>
               ${doc.agency.toUpperCase()}<br/><br/><br/>
               (Đã ký và Đóng dấu)
            </div>
         </div>
      </body></html>
    `);
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => { printWindow.print(); printWindow.close(); }, 500);
  };

  const handleExportReport = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    printWindow.document.write(`
      <html><head><title>BaoCaoChuyenGia_${doc.number}</title><style>
         @page { margin: 2.5cm; }
         body { font-family: Arial, sans-serif; line-height: 1.8; font-size: 14pt; color: #000; }
         .header { text-align: center; font-weight: bold; margin-bottom: 2rem; color: #1e3a8a; }
         .header-line { width: 10rem; border-bottom: 2px solid #1e3a8a; margin: 5px auto; }
         .title { text-align: center; font-size: 18pt; font-weight: bold; margin: 3rem 0; text-transform: uppercase; color: #000; }
         .content { text-align: justify; margin-bottom: 1rem; padding: 25px; background-color: #f8fafc; border-left: 6px solid #2563eb; }
         .meta { color: #64748b; font-style: italic; font-size: 12pt; text-align: right; margin-top: 60px; border-top: 1px dotted #cbd5e1; padding-top: 15px; }
      </style></head>
      <body>
         <div class="header">
            BÁO CÁO PHÂN TÍCH CHUYÊN GIA<br/>
            Hệ thống Khuyến nghị Điện tử Hải Quan
            <div class="header-line"></div>
         </div>
         <div class="title">TÀI LIỆU SỐ: ${doc.number}</div>
         <h4 style="color: #1e3a8a; margin-top: 0; text-transform: uppercase;">Nhận định thực tiễn:</h4>
         <div class="content">
            <p>${doc.expertSummary}</p>
         </div>
         <div class="meta">
            Trích xuất tự động qua luồng Nghiệp Vụ - AI Bot.<br/>
            Khuyến nghị này không thay thế chỉ đạo của cấp trên.
         </div>
      </body></html>
    `);
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => { printWindow.print(); printWindow.close(); }, 500);
  };

  const handleSendChat = () => {
     if (!chatInput.trim() || isChatLoading) return;
     const userMsg = chatInput;
     setChatInput('');
     setChatMessages(prev => [...prev, { role: 'user', text: userMsg }]);
     setIsChatLoading(true);
     setTimeout(() => chatEndRef.current?.scrollIntoView({ behavior: 'smooth' }), 50);

     setTimeout(() => {
        let aiResponse = "";
        const lowerInput = userMsg.toLowerCase();
        
        if (lowerInput.includes("điều") || lowerInput.includes("khoản")) {
           aiResponse = `Quy định cụ thể tại văn bản này thiết lập khung hướng dẫn chặt chẽ. Việc áp dụng điều khoản liên quan tới thủ tục hải quan được thi hành trực tiếp tại các cửa khẩu, đối soát với mã HS của hàng hóa.`;
        } else if (lowerInput.includes("hiệu lực") || lowerInput.includes("thời gian")) {
           aiResponse = `Văn bản ghi nhận năm ban hành là ${doc.year}. Đang trong giai đoạn có hiệu lực thi hành đầy đủ, áp dụng đối với tất cả cơ quan quản lý nhà nước về sở hữu trí tuệ và hải quan.`;
        } else {
           aiResponse = `Nội dung bạn đề cập ({${userMsg}}) chưa có định nghĩa rõ ràng trong phần trích lược của hệ thống. Tôi sẽ cần quét toàn văn văn bản ${doc.number} để phân tích sâu hơn. Bạn có muốn thực hiện việc đó không?`;
        }

        setChatMessages(prev => [...prev, { role: 'ai', text: aiResponse }]);
        setIsChatLoading(false);
        setTimeout(() => chatEndRef.current?.scrollIntoView({ behavior: 'smooth' }), 50);
     }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 lg:p-8 animate-fade-in-up" style={{ animationDuration: '0.2s' }}>
       <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={onClose} />
       
       <div className="relative bg-white w-full max-w-7xl h-full max-h-[90vh] rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-slate-200">
          
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50">
             <div className="flex items-center gap-4">
                <div className="flex flex-col">
                   <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 bg-[#0a192f] text-white text-[10px] font-bold rounded uppercase tracking-wider">{doc.number}</span>
                      <h2 className="text-lg font-extrabold text-[#0a192f] line-clamp-1">{doc.type} - {doc.agency}</h2>
                   </div>
                </div>
             </div>
             <div className="flex items-center gap-3">
                <button onClick={handleExportPDF} className="px-4 py-2 bg-orange-100 text-orange-700 hover:bg-orange-600 hover:text-white rounded-lg text-sm font-bold transition-colors flex items-center gap-2 group">
                   <Download className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" /> Xuất PDF
                </button>
                <button onClick={onClose} className="p-2 bg-white hover:bg-red-50 text-slate-400 hover:text-red-500 rounded-full transition-colors border border-slate-200">
                   <X className="w-5 h-5" />
                </button>
             </div>
          </div>

          <div className="flex flex-1 overflow-hidden">
             
             {/* LEFT SIDE: DOCUMENT VIEWER */}
             <div className="w-full lg:w-1/2 bg-[#f8fafc] border-r border-slate-200 relative p-6 overflow-y-auto custom-scrollbar">
                
                {doc.status !== 'active' && (
                   <div className="absolute top-8 right-8 z-10 flex flex-col items-end">
                      <div className={`px-4 py-1.5 rounded-lg border-2 shadow-lg flex items-center gap-2 text-sm font-bold bg-white ${doc.status === 'expired' ? 'text-slate-500 border-slate-300' : 'text-amber-600 border-amber-300'}`}>
                         <AlertTriangle className="w-5 h-5" />
                         CẢNH BÁO HIỆU LỰC: {docStatus.label.toUpperCase()}
                      </div>
                      <p className="text-[11px] font-bold text-slate-400 mt-2 bg-white px-3 py-1 rounded shadow-sm">
                         Cần ưu tiên áp dụng văn bản thay thế (nếu có).
                      </p>
                   </div>
                )}

                <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-10 min-h-[900px] mx-auto max-w-2xl relative font-serif">
                   <div className="border-b-[1.5px] border-slate-800 pb-5 mb-8 text-center space-y-1">
                      <h1 className="text-xl font-bold uppercase tracking-widest text-[#0a192f]">CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</h1>
                      <h2 className="text-sm font-bold mt-1.5">Độc lập - Tự do - Hạnh phúc</h2>
                      <div className="w-32 h-[1px] bg-slate-800 mx-auto mt-4"></div>
                   </div>
                   <div className="flex justify-between text-sm italic mb-10 text-slate-700">
                      <div>Hà Nội, ngày ... tháng ... năm {doc.year}</div>
                      <div>Số: {doc.number}</div>
                   </div>
                   <div className="text-center mb-8">
                      <h3 className="text-2xl font-bold text-[#0a192f] uppercase leading-tight">{doc.title}</h3>
                   </div>
                   <div className="space-y-6 text-justify text-slate-800 leading-loose text-[15px]">
                      <p className="font-bold underline">TRÍCH YẾU NỘI DUNG:</p>
                      <p className="bg-orange-50 p-4 border-l-4 border-orange-500 rounded-r-lg italic">{doc.desc}</p>
                      <p>
                         Căn cứ các quy định hiện hành và thủ tục hải quan điện tử, hệ thống tự động ghi nhận văn bản pháp luật số <strong>{doc.number}</strong> do <strong>{doc.agency}</strong> ban hành nhằm tạo căn cứ xử lý nghiệp vụ sở hữu trí tuệ tại biên giới.
                      </p>
                      
                      <div className="mt-8 space-y-4">
                         {doc.articles?.map((article, idx) => (
                           <div key={idx}>
                              <p className="font-bold cursor-pointer hover:text-orange-600 transition-colors">{article.title}</p>
                              <p>
                                 {article.content.split('hải quan').length > 1 ? (
                                     <>
                                        {article.content.split('hải quan')[0]}
                                        <TooltipWrapper content="Trực thuộc Tổng Cục Hải Quan và các cơ quan thi hành biên mậu cấp 1">hải quan</TooltipWrapper>
                                        {article.content.split('hải quan').slice(1).join('hải quan')}
                                     </>
                                 ) : article.content}
                              </p>
                           </div>
                         ))}
                         <div>
                            <p className="font-bold cursor-pointer hover:text-orange-600 transition-colors">Điều 15. Hiệu lực ứng dụng</p>
                            <p>
                               Toàn bộ văn bản trên đã được mã hóa vào <TooltipWrapper content="Liên thông Cổng TTĐT Dịch Covid và Cổng Dịch vụ công Quốc gia">hệ thống điện tử</TooltipWrapper> và áp dụng ngay từ thời điểm có hiệu lực. Mọi bản bổ sung sẽ được đính kèm ở Tab Đối Chiếu.
                            </p>
                         </div>
                      </div>

                      <div className="mt-16 flex justify-end">
                         <div className="text-center">
                            <p className="font-bold uppercase">{doc.agency}</p>
                            <div className="h-24 w-24 mx-auto rounded-full border-4 border-red-500/60 opacity-50 flex items-center justify-center rotate-[-15deg] mt-4 shadow-sm relative overflow-hidden">
                               <p className="text-[11px] font-bold text-red-600 tracking-wider">CHỨNG THỰC</p>
                            </div>
                         </div>
                      </div>
                   </div>
                </div>
             </div>

             {/* RIGHT SIDE: AI WORKSPACE */}
             <div className="w-full lg:w-1/2 flex flex-col bg-white">
                <div className="flex border-b border-slate-100 overflow-x-auto shrink-0 custom-scrollbar">
                   <button onClick={() => setActiveTab('read')} className={`px-6 py-4 text-xs font-bold uppercase tracking-wide border-b-2 transition-colors flex items-center gap-2 whitespace-nowrap ${activeTab === 'read' ? 'border-purple-500 text-purple-600' : 'border-transparent text-slate-400 hover:text-slate-600 hover:bg-slate-50'}`}>
                     <AlignLeft className="w-4 h-4" /> Bản Gốc
                   </button>
                   <button onClick={() => setActiveTab('expert')} className={`px-6 py-4 text-xs font-bold uppercase tracking-wide border-b-2 transition-colors flex items-center gap-2 whitespace-nowrap ${activeTab === 'expert' ? 'border-indigo-600 text-indigo-700' : 'border-transparent text-slate-400 hover:text-slate-600 hover:bg-slate-50'}`}>
                     <Sparkles className="w-4 h-4" /> Góc Chuyên Gia
                   </button>
                   <button onClick={() => setActiveTab('summary')} className={`px-6 py-4 text-xs font-bold uppercase tracking-wide border-b-2 transition-colors flex items-center gap-2 whitespace-nowrap ${activeTab === 'summary' ? 'border-orange-500 text-orange-600' : 'border-transparent text-slate-400 hover:text-slate-600 hover:bg-slate-50'}`}>
                     <Network className="w-4 h-4" /> Sơ đồ AI
                   </button>
                   <button onClick={() => setActiveTab('diff')} className={`px-6 py-4 text-xs font-bold uppercase tracking-wide border-b-2 transition-colors flex items-center gap-2 whitespace-nowrap ${activeTab === 'diff' ? 'border-amber-500 text-amber-600' : 'border-transparent text-slate-400 hover:text-slate-600 hover:bg-slate-50'}`}>
                     <History className="w-4 h-4" /> Đối chiếu Luật
                   </button>
                   <button onClick={() => setActiveTab('chat')} className={`px-6 py-4 text-xs font-bold uppercase tracking-wide border-b-2 transition-colors flex items-center gap-2 whitespace-nowrap ${activeTab === 'chat' ? 'border-blue-600 text-blue-700' : 'border-transparent text-slate-400 hover:text-slate-600 hover:bg-slate-50'}`}>
                     <Bot className="w-4 h-4" /> Trợ lý
                   </button>
                </div>

                <div className="flex-1 overflow-y-auto p-6 bg-white custom-scrollbar">
                   {activeTab === 'read' && (
                      <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 h-full overflow-y-auto animate-fade-in-up">
                         <div className="flex items-center justify-between mb-4">
                            <h3 className="font-bold text-[#0a192f] flex items-center gap-2"><Database className="w-5 h-5 text-orange-500" /> BẢN SỐ HÓA TOÀN VĂN</h3>
                            <span className="px-3 py-1 bg-green-100 text-green-700 text-[10px] font-bold rounded uppercase flex items-center gap-1">
                               <CheckCircle className="w-3 h-3" /> Đã Trích Xuất Gốc
                            </span>
                         </div>
                         <div className="space-y-4 font-sans text-sm text-slate-700 leading-loose text-justify pb-10">
                            <p>ĐÂY LÀ PHIÊN BẢN CÔNG CHỨNG ĐIỆN TỬ, đồng bộ hóa trực tiếp từ cơ sở dữ liệu Quốc Gia (vbdqg.gov.vn).</p>
                            <p className="font-bold text-black uppercase mt-4">VĂN BẢN TRÍCH XUẤT: {doc.number}</p>
                            
                            {doc.articles?.map((article, idx) => (
                               <div key={idx}>
                                  <strong className="text-black inline-block mt-4">{article.title}</strong>
                                  {article.content && (
                                     <p className="mt-1">
                                        {article.content.split('\n').map((line, i) => <span key={i}>{line}<br/></span>)}
                                     </p>
                                  )}
                               </div>
                            ))}
                            
                            <p className="italic text-slate-500 mt-8">(... Để xem đầy đủ các Chương, Mục khác, vui lòng Tải Bản Gốc hoặc [Xuất PDF])</p>
                         </div>
                      </div>
                   )}

                   {activeTab === 'expert' && (
                      <div className="h-full flex flex-col animate-fade-in-up space-y-6">
                         <div className="flex items-start gap-4 p-5 bg-indigo-50 border border-indigo-100 rounded-xl">
                            <div className="w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center shrink-0 shadow-lg shadow-indigo-600/30">
                               <Sparkles className="w-6 h-6 text-white" />
                            </div>
                            <div>
                               <h3 className="font-bold text-indigo-900 text-base mb-1">Tóm tắt & Khuyến nghị Chuyên gia</h3>
                               <p className="text-sm text-indigo-800 leading-relaxed">
                                  Hệ thống AI đã phân tích toàn văn bản số <strong>{doc.number}</strong> và đưa ra hướng dẫn áp dụng thực thi ngắn gọn dành riêng cho hải quan.
                               </p>
                            </div>
                         </div>
                         
                         <div className="flex-1 bg-white border border-slate-200 rounded-xl p-8 shadow-sm">
                            <h4 className="text-sm font-bold text-slate-400 mb-4 uppercase tracking-wider flex items-center gap-2">
                               <BookOpen className="w-4 h-4 text-indigo-500" /> Báo cáo Phân Tích Thực Tiễn
                            </h4>
                            <div className="text-slate-700 text-[15px] leading-loose text-justify font-sans p-6 bg-slate-50 rounded-xl border border-slate-100 italic">
                               "{doc.expertSummary}"
                            </div>
                            
                            <div className="mt-10 pt-6 border-t border-slate-100 flex items-center justify-between">
                               <span className="text-xs text-amber-600 font-bold bg-amber-50 px-3 py-1 rounded">Lưu ý: Khuyến nghị AI không thay thế chỉ đạo cấp trên.</span>
                            </div>
                         </div>
                         
                         <div className="flex justify-end p-2 pb-4">
                            <button onClick={handleExportReport} className="px-5 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-bold shadow-lg shadow-indigo-600/30 hover:bg-indigo-700 transition flex items-center gap-2 group">
                               <Download className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" /> Tải Xuống PDF Báo cáo
                            </button>
                         </div>
                      </div>
                   )}

                   {activeTab === 'summary' && (
                      <div className="space-y-8 animate-fade-in-up">
                         <div className="p-5 bg-orange-50 rounded-xl border border-orange-100 flex gap-4 items-start">
                            <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center shrink-0 shadow-lg shadow-orange-500/30">
                               <Zap className="w-5 h-5 text-white" />
                            </div>
                            <div>
                               <h3 className="font-bold text-orange-900 mb-1">Mục đích Hệ thống Biên mậu</h3>
                               <p className="text-sm text-orange-800 leading-relaxed">Văn bản này định hình phương pháp <strong>tịch thu và cưỡng chế vi phạm SHTT</strong> tại Hải quan. {doc.desc}</p>
                            </div>
                         </div>
                         
                         <div>
                            <h3 className="text-[#0a192f] font-bold text-sm uppercase tracking-wider mb-4 flex items-center gap-2">
                               <Network className="w-4 h-4 text-slate-400" /> Sơ đồ Logic (Mindmap)
                            </h3>
                            {/* Mock Mindmap Component using Tailwind Grid/Flex */}
                            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 relative overflow-hidden">
                               <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9IiNlMmU4ZjAiLz48L3N2Zz4=')] opacity-50" />
                               
                               <div className="relative z-10 flex flex-col items-center gap-6">
                                  {/* Root */}
                                  <div className="bg-[#0a192f] text-white px-5 py-3 rounded-xl shadow-lg border border-slate-700 font-bold text-center z-10 w-full max-w-xs">
                                     {doc.title}
                                  </div>
                                  
                                  {/* Connectors */}
                                  <div className="w-px h-8 bg-slate-300 absolute top-[52px]" />
                                  <div className="w-3/4 h-px bg-slate-300 absolute top-[84px]" />
                                  <div className="w-px h-6 bg-slate-300 absolute top-[84px] left-[12.5%]" />
                                  <div className="w-px h-6 bg-slate-300 absolute top-[84px] right-[12.5%]" />
                                  <div className="w-px h-6 bg-slate-300 absolute top-[84px] left-1/2" />

                                  {/* Level 1 Nodes */}
                                  <div className="grid grid-cols-3 gap-4 w-full pt-6">
                                     <div className="bg-white px-3 py-2.5 border-2 border-orange-500 rounded-xl shadow-sm text-center text-xs font-bold text-[#0a192f] relative">
                                        Quyền Đối Tượng
                                        <div className="w-px h-4 bg-slate-300 mx-auto -bottom-4 absolute left-1/2" />
                                     </div>
                                     <div className="bg-white px-3 py-2.5 border-2 border-blue-500 rounded-xl shadow-sm text-center text-xs font-bold text-[#0a192f] relative">
                                        Trình tự Thực thi
                                        <div className="w-px h-4 bg-slate-300 mx-auto -bottom-4 absolute left-1/2" />
                                     </div>
                                     <div className="bg-white px-3 py-2.5 border-2 border-red-500 rounded-xl shadow-sm text-center text-xs font-bold text-[#0a192f] relative">
                                        Hình thức Xử phạt
                                        <div className="w-px h-4 bg-slate-300 mx-auto -bottom-4 absolute left-1/2" />
                                     </div>
                                  </div>

                                  {/* Level 2 Nodes */}
                                  <div className="grid grid-cols-3 gap-4 w-full pt-1">
                                     <div className="bg-slate-100 px-2 py-2 border border-slate-200 rounded-lg text-center text-[10px] font-semibold text-slate-600">Sáng chế, Nhãn hiệu</div>
                                     <div className="bg-slate-100 px-2 py-2 border border-slate-200 rounded-lg text-center text-[10px] font-semibold text-slate-600">Đăng ký & Kiêm soát HQ</div>
                                     <div className="bg-slate-100 px-2 py-2 border border-slate-200 rounded-lg text-center text-[10px] font-semibold text-slate-600">Đình chỉ, Tiêu hủy hàng</div>
                                  </div>
                               </div>
                            </div>
                         </div>
                      </div>
                   )}

                   {activeTab === 'diff' && (
                      <div className="h-full flex flex-col animate-fade-in-up space-y-6">
                         <div className="flex items-center justify-between bg-slate-50 p-4 rounded-xl border border-slate-200">
                            <div className="flex items-center gap-3">
                               <History className="w-6 h-6 text-slate-400" />
                               <div>
                                  <h3 className="font-bold text-[#0a192f] text-sm">Đối chiếu sửa đổi điều khoản</h3>
                                  <p className="text-xs text-slate-500">So sánh bản gốc và bản bổ sung đối với văn bản {doc.number}</p>
                               </div>
                            </div>
                            <span className="px-3 py-1 bg-amber-100 text-amber-700 text-xs font-bold rounded-lg border border-amber-200">
                               2 Điểm Sửa Đổi
                            </span>
                         </div>
                         
                         <div className="flex-1 space-y-6">
                            {/* Version Header */}
                            <div className="grid grid-cols-2 gap-6 pb-2 border-b border-slate-100">
                               <div className="font-bold text-sm text-slate-400 uppercase">Luật SHTT Cũ (Trước 2022)</div>
                               <div className="font-bold text-sm text-emerald-600 uppercase">Luật Sửa Đổi Mới Nhất ({doc.year})</div>
                            </div>
                            
                            {/* Diff Item 1 */}
                            <div>
                               <p className="font-bold text-sm mb-3 text-[#0a192f] flex items-center gap-2"><CornerRightDown className="w-4 h-4" /> Điều 211. Các hành vi xâm phạm</p>
                               <div className="grid grid-cols-2 gap-6 text-sm font-serif leading-relaxed">
                                  <div className="p-4 bg-slate-50/50 rounded-lg border border-slate-200 text-slate-500">
                                     <p>...Thực hiện hành vi xâm phạm đối với <del className="bg-red-100 text-red-700 decoration-red-500 opacity-60">nhãn hiệu, chỉ dẫn địa lý</del> một cách cố ý...</p>
                                  </div>
                                  <div className="p-4 bg-emerald-50/30 rounded-lg border border-emerald-200 text-slate-800">
                                     <p>...Thực hiện hành vi xâm phạm đối với <ins className="bg-emerald-100 text-emerald-800 decoration-transparent">nhãn hiệu, chỉ dẫn địa lý, kiểu dáng công nghiệp và quyền tác giả</ins> một cách cố ý...</p>
                                  </div>
                               </div>
                            </div>

                            {/* Diff Item 2 */}
                            <div>
                               <p className="font-bold text-sm mb-3 text-[#0a192f] flex items-center gap-2"><CornerRightDown className="w-4 h-4" /> Về Mức Xử Phạt</p>
                               <div className="grid grid-cols-2 gap-6 text-sm font-serif leading-relaxed">
                                  <div className="p-4 bg-slate-50/50 rounded-lg border border-slate-200 text-slate-500">
                                     <p>Mức phạt tiền tối đa đối với tổ chức là <del className="bg-red-100 text-red-700 decoration-red-500 opacity-60">500 triệu đồng</del>.</p>
                                  </div>
                                  <div className="p-4 bg-emerald-50/30 rounded-lg border border-emerald-200 text-slate-800">
                                     <p>Mức phạt tiền tối đa đối với tổ chức là <ins className="bg-emerald-100 text-emerald-800 decoration-transparent">tùy thuộc vào khung vi phạm, có thể lên đến 5 lần giá trị hàng hóa vi phạm</ins>.</p>
                                  </div>
                               </div>
                            </div>
                         </div>
                      </div>
                   )}

                   {activeTab === 'chat' && (
                      <div className="h-full flex flex-col animate-fade-in-up">
                         <div className="flex-1 overflow-y-auto space-y-4 pb-4">
                            {chatMessages.map((msg, idx) => (
                               <div key={idx} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.role === 'ai' ? 'bg-[#0a192f]' : 'bg-orange-500'}`}>
                                     {msg.role === 'ai' ? <Bot className="w-4 h-4 text-white" /> : <User className="w-4 h-4 text-white" />}
                                  </div>
                                  <div className={`p-3.5 rounded-2xl shadow-sm border max-w-[85%] ${
                                     msg.role === 'ai' 
                                        ? 'bg-white border-slate-200 rounded-tl-none' 
                                        : 'bg-[#0a192f] text-white border-slate-800 rounded-tr-none'
                                  }`}>
                                     <p className="text-sm leading-relaxed font-medium">{msg.text}</p>
                                  </div>
                               </div>
                            ))}
                            {isChatLoading && (
                               <div className="flex gap-3">
                                  <div className="w-8 h-8 rounded-full bg-[#0a192f] flex items-center justify-center shrink-0">
                                     <Bot className="w-4 h-4 text-white" />
                                  </div>
                                  <div className="bg-white p-3.5 rounded-2xl rounded-tl-none shadow-sm border border-slate-200 flex items-center gap-2">
                                     <Loader2 className="w-4 h-4 text-orange-500 animate-spin" />
                                     <span className="text-xs text-slate-500 font-bold uppercase tracking-wider">ĐANG PHÂN TÍCH...</span>
                                  </div>
                               </div>
                            )}
                            <div ref={chatEndRef} />
                         </div>
                         <div className="relative mt-4 shrink-0">
                            <input 
                               value={chatInput}
                               onChange={(e) => setChatInput(e.target.value)}
                               onKeyDown={(e) => e.key === 'Enter' && handleSendChat()}
                               type="text" 
                               placeholder="VD: Điều kiện xử phạt tiền là bao nhiêu..."
                               className="w-full pl-4 pr-12 py-4 bg-white border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent font-medium shadow-sm transition-all"
                            />
                            <button 
                               onClick={handleSendChat}
                               disabled={!chatInput.trim() || isChatLoading}
                               className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-orange-600 hover:bg-orange-500 disabled:bg-slate-300 disabled:cursor-not-allowed text-white rounded-lg transition-all"
                            >
                               <Send className="w-4 h-4" />
                            </button>
                         </div>
                      </div>
                   )}
                </div>
             </div>
          </div>

       </div>
    </div>
  );
}
