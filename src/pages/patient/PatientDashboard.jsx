import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Activity,
  User,
  MessageSquare,
  FileSearch,
  Clock,
  Pill,
  FileText,
  ShieldCheck,
  AlertTriangle,
  Compass,
  ArrowRight,
  Ticket,
  CheckCircle2,
  Calendar,
  Sparkles,
  ChevronRight,
  ShieldAlert,
  Layers,
  UploadCloud,
  FileCheck
} from 'lucide-react';
import { useDemo } from '../../context/DemoContext';

export const PatientDashboard = () => {
  const navigate = useNavigate();
  const {
    activePatient,
    tokenNumber,
    historyCompleteness,
    documents,
    timelineEvents,
    medications,
    alerts,
    patientSubmissionStatus,
    selectedLanguage,
    t
  } = useDemo();

  const journeyStages = [
    { id: 'identify', name: 'IDENTIFY', status: 'completed' },
    { id: 'consent', name: 'CONSENT', status: 'completed' },
    { id: 'history', name: 'HISTORY', status: historyCompleteness >= 80 ? 'completed' : 'active' },
    { id: 'documents', name: 'DOCUMENTS', status: documents.length > 0 ? 'completed' : 'pending' },
    { id: 'review', name: 'REVIEW', status: patientSubmissionStatus === 'submitted' ? 'completed' : 'active' },
    { id: 'summary', name: 'SUMMARY', status: patientSubmissionStatus === 'submitted' ? 'completed' : 'pending' },
    { id: 'submitted', name: 'SUBMITTED', status: patientSubmissionStatus === 'submitted' ? 'completed' : 'pending' }
  ];

  return (
    <div className="space-y-6 sm:space-y-8">
      
      {/* Top Welcome Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-700 via-sky-700 to-indigo-800 text-white p-6 sm:p-8 lg:p-10 shadow-lg">
        <div className="absolute right-0 top-0 translate-x-12 -translate-y-12 w-80 h-80 bg-white/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 text-blue-100 text-xs font-bold border border-white/20">
              <Sparkles className="w-3.5 h-3.5 text-teal-300" />
              <span>Civil Hospital • Smart OPD Kiosk Intake</span>
            </div>
            
            <h1 className="text-2xl sm:text-4xl font-black tracking-tight">
              Welcome, {activePatient?.name || "Rajesh Patel"}!
            </h1>
            <p className="text-blue-100 text-xs sm:text-sm max-w-xl font-normal leading-relaxed">
              Your clinical history is prepared via touch & voice before meeting the doctor. This reduces consultation waiting time by up to 75%.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2 text-xs">
              <span className="bg-black/20 px-3 py-1.5 rounded-xl border border-white/10 font-mono">
                UHID: {activePatient?.id || "P001"}
              </span>
              <span className="bg-black/20 px-3 py-1.5 rounded-xl border border-white/10">
                Language: <strong className="text-teal-300">{activePatient?.language || "Gujarati"}</strong>
              </span>
              <span className="bg-black/20 px-3 py-1.5 rounded-xl border border-white/10">
                Department: <strong>{activePatient?.department || "Cardiology"}</strong>
              </span>
            </div>
          </div>

          {/* Token & Status Card */}
          <div className="bg-white/10 backdrop-blur-md p-5 rounded-2xl border border-white/20 text-center min-w-[200px] shrink-0 space-y-2">
            <span className="text-[11px] font-bold text-blue-200 uppercase tracking-wider block">
              Current OPD Token
            </span>
            <div className="text-4xl sm:text-5xl font-black font-mono tracking-tight text-white py-1">
              {activePatient?.token || tokenNumber || "A103"}
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-400/20 text-amber-200 border border-amber-400/30">
              <Clock className="w-3.5 h-3.5" />
              <span>Status: Waiting</span>
            </div>
          </div>
        </div>
      </div>

      {/* Complete Patient Journey Stepper */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-2xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-900">Current Intake Journey Progress</h3>
            <p className="text-xs text-slate-500">From kiosk arrival to physician OPD examination</p>
          </div>
          <Link
            to="/patient/journey"
            className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1"
          >
            <span>View 9-Stage Stepper</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Stepper Bar */}
        <div className="grid grid-cols-7 gap-1.5 sm:gap-2">
          {journeyStages.map((st, idx) => (
            <div key={st.id} className="text-center space-y-1.5">
              <div
                className={`h-2.5 rounded-full transition-all ${
                  st.status === 'completed'
                    ? 'bg-emerald-500'
                    : st.status === 'active'
                    ? 'bg-blue-600 animate-pulse'
                    : 'bg-slate-200'
                }`}
              />
              <span className="block text-[9px] sm:text-[10px] font-bold truncate text-slate-600">
                {st.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 5 Clinical Metric Cards Requested by Prompt */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3.5 sm:gap-4">
        
        {/* Card 1: History Completeness */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-2xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500">Clinical History</span>
            <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <MessageSquare className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900">{historyCompleteness || 85}%</div>
          <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
            <div className="h-full bg-blue-600 rounded-full" style={{ width: `${historyCompleteness || 85}%` }} />
          </div>
          <p className="text-[11px] text-slate-500">Structured SOCRATES Draft</p>
        </div>

        {/* Card 2: Documents */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-2xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500">Documents</span>
            <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <FileSearch className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900">{documents?.length || 4} Uploaded</div>
          <p className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" />
            <span>OCR Extracted</span>
          </p>
          <p className="text-[11px] text-slate-500">Prescriptions & Labs</p>
        </div>

        {/* Card 3: Current Medicines */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-2xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500">Medicines</span>
            <div className="w-8 h-8 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center">
              <Pill className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900">{medications?.length || 3} Active</div>
          <span className="inline-block text-[10px] font-bold px-2 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-200">
            1 Discrepancy Flag
          </span>
          <p className="text-[11px] text-slate-500">Reconciled Records</p>
        </div>

        {/* Card 4: Allergies */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-2xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500">Allergies</span>
            <div className="w-8 h-8 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
              <ShieldAlert className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-rose-700">1 Documented</div>
          <span className="inline-block text-[10px] font-bold px-2 py-0.5 rounded bg-rose-100 text-rose-800">
            Penicillin (Urticaria)
          </span>
          <p className="text-[11px] text-slate-500">Flagged in Doctor View</p>
        </div>

        {/* Card 5: Consultation Status */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-2xs space-y-2 col-span-2 lg:col-span-1">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500">Consultation</span>
            <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-amber-600">Waiting</div>
          <p className="text-[11px] font-semibold text-slate-700">Dr. S. Trivedi (Room 04)</p>
          <p className="text-[11px] text-slate-500">Est. call: ~8 mins</p>
        </div>

      </div>

      {/* 5 Primary Action Buttons Requested by Prompt */}
      <div className="space-y-3">
        <h3 className="text-sm font-bold text-slate-900">Recommended Next Steps</h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          
          <Link
            to="/patient/journey"
            className="p-4 rounded-2xl bg-blue-600 text-white hover:bg-blue-700 font-bold text-xs flex flex-col justify-between shadow-md shadow-blue-500/20 transition-all group cursor-pointer"
          >
            <Compass className="w-6 h-6 mb-3 text-blue-200 group-hover:scale-110 transition-transform" />
            <div>
              <p className="text-sm font-bold">Continue Journey</p>
              <p className="text-[11px] text-blue-100 mt-0.5 font-normal">Resume 9-step guided check-in</p>
            </div>
          </Link>

          <Link
            to="/patient/history"
            className="p-4 rounded-2xl bg-white text-slate-800 hover:bg-slate-50 border border-slate-200 font-bold text-xs flex flex-col justify-between shadow-2xs transition-all group cursor-pointer"
          >
            <MessageSquare className="w-6 h-6 mb-3 text-blue-600 group-hover:scale-110 transition-transform" />
            <div>
              <p className="text-sm font-bold">Start Clinical History</p>
              <p className="text-[11px] text-slate-500 mt-0.5 font-normal">Voice & Touch conversational AI</p>
            </div>
          </Link>

          <Link
            to="/patient/documents"
            className="p-4 rounded-2xl bg-white text-slate-800 hover:bg-slate-50 border border-slate-200 font-bold text-xs flex flex-col justify-between shadow-2xs transition-all group cursor-pointer"
          >
            <UploadCloud className="w-6 h-6 mb-3 text-purple-600 group-hover:scale-110 transition-transform" />
            <div>
              <p className="text-sm font-bold">Scan Document</p>
              <p className="text-[11px] text-slate-500 mt-0.5 font-normal">Upload prescriptions & OCR</p>
            </div>
          </Link>

          <Link
            to="/patient/summary"
            className="p-4 rounded-2xl bg-white text-slate-800 hover:bg-slate-50 border border-slate-200 font-bold text-xs flex flex-col justify-between shadow-2xs transition-all group cursor-pointer"
          >
            <FileText className="w-6 h-6 mb-3 text-emerald-600 group-hover:scale-110 transition-transform" />
            <div>
              <p className="text-sm font-bold">View Summary</p>
              <p className="text-[11px] text-slate-500 mt-0.5 font-normal">SOAP draft for review & submission</p>
            </div>
          </Link>

          <Link
            to="/patient/timeline"
            className="p-4 rounded-2xl bg-white text-slate-800 hover:bg-slate-50 border border-slate-200 font-bold text-xs flex flex-col justify-between shadow-2xs transition-all group cursor-pointer"
          >
            <Clock className="w-6 h-6 mb-3 text-cyan-600 group-hover:scale-110 transition-transform" />
            <div>
              <p className="text-sm font-bold">View Timeline</p>
              <p className="text-[11px] text-slate-500 mt-0.5 font-normal">Longitudinal trajectory (2008-2026)</p>
            </div>
          </Link>

        </div>
      </div>

      {/* Clinical History Sections Breakdown with Completeness Status */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-2xs space-y-5">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h3 className="text-base font-bold text-slate-900">Clinical History Completeness Meter (85%)</h3>
            <p className="text-xs text-slate-500">10 Structured sections required for physician OPD intake</p>
          </div>
          <Link
            to="/patient/history"
            className="px-4 py-2 rounded-xl bg-blue-50 text-blue-700 hover:bg-blue-100 font-bold text-xs flex items-center gap-1.5 transition-colors"
          >
            <span>Resume Intake</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 text-left">
          {[
            { name: "Chief Complaint", status: "complete", icon: "✓" },
            { name: "HPI", status: "complete", icon: "✓" },
            { name: "Past History", status: "complete", icon: "✓" },
            { name: "Medications", status: "complete", icon: "✓" },
            { name: "Allergies", status: "alert", icon: "⚠" },
            { name: "Family History", status: "pending", icon: "⏳" },
            { name: "Personal History", status: "pending", icon: "⏳" },
            { name: "Review of Systems", status: "pending", icon: "⏳" },
            { name: "Prior Investigations", status: "complete", icon: "✓" },
            { name: "Surgical History", status: "complete", icon: "✓" }
          ].map((sec, idx) => (
            <div
              key={idx}
              className={`p-3 rounded-2xl border flex items-center justify-between text-xs font-bold transition-all ${
                sec.status === 'complete'
                  ? 'bg-emerald-50/60 border-emerald-200 text-emerald-900'
                  : sec.status === 'alert'
                  ? 'bg-amber-50/80 border-amber-300 text-amber-900'
                  : 'bg-slate-50 border-slate-200 text-slate-600'
              }`}
            >
              <span className="truncate pr-1">{sec.name}</span>
              <span className="text-sm shrink-0 font-mono">{sec.icon}</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default PatientDashboard;
