import fs from 'fs';
import path from 'path';

const DATA_PATH = path.join(process.cwd(), 'data', 'documents.json');
const SOURCE_DIR = "C:\\Users\\KCCShopVn\\Desktop\\Luyện AI\\Hải Quan\\Gia han";

async function bulkIngest() {
  console.log("🌀 Bắt đầu quét dữ liệu từ:", SOURCE_DIR);
  
  if (!fs.existsSync(SOURCE_DIR)) {
    console.error("❌ Thư mục không tồn tại!");
    return;
  }

  const files = fs.readdirSync(SOURCE_DIR).filter(f => f.toLowerCase().endsWith('.pdf'));
  console.log(`📦 Tìm thấy ${files.length} file PDF.`);

  // Load existing data
  let existingData = [];
  if (fs.existsSync(DATA_PATH)) {
    existingData = JSON.parse(fs.readFileSync(DATA_PATH, 'utf-8'));
  }

  const newDocs = files.map((filename, i) => {
    // Pattern: [Code] [Date] [Name].pdf
    // VD: 24541 16092025 Hermes.pdf
    const base = filename.replace('.pdf', '');
    const parts = base.split(' ');
    const code = parts[0] || "N/A";
    const date = parts[1] || "N/A";
    const name = parts.slice(2).join(' ') || "Chưa rõ tên";

    return {
      id: `gh-${Date.now()}-${i}`,
      code,
      name,
      type: "Gia hạn",
      date,
      filename,
      description: `Bản scan công văn gia hạn nhãn hiệu ${name}. Mã hồ sơ ${code}. Hạn sử dụng/Ngày hiệu lực: ${date.slice(0,2)}/${date.slice(2,4)}/${date.slice(4)}.`,
      filePath: path.join(SOURCE_DIR, filename)
    };
  });

  // Unique merge by code
  const finalData = [...existingData];
  newDocs.forEach(newDoc => {
    if (!finalData.find(d => d.code === newDoc.code)) {
      finalData.push(newDoc);
    }
  });

  fs.writeFileSync(DATA_PATH, JSON.stringify(finalData, null, 2));
  console.log(`✅ Hoàn tất! Đã thêm ${newDocs.length} bản ghi vào kho lưu trữ hệ thống.`);
}

bulkIngest().catch(console.error);
