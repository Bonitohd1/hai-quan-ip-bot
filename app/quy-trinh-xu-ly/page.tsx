'use client';

import { useState, useEffect } from 'react';
import { CheckCircle2, Circle, ChevronRight, ChevronDown, Clock, FileText, Phone, AlertTriangle, Shield, Gavel, Package, ArrowRight, CheckSquare, Square, Printer, Users } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Step {
  id: number;
  title: string;
  deadline: string;
  owner: string;
  desc: string;
  actions: string[];
  forms: { name: string; note: string }[];
  contacts: { role: string; action: string }[];
  warning?: string;
  tip?: string;
}

interface Scenario {
  id: string;
  title: string;
  subtitle: string;
  icon: React.ElementType;
  color: string;
  bg: string;
  trigger: string;
  legalBasis: string[];
  steps: Step[];
}

const SCENARIOS: Scenario[] = [
  {
    id: 'detection',
    title: 'Phát hiện khi kiểm hóa',
    subtitle: 'Hàng nghi vi phạm phát hiện trong quá trình kiểm tra thực tế',
    icon: Package,
    color: 'text-orange-600',
    bg: 'bg-orange-50',
    trigger: 'Cán bộ kiểm hóa phát hiện dấu hiệu vi phạm SHTT trong quá trình kiểm tra thực tế tại cửa khẩu (nhãn hiệu, kiểu dáng nghi giả mạo).',
    legalBasis: ['Điều 216 Luật SHTT 2022', 'Điều 21 NĐ 99/2013 (đã sửa đổi)', 'NĐ 100/2026/NĐ-CP Điều 22'],
    steps: [
      {
        id: 1,
        title: 'Tạm giữ hàng hóa, lập biên bản ban đầu',
        deadline: 'Ngay lập tức (tại chỗ)',
        owner: 'Cán bộ kiểm hóa',
        desc: 'Dừng quá trình thông quan, tạm giữ lô hàng tại khu vực kiểm hóa. Lập biên bản ghi nhận ban đầu về dấu hiệu vi phạm.',
        actions: [
          'Chụp ảnh toàn bộ lô hàng (bao bì, nhãn mác, số lượng)',
          'Ghi rõ số tờ khai hải quan, mã container, số lượng',
          'Không tiếp xúc trực tiếp hàng hóa khi chưa có găng tay bảo hộ (hàng mỹ phẩm, hóa chất)',
          'Báo cáo ngay lãnh đạo Chi cục / tổ trưởng',
          'Không thông báo cho chủ hàng về lý do dừng (tránh tẩu tán bằng chứng)',
        ],
        forms: [
          { name: 'BB-01: Biên bản tạm giữ hàng hóa', note: 'Lập 03 bản: 01 lưu hải quan, 01 giao chủ hàng, 01 nộp lãnh đạo' },
          { name: 'PL-01: Phiếu ghi nhận ban đầu', note: 'Ghi nhận số lượng, mô tả sơ bộ dấu hiệu vi phạm' },
        ],
        contacts: [
          { role: 'Tổ trưởng / Lãnh đạo Chi cục', action: 'Báo cáo ngay để xin chỉ đạo' },
          { role: 'Phòng Kiểm soát Hải quan – Cục', action: 'Thông báo song song nếu lô hàng lớn (>500 sản phẩm)' },
        ],
        tip: 'Thời gian "vàng": lập biên bản trong 30 phút đầu để bảo toàn bằng chứng pháp lý.'
      },
      {
        id: 2,
        title: 'Tra cứu hồ sơ bảo hộ & liên hệ chủ thể quyền',
        deadline: 'Trong vòng 4 giờ làm việc',
        owner: 'Cán bộ SHTT Chi cục',
        desc: 'Tra cứu hệ thống xem nhãn hiệu/kiểu dáng có đăng ký bảo hộ biên giới không. Liên hệ đại diện chủ thể quyền để xác nhận.',
        actions: [
          'Tra cứu trong hệ thống hồ sơ bảo hộ biên giới (mục Hồ sơ bảo hộ)',
          'Tra cứu bổ sung tại ip.gov.vn nếu không tìm thấy trong hệ thống',
          'Liên hệ đại diện chủ thể quyền qua số điện thoại trong hồ sơ',
          'Gửi email kèm ảnh chụp yêu cầu xác nhận trong 24h',
          'Ghi nhận phản hồi vào hồ sơ',
        ],
        forms: [
          { name: 'CT-02: Công văn yêu cầu xác nhận của chủ thể quyền', note: 'Gửi email có xác nhận đọc' },
        ],
        contacts: [
          { role: 'Đại diện chủ thể quyền', action: 'Gửi ảnh, yêu cầu xác nhận vi phạm trong 24h' },
          { role: 'Cục SHTT (ip.gov.vn)', action: 'Tra cứu trực tuyến khi cần xác minh GCN' },
        ],
        warning: 'Nếu chủ thể quyền không xác nhận được trong 24h, cần quyết định dựa trên bằng chứng hiện có và báo cáo lãnh đạo để hướng dẫn tiếp theo.'
      },
      {
        id: 3,
        title: 'Ra quyết định tạm dừng thông quan',
        deadline: 'Trong vòng 24 giờ kể từ khi tạm giữ',
        owner: 'Chi cục trưởng / Người được ủy quyền',
        desc: 'Căn cứ kết quả xác nhận ban đầu, Chi cục trưởng ký quyết định tạm dừng thông quan chính thức (tối đa 20 ngày làm việc).',
        actions: [
          'Chuẩn bị hồ sơ trình ký: biên bản tạm giữ + ảnh + xác nhận chủ thể quyền',
          'Chi cục trưởng ký Quyết định tạm dừng thông quan',
          'Giao Quyết định cho chủ hàng / đại lý khai báo',
          'Thông báo cho chủ thể quyền về việc tạm dừng',
          'Chuyển hàng hóa vào kho giám sát, lập phiếu nhập kho',
        ],
        forms: [
          { name: 'QĐ-03: Quyết định tạm dừng thông quan', note: 'Chi cục trưởng ký, đóng dấu' },
          { name: 'BB-04: Biên bản giao nhận hàng hóa vào kho giám sát', note: 'Lập 02 bản' },
        ],
        contacts: [
          { role: 'Chủ hàng / Đại lý khai báo', action: 'Giao Quyết định, thông báo quyền khiếu nại' },
          { role: 'Chủ thể quyền', action: 'Thông báo đã tạm dừng, yêu cầu nộp đơn chính thức trong 10 ngày' },
        ],
        tip: 'Thời hạn tạm dừng tối đa 20 ngày làm việc (Điều 216 Luật SHTT). Có thể gia hạn thêm 10 ngày nếu có yêu cầu bằng văn bản.'
      },
      {
        id: 4,
        title: 'Tổ chức giám định thực tế',
        deadline: 'Trong vòng 10 ngày làm việc',
        owner: 'Cán bộ SHTT + Giám định viên',
        desc: 'Phối hợp với chuyên gia/đại diện chủ thể quyền thực hiện giám định thực tế để xác định hàng thật/giả.',
        actions: [
          'Mời đại diện chủ thể quyền đến giám định trực tiếp',
          'Lập biên bản giám định có chữ ký các bên',
          'Chụp ảnh chi tiết trong quá trình giám định',
          'Lấy mẫu lưu nếu cần (đặc biệt với dược phẩm, thực phẩm)',
          'Kết luận rõ: vi phạm / không vi phạm',
        ],
        forms: [
          { name: 'BB-05: Biên bản giám định hàng hóa', note: 'Có chữ ký cán bộ hải quan + đại diện chủ thể quyền' },
          { name: 'KL-06: Kết luận giám định', note: 'Ghi rõ căn cứ kết luận' },
        ],
        contacts: [
          { role: 'Đại diện chủ thể quyền', action: 'Mời tham gia giám định, ký biên bản' },
          { role: 'Viện Khoa học SHTT', action: 'Trưng cầu giám định độc lập nếu cần (phức tạp)' },
        ],
        warning: 'Không tự kết luận vi phạm mà không có đại diện chủ thể quyền hoặc giám định viên chuyên môn.'
      },
      {
        id: 5,
        title: 'Ra quyết định xử lý',
        deadline: 'Trong thời hạn tạm dừng (tối đa 20 ngày)',
        owner: 'Chi cục trưởng / Cục trưởng',
        desc: 'Căn cứ kết luận giám định, ban hành quyết định xử phạt vi phạm hành chính và các biện pháp khắc phục hậu quả.',
        actions: [
          'Nếu vi phạm: lập hồ sơ xử phạt vi phạm hành chính theo NĐ 46/2024',
          'Xác định mức phạt theo giá trị CIF của lô hàng',
          'Nếu giá trị > 500 triệu VND: chuyển ngay sang cơ quan điều tra hình sự',
          'Nếu không vi phạm: thông quan ngay, lập biên bản giải phóng hàng',
          'Lập thống kê vụ việc vào hệ thống báo cáo Cục',
        ],
        forms: [
          { name: 'QĐ-07: Quyết định xử phạt vi phạm hành chính', note: 'Căn cứ NĐ 46/2024 + NĐ 99/2013 sửa đổi' },
          { name: 'QĐ-08: Quyết định tịch thu, tiêu hủy tang vật', note: 'Nếu áp dụng biện pháp tịch thu' },
          { name: 'BB-09: Biên bản giải phóng hàng', note: 'Nếu không vi phạm' },
        ],
        contacts: [
          { role: 'Phòng Kiểm soát – Cục Hải quan', action: 'Báo cáo kết quả xử lý' },
          { role: 'Cơ quan CSĐT (CA Kinh tế)', action: 'Chuyển hồ sơ nếu giá trị > 500 triệu VND' },
          { role: 'Ban Chỉ đạo 389 địa phương', action: 'Phối hợp nếu vi phạm quy mô lớn' },
        ],
        tip: 'Mức phạt: tính theo giá trị CIF. Cá nhân max 250 triệu VND, tổ chức max 500 triệu VND (NĐ 126/2021 sửa đổi).'
      }
    ]
  },
  {
    id: 'request',
    title: 'Tiếp nhận đơn yêu cầu',
    subtitle: 'Chủ thể quyền nộp đơn yêu cầu tạm dừng lô hàng cụ thể',
    icon: FileText,
    color: 'text-blue-600',
    bg: 'bg-blue-50',
    trigger: 'Chủ thể quyền (hoặc đại diện) nộp đơn yêu cầu Hải quan tạm dừng thông quan đối với lô hàng nhập khẩu cụ thể đang chờ thông quan.',
    legalBasis: ['Điều 216, 217 Luật SHTT 2022', 'NĐ 65/2023 Điều 45', 'NĐ 100/2026 Điều 22'],
    steps: [
      {
        id: 1,
        title: 'Tiếp nhận và kiểm tra hồ sơ đơn yêu cầu',
        deadline: 'Trong vòng 24 giờ làm việc kể từ khi nhận đơn',
        owner: 'Cán bộ SHTT Chi cục',
        desc: 'Tiếp nhận đơn yêu cầu, kiểm tra đủ điều kiện thụ lý (có GCN bảo hộ còn hiệu lực, có bằng chứng vi phạm, có bảo đảm tài chính).',
        actions: [
          'Tiếp nhận đơn qua cổng dịch vụ công hoặc trực tiếp, cấp số tiếp nhận',
          'Kiểm tra: GCN SHTT còn hiệu lực, mô tả hàng hóa vi phạm, bằng chứng vi phạm',
          'Xác nhận chủ thể quyền đã nộp hoặc cam kết nộp bảo đảm tài chính',
          'Thông báo kết quả tiếp nhận cho chủ thể quyền',
        ],
        forms: [
          { name: 'TN-01: Phiếu tiếp nhận đơn yêu cầu', note: 'Ghi số tiếp nhận, ngày giờ nhận đơn' },
          { name: 'KT-02: Phiếu kiểm tra điều kiện thụ lý', note: 'Checklist các điều kiện bắt buộc' },
        ],
        contacts: [
          { role: 'Chủ thể quyền / Đại diện', action: 'Thông báo tiếp nhận, yêu cầu bổ sung nếu hồ sơ thiếu' },
        ],
        warning: 'Đơn chưa đủ điều kiện: trả lại trong 48h với yêu cầu bổ sung cụ thể. Không để tồn đơn quá 48h mà không có phản hồi.'
      },
      {
        id: 2,
        title: 'Xác minh lô hàng và ra lệnh tạm dừng',
        deadline: 'Trong vòng 48 giờ kể từ khi thụ lý',
        owner: 'Chi cục trưởng',
        desc: 'Xác minh lô hàng có trong hệ thống, đối chiếu tờ khai hải quan, ra lệnh tạm dừng thông quan.',
        actions: [
          'Tra cứu tờ khai hải quan theo số container / mã vận đơn do chủ thể quyền cung cấp',
          'Đối chiếu hàng hóa trong tờ khai với mô tả trong đơn yêu cầu',
          'Chi cục trưởng ký lệnh tạm dừng trong 24h kể từ khi xác minh',
          'Thông báo tạm dừng cho chủ hàng / đại lý khai báo',
        ],
        forms: [
          { name: 'QĐ-03: Quyết định tạm dừng thông quan', note: 'Ghi rõ số tờ khai, lý do tạm dừng' },
        ],
        contacts: [
          { role: 'Chủ hàng / Đại lý', action: 'Thông báo tạm dừng, thông báo quyền khiếu nại' },
          { role: 'Chủ thể quyền', action: 'Thông báo đã thực hiện tạm dừng' },
        ],
        tip: 'Nếu không tìm thấy lô hàng trong hệ thống: yêu cầu chủ thể quyền cung cấp thêm thông tin, hoặc mở rộng tra cứu sang cảng khác.'
      },
      {
        id: 3,
        title: 'Phối hợp giám định với chủ thể quyền',
        deadline: 'Trong 10 ngày làm việc đầu của thời hạn tạm dừng',
        owner: 'Cán bộ SHTT + Chủ thể quyền',
        desc: 'Tổ chức giám định chung, xác nhận vi phạm hoặc không vi phạm.',
        actions: [
          'Sắp xếp lịch giám định với đại diện chủ thể quyền',
          'Mở container / bao bì dưới sự chứng kiến của các bên',
          'Lập biên bản giám định chi tiết',
          'Chủ thể quyền xác nhận vi phạm bằng văn bản',
        ],
        forms: [
          { name: 'BB-05: Biên bản giám định hàng hóa', note: 'Ký xác nhận của tất cả các bên' },
        ],
        contacts: [
          { role: 'Đại diện chủ thể quyền', action: 'Tổ chức giám định, xác nhận bằng văn bản' },
        ],
        tip: 'Thời hạn tạm dừng có thể gia hạn 10 ngày nếu chủ thể quyền có yêu cầu bằng văn bản với lý do chính đáng.'
      },
      {
        id: 4,
        title: 'Xử lý và báo cáo',
        deadline: 'Trước khi hết thời hạn tạm dừng',
        owner: 'Chi cục trưởng',
        desc: 'Ra quyết định xử lý cuối cùng, cập nhật hệ thống, báo cáo Cục.',
        actions: [
          'Nếu xác nhận vi phạm: xử phạt VPHC theo NĐ 46/2024, tịch thu tiêu hủy',
          'Nếu không vi phạm: thông quan ngay, thông báo hủy lệnh tạm dừng',
          'Nếu không kết luận được trong thời hạn: thông quan kèm bảo lưu nghĩa vụ tài chính',
          'Cập nhật kết quả vào hệ thống quản lý SHTT',
          'Báo cáo Cục theo mẫu định kỳ tháng',
        ],
        forms: [
          { name: 'QĐ-07: Quyết định xử phạt VPHC', note: 'Nếu có vi phạm' },
          { name: 'BC-10: Báo cáo kết quả xử lý vụ việc', note: 'Nộp Cục trong 05 ngày sau khi kết thúc' },
        ],
        contacts: [
          { role: 'Phòng Kiểm soát – Cục', action: 'Báo cáo kết quả xử lý' },
          { role: 'Chủ thể quyền', action: 'Thông báo kết quả cuối cùng' },
        ],
        warning: 'Nếu hết thời hạn tạm dừng mà chưa có kết luận, bắt buộc thông quan. Không được tự ý gia hạn quá thời gian luật định.'
      }
    ]
  },
  {
    id: 'penalty',
    title: 'Xử phạt & Tịch thu',
    subtitle: 'Quy trình ra quyết định xử phạt và tịch thu hàng vi phạm',
    icon: Gavel,
    color: 'text-red-600',
    bg: 'bg-red-50',
    trigger: 'Đã có kết luận giám định xác nhận vi phạm. Tiến hành hoàn thiện hồ sơ xử phạt vi phạm hành chính và xử lý tang vật.',
    legalBasis: ['NĐ 46/2024/NĐ-CP', 'NĐ 99/2013 (đã sửa đổi)', 'NĐ 126/2021/NĐ-CP', 'Luật Xử lý VPHC 2012 sửa đổi 2020'],
    steps: [
      {
        id: 1,
        title: 'Xác định thẩm quyền và mức xử phạt',
        deadline: 'Ngay khi có kết luận giám định',
        owner: 'Cán bộ pháp chế Chi cục',
        desc: 'Xác định thẩm quyền xử phạt căn cứ giá trị hàng vi phạm, xác định mức phạt theo NĐ 46/2024.',
        actions: [
          'Tính giá trị CIF của lô hàng vi phạm',
          'Nếu giá trị < 50 triệu VND: Chi cục trưởng có thẩm quyền xử phạt',
          'Nếu giá trị 50–500 triệu VND: Cục trưởng có thẩm quyền',
          'Nếu giá trị > 500 triệu VND: chuyển hồ sơ sang CSĐT',
          'Xác định hành vi vi phạm cụ thể và điều khoản áp dụng',
        ],
        forms: [
          { name: 'TT-01: Tờ trình xác định thẩm quyền xử phạt', note: 'Kèm tính toán giá trị CIF' },
        ],
        contacts: [
          { role: 'Cục trưởng Cục Hải quan', action: 'Chuyển hồ sơ nếu vượt thẩm quyền Chi cục' },
          { role: 'CSĐT Kinh tế', action: 'Chuyển hồ sơ nếu giá trị > 500 triệu VND' },
        ],
        warning: 'Tuyệt đối không xử phạt vượt thẩm quyền. Chuyển hồ sơ ngay khi giá trị vượt ngưỡng thẩm quyền.'
      },
      {
        id: 2,
        title: 'Lập hồ sơ vi phạm và thông báo cho đương sự',
        deadline: 'Trong vòng 5 ngày làm việc',
        owner: 'Cán bộ pháp chế',
        desc: 'Hoàn thiện hồ sơ vi phạm, thông báo quyền giải trình của đương sự.',
        actions: [
          'Lập biên bản vi phạm hành chính (VPHC)',
          'Giao biên bản cho đương sự (chủ hàng hoặc đại lý)',
          'Thông báo quyền giải trình trong 5 ngày',
          'Thu thập và lưu toàn bộ bằng chứng: ảnh, biên bản giám định, tờ khai',
          'Xem xét giải trình nếu đương sự có phản hồi',
        ],
        forms: [
          { name: 'BB-VPHC: Biên bản vi phạm hành chính', note: 'Lập theo Mẫu số 01 Nghị định 118/2021' },
          { name: 'TB-02: Thông báo quyền giải trình', note: 'Giao trực tiếp hoặc gửi bưu điện có xác nhận' },
        ],
        contacts: [
          { role: 'Đương sự (chủ hàng / đại lý)', action: 'Giao biên bản, thông báo quyền giải trình' },
        ],
        tip: 'Quyền giải trình là bắt buộc theo luật. Bỏ qua bước này có thể làm vô hiệu quyết định xử phạt.'
      },
      {
        id: 3,
        title: 'Ban hành Quyết định xử phạt VPHC',
        deadline: '7 ngày kể từ khi hết hạn giải trình',
        owner: 'Chi cục trưởng / Cục trưởng',
        desc: 'Ký ban hành Quyết định xử phạt vi phạm hành chính, giao đương sự thi hành.',
        actions: [
          'Xem xét toàn bộ hồ sơ và giải trình của đương sự (nếu có)',
          'Dự thảo Quyết định xử phạt VPHC',
          'Lãnh đạo có thẩm quyền ký ban hành',
          'Giao Quyết định cho đương sự trong 02 ngày làm việc',
          'Thông báo thời hạn thi hành: 10 ngày kể từ ngày nhận QĐ',
        ],
        forms: [
          { name: 'QĐ-XPVPHC: Quyết định xử phạt VPHC', note: 'Theo Mẫu số 02 Nghị định 118/2021' },
        ],
        contacts: [
          { role: 'Đương sự', action: 'Giao Quyết định, thông báo thời hạn nộp phạt và quyền khiếu nại' },
          { role: 'Phòng Tài vụ – Cục', action: 'Phối hợp tiếp nhận tiền phạt vào ngân sách nhà nước' },
        ],
        tip: 'Thời hiệu xử phạt VPHC về SHCN là 02 năm kể từ ngày vi phạm. Quá thời hiệu không được xử phạt.'
      },
      {
        id: 4,
        title: 'Thi hành: thu phạt và tiêu hủy hàng vi phạm',
        deadline: 'Trong vòng 10 ngày thi hành QĐ',
        owner: 'Cán bộ thi hành + Tổ giám sát',
        desc: 'Theo dõi thi hành quyết định, tổ chức tiêu hủy tang vật theo quy định.',
        actions: [
          'Theo dõi nộp tiền phạt của đương sự vào kho bạc nhà nước',
          'Lập Hội đồng tiêu hủy tang vật (nếu tịch thu)',
          'Tiêu hủy tại cơ sở được phép, có chứng kiến các bên',
          'Lập biên bản tiêu hủy, chụp ảnh, quay video làm bằng chứng',
          'Lưu hồ sơ vụ việc đầy đủ ít nhất 05 năm',
        ],
        forms: [
          { name: 'BB-TH: Biên bản tiêu hủy tang vật vi phạm', note: 'Ký xác nhận đầy đủ các thành viên Hội đồng' },
          { name: 'BC-KQ: Báo cáo kết quả thi hành QĐ', note: 'Gửi Cục trong 10 ngày sau khi thi hành xong' },
        ],
        contacts: [
          { role: 'Cục Hải quan', action: 'Báo cáo kết quả thi hành và thống kê vào hệ thống' },
          { role: 'Chủ thể quyền', action: 'Thông báo đã hoàn tất xử lý, gửi biên bản tiêu hủy' },
        ],
        tip: 'Biên bản tiêu hủy là tài liệu pháp lý quan trọng để chứng minh thi hành nghiêm túc nếu có kiểm tra sau này.'
      }
    ]
  }
];

