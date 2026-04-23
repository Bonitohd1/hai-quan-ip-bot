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

/** Avatar SVG — robot AI chibi 3D, trắng xanh, mắt neon cyan */
function NaviAvatar({ size = 44 }: { size?: number }) {
  const uid = React.useId().replace(/:/g, '');
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Navi — AI Assistant"
    >
      <defs>
        <radialGradient id={`bg-${uid}`} cx="50%" cy="40%" r="70%">
          <stop offset="0%" stopColor="#e0e7ff" />
          <stop offset="100%" stopColor="#c7d2fe" />
        </radialGradient>
        <linearGradient id={`body-${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="60%" stopColor="#f1f5f9" />
          <stop offset="100%" stopColor="#cbd5e1" />
        </linearGradient>
        <linearGradient id={`blue-${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#1e3a8a" />
        </linearGradient>
        <radialGradient id={`screen-${uid}`} cx="50%" cy="50%" r="60%">
          <stop offset="0%" stopColor="#0f172a" />
          <stop offset="100%" stopColor="#020617" />
        </radialGradient>
        <radialGradient id={`eye-${uid}`} cx="50%" cy="50%" r="55%">
          <stop offset="0%" stopColor="#a5f3fc" />
          <stop offset="55%" stopColor="#22d3ee" />
          <stop offset="100%" stopColor="#0891b2" />
        </radialGradient>
        <radialGradient id={`shine-${uid}`} cx="30%" cy="25%" r="40%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>
        <filter id={`glow-${uid}`} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="1.4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* nền tím pastel như ảnh mẫu */}
      <circle cx="50" cy="50" r="50" fill={`url(#bg-${uid})`} />

      {/* thân dưới (bầu nhỏ) */}
      <ellipse cx="50" cy="82" rx="20" ry="14" fill={`url(#body-${uid})`} />
      {/* vòng tròn xanh đế thân */}
      <circle cx="50" cy="86" r="4" fill={`url(#blue-${uid})`} />
      <circle cx="50" cy="86" r="2" fill="#67e8f9" />

      {/* cổ / khớp nối */}
      <rect x="44" y="66" width="12" height="6" rx="2" fill={`url(#blue-${uid})`} />

      {/* đầu - khung bo tròn to */}
      <rect x="20" y="24" width="60" height="48" rx="18" fill={`url(#body-${uid})`} stroke="#cbd5e1" strokeWidth="0.6" />
      {/* viền đầu xanh (trang trí) */}
      <rect x="22" y="26" width="56" height="3" rx="1.5" fill={`url(#blue-${uid})`} opacity="0.85" />
      {/* highlight đầu */}
      <path d="M28 30 Q 35 26 50 26 Q 60 26 66 30 L 66 34 Q 50 30 34 34 Z" fill="url(#shine-${uid})" opacity="0.55" />
      <ellipse cx="35" cy="32" rx="8" ry="3" fill="#ffffff" opacity="0.55" />

      {/* ăng ten trái */}
      <path d="M30 24 L 24 12 L 32 16 Z" fill={`url(#blue-${uid})`} />
      <circle cx="26" cy="13" r="1.6" fill="#67e8f9" />

      {/* tai nghe 2 bên */}
      <ellipse cx="18" cy="48" rx="5" ry="9" fill={`url(#blue-${uid})`} />
      <ellipse cx="18" cy="48" rx="2.5" ry="5" fill="#0a192f" />
      <ellipse cx="82" cy="48" rx="5" ry="9" fill={`url(#blue-${uid})`} />
      <ellipse cx="82" cy="48" rx="2.5" ry="5" fill="#0a192f" />

      {/* màn hình mặt */}
      <rect x="28" y="34" width="44" height="30" rx="10" fill={`url(#screen-${uid})`} />
      {/* glow viền màn hình */}
      <rect x="28" y="34" width="44" height="30" rx="10" fill="none" stroke="#22d3ee" strokeWidth="0.6" opacity="0.4" />

      {/* mắt neon cyan + miệng (có filter glow + blink) */}
      <g className="navi-eyes" filter={`url(#glow-${uid})`}>
        <circle cx="40" cy="47" r="4.2" fill={`url(#eye-${uid})`} />
        <circle cx="60" cy="47" r="4.2" fill={`url(#eye-${uid})`} />
        {/* highlight mắt */}
        <circle cx="38.6" cy="45.5" r="1.1" fill="#ffffff" />
        <circle cx="58.6" cy="45.5" r="1.1" fill="#ffffff" />
        {/* miệng cười */}
        <path
          d="M44 55 Q 50 60 56 55"
          stroke="#22d3ee"
          strokeWidth="1.8"
          fill="none"
          strokeLinecap="round"
        />
      </g>

      {/* tay nhỏ hai bên thân */}
      <circle cx="28" cy="78" r="4" fill={`url(#body-${uid})`} stroke={`url(#blue-${uid})`} strokeWidth="0.8" />
      <circle cx="72" cy="78" r="4" fill={`url(#body-${uid})`} stroke={`url(#blue-${uid})`} strokeWidth="0.8" />
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
