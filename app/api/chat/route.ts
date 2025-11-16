import { NextRequest, NextResponse } from 'next/server';

const DIFY_API_BASE = process.env.NEXT_PUBLIC_DIFY_API_BASE || 'http://dify.vietduc-ai.com/v1';
const DIFY_API_KEY = process.env.DIFY_API_KEY || 'app-KGEm4cL2Xrc40xfnEkB4';

export async function POST(request: NextRequest) {
  try {
    const { query, conversation_id } = await request.json();
    
    if (!query) {
      return NextResponse.json(
        { error: 'Query is required' },
        { status: 400 }
      );
    }

    const payload = {
      inputs: {},
      query,
      response_mode: 'blocking',
      conversation_id: conversation_id || '',
      user: 'user-id',
    };

    const response = await fetch(`${DIFY_API_BASE}/chat-messages`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${DIFY_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('Dify API error:', response.status, errorData);
      return NextResponse.json(
        { error: `Dify API error: ${response.status}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    console.log('Dify API response:', JSON.stringify(data, null, 2));
    
    // Extract the answer from the response
    const answer = data.answer || data.message || 'No response from Dify';

    return NextResponse.json({
      answer,
      conversation_id: data.conversation_id,
    });
  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
