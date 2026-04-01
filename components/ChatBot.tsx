'use client';

import React, { useEffect, useRef, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Image from 'next/image';
import { X, Send, Trash2, ChevronUp, ChevronDown } from 'lucide-react';

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
    { id: 1, from: 'bot', text: 'Xin chào! Tôi là Trợ lý AI về Sở hữu trí tuệ Hải quan Việt Nam. Bạn muốn hỏi gì?' },
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
        text: data.answer || 'Xin lỗi, tôi không hiểu câu hỏi của bạn. Vui lòng thử lại.',
      };
      setMessages((p) => [...p, botMsg]);
    } catch (error) {
      console.error('API error:', error);
      const errorMsg: Message = {
        id: nextId.current++,
        from: 'bot',
        text: 'Lỗi: Không thể kết nối tới máy chủ. Vui lòng thử lại sau.',
      };
      setMessages((p) => [...p, errorMsg]);
    } finally {
      setIsSending(false);
    }
  }

  return (
    <div className="fixed bottom-6 right-6 z-[100] font-sans">
      
      {/* Floating Trigger Button (Always visible if not open on desktop, or always for mobile) */}
      {!open && (
        <button 
          onClick={() => setOpen(true)}
          className="flex items-center gap-3 bg-[#1a2b56] text-white pl-4 pr-6 py-3 rounded-xl shadow-2xl shadow-blue-900/40 hover:scale-[1.02] transition-all group active:scale-95 border border-white/10"
        >
          <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center p-1.5 transition-transform group-hover:rotate-12">
             <Image 
               src="/logoHQdaxoanen.png" 
               alt="HQ" 
               width={24} 
               height={24}
               className="object-contain"
             />
          </div>
          <div className="flex flex-col items-start leading-none text-left">
            <span className="text-xs font-black tracking-tight mb-1">Trợ lý SHTT</span>
            <span className="text-[10px] font-bold opacity-70">Mở</span>
          </div>
        </button>
      )}

      {/* Chat window */}
      {open && (
        <div className="flex flex-col w-[90vw] sm:w-[400px] h-[600px] max-h-[85vh] bg-white shadow-2xl rounded-3xl overflow-hidden border border-slate-200 animate-in zoom-in-95 duration-300">
          
          {/* Custom Header */}
          <header className="flex items-center justify-between bg-gradient-to-r from-[#1a2b56] to-[#1e3a8a] text-white px-5 py-5 shadow-lg relative overflow-hidden">
            <div className="relative z-10 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center p-1.5 backdrop-blur-md">
                 <Image src="/logoHQdaxoanen.png" alt="HQ" width={32} height={32} className="object-contain" />
              </div>
              <div className="flex flex-col">
                <span className="font-black tracking-tight text-base leading-none mb-1">Trợ lý SHTT</span>
                <div className="flex items-center gap-1.5 mt-0.5">
                   <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                   <span className="text-[9px] uppercase font-black text-blue-100 tracking-widest">Đang hoạt động</span>
                </div>
              </div>
            </div>
            
            <div className="relative z-10 flex items-center gap-2">
              <button 
                onClick={() => {
                  if (confirm('Xóa hết tin nhắn?')) {
                    setMessages([{ id: 1, from: 'bot', text: 'Xin chào! Tôi đã sẵn sàng hỗ trợ bạn.' }]);
                    setShowSuggestions(true);
                  }
                }}
                className="p-2 hover:bg-white/10 rounded-xl transition-colors"
                title="Xóa lịch sử"
              >
                <Trash2 size={16} />
              </button>
              <button onClick={() => setOpen(false)} className="p-2 hover:bg-white/10 rounded-xl transition-colors bg-white/5">
                <X size={20} />
              </button>
            </div>
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-400/5 blur-[40px] rounded-full translate-x-1/2 -translate-y-1/2" />
          </header>

          {/* Messages area */}
          <div className="flex-1 overflow-y-auto p-5 space-y-5 bg-slate-50 custom-scrollbar scroll-smooth">
            {messages.map((m) => (
              <div key={m.id} className={`flex ${m.from === 'user' ? 'justify-end' : 'justify-start'}`}>
                {m.from === 'bot' && (
                  <div className="mr-3 mt-1 flex-shrink-0 w-8 h-8 rounded-lg bg-[#1a2b56] shadow-md flex items-center justify-center p-1.5">
                    <Image src="/logoHQdaxoanen.png" alt="HQ" width={20} height={20} className="object-contain" />
                  </div>
                )}
                <div
                  className={`px-5 py-4 rounded-2xl shadow-sm max-w-[85%] text-[14px] leading-relaxed transition-all ${
                    m.from === 'user'
                      ? 'bg-[#1a2b56] text-white rounded-br-none font-bold'
                      : 'bg-white text-slate-800 border border-slate-200 rounded-bl-none shadow-sm'
                  }`}
                >
                  <div className={`relative ${m.from === 'bot' && !expanded[m.id] && m.text.length > 500 ? 'max-h-56 overflow-hidden' : ''}`}>
                    {m.from === 'bot' ? (
                      <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        className="prose prose-sm prose-slate max-w-none prose-p:leading-relaxed prose-p:mb-3 prose-li:mb-1 font-bold opacity-90"
                      >
                        {m.text}
                      </ReactMarkdown>
                    ) : (
                      m.text
                    )}
                    {m.from === 'bot' && !expanded[m.id] && m.text.length > 500 && (
                      <div className="absolute bottom-0 inset-x-0 h-10 bg-gradient-to-t from-white to-transparent pointer-events-none" />
                    )}
                  </div>
                  {m.from === 'bot' && m.text.length > 500 && (
                    <button
                      className="mt-2.5 text-[10px] font-black text-blue-600 hover:text-blue-800 uppercase tracking-widest bg-blue-50 px-3 py-1.5 rounded-lg border border-blue-100 flex items-center gap-1.5 transition-all"
                      onClick={() => setExpanded((p) => ({ ...p, [m.id]: !p[m.id] }))}
                    >
                      {expanded[m.id] ? <><ChevronUp size={12} /> Thu gọn</> : <><ChevronDown size={12} /> Xem chi tiết</>}
                    </button>
                  )}
                </div>
              </div>
            ))}
            
            {showSuggestions && messages.length === 1 && (
              <div className="flex flex-col gap-2 pt-2 animate-in fade-in slide-in-from-bottom-4 duration-700">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] px-1 mb-1">Gợi ý tìm hiểu</p>
                <div className="flex flex-col gap-2">
                   {SUGGESTED_QUESTIONS.map((q, idx) => (
                    <button
                      key={idx}
                      onClick={() => send(q)}
                      className="bg-white hover:bg-blue-50 text-slate-700 text-xs font-bold px-4 py-3 rounded-xl border border-slate-200 transition-all hover:border-blue-400/50 hover:translate-x-1 active:scale-95 text-left shadow-sm opacity-90"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {isSending && (
              <div className="flex justify-start">
                <div className="mr-3 w-8 h-8 rounded-lg bg-[#1a2b56] flex items-center justify-center p-1.5">
                  <Image src="/logoHQdaxoanen.png" alt="HQ" width={20} height={20} className="object-contain" />
                </div>
                <div className="px-5 py-3 rounded-2xl bg-white border border-slate-200 shadow-sm flex gap-1.5 items-center">
                   <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                   <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                   <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce"></div>
                </div>
              </div>
            )}
            <div ref={bottomRef} className="h-2" />
          </div>

          {/* Footer input */}
          <div className="p-4 bg-white border-t border-slate-100">
            <div className="flex gap-2 items-center bg-slate-50 p-1.5 rounded-2xl border border-slate-200 group-within:border-blue-300 transition-colors">
              <input
                aria-label="message"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') send(); }}
                className="flex-1 bg-transparent border-none px-4 py-2.5 text-sm focus:ring-0 placeholder-slate-400 font-bold opacity-80"
                placeholder="Nhập câu hỏi của bạn..."
              />
              <button
                onClick={() => send()}
                disabled={isSending || !input.trim()}
                className="bg-[#1a2b56] hover:bg-blue-950 disabled:opacity-30 text-white w-10 h-10 rounded-xl flex items-center justify-center shadow-lg shadow-blue-900/20 transition-all active:scale-95"
              >
                <Send size={18} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
