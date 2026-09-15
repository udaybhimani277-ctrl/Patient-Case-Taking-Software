import React, { useState } from 'react';
import {
  AlertTriangle,
  AlertCircle,
  CheckCircle2,
  PhoneCall,
  Clock,
  Filter,
  Search,
  ShieldAlert,
  Building2,
  Stethoscope
} from 'lucide-react';
import { useDemo } from '../../context/DemoContext';

export const AdminAlerts = () => {
  const { alerts, acknowledgeAlert, resolveAlert, addToast } = useDemo();

  const [severityFilter, setSeverityFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const handleEmergencyDispatch = (alert) => {
    addToast({
      title: 'HOSPITAL RAPID RESPONSE DISPATCHED',
      message: `Emergency Medical Officer dispatched to ${alert.location || 'OPD Waiting Lounge'}.`,
      type: 'error'
    });
  };

  const filteredAlerts = alerts.filter((a) => {
    const matchesSev = severityFilter === 'All' ? true : a.severity === severityFilter;
    const matchesSearch =
      a.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (a.alert && a.alert.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesSev && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-slate-900">Hospital-Wide Priority Triage Alerts</h1>
          <p className="text-xs text-slate-500 mt-1">
            Centralized monitoring of all emergency and clinical escalation flags triggered at kiosk stations
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 rounded-xl bg-rose-100 text-rose-800 text-xs font-bold border border-rose-300">
            {alerts.filter((a) => a.severity === 'Critical' || a.severity === 'High').length} Urgent Escalations
          </span>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search alerts by patient, department, or clinical trigger..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:bg-white focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="flex items-center gap-1 bg-slate-50 p-1 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600">
          <span className="px-2 text-slate-400">Severity:</span>
          {['All', 'Critical', 'High', 'Moderate'].map((s) => (
            <button
              key={s}
              onClick={() => setSeverityFilter(s)}
              className={`px-2.5 py-1 rounded-lg transition-all ${
                severityFilter === s
                  ? 'bg-white text-rose-700 shadow-2xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Alerts Feed */}
      <div className="space-y-3">
        {filteredAlerts.map((a) => {
          const isCritical = a.severity === 'Critical' || a.severity === 'High';
          const isResolved = a.status === 'Resolved';

          return (
            <div
              key={a.id}
              className={`p-5 rounded-3xl border transition-all ${
                isResolved
                  ? 'bg-slate-50 border-slate-200 opacity-60'
                  : isCritical
                  ? 'bg-rose-50/70 border-rose-200 shadow-sm'
                  : 'bg-amber-50/70 border-amber-200 shadow-sm'
              }`}
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-start gap-3.5">
                  <div
                    className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 shadow-sm ${
                      isResolved
                        ? 'bg-slate-200 text-slate-600'
                        : isCritical
                        ? 'bg-rose-600 text-white shadow-rose-600/20'
                        : 'bg-amber-500 text-white'
                    }`}
                  >
                    <AlertTriangle className="w-5 h-5" />
                  </div>

                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-bold text-sm text-slate-900">{a.patientName}</span>
                      <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded bg-slate-200/80 text-slate-700">
                        UHID: {a.uhid || 'CH-2026-8941'}
                      </span>
                      <span
                        className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full ${
                          isCritical ? 'bg-rose-200 text-rose-900' : 'bg-amber-200 text-amber-900'
                        }`}
                      >
                        {a.severity}
                      </span>
                    </div>

                    <p className="text-xs font-semibold text-slate-800 leading-relaxed">
                      {a.alert || a.message}
                    </p>

                    <div className="flex items-center gap-3 text-[11px] text-slate-500 pt-1">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" /> Triggered: {a.timestamp || 'Today'}
                      </span>
                      <span>•</span>
                      <span>Location: {a.location || 'Civil Hospital Main OPD'}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {!isResolved && (
                    <>
                      <button
                        onClick={() => handleEmergencyDispatch(a)}
                        className="px-3.5 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow-sm flex items-center gap-1.5"
                      >
                        <PhoneCall className="w-3.5 h-3.5" />
                        <span>Dispatch Rapid Team</span>
                      </button>

                      <button
                        onClick={() => {
                          resolveAlert(a.id);
                          addToast({
                            title: 'Alert Resolved',
                            message: `Marked resolved in hospital command console.`,
                            type: 'success'
                          });
                        }}
                        className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-sm"
                      >
                        Resolve Alert
                      </button>
                    </>
                  )}

                  {isResolved && (
                    <span className="text-xs font-bold text-emerald-700 flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Resolved</span>
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default AdminAlerts;
