
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { Droplets, Thermometer, Sun, Wind, Activity, Zap } from 'lucide-react';

const Visualizer: React.FC = () => {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    const generateData = () => {
      const newData = [];
      const now = new Date();
      for (let i = 15; i >= 0; i--) {
        const time = new Date(now.getTime() - i * 5000);
        newData.push({
          time: `${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`,
          ph: 5.5 + Math.random() * 1.5,
          temp: 24 + Math.random() * 4,
          nutrient: 1200 + Math.random() * 100
        });
      }
      setData(newData);
    };

    generateData();
    const interval = setInterval(() => {
      setData(prev => {
        const last = prev[prev.length - 1];
        const nextTime = new Date();
        const next = {
          time: `${nextTime.getHours()}:${nextTime.getMinutes()}:${nextTime.getSeconds()}`,
          ph: Math.min(7.5, Math.max(5.0, last.ph + (Math.random() - 0.5) * 0.1)),
          temp: Math.min(30, Math.max(20, last.temp + (Math.random() - 0.5) * 0.2)),
          nutrient: Math.min(1400, Math.max(1000, last.nutrient + (Math.random() - 0.5) * 20))
        };
        return [...prev.slice(1), next];
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const stats = [
    { label: 'pH Level', value: data.length ? data[data.length-1].ph.toFixed(1) : '0', icon: Droplets, color: 'text-blue-500', bg: 'bg-blue-500/10' },
    { label: 'Suhu Air', value: data.length ? `${data[data.length-1].temp.toFixed(1)}°C` : '0', icon: Thermometer, color: 'text-orange-500', bg: 'bg-orange-500/10' },
    { label: 'EC (Nutrisi)', value: data.length ? `${data[data.length-1].nutrient.toFixed(0)} ppm` : '0', icon: Zap, color: 'text-amber-500', bg: 'bg-amber-500/10' },
    { label: 'Flow Rate', value: '2.1 L/m', icon: Activity, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
  ];

  return (
    <div className="space-y-10 animate-in fade-in">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            key={i} 
            className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all"
          >
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 ${stat.bg} ${stat.color}`}>
              <stat.icon size={24} />
            </div>
            <p className="text-3xl font-black mb-1">{stat.value}</p>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="bg-white dark:bg-slate-900 p-10 rounded-[3rem] border border-slate-100 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between mb-10">
             <h3 className="text-xl font-black">Live pH Analytics</h3>
             <div className="px-4 py-2 bg-emerald-500/10 text-emerald-600 rounded-full text-[10px] font-black uppercase tracking-widest animate-pulse">Live Sensor</div>
          </div>
          <div className="h-[320px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorPh" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="5 5" vertical={false} stroke="#888888" opacity={0.05} />
                <XAxis dataKey="time" hide />
                <YAxis domain={[4, 9]} axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#94a3b8', fontWeight: 'bold'}} />
                <Tooltip 
                  contentStyle={{ borderRadius: '24px', border: 'none', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)', backgroundColor: '#0f172a', padding: '16px' }} 
                  itemStyle={{ color: '#10b981', fontWeight: 'bold' }}
                />
                <Area type="monotone" dataKey="ph" stroke="#10b981" strokeWidth={4} fillOpacity={1} fill="url(#colorPh)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-10 rounded-[3rem] border border-slate-100 dark:border-slate-800 shadow-sm">
           <div className="flex items-center justify-between mb-10">
             <h3 className="text-xl font-black">Temperature Index</h3>
             <Thermometer className="text-orange-500" />
          </div>
          <div className="h-[320px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="5 5" vertical={false} stroke="#888888" opacity={0.05} />
                <XAxis dataKey="time" hide />
                <YAxis domain={[15, 35]} axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#94a3b8', fontWeight: 'bold'}} />
                <Tooltip 
                  contentStyle={{ borderRadius: '24px', border: 'none', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)', backgroundColor: '#0f172a', padding: '16px' }} 
                />
                <Line type="monotone" dataKey="temp" stroke="#f59e0b" strokeWidth={5} dot={{ r: 6, fill: '#f59e0b', strokeWidth: 0 }} activeDot={{ r: 10, strokeWidth: 0 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Visualizer;
