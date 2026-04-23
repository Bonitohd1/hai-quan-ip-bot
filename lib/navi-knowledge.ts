/**
 * Cơ sở tri thức cho Navi — Trợ lý AI SHTT Hải quan
 *
 * Dữ liệu mẫu phục vụ trả lời câu hỏi của cán bộ hải quan về:
 *  - Khung pháp lý SHTT (Luật, Nghị định, Thông tư)
 *  - Quy trình kiểm soát biên giới
 *  - Mức phạt & thẩm quyền xử lý
 *  - Định nghĩa & thuật ngữ nghiệp vụ
 *  - Tình huống thực tiễn
 */

export type NaviEntry = {
  id: string;
  topic: string;                     // chủ đề ngắn (dùng cho gợi ý)
  keywords: string[];                // từ khoá phát hiện (lower-case)
  question: string;                  // câu hỏi mẫu
  answer: string;                    // câu trả lời đầy đủ (Markdown nhẹ)
  references?: string[];             // văn bản pháp lý trích dẫn
  category: 'legal' | 'process' | 'penalty' | 'definition' | 'practice';
};

export const NAVI_KB: NaviEntry[] = [
  // ── KHUNG PHÁP LÝ ─────────────────────────────────────────────
  {
    id: 'kb-001',
    topic: 'Luật SHTT hiện hành',
    keywords: ['luật', 'shtt', 'sở hữu trí tuệ', 'hiện hành', 'áp dụng', 'luật nào'],
    question: 'Văn bản pháp luật SHTT hiện hành đang áp dụng là gì?',
    answer:
      'Hiện tại Việt Nam áp dụng **Luật Sở hữu trí tuệ 2005 (Luật số 50/2005/QH11)**, đã được sửa đổi, bổ sung bởi các Luật số **36/2009/QH12**, **42/2019/QH14**, **07/2022/QH15** và mới nhất là **131/2025/QH15**. ' +
      'Khi tra cứu, cần đối chiếu với bản hợp nhất mới nhất vì các điều khoản đã được sửa đổi nhiều lần. ' +
      'Đặc biệt lưu ý **Luật 07/2022/QH15** vì lần đầu tiên cho phép cơ quan hải quan **chủ động tạm dừng thông quan** mà không cần đơn yêu cầu của chủ thể quyền (Điều 216 sửa đổi).',
    references: ['50/2005/QH11', '07/2022/QH15', '131/2025/QH15'],
    category: 'legal',
  },
  {
    id: 'kb-002',
    topic: 'Quyền hạn hải quan',
    keywords: ['hải quan', 'thẩm quyền', 'quyền hạn', 'được phép', 'tạm dừng', 'chủ động'],
    question: 'Hải quan có thẩm quyền chủ động tạm dừng thông quan không?',
    answer:
      'Có. Theo **Điều 216 Luật SHTT (sửa đổi năm 2022)**, cơ quan hải quan được phép **chủ động tạm dừng** làm thủ tục hải quan trong trường hợp có dấu hiệu rõ ràng xâm phạm quyền SHTT, **không cần đơn yêu cầu** của chủ thể quyền. ' +
      'Thời gian tạm dừng tối đa là **10 ngày làm việc**, có thể gia hạn thêm **10 ngày** nếu có lý do chính đáng. ' +
      'Trong thời gian tạm dừng, hải quan phải thông báo cho chủ thể quyền để có hướng xử lý tiếp theo.',
    references: ['07/2022/QH15 Điều 216', 'Nghị định 128/2020/NĐ-CP'],
    category: 'legal',
  },

  // ── QUY TRÌNH ────────────────────────────────────────────────
  {
    id: 'kb-003',
    topic: 'Quy trình kiểm soát biên giới',
    keywords: ['quy trình', 'kiểm soát', 'biên giới', 'các bước', 'thủ tục', 'trình tự'],
    question: 'Quy trình kiểm soát hàng hoá có dấu hiệu xâm phạm SHTT tại cửa khẩu gồm những bước nào?',
    answer:
      'Quy trình gồm **5 bước** theo Thông tư 13/2015/TT-BTC:\n\n' +
      '1. **Tiếp nhận đơn/phát hiện**: Nhận đơn yêu cầu kiểm tra giám sát của chủ thể quyền HOẶC chủ động phát hiện khi soi chiếu.\n' +
      '2. **Đối soát danh mục**: So sánh thông tin hàng hoá với cơ sở dữ liệu SHTT đã đăng ký (mã HS, nhãn hiệu, kiểu dáng).\n' +
      '3. **Tạm dừng thông quan**: Ra quyết định tạm dừng, niêm phong lô hàng, thông báo chủ thể quyền trong **24 giờ**.\n' +
      '4. **Giám định**: Yêu cầu giám định nếu cần (Viện Khoa học SHTT hoặc tổ chức giám định được công nhận).\n' +
      '5. **Xử lý kết quả**: Tuỳ kết quả, ra quyết định xử phạt hành chính, tiêu huỷ hàng hoá, hoặc thông quan trở lại.',
    references: ['Thông tư 13/2015/TT-BTC', 'Nghị định 99/2013/NĐ-CP'],
    category: 'process',
  },
  {
    id: 'kb-004',
    topic: 'Hồ sơ yêu cầu kiểm tra giám sát',
    keywords: ['hồ sơ', 'đơn yêu cầu', 'giấy tờ', 'cần chuẩn bị', 'nộp'],
    question: 'Chủ thể quyền cần nộp hồ sơ gì để yêu cầu hải quan kiểm tra, giám sát?',
    answer:
      'Hồ sơ gồm **4 loại tài liệu chính**:\n\n' +
      '• **Đơn yêu cầu** theo Mẫu số 01 — ban hành kèm Thông tư 13/2015/TT-BTC\n' +
      '• **Văn bằng bảo hộ** (bản sao có chứng thực): GCN đăng ký nhãn hiệu, Bằng độc quyền sáng chế, GCN đăng ký kiểu dáng công nghiệp...\n' +
      '• **Mô tả chi tiết hàng hoá được bảo hộ**: hình ảnh, đặc điểm phân biệt, mã HS dự kiến\n' +
      '• **Khoản bảo đảm**: tối thiểu **20%** giá trị lô hàng nghi ngờ HOẶC **20 triệu đồng** (tuỳ mức cao hơn) — hoàn trả khi kết thúc vụ việc không có vi phạm.\n\n' +
      'Thời hạn giám sát: tối đa **2 năm** kể từ ngày hải quan chấp nhận, có thể gia hạn.',
    references: ['Thông tư 13/2015/TT-BTC Mẫu 01'],
    category: 'process',
  },

  // ── MỨC PHẠT ─────────────────────────────────────────────────
  {
    id: 'kb-005',
    topic: 'Mức phạt hành chính',
    keywords: ['phạt', 'mức phạt', 'xử phạt', 'bao nhiêu', 'tiền phạt', 'hành chính'],
    question: 'Mức phạt hành chính đối với hành vi xâm phạm nhãn hiệu tại cửa khẩu là bao nhiêu?',
    answer:
      'Theo **Nghị định 99/2013/NĐ-CP** (sửa đổi bởi 126/2021/NĐ-CP), mức phạt tiền với hành vi **nhập khẩu hàng hoá giả mạo nhãn hiệu** được tính theo giá trị hàng vi phạm:\n\n' +
      '| Giá trị hàng vi phạm | Mức phạt |\n' +
      '|---|---|\n' +
      '| Dưới 3 triệu | 500.000đ – 2 triệu |\n' +
      '| 3 – 5 triệu | 2 – 4 triệu |\n' +
      '| 5 – 10 triệu | 4 – 8 triệu |\n' +
      '| 10 – 20 triệu | 8 – 15 triệu |\n' +
      '| 20 – 40 triệu | 15 – 25 triệu |\n' +
      '| 40 – 70 triệu | 25 – 40 triệu |\n' +
      '| 70 – 100 triệu | 40 – 60 triệu |\n' +
      '| Trên 100 triệu | 60 – 250 triệu |\n\n' +
      '**Hình phạt bổ sung**: tịch thu tang vật, buộc tiêu huỷ, buộc loại bỏ yếu tố vi phạm. Với pháp nhân, mức phạt gấp **2 lần** cá nhân.',
    references: ['Nghị định 99/2013/NĐ-CP', 'Nghị định 126/2021/NĐ-CP'],
    category: 'penalty',
  },
  {
    id: 'kb-006',
    topic: 'Xử lý hình sự',
    keywords: ['hình sự', 'truy cứu', 'tội', 'nặng', 'đi tù', 'giam'],
    question: 'Khi nào hành vi xâm phạm SHTT bị truy cứu trách nhiệm hình sự?',
    answer:
      'Theo **Điều 226 Bộ luật Hình sự 2015** (sửa đổi 2017), hành vi xâm phạm nhãn hiệu/chỉ dẫn địa lý bị truy cứu hình sự khi:\n\n' +
      '• **Với cá nhân**: thu lợi bất chính từ **100 triệu** trở lên HOẶC gây thiệt hại từ **200 triệu** trở lên HOẶC hàng hoá vi phạm trị giá từ **200 triệu** trở lên.\n' +
      '• **Khung hình phạt**: phạt tiền 50 – 500 triệu hoặc cải tạo không giam giữ đến 3 năm. Trường hợp nghiêm trọng: **tù từ 6 tháng đến 3 năm**.\n' +
      '• **Với pháp nhân**: phạt tiền 500 triệu – 5 tỷ, đình chỉ hoạt động có thời hạn.\n\n' +
      'Hải quan khi phát hiện vụ việc có dấu hiệu hình sự phải **chuyển hồ sơ sang cơ quan điều tra** trong vòng 7 ngày.',
    references: ['Điều 226 BLHS 2015', 'Điều 227 BLHS'],
    category: 'penalty',
  },

  // ── ĐỊNH NGHĨA ───────────────────────────────────────────────
  {
    id: 'kb-007',
    topic: 'Hàng giả mạo nhãn hiệu',
    keywords: ['hàng giả', 'giả mạo', 'phân biệt', 'khái niệm', 'định nghĩa', 'thế nào'],
    question: 'Thế nào là hàng hoá giả mạo nhãn hiệu?',
    answer:
      'Theo **Khoản 2 Điều 213 Luật SHTT**, hàng hoá giả mạo nhãn hiệu là hàng hoá, bao bì có gắn nhãn hiệu, dấu hiệu **trùng hoặc khó phân biệt** với nhãn hiệu, chỉ dẫn địa lý đang được bảo hộ, **mà không được phép** của chủ sở hữu.\n\n' +
      '**Phân biệt với hàng xâm phạm quyền**:\n' +
      '• **Giả mạo**: dấu hiệu trùng/gần trùng → xử lý ở mức cao nhất, tịch thu tiêu huỷ.\n' +
      '• **Xâm phạm**: dấu hiệu tương tự gây nhầm lẫn → xử phạt hành chính, buộc loại bỏ yếu tố vi phạm.\n\n' +
      '**Dấu hiệu nhận biết tại cửa khẩu**: chất lượng in ấn kém, sai lỗi chính tả trên nhãn, mã vạch không khớp, xuất xứ không hợp lý (nhãn hiệu cao cấp từ nguồn gốc không chính thức).',
    references: ['Điều 213 Luật SHTT', 'Thông tư 11/2015/TT-BKHCN'],
    category: 'definition',
  },
  {
    id: 'kb-008',
    topic: 'Nhãn hiệu nổi tiếng',
    keywords: ['nhãn hiệu nổi tiếng', 'famous', 'well-known', 'tiêu chí', 'công nhận'],
    question: 'Tiêu chí công nhận nhãn hiệu nổi tiếng là gì?',
    answer:
      'Theo **Điều 75 Luật SHTT (sửa đổi 2022)**, nhãn hiệu được công nhận là nổi tiếng khi đáp ứng **8 tiêu chí**:\n\n' +
      '1. Số lượng người tiêu dùng biết đến nhãn hiệu\n' +
      '2. Phạm vi lãnh thổ lưu hành\n' +
      '3. Doanh số từ hàng hoá/dịch vụ mang nhãn hiệu\n' +
      '4. Thời gian sử dụng liên tục\n' +
      '5. Uy tín rộng rãi\n' +
      '6. Số lượng quốc gia bảo hộ\n' +
      '7. Số lượng quốc gia công nhận nổi tiếng\n' +
      '8. Giá chuyển nhượng/li-xăng/góp vốn\n\n' +
      'Nhãn hiệu nổi tiếng được bảo hộ **không cần đăng ký** và được bảo hộ **trên toàn bộ** nhóm hàng hoá/dịch vụ. Hải quan ưu tiên kiểm tra khắt khe hơn với các nhãn hiệu nổi tiếng (Apple, Nike, Louis Vuitton, Rolex...).',
    references: ['Điều 75 Luật SHTT 2022'],
    category: 'definition',
  },

  // ── THỰC TIỄN ────────────────────────────────────────────────
  {
    id: 'kb-009',
    topic: 'Xử lý hàng quá cảnh',
    keywords: ['quá cảnh', 'transit', 'chuyển khẩu', 'không nhập khẩu'],
    question: 'Hàng hoá xâm phạm SHTT đang quá cảnh qua Việt Nam có bị xử lý không?',
    answer:
      'Có. Theo quy định mới tại **Luật 07/2022/QH15**, hàng hoá quá cảnh, chuyển khẩu mang dấu hiệu giả mạo nhãn hiệu **vẫn bị hải quan tạm giữ và xử lý**, kể cả khi đích đến không phải Việt Nam. ' +
      'Đây là thay đổi quan trọng so với luật cũ (chỉ áp dụng cho hàng nhập khẩu để tiêu thụ tại Việt Nam). ' +
      '**Cơ sở pháp lý**: Hiệp định TRIPS Điều 51 và cam kết tại Hiệp định EVFTA Chương 12.\n\n' +
      'Trong thực tiễn, cán bộ cần chú ý đến tuyến biên giới với Lào, Campuchia — thường có hàng giả mạo xuất phát từ Trung Quốc quá cảnh Việt Nam đi Đông Nam Á.',
    references: ['Điều 216 Luật SHTT 2022', 'TRIPS Điều 51', 'EVFTA Chương 12'],
    category: 'practice',
  },
  {
    id: 'kb-010',
    topic: 'Hàng xách tay cá nhân',
    keywords: ['xách tay', 'cá nhân', 'hành lý', 'phi thương mại', 'du lịch'],
    question: 'Hàng xách tay của cá nhân vi phạm nhãn hiệu có bị xử lý không?',
    answer:
      'Theo **Điều 12 Nghị định 99/2013/NĐ-CP**, hàng hoá do cá nhân mang theo trong hành lý với **mục đích sử dụng cá nhân, không nhằm thương mại**, số lượng nhỏ thì **không áp dụng** biện pháp kiểm soát biên giới.\n\n' +
      '**Tuy nhiên**, nếu:\n' +
      '• Số lượng vượt định mức (thường > 3 đơn vị cùng loại)\n' +
      '• Có dấu hiệu kinh doanh, bán lại\n' +
      '• Là nhãn hiệu xa xỉ phẩm với số lượng bất thường\n\n' +
      '→ Hải quan vẫn có quyền tạm giữ, kiểm tra và xử lý như hàng nhập khẩu thương mại. ' +
      '**Thực tiễn**: các sân bay quốc tế (Nội Bài, Tân Sơn Nhất) thường xuyên bắt giữ hàng giả mạo Louis Vuitton, Gucci, Rolex được nguỵ trang là quà tặng cá nhân.',
    references: ['Điều 12 Nghị định 99/2013/NĐ-CP'],
    category: 'practice',
  },
  {
    id: 'kb-011',
    topic: 'Hiệu lực giấy chứng nhận',
    keywords: ['hiệu lực', 'thời hạn', 'bao lâu', 'gia hạn', 'hết hạn'],
    question: 'Giấy chứng nhận đăng ký nhãn hiệu có hiệu lực bao lâu?',
    answer:
      'Theo **Điều 93 Luật SHTT**, giấy chứng nhận đăng ký nhãn hiệu có hiệu lực **10 năm** kể từ ngày nộp đơn, có thể **gia hạn nhiều lần liên tiếp**, mỗi lần 10 năm, **không giới hạn số lần**.\n\n' +
      '**Thủ tục gia hạn**: nộp đơn trong vòng **6 tháng trước ngày hết hạn** hoặc **6 tháng sau** (phải nộp phí trễ hạn). Quá hạn này, văn bằng hết hiệu lực vĩnh viễn.\n\n' +
      'Các đối tượng SHTT khác:\n' +
      '• **Sáng chế**: 20 năm, không gia hạn\n' +
      '• **Giải pháp hữu ích**: 10 năm, không gia hạn\n' +
      '• **Kiểu dáng công nghiệp**: 5 năm, gia hạn 2 lần (tối đa 15 năm)\n' +
      '• **Chỉ dẫn địa lý**: vô thời hạn',
    references: ['Điều 93 Luật SHTT', 'Điều 94 Luật SHTT'],
    category: 'legal',
  },
  {
    id: 'kb-012',
    topic: 'Giám định SHTT',
    keywords: ['giám định', 'kết luận', 'viện', 'chuyên môn', 'ai giám định'],
    question: 'Cơ quan nào có thẩm quyền giám định SHTT?',
    answer:
      'Ba nguồn giám định chính:\n\n' +
      '1. **Viện Khoa học Sở hữu trí tuệ** (VIPRI) — thuộc Cục SHTT, là cơ quan giám định chính thức về sở hữu công nghiệp.\n' +
      '2. **Các tổ chức giám định được cấp phép** — danh sách do Bộ KH&CN công bố, hiện có ~15 tổ chức.\n' +
      '3. **Giám định viên cá nhân** — có thẻ giám định viên do Bộ KH&CN cấp.\n\n' +
      '**Thời gian giám định**: 30 ngày (đơn giản) đến 45 ngày (phức tạp), có thể gia hạn. ' +
      '**Chi phí**: 5 – 20 triệu/vụ việc, do bên yêu cầu chi trả (thường là chủ thể quyền hoặc hải quan tạm ứng rồi thu hồi).',
    references: ['Nghị định 105/2006/NĐ-CP', 'Thông tư 01/2008/TT-BKHCN'],
    category: 'process',
  },
];

