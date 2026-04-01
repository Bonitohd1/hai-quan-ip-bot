import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const DATA_PATH = path.join(process.cwd(), 'data', 'documents.json');
const SOURCE_DIR = Buffer.from("C:\\Users\\KCCShopVn\\Desktop\\Luyện AI\\Hải Quan\\Gia han", 'utf8').toString();

export async function GET() {
  try {
    console.log("🌀 Bulk Ingesting from:", SOURCE_DIR);
    
    if (!fs.existsSync(SOURCE_DIR)) {
      return NextResponse.json({ message: "Thư mục không tồn tại: " + SOURCE_DIR }, { status: 404 });
    }

    const files = fs.readdirSync(SOURCE_DIR).filter(f => f.toLowerCase().endsWith('.pdf'));

    // Load existing data
    let finalData = [];
    if (fs.existsSync(DATA_PATH)) {
      finalData = JSON.parse(fs.readFileSync(DATA_PATH, 'utf-8'));
    }

    let addedCount = 0;
    files.forEach((filename, i) => {
      // Pattern: [Code] [Date] [Name].pdf
      const base = filename.replace('.pdf', '');
      const parts = base.split(' ');
      const code = parts[0] || "N/A";
      const date = parts[1] || "N/A";
      const name = parts.slice(2).join(' ') || "Chưa rõ tên";

      if (!finalData.find((d: any) => d.code === code)) {
        finalData.push({
          id: `gh-${Date.now()}-${addedCount}-${i}`,
          code,
          name,
          type: "Gia hạn",
          date,
          filename,
          description: `Bản scan công văn gia hạn nhãn hiệu ${name}. Mã hồ sơ ${code}. Hạn sử dụng/Ngày hiệu lực: ${date.slice(0,2)}/${date.slice(2,4)}/${date.slice(4)}.`,
          filePath: path.join(SOURCE_DIR, filename)
        });
        addedCount++;
      }
    });

    fs.writeFileSync(DATA_PATH, JSON.stringify(finalData, null, 2));

    return NextResponse.json({ message: `✅ Đã quét xong! Tìm thấy ${files.length} file. Đã thêm mới ${addedCount} bản ghi vào hệ thống.` });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
