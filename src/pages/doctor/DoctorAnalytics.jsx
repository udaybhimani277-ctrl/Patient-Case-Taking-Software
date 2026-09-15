import React from 'react';
import {
  BarChart3,
  TrendingUp,
  Clock,
  Zap,
  CheckCircle2,
  Users,
  FileCheck2,
  Activity,
  Heart,
  Sparkles,
  ArrowUpRight,
  ShieldCheck
} from 'lucide-react';
import { useDemo } from '../../context/DemoContext';

export const DoctorAnalytics = () => {
  const { activeDoctor } = useDemo();

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl shadow-slate-950/20 relative overflow-hidden border border-slate-800">
        <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 text-xs font-semibold backdrop-blur-md border border-cyan-500/30">
              <BarChart3 className="w-3.5 h-3.5" />
              <span>Consultant Efficiency Metrics</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              Clinical Intake & Time Savings Analytics
            </h1>
            <p className="text-slate-300 text-sm max-w-xl">
              Real-time measurement of preparation time saved, OCR accuracy, and OPD patient throughput for Dr. {activeDoctor.name}.
            </p>
          </div>

          <div className="bg-gradient-to-br from-cyan-900/60 to-blue-900/60 p-5 rounded-2xl border border-cyan-700/50 backdrop-blur-md text-right">
            <span className="text-[10px] uppercase font-bold text-cyan-300 block">Total Prep Time Saved Today</span>
            <span className="font-mono text-3xl font-black text-white block mt-0.5">52 min</span>
            <span className="text-xs text-cyan-200">Across 8 OPD consultations</span>
          </div>
        </div>
      </div>

      {/* 4 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Avg Prep Time Saved</span>
            <div className="w-9 h-9 rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center">
              <Zap className="w-5 h-5" />
            </div>
          </div>
          <span className="text-3xl font-black text-slate-900 mt-2 block">6.5 min</span>
          <span className="text-[11px] text-emerald-600 font-bold flex items-center gap-1 mt-1">
            <ArrowUpRight className="w-3 h-3" /> +1.2 min vs manual clerk intake
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Intake Completeness</span>
            <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <FileCheck2 className="w-5 h-5" />
            </div>
          </div>
          <span className="text-3xl font-black text-slate-900 mt-2 block">94.2%</span>
          <span className="text-[11px] text-blue-600 font-semibold mt-1 block">
            SOCRATES pain attributes fully captured
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">OCR Entity Precision</span>
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5" />
            </div>
          </div>
          <span className="text-3xl font-black text-slate-900 mt-2 block">96.8%</span>
          <span className="text-[11px] text-emerald-600 font-semibold mt-1 block">
            Verified across 48 prescriptions
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">OPD Duration / Patient</span>
            <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <Clock className="w-5 h-5" />
            </div>
          </div>
          <span className="text-3xl font-black text-slate-900 mt-2 block">8.2 min</span>
          <span className="text-[11px] text-slate-500 font-semibold mt-1 block">
            Down from 14.8 min baseline
          </span>
        </div>
      </div>

      {/* Detailed Analytics Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Time Savings Source */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h2 className="text-sm font-bold text-slate-900">Where is Time Saved? (Per Patient Breakdown)</h2>
            <span className="text-xs font-bold text-cyan-600">6.5 min total</span>
          </div>

          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between text-xs font-bold text-slate-700 mb-1">
                <span>1. Socrates History & Complaint Elicitation</span>
                <span>3.2 min (49%)</span>
              </div>
              <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-cyan-500 rounded-full" style={{ width: '49%' }} />
              </div>
              <span className="text-[10px] text-slate-400">Captured before entering consultation room</span>
            </div>

            <div>
              <div className="flex items-center justify-between text-xs font-bold text-slate-700 mb-1">
                <span>2. Medical Records OCR & Prescription Sorting</span>
                <span>2.1 min (32%)</span>
              </div>
              <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-blue-600 rounded-full" style={{ width: '32%' }} />
              </div>
              <span className="text-[10px] text-slate-400">Past prescriptions digitized and structured</span>
            </div>

            <div>
              <div className="flex items-center justify-between text-xs font-bold text-slate-700 mb-1">
                <span>3. Demographic Verification & Vital Sign Logging</span>
                <span>1.2 min (19%)</span>
              </div>
              <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-indigo-500 rounded-full" style={{ width: '19%' }} />
              </div>
              <span className="text-[10px] text-slate-400">Kiosk auto-populates BP, HR, BMI</span>
            </div>
          </div>
        </div>

        {/* Clinical Complaint Distribution */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h2 className="text-sm font-bold text-slate-900">Chief Complaints Analyzed by MediKiosk</h2>
            <span className="text-xs text-slate-400">Cardiology OPD</span>
          </div>

          <div className="space-y-3 text-xs">
            <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
              <span className="font-bold text-slate-800">Retrosternal Chest Discomfort</span>
              <span className="font-mono font-bold text-rose-600">42% (34 cases)</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
              <span className="font-bold text-slate-800">Exertional Breathlessness (Dyspnea)</span>
              <span className="font-mono font-bold text-blue-600">28% (23 cases)</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
              <span className="font-bold text-slate-800">Uncontrolled Hypertension Follow-up</span>
              <span className="font-mono font-bold text-amber-600">18% (15 cases)</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
              <span className="font-bold text-slate-800">Palpitations & Syncope Evaluation</span>
              <span className="font-mono font-bold text-purple-600">12% (10 cases)</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
export default DoctorAnalytics;
