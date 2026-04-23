'use client';

import { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles, Copy, Check, BookOpen, Zap, RefreshCw } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { findNaviAnswer, NAVI_QUICK_PROMPTS } from '../lib/navi-knowledge';

type Message = {
  id: string;
  role: 'navi' | 'user';
  text: string;
  references?: string[];
  ts: number;
};

type NaviChatProps = {
  /** Ngữ cảnh tài liệu hiện tại (nếu có) — đưa vào lời chào */
  contextLabel?: string;
  /** Gợi ý câu mở đầu bổ sung */
  initialGreeting?: string;
};

const BRAND_NAME = 'Navi';
const BRAND_TAGLINE = 'Trợ lý SHTT Hải quan';

function formatTime(ts: number) {
  const d = new Date(ts);
  return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
}

export default function NaviChat({ contextLabel, initialGreeting }: NaviChatProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'init',
      role: 'navi',
      text:
        initialGreeting ||
        `Xin chào! Tôi là **${BRAND_NAME}** — ${BRAND_TAGLINE}.${
          contextLabel ? ` Tôi đang đọc tài liệu **${contextLabel}**.` : ''
        }\n\nHãy hỏi tôi về khung pháp lý, quy trình kiểm soát biên giới, mức xử phạt hoặc bất kỳ thuật ngữ nghiệp vụ SHTT nào.`,
      ts: Date.now(),
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const endRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () =>
    setTimeout(() => endRef.current?.scrollIntoView({ behavior: 'smooth' }), 50);

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const generateReply = (userText: string): { text: string; references?: string[] } => {
    const hit = findNaviAnswer(userText);
    if (hit) {
      return { text: hit.answer, references: hit.references };
    }
    // Fallback trả lời chung
    const lower = userText.toLowerCase();
    if (lower.includes('cảm ơn') || lower.includes('thanks')) {
      return { text: 'Rất vui được hỗ trợ! Bạn cần tôi phân tích thêm vấn đề nào khác không?' };
    }
    if (lower.includes('chào') || lower.includes('hello') || lower.includes('hi')) {
      return { text: `Chào bạn! Tôi có thể giúp gì cho bạn hôm nay về lĩnh vực SHTT hải quan?` };
    }
    return {
      text:
        `Tôi chưa tìm thấy thông tin khớp chính xác trong cơ sở tri thức cho câu hỏi **"${userText}"**.\n\n` +
        `Bạn có thể thử hỏi cụ thể hơn theo các chủ đề:\n` +
        `• Khung pháp lý (Luật, Nghị định, Thông tư)\n` +
        `• Quy trình kiểm soát biên giới\n` +
        `• Mức phạt hành chính và hình sự\n` +
        `• Định nghĩa thuật ngữ (hàng giả, nhãn hiệu nổi tiếng...)\n` +
        `• Tình huống thực tiễn (hàng quá cảnh, xách tay...)`,
    };
  };

  const send = (text: string) => {
    if (!text.trim() || loading) return;
    const userMsg: Message = {
      id: `u-${Date.now()}`,
      role: 'user',
      text: text.trim(),
      ts: Date.now(),
    };
    setMessages((p) => [...p, userMsg]);
    setInput('');
    setLoading(true);
    scrollToBottom();

    // Mô phỏng độ trễ phản hồi AI
    const delay = 900 + Math.random() * 700;
    setTimeout(() => {
      const reply = generateReply(text);
      const naviMsg: Message = {
        id: `n-${Date.now()}`,
        role: 'navi',
        text: reply.text,
        references: reply.references,
        ts: Date.now(),
      };
      setMessages((p) => [...p, naviMsg]);
      setLoading(false);
    }, delay);
  };

  const copyMessage = async (id: string, text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 1500);
    } catch {}
  };

  const resetChat = () => {
    setMessages([messages[0]]);
    inputRef.current?.focus();
  };

  return (
    <div className="h-full flex flex-col bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
      {/* Header */}
      <div className="flex-shrink-0 px-4 sm:px-5 py-3 bg-gradient-to-r from-[#0a192f] via-[#0f2744] to-[#0a192f] text-white border-b border-slate-800 flex items-center gap-3">
        <div className="relative">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 via-orange-500 to-rose-500 flex items-center justify-center shadow-lg shadow-orange-500/30 ring-2 ring-white/10">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-400 border-2 border-[#0a192f] shadow-[0_0_8px_rgba(52,211,153,0.8)] animate-pulse" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="font-black text-[15px] tracking-tight">{BRAND_NAME}</h3>
            <span className="text-[9px] font-black uppercase tracking-widest px-1.5 py-0.5 bg-emerald-500/20 text-emerald-300 rounded border border-emerald-500/30">
              Online
            </span>
          </div>
          <p className="text-[11px] text-slate-400 font-medium truncate">{BRAND_TAGLINE} · AI Assistant v2.1</p>
        </div>
        <button
          onClick={resetChat}
          title="Xoá hội thoại"
          className="p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
        >
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-3 sm:px-5 py-4 space-y-4 custom-scrollbar">
        {messages.map((m) => (
          <MessageBubble
            key={m.id}
            msg={m}
            onCopy={() => copyMessage(m.id, m.text)}
            copied={copiedId === m.id}
          />
        ))}
        {loading && <TypingIndicator />}
        <div ref={endRef} />

        {/* Quick prompts — chỉ hiển thị khi chưa có hội thoại */}
        {messages.length === 1 && !loading && (
          <div className="pt-2 space-y-2">
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-1.5">
              <Zap className="w-3 h-3" /> Gợi ý câu hỏi
            </p>
            <div className="flex flex-wrap gap-2">
              {NAVI_QUICK_PROMPTS.map((q, i) => (
                <button
                  key={i}
                  onClick={() => send(q.text)}
                  className="text-left px-3 py-2 text-[12px] font-semibold text-slate-600 bg-white hover:bg-blue-50 hover:text-blue-700 rounded-xl border border-slate-200 hover:border-blue-200 shadow-sm hover:shadow transition-all flex items-center gap-2"
                >
                  <span>{q.icon}</span>
                  <span className="line-clamp-1">{q.text}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="flex-shrink-0 px-3 sm:px-5 py-3 bg-white border-t border-slate-100">
        <div className="relative flex items-center gap-2">
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                send(input);
              }
            }}
            disabled={loading}
            placeholder={`Hỏi ${BRAND_NAME} về nghiệp vụ SHTT hải quan...`}
            className="w-full pl-4 pr-12 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-orange-500/40 focus:border-orange-400 focus:bg-white transition-all placeholder:text-slate-400 disabled:opacity-50"
          />
          <button
            onClick={() => send(input)}
            disabled={!input.trim() || loading}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 bg-gradient-to-br from-orange-500 to-rose-500 hover:from-orange-600 hover:to-rose-600 disabled:from-slate-300 disabled:to-slate-400 disabled:cursor-not-allowed text-white rounded-lg shadow-md shadow-orange-500/30 disabled:shadow-none transition-all flex items-center justify-center active:scale-95"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
        <p className="text-[10px] text-slate-400 font-medium mt-1.5 text-center">
          {BRAND_NAME} tra cứu dữ liệu SHTT nội bộ · Phản hồi chỉ mang tính tham khảo
        </p>
      </div>
    </div>
  );
}

function MessageBubble({
  msg,
  onCopy,
  copied,
}: {
  msg: Message;
  onCopy: () => void;
  copied: boolean;
}) {
  const isUser = msg.role === 'user';

  return (
    <div className={`flex gap-2.5 group ${isUser ? 'flex-row-reverse' : ''} animate-fade-in-up`}>
      {/* Avatar */}
      <div className="shrink-0">
        {isUser ? (
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-slate-700 to-slate-900 flex items-center justify-center shadow-sm">
            <User className="w-4 h-4 text-white" />
          </div>
        ) : (
          <div className="relative">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-400 via-orange-500 to-rose-500 flex items-center justify-center shadow-md shadow-orange-500/30 ring-2 ring-white">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
          </div>
        )}
      </div>

      {/* Bubble + meta */}
      <div className={`flex flex-col max-w-[85%] sm:max-w-[78%] ${isUser ? 'items-end' : 'items-start'}`}>
        <div
          className={`relative px-4 py-3 rounded-2xl text-[13px] leading-relaxed font-medium shadow-sm border ${
            isUser
              ? 'bg-gradient-to-br from-[#0a192f] to-[#1e3a5f] text-white border-slate-800 rounded-tr-sm'
              : 'bg-white text-slate-800 border-slate-200 rounded-tl-sm'
          }`}
        >
          {/* Markdown render */}
          <div className={`navi-md ${isUser ? 'navi-md-invert' : ''}`}>
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{msg.text}</ReactMarkdown>
          </div>

          {/* References */}
          {msg.references && msg.references.length > 0 && (
            <div className="mt-3 pt-2.5 border-t border-slate-100 flex flex-wrap gap-1.5 items-center">
              <BookOpen className="w-3 h-3 text-slate-400" />
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">Căn cứ:</span>
              {msg.references.map((r, i) => (
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

        {/* Meta row */}
        <div className={`flex items-center gap-2 mt-1 px-1 ${isUser ? 'flex-row-reverse' : ''}`}>
          <span className="text-[10px] text-slate-400 font-bold">
            {isUser ? 'Bạn' : 'Navi'} · {formatTime(msg.ts)}
          </span>
          {!isUser && (
            <button
              onClick={onCopy}
              className="opacity-0 group-hover:opacity-100 text-[10px] text-slate-400 hover:text-blue-600 flex items-center gap-0.5 transition-all font-bold"
            >
              {copied ? (
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
  );
}

function TypingIndicator() {
  return (
    <div className="flex gap-2.5 animate-fade-in-up">
      <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-400 via-orange-500 to-rose-500 flex items-center justify-center shadow-md shadow-orange-500/30 ring-2 ring-white shrink-0">
        <Sparkles className="w-4 h-4 text-white" />
      </div>
      <div className="bg-white px-4 py-3 rounded-2xl rounded-tl-sm border border-slate-200 shadow-sm flex items-center gap-2">
        <span className="flex gap-1">
          <span className="w-1.5 h-1.5 bg-orange-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
          <span className="w-1.5 h-1.5 bg-orange-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
          <span className="w-1.5 h-1.5 bg-orange-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
        </span>
        <span className="text-[11px] text-slate-400 font-bold uppercase tracking-widest">Navi đang suy luận</span>
      </div>
    </div>
  );
}
