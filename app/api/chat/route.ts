import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { logger } from '@/lib/logger';

function extractAnswerFromDify(data: any): string | null {
  if (!data) return null;

  // common Dify shapes
  try {
    if (typeof data === 'string') return data;

    if (data.output && Array.isArray(data.output)) {
      for (const o of data.output) {
        if (!o) continue;
        if (o.content && Array.isArray(o.content)) {
          for (const c of o.content) {
            if (!c) continue;
            if (c.type === 'output_text' && c.text) return c.text;
            if (c.text) return c.text;
          }
        }
        if (o.text) return o.text;
      }
    }

    if (data.choices && Array.isArray(data.choices)) {
      const c = data.choices[0];
      if (c) {
        if (c.message && c.message.content) return c.message.content;
        if (c.text) return c.text;
      }
    }

    if (data.output_text) return data.output_text;
    if (data.answer) return data.answer;
    if (data.result) return typeof data.result === 'string' ? data.result : JSON.stringify(data.result);
  } catch (e) {
    // fall through to null
  }

  return null;
}

async function searchDocuments(query: string) {
  try {
    const searchTerms = query.toLowerCase().split(' ').filter(t => t.length > 2);
    
    if (searchTerms.length === 0) {
      return null;
    }

    // Search in document name and description
    const documents = await prisma.document.findMany({
      where: {
        OR: searchTerms.map(term => ({
          OR: [
            { name: { contains: term, mode: 'insensitive' } },
            { description: { contains: term, mode: 'insensitive' } },
            { code: { contains: term } },
          ]
        }))
      },
      take: 5,
    });

    if (documents.length === 0) {
      return null;
    }

    const docList = documents
      .map((doc: any) => `- ${doc.code}: ${doc.name}`)
      .join('\n');

    return `Tìm thấy ${documents.length} công văn liên quan:\n${docList}\n\nVui lòng xem chi tiết trong mục "Tài liệu".`;
  } catch (error) {
    logger.error('Document search error', error instanceof Error ? error : new Error(String(error)));
    return null;
  }
}

export async function POST(request: NextRequest) {
  try {
    const { query } = await request.json();

    if (!query || typeof query !== 'string') {
      return NextResponse.json({ error: 'Query is required' }, { status: 400 });
    }
    
    // Prevent abuse: limit query length
    if (query.length > 1000) {
      return NextResponse.json({ error: 'Câu hỏi quá dài (tối đa 1000 ký tự)' }, { status: 400 });
    }
    
    // Strip potential HTML/script injection
    const sanitizedQuery = query.replace(/<[^>]*>/g, '').trim();

    const DIFY_API_KEY = process.env.DIFY_API_KEY;
    const DIFY_API_BASE = (process.env.DIFY_API_BASE || process.env.NEXT_PUBLIC_DIFY_API_BASE || '').replace(/\/+$/g, '');

    // If Dify is configured, try it first with a timeout and robust parsing
    if (DIFY_API_KEY && DIFY_API_BASE) {
      try {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 10000);

        const res = await fetch(`${DIFY_API_BASE}/chat-messages`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${DIFY_API_KEY}`,
          },
          body: JSON.stringify({ 
            inputs: {},
            query: query,
            response_mode: 'blocking',
            user: 'user-' + Date.now()
          }),
          signal: controller.signal,
        });

        clearTimeout(timeout);

        if (!res.ok) {
          logger.warn('Dify returned non-OK status', { status: res.status });
          // fallback to document search
          const docAnswer = await searchDocuments(query);
          if (docAnswer) {
            return NextResponse.json({ answer: docAnswer }, { status: 200 });
          }
          const fallback = `Dify API returned ${res.status}. Trả về câu trả lời mô phỏng cho: "${query}"`;
          return NextResponse.json({ answer: fallback }, { status: 200 });
        }

        const data = await res.json();
        let answer = extractAnswerFromDify(data);
        if (!answer) answer = `Dify không trả về câu trả lời rõ ràng. Đây là mô phỏng cho: "${query}"`;

        return NextResponse.json({ answer, conversation_id: (data && data.conversation_id) || '' });
      } catch (fetchErr: any) {
        logger.warn('Dify fetch error', { error: fetchErr?.message || fetchErr });
        // fall through to document search
      }
    }

    // Try document search fallback
    const docAnswer = await searchDocuments(query);
    if (docAnswer) {
      return NextResponse.json({ answer: docAnswer });
    }

    // Mock fallback
    const mockAnswers = [
      `Bạn hỏi: "${query}". Đây là câu trả lời mẫu từ trợ lý SHTT.`,
      `Câu hỏi của bạn: "${query}" rất hay. Tôi sẽ giúp bạn tìm hiểu thêm về sở hữu trí tuệ hải quan.`,
      `Cảm ơn bạn đã hỏi về: "${query}". Đây là một chủ đề quan trọng trong lĩnh vực SHTT.`,
    ];

    const randomAnswer = mockAnswers[Math.floor(Math.random() * mockAnswers.length)];
    return NextResponse.json({ answer: randomAnswer });
  } catch (error) {
    logger.error('Chat API error', error instanceof Error ? error : new Error(String(error)));
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
