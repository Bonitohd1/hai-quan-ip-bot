'use client';

import React, { useEffect, useRef, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X, Send, Trash2, ChevronDown, ChevronRight, MessageCircle, Sparkles, BookOpen, Copy, Check,
} from 'lucide-react';
import { findNaviAnswer, NAVI_QUICK_PROMPTS } from '../lib/navi-knowledge';

type Message = {
  id: number;
  from: 'user' | 'navi';
  text: string;
  references?: string[];
  ts: number;
};

/** Avatar SVG — cô gái đội mũ Hải quan, style phẳng chuyên nghiệp */
function NaviAvatar({ size = 44 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Navi avatar"
    >
      <defs>
        <linearGradient id="navi-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#fbbf24" />
          <stop offset="55%" stopColor="#f97316" />
          <stop offset="100%" stopColor="#e11d48" />
        </linearGradient>
        <linearGradient id="navi-hat" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1e3a8a" />
          <stop offset="100%" stopColor="#0a192f" />
        </linearGradient>
        <linearGradient id="navi-skin" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fde4cf" />
          <stop offset="100%" stopColor="#f4c49c" />
        </linearGradient>
      </defs>
      {/* bg */}
      <circle cx="32" cy="32" r="32" fill="url(#navi-bg)" />
      {/* neck/shoulders (navy uniform) */}
      <path d="M14 60 C 16 50, 24 46, 32 46 C 40 46, 48 50, 50 60 Z" fill="#0a192f" />
      {/* collar white */}
      <path d="M26 48 L32 52 L38 48 L36 58 L28 58 Z" fill="#f8fafc" />
      {/* gold badge on collar */}
      <circle cx="32" cy="54" r="1.6" fill="#fbbf24" />
      {/* face */}
      <ellipse cx="32" cy="30" rx="10" ry="11" fill="url(#navi-skin)" />
      {/* hair side */}
      <path d="M22 28 Q 20 38 24 42 L 26 32 Z" fill="#3b2418" />
      <path d="M42 28 Q 44 38 40 42 L 38 32 Z" fill="#3b2418" />
      {/* hair under hat (bangs) */}
      <path d="M24 22 Q 32 18 40 22 L 40 26 Q 32 23 24 26 Z" fill="#3b2418" />
      {/* hat brim */}
      <rect x="19" y="20" width="26" height="3.2" rx="1.2" fill="#0a192f" />
      {/* hat top */}
      <path d="M22 20 Q 22 10 32 10 Q 42 10 42 20 Z" fill="url(#navi-hat)" />
      {/* hat band */}
      <rect x="22" y="17" width="20" height="2" fill="#fbbf24" />
      {/* hat emblem (star) */}
      <polygon
        points="32,12 33,15 36,15 33.5,17 34.5,20 32,18.2 29.5,20 30.5,17 28,15 31,15"
        fill="#fbbf24"
      />
      {/* eyes */}
      <circle cx="28" cy="31" r="1.1" fill="#0a192f" />
      <circle cx="36" cy="31" r="1.1" fill="#0a192f" />
      {/* cheeks */}
      <circle cx="26" cy="34" r="1.2" fill="#fca5a5" opacity="0.55" />
      <circle cx="38" cy="34" r="1.2" fill="#fca5a5" opacity="0.55" />
      {/* smile */}
      <path d="M29 36 Q 32 38.5 35 36" stroke="#0a192f" strokeWidth="1.2" fill="none" strokeLinecap="round" />
    </svg>
  );
}

function formatTime(ts: number) {
  const d = new Date(ts);
  return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
}

