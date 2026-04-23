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

/** Avatar SVG — chibi 3D cô gái Hải quan, mắt to long lanh, tóc dài gợn sóng */
function NaviAvatar({ size = 44 }: { size?: number }) {
  // random-ish id để tránh conflict nhiều instance cùng defs
  const uid = React.useId().replace(/:/g, '');
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Navi — cô gái Hải quan"
    >
      <defs>
        <radialGradient id={`bg-${uid}`} cx="50%" cy="45%" r="65%">
          <stop offset="0%" stopColor="#fef3c7" />
          <stop offset="55%" stopColor="#fb923c" />
          <stop offset="100%" stopColor="#be123c" />
        </radialGradient>
        <radialGradient id={`face-${uid}`} cx="50%" cy="40%" r="65%">
          <stop offset="0%" stopColor="#fff6ea" />
          <stop offset="70%" stopColor="#fde4cf" />
          <stop offset="100%" stopColor="#e8b891" />
        </radialGradient>
        <linearGradient id={`hair-${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#6b3f24" />
          <stop offset="100%" stopColor="#2a1610" />
        </linearGradient>
        <linearGradient id={`hat-${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2a4a9f" />
          <stop offset="50%" stopColor="#1e3a8a" />
          <stop offset="100%" stopColor="#0a192f" />
        </linearGradient>
        <radialGradient id={`hatShine-${uid}`} cx="32%" cy="25%" r="45%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`uniform-${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1e3a8a" />
          <stop offset="100%" stopColor="#0a192f" />
        </linearGradient>
        <radialGradient id={`cheek-${uid}`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fb7185" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#fb7185" stopOpacity="0" />
        </radialGradient>
        <radialGradient id={`iris-${uid}`} cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#7c4a28" />
          <stop offset="100%" stopColor="#1a0a04" />
        </radialGradient>
      </defs>

      {/* nền gradient ấm */}
      <circle cx="50" cy="50" r="50" fill={`url(#bg-${uid})`} />

      {/* vai đồng phục + cổ áo trắng + cà vạt vàng */}
      <path d="M12 100 C 15 80, 28 74, 50 74 C 72 74, 85 80, 88 100 Z" fill={`url(#uniform-${uid})`} />
      <path d="M38 76 L50 86 L62 76 L58 96 L42 96 Z" fill="#f8fafc" />
      <path d="M48 86 L52 86 L53.5 96 L46.5 96 Z" fill="#fbbf24" />
      <circle cx="50" cy="90" r="1" fill="#b45309" />

      {/* tóc dài phía sau (gợn sóng) */}
      <path d="M26 44 Q 20 66 28 84 L 38 78 L 36 50 Z" fill={`url(#hair-${uid})`} />
      <path d="M74 44 Q 80 66 72 84 L 62 78 L 64 50 Z" fill={`url(#hair-${uid})`} />

      {/* khuôn mặt chibi */}
      <ellipse cx="50" cy="52" rx="17" ry="19" fill={`url(#face-${uid})`} />

      {/* tóc mái & fringe bên */}
      <path
        d="M32 38 Q 40 28 50 30 Q 60 28 68 38 Q 66 47 60 44 Q 54 38 50 42 Q 46 38 40 44 Q 34 47 32 38 Z"
        fill={`url(#hair-${uid})`}
      />
      <path d="M33 40 Q 30 56 36 66 L 38 52 Z" fill={`url(#hair-${uid})`} />
      <path d="M67 40 Q 70 56 64 66 L 62 52 Z" fill={`url(#hair-${uid})`} />

      {/* vành mũ */}
      <ellipse cx="50" cy="34" rx="23" ry="3.2" fill="#0a192f" />
      {/* đế mũ vàng */}
      <rect x="27" y="28.5" width="46" height="3.2" fill="#fbbf24" />
      <rect x="27" y="28.5" width="46" height="1" fill="#fde68a" />
      {/* thân mũ */}
      <path d="M30 28.5 Q 30 13 50 11 Q 70 13 70 28.5 Z" fill={`url(#hat-${uid})`} />
      {/* highlight bóng mũ */}
      <path d="M30 28.5 Q 30 13 50 11 Q 70 13 70 28.5 Z" fill={`url(#hatShine-${uid})`} />
      {/* sao vàng trên mũ */}
      <g transform="translate(50 20)">
        <polygon
          points="0,-5.5 1.6,-1.6 5.6,-1.6 2.4,1.1 3.6,5 0,2.7 -3.6,5 -2.4,1.1 -5.6,-1.6 -1.6,-1.6"
          fill="#fbbf24"
          stroke="#b45309"
          strokeWidth="0.35"
        />
      </g>

      {/* lông mày */}
      <path d="M39 46 Q 43 44.2 46.5 46" stroke="#3b2418" strokeWidth="1" fill="none" strokeLinecap="round" />
      <path d="M53.5 46 Q 57 44.2 61 46" stroke="#3b2418" strokeWidth="1" fill="none" strokeLinecap="round" />

      {/* mắt anime to — tròng trắng */}
      <g className="navi-eyes">
        <ellipse cx="42.5" cy="53" rx="3.2" ry="4.2" fill="#ffffff" />
        <ellipse cx="57.5" cy="53" rx="3.2" ry="4.2" fill="#ffffff" />
        {/* tròng đen (iris gradient) */}
        <circle cx="42.5" cy="53.5" r="2.6" fill={`url(#iris-${uid})`} />
        <circle cx="57.5" cy="53.5" r="2.6" fill={`url(#iris-${uid})`} />
        {/* điểm sáng to */}
        <circle cx="43.6" cy="52.3" r="1.1" fill="#ffffff" />
        <circle cx="58.6" cy="52.3" r="1.1" fill="#ffffff" />
        {/* điểm sáng nhỏ */}
        <circle cx="41.5" cy="54.5" r="0.45" fill="#ffffff" />
        <circle cx="56.5" cy="54.5" r="0.45" fill="#ffffff" />
        {/* mí mắt trên (lông mi) */}
        <path d="M39.5 50.5 Q 42.5 48.8 45.5 50.5" stroke="#0a192f" strokeWidth="1.1" fill="none" strokeLinecap="round" />
        <path d="M54.5 50.5 Q 57.5 48.8 60.5 50.5" stroke="#0a192f" strokeWidth="1.1" fill="none" strokeLinecap="round" />
      </g>

      {/* má hồng */}
      <ellipse cx="39" cy="61" rx="3" ry="2" fill={`url(#cheek-${uid})`} />
      <ellipse cx="61" cy="61" rx="3" ry="2" fill={`url(#cheek-${uid})`} />

      {/* mũi nhỏ */}
      <path d="M50 57 Q 50.2 60 48.8 61" stroke="#d9a57a" strokeWidth="0.7" fill="none" strokeLinecap="round" />

      {/* miệng cười bóng */}
      <path d="M46 65 Q 50 68.5 54 65" fill="#f43f5e" stroke="#be123c" strokeWidth="0.9" strokeLinejoin="round" />
      <path d="M46.8 65.2 Q 50 66.3 53.2 65.2" fill="#fecdd3" opacity="0.75" />
    </svg>
  );
}

/** Sparkles animation quanh avatar — dùng cho toggle button & header */
function AvatarSparkles() {
  const dots = [
    { x: '8%', y: '12%', delay: 0 },
    { x: '88%', y: '18%', delay: 0.6 },
    { x: '92%', y: '74%', delay: 1.2 },
    { x: '6%', y: '78%', delay: 1.8 },
  ];
  return (
    <>
      {dots.map((d, i) => (
        <motion.span
          key={i}
          className="absolute w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_6px_rgba(255,255,255,0.95)] pointer-events-none"
          style={{ left: d.x, top: d.y }}
          animate={{ scale: [0, 1.4, 0], opacity: [0, 1, 0] }}
          transition={{ duration: 2.2, delay: d.delay, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
    </>
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
                <div className="relative shrink-0 w-12 h-12">
                  {/* hào quang xoay */}
                  <motion.span
                    aria-hidden
                    className="absolute inset-0 rounded-2xl"
                    style={{
                      background:
                        'conic-gradient(from 0deg, #fbbf24, #fb923c, #e11d48, #fbbf24)',
                      filter: 'blur(6px)',
                      opacity: 0.85,
                    }}
                    animate={{ rotate: 360 }}
                    transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
                  />
                  {/* avatar nổi bồng bềnh */}
                  <motion.div
                    className="absolute inset-0.5 rounded-2xl bg-white shadow-lg ring-2 ring-amber-300 overflow-hidden flex items-center justify-center"
                    animate={{ y: [0, -2.5, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    <NaviAvatar size={44} />
                  </motion.div>
                  {/* tia sparkle */}
                  <AvatarSparkles />
                  {/* chấm online */}
                  <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-emerald-400 border-2 border-[#0a192f] animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.9)] z-20" />
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

      {/* Toggle Button — cô gái Navi với hào quang xoay + sparkle + float */}
      <div className="relative pointer-events-auto group">
        {!open && (
          <>
            {/* vòng hào quang xoay (ngoài cùng) */}
            <motion.span
              aria-hidden
              className="absolute -inset-2 rounded-[28px]"
              style={{
                background:
                  'conic-gradient(from 0deg, #fde68a, #fb923c, #f43f5e, #a855f7, #fde68a)',
                filter: 'blur(10px)',
                opacity: 0.75,
              }}
              animate={{ rotate: 360 }}
              transition={{ duration: 7, repeat: Infinity, ease: 'linear' }}
            />
            {/* pulse ring */}
            <motion.span
              aria-hidden
              className="absolute inset-0 rounded-2xl border-2 border-amber-300"
              animate={{ scale: [1, 1.35, 1], opacity: [0.75, 0, 0.75] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: 'easeOut' }}
            />
          </>
        )}
        <motion.button
          whileHover={{ scale: 1.08, y: -3 }}
          whileTap={{ scale: 0.94 }}
          animate={open ? {} : { y: [0, -5, 0] }}
          transition={open ? {} : { duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
          onClick={() => setOpen(!open)}
          className="relative w-16 h-16 rounded-2xl flex items-center justify-center shadow-2xl border-4 border-white overflow-hidden"
          style={{ boxShadow: '0 20px 40px rgba(234,88,12,0.45)' }}
        >
          {open ? (
            <div className="w-full h-full bg-gradient-to-br from-slate-700 to-slate-900 flex items-center justify-center">
              <ChevronDown className="w-7 h-7 text-white" />
            </div>
          ) : (
            <>
              {/* nền gradient động */}
              <motion.div
                className="absolute inset-0"
                style={{
                  backgroundImage:
                    'linear-gradient(135deg, #fde68a 0%, #fb923c 45%, #e11d48 100%)',
                  backgroundSize: '200% 200%',
                }}
                animate={{ backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              />
              <div className="relative z-10 w-full h-full flex items-center justify-center">
                <NaviAvatar size={56} />
              </div>
              {/* online dot */}
              <div className="absolute top-1 right-1 w-3.5 h-3.5 bg-emerald-400 border-2 border-white rounded-full shadow-[0_0_10px_rgba(52,211,153,0.9)] animate-pulse z-20" />
            </>
          )}
        </motion.button>

        {/* sparkles ngoài nút */}
        {!open && (
          <div className="absolute inset-0 pointer-events-none">
            <AvatarSparkles />
          </div>
        )}

        {/* tooltip */}
        {!open && (
          <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-[#0a192f] text-white text-xs font-bold rounded-lg shadow-lg whitespace-nowrap opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all pointer-events-none">
            Hỏi Navi <MessageCircle className="inline w-3 h-3 ml-1" />
          </span>
        )}
      </div>
    </div>
  );
}
