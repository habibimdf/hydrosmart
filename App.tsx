
import React, { useState, useMemo, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Sidebar from './components/Sidebar';
import AgriTutor from './components/AgriTutor';
import Visualizer from './components/Visualizer';
import Quiz from './components/Quiz';
import { LESSONS, CATEGORY_COLORS, HYDRO_QUOTES } from './constants';
import { 
  Play, 
  CheckCircle, 
  ArrowRight, 
  BookOpen, 
  Search, 
  X, 
  Sun, 
  Moon, 
  Download, 
  MonitorPlay,
  Video,
  Award,
  Star,
  Zap,
  Quote,
  Trash2,
  SearchX,
  Bell,
  Lock,
  GraduationCap,
  LayoutGrid,
  TrendingUp,
  Inbox
} from 'lucide-react';

interface Notification {
  id: string;
  text: string;
  type: 'system' | 'quote';
  timestamp: Date;
  read: boolean;
}

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedLesson, setSelectedLesson] = useState<any>(null);
  const [completedLessons, setCompletedLessons] = useState<Set<string>>(new Set());
  const [searchQuery, setSearchQuery] = useState('');
  const [certificateName, setCertificateName] = useState('');
  const [unlockedLessons, setUnlockedLessons] = useState<Set<string>>(new Set(['1']));
  const [isFinalExamPassed, setIsFinalExamPassed] = useState(false);
  
  const searchInputRef = useRef<HTMLInputElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [quizLesson, setQuizLesson] = useState<any>(null); 
  const [isFinalExamActive, setIsFinalExamActive] = useState(false);
  
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches);
  });

  const finalExamQuestions = useMemo(() => LESSONS.flatMap(lesson => lesson.quiz), []);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const progress = useMemo(() => Math.round((completedLessons.size / LESSONS.length) * 100), [completedLessons]);
  const filteredLessons = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) return LESSONS;
    return LESSONS.filter(l => 
      l.title.toLowerCase().includes(query) || 
      l.description.toLowerCase().includes(query) ||
      l.category.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  const startModuleQuiz = (lesson: any) => {
    setQuizLesson(lesson);
    setIsFinalExamActive(false);
    setIsQuizOpen(true);
  };

  const handleQuizFinish = (score: number) => {
    setIsQuizOpen(false);
    if (isFinalExamActive) {
      if (score >= 100) {
        setIsFinalExamPassed(true);
        addNotification("Selamat! Kamu telah lulus Ujian Akhir Kompetensi.");
      }
      setIsFinalExamActive(false);
    } else if (score >= 100 && quizLesson) {
      setCompletedLessons(prev => new Set([...prev, quizLesson.id]));
      const idx = LESSONS.findIndex(l => l.id === quizLesson.id);
      if (idx < LESSONS.length - 1) {
        setUnlockedLessons(prev => new Set([...prev, LESSONS[idx+1].id]));
        addNotification(`Modul baru terbuka: ${LESSONS[idx+1].title}`);
      }
      setSelectedLesson(null);
    }
  };

  const addNotification = (text: string, type: 'system' | 'quote' = 'system') => {
    const newNotif: Notification = {
      id: Math.random().toString(36).substr(2, 9),
      text,
      type,
      timestamp: new Date(),
      read: false
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  const handleDownloadCertificate = () => {
    if (!certificateName.trim()) {
      alert("Masukkan nama lengkap Anda untuk sertifikat.");
      return;
    }
    const canvas = document.createElement('canvas');
    canvas.width = 1200; canvas.height = 800;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    ctx.fillStyle = '#ffffff'; ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = '#059669'; ctx.lineWidth = 40; ctx.strokeRect(20, 20, canvas.width - 40, canvas.height - 40);
    ctx.strokeStyle = '#10b981'; ctx.lineWidth = 10; ctx.strokeRect(60, 60, canvas.width - 120, canvas.height - 120);
    ctx.fillStyle = '#064e3b'; ctx.textAlign = 'center'; 
    ctx.font = 'bold 80px "Plus Jakarta Sans", sans-serif'; ctx.fillText('SERTIFIKAT KELULUSAN', canvas.width / 2, 220);
    ctx.font = '30px "Plus Jakarta Sans", sans-serif'; ctx.fillStyle = '#64748b'; ctx.fillText('Diberikan kepada:', canvas.width / 2, 300);
    ctx.font = 'bold 60px "Plus Jakarta Sans", sans-serif'; ctx.fillStyle = '#059669'; ctx.fillText(certificateName.trim().toUpperCase(), canvas.width / 2, 390);
    ctx.font = '30px "Plus Jakarta Sans", sans-serif'; ctx.fillStyle = '#64748b'; ctx.fillText('Telah berhasil menyelesaikan seluruh kurikulum:', canvas.width / 2, 470);
    ctx.font = 'bold 40px "Plus Jakarta Sans", sans-serif'; ctx.fillStyle = '#064e3b'; ctx.fillText('Modern Hydroponics & Smart Irrigation 4.0', canvas.width / 2, 530);
    ctx.font = '20px "Plus Jakarta Sans", sans-serif'; ctx.fillStyle = '#94a3b8'; ctx.fillText(`HydroSmart Academy - ${new Date().toLocaleDateString('id-ID')}`, canvas.width / 2, 650);

    const link = document.createElement('a');
    link.download = `Sertifikat-HydroSmart-${certificateName.replace(/\s+/g, '-')}.png`;
    link.href = canvas.toDataURL('image/png'); link.click();
  };

  const renderContent = () => {
    return (
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab + (isQuizOpen ? '-quiz' : '')}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.4, ease: "circOut" }}
          className="w-full"
        >
          {isQuizOpen ? (
            <Quiz 
              questions={isFinalExamActive ? finalExamQuestions : quizLesson?.quiz || []} 
              title={isFinalExamActive ? "Ujian Akhir Kompetensi" : `Kuis: ${quizLesson?.title}`}
              onFinish={handleQuizFinish} 
              onCancel={() => setIsQuizOpen(false)} 
            />
          ) : activeTab === 'dashboard' ? (
            <div className="space-y-10">
              <div className="relative overflow-hidden rounded-[3rem] p-12 mesh-gradient text-white shadow-2xl">
                <div className="relative z-10 max-w-2xl">
                  <motion.div 
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/20 rounded-full text-xs font-bold uppercase tracking-widest mb-6"
                  >
                    <Zap size={14} /> Edisi Hidroponik 4.0
                  </motion.div>
                  <h2 className="text-5xl font-black mb-6 leading-tight">Revolusi Pertanian di Genggaman Anda</h2>
                  <p className="text-emerald-50 text-xl mb-10 opacity-90 leading-relaxed">Pelajari teknik hidroponik modern dan pengairan berbasis IoT dengan kurikulum berstandar industri.</p>
                  <button onClick={() => setActiveTab('lessons')} className="bg-white text-emerald-600 px-10 py-5 rounded-2xl font-black shadow-2xl hover:bg-emerald-50 transition-all flex items-center gap-3 active:scale-95">
                    Mulai Kurikulum <ArrowRight size={20} />
                  </button>
                </div>
                <motion.div 
                  animate={{ y: [0, -20, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute right-[-10%] top-[-10%] opacity-20"
                >
                  <MonitorPlay size={400} />
                </motion.div>
              </div>

              <section>
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-2xl font-black flex items-center gap-3">
                    <LayoutGrid className="text-emerald-500" /> {searchQuery ? `Hasil Pencarian: "${searchQuery}"` : 'Materi Unggulan'}
                  </h3>
                </div>
                {filteredLessons.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {filteredLessons.map((lesson) => {
                      const isUnlocked = unlockedLessons.has(lesson.id);
                      const isCompleted = completedLessons.has(lesson.id);
                      return (
                        <motion.div 
                          whileHover={isUnlocked ? { y: -10 } : {}}
                          key={lesson.id}
                          onClick={() => isUnlocked && (setSelectedLesson(lesson), setActiveTab('lessons'))}
                          className={`group p-8 rounded-[2.5rem] border-2 transition-all cursor-pointer relative overflow-hidden ${
                            isUnlocked 
                              ? 'bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 hover:border-emerald-500/50 shadow-xl shadow-slate-200/50 dark:shadow-none' 
                              : 'bg-slate-100/50 dark:bg-slate-900/50 border-transparent opacity-60 grayscale'
                          }`}
                        >
                          {!isUnlocked && <Lock className="absolute top-6 right-6 text-slate-400" size={20} />}
                          {isCompleted && <CheckCircle className="absolute top-6 right-6 text-emerald-500" size={24} />}
                          
                          <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${CATEGORY_COLORS[lesson.category as keyof typeof CATEGORY_COLORS]}`}>
                            <Play size={24} />
                          </div>
                          <h4 className="text-lg font-extrabold mb-3 group-hover:text-emerald-500 transition-colors">{lesson.title}</h4>
                          <p className="text-sm text-slate-500 mb-6 line-clamp-2">{lesson.description}</p>
                          <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
                            <BookOpen size={12} /> {lesson.duration}
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-20 text-slate-400">
                    <Inbox size={64} className="mb-4 opacity-20" />
                    <p className="text-xl font-bold">Materi tidak ditemukan</p>
                    <button onClick={() => setSearchQuery('')} className="mt-4 text-emerald-500 font-bold hover:underline">Reset pencarian</button>
                  </div>
                )}
              </section>
            </div>
          ) : activeTab === 'lessons' ? (
             <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                <div className="lg:col-span-2 space-y-8">
                   {selectedLesson ? (
                      <div className="bg-white dark:bg-slate-900 rounded-[3rem] shadow-2xl border border-slate-100 dark:border-slate-800 overflow-hidden">
                         <div className="aspect-video bg-slate-900 flex items-center justify-center group relative overflow-hidden">
                            <Video size={80} className="text-white/20 group-hover:scale-110 transition-transform duration-700" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-12">
                               <h2 className="text-3xl font-black text-white mb-2">{selectedLesson.title}</h2>
                               <p className="text-white/70">Tekan tombol tonton untuk memulai simulasi video.</p>
                            </div>
                            <a href={selectedLesson.videoUrl} target="_blank" className="absolute inset-0 z-10" />
                         </div>
                         <div className="p-12">
                            <div className="prose dark:prose-invert max-w-none text-slate-600 dark:text-slate-400 text-lg leading-relaxed mb-12">
                               {selectedLesson.content}
                            </div>
                            <div className="flex gap-4">
                               {!completedLessons.has(selectedLesson.id) ? (
                                  <button onClick={() => startModuleQuiz(selectedLesson)} className="bg-emerald-500 text-white px-10 py-5 rounded-2xl font-black hover:bg-emerald-600 transition-all shadow-xl shadow-emerald-500/30">Mulai Kuis Modul</button>
                               ) : (
                                  <div className="bg-emerald-50 dark:bg-emerald-950 px-10 py-5 rounded-2xl border border-emerald-200 flex items-center gap-3 text-emerald-600 font-bold"><CheckCircle /> Selesai</div>
                               )}
                               <button onClick={() => setSelectedLesson(null)} className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-10 py-5 rounded-2xl font-bold">Kembali</button>
                            </div>
                         </div>
                      </div>
                   ) : (
                      <div className="space-y-6">
                         <h2 className="text-3xl font-black mb-8">{searchQuery ? `Pencarian: "${searchQuery}"` : 'Daftar Modul Kurikulum'}</h2>
                         {filteredLessons.length > 0 ? (
                           filteredLessons.map((l, i) => {
                            const isUnlocked = unlockedLessons.has(l.id);
                            const isCompleted = completedLessons.has(l.id);
                            return (
                               <motion.div 
                                  initial={{ x: -20, opacity: 0 }}
                                  animate={{ x: 0, opacity: 1 }}
                                  transition={{ delay: i * 0.1 }}
                                  key={l.id} 
                                  onClick={() => isUnlocked && setSelectedLesson(l)}
                                  className={`p-8 rounded-[2.5rem] border-2 flex items-center justify-between cursor-pointer transition-all ${
                                     isUnlocked 
                                      ? 'bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 hover:border-emerald-500' 
                                      : 'bg-slate-100/50 opacity-50 grayscale'
                                  }`}
                               >
                                  <div className="flex items-center gap-6">
                                     <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black ${isCompleted ? 'bg-emerald-500 text-white' : 'bg-emerald-500/10 text-emerald-600'}`}>
                                        {isCompleted ? <CheckCircle size={20} /> : `0${i+1}`}
                                     </div>
                                     <div>
                                        <h4 className="text-xl font-bold">{l.title}</h4>
                                        <p className="text-sm text-slate-400">{l.category} • {l.duration}</p>
                                     </div>
                                  </div>
                                  {isUnlocked ? <ArrowRight size={20} className="text-emerald-500" /> : <Lock size={20} className="text-slate-400" />}
                               </motion.div>
                            );
                           })
                         ) : (
                           <div className="flex flex-col items-center justify-center py-20 text-slate-400 bg-white dark:bg-slate-900 rounded-[3rem] border border-slate-100 dark:border-slate-800">
                             <SearchX size={64} className="mb-4 opacity-20" />
                             <p className="text-xl font-bold">Modul tidak ditemukan</p>
                             <button onClick={() => setSearchQuery('')} className="mt-4 text-emerald-500 font-bold hover:underline">Reset pencarian</button>
                           </div>
                         )}
                      </div>
                   )}
                </div>
                <div className="lg:col-span-1 space-y-8">
                   <div className="bg-emerald-600 p-8 rounded-[3rem] text-white shadow-2xl relative overflow-hidden">
                      <TrendingUp size={120} className="absolute right-[-20px] bottom-[-20px] text-white/10" />
                      <h3 className="text-xl font-black mb-2">Pencapaian</h3>
                      <p className="text-emerald-100 text-sm mb-6">Kamu telah menyelesaikan {completedLessons.size} dari {LESSONS.length} materi.</p>
                      <div className="w-full bg-white/20 h-3 rounded-full overflow-hidden mb-8">
                         <div className="bg-white h-full transition-all duration-1000" style={{ width: `${progress}%` }} />
                      </div>
                      {isFinalExamPassed ? (
                         <div className="space-y-4">
                            <input 
                              type="text" 
                              placeholder="Nama untuk Sertifikat" 
                              value={certificateName}
                              onChange={(e) => setCertificateName(e.target.value)}
                              className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/50 outline-none"
                            />
                            <button onClick={handleDownloadCertificate} className="w-full bg-white text-emerald-600 py-4 rounded-2xl font-black shadow-lg flex items-center justify-center gap-2">
                              <Download size={20} /> Unduh Sertifikat
                            </button>
                         </div>
                      ) : progress === 100 ? (
                         <button onClick={() => { setIsFinalExamActive(true); setIsQuizOpen(true); }} className="w-full bg-amber-400 text-amber-900 py-4 rounded-2xl font-black animate-bounce">
                           Ambil Ujian Akhir
                         </button>
                      ) : (
                         <p className="text-xs text-emerald-100 italic">Selesaikan semua modul untuk membuka Ujian Akhir.</p>
                      )}
                   </div>
                </div>
             </div>
          ) : activeTab === 'visualizer' ? <Visualizer /> : <AgriTutor />}
        </motion.div>
      </AnimatePresence>
    );
  };

  return (
    <div className="min-h-screen flex bg-slate-50 dark:bg-[#020617] transition-colors duration-500">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} progress={progress} />
      <main className="flex-1 md:ml-72 p-6 md:p-16 pb-32">
        <div className="max-w-7xl mx-auto">
          <header className="flex flex-col md:flex-row justify-between items-center mb-16 gap-8">
            <div className="relative flex-1 w-full max-w-xl group">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-500 transition-colors" size={20} />
              <input 
                type="text" 
                ref={searchInputRef}
                value={searchQuery} 
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari materi (e.g. NFT, Nutrisi, Dasar)..." 
                className="w-full pl-16 pr-10 py-5 bg-white dark:bg-slate-900 border-none rounded-3xl shadow-sm focus:ring-4 focus:ring-emerald-500/10 dark:text-white transition-all outline-none" 
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                >
                  <X size={20} />
                </button>
              )}
            </div>
            <div className="flex gap-4">
              <button onClick={() => setIsDarkMode(!isDarkMode)} className="p-5 bg-white dark:bg-slate-900 rounded-3xl shadow-sm hover:scale-105 active:scale-90 transition-all">
                {isDarkMode ? <Sun className="text-amber-400" /> : <Moon className="text-slate-600" />}
              </button>
              <div className="relative" ref={notifRef}>
                <button onClick={() => setIsNotifOpen(!isNotifOpen)} className="p-5 bg-white dark:bg-slate-900 rounded-3xl shadow-sm hover:scale-105 transition-all">
                  <Bell size={24} />
                  {notifications.some(n => !n.read) && (
                    <span className="absolute top-4 right-4 w-3 h-3 bg-red-500 rounded-full border-4 border-white dark:border-slate-900" />
                  )}
                </button>
                {isNotifOpen && (
                  <div className="absolute right-0 mt-4 w-80 bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-200 dark:border-slate-800 shadow-2xl z-50 overflow-hidden animate-in slide-in-from-top-4">
                    <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-emerald-50/30">
                      <h4 className="font-extrabold text-slate-900 dark:text-slate-100">Informasi</h4>
                      <button onClick={() => setNotifications([])} className="p-2 text-slate-400 hover:text-red-500"><Trash2 size={18} /></button>
                    </div>
                    <div className="max-h-[400px] overflow-y-auto">
                      {notifications.length === 0 ? (
                        <p className="p-10 text-center text-slate-400 italic">Belum ada notifikasi.</p>
                      ) : (
                        notifications.map((notif) => (
                          <div key={notif.id} className="p-5 flex gap-4 border-b border-slate-50 dark:border-slate-800">
                            <div className={`shrink-0 w-10 h-10 rounded-xl flex items-center justify-center bg-emerald-100 text-emerald-600`}>
                              <Zap size={18} />
                            </div>
                            <p className="text-sm text-slate-600 dark:text-slate-400">{notif.text}</p>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </header>
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default App;
