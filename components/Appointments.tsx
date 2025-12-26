
import React, { useState } from 'react';
import { Calendar as CalendarIcon, Clock, Scissors, User, MoreVertical, Plus } from 'lucide-react';
import { MOCK_APPOINTMENTS } from '../constants';
import { Appointment, AppointmentStatus } from '../types';

const Appointments: React.FC = () => {
  const [appointments, setAppointments] = useState<Appointment[]>(MOCK_APPOINTMENTS);

  const getStatusColor = (status: AppointmentStatus) => {
    switch (status) {
      case AppointmentStatus.CONFIRMED: return 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20';
      case AppointmentStatus.PENDING: return 'bg-amber-500/10 text-amber-500 border-amber-500/20';
      case AppointmentStatus.COMPLETED: return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
      case AppointmentStatus.CANCELLED: return 'bg-red-500/10 text-red-500 border-red-500/20';
      default: return 'bg-slate-500/10 text-slate-500 border-slate-500/20';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h2 className="text-xl font-bold">Programări Recente</h2>
          <div className="flex bg-slate-900 border border-slate-800 rounded-lg p-1">
            <button className="px-4 py-1.5 text-sm font-medium rounded-md bg-slate-800 text-amber-500">Listă</button>
            <button className="px-4 py-1.5 text-sm font-medium rounded-md text-slate-400 hover:text-slate-200">Calendar</button>
          </div>
        </div>
        <button className="bg-amber-500 text-slate-950 px-6 py-2.5 rounded-xl font-bold flex items-center gap-2 hover:bg-amber-400 transition-all shadow-lg shadow-amber-500/20">
          <Plus size={18} /> Programare Nouă
        </button>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-800/50 border-b border-slate-800">
              <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Client</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Serviciu / Frizer</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Dată & Oră</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Status</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider text-right">Preț</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider text-center">Acțiuni</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {appointments.map((apt) => (
              <tr key={apt.id} className="hover:bg-slate-800/30 transition-colors group">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-xs font-bold border border-slate-700">
                      {apt.customerName.charAt(0)}
                    </div>
                    <span className="font-medium text-slate-200">{apt.customerName}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-slate-300 flex items-center gap-1.5">
                      <Scissors size={14} className="text-amber-500" /> {apt.serviceName}
                    </span>
                    <span className="text-xs text-slate-500 flex items-center gap-1.5 mt-1">
                      <User size={12} /> Barber: {apt.barberName}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-slate-300 flex items-center gap-1.5">
                      <CalendarIcon size={14} className="text-slate-500" /> {apt.date}
                    </span>
                    <span className="text-xs text-slate-500 flex items-center gap-1.5 mt-1">
                      <Clock size={12} /> {apt.startTime}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-bold border uppercase tracking-widest ${getStatusColor(apt.status)}`}>
                    {apt.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <span className="font-bold text-amber-500">{apt.price} RON</span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-center">
                    <button className="p-2 text-slate-500 hover:text-slate-200 transition-colors">
                      <MoreVertical size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <div className="bg-gradient-to-br from-indigo-500/20 to-purple-500/20 p-6 rounded-2xl border border-white/5 flex flex-col justify-between h-48">
          <p className="text-indigo-300 text-sm font-bold uppercase tracking-wider">Capacitate Azi</p>
          <div className="mt-auto">
            <h3 className="text-4xl font-black">78%</h3>
            <div className="w-full bg-slate-800 h-2 rounded-full mt-2 overflow-hidden">
               <div className="h-full bg-indigo-500 rounded-full" style={{width: '78%'}}></div>
            </div>
          </div>
        </div>
        <div className="bg-gradient-to-br from-amber-500/20 to-orange-500/20 p-6 rounded-2xl border border-white/5 flex flex-col justify-between h-48">
          <p className="text-amber-300 text-sm font-bold uppercase tracking-wider">Programări În Așteptare</p>
          <div className="mt-auto flex items-end justify-between">
            <h3 className="text-4xl font-black">5</h3>
            <button className="text-xs bg-amber-500 text-slate-950 px-3 py-1 rounded-lg font-bold">Revizuiește</button>
          </div>
        </div>
        <div className="bg-gradient-to-br from-emerald-500/20 to-teal-500/20 p-6 rounded-2xl border border-white/5 flex flex-col justify-between h-48">
          <p className="text-emerald-300 text-sm font-bold uppercase tracking-wider">Finalizate Azi</p>
          <div className="mt-auto">
            <h3 className="text-4xl font-black">12</h3>
            <p className="text-xs text-emerald-400 mt-1">+2 față de ieri</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Appointments;
