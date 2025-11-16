"use client";

import React, { useEffect, useRef, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

type Message = { id: number; from: 'user' | 'bot'; text: string };

const SUGGESTED_QUESTIONS = [
  'Thủ tục Hải quan là gì?',
  'Quy định pháp luật về SHTT?',
  'Thông tin cùng: Tra cứu một nhãn hiệu',
];

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, from: 'bot', text: 'Chào bạn.\n\nTôi là Trợ lý AI, chuyên gia pháp lý về Sở hữu trí tuệ (SHTT) Hải quan Việt Nam.\n\nTôi có thể hỗ trợ bạn các vấn đề sau:\n\n• **Thủ tục Hải quan**: Cung cấp thông tin về các thủ tục như tạm dừng, kiểm tra, giám sát hàng hóa liên quan đến SHTT.\n• **Quy định pháp luật**: Tra cứu và giải thích các quy định theo Luật, Nghị định, Thông tư hiện hành.\n• **Thông tin cùng**: Cung cấp các khái niệm, định nghĩa và thông tin lịch sử về bảo hộ SHTT tại biên giới.\n\nVui lòng cho tôi biết vấn đề bạn đang quan tâm.' },
  ]);
  const [input, setInput] = useState('');
  const [isSending, setIsSending] = useState(false);
  const nextId = useRef(2);
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const [expanded, setExpanded] = useState<Record<number, boolean>>({});

  useEffect(() => {
    if (open) bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, open]);

  async function send(text?: string) {
    const query = text || input.trim();
    if (!query) return;
    const userMsg: Message = { id: nextId.current++, from: 'user', text: query };
    setMessages((p) => [...p, userMsg]);
    setInput('');
    setShowSuggestions(false);
    setIsSending(true);

// Call Dify API endpoint
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query }),
      });

      const data = await response.json();
      const botMsg: Message = {
        id: nextId.current++,
        from: 'bot',
        text: data.answer || 'Sorry, I could not understand. Please try again.',
      };
      setMessages((p) => [...p, botMsg]);
    } catch (error) {
      console.error('API error:', error);
      const errorMsg: Message = {
        id: nextId.current++,
        from: 'bot',
        text: 'Error: Could not connect to the bot. Please try again later.',
      };
      setMessages((p) => [...p, errorMsg]);
    } finally {
      setIsSending(false);
    }
  }
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className={`flex flex-col w-[26rem] max-w-sm bg-white shadow-2xl rounded-2xl overflow-hidden border border-blue-100 ${open ? '' : 'h-12'}`}>
        <div className="flex items-center justify-between bg-blue-900 text-white px-4 py-2 cursor-pointer" onClick={() => setOpen((o) => !o)}>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-yellow-500/90 text-blue-950 font-bold">🤖</span>
            <span className="font-semibold tracking-wide">Trợ lý SHTT</span>
          </div>
          <div className="flex items-center gap-2">
            {open && (
              <button
                aria-label="Xóa lịch sử chat"
                title="Xóa lịch sử chat"
                onClick={(e) => {
                  e.stopPropagation();
                  const ok = confirm('Bạn có chắc muốn xóa toàn bộ lịch sử chat?');
                  if (!ok) return;
                  const welcome: Message = { id: 1, from: 'bot', text: 'Chào bạn.\n\nTôi là Trợ lý AI, chuyên gia pháp lý về Sở hữu trí tuệ (SHTT) Hải quan Việt Nam.\n\nTôi có thể hỗ trợ bạn các vấn đề sau:\n\n• **Thủ tục Hải quan**: Cung cấp thông tin về các thủ tục như tạm dừng, kiểm tra, giám sát hàng hóa liên quan đến SHTT.\n• **Quy định pháp luật**: Tra cứu và giải thích các quy định theo Luật, Nghị định, Thông tư hiện hành.\n• **Thông tin cùng**: Cung cấp các khái niệm, định nghĩa và thông tin lịch sử về bảo hộ SHTT tại biên giới.\n\nVui lòng cho tôi biết vấn đề bạn đang quan tâm.' };
                  setMessages([welcome]);
                  setShowSuggestions(true);
                  nextId.current = 2;
                }}
                className="relative p-1 rounded hover:bg-white/10 transition-transform transform hover:scale-110"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-white opacity-90 transition-colors duration-150">
                  <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 100 2h16a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0015 2H9zM6 7a1 1 0 011 1v10a2 2 0 002 2h6a2 2 0 002-2V8a1 1 0 112 0v10a4 4 0 01-4 4H9a4 4 0 01-4-4V8a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
                <span className="sr-only">Xóa lịch sử chat</span>
              </button>
            )}
            <div className="text-sm opacity-90">{open ? 'Đóng' : 'Mở'}</div>
          </div>
        </div>

        {open && (
          <>
            <div className="p-4 flex-1 h-80 overflow-y-auto bg-gradient-to-b from-blue-50/50 to-white">
              {messages.map((m) => (
                <div key={m.id} className={`mb-3 flex ${m.from === 'user' ? 'justify-end' : 'justify-start'}`}>
                  {m.from === 'bot' && (
                    <div className="mr-2 mt-1 w-7 h-7 rounded-full bg-blue-900/90 text-white flex items-center justify-center text-xs shadow">🤖</div>
                  )}
                  <div
                    className={`px-4 py-3 rounded-2xl shadow-sm max-w-[80%] whitespace-pre-wrap leading-6 text-[14px] ${
                      m.from === 'user'
                        ? 'bg-blue-600 text-white rounded-br-md'
                        : 'bg-white text-gray-800 border border-blue-100 rounded-bl-md'
                    }`}
                  >
                    <div className={`relative ${m.from === 'bot' && !expanded[m.id] && m.text.length > 400 ? 'max-h-56 overflow-hidden pr-1' : ''}`}>
                      {m.from === 'bot' ? (
                        <ReactMarkdown
                          remarkPlugins={[remarkGfm]}
                          components={{
                            a: (props: any) => (
                              <a {...props} className="text-blue-600 underline hover:text-blue-800" target="_blank" rel="noreferrer" />
                            ),
                            ul: ({ children }: any) => <ul className="list-disc pl-5 space-y-1">{children}</ul>,
                            ol: ({ children }: any) => <ol className="list-decimal pl-5 space-y-1">{children}</ol>,
                            code: ({ inline, className, children, ...props }: any) => (
                              inline ? (
                                <code className="px-1 py-0.5 rounded bg-gray-100 text-[13px]" {...props}>{children}</code>
                              ) : (
                                <pre className="bg-gray-900 text-gray-100 p-3 rounded-md overflow-auto text-[13px]"><code {...props} className={className}>{children}</code></pre>
                              )
                            ),
                            p: ({ children }: any) => <p className="mb-2 last:mb-0">{children}</p>,
                          }}
                        >
                          {m.text}
                        </ReactMarkdown>
                      ) : (
                        m.text
                      )}
                      {m.from === 'bot' && !expanded[m.id] && m.text.length > 400 && (
                        <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-white to-transparent" />
                      )}
                    </div>
                    {m.from === 'bot' && m.text.length > 400 && (
                      <button
                        className="mt-2 text-xs font-medium text-blue-700 hover:text-blue-900"
                        onClick={() => setExpanded((p) => ({ ...p, [m.id]: !p[m.id] }))}
                      >
                        {expanded[m.id] ? 'Thu gọn' : 'Xem thêm'}
                      </button>
                    )}
                  </div>
                </div>
              ))}
              {showSuggestions && messages.length === 1 && (
                <div className="mb-3 flex flex-col gap-2">
                  <div className="text-xs text-gray-500 font-medium px-2">Gợi ý câu hỏi:</div>
                  {SUGGESTED_QUESTIONS.map((q, idx) => (
                    <button
                      key={idx}
                      onClick={() => send(q)}
                      className="bg-blue-50 hover:bg-blue-100 text-blue-900 text-sm px-4 py-2.5 rounded-xl border border-blue-200 text-left transition-all hover:shadow-md active:scale-95"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              )}
              {isSending && (
                <div className="mb-3 flex justify-start items-end">
                  <div className="mr-2 mt-1 w-7 h-7 rounded-full bg-blue-900/90 text-white flex items-center justify-center text-xs shadow">🤖</div>
                  <div className="px-4 py-3 rounded-2xl bg-white border border-blue-100 shadow-sm text-gray-500">
                    <span className="inline-flex gap-1">
                      <span className="w-2 h-2 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.2s]"></span>
                      <span className="w-2 h-2 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.1s]"></span>
                      <span className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></span>
                    </span>
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            <div className="p-3 border-t bg-white flex gap-2">
              <input
                aria-label="message"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') send();
                }}
                className="flex-1 border rounded-md px-3 py-2 text-[15px] focus:outline-none focus:ring-2 focus:ring-blue-300"
                placeholder="Nhập câu hỏi..."
              />
              <button
                onClick={() => send()}
                disabled={isSending}
                className="bg-blue-900 hover:bg-blue-800 disabled:opacity-60 text-white px-4 py-2 rounded-md inline-flex items-center gap-2 border-2 border-yellow-500"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                  <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                </svg>
                Gửi
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
