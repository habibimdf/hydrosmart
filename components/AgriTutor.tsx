
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Bot, User, Loader2, Sparkles, MessageSquare } from 'lucide-react';
import { getAgriTutorResponse } from '../services/geminiService';
import { ChatMessage } from '../types';

const AgriTutor: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', content: 'Halo petani masa depan! 🌱 Saya Agri-Tutor AI. Ada yang ingin kamu diskusikan tentang sistem NFT atau IoT hari ini?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  useEffect(scrollToBottom, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    const userMsg: ChatMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);
    const response = await getAgriTutorResponse(input);
    setMessages(prev => [...prev, { role: 'model', content: response }]);
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col h-[75vh] bg-white dark:bg-slate-900 rounded-[3rem] shadow-2xl border border-slate-100 dark:border-slate-800 overflow-hidden relative">
      <div className="p-8 bg-gradient-to-r from-emerald-600 to-teal-500 text-white flex items-center justify-between">
        <div className="flex items-center gap-5">
          <div className="bg-white/20 p-3 rounded-[1.5rem] backdrop-blur-md">
            <Bot size={28} />
          </div>
          <div>
            <h2 className="font-black text-lg tracking-tight">Agri-Tutor AI</h2>
            {/* Updated to reflect usage of Gemini 3 Pro model in services */}
            <p className="text-[10px] text-emerald-100 uppercase font-black tracking-widest">Powered by Gemini 3 Pro</p>
          </div>
        </div>
        <div className="flex items-center gap-2 bg-emerald-500/30 px-4 py-2 rounded-full border border-white/10">
           <span className="w-2 h-2 bg-emerald-300 rounded-full animate-ping" />
           <span className="text-[10px] font-bold">LIVE ASSISTANT</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-10 space-y-8 bg-slate-50/50 dark:bg-slate-950/20">
        <AnimatePresence>
          {messages.map((msg, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, scale: 0.9, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[75%] p-6 rounded-[2rem] shadow-sm relative ${
                msg.role === 'user' 
                  ? 'bg-emerald-600 text-white rounded-tr-none' 
                  : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-tl-none border border-slate-100 dark:border-slate-700'
              }`}>
                {msg.role === 'model' && (
                   <div className="flex items-center gap-2 mb-2 text-emerald-500 font-black text-[10px] uppercase">
                      <Sparkles size={12} /> Agri Expert
                   </div>
                )}
                <div className="text-base leading-relaxed font-medium">{msg.content}</div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white dark:bg-slate-800 p-6 rounded-[2rem] border border-slate-100 dark:border-slate-700 flex items-center gap-4">
              <Loader2 className="animate-spin text-emerald-500" size={20} />
              <span className="text-sm text-slate-400 font-bold uppercase tracking-widest">Berpikir...</span>
            </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      <div className="p-8 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800">
        <div className="flex gap-4 items-center bg-slate-100 dark:bg-slate-950 p-2 rounded-[2rem] border-2 border-transparent focus-within:border-emerald-500/20 transition-all">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Tanyakan apapun tentang hidroponik..."
            className="flex-1 px-6 py-4 bg-transparent border-none rounded-2xl text-base focus:ring-0 dark:text-white transition-colors outline-none"
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSend}
            disabled={isLoading}
            className="bg-emerald-600 text-white p-5 rounded-[1.5rem] hover:bg-emerald-700 transition-all disabled:opacity-50 shadow-xl shadow-emerald-500/20"
          >
            <Send size={24} />
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default AgriTutor;
