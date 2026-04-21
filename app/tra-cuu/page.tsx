'use client';

import { useState, useEffect, useRef } from 'react';
import { Search, FileText, Download, Info, AlertTriangle, Loader2, Filter, Sparkles, ChevronRight, X, Bot, FileSearch, Zap, Send, User } from 'lucide-react';

interface Document {
  id: string;
  code: string;
  name: string;
  type: string;
  date: string;
  description: string;
  filename?: string;
}

const FILTER_TYPES = [
  { value: 'all', label: 'Tất cả' },
  { value: 'Gia hạn', label: 'Gia hạn' },
  { value: 'Cấp mới', label: 'Cấp mới' },
  { value: 'Vi phạm', label: 'Vi phạm' },
];

export default function TraCuu() {
  const [query, setQuery] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [results, setResults] = useState<Document[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [mounted, setMounted] = useState(false);
  
  // Selected Document for Deep Analysis Modal
  const [selectedDoc, setSelectedDoc] = useState<Document | null>(null);

  useEffect(() => {
    setMounted(true);
    fetchDocuments();
  }, []);

  const fetchDocuments = async (search?: string, type?: string) => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (search) params.set('q', search);
      if (type && type !== 'all') params.set('type', type);
      const res = await fetch(`/api/documents?${params}`);
      const data = await res.json();
      setResults(data.documents || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    if (!query && filterType === 'all') {
      handleClearSearch();
      return;
    }
    setHasSearched(true);
    fetchDocuments(query, filterType);
  };

  const handleClearSearch = () => {
    setQuery('');
    setFilterType('all');
    setHasSearched(false);
    fetchDocuments();
  };

  const viphams = results.filter(d => d.type === 'Vi phạm').slice(0, 3);
  const capmois = results.filter(d => d.type === 'Cấp mới' || d.type === 'Thông tư').slice(0, 3);
  const giahans = results.filter(d => d.type === 'Gia hạn').slice(0, 3);

  if (!mounted) return null;

  return (
    <div className="flex flex-col min-h-screen bg-[#f1f5f9] -m-6 lg:-m-12 p-6 lg:p-10 space-y-8 max-w-[1600px] mx-auto font-sans">
      
      {/* ── TIÊU ĐỀ & THANH TÌM KIẾM ── */}
      <div className="animate-fade-in-up bg-[#0a192f] rounded-3xl p-8 lg:p-12 shadow-2xl relative overflow-hidden border border-slate-800">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-orange-500/10 to-transparent pointer-events-none" />
        
        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-orange-500 text-white text-[11px] font-bold uppercase tracking-wider rounded-full shadow-lg shadow-orange-500/30">
            <Sparkles className="w-3.5 h-3.5" />
            Trợ lý Tìm kiếm cốt lõi
          </div>
          
          <h1 className="text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
             Thư viện <span className="text-orange-500">Phân tích Hệ thống</span>
          </h1>
          <p className="text-slate-400 text-sm lg:text-base font-medium">
             Nhập mã hồ sơ hoặc chọn phân loại trực quan để rà soát dữ liệu thuộc quyền giám sát của bạn.
          </p>

          <div className="flex flex-col md:flex-row gap-3 pt-4 max-w-3xl mx-auto relative">
            <div className="flex-1 relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-orange-500 transition-colors" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                placeholder="Nhập mã công văn, tên nhãn hiệu hoặc đặc điểm vi phạm..."
                className="w-full pl-12 pr-12 py-4 bg-white/10 hover:bg-white/15 border border-white/20 rounded-2xl text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white/20 transition-all shadow-inner backdrop-blur-sm"
              />
              {hasSearched && (
                 <button 
                   onClick={handleClearSearch}
                   className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white px-2 py-1 text-xs font-bold bg-slate-800 rounded-lg transition-colors border border-slate-600"
                 >
                    XÓA BỘ LỌC
                 </button>
              )}
            </div>
            <button 
              onClick={handleSearch} 
              disabled={loading} 
              className="bg-orange-600 hover:bg-orange-500 text-white font-bold px-8 py-4 rounded-2xl flex items-center justify-center gap-2 shadow-[0_8px_30px_rgb(234,88,12,0.3)] transition-all hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:hover:translate-y-0"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Search className="w-5 h-5" />}
              TRA CỨU
            </button>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-2 pt-2">
            <span className="text-sm font-semibold text-slate-400 mr-2 flex items-center gap-1.5"><Filter className="w-4 h-4" /> TRUY CẬP NHANH:</span>
            {FILTER_TYPES.map((f) => (
              <button
                key={f.value}
                onClick={() => {
                   setFilterType(f.value);
                   setHasSearched(true);
                   fetchDocuments(query, f.value);
                }}
                className={`px-4 py-1.5 rounded-full text-[13px] font-bold transition-all border ${
                  filterType === f.value
                    ? 'bg-blue-600 text-white border-blue-500 shadow-lg shadow-blue-500/20'
                    : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700 hover:text-white'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── NỘI DUNG HIỂN THỊ ── */}
      <div className="animate-fade-in-up delay-200">
        
        {loading ? (
          <div className="bg-white rounded-3xl p-16 flex flex-col items-center gap-4 border border-slate-200/60 shadow-sm mt-8">
            <Loader2 className="w-10 h-10 animate-spin text-orange-500" />
            <p className="text-sm font-bold text-slate-500">Đang quét toàn hệ thống DB...</p>
          </div>
        ) : hasSearched ? (
          <div className="space-y-6">
             <div className="flex items-center justify-between px-1">
               <div className="flex items-center gap-3">
                  <div className="w-1.5 h-6 bg-orange-500 rounded-full" />
                  <h2 className="text-lg font-bold text-[#0a192f] uppercase tracking-wide">
                    Kết quả tìm kiếm cho "{query || filterType}"
                  </h2>
               </div>
               <span className="px-3 py-1 bg-white border border-slate-200 rounded-full text-xs font-bold text-slate-500 shadow-sm">
                 {results.length} HỒ SƠ TÌM THẤY
               </span>
             </div>

             {results.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {results.map((doc, i) => (
                    <DocCard key={doc.id} doc={doc} index={i} onClick={() => setSelectedDoc(doc)} />
                  ))}
                </div>
             ) : (
                <div className="bg-white rounded-3xl p-16 text-center space-y-4 border border-slate-200/60 shadow-sm hover:shadow-lg transition-shadow">
                  <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-2">
                     <AlertTriangle className="w-8 h-8 text-red-500" />
                  </div>
                  <p className="text-xl font-bold text-[#0a192f]">Không tìm thấy hồ sơ khớp mẫu</p>
                  <p className="text-sm text-slate-500 font-medium max-w-sm mx-auto">
                    Trợ lý AI không rà quét được dữ liệu. Vui lòng thử từ khóa/mã khác.
                  </p>
                  <button onClick={handleClearSearch} className="mt-4 px-6 py-2.5 bg-[#0a192f] hover:bg-slate-800 text-white font-bold text-sm rounded-xl transition-colors shadow-lg">
                     Quay lại Bảng phân loại
                  </button>
                </div>
             )}
          </div>
        ) : (
          <div className="space-y-12">
             {viphams.length > 0 && (
                <div className="space-y-5 bg-red-50/50 p-6 lg:p-8 rounded-3xl border border-red-100">
                   <div className="flex items-center justify-between px-1">
                      <div className="flex items-center gap-3">
                         <div className="w-2 h-6 bg-red-500 rounded-full" />
                         <div>
                            <h2 className="text-lg font-bold text-red-700 uppercase tracking-wide">
                              Hồ sơ Vi phạm Cần xử lý kíp thời
                            </h2>
                            <p className="text-xs text-red-500/80 font-semibold mt-0.5">Top danh sách nghi ngờ phát hiện mới nhất</p>
                         </div>
                      </div>
                      <button onClick={() => {setFilterType('Vi phạm'); handleSearch();}} className="text-xs font-bold text-red-600 hover:text-red-700 flex items-center gap-1 group">
                         XEM TẤT CẢ VI PHẠM <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </button>
                   </div>
                   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                     {viphams.map((doc, i) => (
                       <DocCard key={doc.id} doc={doc} index={i} onClick={() => setSelectedDoc(doc)} customBorder="border-red-200 hover:border-red-500 shadow-[0_8px_30px_rgb(239,68,68,0.1)]" />
                     ))}
                   </div>
                </div>
             )}

             {capmois.length > 0 && (
                <div className="space-y-5 p-2">
                   <div className="flex items-center justify-between px-1">
                      <div className="flex items-center gap-3">
                         <div className="w-2 h-6 bg-blue-600 rounded-full" />
                         <div>
                            <h2 className="text-lg font-bold text-[#0a192f] uppercase tracking-wide">
                              Hồ sơ Cấp Mới / Thông tư
                            </h2>
                            <p className="text-xs text-slate-500 font-semibold mt-0.5">Dữ liệu sở hữu trí tuệ vừa cập nhật vào kho</p>
                         </div>
                      </div>
                      <button onClick={() => {setFilterType('Cấp mới'); handleSearch();}} className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 group">
                         XEM TẤT CẢ TÀI LIỆU <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </button>
                   </div>
                   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                     {capmois.map((doc, i) => (
                       <DocCard key={doc.id} doc={doc} index={i} onClick={() => setSelectedDoc(doc)} />
                     ))}
                   </div>
                </div>
             )}

             {giahans.length > 0 && (
                <div className="space-y-5 p-2">
                   <div className="flex items-center justify-between px-1">
                      <div className="flex items-center gap-3">
                         <div className="w-2 h-6 bg-emerald-500 rounded-full" />
                         <div>
                            <h2 className="text-lg font-bold text-[#0a192f] uppercase tracking-wide">
                              Quy trình Gia hạn Thương hiệu
                            </h2>
                            <p className="text-xs text-slate-500 font-semibold mt-0.5">Các nhãn hiệu vừa được gia hạn tại điểm hải quan</p>
                         </div>
                      </div>
                      <button onClick={() => {setFilterType('Gia hạn'); handleSearch();}} className="text-xs font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1 group">
                         XEM TẤT CẢ GIA HẠN <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </button>
                   </div>
                   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                     {giahans.map((doc, i) => (
                       <DocCard key={doc.id} doc={doc} index={i} onClick={() => setSelectedDoc(doc)} customBorder="border-emerald-100 hover:border-emerald-500" />
                     ))}
                   </div>
                </div>
             )}
          </div>
        )}
      </div>

      {/* ── AI DOCUMENT ANALYSIS WORKSPACE (MODAL) ── */}
      {selectedDoc && (
         <DocumentAnalysisModal doc={selectedDoc} onClose={() => setSelectedDoc(null)} />
      )}

    </div>
  );
}

function DocCard({ doc, index, onClick, customBorder }: { doc: Document, index: number, onClick: () => void, customBorder?: string }) {
  const formatDate = (d: string) => {
    if (d.length >= 8) return `${d.slice(0,2)}/${d.slice(2,4)}/${d.slice(4)}`;
    return d;
  };
  
  const delayClass = index % 3 === 0 ? 'delay-100' : index % 3 === 1 ? 'delay-200' : 'delay-300';
  const isWarning = doc.type === 'Vi phạm';

  return (
    <div 
      onClick={onClick}
      className={`animate-fade-in-up ${delayClass} bg-white rounded-2xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border ${customBorder || 'border-slate-200/60'} flex flex-col gap-4 group hover:-translate-y-1 hover:shadow-xl hover:border-orange-400 transition-all duration-300 cursor-pointer`}
    >
      <div className="flex items-center justify-between">
        <span className={`px-2.5 py-1 rounded-md text-[10px] font-extrabold uppercase tracking-wider ${
           isWarning 
             ? 'bg-red-50 text-red-600 border border-red-100' 
             : doc.type === 'Cấp mới' 
                ? 'bg-blue-50 text-blue-600 border border-blue-100'
                : 'bg-emerald-50 text-emerald-600 border border-emerald-100'
        }`}>
          {doc.type}
        </span>
        <span className="text-[11px] font-bold text-slate-400 bg-slate-50 px-2 py-0.5 rounded-full border border-slate-100">{formatDate(doc.date)}</span>
      </div>

      <div className="space-y-3 flex-1 mt-2">
        <div className="inline-block px-2 py-1 bg-slate-100 rounded-md text-[11px] font-bold text-slate-500 uppercase tracking-wide">
          ID: {doc.code}
        </div>
        <h3 className="text-base font-extrabold text-[#0a192f] leading-snug line-clamp-2 mt-1">{doc.name}</h3>
        <p className="text-sm text-slate-600 font-medium line-clamp-3 leading-relaxed">{doc.description}</p>
      </div>

      <div className="flex items-center gap-3 pt-4 border-t border-slate-100 mt-2">
        <button className="flex-1 px-4 py-2.5 bg-blue-50 hover:bg-blue-600 text-blue-700 hover:text-white text-xs font-bold rounded-xl transition-colors flex items-center justify-center gap-2 group/btn">
          <FileSearch className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
          PHÂN TÍCH AI
        </button>
      </div>
    </div>
  );
}

function DocumentAnalysisModal({ doc, onClose }: { doc: Document, onClose: () => void }) {
  const [activeTab, setActiveTab] = useState<'summary' | 'chat'>('summary');
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState<{role: 'ai' | 'user', text: string}[]>([
    { role: 'ai', text: `Tôi là chuyên gia AI SHTT. Tôi đã đọc xong toàn bộ văn bản ${doc.code} (Nhãn hiệu: ${doc.name}). Bạn cần tôi tìm kiếm thông tin, bảng biểu hay giải thích điều khoản nào trong hồ sơ này?` }
  ]);
  const [isChatLoading, setIsChatLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // KÍCH HOẠT XUẤT PDF
  const handleExportPDF = () => {
    if (doc.filename) {
       const link = document.createElement('a');
       link.href = `/documents/${doc.filename}`;
       link.download = doc.filename;
       link.click();
       return;
    }

    const printWindow = window.open('', '_blank', 'width=800,height=900');
    if (!printWindow) return;
    
    printWindow.document.write(`
      <html>
        <head>
          <title>Export_PDF_${doc.code}</title>
          <style>
             @page { margin: 2cm; }
             body { font-family: 'Times New Roman', Times, serif; line-height: 1.5; color: #000; }
             .header { text-align: center; margin-bottom: 2rem; }
             .header h1 { font-size: 16pt; margin: 0; padding: 0; }
             .header h2 { font-size: 14pt; margin: 5px 0 0 0; border-bottom: 1px solid #000; display: inline-block; padding-bottom: 5px; }
             .title { text-align: center; font-size: 16pt; font-weight: bold; margin: 2rem 0; text-transform: uppercase; }
             .content-block { margin-bottom: 1.5rem; text-align: justify; }
             .table-info { width: 100%; border-collapse: collapse; margin-top: 2rem; }
             .table-info th, .table-info td { border: 1px solid #000; padding: 8px; text-align: left; }
             .footer { margin-top: 4rem; text-align: right; }
          </style>
        </head>
        <body>
           <div class="header">
              <h1>CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</h1>
              <h2>Độc lập - Tự do - Hạnh phúc</h2>
           </div>
           
           <div class="title">
              QUYẾT ĐỊNH / CHỨNG NHẬN<br/>
              Về việc: ${doc.type} - ${doc.name}
           </div>

           <div class="content-block">
             <strong>Kính gửi:</strong> Các đơn vị hải quan trực thuộc và các phòng ban nghiệp vụ liên quan.
           </div>

           <div class="content-block">
             Căn cứ Luật Hải quan số 54/2014/QH13 ngày 23/06/2014;<br/>
             Căn cứ Luật Sở hữu trí tuệ số 50/2005/QH11 (sửa đổi, bổ sung 2022);<br/>
             Căn cứ Nghị định số 99/2013/NĐ-CP ngày 29/08/2013 của Chính phủ quy định xử phạt vi phạm hành chính trong lĩnh vực sở hữu công nghiệp;
           </div>

           <div class="content-block">
             Theo hồ sơ thẩm định hệ thống, chi tiết văn bản được ghi nhận tại cơ sở dữ liệu Trung tâm với các dữ liệu khai thác như sau:
             <br/><br/>
             ${doc.description}
           </div>

           <table class="table-info">
             <tr>
               <th width="30%">Mã định danh (ID)</th>
               <td>${doc.code}</td>
             </tr>
             <tr>
               <th>Tên Hồ Sơ / Nhãn Hiệu</th>
               <td>${doc.name}</td>
             </tr>
             <tr>
               <th>Phân Loại Thẩm Định</th>
               <td>${doc.type}</td>
             </tr>
             <tr>
               <th>Ngày Hiệu Lực / Cập Nhật</th>
               <td>${doc.date}</td>
             </tr>
           </table>

           <div class="footer">
             <em>Hệ thống AI bóc tách tự động</em><br/>
             <strong>Tổng Cục Hải Quan</strong>
           </div>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => {
      printWindow.print();
      printWindow.close();
    }, 250);
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
        
        if (lowerInput.includes("phạt") || lowerInput.includes("vi phạm") || lowerInput.includes("trách nhiệm")) {
           aiResponse = `Dựa trên văn bản ${doc.code}, hiện trạng ${doc.type} đối với nhãn hiệu ${doc.name} bị ràng buộc bởi các quy định xử phạt tại Nghị định 99/2013/NĐ-CP. Bất kỳ hành vi xâm phạm quyền Sở hữu công nghiệp sẽ bị xử lý hình sự hoặc hành chính tùy mức độ hạch toán vi phạm.`;
        } else if (lowerInput.includes("gia hạn") || lowerInput.includes("thời gian") || lowerInput.includes("hạn")) {
           aiResponse = `Hệ thống ghi nhận thời điểm hiệu lực là ${doc.date}. Theo luật định, quyền bảo hộ kéo dài 10 năm và được quyền gia hạn vô thời hạn (mỗi lần 10 năm). Chủ sở hữu phải nộp đơn trong vòng 6 tháng trước ngày hết hạn.`;
        } else if (lowerInput.includes("tóm tắt") || lowerInput.includes("nội dung")) {
           aiResponse = `Tóm lược tự động: Văn bản này (${doc.code}) thiết lập quy trình kiểm soát hải quan tại khẩu cho nhãn hiệu ${doc.name}. Mục đích chính: ${doc.description}. Được lưu trữ dưới dạng ${doc.type}.`;
        } else if (lowerInput.includes("ai") || lowerInput.includes("người") || lowerInput.includes("ở đâu")) {
           aiResponse = `Văn bản được điều phối trực tiếp bởi Tổng Cục Hải Quan với việc chia cổng dữ liệu cho các chi cục cửa khẩu trên toàn quốc theo dõi trực tiếp biên mậu.`;
        } else {
           aiResponse = `Hệ thống không tìm thấy điều kiện khớp trực tiếp trong văn bản số ${doc.code}. Tuy nhiên, dữ liệu thuộc khung ${doc.type} được kế thừa từ các quy định SHTT hiện hành. Tôi có thể thực thi tra cứu chéo sang cơ sở dữ liệu WIPO nếu bạn yêu cầu.`;
        }

        setChatMessages(prev => [...prev, { 
           role: 'ai', 
           text: aiResponse 
        }]);
        setIsChatLoading(false);
        setTimeout(() => chatEndRef.current?.scrollIntoView({ behavior: 'smooth' }), 50);
     }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 lg:p-8 animate-fade-in-up" style={{ animationDuration: '0.2s' }}>
       <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={onClose} />
       
       <div className="relative bg-white w-full max-w-7xl h-full max-h-[90vh] rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-slate-200">
          
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50">
             <div className="flex items-center gap-4">
                <div className="flex flex-col">
                   <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 bg-[#0a192f] text-white text-[10px] font-bold rounded uppercase tracking-wider">{doc.code}</span>
                      <h2 className="text-lg font-extrabold text-[#0a192f] line-clamp-1">{doc.name}</h2>
                   </div>
                   <p className="text-xs text-slate-500 font-medium mt-1">Nguồn: Cơ sở dữ liệu Cục Hải Quan • Phân loại: {doc.type}</p>
                </div>
             </div>
             <div className="flex items-center gap-3">
                <button 
                  onClick={handleExportPDF}
                  className="px-4 py-2 bg-orange-100 text-orange-700 hover:bg-orange-600 hover:text-white rounded-lg text-sm font-bold transition-colors flex items-center gap-2 group"
                >
                   <Download className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" /> Xuất PDF
                </button>
                <button onClick={onClose} className="p-2 bg-white hover:bg-red-50 text-slate-400 hover:text-red-500 rounded-full transition-colors border border-slate-200">
                   <X className="w-5 h-5" />
                </button>
             </div>
          </div>

          <div className="flex flex-1 overflow-hidden">
             
             <div className="w-full lg:w-1/2 bg-[#f8fafc] border-r border-slate-200 relative">
                <div className="w-full h-full overflow-y-auto p-6 custom-scrollbar">
                      <div className="bg-white rounded-xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] border border-slate-200 p-10 min-h-[900px] mx-auto max-w-2xl relative">
                         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rotate-[-45deg] opacity-[0.03] pointer-events-none z-0">
                            <span className="text-9xl font-black whitespace-nowrap">BẢN LƯU TRỮ</span>
                         </div>
                         <div className="relative z-10">
                            <div className="border-b-[1.5px] border-slate-800 pb-5 mb-8">
                               <h1 className="text-xl font-bold text-center uppercase tracking-widest text-[#0a192f] font-serif">CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</h1>
                               <h2 className="text-sm font-bold text-center mt-1.5 font-serif">Độc lập - Tự do - Hạnh phúc</h2>
                            </div>
                            <div className="mt-8">
                               <h3 className="text-2xl font-bold text-[#0a192f] text-center mb-4 uppercase leading-snug font-serif">
                                  {doc.type === 'Vi phạm' ? 'QUYẾT ĐỊNH XỬ PHẠT VI PHẠM SỞ HỮU TRÍ TUỆ' : 
                                   doc.type === 'Gia hạn' ? 'CHỨNG NHẬN GIA HẠN BẢO HỘ TẠI HẢI QUAN' : 
                                   'THÔNG BÁO TIẾP NHẬN BẢO HỘ SỞ HỮU TRÍ TUỆ'}
                               </h3>
                               <p className="text-center font-bold text-slate-800 mb-10 text-lg">{doc.name}</p>
                               <div className="space-y-5 text-justify text-slate-800 leading-relaxed font-serif text-[15px]">
                                  <p><strong>Kính gửi:</strong> Các đơn vị hải quan trực thuộc và các cơ quan chức năng có thẩm quyền.</p>
                                  <p className="italic">
                                    Căn cứ Luật Hải quan số 54/2014/QH13 ngày 23 tháng 6 năm 2014;<br/>
                                    Căn cứ Luật Sở hữu trí tuệ số 50/2005/QH11 (sửa đổi, bổ sung);<br/>
                                    Căn cứ Nghị định số 99/2013/NĐ-CP của Chính phủ quy định xử phạt vi phạm hành chính trong lĩnh vực sở hữu công nghiệp.
                                  </p>
                                  <p>Hệ thống giám sát điện tử của Tổng cục Hải Quan chính thức ghi nhận và lưu trữ toàn bộ văn bản gốc liên quan. Chi tiết nội dung như sau:</p>
                                  <div className="pl-4 border-l-4 border-orange-500 bg-orange-50/50 p-4 my-6 italic text-slate-700">
                                     "{doc.description}"
                                  </div>
                                  <p>Các cơ quan, tổ chức, cá nhân có liên quan chịu trách nhiệm thi hành văn bản này. Mọi phát sinh trong quá trình rà soát cửa khẩu cần được đối chiếu trực tiếp vào mã định danh của hệ thống.</p>
                                  <div className="mt-12 py-6 border-t border-slate-200">
                                     <table className="w-full text-left">
                                        <tbody>
                                           <tr>
                                              <td className="w-1/2 align-top">
                                                <p className="font-bold mb-1">NƠI NHẬN:</p>
                                                <ul className="list-disc pl-5 text-sm text-slate-600 space-y-1">
                                                   <li>Như trên;</li>
                                                   <li>Lưu đồ DB Hải quan;</li>
                                                   <li>Kho lưu trữ điện tử ({doc.code}).</li>
                                                </ul>
                                              </td>
                                              <td className="w-1/2 align-top text-center">
                                                <p className="font-bold mb-16">CHẤP THUẬN KÝ CHỮ KÝ SỐ</p>
                                                <div className="w-24 h-24 rounded-full border-[3px] border-red-500/80 mx-auto flex items-center justify-center rotate-[-15deg] opacity-80 mt-[-10px]">
                                                   <div className="text-center">
                                                      <p className="text-[10px] font-bold text-red-600 uppercase">ĐÃ DUYỆT</p>
                                                      <p className="text-[8px] text-red-500">{doc.date}</p>
                                                   </div>
                                                </div>
                                              </td>
                                           </tr>
                                        </tbody>
                                     </table>
                                  </div>
                               </div>
                            </div>
                         </div>
                      </div>
                   </div>
             </div>

             <div className="w-full lg:w-1/2 flex flex-col bg-white">
                <div className="flex border-b border-slate-100">
                   <button 
                      onClick={() => setActiveTab('summary')}
                      className={`flex-1 py-4 text-sm font-bold uppercase tracking-wide border-b-2 transition-colors flex justify-center items-center gap-2 ${activeTab === 'summary' ? 'border-orange-500 text-orange-600' : 'border-transparent text-slate-400 hover:text-slate-600 hover:bg-slate-50'}`}
                   >
                     <Zap className="w-4 h-4" /> AI Tóm tắt
                   </button>
                   <button 
                      onClick={() => setActiveTab('chat')}
                      className={`flex-1 py-4 text-sm font-bold uppercase tracking-wide border-b-2 transition-colors flex justify-center items-center gap-2 ${activeTab === 'chat' ? 'border-blue-600 text-blue-700' : 'border-transparent text-slate-400 hover:text-slate-600 hover:bg-slate-50'}`}
                   >
                     <Bot className="w-4 h-4" /> Hỏi đáp Tài liệu
                   </button>
                </div>

                <div className="flex-1 overflow-y-auto p-6 bg-white">
                   {activeTab === 'summary' && (
                      <div className="space-y-6 animate-fade-in-up">
                         <div className="p-5 bg-orange-50 rounded-xl border border-orange-100">
                            <h3 className="text-orange-800 font-bold mb-2 flex items-center gap-2">
                               <Sparkles className="w-4 h-4" /> Nhận định Quan trọng
                            </h3>
                            <p className="text-sm text-orange-900/80 leading-relaxed font-medium">Hồ sơ này chứa các thông tin pháp lý bắt buộc phải tuân thủ nghiêm ngặt trong quy trình rà soát cửa khẩu. Đặc biệt lưu ý đến các danh mục hàng hóa cấu thành tính chất của phân loại <strong>{doc.type}</strong>.</p>
                         </div>
                         
                         <div>
                            <h3 className="text-[#0a192f] font-bold text-sm uppercase tracking-wider mb-3">Thực thể chính (Entities)</h3>
                            <div className="flex flex-wrap gap-2">
                               <span className="px-3 py-1.5 bg-slate-100 border border-slate-200 rounded-lg text-sm font-semibold text-slate-700">{doc.name}</span>
                               <span className="px-3 py-1.5 bg-slate-100 border border-slate-200 rounded-lg text-sm font-semibold text-slate-700">Quy trình {doc.type}</span>
                               <span className="px-3 py-1.5 bg-slate-100 border border-slate-200 rounded-lg text-sm font-semibold text-slate-700">Xử lý cổng HQ điện tử</span>
                            </div>
                         </div>
                         
                         <div>
                            <h3 className="text-[#0a192f] font-bold text-sm uppercase tracking-wider mb-3">Tóm tắt Thông tin Bảng</h3>
                            <div className="border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                               <table className="w-full text-left text-sm">
                                  <thead className="bg-[#0a192f] text-white">
                                     <tr>
                                        <th className="px-4 py-3 font-semibold w-1/3">Tiêu chí</th>
                                        <th className="px-4 py-3 font-semibold">Giá trị Trích xuất AI</th>
                                     </tr>
                                  </thead>
                                  <tbody className="divide-y divide-slate-100">
                                     <tr>
                                        <td className="px-4 py-3 font-medium text-slate-500">Mã Số Định Danh</td>
                                        <td className="px-4 py-3 font-bold text-[#0a192f]">{doc.code}</td>
                                     </tr>
                                     <tr>
                                        <td className="px-4 py-3 font-medium text-slate-500">Trạng thái Cấp phép</td>
                                        <td className="px-4 py-3 font-bold text-[#0a192f]">{doc.type}</td>
                                     </tr>
                                     <tr>
                                        <td className="px-4 py-3 font-medium text-slate-500">Khung Pháp Lý</td>
                                        <td className="px-4 py-3 font-bold text-blue-600">Nghị định 99/2013/NĐ-CP</td>
                                     </tr>
                                     <tr>
                                        <td className="px-4 py-3 font-medium text-slate-500">Ngày Hiệu lực</td>
                                        <td className="px-4 py-3 font-bold text-[#0a192f]">{doc.date}</td>
                                     </tr>
                                  </tbody>
                               </table>
                            </div>
                         </div>
                      </div>
                   )}

                   {activeTab === 'chat' && (
                      <div className="h-full flex flex-col animate-fade-in-up">
                         <div className="flex-1 bg-slate-50 rounded-xl border border-slate-200 p-4 mb-4 overflow-y-auto space-y-4 shadow-inner">
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
                         <div className="relative mt-auto">
                            <input 
                               value={chatInput}
                               onChange={(e) => setChatInput(e.target.value)}
                               onKeyDown={(e) => e.key === 'Enter' && handleSendChat()}
                               type="text" 
                               placeholder="Ví dụ: Chỉ ra các điều khoản quy định mức phạt..."
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
