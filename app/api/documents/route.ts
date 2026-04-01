import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import prisma from '@/lib/prisma';
import { CreateDocumentSchema } from '@/lib/validations';
import { logger } from '@/lib/logger';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const documents = await prisma.document.findMany({
      orderBy: { createdAt: 'desc' },
    });
    logger.info(`Fetched ${documents.length} documents from ${process.env.DATABASE_URL}`);
    return NextResponse.json({ documents });
  } catch (error) {
    logger.error('CRITICAL: Error fetching documents from database', error instanceof Error ? error : new Error(String(error)));
    return NextResponse.json({ documents: [], error: 'Không thể kết nối cơ sở dữ liệu' });
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

    // Validate with Zod
    const validation = CreateDocumentSchema.safeParse({
      code,
      date: date || new Date().toLocaleDateString('vi-VN'),
      name,
      filename: filename.replace(/[^a-zA-Z0-9._-]/g, '_'),
      type: type || 'Gia hạn',
      description: `Công văn ${type || 'gia hạn'} bảo hộ cho ${name}`,
    });

    if (!validation.success) {
      return NextResponse.json({ error: 'Dữ liệu không hợp lệ' }, { status: 400 });
    }

    // Lưu file PDF
    const docDir = path.join(process.cwd(), 'public', 'documents');
    if (!fs.existsSync(docDir)) {
      fs.mkdirSync(docDir, { recursive: true });
    }

    const sanitizedFilename = validation.data.filename;
    const filepath = path.join(docDir, sanitizedFilename);
    const buffer = await file.arrayBuffer();
    fs.writeFileSync(filepath, Buffer.from(buffer));

    // Kiểm tra xem mã này đã tồn tại chưa
    const existing = await prisma.document.findUnique({ where: { code } });

    let document;
    if (existing) {
      // Update existing
      document = await prisma.document.update({
        where: { code },
        data: validation.data,
      });
    } else {
      // Create new
      document = await prisma.document.create({
        data: validation.data,
      });
    }

    logger.info(`Document ${existing ? 'updated' : 'created'}`, { code, name });
    return NextResponse.json({ success: true, document });
  } catch (error) {
    logger.error('Upload error', error instanceof Error ? error : new Error(String(error)));
    return NextResponse.json({ error: 'Lỗi upload file' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { code } = await request.json();

    const docToDelete = await prisma.document.findUnique({ where: { code } });
    if (!docToDelete) {
      return NextResponse.json({ error: 'Công văn không tìm thấy' }, { status: 404 });
    }

    // Xóa file
    const filepath = path.join(process.cwd(), 'public', 'documents', docToDelete.filename);
    if (fs.existsSync(filepath)) {
      fs.unlinkSync(filepath);
    }

    // Xóa từ database
    await prisma.document.delete({ where: { code } });

    logger.info('Document deleted', { code });
    return NextResponse.json({ success: true });
  } catch (error) {
    logger.error('Delete error', error instanceof Error ? error : new Error(String(error)));
    return NextResponse.json({ error: 'Lỗi xóa công văn' }, { status: 500 });
  }
}