export default function QuyTrinhXuLy() {
  const [mounted, setMounted] = useState(false);
  const [activeScenario, setActiveScenario] = useState<Scenario>(SCENARIOS[0]);
  const [activeStep, setActiveStep] = useState<number | null>(1);
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

  useEffect(() => { setMounted(true); }, []);

  const toggleCheck = (key: string) => {
    setCheckedItems(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const completedSteps = activeScenario.steps.filter(s =>
    s.actions.every((_, ai) => checkedItems[`${activeScenario.id}-${s.id}-${ai}`])
  ).length;

  if (!mounted) return null;

  return (
    <div className="flex flex-col min-h-screen bg-[#f1f5f9] -m-6 lg:-m-12 p-6 lg:p-10 space-y-6 max-w-[1600px] mx-auto font-sans">

      {/* HEADER */}
      <div className="bg-[#0a192f] rounded-3xl p-8 lg:p-10 shadow-2xl relative overflow-hidden border border-slate-800">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-purple-500/10 to-transparent pointer-events-none" />
        <div className="relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-purple-500 text-white text-[11px] font-bold uppercase tracking-wider rounded-full mb-4 shadow-lg shadow-purple-500/30">
            <Gavel className="w-3.5 h-3.5" /> Hướng dẫn tác nghiệp
          </div>
          <h1 className="text-3xl lg:text-4xl font-extrabold text-white tracking-tight mb-2">
            Quy trình <span className="text-purple-400">xử lý vi phạm SHTT</span>
          </h1>
          <p className="text-slate-400 font-medium max-w-2xl">
            Hướng dẫn từng bước tương tác — chọn tình huống, thực hiện theo quy trình, đánh dấu hoàn thành từng hành động.
          </p>
        </div>
      </div>

      {/* SCENARIO SELECTOR */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {SCENARIOS.map(sc => {
          const Icon = sc.icon;
          const isActive = activeScenario.id === sc.id;
          return (
            <button
              key={sc.id}
              onClick={() => { setActiveScenario(sc); setActiveStep(1); setCheckedItems({}); }}
              className={`p-5 rounded-2xl border-2 text-left transition-all duration-300 ${isActive ? 'border-[#0a192f] bg-white shadow-lg' : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-md'}`}
            >
              <div className={`w-12 h-12 rounded-xl ${sc.bg} flex items-center justify-center mb-3 ${isActive ? 'scale-110' : ''} transition-transform`}>
                <Icon className={`w-6 h-6 ${sc.color}`} />
              </div>
              <h3 className={`font-black text-base mb-1 ${isActive ? 'text-[#0a192f]' : 'text-slate-700'}`}>{sc.title}</h3>
              <p className="text-xs font-medium text-slate-500 leading-relaxed">{sc.subtitle}</p>
              {isActive && (
                <div className="mt-3 flex items-center gap-2">
                  <div className="flex-1 bg-slate-100 rounded-full h-1.5">
                    <div className="bg-[#0a192f] h-1.5 rounded-full transition-all" style={{ width: `${(completedSteps / activeScenario.steps.length) * 100}%` }} />
                  </div>
                  <span className="text-[11px] font-bold text-slate-500">{completedSteps}/{activeScenario.steps.length}</span>
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* TRIGGER + LEGAL BASIS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
          <p className="text-[11px] font-extrabold text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-1.5">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-500" /> Điều kiện kích hoạt quy trình
          </p>
          <p className="text-sm font-medium text-slate-700 leading-relaxed">{activeScenario.trigger}</p>
        </div>
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
          <p className="text-[11px] font-extrabold text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-1.5">
            <FileText className="w-3.5 h-3.5 text-blue-500" /> Căn cứ pháp lý
          </p>
          <div className="flex flex-wrap gap-2">
            {activeScenario.legalBasis.map((b, i) => (
              <span key={i} className="px-3 py-1.5 bg-blue-50 text-blue-700 rounded-lg text-xs font-bold border border-blue-100">{b}</span>
            ))}
          </div>
        </div>
      </div>

      {/* STEPS */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Step index sidebar */}
        <div className="w-full lg:w-64 shrink-0">
          <div className="bg-white rounded-2xl border border-slate-200 p-4 sticky top-4 shadow-sm">
            <p className="text-[11px] font-extrabold text-slate-400 uppercase tracking-widest mb-3">Các bước</p>
            <div className="space-y-2">
              {activeScenario.steps.map(s => {
                const stepDone = s.actions.every((_, ai) => checkedItems[`${activeScenario.id}-${s.id}-${ai}`]);
                return (
                  <button
                    key={s.id}
                    onClick={() => setActiveStep(activeStep === s.id ? null : s.id)}
                    className={`w-full text-left p-3 rounded-xl transition-all flex items-center gap-3 ${activeStep === s.id ? 'bg-[#0a192f] text-white' : 'hover:bg-slate-50 text-slate-600'}`}
                  >
                    {stepDone
                      ? <CheckCircle2 className={`w-4 h-4 shrink-0 ${activeStep === s.id ? 'text-emerald-400' : 'text-emerald-500'}`} />
                      : <div className={`w-4 h-4 rounded-full border-2 shrink-0 flex items-center justify-center text-[10px] font-black ${activeStep === s.id ? 'border-white text-white' : 'border-slate-400 text-slate-500'}`}>{s.id}</div>
                    }
                    <span className="text-[12px] font-bold leading-tight">{s.title}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Step detail */}
        <div className="flex-1 space-y-4">
          {activeScenario.steps.map(step => (
            <div key={step.id} className={`bg-white rounded-2xl border transition-all duration-300 overflow-hidden ${activeStep === step.id ? 'border-[#0a192f] shadow-lg' : 'border-slate-200 shadow-sm'}`}>
              <button
                className="w-full flex items-center justify-between p-5 text-left"
                onClick={() => setActiveStep(activeStep === step.id ? null : step.id)}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-base shrink-0 ${activeStep === step.id ? 'bg-[#0a192f] text-white' : 'bg-slate-100 text-slate-500'}`}>
                    {step.id}
                  </div>
                  <div>
                    <h3 className={`font-black text-base ${activeStep === step.id ? 'text-[#0a192f]' : 'text-slate-700'}`}>{step.title}</h3>
                    <div className="flex items-center gap-3 mt-0.5">
                      <span className="text-xs font-semibold text-slate-500 flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {step.deadline}
                      </span>
                      <span className="text-xs font-semibold text-slate-500 flex items-center gap-1">
                        <Users className="w-3 h-3" /> {step.owner}
                      </span>
                    </div>
                  </div>
                </div>
                <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform shrink-0 ${activeStep === step.id ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {activeStep === step.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 pb-5 space-y-5 border-t border-slate-100 pt-4">
                      <p className="text-sm font-medium text-slate-600 leading-relaxed">{step.desc}</p>

                      {/* Warning / Tip */}
                      {step.warning && (
                        <div className="flex items-start gap-3 p-3 bg-red-50 rounded-xl border border-red-200">
                          <AlertTriangle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                          <p className="text-sm font-medium text-red-800">{step.warning}</p>
                        </div>
                      )}
                      {step.tip && (
                        <div className="flex items-start gap-3 p-3 bg-emerald-50 rounded-xl border border-emerald-200">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          <p className="text-sm font-medium text-emerald-800">{step.tip}</p>
                        </div>
                      )}

                      {/* Checklist */}
                      <div>
                        <p className="text-[11px] font-extrabold text-slate-400 uppercase tracking-widest mb-2">Hành động cần thực hiện</p>
                        <div className="space-y-2">
                          {step.actions.map((action, ai) => {
                            const key = `${activeScenario.id}-${step.id}-${ai}`;
                            const checked = !!checkedItems[key];
                            return (
                              <button
                                key={ai}
                                onClick={() => toggleCheck(key)}
                                className={`w-full flex items-start gap-3 p-3 rounded-xl text-left transition-all ${checked ? 'bg-emerald-50 border border-emerald-200' : 'bg-slate-50 border border-slate-200 hover:bg-slate-100'}`}
                              >
                                {checked
                                  ? <CheckSquare className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                                  : <Square className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                                }
                                <span className={`text-sm font-medium leading-relaxed ${checked ? 'text-emerald-800 line-through decoration-emerald-400' : 'text-slate-700'}`}>
                                  {action}
                                </span>
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Forms */}
                      <div>
                        <p className="text-[11px] font-extrabold text-slate-400 uppercase tracking-widest mb-2">Biểu mẫu</p>
                        <div className="space-y-2">
                          {step.forms.map((f, fi) => (
                            <div key={fi} className="flex items-start justify-between p-3 bg-slate-50 rounded-xl border border-slate-200 gap-3">
                              <div className="flex items-start gap-2">
                                <FileText className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                                <div>
                                  <p className="text-sm font-bold text-[#0a192f]">{f.name}</p>
                                  <p className="text-xs font-medium text-slate-500 mt-0.5">{f.note}</p>
                                </div>
                              </div>
                              <button className="shrink-0 w-8 h-8 rounded-lg bg-white border border-slate-200 hover:bg-blue-50 hover:border-blue-200 flex items-center justify-center transition-colors">
                                <Printer className="w-3.5 h-3.5 text-slate-500" />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Contacts */}
                      <div>
                        <p className="text-[11px] font-extrabold text-slate-400 uppercase tracking-widest mb-2">Liên lạc</p>
                        <div className="space-y-2">
                          {step.contacts.map((c, ci) => (
                            <div key={ci} className="flex items-start gap-3 p-3 bg-blue-50 rounded-xl border border-blue-100">
                              <Phone className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                              <div>
                                <p className="text-sm font-bold text-blue-900">{c.role}</p>
                                <p className="text-xs font-medium text-blue-700 mt-0.5">{c.action}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Next step button */}
                      {step.id < activeScenario.steps.length && (
                        <button
                          onClick={() => setActiveStep(step.id + 1)}
                          className="w-full py-3 bg-[#0a192f] hover:bg-slate-800 text-white font-bold text-sm rounded-xl flex items-center justify-center gap-2 transition-colors"
                        >
                          Bước tiếp theo <ArrowRight className="w-4 h-4" />
                        </button>
                      )}
                      {step.id === activeScenario.steps.length && (
                        <div className="py-3 bg-emerald-50 rounded-xl border border-emerald-200 text-center">
                          <CheckCircle2 className="w-5 h-5 text-emerald-600 mx-auto mb-1" />
                          <p className="text-sm font-bold text-emerald-800">Hoàn tất quy trình</p>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
