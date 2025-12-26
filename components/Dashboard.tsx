
import React, { useState, useEffect } from 'react';
import { TrendingUp, Users, Calendar, DollarSign, Sparkles } from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell
} from 'recharts';
import { getBusinessAdvice } from '../services/geminiService';

const data = [
  { name: 'Luni', revenue: 450 },
  { name: 'Marți', revenue: 600 },
  { name: 'Mie', revenue: 550 },
  { name: 'Joi', revenue: 800 },
  { name: 'Vin', revenue: 1200 },
  { name: 'Sâm', revenue: 1500 },
  { name: 'Dum', revenue: 200 },
];

const topBarbers = [
  { name: 'Alex', appointments: 42, revenue: 2100 },
  { name: 'Mihai', appointments: 35, revenue: 1750 },
  { name: 'Stefan', appointments: 28, revenue: 1400 },
];

const StatCard = ({ title, value, icon: Icon, trend }: any) => (
  <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 hover:border-amber-500/30 transition-all shadow-xl">
    <div className="flex items-center justify-between mb-4">
      <div className="bg-slate-800 p-3 rounded-xl">
        <Icon className="text-amber-500 w-6 h-6" />
      </div>
      {trend && (
        <span className={`text-xs font-medium px-2 py-1 rounded-full ${trend > 0 ? 'bg-emerald-500/10 text-emerald-500' : 'bg-red-500/10 text-red-500'}`}>
          {trend > 0 ? '+' : ''}{trend}%
        </span>
      )}
    </div>
    <p className="text-slate-400 text-sm font-medium">{title}</p>
    <h3 className="text-2xl font-bold mt-1">{value}</h3>
  </div>
);

const Dashboard: React.FC = () => {
  const [advice, setAdvice] = useState<string>('Analizez datele pentru tine...');

  useEffect(() => {
    const fetchAdvice = async () => {
      const stats = { totalRevenue: 5300, activeCustomers: 124, avgOrderValue: 65 };
      const res = await getBusinessAdvice(stats);
      setAdvice(res);
    };
    fetchAdvice();
  }, []);

  return (
    <div className="space-y-8">
      {/* AI Advice Banner */}
      <div className="bg-gradient-to-r from-amber-500/10 to-transparent border border-amber-500/20 rounded-2xl p-6 flex items-start gap-4 shadow-sm">
        <div className="bg-amber-500 p-3 rounded-xl shadow-lg shadow-amber-500/20">
          <Sparkles className="text-slate-950 w-6 h-6 animate-pulse" />
        </div>
        <div>
          <h4 className="text-amber-500 font-bold flex items-center gap-2">Asistent AI: Analiză Business</h4>
          <div className="text-slate-300 text-sm mt-1 whitespace-pre-line leading-relaxed">
            {advice}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Venit Săptămânal" value="5,300 RON" icon={DollarSign} trend={12} />
        <StatCard title="Clienți Noi" value="18" icon={Users} trend={5} />
        <StatCard title="Programări Azi" value="14" icon={Calendar} trend={-2} />
        <StatCard title="Valoare Medie Bon" value="65 RON" icon={TrendingUp} trend={8} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Revenue Chart */}
        <div className="lg:col-span-2 bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-xl">
          <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
            Venituri pe Săptămână
            <span className="text-xs font-normal text-slate-500">(RON)</span>
          </h3>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '8px' }}
                  itemStyle={{ color: '#f59e0b' }}
                />
                <Area type="monotone" dataKey="revenue" stroke="#f59e0b" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top Staff */}
        <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-xl">
          <h3 className="text-lg font-bold mb-6">Top Frizeri</h3>
          <div className="space-y-6">
            {topBarbers.map((barber, idx) => (
              <div key={barber.name} className="flex items-center justify-between group cursor-default">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center font-bold text-slate-300 transition-colors group-hover:bg-amber-500/20 group-hover:text-amber-500">
                    {idx + 1}
                  </div>
                  <div>
                    <p className="font-bold text-slate-100">{barber.name}</p>
                    <p className="text-xs text-slate-500">{barber.appointments} programări</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-amber-500">{barber.revenue} RON</p>
                  <div className="w-24 h-1.5 bg-slate-800 rounded-full mt-2 overflow-hidden">
                    <div 
                      className="h-full bg-amber-500 rounded-full" 
                      style={{ width: `${(barber.revenue / 2100) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-8 py-3 rounded-xl border border-slate-800 text-slate-400 font-medium hover:bg-slate-800 hover:text-slate-100 transition-all">
            Vezi Raport Complet
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
