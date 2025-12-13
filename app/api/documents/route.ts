import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const DOCUMENTS_FILE = path.join(process.cwd(), 'lib', 'documents.json');

export async function GET() {
  try {
    const data = fs.readFileSync(DOCUMENTS_FILE, 'utf-8');
    const documents = JSON.parse(data);
    return NextResponse.json(documents);
  } catch (error) {
    return NextResponse.json({ documents: [] });
  }
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const name = formData.get('name') as string;
    const date = formData.get('date') as string;
    const type = formData.get('type') as string;

    if (!file || !name) {
      return NextResponse.json({ error: 'File và tên là bắt buộc' }, { status: 400 });
    }

    // Parse tên file để lấy mã công văn
    const filename = file.name;
    const codeParts = filename.match(/^(\d+)/);
    const code = codeParts ? codeParts[1] : Date.now().toString();

    // Lưu file PDF
    const docDir = path.join(process.cwd(), 'public', 'documents');
    if (!fs.existsSync(docDir)) {
      fs.mkdirSync(docDir, { recursive: true });
    }

    const sanitizedFilename = filename.replace(/[^a-zA-Z0-9._-]/g, '_');
    const filepath = path.join(docDir, sanitizedFilename);
    const buffer = await file.arrayBuffer();
    fs.writeFileSync(filepath, Buffer.from(buffer));

    // Cập nhật documents.json
    const data = fs.readFileSync(DOCUMENTS_FILE, 'utf-8');
    const documents = JSON.parse(data);

    const newDoc = {
      id: code,
      code,
      date: date || new Date().toLocaleDateString('vi-VN'),
      name,
      filename: sanitizedFilename,
      type: type || 'Gia hạn',
      description: `Công văn ${type || 'gia hạn'} bảo hộ cho ${name}`,
    };

    // Kiểm tra xem mã này đã tồn tại chưa
    const existingIndex = documents.documents.findIndex((d: any) => d.code === code);
    if (existingIndex >= 0) {
      documents.documents[existingIndex] = newDoc;
    } else {
      documents.documents.push(newDoc);
    }

    fs.writeFileSync(DOCUMENTS_FILE, JSON.stringify(documents, null, 2));

    return NextResponse.json({ success: true, document: newDoc });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ error: 'Lỗi upload file' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { code } = await request.json();

    const data = fs.readFileSync(DOCUMENTS_FILE, 'utf-8');
    const documents = JSON.parse(data);

    const docToDelete = documents.documents.find((d: any) => d.code === code);
    if (docToDelete) {
      const filepath = path.join(process.cwd(), 'public', 'documents', docToDelete.filename);
      if (fs.existsSync(filepath)) {
        fs.unlinkSync(filepath);
      }
    }

    documents.documents = documents.documents.filter((d: any) => d.code !== code);
    fs.writeFileSync(DOCUMENTS_FILE, JSON.stringify(documents, null, 2));

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Lỗi xóa công văn' }, { status: 500 });
  }
}
