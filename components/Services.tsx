
import React from 'react';
import { SERVICES } from '../constants';
import { DollarSign, Clock, Tag, Edit2, Trash2, Plus } from 'lucide-react';

const Services: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">Meniu Servicii</h2>
        <button className="bg-amber-500 text-slate-950 px-6 py-2.5 rounded-xl font-bold flex items-center gap-2 hover:bg-amber-400 transition-all shadow-lg shadow-amber-500/20">
          <Plus size={18} /> Adaugă Serviciu
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {SERVICES.map((service) => (
          <div key={service.id} className="bg-slate-900 rounded-2xl border border-slate-800 p-6 hover:border-amber-500/30 transition-all group relative overflow-hidden">
            <div className="absolute top-0 right-0 p-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
              <button className="p-2 bg-slate-800 rounded-lg text-slate-400 hover:text-amber-500 transition-colors">
                <Edit2 size={16} />
              </button>
              <button className="p-2 bg-slate-800 rounded-lg text-slate-400 hover:text-red-500 transition-colors">
                <Trash2 size={16} />
              </button>
            </div>

            <div className="flex items-start gap-4 mb-6">
              <div className="bg-slate-800 p-3 rounded-xl">
                <Tag className="text-amber-500 w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500 bg-slate-800 px-2 py-0.5 rounded-md mb-2 inline-block">
                  {service.category}
                </span>
                <h3 className="text-lg font-bold text-slate-100">{service.name}</h3>
              </div>
            </div>

            <div className="flex items-center justify-between pt-6 border-t border-slate-800">
              <div className="flex items-center gap-2 text-slate-400">
                <Clock size={16} className="text-amber-500/50" />
                <span className="text-sm font-medium">{service.durationMinutes} min</span>
              </div>
              <div className="flex items-center gap-1 text-2xl font-black text-amber-500">
                {service.price}
                <span className="text-xs font-bold text-amber-500/50 uppercase ml-1">Ron</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-8 mt-12 text-center">
        <h3 className="text-lg font-bold mb-2">Configurează Pachete</h3>
        <p className="text-slate-500 text-sm max-w-md mx-auto mb-6">
          Combină mai multe servicii pentru a crea oferte speciale clienților tăi și a crește valoarea medie a bonului.
        </p>
        <button className="border border-amber-500 text-amber-500 px-8 py-3 rounded-xl font-bold hover:bg-amber-500 hover:text-slate-950 transition-all">
          Creează un Pachet Promo
        </button>
      </div>
    </div>
  );
};

export default Services;
