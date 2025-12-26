
import React, { useState } from 'react';
import { Mail, Phone, Calendar, MessageSquare, Sparkles, Filter, ChevronRight, UserPlus } from 'lucide-react';
import { MOCK_CUSTOMERS } from '../constants';
import { Customer } from '../types';
import { generateMarketingMessage } from '../services/geminiService';

const Customers: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>(MOCK_CUSTOMERS);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [aiMessage, setAiMessage] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleAiAction = async (customer: Customer) => {
    setSelectedCustomer(customer);
    setIsGenerating(true);
    setAiMessage(null);
    const msg = await generateMarketingMessage(customer.name, customer.lastVisit);
    setAiMessage(msg);
    setIsGenerating(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button className="bg-slate-900 border border-slate-800 px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 hover:bg-slate-800 transition-colors">
            <Filter size={16} /> Toți Clienții
          </button>
          <button className="bg-slate-900 border border-slate-800 px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 hover:bg-slate-800 transition-colors">
             Fideli (Top 10%)
          </button>
        </div>
        <button className="bg-amber-500 text-slate-950 px-6 py-2.5 rounded-xl font-bold flex items-center gap-2 hover:bg-amber-400 transition-all shadow-lg shadow-amber-500/20 active:scale-95">
          <UserPlus size={18} /> Adaugă Client Nou
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {customers.map((c) => (
            <div key={c.id} className="bg-slate-900 p-5 rounded-2xl border border-slate-800 flex items-center justify-between group hover:border-amber-500/50 transition-all">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-slate-800 rounded-full flex items-center justify-center font-bold text-amber-500 border border-slate-700">
                  {c.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-bold text-slate-100">{c.name}</h4>
                  <div className="flex items-center gap-3 text-xs text-slate-500 mt-1">
                    <span className="flex items-center gap-1"><Phone size={12} /> {c.phone}</span>
                    <span className="flex items-center gap-1"><Calendar size={12} /> Vizite: {c.visitsCount}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => handleAiAction(c)}
                  className="p-2 text-slate-400 hover:text-amber-500 hover:bg-amber-500/10 rounded-lg transition-all"
                  title="Generează mesaj promoțional AI"
                >
                  <Sparkles size={20} />
                </button>
                <button className="p-2 text-slate-400 hover:text-blue-400 hover:bg-blue-400/10 rounded-lg transition-all">
                  <Mail size={20} />
                </button>
                <button className="p-2 text-slate-400 hover:text-slate-100 hover:bg-slate-700 rounded-lg transition-all">
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* AI Message Panel */}
        <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-xl h-fit sticky top-8">
          <div className="flex items-center gap-2 mb-6">
            <div className="p-2 bg-amber-500 rounded-lg">
              <MessageSquare className="text-slate-950 w-5 h-5" />
            </div>
            <h3 className="font-bold text-lg">Marketing AI</h3>
          </div>

          {!selectedCustomer ? (
            <div className="text-center py-12 px-4 border-2 border-dashed border-slate-800 rounded-xl">
              <Sparkles className="w-8 h-8 text-slate-700 mx-auto mb-3" />
              <p className="text-slate-500 text-sm">Selectează un client pentru a genera o campanie personalizată.</p>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700">
                <p className="text-xs text-slate-500 uppercase font-bold tracking-wider mb-2">Destinatar</p>
                <p className="font-bold text-amber-500">{selectedCustomer.name}</p>
                <p className="text-xs text-slate-400">Ultima vizită: {selectedCustomer.lastVisit || 'N/A'}</p>
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 relative min-h-[120px] flex items-center justify-center">
                {isGenerating ? (
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-5 h-5 border-2 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
                    <span className="text-xs text-slate-500">Mă gândesc la cel mai bun mesaj...</span>
                  </div>
                ) : (
                  <p className="text-sm text-slate-300 italic">"{aiMessage}"</p>
                )}
              </div>

              <div className="flex gap-2">
                <button 
                  disabled={isGenerating}
                  className="flex-1 bg-amber-500 text-slate-950 py-3 rounded-xl font-bold text-sm hover:bg-amber-400 transition-colors disabled:opacity-50"
                >
                  Trimite Mesaj
                </button>
                <button 
                  disabled={isGenerating}
                  onClick={() => handleAiAction(selectedCustomer)}
                  className="p-3 bg-slate-800 text-slate-300 rounded-xl hover:bg-slate-700 transition-colors"
                >
                  Regenerează
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Customers;
