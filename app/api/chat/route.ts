import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { query } = await request.json();
    
    if (!query) {
      return NextResponse.json(
        { error: 'Query is required' },
        { status: 400 }
      );
    }

    // Mock response for now — replace with real Dify/LLM integration later
    const mockAnswers = [
      `Bạn hỏi: "${query}". Đây là câu trả lời mẫu từ trợ lý SHTT.`,
      `Câu hỏi của bạn: "${query}" rất hay. Tôi sẽ giúp bạn tìm hiểu thêm về sở hữu trí tuệ hải quan.`,
      `Cảm ơn bạn đã hỏi về: "${query}". Đây là một chủ đề quan trọng trong lĩnh vực SHTT.`,
    ];
    
    const randomAnswer = mockAnswers[Math.floor(Math.random() * mockAnswers.length)];
    
    return NextResponse.json({ answer: randomAnswer });
  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

    const payload = {
      inputs: {},
      query,
      response_mode: 'blocking',
      conversation_id: conversation_id || '',
      user: 'user-id',
    };

    let response;
    try {
      // Add timeout to prevent hanging
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 5000);
      
      response = await fetch(`${DIFY_API_BASE}/chat-messages`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${DIFY_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });
      
      clearTimeout(timeout);
    } catch (fetchErr: any) {
      console.error('Dify fetch error:', fetchErr.message);
      const fallback = `Dify not available (${fetchErr.message}). Mock reply for: "${query}"`;
      return NextResponse.json({ answer: fallback }, { status: 200 });
    }

    if (!response.ok) {
      const errorData = await response.text();
      console.error('Dify API error:', response.status, errorData);
      // fallback to mock reply so the user still gets an answer
      const fallback = `Dify API returned ${response.status}. Trả về câu trả lời mô phỏng cho: "${query}"`;
      return NextResponse.json({ answer: fallback }, { status: 200 });
    }

    const data = await response.json();
    console.log('Dify API response:', JSON.stringify(data, null, 2));

    // Try several possible paths in Dify response to extract text
    let answer = '';
    if (typeof data.answer === 'string') answer = data.answer;
    else if (typeof data.message === 'string') answer = data.message;
    else if (Array.isArray(data.results) && data.results.length) {
      // common shape: results[0].content?.[0]?.text or results[0].message
      const first = data.results[0];
      if (first?.content && Array.isArray(first.content)) {
        // join any text parts
        answer = first.content.map((c: any) => c.text || c.value || '').join(' ');
      } else if (first?.message) answer = first.message;
    } else if (Array.isArray(data.choices) && data.choices.length) {
      const ch = data.choices[0];
      if (ch?.message?.content) answer = ch.message.content;
      else if (ch?.text) answer = ch.text;
    }

    if (!answer) answer = `Dify không trả về câu trả lời rõ ràng. Đây là mô phỏng cho: "${query}"`;

    return NextResponse.json({ answer, conversation_id: data.conversation_id || '' });
  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
