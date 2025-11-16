import { NextRequest, NextResponse } from 'next/server';

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

export async function POST(request: NextRequest) {
  try {
    const { query } = await request.json();

    if (!query) {
      return NextResponse.json({ error: 'Query is required' }, { status: 400 });
    }

    const DIFY_API_KEY = process.env.DIFY_API_KEY;
    const DIFY_API_BASE = (process.env.DIFY_API_BASE || process.env.NEXT_PUBLIC_DIFY_API_BASE || '').replace(/\/+$/g, '');

    // If Dify is configured, try it first with a timeout and robust parsing
    if (DIFY_API_KEY && DIFY_API_BASE) {
      try {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 10000);

        const res = await fetch(`${DIFY_API_BASE}/responses`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${DIFY_API_KEY}`,
          },
          body: JSON.stringify({ input: query }),
          signal: controller.signal,
        });

        clearTimeout(timeout);

        if (!res.ok) {
          console.error('Dify returned non-OK status', res.status);
          // fallback to mock reply so the user still gets an answer
          const fallback = `Dify API returned ${res.status}. Trả về câu trả lời mô phỏng cho: "${query}"`;
          return NextResponse.json({ answer: fallback }, { status: 200 });
        }

        const data = await res.json();
        let answer = extractAnswerFromDify(data);
        if (!answer) answer = `Dify không trả về câu trả lời rõ ràng. Đây là mô phỏng cho: "${query}"`;

        return NextResponse.json({ answer, raw: data, conversation_id: (data && data.conversation_id) || '' });
      } catch (fetchErr: any) {
        console.error('Dify fetch error:', fetchErr?.message || fetchErr);
        // fall through to mock
      }
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
    console.error('Chat API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