/**
 * Tính điểm khớp giữa câu hỏi người dùng và entry KB
 * Thuật toán: đếm số từ khoá trùng + bonus cho khớp chính xác
 */
function scoreEntry(query: string, entry: NaviEntry): number {
  const q = query.toLowerCase();
  let score = 0;
  for (const kw of entry.keywords) {
    if (q.includes(kw)) score += kw.length >= 5 ? 3 : 2;
  }
  // Bonus nếu chủ đề xuất hiện
  if (q.includes(entry.topic.toLowerCase())) score += 4;
  return score;
}

/**
 * Tìm câu trả lời phù hợp nhất từ KB cho câu hỏi người dùng
 * Trả về null nếu không có entry nào đủ điểm (< 2)
 */
export function findNaviAnswer(query: string): NaviEntry | null {
  const ranked = NAVI_KB
    .map(e => ({ entry: e, score: scoreEntry(query, e) }))
    .filter(r => r.score >= 2)
    .sort((a, b) => b.score - a.score);
  return ranked[0]?.entry || null;
}

/** Gợi ý câu hỏi nhanh — hiển thị trước khi user gõ */
export const NAVI_QUICK_PROMPTS = [
  { icon: '⚖️', text: 'Mức phạt hành vi nhập khẩu hàng giả nhãn hiệu?' },
  { icon: '📋', text: 'Quy trình kiểm soát biên giới gồm những bước nào?' },
  { icon: '🛃', text: 'Hải quan có được chủ động tạm dừng thông quan không?' },
  { icon: '🎯', text: 'Thế nào là hàng giả mạo nhãn hiệu?' },
  { icon: '⏱️', text: 'Giấy chứng nhận nhãn hiệu có hiệu lực bao lâu?' },
  { icon: '✈️', text: 'Hàng xách tay cá nhân có bị kiểm tra không?' },
];
