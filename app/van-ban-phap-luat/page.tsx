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
  pdfFile?: string;
}

const DOCUMENTS: LawDocument[] = [
  // ── LUẬT SỞ HỮU TRÍ TUỆ ──────────────────────────────────────────
  {
    id: '1',
    title: 'Luật Sở hữu trí tuệ 2005 (Luật số 50/2005/QH11)',
    type: 'Luật',
    number: '50/2005/QH11',
    year: '2005',
    desc: 'Văn bản gốc thiết lập toàn bộ khung pháp lý về quyền tác giả, quyền sở hữu công nghiệp và quyền đối với giống cây trồng tại Việt Nam. Nền tảng pháp lý cốt lõi cho hoạt động kiểm soát SHTT tại biên giới hải quan.',
    agency: 'Quốc hội',
    status: 'partial',
    pdfFile: '/van-ban/50_2005_QH11.pdf',
    articles: [
      { title: 'Điều 1. Phạm vi điều chỉnh', content: 'Quy định về quyền tác giả, quyền liên quan đến quyền tác giả, quyền sở hữu công nghiệp, quyền đối với giống cây trồng và việc bảo hộ các quyền đó.' },
      { title: 'Điều 74. Nhãn hiệu được bảo hộ', content: 'Nhãn hiệu được bảo hộ nếu đáp ứng các điều kiện: có khả năng phân biệt hàng hóa, dịch vụ của chủ sở hữu với hàng hóa, dịch vụ của chủ thể khác.' },
      { title: 'Điều 211. Các hành vi xâm phạm quyền SHTT', content: 'Tổ chức, cá nhân thực hiện hành vi xâm phạm quyền SHTT sẽ bị xử lý bằng biện pháp dân sự, hành chính hoặc hình sự tùy theo tính chất, mức độ vi phạm.' },
      { title: 'Điều 216. Biện pháp kiểm soát hàng hóa tại biên giới', content: 'Chủ thể quyền SHTT có quyền yêu cầu cơ quan hải quan tạm dừng làm thủ tục hải quan đối với hàng hóa bị nghi ngờ xâm phạm quyền SHTT.' },
    ],
    expertSummary: 'Luật SHTT 2005 là nền tảng, đã được sửa đổi nhiều lần (2009, 2019, 2022, 2025). Khi tra cứu, cần đối chiếu với các luật sửa đổi bổ sung mới nhất để áp dụng đúng điều khoản hiện hành.'
  },
  {
    id: '2',
    title: 'Luật sửa đổi, bổ sung Luật SHTT năm 2019 (Luật số 42/2019/QH14)',
    type: 'Luật',
    number: '42/2019/QH14',
    year: '2019',
    desc: 'Sửa đổi, bổ sung một số điều của Luật SHTT 2005, tập trung vào quyền tác giả và quyền liên quan, đặc biệt các quy định về môi trường số và thương mại điện tử.',
    agency: 'Quốc hội',
    status: 'partial',
    pdfFile: '/van-ban/42_2019_QH14.pdf',
    articles: [
      { title: 'Khoản sửa đổi liên quan quyền tác giả', content: 'Bổ sung quy định về quyền tác giả trong môi trường số, quyền phân phối trực tuyến và trách nhiệm của nhà cung cấp dịch vụ trung gian.' },
      { title: 'Quy định về thực thi quyền', content: 'Tăng cường cơ chế phối hợp giữa cơ quan hải quan và cơ quan SHTT trong kiểm soát hàng hóa vi phạm tại cửa khẩu.' },
    ],
    expertSummary: 'Luật 42/2019 chủ yếu điều chỉnh quyền tác giả, ít tác động trực tiếp đến kiểm soát biên giới. Tuy nhiên, các quy định về thực thi quyền tại Điều 73a được vận dụng trong kiểm tra hàng hóa kỹ thuật số nhập khẩu.'
  },
  {
    id: '3',
    title: 'Luật sửa đổi, bổ sung Luật SHTT năm 2022 (Luật số 07/2022/QH15)',
    type: 'Luật',
    number: '07/2022/QH15',
    year: '2022',
    desc: 'Sửa đổi toàn diện Luật SHTT, mở rộng đáng kể phạm vi bảo hộ nhãn hiệu, kiểu dáng công nghiệp và tăng thẩm quyền kiểm soát biên giới của Hải quan.',
    agency: 'Quốc hội',
    status: 'partial',
    pdfFile: '/van-ban/07_2022_QH15.pdf',
    articles: [
      { title: 'Điều 1. Các nội dung sửa đổi chính', content: 'Sửa đổi 102 điều, bổ sung 12 điều mới. Trọng tâm: mở rộng đối tượng bảo hộ, đơn giản hóa thủ tục, tăng cường thực thi.' },
      { title: 'Điều 74. Nhãn hiệu nổi tiếng', content: 'Bổ sung các tiêu chí xác định nhãn hiệu nổi tiếng, tạo cơ sở pháp lý vững chắc hơn cho việc từ chối hàng nhái nhãn hiệu nổi tiếng tại cửa khẩu.' },
      { title: 'Điều 216. Biện pháp kiểm soát biên giới', content: 'Nới rộng quyền hạn của Hải quan: chủ động phát hiện, tạm dừng thông quan không cần đơn yêu cầu trong trường hợp vi phạm rõ ràng.' },
    ],
    expertSummary: 'Luật 07/2022 là bước ngoặt quan trọng: lần đầu tiên cho phép Hải quan chủ động tạm dừng thông quan mà không cần đơn yêu cầu của chủ thể quyền. Cán bộ cần nắm rõ Điều 216 mới để vận dụng đúng thẩm quyền.'
  },
  {
    id: '4',
    title: 'Luật sửa đổi, bổ sung Luật SHTT năm 2025 (Luật số 131/2025/QH15)',
    type: 'Luật',
    number: '131/2025/QH15',
    year: '2025',
    desc: 'Văn bản pháp lý mới nhất về SHTT năm 2025, cập nhật các quy định phù hợp với các cam kết quốc tế và thực tiễn thương mại hiện đại.',
    agency: 'Quốc hội',
    status: 'active',
    pdfFile: '/van-ban/131_2025_QH15.pdf',
    articles: [
      { title: 'Nội dung sửa đổi năm 2025', content: 'Bổ sung, hoàn thiện các quy định về bảo hộ SHTT trong bối cảnh chuyển đổi số, thương mại điện tử xuyên biên giới và các hiệp định thương mại tự do thế hệ mới.' },
      { title: 'Quy định về kiểm soát biên giới', content: 'Cập nhật cơ chế phối hợp giữa cơ quan hải quan, cơ quan SHTT và chủ thể quyền trong xử lý hàng hóa vi phạm SHTT tại cửa khẩu.' },
    ],
    expertSummary: 'Luật 131/2025 là văn bản pháp lý SHTT mới nhất, hiện đang có hiệu lực. Ưu tiên áp dụng luật này khi xử lý các vụ việc phát sinh từ năm 2025 trở đi.'
  },

  // ── NGHỊ ĐỊNH HƯỚNG DẪN LUẬT SHTT ────────────────────────────────
  {
    id: '5',
    title: 'Nghị định 65/2023/NĐ-CP hướng dẫn Luật SHTT về sở hữu công nghiệp',
    type: 'Nghị định',
    number: '65/2023/NĐ-CP',
    year: '2023',
    desc: 'Chi tiết hóa các quy định về xác lập, thực thi quyền sở hữu công nghiệp (nhãn hiệu, sáng chế, kiểu dáng công nghiệp). Văn bản hướng dẫn trực tiếp phục vụ nghiệp vụ kiểm soát SHTT tại biên giới.',
    agency: 'Chính phủ',
    status: 'active',
    pdfFile: '/van-ban/65_2023_ND-CP.pdf',
    articles: [
      { title: 'Điều 12. Phạm vi bảo hộ nhãn hiệu', content: 'Xác định rõ ranh giới nhãn hiệu trùng lặp, tương tự gây nhầm lẫn trên bao bì hàng hóa nhập khẩu — căn cứ trực tiếp để cán bộ hải quan xác định vi phạm.' },
      { title: 'Điều 45. Tạm dừng thông quan', content: 'Hàng hóa nhập khẩu bị nghi ngờ vi phạm SHTT: cơ quan hải quan có quyền tạm dừng thông quan tối đa 20 ngày làm việc để xác minh.' },
      { title: 'Điều 48. Đánh giá hồ sơ bảo hộ', content: 'Yêu cầu chủ thể quyền nộp giấy chứng nhận đăng ký nhãn hiệu, hợp đồng li-xăng hoặc tài liệu chứng minh quyền sở hữu hợp pháp.' },
    ],
    expertSummary: 'Nghị định 65/2023 là văn bản hướng dẫn cốt lõi cho nghiệp vụ kiểm soát SHCN tại biên giới. Điều 45 về tạm dừng thông quan 20 ngày là công cụ pháp lý quan trọng nhất cán bộ hải quan cần nắm vững.'
  },
  {
    id: '6',
    title: 'Nghị định 17/2023/NĐ-CP hướng dẫn Luật SHTT về quyền tác giả',
    type: 'Nghị định',
    number: '17/2023/NĐ-CP',
    year: '2023',
    desc: 'Hướng dẫn chi tiết về quyền tác giả và quyền liên quan, áp dụng cho hàng hóa xuất nhập khẩu là ấn phẩm, phần mềm, sản phẩm văn hóa có quyền tác giả.',
    agency: 'Chính phủ',
    status: 'active',
    pdfFile: '/van-ban/17_2023_ND-CP.pdf',
    articles: [
      { title: 'Điều 1. Phạm vi điều chỉnh', content: 'Áp dụng với tác phẩm văn học, nghệ thuật, khoa học; bản ghi âm, ghi hình; chương trình phát sóng nhập khẩu qua các cửa khẩu.' },
      { title: 'Điều 8. Quy định về hàng hóa vi phạm bản quyền', content: 'Hàng hóa sao chép, giả mạo bản quyền nhập khẩu với số lượng lớn được xử lý hình sự theo quy định của Bộ luật hình sự.' },
    ],
    expertSummary: 'Nghị định 17/2023 đặc biệt quan trọng khi xử lý hàng hóa là ấn phẩm, phần mềm, nhạc, phim lậu nhập khẩu. Phối hợp với Cục Bản quyền tác giả khi cần giám định.'
  },
  {
    id: '7',
    title: 'Nghị định 100/2026/NĐ-CP hướng dẫn Luật SHTT năm 2025',
    type: 'Nghị định',
    number: '100/2026/NĐ-CP',
    year: '2026',
    desc: 'Nghị định hướng dẫn thi hành Luật SHTT sửa đổi năm 2025, cập nhật các quy trình thực thi phù hợp với thực tiễn mới.',
    agency: 'Chính phủ',
    status: 'active',
    pdfFile: '/van-ban/100_2026_ND-CP.pdf',
    articles: [
      { title: 'Quy định hướng dẫn mới nhất', content: 'Chi tiết hóa các điều khoản của Luật SHTT 2025, đặc biệt các quy định về kiểm soát hàng hóa xuyên biên giới trong môi trường thương mại điện tử.' },
    ],
    expertSummary: 'Nghị định 100/2026 là văn bản hướng dẫn mới nhất, đang có hiệu lực. Ưu tiên áp dụng cùng với Luật 131/2025 cho các vụ việc từ năm 2026.'
  },
  {
    id: '8',
    title: 'Nghị định 134/2026/NĐ-CP hướng dẫn Luật SHTT năm 2025',
    type: 'Nghị định',
    number: '134/2026/NĐ-CP',
    year: '2026',
    desc: 'Nghị định hướng dẫn bổ sung các quy định chi tiết về thực thi quyền SHTT, xử lý hàng hóa vi phạm tại biên giới theo Luật SHTT 2025.',
    agency: 'Chính phủ',
    status: 'active',
    pdfFile: '/van-ban/134_2026_ND-CP.pdf',
    articles: [
      { title: 'Quy định thực thi mới nhất', content: 'Bổ sung, hoàn thiện quy trình phối hợp giữa Hải quan, Cục SHTT và cơ quan thực thi pháp luật trong xử lý vi phạm SHTT tại cửa khẩu.' },
    ],
    expertSummary: 'Nghị định 134/2026 ban hành kèm Nghị định 100/2026 tạo thành bộ hướng dẫn toàn diện cho Luật SHTT 2025. Cần đọc song song cả hai nghị định khi xử lý vụ việc mới.'
  },

  // ── NGHỊ ĐỊNH XỬ PHẠT VI PHẠM HÀNH CHÍNH SHTT ────────────────────
  {
    id: '9',
    title: 'Nghị định 99/2013/NĐ-CP xử phạt VPHC trong lĩnh vực sở hữu công nghiệp',
    type: 'Nghị định',
    number: '99/2013/NĐ-CP',
    year: '2013',
    desc: 'Khung xử phạt vi phạm hành chính trong lĩnh vực SHCN — nền tảng pháp lý cho cưỡng chế, tịch thu tang vật và xử phạt tiền đối với hàng hóa vi phạm SHTT tại cửa khẩu.',
    agency: 'Chính phủ',
    status: 'partial',
    pdfFile: '/van-ban/99_2013_ND-CP.pdf',
    articles: [
      { title: 'Điều 1. Phạm vi điều chỉnh', content: 'Quy định hành vi vi phạm, hình thức, mức xử phạt và thẩm quyền xử phạt vi phạm hành chính trong lĩnh vực sở hữu công nghiệp.' },
      { title: 'Điều 14. Vi phạm về nhãn hiệu', content: 'Phạt tiền từ 10 - 20 triệu đồng với hành vi gắn nhãn hiệu đã bảo hộ lên hàng hóa, bao bì nhập khẩu không được phép. Phạt nặng hơn nếu vi phạm có tổ chức.' },
      { title: 'Điều 15. Phạt theo giá trị CIF', content: 'Hàng hóa vi phạm trên 500 triệu đồng (giá CIF) → chuyển hồ sơ sang cơ quan điều tra hình sự.' },
      { title: 'Điều 21. Thẩm quyền xử phạt của Hải quan', content: 'Cơ quan hải quan có thẩm quyền tạm dừng thông quan tại chỗ với hàng bị tình nghi mà không cần lệnh tòa án.' },
    ],
    expertSummary: 'Nghị định 99/2013 đã được sửa đổi bởi NĐ 126/2021 và NĐ 46/2024. Khi xử phạt phải tra cứu văn bản hợp nhất 01/VBHN-BKHCN để áp dụng mức phạt cập nhật nhất.'
  },
  {
    id: '10',
    title: 'Nghị định 126/2021/NĐ-CP sửa đổi Nghị định 99/2013/NĐ-CP',
    type: 'Nghị định',
    number: '126/2021/NĐ-CP',
    year: '2021',
    desc: 'Sửa đổi, bổ sung một số điều của Nghị định 99/2013, điều chỉnh mức phạt tiền và bổ sung hành vi vi phạm mới trong bối cảnh thương mại điện tử phát triển.',
    agency: 'Chính phủ',
    status: 'active',
    pdfFile: '/van-ban/126_2021_ND-CP.pdf',
    articles: [
      { title: 'Điều 1. Sửa đổi mức phạt', content: 'Tăng mức phạt tiền tối đa lên phù hợp với giá trị hàng hóa vi phạm hiện nay. Bổ sung hành vi vi phạm SHTT qua thương mại điện tử.' },
      { title: 'Biện pháp bổ sung', content: 'Bổ sung biện pháp tịch thu phương tiện, đình chỉ kinh doanh áp dụng với đơn vị tái phạm nhiều lần.' },
    ],
    expertSummary: 'Đọc NĐ 126/2021 cùng NĐ 99/2013 và NĐ 46/2024. Văn bản hợp nhất 01/VBHN-BKHCN là tài liệu tra cứu nhanh nhất khi cần xác định mức phạt áp dụng.'
  },
  {
    id: '11',
    title: 'Nghị định 46/2024/NĐ-CP sửa đổi Nghị định 99/2013/NĐ-CP',
    type: 'Nghị định',
    number: '46/2024/NĐ-CP',
    year: '2024',
    desc: 'Sửa đổi, bổ sung mới nhất đối với Nghị định 99/2013 về xử phạt VPHC lĩnh vực SHCN — cập nhật mức phạt và bổ sung các hành vi vi phạm trong bối cảnh hiện nay.',
    agency: 'Chính phủ',
    status: 'active',
    pdfFile: '/van-ban/46_2024_ND-CP.pdf',
    articles: [
      { title: 'Điều 1. Sửa đổi bổ sung mới nhất 2024', content: 'Cập nhật mức phạt tối đa và bổ sung các hành vi vi phạm mới, đặc biệt liên quan đến hàng nhái nhãn hiệu nổi tiếng và hàng giả xuất xứ.' },
    ],
    expertSummary: 'NĐ 46/2024 là bản sửa đổi mới nhất (tính đến 2024). Khi xử phạt vi phạm, áp dụng NĐ 46/2024 cùng với văn bản hợp nhất 01/VBHN-BKHCN để có mức phạt chính xác nhất.'
  },
  {
    id: '12',
    title: 'Văn bản hợp nhất 01/VBHN-BKHCN — Nghị định xử phạt VPHC lĩnh vực SHCN',
    type: 'Nghị định',
    number: '01/VBHN-BKHCN',
    year: '2024',
    desc: 'Văn bản hợp nhất toàn bộ NĐ 99/2013, NĐ 126/2021 và NĐ 46/2024 — tài liệu tra cứu nhanh nhất và đầy đủ nhất để xác định mức xử phạt hiện hành.',
    agency: 'Bộ KH&CN',
    status: 'active',
    pdfFile: '/van-ban/01_VBHN-BKHCN.pdf',
    articles: [
      { title: 'Toàn bộ khung xử phạt hợp nhất', content: 'Tích hợp tất cả sửa đổi từ NĐ 99/2013, NĐ 126/2021, NĐ 46/2024 thành một văn bản thống nhất, dễ tra cứu.' },
      { title: 'Mức phạt cập nhật đầy đủ', content: 'Bảng mức phạt đầy đủ theo từng hành vi vi phạm, thẩm quyền xử phạt của từng cấp hải quan và biện pháp bổ sung.' },
    ],
    expertSummary: 'Đây là tài liệu tra cứu ƯU TIÊN khi xác định mức xử phạt. Thay vì đọc 3 nghị định riêng lẻ, cán bộ hải quan nên dùng văn bản hợp nhất này để có thông tin đầy đủ và chính xác nhất.'
  },

  // ── VĂN BẢN CHỈ ĐẠO CỤC HẢI QUAN ───────────────────────────────
  {
    id: '13',
    title: 'Kế hoạch kiểm soát chống buôn lậu hàng giả, SHTT năm 2026',
    type: 'Văn bản chỉ đạo',
    number: 'KH-CHQ/2026',
    year: '2026',
    desc: 'Kế hoạch tổng thể của Cục Hải quan về kiểm soát chống buôn lậu hàng giả và vi phạm SHTT năm 2026 — định hướng hoạt động và phân công nhiệm vụ cho toàn ngành.',
    agency: 'Cục Hải quan',
    status: 'active',
    pdfFile: '/van-ban/KH_KSCBL_SHTT_2026.pdf',
    articles: [
      { title: 'Mục tiêu năm 2026', content: 'Tăng cường phát hiện, xử lý hàng giả, hàng vi phạm SHTT tại các cửa khẩu trọng điểm. Phối hợp với các lực lượng thực thi pháp luật trong và ngoài nước.' },
      { title: 'Phân công nhiệm vụ', content: 'Giao chỉ tiêu cụ thể cho từng Chi cục Hải quan; tăng cường tập huấn nghiệp vụ nhận biết hàng giả, hàng vi phạm SHTT.' },
    ],
    expertSummary: 'Kế hoạch năm 2026 xác định các mặt hàng trọng điểm cần giám sát đặc biệt (thuốc lá, hàng hiệu, thiết bị điện tử). Cán bộ cần nắm rõ chỉ tiêu và lĩnh vực ưu tiên của đơn vị mình.'
  },
  {
    id: '14',
    title: 'Chỉ thị 02/CT-TTg ngày 30/01/2026 về tăng cường thực thi quyền SHTT',
    type: 'Văn bản chỉ đạo',
    number: '02/CT-TTg',
    year: '2026',
    desc: 'Chỉ thị của Thủ tướng Chính phủ về tăng cường thực thi quyền SHTT, chống hàng giả, hàng nhái — văn bản chỉ đạo cấp cao nhất định hướng toàn ngành.',
    agency: 'Thủ tướng Chính phủ',
    status: 'active',
    pdfFile: '/van-ban/02_CT-TTg_2026.pdf',
    articles: [
      { title: 'Chỉ đạo toàn diện về thực thi SHTT', content: 'Yêu cầu các bộ, ngành, địa phương tăng cường phối hợp liên ngành trong kiểm soát, xử lý hàng hóa vi phạm SHTT, đặc biệt tại các cửa khẩu và thị trường nội địa.' },
      { title: 'Nhiệm vụ cho Cục Hải quan', content: 'Tăng cường kiểm tra, giám sát hàng hóa XNK có dấu hiệu vi phạm SHTT; hoàn thiện cơ chế tiếp nhận đơn yêu cầu bảo hộ từ doanh nghiệp.' },
    ],
    expertSummary: 'Chỉ thị 02/CT-TTg 2026 là mệnh lệnh hành chính cấp cao nhất về thực thi SHTT. Mọi hoạt động kiểm soát SHTT tại biên giới đều cần bám sát định hướng của văn bản này.'
  },
  {
    id: '15',
    title: 'Chỉ thị 7988/CT-TCHQ ngày 25/12/2019 — Chống gian lận xuất xứ, nhãn hiệu hàng hóa',
    type: 'Văn bản chỉ đạo',
    number: '7988/CT-TCHQ',
    year: '2019',
    desc: 'Chỉ thị của Tổng Cục Hải quan về tăng cường các giải pháp đồng bộ chống gian lận, giả mạo xuất xứ và ghi nhãn hàng hóa không đúng quy định tại cửa khẩu.',
    agency: 'Cục Hải quan',
    status: 'active',
    pdfFile: '/van-ban/7988_CT-TCHQ_2019.pdf',
    articles: [
      { title: 'Giải pháp chống gian lận xuất xứ', content: 'Tăng cường kiểm tra C/O, xác minh xuất xứ thực tế của hàng hóa nhập khẩu; phát hiện và xử lý hàng hóa giả mạo xuất xứ Việt Nam.' },
      { title: 'Quy trình ghi nhãn hàng hóa', content: 'Yêu cầu kiểm tra chặt chẽ nhãn hàng hóa nhập khẩu: ngôn ngữ, nội dung bắt buộc và thông tin nhà sản xuất theo Nghị định 43/2017/NĐ-CP.' },
    ],
    expertSummary: 'Chỉ thị 7988 đặt nền móng cho quy trình kiểm tra xuất xứ và nhãn hàng hóa hiện nay. Dù ban hành năm 2019, nội dung vẫn còn nguyên giá trị pháp lý và nghiệp vụ.'
  },
  {
    id: '16',
    title: 'Công văn CHQ.15405 ngày 18/07/2025 — Hướng dẫn kiểm soát SHTT',
    type: 'Văn bản chỉ đạo',
    number: 'CHQ.15405',
    year: '2025',
    desc: 'Công văn của Cục Hải quan hướng dẫn chi tiết nghiệp vụ kiểm soát quyền sở hữu trí tuệ tại các chi cục hải quan cửa khẩu.',
    agency: 'Cục Hải quan',
    status: 'active',
    pdfFile: '/van-ban/CHQ_15405_2025.pdf',
    articles: [
      { title: 'Hướng dẫn nghiệp vụ kiểm soát SHTT', content: 'Cập nhật quy trình tiếp nhận đơn yêu cầu bảo hộ, xác minh nhãn hiệu, phối hợp với chủ thể quyền trong quá trình xử lý vụ việc.' },
    ],
    expertSummary: 'Văn bản hướng dẫn nghiệp vụ trực tiếp năm 2025 — cán bộ kiểm soát SHTT tại các chi cục nên đọc và lưu để tham chiếu khi phát sinh vụ việc cụ thể.'
  },
  {
    id: '17',
    title: 'Văn bản QUB26.07 — Triển khai Chỉ thị 02/CT-TTg tăng cường thực thi quyền SHTT',
    type: 'Văn bản chỉ đạo',
    number: 'QUB26.07',
    year: '2026',
    desc: 'Văn bản triển khai Chỉ thị 02/CT-TTg tại cấp Cục Hải quan, phân công nhiệm vụ cụ thể cho các đơn vị trong toàn ngành về tăng cường thực thi quyền SHTT.',
    agency: 'Cục Hải quan',
    status: 'active',
    pdfFile: '/van-ban/QUB26_CT02_SHTT.pdf',
    articles: [
      { title: 'Triển khai Chỉ thị 02/CT-TTg', content: 'Phân giao nhiệm vụ cụ thể đến từng Chi cục Hải quan; xác định lộ trình thực hiện và các chỉ số đánh giá hiệu quả.' },
      { title: 'Phối hợp liên ngành', content: 'Quy trình phối hợp với Cục SHTT, lực lượng Quản lý thị trường, Công an kinh tế trong xử lý hàng hóa vi phạm SHTT quy mô lớn.' },
    ],
    expertSummary: 'Văn bản cụ thể hóa Chỉ thị 02 thành nhiệm vụ hành động tại cấp Cục. Cán bộ cần theo dõi tiến độ và báo cáo kết quả thực hiện theo đúng lịch được giao.'
  },
];

