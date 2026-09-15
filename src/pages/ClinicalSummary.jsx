import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDemo } from '../context/DemoContext';
import { ProgressStepper } from '../components/ProgressStepper';
import { StatusBadge } from '../components/StatusBadge';
import { AudioInstructionBtn } from '../components/AudioInstructionBtn';
import {
  FileText,
  CheckCircle2,
  XCircle,
  Edit3,
  Printer,
  Download,
  Send,
  ShieldAlert,
  AlertTriangle,
  User,
  Sparkles,
  Pill,
  Activity,
  Stethoscope,
  HeartPulse,
  Leaf,
  Clock,
  ArrowRight,
  Check
} from 'lucide-react';

export const ClinicalSummary = () => {
  const navigate = useNavigate();
  const { activePatient, setActiveStep, addToast, notifyTriage } = useDemo();

  const [isEditing, setIsEditing] = useState(false);
  const [summaryConfirmed, setSummaryConfirmed] = useState(false);
  const [summaryRejected, setSummaryRejected] = useState(false);

  // Editable summary fields
  const [hpiText, setHpiText] = useState(
    activePatient.history?.hpi ||
    "Patient reports sudden onset retrosternal chest heaviness while climbing stairs this morning at 9:30 AM. Rated 7/10 on pain scale. Radiates to left jaw and shoulder. Associated with mild diaphoresis and shortness of breath. No relief with rest. Denies syncope."
  );

  const [chiefComplaintText, setChiefComplaintText] = useState(
    activePatient.chiefComplaint ||
    "Substernal chest tightness radiating to left shoulder with exertional dyspnea (breathing difficulty) for 3 hours"
  );

  const handleConfirm = () => {
    setSummaryConfirmed(true);
    setSummaryRejected(false);
    addToast({
      title: "Clinical Summary Confirmed",
      message: "Draft verified by operator. Forwarded to Doctor OPD Queue.",
      type: "success"
    });
  };

  const handleReject = () => {
    setSummaryRejected(true);
    setSummaryConfirmed(false);
    addToast({
      title: "Draft Flagged for Revision",
      message: "Summary marked for manual physician re-intake.",
      type: "warning"
    });
  };

  const handlePrint = () => {
    window.print();
  };

  const handleExportPdf = () => {
    addToast({
      title: "Exporting Clinical PDF",
      message: `Generating digital FHIR summary PDF for ${activePatient.name} (${activePatient.id})...`,
      type: "info"
    });
    setTimeout(() => {
      addToast({
        title: "PDF Download Ready",
        message: "File MediKiosk_ClinicalSummary_MK1001.pdf generated successfully.",
        type: "success"
      });
    }, 1200);
  };

  const handleSendToDoctor = () => {
    addToast({
      title: "Transmitted to Doctor EMR",
      message: `Record sent to Dr. Consultation Desk (OPD Terminal #1).`,
      type: "success"
    });
    setActiveStep(5);
    navigate('/doctor-dashboard');
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6 py-4">
      {/* 5-Step Stepper */}
      <ProgressStepper currentStepNumber={4} />

      {/* Physician Review Warning Banner (MANDATORY REQUIREMENT) */}
      <div className="bg-amber-500/10 border-2 border-amber-500/40 rounded-3xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-amber-500/20 text-amber-800 flex items-center justify-center shrink-0">
            <ShieldAlert className="w-5 h-5 text-amber-700" />
          </div>
          <div>
            <h2 className="text-sm font-black text-amber-950 uppercase tracking-wide">
              AI-Generated Draft — Physician Review Required
            </h2>
            <p className="text-xs text-amber-900 mt-0.5">
              This summary is synthesized from kiosk conversational intake and paper OCR records. The examining physician retains complete clinical control and must verify findings before diagnosis.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <AudioInstructionBtn
            variant="compact"
            label="Audio Review"
            text="AI-generated clinical draft. Please review chief complaint, drug history, and red flag warnings before final prescription."
          />
        </div>
      </div>

      {/* Main Grid: Left = SOAP Clinical Summary, Right = AI Confidence & Action Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* LEFT COLUMN: Comprehensive Clinical Summary (8 cols) */}
        <div className="lg:col-span-8 bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-xs space-y-6 print:border-none print:shadow-none">

          {/* Header of Report */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-200 gap-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-2.5 py-1 rounded-md border border-teal-100">
                  Stage 04: Summarize
                </span>
                <span className="text-xs text-slate-400 font-mono">SOAP Structure</span>
              </div>
              <h1 className="text-2xl font-bold text-slate-900 mt-1">
                AI-Generated Clinical Summary
              </h1>
              <p className="text-xs text-slate-500">
                Generated: 11 Sep 2026, 10:22 AM • MediKiosk Engine v2.4
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setIsEditing(!isEditing)}
                className="px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 flex items-center gap-1.5 transition-colors"
              >
                <Edit3 className="w-3.5 h-3.5 text-teal-600" />
                <span>{isEditing ? "Save Edits" : "Edit Section"}</span>
              </button>
            </div>
          </div>

          {/* 1. Patient Information */}
          <section className="space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-teal-600" />
              <span>1. Patient Demographics & Identification</span>
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 bg-slate-50 p-4 rounded-2xl border border-slate-200/80 text-xs">
              <div>
                <span className="text-slate-400 block text-[10px]">NAME</span>
                <span className="font-bold text-slate-900 text-sm">{activePatient.name}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">AGE / GENDER</span>
                <span className="font-bold text-slate-900">{activePatient.age} Yrs / {activePatient.gender}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">ABHA ID</span>
                <span className="font-mono font-bold text-teal-700">{activePatient.abhaId}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">QUEUE NUMBER</span>
                <span className="font-mono font-bold text-slate-800">{activePatient.queueNumber}</span>
              </div>
            </div>
          </section>

          {/* 2. Red Flag Status */}
          <section className="space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
              <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
              <span>2. Red Flag & Triage Alert Status</span>
            </h3>
            {activePatient.priority === "High" ? (
              <div className="p-4 bg-rose-50 border border-rose-200 rounded-2xl text-xs space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-rose-900 flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4 text-rose-600" />
                    PRIORITY ATTENTION: Potential Acute Coronary Event
                  </span>
                  <StatusBadge status="High" type="priority" />
                </div>
                <p className="text-rose-800 leading-relaxed">
                  Substernal chest tightness radiating to left shoulder with exertional dyspnea in a 54yo male with history of dyslipidemia. Stat ECG and troponin testing indicated.
                </p>
              </div>
            ) : (
              <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-2xl text-xs text-emerald-900 font-medium flex items-center justify-between">
                <span>✓ No acute cardiovascular or neurological red flags identified during conversational screening.</span>
                <StatusBadge status="Normal" type="priority" />
              </div>
            )}
          </section>

          {/* 3. Chief Complaint */}
          <section className="space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              3. Chief Complaint (CC)
            </h3>
            {isEditing ? (
              <textarea
                rows={2}
                value={chiefComplaintText}
                onChange={(e) => setChiefComplaintText(e.target.value)}
                className="w-full p-3 rounded-xl border border-teal-400 text-xs text-slate-900 focus:outline-hidden"
              />
            ) : (
              <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200/80 text-xs font-semibold text-slate-800">
                "{chiefComplaintText}"
              </div>
            )}
          </section>

          {/* 4. History of Present Illness (HPI) */}
          <section className="space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              4. History of Present Illness (HPI - SOCRATES)
            </h3>
            {isEditing ? (
              <textarea
                rows={4}
                value={hpiText}
                onChange={(e) => setHpiText(e.target.value)}
                className="w-full p-3 rounded-xl border border-teal-400 text-xs text-slate-900 focus:outline-hidden"
              />
            ) : (
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 text-xs text-slate-700 leading-relaxed space-y-2">
                <p>{hpiText}</p>
                <div className="pt-2 border-t border-slate-200/60 flex flex-wrap gap-2">
                  <span className="text-[10px] font-bold bg-white px-2 py-0.5 rounded border border-slate-200 text-slate-600">Site: Retrosternal</span>
                  <span className="text-[10px] font-bold bg-white px-2 py-0.5 rounded border border-slate-200 text-slate-600">Onset: Acute (9:30 AM)</span>
                  <span className="text-[10px] font-bold bg-white px-2 py-0.5 rounded border border-slate-200 text-slate-600">Severity: 7/10</span>
                  <span className="text-[10px] font-bold bg-white px-2 py-0.5 rounded border border-slate-200 text-slate-600">Radiation: Left Arm & Shoulder</span>
                </div>
              </div>
            )}
          </section>

          {/* 5. Past Medical & Surgical History */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-1.5 text-xs">
              <h4 className="font-bold text-slate-800">5. Past Medical History</h4>
              <p className="text-slate-600 leading-relaxed">
                {activePatient.history?.pastMedical || "Dyslipidemia (2021), Primary Hypertension (2023)."}
              </p>
            </div>
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-1.5 text-xs">
              <h4 className="font-bold text-slate-800">6. Past Surgical History</h4>
              <p className="text-slate-600 leading-relaxed">
                {activePatient.history?.pastSurgical || "Appendectomy (2008), uncomplicated."}
              </p>
            </div>
          </section>

          {/* 7. Current Medications & Allergies */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-2 text-xs">
              <h4 className="font-bold text-slate-800 flex items-center gap-1.5">
                <Pill className="w-3.5 h-3.5 text-teal-600" />
                <span>7. Current Medications & Drug History</span>
              </h4>
              <ul className="space-y-1.5">
                {(activePatient.history?.medications || []).map((m, i) => (
                  <li key={i} className="flex justify-between items-center text-slate-700 bg-white p-2 rounded-xl border border-slate-200/60">
                    <span className="font-semibold">{m.name} ({m.dose})</span>
                    <span className="text-[11px] text-slate-500">{m.frequency}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-4 bg-rose-50/40 rounded-2xl border border-rose-200/70 space-y-2 text-xs">
              <h4 className="font-bold text-rose-900 flex items-center gap-1.5">
                <ShieldAlert className="w-3.5 h-3.5 text-rose-600" />
                <span>8. Known Allergies</span>
              </h4>
              <ul className="space-y-1.5">
                {(activePatient.history?.allergies || ["NKDA"]).map((all, i) => (
                  <li key={i} className="text-rose-800 bg-white p-2 rounded-xl border border-rose-200 font-semibold">
                    • {all}
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* 9. Family & Personal History */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-1">
              <h4 className="font-bold text-slate-800">9. Family History</h4>
              <p className="text-slate-600">
                {activePatient.history?.familyHistory || "Father had MI at age 58. Mother has T2DM."}
              </p>
            </div>
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-1">
              <h4 className="font-bold text-slate-800">10. Personal & Social History</h4>
              <p className="text-slate-600">
                {activePatient.history?.personalHistory || "Non-smoker, desk occupation, moderate work stress."}
              </p>
            </div>
          </section>

          {/* 11. Review of Systems & Investigations */}
          <section className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 text-xs space-y-2">
            <h4 className="font-bold text-slate-800">11. Prior Investigations & Lab Trends</h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              <div className="bg-white p-2 rounded-xl border border-slate-200">
                <span className="text-[10px] text-slate-400">HEMOGLOBIN</span>
                <p className="font-bold text-rose-700">10.2 g/dL (Abnormal Low)</p>
              </div>
              <div className="bg-white p-2 rounded-xl border border-slate-200">
                <span className="text-[10px] text-slate-400">FASTING GLUCOSE</span>
                <p className="font-bold text-amber-800">110 mg/dL (Pre-diabetic)</p>
              </div>
              <div className="bg-white p-2 rounded-xl border border-slate-200">
                <span className="text-[10px] text-slate-400">TOTAL CHOLESTEROL</span>
                <p className="font-bold text-amber-800">218 mg/dL (High)</p>
              </div>
            </div>
          </section>

          {/* 12. AYUSH Assessment (if applicable) */}
          {activePatient.ayush && (
            <section className="p-4 bg-emerald-50/40 rounded-2xl border border-emerald-200/80 text-xs space-y-2">
              <h4 className="font-bold text-emerald-900 flex items-center gap-1.5">
                <Leaf className="w-3.5 h-3.5 text-emerald-600" />
                <span>12. AYUSH Integrative Notes</span>
              </h4>
              <p className="text-slate-700">
                Prakriti: <strong>{activePatient.ayush.prakriti}</strong> • Vikriti: <strong>{activePatient.ayush.vikriti}</strong> • Agni: <strong>{activePatient.ayush.aharaShakti}</strong>
              </p>
            </section>
          )}

        </div>

        {/* RIGHT COLUMN: AI Confidence & Action Controls (4 cols) */}
        <div className="lg:col-span-4 space-y-6">

          {/* AI Confidence / Completeness Panel */}
          <div className="bg-white rounded-3xl border border-slate-200/90 p-5 shadow-xs space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                AI Confidence & Metrics
              </span>
              <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-teal-50 text-teal-800 border border-teal-200">
                Validated
              </span>
            </div>

            {/* Score Ring / Bar */}
            <div className="text-center p-4 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-1">
              <p className="text-[11px] font-bold text-slate-400 uppercase">History Completeness</p>
              <p className="text-4xl font-black text-teal-700 tracking-tight">92%</p>
              <p className="text-[11px] text-emerald-700 font-semibold">Ready for Physician Sign-off</p>
            </div>

            {/* Metric Items */}
            <div className="space-y-3 text-xs">
              <div className="flex justify-between items-center py-1.5 border-b border-slate-100">
                <span className="text-slate-500">Documents Processed:</span>
                <span className="font-bold text-slate-800 font-mono">4 Documents</span>
              </div>
              <div className="flex justify-between items-center py-1.5 border-b border-slate-100">
                <span className="text-slate-500">Clinical Data Points:</span>
                <span className="font-bold text-slate-800 font-mono">38 Tokens</span>
              </div>
              <div className="flex justify-between items-center py-1.5 border-b border-slate-100">
                <span className="text-slate-500">Missing Information:</span>
                <span className="font-bold text-amber-700 font-mono">2 items (Smoking history, Recent diet)</span>
              </div>
              <div className="flex justify-between items-center py-1.5">
                <span className="text-slate-500">OCR Average Quality:</span>
                <span className="font-bold text-emerald-700 font-mono">96.8%</span>
              </div>
            </div>

            {/* Verification Status Actions */}
            <div className="pt-2 space-y-2">
              <p className="text-xs font-bold text-slate-700">Kiosk Verification Controls:</p>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={handleConfirm}
                  className={`py-2.5 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-colors ${summaryConfirmed
                      ? 'bg-emerald-700 text-white'
                      : 'bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100'
                    }`}
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Confirm Draft</span>
                </button>

                <button
                  type="button"
                  onClick={handleReject}
                  className={`py-2.5 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-colors ${summaryRejected
                      ? 'bg-rose-700 text-white'
                      : 'bg-rose-50 text-rose-800 border border-rose-200 hover:bg-rose-100'
                    }`}
                >
                  <XCircle className="w-4 h-4" />
                  <span>Flag Revision</span>
                </button>
              </div>
            </div>

            {/* Print & Export PDF Controls */}
            <div className="pt-2 flex gap-2">
              <button
                type="button"
                onClick={handlePrint}
                className="flex-1 py-2.5 px-3 rounded-xl border border-slate-200 hover:bg-slate-50 font-bold text-xs text-slate-700 flex items-center justify-center gap-1.5 transition-colors"
              >
                <Printer className="w-3.5 h-3.5 text-slate-500" />
                <span>Print Summary</span>
              </button>
              <button
                type="button"
                onClick={handleExportPdf}
                className="flex-1 py-2.5 px-3 rounded-xl border border-slate-200 hover:bg-slate-50 font-bold text-xs text-slate-700 flex items-center justify-center gap-1.5 transition-colors"
              >
                <Download className="w-3.5 h-3.5 text-teal-600" />
                <span>Export PDF</span>
              </button>
            </div>

            {/* SEND TO DOCTOR MAIN BUTTON */}
            <button
              type="button"
              onClick={handleSendToDoctor}
              className="w-full py-3.5 px-4 rounded-2xl bg-teal-700 hover:bg-teal-800 active:scale-98 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-md transition-all"
            >
              <Send className="w-4 h-4" />
              <span>Send to Doctor Consultation Desk</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