const GREETING =
  'Em chào Anh/Chị! Em là **Navi** — Trợ lý SHTT Hải quan. ' +
  'Em có thể hỗ trợ Anh/Chị tra cứu khung pháp lý, quy trình kiểm soát biên giới, mức xử phạt và các tình huống thực tiễn trong nghiệp vụ SHTT. ' +
  'Anh/Chị cần hỏi gì ạ?';

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, from: 'navi', text: GREETING, ts: Date.now() },
  ]);
  const [input, setInput] = useState('');
  const [sending, setSending] = useState(false);
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const nextId = useRef(2);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) {
      const t = setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
      return () => clearTimeout(t);
    }
  }, [messages, open, sending]);

  function generateReply(q: string): { text: string; references?: string[] } {
    const hit = findNaviAnswer(q);
    if (hit) {
      return {
        text: `Dạ, em xin trả lời Anh/Chị ạ:\n\n${hit.answer}\n\n*Nếu Anh/Chị cần em phân tích sâu hơn hoặc đối chiếu văn bản, Anh/Chị cứ hỏi tiếp em nhé.*`,
        references: hit.references,
      };
    }
    const low = q.toLowerCase();
    if (low.includes('cảm ơn') || low.includes('thanks') || low.includes('thank')) {
      return { text: 'Dạ, em cảm ơn Anh/Chị đã tin tưởng. Nếu cần hỗ trợ thêm, Anh/Chị cứ gọi em bất cứ lúc nào ạ.' };
    }
    if (low.includes('chào') || low === 'hi' || low === 'hello' || low.startsWith('hi ')) {
      return { text: 'Em chào Anh/Chị ạ! Anh/Chị cần em hỗ trợ nghiệp vụ gì hôm nay ạ?' };
    }
    if (low.includes('tên') && (low.includes('bạn') || low.includes('em'))) {
      return { text: 'Dạ, em tên là **Navi** — Trợ lý SHTT Hải quan. Rất vui được hỗ trợ Anh/Chị ạ!' };
    }
    return {
      text:
        `Dạ, em xin lỗi Anh/Chị, em chưa tìm thấy thông tin khớp chính xác cho câu hỏi **"${q}"** trong cơ sở tri thức của em.\n\n` +
        `Anh/Chị có thể thử hỏi em cụ thể hơn theo các chủ đề sau ạ:\n` +
        `• **Khung pháp lý**: Luật, Nghị định, Thông tư về SHTT\n` +
        `• **Quy trình**: các bước kiểm soát biên giới, hồ sơ yêu cầu\n` +
        `• **Mức phạt**: hành chính, hình sự theo giá trị hàng vi phạm\n` +
        `• **Định nghĩa**: hàng giả mạo, nhãn hiệu nổi tiếng...\n` +
        `• **Thực tiễn**: hàng quá cảnh, hàng xách tay cá nhân...`,
    };
  }

  async function send(text?: string) {
    const q = (text || input).trim();
    if (!q || sending) return;

    setMessages((p) => [...p, { id: nextId.current++, from: 'user', text: q, ts: Date.now() }]);
    setInput('');
    setSending(true);

    const delay = 800 + Math.random() * 700;
    setTimeout(() => {
      const reply = generateReply(q);
      setMessages((p) => [
        ...p,
        { id: nextId.current++, from: 'navi', text: reply.text, references: reply.references, ts: Date.now() },
      ]);
      setSending(false);
    }, delay);
  }

  function copyText(id: number, text: string) {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 1400);
    });
  }

  function resetChat() {
    setMessages([{ id: 1, from: 'navi', text: GREETING, ts: Date.now() }]);
    nextId.current = 2;
  }

  return (
    <div className="fixed bottom-6 right-4 sm:right-6 z-[9999] flex flex-col items-end gap-3 pointer-events-none">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: 20, scale: 0.9, filter: 'blur(10px)' }}
            className="flex flex-col w-[92vw] sm:w-[400px] md:w-[440px] h-[620px] max-h-[85vh] bg-white/95 backdrop-blur-2xl border border-white/40 rounded-3xl overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.25)] pointer-events-auto ring-1 ring-black/5"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 sm:px-5 py-3.5 bg-gradient-to-r from-[#0a192f] via-[#13284a] to-[#0a192f] text-white border-b border-slate-800">
              <div className="flex items-center gap-3 min-w-0">
                <div className="relative shrink-0">
                  <div className="w-11 h-11 rounded-2xl bg-white shadow-lg ring-2 ring-amber-400/50 overflow-hidden flex items-center justify-center">
                    <NaviAvatar size={44} />
                  </div>
                  <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-emerald-400 border-2 border-[#0a192f] animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.9)]" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <p className="text-[15px] font-black tracking-tight">Navi</p>
                    <span className="text-[9px] font-black uppercase tracking-widest px-1.5 py-0.5 bg-emerald-500/20 text-emerald-300 rounded border border-emerald-500/30">
                      Trực tuyến
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-300 font-medium truncate">
                    Trợ lý SHTT Hải quan · em xin lắng nghe ạ
                  </p>
                </div>
              </div>
              <div className="flex gap-1">
                <button
                  onClick={resetChat}
                  title="Làm mới hội thoại"
                  className="w-9 h-9 text-slate-300 hover:text-white hover:bg-white/10 rounded-xl flex items-center justify-center transition-all"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setOpen(false)}
                  className="w-9 h-9 text-slate-300 hover:text-white hover:bg-white/10 rounded-xl flex items-center justify-center transition-all"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-3 sm:px-5 py-4 space-y-4 custom-scrollbar bg-gradient-to-b from-slate-50/60 via-white to-blue-50/30">
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={`flex gap-2 sm:gap-2.5 group animate-fade-in-up ${m.from === 'user' ? 'flex-row-reverse' : ''}`}
                >
                  {/* Avatar */}
                  <div className="shrink-0">
                    {m.from === 'navi' ? (
                      <div className="w-9 h-9 rounded-xl bg-white ring-2 ring-amber-400/50 shadow-md overflow-hidden">
                        <NaviAvatar size={36} />
                      </div>
                    ) : (
                      <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-slate-700 to-slate-900 flex items-center justify-center text-white text-[11px] font-black shadow-sm">
                        A/C
                      </div>
                    )}
                  </div>

                  {/* Bubble */}
                  <div className={`flex flex-col max-w-[82%] ${m.from === 'user' ? 'items-end' : 'items-start'}`}>
                    <div
                      className={`px-4 py-3 rounded-2xl text-[13px] leading-relaxed font-medium shadow-sm border ${
                        m.from === 'user'
                          ? 'bg-gradient-to-br from-[#0a192f] to-[#1e3a5f] text-white border-slate-800 rounded-tr-sm'
                          : 'bg-white text-slate-800 border-slate-200 rounded-tl-sm'
                      }`}
                    >
                      <div className={`navi-md ${m.from === 'user' ? 'navi-md-invert' : ''}`}>
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>{m.text}</ReactMarkdown>
                      </div>

                      {m.references && m.references.length > 0 && (
                        <div className="mt-3 pt-2.5 border-t border-slate-100 flex flex-wrap gap-1.5 items-center">
                          <BookOpen className="w-3 h-3 text-slate-400" />
                          <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                            Căn cứ:
                          </span>
                          {m.references.map((r, i) => (
                            <span
                              key={i}
                              className="text-[10px] font-bold px-1.5 py-0.5 bg-blue-50 text-blue-700 border border-blue-100 rounded"
                            >
                              {r}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className={`flex items-center gap-2 mt-1 px-1 ${m.from === 'user' ? 'flex-row-reverse' : ''}`}>
                      <span className="text-[10px] text-slate-400 font-bold">
                        {m.from === 'user' ? 'Anh/Chị' : 'Navi'} · {formatTime(m.ts)}
                      </span>
                      {m.from === 'navi' && (
                        <button
                          onClick={() => copyText(m.id, m.text)}
                          className="opacity-0 group-hover:opacity-100 text-[10px] text-slate-400 hover:text-blue-600 flex items-center gap-0.5 transition-all font-bold"
                        >
                          {copiedId === m.id ? (
                            <>
                              <Check className="w-3 h-3 text-emerald-500" /> Đã sao chép
                            </>
                          ) : (
                            <>
                              <Copy className="w-3 h-3" /> Sao chép
                            </>
                          )}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}

              {sending && (
                <div className="flex gap-2.5 animate-fade-in-up">
                  <div className="w-9 h-9 rounded-xl bg-white ring-2 ring-amber-400/50 shadow-md overflow-hidden shrink-0">
                    <NaviAvatar size={36} />
                  </div>
                  <div className="bg-white px-4 py-3 rounded-2xl rounded-tl-sm border border-slate-200 shadow-sm flex items-center gap-2">
                    <span className="flex gap-1">
                      <span className="w-1.5 h-1.5 bg-orange-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-1.5 h-1.5 bg-orange-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-1.5 h-1.5 bg-orange-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </span>
                    <span className="text-[11px] text-slate-400 font-bold uppercase tracking-widest">
                      Navi đang soạn
                    </span>
                  </div>
                </div>
              )}

              {/* Suggestions khi chỉ có lời chào */}
              {messages.length === 1 && !sending && (
                <div className="pt-2 space-y-2">
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-1.5 px-1">
                    <Sparkles className="w-3 h-3" /> Anh/Chị có thể hỏi em
                  </p>
                  <div className="flex flex-col gap-2">
                    {NAVI_QUICK_PROMPTS.map((q, i) => (
                      <motion.button
                        key={i}
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 + i * 0.06 }}
                        onClick={() => send(q.text)}
                        className="group text-left px-4 py-2.5 bg-white hover:bg-blue-50 rounded-xl border border-slate-200 hover:border-blue-300 hover:shadow transition-all flex items-center gap-2 text-[12.5px] font-semibold text-slate-700 hover:text-blue-700"
                      >
                        <span className="text-base">{q.icon}</span>
                        <span className="flex-1 line-clamp-1">{q.text}</span>
                        <ChevronRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all" />
                      </motion.button>
                    ))}
                  </div>
                </div>
              )}

              <div ref={bottomRef} className="h-2" />
            </div>

            {/* Input */}
            <div className="px-3 sm:px-5 py-3 bg-white border-t border-slate-100">
              <div className="relative">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && send()}
                  disabled={sending}
                  placeholder="Anh/Chị hỏi em điều gì về SHTT Hải quan ạ..."
                  className="w-full pl-4 pr-12 py-3 bg-slate-50 border border-slate-200 rounded-xl text-[13px] font-medium focus:outline-none focus:ring-2 focus:ring-orange-500/40 focus:border-orange-400 focus:bg-white transition-all placeholder:text-slate-400 disabled:opacity-50"
                />
                <button
                  onClick={() => send()}
                  disabled={!input.trim() || sending}
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 bg-gradient-to-br from-orange-500 to-rose-500 hover:from-orange-600 hover:to-rose-600 disabled:from-slate-300 disabled:to-slate-400 disabled:cursor-not-allowed text-white rounded-lg shadow-md shadow-orange-500/30 disabled:shadow-none transition-all flex items-center justify-center active:scale-95"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
              <p className="text-[10px] text-center text-slate-400 mt-1.5 font-medium">
                Navi tra cứu dữ liệu SHTT nội bộ · Phản hồi mang tính tham khảo
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.06, y: -2 }}
        whileTap={{ scale: 0.94 }}
        onClick={() => setOpen(!open)}
        className="relative w-16 h-16 rounded-2xl flex items-center justify-center shadow-2xl pointer-events-auto border-4 border-white overflow-hidden group"
        style={{ boxShadow: '0 20px 40px rgba(234,88,12,0.35)' }}
      >
        {open ? (
          <div className="w-full h-full bg-gradient-to-br from-slate-700 to-slate-900 flex items-center justify-center">
            <ChevronDown className="w-7 h-7 text-white" />
          </div>
        ) : (
          <>
            <div className="absolute inset-0 bg-gradient-to-br from-amber-300 via-orange-400 to-rose-500" />
            <div className="relative z-10 w-full h-full flex items-center justify-center">
              <NaviAvatar size={56} />
            </div>
            {/* online dot */}
            <div className="absolute top-1 right-1 w-3.5 h-3.5 bg-emerald-400 border-2 border-white rounded-full shadow-[0_0_10px_rgba(52,211,153,0.9)] animate-pulse z-20" />
            {/* hover tooltip */}
            <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-[#0a192f] text-white text-xs font-bold rounded-lg shadow-lg whitespace-nowrap opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all pointer-events-none">
              Hỏi Navi <MessageCircle className="inline w-3 h-3 ml-1" />
            </span>
          </>
        )}
      </motion.button>
    </div>
  );
}
