import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Users,
  Clock,
  AlertTriangle,
  CheckCircle2,
  TrendingUp,
  Stethoscope,
  ArrowRight,
  FileCheck2,
  Sparkles,
  Search,
  Bell,
  Activity,
  HeartPulse,
  Pill,
  ChevronRight,
  Zap,
  Calendar
} from 'lucide-react';
import { useDemo } from '../../context/DemoContext';

export const DoctorDashboard = () => {
  const {
    activeDoctor,
    patients,
    activePatient,
    switchPatient,
    alerts,
    tokenNumber,
    addToast
  } = useDemo();

  const navigate = useNavigate();

  const waitingPatients = patients.filter((p) => p.status === 'Waiting' || p.status === 'Ready');
  const inProgressPatients = patients.filter((p) => p.status === 'In Progress');
  const completedPatients = patients.filter((p) => p.status === 'Completed');
  const urgentAlerts = alerts.filter((a) => a.severity === 'Critical' || a.severity === 'High');

  const handleCallPatient = (patient) => {
    switchPatient(patient.id);
    addToast({
      title: `Patient Called to ${activeDoctor.room}`,
      message: `${patient.name} (Token ${patient.token || tokenNumber}) has been notified.`,
      type: 'info'
    });
    navigate(`/doctor/patient/${patient.id}/history`);
  };

  return (
    <div className="space-y-6">
      {/* Top Welcome Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl shadow-slate-950/20 relative overflow-hidden border border-slate-800">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl -mr-24 -mt-24 pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 text-xs font-semibold backdrop-blur-md border border-cyan-500/30">
              <Stethoscope className="w-3.5 h-3.5" />
              <span>{activeDoctor.department} • {activeDoctor.room}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              Good morning, {activeDoctor.name}
            </h1>
            <p className="text-slate-300 text-sm max-w-xl">
              MediKiosk pre-intake engine has collected and verified clinical histories, OCR scanned records, and highlighted 1 priority triage alert.
            </p>
          </div>

          {/* Time Saved Hero Metric */}
          <div className="bg-gradient-to-br from-cyan-900/60 to-blue-900/60 p-4 sm:p-5 rounded-2xl border border-cyan-700/50 backdrop-blur-md flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-cyan-400/20 text-cyan-300 flex items-center justify-center">
              <Zap className="w-6 h-6 stroke-[2.5]" />
            </div>
            <div>
              <span className="text-[11px] uppercase font-bold tracking-wider text-cyan-300 block">Pre-Intake Time Saved</span>
              <div className="flex items-baseline gap-1.5">
                <span className="text-2xl sm:text-3xl font-black text-white">6.5</span>
                <span className="text-xs font-bold text-cyan-200">min / patient</span>
              </div>
              <span className="text-[10px] text-slate-400 block">~48 min saved today across 8 OPD visits</span>
            </div>
          </div>
        </div>
      </div>

      {/* OPD Queue Status Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Waiting In OPD</span>
            <span className="text-3xl font-black text-slate-900 mt-1 block">{waitingPatients.length}</span>
            <span className="text-[11px] text-blue-600 font-semibold mt-1 flex items-center gap-1">
              <Clock className="w-3 h-3" /> Average wait: 12 min
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <Users className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">In Intake / Active</span>
            <span className="text-3xl font-black text-slate-900 mt-1 block">{inProgressPatients.length}</span>
            <span className="text-[11px] text-emerald-600 font-semibold mt-1 flex items-center gap-1">
              <Activity className="w-3 h-3" /> Kiosks actively capturing
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center">
            <Activity className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Priority Alerts</span>
            <span className="text-3xl font-black text-rose-600 mt-1 block">{urgentAlerts.length}</span>
            <span className="text-[11px] text-rose-600 font-semibold mt-1 flex items-center gap-1">
              <AlertTriangle className="w-3 h-3" /> Red flag detected
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
            <AlertTriangle className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Completed Today</span>
            <span className="text-3xl font-black text-slate-900 mt-1 block">{completedPatients.length}</span>
            <span className="text-[11px] text-slate-500 font-semibold mt-1 flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3 text-emerald-500" /> Consultations finalized
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <CheckCircle2 className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Next Up Patient Hero Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-blue-200 shadow-sm relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-600 to-cyan-600 text-white flex items-center justify-center font-black text-2xl shrink-0 shadow-md shadow-blue-500/25">
              {activePatient?.name?.charAt(0) || 'R'}
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 font-mono font-bold text-xs">
                  TOKEN {activePatient?.token || tokenNumber}
                </span>
                <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 text-xs font-bold">
                  {activePatient?.triageLevel || 'Level 2 - Priority'}
                </span>
                <span className="text-xs text-slate-400">Waiting for 8 min</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                {activePatient?.name}
              </h2>
              <p className="text-xs text-slate-500">
                {activePatient?.age} Yrs • {activePatient?.gender} • UHID: <span className="font-mono text-slate-700">{activePatient?.uhid}</span> • ABHA: <span className="font-mono text-slate-700">{activePatient?.abhaAddress}</span>
              </p>
              <div className="pt-2 flex flex-wrap items-center gap-2 text-xs">
                <span className="font-semibold text-slate-700">Chief Complaint:</span>
                <span className="px-2.5 py-1 rounded-lg bg-rose-50 text-rose-700 font-bold border border-rose-200">
                  {activePatient?.chiefComplaint}
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => navigate(`/doctor/patient/${activePatient?.id}/summary`)}
              className="px-4 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold transition-colors"
            >
              View SOAP Summary
            </button>
            <button
              onClick={() => handleCallPatient(activePatient)}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md shadow-blue-500/25 transition-all"
            >
              <span>Call Into {activeDoctor.room}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Two Column Layout: Active Queue & Quick Clinical Modules */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Cols: Live Patient Queue */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-900">Today's Patient Queue</h3>
              <p className="text-xs text-slate-500">Sorted by triage urgency and intake completion</p>
            </div>
            <button
              onClick={() => navigate('/doctor/queue')}
              className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1"
            >
              <span>View All ({patients.length})</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-2.5">
            {patients.slice(0, 5).map((p) => (
              <div
                key={p.id}
                onClick={() => switchPatient(p.id)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                  activePatient?.id === p.id
                    ? 'bg-blue-50/70 border-blue-300 ring-2 ring-blue-500/20'
                    : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center font-mono font-bold text-xs text-slate-800 shrink-0">
                    {p.token || 'T01'}
                  </span>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-slate-900">{p.name}</span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        p.status === 'Waiting' ? 'bg-amber-100 text-amber-800' :
                        p.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                        'bg-emerald-100 text-emerald-800'
                      }`}>
                        {p.status}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {p.age}y/{p.gender} • {p.chiefComplaint}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCallPatient(p);
                    }}
                    className="px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition-colors"
                  >
                    Open Chart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Col: Priority Alerts & Quick Actions */}
        <div className="space-y-6">
          
          {/* Priority Alerts Card */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-rose-600" />
                <span>Urgent Clinical Alerts</span>
              </h3>
              <span className="px-2 py-0.5 bg-rose-100 text-rose-800 rounded-full font-bold text-xs">
                {urgentAlerts.length} Active
              </span>
            </div>

            <div className="space-y-2.5">
              {urgentAlerts.map((alert) => (
                <div
                  key={alert.id}
                  className="p-3.5 rounded-2xl bg-rose-50/70 border border-rose-200 space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-rose-900">{alert.patientName}</span>
                    <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-rose-200 text-rose-800">
                      {alert.severity}
                    </span>
                  </div>
                  <p className="text-xs text-rose-800 leading-relaxed font-medium">
                    {alert.alert || alert.message}
                  </p>
                  <div className="flex items-center justify-between pt-1 text-[11px] text-rose-700">
                    <span>Trigger: {alert.category}</span>
                    <button
                      onClick={() => navigate('/doctor/alerts')}
                      className="font-bold underline hover:text-rose-900"
                    >
                      Acknowledge
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Doctor Modules */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-3">
            <h3 className="text-base font-bold text-slate-900">Clinical Shortcuts</h3>
            <div className="space-y-1.5">
              <button
                onClick={() => navigate(`/doctor/patient/${activePatient?.id}/history`)}
                className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 text-xs font-bold text-slate-700 transition-colors group"
              >
                <span className="flex items-center gap-2 group-hover:text-blue-600">
                  <FileCheck2 className="w-4 h-4 text-blue-500" />
                  <span>Review Clinical History</span>
                </span>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600" />
              </button>

              <button
                onClick={() => navigate(`/doctor/patient/${activePatient?.id}/medications`)}
                className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 text-xs font-bold text-slate-700 transition-colors group"
              >
                <span className="flex items-center gap-2 group-hover:text-blue-600">
                  <Pill className="w-4 h-4 text-amber-500" />
                  <span>Medication Reconciliation</span>
                </span>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600" />
              </button>

              <button
                onClick={() => navigate(`/doctor/patient/${activePatient?.id}/consultation`)}
                className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 text-xs font-bold text-slate-700 transition-colors group"
              >
                <span className="flex items-center gap-2 group-hover:text-blue-600">
                  <Stethoscope className="w-4 h-4 text-emerald-500" />
                  <span>Write Prescription & EHR</span>
                </span>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
export default DoctorDashboard;
