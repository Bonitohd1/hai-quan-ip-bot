import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';

/**
 * PDF Proxy — serves PDFs from public/ without X-Frame-Options header
 * so they can be embedded in <iframe> within the same app.
 *
 * Usage: /api/pdf?file=filename.pdf&folder=documents
 *        /api/pdf?file=filename.pdf&folder=van-ban
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const file = searchParams.get('file') || '';
    const folder = searchParams.get('folder') || 'documents';

    // Security: only allow safe filenames (no path traversal)
    const sanitized = file.replace(/[^a-zA-Z0-9._\-]/g, '');
    if (!sanitized || sanitized !== file || !sanitized.endsWith('.pdf')) {
      return new NextResponse('Invalid file name', { status: 400 });
    }

    // Only allow specific public folders
    const allowed = ['documents', 'van-ban'];
    if (!allowed.includes(folder)) {
      return new NextResponse('Invalid folder', { status: 400 });
    }

    const filePath = path.join(process.cwd(), 'public', folder, sanitized);

    if (!fs.existsSync(filePath)) {
      return new NextResponse('File not found', { status: 404 });
    }

    const buffer = fs.readFileSync(filePath);

    return new NextResponse(buffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `inline; filename="${sanitized}"`,
        'Cache-Control': 'public, max-age=86400',
        // Intentionally NO X-Frame-Options → allows iframe embed on same origin
      },
    });
  } catch (err) {
    return new NextResponse('Server error', { status: 500 });
  }
}
