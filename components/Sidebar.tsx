
import React from 'react';
import { motion } from 'framer-motion';
import { Home, BookOpen, BarChart2, MessageSquare, Leaf, Settings, ChevronRight } from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  progress?: number;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab, progress = 0 }) => {
  const menuItems = [
    { id: 'dashboard', icon: Home, label: 'Beranda' },
    { id: 'lessons', icon: BookOpen, label: 'Kurikulum' },
    { id: 'visualizer', icon: BarChart2, label: 'Monitor IoT' },
    { id: 'tutor', icon: MessageSquare, label: 'Agri-Tutor AI' },
  ];

  return (
    <aside className="fixed left-0 top-0 h-full w-72 glass border-r border-slate-200/50 dark:border-slate-800/50 hidden md:flex flex-col z-50 transition-all duration-500">
      <div className="p-8 flex items-center gap-4">
        <motion.div 
          whileHover={{ rotate: 15, scale: 1.1 }}
          className="bg-emerald-500 p-3 rounded-2xl shadow-lg shadow-emerald-500/20"
        >
          <Leaf className="text-white" size={24} />
        </motion.div>
        <div>
          <h1 className="text-xl font-extrabold text-slate-900 dark:text-white tracking-tight">HydroSmart</h1>
          <span className="text-[10px] text-emerald-500 font-black uppercase tracking-[0.2em]">Academy v2.5</span>
        </div>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-2">
        {menuItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className="group relative w-full flex items-center justify-between px-4 py-4 rounded-2xl transition-all duration-300"
            >
              <div className="flex items-center gap-4 z-10">
                <item.icon size={20} className={`${isActive ? 'text-white' : 'text-slate-500 group-hover:text-emerald-500'}`} />
                <span className={`font-semibold ${isActive ? 'text-white' : 'text-slate-600 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white'}`}>
                  {item.label}
                </span>
              </div>
              
              {isActive && (
                <motion.div 
                  layoutId="activeNav"
                  className="absolute inset-0 bg-emerald-500 rounded-2xl shadow-xl shadow-emerald-500/30"
                  initial={false}
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
              
              {isActive && <ChevronRight size={16} className="text-white z-10" />}
            </button>
          );
        })}
      </nav>

      <div className="p-6 mt-auto">
        <div className="bg-slate-100/50 dark:bg-slate-800/50 rounded-3xl p-5 border border-white/20">
          <div className="flex justify-between items-center mb-3">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Mastery</span>
            <span className="text-xs font-black text-emerald-500">{progress}%</span>
          </div>
          <div className="w-full bg-slate-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full"
            />
          </div>
          <p className="text-[10px] text-slate-500 mt-3 font-medium leading-relaxed">
            Selesaikan <span className="text-emerald-500">Ujian Akhir</span> untuk sertifikat.
          </p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
