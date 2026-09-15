import React, { useState } from 'react';
import {
  AlertTriangle,
  AlertCircle,
  CheckCircle2,
  PhoneCall,
  UserCheck,
  Clock,
  Filter,
  Search,
  ShieldAlert,
  ArrowRight,
  Sparkles,
  Stethoscope
} from 'lucide-react';
import { useDemo } from '../../context/DemoContext';

export const DoctorAlerts = () => {
  const {
    alerts,
    activeDoctor,
    acknowledgeAlert,
    resolveAlert,
    addToast
  } = useDemo();

  const [severityFilter, setSeverityFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const handleEscalateToER = (alert) => {
    addToast({
      title: 'ESCALATED TO EMERGENCY DEPT',
      message: `Triage Code Yellow dispatched for ${alert.patientName}. ER team alerted.`,
      type: 'error'
    });
  };

  const handleAssignNurse = (alert) => {
    addToast({
      title: 'Nurse Dispatched',
      message: `Nurse Station assigned to re-check vitals for ${alert.patientName}.`,
      type: 'info'
    });
  };

  const filteredAlerts = alerts.filter((a) => {
    const matchesSev = severityFilter === 'All' ? true : a.severity === severityFilter;
    const matchesStat = statusFilter === 'All' ? true : (a.status || 'New') === statusFilter;
    const matchesSearch =
      a.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (a.alert && a.alert.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (a.message && a.message.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesSev && matchesStat && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-slate-900">Clinical Alerts & Red-Flag Triage</h1>
          <p className="text-xs text-slate-500 mt-1">
            Real-time critical clinical flags detected during patient kiosk intake & history analysis
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 rounded-xl bg-rose-50 text-rose-800 text-xs font-bold border border-rose-200">
            {alerts.filter((a) => a.severity === 'Critical' || a.severity === 'High').length} Urgent Flags
          </span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search alerts by patient name, symptom, or trigger..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:bg-white focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-1 bg-slate-50 p-1 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600">
            <span className="px-2 text-slate-400">Severity:</span>
            {['All', 'Critical', 'High', 'Moderate'].map((sev) => (
              <button
                key={sev}
                onClick={() => setSeverityFilter(sev)}
                className={`px-2.5 py-1 rounded-lg transition-all ${
                  severityFilter === sev
                    ? 'bg-white text-rose-700 shadow-2xs font-bold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {sev}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-1 bg-slate-50 p-1 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600">
            <span className="px-2 text-slate-400">Status:</span>
            {['All', 'New', 'Active', 'Resolved'].map((st) => (
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
        </div>
      </div>

      {/* Alerts Grid */}
      <div className="space-y-3">
        {filteredAlerts.length === 0 ? (
          <div className="p-12 text-center text-slate-400 bg-white rounded-3xl border border-slate-200">
            No active alerts matching your criteria.
          </div>
        ) : (
          filteredAlerts.map((a) => {
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
                          : 'bg-amber-500 text-white shadow-amber-500/20'
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
                            isCritical
                              ? 'bg-rose-200 text-rose-900'
                              : 'bg-amber-200 text-amber-900'
                          }`}
                        >
                          {a.severity}
                        </span>
                        <span className="text-[10px] text-slate-400">Trigger: {a.category}</span>
                      </div>

                      <p className="text-xs font-semibold text-slate-800 leading-relaxed">
                        {a.alert || a.message}
                      </p>

                      <div className="flex items-center gap-3 text-[11px] text-slate-500 pt-1">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" /> Reported: {a.timestamp || 'Just now'}
                        </span>
                        <span>•</span>
                        <span>Location: {a.location || 'Kiosk 01 (Cardiology Waiting Area)'}</span>
                      </div>
                    </div>
                  </div>

                  {/* Action Controls */}
                  <div className="flex flex-wrap items-center gap-2 shrink-0">
                    {!isResolved && (
                      <>
                        <button
                          onClick={() => handleEscalateToER(a)}
                          className="px-3 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow-sm transition-colors flex items-center gap-1.5"
                        >
                          <PhoneCall className="w-3.5 h-3.5" />
                          <span>Escalate to ER</span>
                        </button>

                        <button
                          onClick={() => handleAssignNurse(a)}
                          className="px-3 py-1.5 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs transition-colors flex items-center gap-1.5"
                        >
                          <UserCheck className="w-3.5 h-3.5 text-blue-600" />
                          <span>Send Nurse</span>
                        </button>

                        <button
                          onClick={() => {
                            acknowledgeAlert(a.id);
                            addToast({
                              title: 'Alert Acknowledged',
                              message: `Dr. ${activeDoctor.name} acknowledged alert.`,
                              type: 'info'
                            });
                          }}
                          className="px-3 py-1.5 rounded-xl bg-blue-50 text-blue-800 font-bold text-xs border border-blue-200 hover:bg-blue-100 transition-colors"
                        >
                          Acknowledge
                        </button>

                        <button
                          onClick={() => {
                            resolveAlert(a.id);
                            addToast({
                              title: 'Alert Resolved',
                              message: 'Marked as managed by physician.',
                              type: 'success'
                            });
                          }}
                          className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-sm transition-colors"
                        >
                          Resolve
                        </button>
                      </>
                    )}

                    {isResolved && (
                      <span className="text-xs font-bold text-emerald-700 flex items-center gap-1">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Resolved by Dr. {activeDoctor.name}</span>
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
export default DoctorAlerts;
