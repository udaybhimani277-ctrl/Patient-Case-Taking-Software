import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Building2,
  Users,
  Tv,
  AlertTriangle,
  FileSearch,
  BarChart3,
  TrendingDown,
  Share2,
  ScrollText,
  Settings,
  CheckCircle2,
  Clock,
  Zap,
  ArrowRight,
  ShieldCheck,
  Activity,
  HeartPulse
} from 'lucide-react';
import { useDemo } from '../../context/DemoContext';

export const AdminDashboard = () => {
  const {
    kiosks,
    departments,
    patients,
    alerts,
    documents,
    adminSettings
  } = useDemo();

  const navigate = useNavigate();

  const onlineKiosks = kiosks.filter((k) => k.status === 'Online').length;
  const criticalAlerts = alerts.filter((a) => a.severity === 'Critical' || a.severity === 'High').length;

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-slate-950 via-indigo-950 to-slate-950 rounded-3xl p-6 sm:p-8 text-white shadow-xl shadow-slate-950/25 relative overflow-hidden border border-slate-800">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl -mr-24 -mt-24 pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-semibold backdrop-blur-md border border-indigo-500/30">
              <Building2 className="w-3.5 h-3.5" />
              <span>{adminSettings.hospitalName} • Hospital Command Center</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              MediKiosk Fleet & OPD Operational Pulse
            </h1>
            <p className="text-slate-300 text-sm max-w-xl">
              Real-time monitoring across 6 intake kiosks, 5 clinical departments, ABDM health information exchange, and patient triage pipelines.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => navigate('/admin/bottlenecks')}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs shadow-lg shadow-indigo-600/30 transition-all"
            >
              <TrendingDown className="w-4 h-4" />
              <span>View Bottlenecks (Before vs After)</span>
            </button>
          </div>
        </div>
      </div>

      {/* 4 Core Vital Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">OPD Volume Today</span>
            <span className="text-3xl font-black text-slate-900 mt-1 block">142</span>
            <span className="text-[11px] text-emerald-600 font-bold mt-1 flex items-center gap-1">
              <Zap className="w-3 h-3" /> +38% Throughput increase
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <Users className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Kiosk Fleet Health</span>
            <span className="text-3xl font-black text-slate-900 mt-1 block">
              {onlineKiosks} / {kiosks.length}
            </span>
            <span className="text-[11px] text-emerald-600 font-bold mt-1 flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" /> 100% Online & Operational
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
            <Tv className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Avg Intake Duration</span>
            <span className="text-3xl font-black text-slate-900 mt-1 block">4.2 min</span>
            <span className="text-[11px] text-purple-600 font-bold mt-1 flex items-center gap-1">
              <Clock className="w-3 h-3" /> Down from 18.5 min manual
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
            <Clock className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Priority Triage Alerts</span>
            <span className="text-3xl font-black text-rose-600 mt-1 block">{criticalAlerts}</span>
            <span className="text-[11px] text-rose-600 font-bold mt-1 flex items-center gap-1">
              <AlertTriangle className="w-3 h-3" /> Red-flags routed to ER
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
            <AlertTriangle className="w-6 h-6" />
          </div>
        </div>

      </div>

      {/* Two Column Layout: Department Status & Kiosk Fleet Pulse */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Department OPD Queues (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h2 className="text-base font-bold text-slate-900">Department Queues & Capacity</h2>
              <p className="text-xs text-slate-500">Live consult room load across hospital wings</p>
            </div>
            <button
              onClick={() => navigate('/admin/departments')}
              className="text-xs font-bold text-indigo-600 hover:text-indigo-700"
            >
              Manage Departments →
            </button>
          </div>

          <div className="space-y-3">
            {departments.map((dept) => (
              <div
                key={dept.id}
                className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-4"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-slate-900">{dept.name}</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-200 text-slate-700">
                      Floor {dept.floor}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Lead: <span className="font-semibold text-slate-700">{dept.headDoctor}</span> • {dept.consultants} Active Consultants
                  </p>
                </div>

                <div className="flex items-center gap-4 text-right shrink-0">
                  <div>
                    <span className="font-black text-sm text-slate-900 block">{dept.currentQueue} Patients</span>
                    <span className="text-[10px] text-slate-400">~{dept.avgWaitMin} min wait</span>
                  </div>
                  <div className="w-2 h-2 rounded-full bg-emerald-500" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Active Kiosk Fleet (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h2 className="text-base font-bold text-slate-900">Kiosk Hardware Fleet</h2>
              <p className="text-xs text-slate-500">Intake stations in waiting lounges</p>
            </div>
            <button
              onClick={() => navigate('/admin/kiosks')}
              className="text-xs font-bold text-indigo-600 hover:text-indigo-700"
            >
              Fleet Manager →
            </button>
          </div>

          <div className="space-y-2.5">
            {kiosks.map((k) => (
              <div
                key={k.id}
                className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-700 flex items-center justify-center font-mono font-bold text-xs">
                    {k.id.replace('KIOSK-', 'K')}
                  </div>
                  <div>
                    <span className="font-bold text-xs text-slate-900 block">{k.name}</span>
                    <span className="text-[10px] text-slate-500">{k.location}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="font-mono text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold">
                    {k.status}
                  </span>
                  <span className="text-[10px] text-slate-400">{k.dailyIntakes} intakes</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Quick Navigation Admin Shortcuts */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <button
          onClick={() => navigate('/admin/patients')}
          className="p-4 rounded-2xl bg-white border border-slate-200 hover:border-indigo-300 hover:bg-indigo-50/20 text-left transition-all shadow-2xs group"
        >
          <Users className="w-5 h-5 text-indigo-600 mb-2 group-hover:scale-110 transition-transform" />
          <span className="font-bold text-xs text-slate-900 block">Patient Directory</span>
          <span className="text-[10px] text-slate-400">Search UHID & Records</span>
        </button>

        <button
          onClick={() => navigate('/admin/doctors')}
          className="p-4 rounded-2xl bg-white border border-slate-200 hover:border-indigo-300 hover:bg-indigo-50/20 text-left transition-all shadow-2xs group"
        >
          <Activity className="w-5 h-5 text-blue-600 mb-2 group-hover:scale-110 transition-transform" />
          <span className="font-bold text-xs text-slate-900 block">Doctor Roster</span>
          <span className="text-[10px] text-slate-400">Manage Rooms & Shifts</span>
        </button>

        <button
          onClick={() => navigate('/admin/integration')}
          className="p-4 rounded-2xl bg-white border border-slate-200 hover:border-indigo-300 hover:bg-indigo-50/20 text-left transition-all shadow-2xs group"
        >
          <Share2 className="w-5 h-5 text-emerald-600 mb-2 group-hover:scale-110 transition-transform" />
          <span className="font-bold text-xs text-slate-900 block">ABDM & HIS Sync</span>
          <span className="text-[10px] text-slate-400">FHIR Gateway Status</span>
        </button>

        <button
          onClick={() => navigate('/admin/audit')}
          className="p-4 rounded-2xl bg-white border border-slate-200 hover:border-indigo-300 hover:bg-indigo-50/20 text-left transition-all shadow-2xs group"
        >
          <ScrollText className="w-5 h-5 text-purple-600 mb-2 group-hover:scale-110 transition-transform" />
          <span className="font-bold text-xs text-slate-900 block">DPDP Audit Logs</span>
          <span className="text-[10px] text-slate-400">Regulatory Compliance</span>
        </button>
      </div>
    </div>
  );
};
export default AdminDashboard;