const STATS = [
  { label: 'Tổng văn bản rà soát', value: String(DOCUMENTS.length), icon: Database, color: 'text-blue-600', bg: 'bg-blue-100' },
  { label: 'Bộ luật hiện hành', value: String(DOCUMENTS.filter(d => d.type === 'Luật').length), icon: Scale, color: 'text-orange-600', bg: 'bg-orange-100' },
  { label: 'Nghị định liên quan', value: String(DOCUMENTS.filter(d => d.type === 'Nghị định').length), icon: ShieldCheck, color: 'text-emerald-600', bg: 'bg-emerald-100' },
  { label: 'Văn bản chỉ đạo', value: String(DOCUMENTS.filter(d => d.type === 'Văn bản chỉ đạo').length), icon: BookOpen, color: 'text-purple-600', bg: 'bg-purple-100' },
];

const FILTER_TYPES = ['Tất cả', 'Luật', 'Nghị định', 'Văn bản chỉ đạo'];

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
             Truy xuất bộ khung pháp luật về Sở hữu Trí tuệ được liên kết trực tiếp với hoạt động giám sát thông quan của Cục Hải Quan.
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
                                   {doc.pdfFile ? (
                                      <a href={doc.pdfFile} download target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-slate-50 hover:bg-slate-200 text-slate-500 hover:text-[#0a192f] flex items-center justify-center transition-colors">
                                         <Download className="w-4 h-4" />
                                      </a>
                                   ) : (
                                      <span className="w-8 h-8 rounded-full bg-slate-50 text-slate-300 flex items-center justify-center cursor-not-allowed">
                                         <Download className="w-4 h-4" />
                                      </span>
                                   )}
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
