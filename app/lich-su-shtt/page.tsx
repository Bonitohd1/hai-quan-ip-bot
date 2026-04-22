'use client';

import { useState, useEffect } from 'react';
import ChatBot from '@/components/ChatBot';
import { Landmark, Cpu, Globe, History, X, ChevronRight, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const TIMELINE = [
  {
    year: 'Trước 2005 - 2014',
    phase: 'Giai đoạn Hình thành & Luật hóa',
    title: 'Đặt Nền Móng Pháp Lý Đầu Tiên',
    desc: 'Đây là giai đoạn đặt những viên gạch đầu tiên cho khung pháp lý và bộ máy tổ chức.',
    icon: Landmark,
    image: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=2112&auto=format&fit=crop',
    mainColor: 'bg-[#0070c0]', // Corporate bright blue
    accentColor: 'bg-blue-100',
    textColor: 'text-[#0070c0]',
    gradient: 'from-[#0070c0] to-blue-400',
    dotLine: 'border-[#0070c0]',
    details: [
      { subtitle: 'Sự kiện cốt lõi', text: 'Ra đời Luật Sở hữu trí tuệ 2005, lần đầu tiên quy định rõ thẩm quyền của cơ quan Hải quan trong việc tạm dừng làm thủ tục đối với hàng hóa có dấu hiệu xâm phạm quyền SHTT tại biên giới.' },
      { subtitle: 'Hoạt động chính', text: 'Thiết lập quy trình tiếp nhận đơn yêu cầu kiểm tra, giám sát từ chủ sở hữu quyền. Hải quan bắt đầu chuyển từ kiểm soát hàng giả đơn thuần sang bảo vệ quyền tác giả, nhãn hiệu và kiểu dáng công nghiệp.' }
    ]
  },
  {
    year: '2015 - 2022',
    phase: 'Giai đoạn Hiện đại hóa & Hội nhập',
    title: 'Hội Nhập Quốc Tế & Quản Lý Rủi Ro',
    desc: 'Giai đoạn này đánh dấu bước tiến về công nghệ và sự gắn kết chặt chẽ với các cam kết quốc tế.',
    icon: Globe,
    image: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?q=80&w=2070&auto=format&fit=crop',
    mainColor: 'bg-[#f47b20]', // Vibrant orange
    accentColor: 'bg-orange-100',
    textColor: 'text-[#f47b20]',
    gradient: 'from-[#f47b20] to-orange-400',
    dotLine: 'border-[#f47b20]',
    details: [
      { subtitle: 'Sự kiện cốt lõi', text: 'Triển khai Luật Hải quan 2014 và các Hiệp định thương mại tự do thế hệ mới (CPTPP, EVFTA).' },
      { subtitle: 'Ứng dụng quản lý rủi ro', text: 'Sử dụng các hệ thống quản lý rủi ro hiện đại để sàng lọc hàng vi phạm từ sớm.' },
      { subtitle: 'Cơ sở dữ liệu', text: 'Xây dựng hệ thống cơ sở dữ liệu về các nhãn hiệu đã được bảo hộ để tra cứu trực tuyến.' },
      { subtitle: 'Phối hợp liên ngành', text: 'Tăng cường phối hợp 389 Quốc gia, Công an, Quản lý thị trường để xử lý triệt để.' }
    ]
  },
  {
    year: '2023 - 2030',
    phase: 'Giai đoạn Chuyển đổi số & Tương lai',
    title: 'Hải Quan Số, Hải Quan Thông Minh',
    desc: 'Đây là giai đoạn thực hiện chiến lược phát triển Hải quan đến năm 2030 với mục tiêu "Hải quan số, Hải quan thông minh".',
    icon: Cpu,
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop',
    mainColor: 'bg-[#00b050]', // Fresh bright green
    accentColor: 'bg-green-100',
    textColor: 'text-[#00b050]',
    gradient: 'from-[#00b050] to-green-400',
    dotLine: 'border-[#00b050]',
    details: [
      { subtitle: 'Số hóa toàn diện', text: 'Tự động hóa việc tiếp nhận và xử lý đơn bảo hộ SHTT thông qua cổng dịch vụ công trực tuyến.' },
      { subtitle: 'Trí tuệ nhân tạo (AI)', text: 'Sử dụng AI và Big Data để nhận diện hình ảnh hàng giả, hàng nhái và dự báo các luồng hàng có nguy cơ vi phạm cao.' },
      { subtitle: 'Trọng tâm TMĐT', text: 'Tập trung kiểm soát hàng hóa xuyên biên giới qua các sàn TMĐT – nơi hàng giả dễ dàng len lỏi dưới dạng bưu kiện nhỏ lẻ.' },
      { subtitle: 'Nâng tầm vị thế', text: 'Chủ động tham gia các chiến dịch quốc tế của WCO (Tổ chức Hải quan thế giới) để ngăn chặn hàng giả từ nguồn gốc.' }
    ]
  }
];

export default function LichSuSHTT() {
  const [mounted, setMounted] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  
  useEffect(() => setMounted(true), []);

  if (!mounted) return <div className="min-h-screen bg-[#f8fafc]" />;

  return (
    <div className="flex flex-col min-h-screen bg-[#f8fafc] -m-6 lg:-m-12 p-6 lg:p-10 max-w-[1600px] mx-auto font-sans overflow-x-hidden selection:bg-blue-500/30 text-slate-800">
       
       {/* HERO BANNER SECTION - Light Bright Theme */}
       <motion.div 
         initial={{ opacity: 0, y: 20 }}
         animate={{ opacity: 1, y: 0 }}
         transition={{ duration: 0.8, ease: "easeOut" }}
         className="w-full max-w-5xl mx-auto text-center mt-12 mb-20 relative z-10"
       >
         <motion.div 
           initial={{ opacity: 0, scale: 0.8 }}
           animate={{ opacity: 1, scale: 1 }}
           transition={{ duration: 0.5, delay: 0.2 }}
           className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 text-[#0070c0] mb-6 shadow-sm"
         >
           <History className="w-8 h-8" />
         </motion.div>
         
         <h1 className="text-4xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.1] mb-6">
            Lịch sử hình thành & <br className="hidden md:block"/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0070c0] via-[#00b050] to-[#0070c0] bg-[length:200%_auto] animate-gradient">
              phát triển sở hữu trí tuệ
            </span>
         </h1>

         <p className="text-slate-600 text-lg md:text-xl font-medium max-w-3xl mx-auto leading-relaxed">
            Hành trình sáng tạo và bảo vệ: Nền tảng hội nhập quốc tế<br className="hidden md:block"/>
            Khởi nguồn một tương lai vững mạnh và vươn xa
         </p>
       </motion.div>

       {/* HORIZONTAL TIMELINE SECTION - MATCHING REFERENCE IMAGE */}
       <div className="relative w-full py-16 lg:py-24 mb-20 flex justify-center">
         {/* Simple faint dotted world map background representation */}
         <div className="absolute inset-0 z-0 opacity-15 bg-[url('https://upload.wikimedia.org/wikipedia/commons/8/80/World_map_-_low_resolution.svg')] bg-no-repeat bg-center bg-contain" />
         
         <div className="relative z-10 w-full max-w-7xl">
            
            {/* The main horizontal thick arrow line (desktop only) */}
            <div className="hidden lg:flex w-full absolute top-1/2 left-0 -translate-y-1/2 h-5 shadow-sm rounded-full overflow-hidden">
                {TIMELINE.map((item, i) => (
                    <motion.div 
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        transformTemplate={(_, generated) => `scaleX(${generated.replace('scaleX(', '').replace(')', '')})`}
                        style={{ originX: 0 }}
                        transition={{ duration: 0.8, delay: i * 0.4, ease: "circOut" }}
                        key={i} 
                        className={`flex-1 relative ${item.mainColor}`}
                    >
                        {/* CSS Arrow Tip */}
                        {i < TIMELINE.length - 1 && (
                            <div className={`absolute -right-3 top-0 w-0 h-0 border-t-[10px] border-t-transparent border-b-[10px] border-b-transparent border-l-[12px] border-l-current text-[${item.mainColor.replace('bg-', '')}] z-10 ${item.textColor.replace('text-', 'text-')}`} style={{ borderLeftColor: i===0?'#0070c0':i===1?'#f47b20':'#00b050' }} />
                        )}
                        {i > 0 && (
                            <div className="absolute left-0 top-0 w-0 h-0 border-t-[10px] border-t-transparent border-b-[10px] border-b-transparent border-l-[12px] border-l-[#f8fafc]" />
                        )}
                    </motion.div>
                ))}
            </div>

            {/* Content Blocks */}
            <div className="flex flex-col lg:flex-row w-full relative">
               {TIMELINE.map((item, i) => {
                  const isTopItem = i % 2 !== 0; 
                  const Icon = item.icon;
                  return (
                     <div 
                        key={i} 
                        className="flex-1 flex lg:flex-col items-center mb-16 lg:mb-0 relative group"
                     >
                        {/* Mobile track line */}
                        <div className="absolute left-[39px] top-0 bottom-[-64px] w-1 lg:hidden rounded-full overflow-hidden">
                           <motion.div 
                              initial={{ scaleY: 0 }}
                              whileInView={{ scaleY: 1 }}
                              style={{ originY: 0 }}
                              transition={{ duration: 0.8 }}
                              className={`w-full h-full ${item.mainColor} opacity-50`} />
                        </div>

                        {/* Top Side - Desktop */}
                        <div className={`hidden lg:flex w-full min-h-[260px] flex-col justify-end px-4 ${isTopItem ? 'pb-8 items-center text-center' : 'pb-10 items-center justify-end'}`}>
                            {isTopItem ? (
                                <motion.div
                                    initial={{ opacity: 0, y: -20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: i * 0.4 + 0.3 }}
                                    className="flex flex-col items-center"
                                >
                                    <h2 className={`text-[2.5rem] font-black ${item.textColor} tracking-tight mb-3`}>{item.year}</h2>
                                    <div className="bg-white/80 backdrop-blur p-5 rounded-2xl shadow-xl shadow-black/5 border border-white max-w-[300px] cursor-pointer hover:-translate-y-1 hover:shadow-2xl transition-all duration-300" onClick={() => setSelectedItem(item)}>
                                        <p className="text-[15px] font-bold text-slate-800 mb-2">{item.phase}</p>
                                        <p className="text-[13px] font-medium text-slate-500 leading-relaxed line-clamp-3">{item.desc}</p>
                                    </div>
                                    <div className={`w-0 h-14 border-l-2 border-dashed ${item.dotLine} mt-3 relative`}>
                                        <div className={`absolute -bottom-1 -left-[5px] w-2 h-2 rounded-full ${item.mainColor}`} />
                                    </div>
                                </motion.div>
                            ) : (
                                <motion.div 
                                    initial={{ scale: 0, opacity: 0 }}
                                    whileInView={{ scale: 1, opacity: 1 }}
                                    transition={{ type: "spring", bounce: 0.5, duration: 0.8, delay: i * 0.4 + 0.1 }}
                                    whileHover={{ scale: 1.1, rotate: 5 }}
                                    className={`w-[84px] h-[84px] rounded-full ${item.mainColor} shadow-[0_10px_40px_rgba(0,0,0,0.15)] shadow-${item.mainColor.replace('bg-', '')}/30 flex items-center justify-center border-[6px] border-white cursor-pointer z-20 relative`}
                                    onClick={() => setSelectedItem(item)}
                                >
                                    <Icon className="w-9 h-9 text-white" />
                                    <div className={`absolute -bottom-10 w-0 h-10 border-l-2 border-dashed ${item.dotLine} opacity-50`} />
                                </motion.div>
                            )}
                        </div>

                        {/* Center Spacer */}
                        <div className="hidden lg:block h-5 w-full"></div>

                        {/* Mobile Design remains similar but optimized */}
                        <motion.div 
                            initial={{ scale: 0, opacity: 0 }}
                            whileInView={{ scale: 1, opacity: 1 }}
                            transition={{ type: "spring", bounce: 0.5 }}
                            className={`lg:hidden w-20 h-20 rounded-full ${item.mainColor} shadow-xl flex items-center justify-center border-[5px] border-white z-20 flex-shrink-0 cursor-pointer`}
                            onClick={() => setSelectedItem(item)}>
                            <Icon className="w-9 h-9 text-white" />
                        </motion.div>

                        <motion.div 
                            initial={{ x: 20, opacity: 0 }}
                            whileInView={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="lg:hidden ml-6 bg-white p-5 rounded-2xl shadow-lg border border-slate-100 flex-1 relative overflow-hidden"
                            onClick={() => setSelectedItem(item)}>
                            <div className={`absolute top-0 left-0 w-1.5 h-full ${item.mainColor}`} />
                            <h2 className={`text-[1.75rem] font-black ${item.textColor} mb-1 leading-tight`}>{item.year}</h2>
                            <p className="text-[15px] font-bold text-slate-800 mb-2">{item.phase}</p>
                            <p className="text-[13px] font-medium text-slate-500 leading-relaxed">{item.desc}</p>
                            <div className={`mt-4 inline-flex items-center text-xs font-bold uppercase tracking-wider ${item.textColor}`}>Chi tiết <ChevronRight className="w-3 h-3 ml-1" /></div>
                        </motion.div>

                        {/* Bottom Side - Desktop */}
                        <div className={`hidden lg:flex w-full min-h-[260px] flex-col justify-start px-4 ${isTopItem ? 'pt-10 items-center' : 'pt-8 items-center text-center'}`}>
                            {isTopItem ? (
                                <motion.div 
                                    initial={{ scale: 0, opacity: 0 }}
                                    whileInView={{ scale: 1, opacity: 1 }}
                                    transition={{ type: "spring", bounce: 0.5, duration: 0.8, delay: i * 0.4 + 0.1 }}
                                    whileHover={{ scale: 1.1, rotate: -5 }}
                                    className={`w-[84px] h-[84px] rounded-full ${item.mainColor} shadow-[0_10px_40px_rgba(0,0,0,0.15)] shadow-${item.mainColor.replace('bg-', '')}/30 flex items-center justify-center border-[6px] border-white cursor-pointer z-20 relative`}
                                    onClick={() => setSelectedItem(item)}
                                >
                                    <div className={`absolute -top-10 w-0 h-10 border-l-2 border-dashed ${item.dotLine} opacity-50`} />
                                    <Icon className="w-9 h-9 text-white" />
                                </motion.div>
                            ) : (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: i * 0.4 + 0.3 }}
                                    className="flex flex-col items-center w-full"
                                >
                                    <div className={`w-0 h-14 border-l-2 border-dashed ${item.dotLine} relative mb-3`}>
                                        <div className={`absolute -top-1 -left-[5px] w-2 h-2 rounded-full ${item.mainColor}`} />
                                    </div>
                                    <h2 className={`text-[2.5rem] font-black ${item.textColor} tracking-tight leading-none mb-3`}>{item.year}</h2>
                                    <div className="bg-white/80 backdrop-blur p-5 rounded-2xl shadow-xl shadow-black/5 border border-white max-w-[300px] cursor-pointer hover:-translate-y-1 hover:shadow-2xl transition-all duration-300"
                                         onClick={() => setSelectedItem(item)}>
                                        <p className="text-[15px] font-bold text-slate-800 mb-2">{item.phase}</p>
                                        <p className="text-[13px] font-medium text-slate-500 leading-relaxed line-clamp-3">{item.desc}</p>
                                    </div>
                                </motion.div>
                            )}
                        </div>

                     </div>
                  );
               })}
            </div>
         </div>
       </div>

       {/* BRIGHT AND HOPEFUL MODAL CHI TIẾT */}
       <AnimatePresence>
         {selectedItem && (
            <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 lg:p-10 bg-slate-900/40 backdrop-blur-sm"
               onClick={() => setSelectedItem(null)}
            >
               <motion.div 
                  initial={{ scale: 0.95, opacity: 0, y: 30 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  exit={{ scale: 0.95, opacity: 0, y: 30 }}
                  transition={{ type: "spring", damping: 25, stiffness: 300 }}
                  onClick={e => e.stopPropagation()}
                  className="bg-white w-full max-w-5xl rounded-3xl overflow-hidden shadow-2xl flex flex-col lg:flex-row relative flex-shrink-0"
               >
                  <button 
                     onClick={() => setSelectedItem(null)}
                     className="absolute top-4 right-4 lg:top-6 lg:right-6 z-20 w-10 h-10 bg-white/50 hover:bg-white text-slate-800 rounded-full flex items-center justify-center transition-colors shadow-sm"
                  >
                     <X className="w-5 h-5" />
                  </button>

                  {/* Left Side: Image with bright gradient overlay */}
                  <div className="w-full lg:w-2/5 h-64 lg:h-auto relative bg-slate-100 flex-shrink-0 overflow-hidden">
                     <img src={selectedItem.image} alt={selectedItem.phase} className="w-full h-full object-cover mix-blend-multiply" />
                     <div className={`absolute inset-0 bg-gradient-to-t ${selectedItem.gradient} opacity-80`} />
                     <div className="absolute inset-0 bg-gradient-to-tr from-black/40 via-transparent to-transparent" />
                     <div className="absolute bottom-8 left-8 right-8">
                        <span className="inline-block px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-[#0070c0] bg-white rounded-full shadow-md mb-4">
                           {selectedItem.year}
                        </span>
                        <h3 className="text-3xl lg:text-4xl font-extrabold text-white leading-tight drop-shadow-md">
                           {selectedItem.title}
                        </h3>
                     </div>
                  </div>

                  {/* Right Side: Clean Bright Content Scroll */}
                  <div className="w-full lg:w-3/5 p-8 lg:p-12 overflow-y-auto max-h-[60vh] lg:max-h-[85vh] bg-white content-scroll-area custom-scrollbar">
                     <div className="flex items-center gap-3 mb-6">
                        <div className={`w-12 h-12 rounded-xl ${selectedItem.accentColor} flex items-center justify-center`}>
                            <selectedItem.icon className={`w-6 h-6 ${selectedItem.textColor}`} />
                        </div>
                        <h2 className="text-xl font-bold text-slate-800">{selectedItem.phase}</h2>
                     </div>

                     <p className="text-slate-600 text-base leading-relaxed text-justify mb-8 px-4 py-3 bg-slate-50 border-l-4 border-slate-200 rounded-r-lg italic">
                         "{selectedItem.desc}"
                     </p>
                     
                     <div className="space-y-6">
                        {selectedItem.details.map((detail: any, idx: number) => (
                           <motion.div 
                              initial={{ opacity: 0, x: 20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.1 + idx * 0.1 }}
                              key={idx} 
                              className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow"
                           >
                              <h4 className={`font-bold mb-2 flex items-center gap-2 ${selectedItem.textColor}`}>
                                 <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                                 {detail.subtitle}
                              </h4>
                              <p className="text-slate-600 leading-relaxed text-[15px] text-justify font-medium">
                                 {detail.text}
                              </p>
                           </motion.div>
                        ))}
                     </div>
                  </div>
               </motion.div>
            </motion.div>
         )}
       </AnimatePresence>
       
       <style jsx global>{`
         .animate-gradient {
            animation: gradient 5s ease infinite;
         }
         @keyframes gradient {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
         }
         .custom-scrollbar::-webkit-scrollbar {
           width: 6px;
         }
         .custom-scrollbar::-webkit-scrollbar-track {
           background: #f8fafc;
         }
         .custom-scrollbar::-webkit-scrollbar-thumb {
           background: #cbd5e1;
           border-radius: 10px;
         }
         .custom-scrollbar::-webkit-scrollbar-thumb:hover {
           background: #94a3b8;
         }
       `}</style>
    </div>
  );
}



