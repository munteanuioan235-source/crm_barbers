
import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Users, 
  Calendar, 
  Scissors, 
  Settings, 
  LogOut, 
  Search,
  Plus,
  Bell,
  Sparkles
} from 'lucide-react';
import Dashboard from './components/Dashboard';
import Customers from './components/Customers';
import Appointments from './components/Appointments';
import Services from './components/Services';

type View = 'dashboard' | 'customers' | 'appointments' | 'services' | 'settings';

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<View>('dashboard');

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'appointments', label: 'Programări', icon: Calendar },
    { id: 'customers', label: 'Clienți', icon: Users },
    { id: 'services', label: 'Servicii', icon: Scissors },
    { id: 'settings', label: 'Setări', icon: Settings },
  ];

  const renderView = () => {
    switch (activeView) {
      case 'dashboard': return <Dashboard />;
      case 'customers': return <Customers />;
      case 'appointments': return <Appointments />;
      case 'services': return <Services />;
      default: return <div className="p-8 text-center">Modul în lucru...</div>;
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-100">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col fixed h-full z-10">
        <div className="p-6 flex items-center gap-3">
          <div className="bg-amber-500 p-2 rounded-lg">
            <Scissors className="text-slate-950 w-6 h-6" />
          </div>
          <span className="text-xl font-bold tracking-tight text-amber-500">BarberPro</span>
        </div>

        <nav className="flex-1 px-4 py-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveView(item.id as View)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                  activeView === item.id 
                    ? 'bg-amber-500/10 text-amber-500 font-semibold' 
                    : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                }`}
              >
                <Icon size={20} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-slate-800">
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:bg-red-500/10 hover:text-red-400 transition-colors">
            <LogOut size={20} />
            <span>Ieșire</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 p-8">
        <header className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-slate-50 capitalize">{activeView === 'dashboard' ? 'Bine ai revenit, Alex!' : activeView}</h1>
            <p className="text-slate-400 text-sm">Astăzi este {new Date().toLocaleDateString('ro-RO', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4" />
              <input 
                type="text" 
                placeholder="Caută client..." 
                className="bg-slate-900 border border-slate-800 rounded-full pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/50 w-64 transition-all"
              />
            </div>
            <button className="p-2 text-slate-400 hover:text-amber-500 relative transition-colors">
              <Bell size={20} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-slate-950"></span>
            </button>
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-amber-400 to-amber-600 flex items-center justify-center font-bold text-slate-950">
              A
            </div>
          </div>
        </header>

        <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
          {renderView()}
        </div>
      </main>
    </div>
  );
};

export default App;
