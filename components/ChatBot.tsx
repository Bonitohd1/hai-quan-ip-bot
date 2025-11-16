"use client";

import React, { useEffect, useRef, useState } from 'react';

type Message = { id: number; from: 'user' | 'bot'; text: string };

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, from: 'bot', text: 'Chào bạn! Tôi là Trợ lý AI Sở hữu Trí tuệ Hải quan. Bạn muốn hỏi gì?' },
  ]);
  const [input, setInput] = useState('');
  const nextId = useRef(2);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (open) bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, open]);

  function send() {
    if (!input.trim()) return;
    const userMsg: Message = { id: nextId.current++, from: 'user', text: input.trim() };
    setMessages((p) => [...p, userMsg]);
    setInput('');

// Call Dify API endpoint
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: input.trim() }),
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
    }
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className={`flex flex-col w-80 max-w-sm bg-white shadow-xl rounded-lg overflow-hidden ${open ? '' : 'h-12'}`}>
        <div className="flex items-center justify-between bg-blue-900 text-white px-3 py-2 cursor-pointer" onClick={() => setOpen((o) => !o)}>
          <div className="flex items-center gap-2">
            <span>🤖</span>
            <span className="font-semibold">Trợ lý SHTT</span>
          </div>
          <div className="text-sm opacity-90">{open ? 'Đóng' : 'Mở'}</div>
        </div>

        {open && (
          <>
            <div className="p-3 flex-1 h-64 overflow-y-auto bg-gray-50">
              {messages.map((m) => (
                <div key={m.id} className={`mb-2 flex ${m.from === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`px-3 py-2 rounded-lg ${m.from === 'user' ? 'bg-blue-600 text-white' : 'bg-white border'} max-w-[80%]`}>
                    {m.text}
                  </div>
                </div>
              ))}
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
                className="flex-1 border rounded-md px-3 py-2"
                placeholder="Nhập câu hỏi..."
              />
              <button onClick={send} className="bg-blue-900 text-white px-3 py-2 rounded-md">
                Gửi
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
