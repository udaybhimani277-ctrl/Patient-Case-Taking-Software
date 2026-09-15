import React, { useState } from 'react';
import {
  TrendingDown,
  TrendingUp,
  Clock,
  Zap,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  ArrowRight,
  Sparkles,
  Sliders,
  DollarSign,
  Users,
  ShieldCheck,
  Stethoscope
} from 'lucide-react';
import { useDemo } from '../../context/DemoContext';

export const AdminBottlenecks = () => {
  const [patientVolume, setPatientVolume] = useState(250);
  const [activeTab, setActiveTab] = useState('comparison'); // 'comparison' | 'roi'

  // Calculated metrics based on patient volume
  const hoursSavedDaily = ((patientVolume * 6.5) / 60).toFixed(1);
  const additionalPatientsCapacity = Math.round(patientVolume * 0.45);
  const paperPrescriptionsDigitized = Math.round(patientVolume * 1.3);

  const bottlenecks = [
    {
      title: 'OPD Intake & Triage Wait Time',
      before: '28.5 Minutes',
      after: '4.2 Minutes',
      reduction: '85% Reduction',
      beforeDesc: 'Long physical queues at registration clerk counters. Manual entry of patient demographics and symptoms.',
      afterDesc: 'Self-service voice/touch kiosk with ABHA instant verification and automated SOCRATES questionnaire.'
    },
    {
      title: 'Doctor History Elicitation & Reading',
      before: '7.5 Minutes',
      after: '1.0 Minute',
      reduction: '86% Reduction',
      beforeDesc: 'Doctor spends 7+ minutes asking basic history questions (onset, radiation, triggers) and flipping paper files.',
      afterDesc: 'Doctor reviews pre-compiled, structured SOAP summary with confirmed/rejected highlights in 60 seconds.'
    },
    {
      title: 'Emergency Red-Flag Detection',
      before: 'Delayed (30-60 mins)',
      after: 'Instant (< 2 mins)',
      reduction: '96% Faster Escalation',
      beforeDesc: 'Critical chest pain or hypertensive emergencies discovered only after patient reaches doctor desk.',
      afterDesc: 'Automated triage flags critical symptoms instantly during kiosk intake and dispatches emergency alerts.'
    },
    {
      title: 'Paper Prescription Digitization',
      before: '0% (Lost in paper folders)',
      after: '96.8% (OCR Extracted)',
      reduction: 'Full EHR Integration',
      beforeDesc: 'Patients bring wrinkled, disorganized slips. Doctors have no time to review past dosages.',
      afterDesc: 'High-speed camera scan extracts drug names, dosages, and flags drug discrepancies automatically.'
    },
    {
      title: 'OPD Consultation Capacity per Shift',
      before: '18 Patients / Shift',
      after: '34 Patients / Shift',
      reduction: '+88% Capacity Surge',
      beforeDesc: 'Physicians overwhelmed by repetitive clerical questioning and slow paper documentation.',
      afterDesc: 'Focus shifted entirely to clinical physical examination, patient empathy, and decision-making.'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-purple-900 via-indigo-950 to-purple-950 rounded-3xl p-6 sm:p-8 text-white shadow-xl shadow-purple-950/25 relative overflow-hidden border border-purple-800">
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl -mr-24 -mt-24 pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 text-xs font-semibold backdrop-blur-md border border-purple-500/30">
              <TrendingDown className="w-3.5 h-3.5" />
              <span>Civil Hospital Transformation Matrix</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              OPD Bottlenecks: Before vs After MediKiosk
            </h1>
            <p className="text-purple-100 text-sm max-w-xl">
              Concrete clinical and administrative impact metrics demonstrating how AI-driven pre-consultation intake eliminates hospital waiting congestion.
            </p>
          </div>

          <div className="bg-gradient-to-br from-purple-900/60 to-indigo-900/60 p-4 sm:p-5 rounded-2xl border border-purple-700/50 backdrop-blur-md text-right">
            <span className="text-[10px] uppercase font-bold text-purple-300 block">Physician Preparation Gain</span>
            <span className="font-mono text-3xl font-black text-white block mt-0.5">86%</span>
            <span className="text-xs text-purple-200">Faster clinical intake review</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-3 border-b border-slate-200 pb-2">
        <button
          onClick={() => setActiveTab('comparison')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'comparison'
              ? 'bg-purple-600 text-white shadow-sm'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          1. 5 Core Bottleneck Comparisons
        </button>
        <button
          onClick={() => setActiveTab('roi')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'roi'
              ? 'bg-purple-600 text-white shadow-sm'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          2. Interactive Hospital ROI & Capacity Calculator
        </button>
      </div>

      {/* Tab 1: Comparison Cards */}
      {activeTab === 'comparison' && (
        <div className="space-y-4">
          {bottlenecks.map((b, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4 hover:shadow-md transition-shadow"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <span className="w-7 h-7 rounded-lg bg-purple-100 text-purple-700 font-black text-xs flex items-center justify-center">
                    {idx + 1}
                  </span>
                  <h2 className="font-bold text-sm text-slate-900">{b.title}</h2>
                </div>
                <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 font-bold text-xs">
                  {b.reduction}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Before Box */}
                <div className="p-4 rounded-2xl bg-rose-50/50 border border-rose-200 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-rose-800 flex items-center gap-1.5">
                      <XCircle className="w-4 h-4 text-rose-600" />
                      <span>Traditional Hospital Workflow</span>
                    </span>
                    <span className="font-mono font-black text-rose-700 text-sm">{b.before}</span>
                  </div>
                  <p className="text-xs text-rose-900/80 leading-relaxed">{b.beforeDesc}</p>
                </div>

                {/* After Box */}
                <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-emerald-800 flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>With MediKiosk AI Intake</span>
                    </span>
                    <span className="font-mono font-black text-emerald-700 text-sm">{b.after}</span>
                  </div>
                  <p className="text-xs text-emerald-950/80 leading-relaxed">{b.afterDesc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab 2: ROI Calculator */}
      {activeTab === 'roi' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Interactive Hospital Throughput & ROI Modeling</h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Adjust the daily OPD patient volume slider to calculate clinical preparation hours saved and expanded hospital capacity.
            </p>
          </div>

          <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-700">Daily OPD Patient Footfall</label>
              <span className="font-mono font-black text-lg text-purple-700">{patientVolume} Patients / Day</span>
            </div>
            <input
              type="range"
              min="50"
              max="1000"
              step="25"
              value={patientVolume}
              onChange={(e) => setPatientVolume(Number(e.target.value))}
              className="w-full accent-purple-600 h-2 bg-slate-200 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-mono">
              <span>50 (Small Clinic)</span>
              <span>250 (District Hospital)</span>
              <span>500 (Medical College)</span>
              <span>1000 (Apex Tertiary Care)</span>
            </div>
          </div>

          {/* ROI Metric Outputs */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-5 rounded-2xl bg-purple-50 border border-purple-200 text-center space-y-1">
              <span className="text-xs font-bold text-purple-900 block">Doctor Prep Time Saved</span>
              <span className="font-mono text-3xl font-black text-purple-950 block">{hoursSavedDaily} Hours</span>
              <span className="text-[11px] text-purple-700 font-medium">Reclaimed for doctor-patient care</span>
            </div>

            <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-1">
              <span className="text-xs font-bold text-emerald-900 block">Additional Patient Capacity</span>
              <span className="font-mono text-3xl font-black text-emerald-950 block">+{additionalPatientsCapacity} Patients</span>
              <span className="text-[11px] text-emerald-700 font-medium">Treated per day without hiring more staff</span>
            </div>

            <div className="p-5 rounded-2xl bg-blue-50 border border-blue-200 text-center space-y-1">
              <span className="text-xs font-bold text-blue-900 block">Paper Records Digitized</span>
              <span className="font-mono text-3xl font-black text-blue-950 block">~{paperPrescriptionsDigitized} Records</span>
              <span className="text-[11px] text-blue-700 font-medium">Directly mapped to ABDM profiles</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default AdminBottlenecks;
