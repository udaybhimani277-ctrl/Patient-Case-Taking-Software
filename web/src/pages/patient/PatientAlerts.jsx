import React from 'react';
import {
  AlertTriangle,
  ShieldAlert,
  Clock,
  CheckCircle2,
  PhoneCall,
  Activity,
  HeartPulse,
  Hospital
} from 'lucide-react';
import { useDemo } from '../../context/DemoContext';

export const PatientAlerts = () => {
  const { activePatient, alerts, notifyTriage } = useDemo();

  const patientAlerts = alerts?.filter(a => a.patientId === activePatient?.id || a.token === activePatient?.token) || [];

  return (
    <div className="space-y-6 sm:space-y-8 max-w-4xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-rose-50 text-rose-700 border border-rose-200">
              Emergency Clinical Guardrail
            </span>
            <span className="text-xs text-slate-500">Real-Time Triage Monitoring</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
            Priority Alerts & Triage Status
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            When urgent clinical red flags (e.g., severe chest tightness with breathlessness) are recorded, an immediate escalation is dispatched to nursing staff.
          </p>
        </div>

        <button
          type="button"
          onClick={() => notifyTriage()}
          className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs flex items-center gap-2 shadow-sm shadow-rose-600/30 transition-all cursor-pointer"
        >
          <PhoneCall className="w-4 h-4" />
          <span>Call Emergency Assistance</span>
        </button>
      </div>

      {/* Priority Triage Notice Banner */}
      <div className="bg-rose-50 rounded-3xl p-6 border-2 border-rose-300 shadow-xs space-y-3">
        <div className="flex items-start gap-3.5">
          <div className="w-11 h-11 rounded-2xl bg-rose-600 text-white flex items-center justify-center shrink-0 shadow-md shadow-rose-600/30">
            <AlertTriangle className="w-6 h-6 stroke-[2.2]" />
          </div>
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="text-xs font-black bg-rose-600 text-white px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                Priority Triage Escalated
              </span>
              <span className="text-xs font-mono font-bold text-rose-900">
                Staff Notified
              </span>
            </div>
            <h3 className="text-base font-black text-rose-950">
              "A healthcare staff member has been notified for immediate bedside review."
            </h3>
            <p className="text-xs text-rose-900 leading-relaxed">
              Your reported symptoms (retrosternal chest pressure radiating to left shoulder) meet the hospital's high-priority triage threshold. <strong>This is not an automated diagnosis</strong>, but a safety protocol to ensure an immediate ECG and doctor evaluation.
            </p>
          </div>
        </div>
      </div>

      {/* Active Alerts List */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
          <Activity className="w-4 h-4 text-rose-600" />
          <span>Recorded Clinical Flags for Token: {activePatient?.token || "A103"}</span>
        </h3>

        <div className="space-y-3">
          {patientAlerts.map((alt) => (
            <div
              key={alt.id}
              className="bg-white rounded-3xl p-5 border border-slate-200 shadow-2xs space-y-3"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs font-bold ${
                    alt.severity === 'High' ? 'bg-rose-100 text-rose-800' : 'bg-amber-100 text-amber-800'
                  }`}>
                    !
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">{alt.title}</h4>
                    <p className="text-[11px] text-slate-500">{alt.date} • {alt.type}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className={`text-[10px] px-2.5 py-1 rounded-full font-bold ${
                    alt.severity === 'High' ? 'bg-rose-50 text-rose-800 border border-rose-200' : 'bg-amber-50 text-amber-800 border border-amber-200'
                  }`}>
                    Priority: {alt.severity}
                  </span>
                  <span className="text-[10px] px-2.5 py-1 rounded-full font-bold bg-blue-50 text-blue-800 border border-blue-200">
                    Status: {alt.status}
                  </span>
                </div>
              </div>

              <p className="text-xs text-slate-700 bg-slate-50 p-3 rounded-2xl border border-slate-100 leading-relaxed">
                {alt.description}
              </p>

              <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
                <span>Patient ID: {alt.patientId || activePatient?.id}</span>
                <span className="font-semibold text-slate-700">Dispatched to OPD Nurse Station</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Safety Notice */}
      <div className="p-4 rounded-2xl bg-slate-100 border border-slate-200 text-slate-600 text-xs flex items-start gap-2">
        <Hospital className="w-4 h-4 shrink-0 text-slate-500 mt-0.5" />
        <p>
          Red-flag alerts are strictly operational triggers to prioritize acute complaints in crowded waiting queues. They do not constitute a formal cardiac or systemic diagnosis.
        </p>
      </div>

    </div>
  );
};

export default PatientAlerts;
