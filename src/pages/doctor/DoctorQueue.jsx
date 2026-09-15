import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Users,
  Search,
  Filter,
  Clock,
  AlertTriangle,
  CheckCircle2,
  ArrowRight,
  Eye,
  FileText,
  PhoneCall,
  Sparkles,
  ChevronDown,
  RefreshCw,
  SlidersHorizontal,
  Stethoscope
} from 'lucide-react';
import { useDemo } from '../../context/DemoContext';

export const DoctorQueue = () => {
  const {
    patients,
    activePatient,
    switchPatient,
    activeDoctor,
    addToast
  } = useDemo();

  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [triageFilter, setTriageFilter] = useState('All');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      addToast({
        title: 'Queue Refreshed',
        message: 'Live patient intake and kiosk queue synchronized.',
        type: 'info'
      });
    }, 500);
  };

  const handleCallPatient = (patient) => {
    switchPatient(patient.id);
    addToast({
      title: `Calling ${patient.name}`,
      message: `Token ${patient.token || 'T01'} summoned to ${activeDoctor.room}.`,
      type: 'success'
    });
    navigate(`/doctor/patient/${patient.id}/history`);
  };

  const filteredPatients = patients.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.uhid.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.chiefComplaint && p.chiefComplaint.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesStatus =
      statusFilter === 'All' ? true : p.status.toLowerCase() === statusFilter.toLowerCase();

    const matchesTriage =
      triageFilter === 'All' ? true : (p.triageLevel && p.triageLevel.includes(triageFilter));

    return matchesSearch && matchesStatus && matchesTriage;
  });

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-slate-900">OPD Patient Queue</h1>
          <p className="text-xs text-slate-500 mt-1">
            Real-time consultation queue for {activeDoctor.department} ({activeDoctor.room})
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleRefresh}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 text-xs font-bold hover:bg-slate-50 transition-colors shadow-2xs"
          >
            <RefreshCw className={`w-3.5 h-3.5 text-blue-600 ${isRefreshing ? 'animate-spin' : ''}`} />
            <span>Sync Queue</span>
          </button>
          <span className="px-3 py-1.5 rounded-xl bg-blue-50 text-blue-800 text-xs font-bold border border-blue-200">
            {filteredPatients.length} Patients
          </span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by Patient Name, UHID, or Complaint..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:bg-white focus:ring-2 focus:ring-blue-500 transition-all"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-1 bg-slate-50 p-1 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600">
            <span className="px-2 text-slate-400">Status:</span>
            {['All', 'Waiting', 'In Progress', 'Completed'].map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-2.5 py-1 rounded-lg transition-all ${
                  statusFilter === st
                    ? 'bg-white text-blue-700 shadow-2xs font-bold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {st}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-1 bg-slate-50 p-1 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600">
            <span className="px-2 text-slate-400">Triage:</span>
            {['All', 'Level 1', 'Level 2', 'Level 3'].map((tr) => (
              <button
                key={tr}
                onClick={() => setTriageFilter(tr)}
                className={`px-2.5 py-1 rounded-lg transition-all ${
                  triageFilter === tr
                    ? 'bg-white text-blue-700 shadow-2xs font-bold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {tr}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Patient Queue Cards / Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                <th className="py-3.5 px-4">Token & Patient</th>
                <th className="py-3.5 px-4">Triage Priority</th>
                <th className="py-3.5 px-4">Chief Complaint</th>
                <th className="py-3.5 px-4">Intake Status</th>
                <th className="py-3.5 px-4">Wait Time</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {filteredPatients.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-400">
                    No patients match your search and filter criteria.
                  </td>
                </tr>
              ) : (
                filteredPatients.map((p) => {
                  const isCurrent = activePatient?.id === p.id;
                  const isRedFlag = p.triageLevel?.includes('Level 1') || p.triageLevel?.includes('Red');

                  return (
                    <tr
                      key={p.id}
                      onClick={() => switchPatient(p.id)}
                      className={`hover:bg-slate-50/80 transition-colors cursor-pointer ${
                        isCurrent ? 'bg-blue-50/50' : ''
                      }`}
                    >
                      {/* Token & Patient */}
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <span className="font-mono font-black text-sm px-2 py-1 rounded-lg bg-slate-100 text-slate-800 border border-slate-200">
                            {p.token || 'T01'}
                          </span>
                          <div>
                            <span className="font-bold text-slate-900 block">{p.name}</span>
                            <span className="text-[11px] text-slate-500">
                              {p.age}y / {p.gender} • UHID: {p.uhid}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Triage Priority */}
                      <td className="py-4 px-4">
                        <span
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold ${
                            isRedFlag
                              ? 'bg-rose-100 text-rose-800 border border-rose-300'
                              : p.triageLevel?.includes('Level 2')
                              ? 'bg-amber-100 text-amber-800 border border-amber-300'
                              : 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                          }`}
                        >
                          {isRedFlag && <AlertTriangle className="w-3 h-3 text-rose-600" />}
                          <span>{p.triageLevel || 'Routine'}</span>
                        </span>
                      </td>

                      {/* Chief Complaint */}
                      <td className="py-4 px-4 max-w-xs">
                        <span className="font-semibold text-slate-800 block truncate">
                          {p.chiefComplaint}
                        </span>
                        <span className="text-[10px] text-slate-400 block">
                          History Completeness: {p.historyCompleteness || 90}%
                        </span>
                      </td>

                      {/* Intake Status */}
                      <td className="py-4 px-4">
                        <span
                          className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${
                            p.status === 'Waiting'
                              ? 'bg-amber-50 text-amber-700 border border-amber-200'
                              : p.status === 'In Progress'
                              ? 'bg-blue-50 text-blue-700 border border-blue-200'
                              : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          }`}
                        >
                          {p.status}
                        </span>
                      </td>

                      {/* Wait Time */}
                      <td className="py-4 px-4 text-slate-600 font-medium">
                        <div className="flex items-center gap-1 text-[11px]">
                          <Clock className="w-3.5 h-3.5 text-slate-400" />
                          <span>~12 min</span>
                        </div>
                      </td>

                      {/* Actions */}
                      <td className="py-4 px-4 text-right">
                        <div className="flex items-center justify-end gap-2" onClick={(e) => e.stopPropagation()}>
                          <button
                            onClick={() => {
                              switchPatient(p.id);
                              navigate(`/doctor/patient/${p.id}/summary`);
                            }}
                            className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                            title="Quick SOAP Summary"
                          >
                            <FileText className="w-4 h-4 text-slate-600" />
                          </button>

                          <button
                            onClick={() => handleCallPatient(p)}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-sm transition-all"
                          >
                            <span>Call In</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
export default DoctorQueue;
