import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  FileText,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  Send,
  Edit3,
  Check,
  Clock,
  Printer,
  ShieldCheck,
  Ticket,
  ChevronRight,
  HelpCircle
} from 'lucide-react';
import { useDemo } from '../../context/DemoContext';

export const PatientSummary = () => {
  const navigate = useNavigate();
  const {
    activePatient,
    patientSubmissionStatus,
    submitToDoctor,
    tokenNumber,
    addToast
  } = useDemo();

  const isSubmitted = patientSubmissionStatus === 'submitted';
  const [editingKey, setEditingKey] = useState(null);
  const [editedText, setEditedText] = useState("");

  const sections = [
    {
      key: "chiefComplaint",
      title: "1. Chief Complaint",
      content: activePatient?.history?.chiefComplaint?.content || "Substernal chest tightness radiating to left shoulder with exertional dyspnea for 3 hours.",
      source: "Patient Voice Intake"
    },
    {
      key: "hpi",
      title: "2. History of Present Illness (HPI)",
      content: activePatient?.history?.hpi?.content || "Sudden onset retrosternal chest heaviness while climbing stairs at 9:30 AM. Rated 7/10 severity. Associated with mild diaphoresis and shortness of breath. No relief with rest.",
      source: "SOCRATES Question Engine"
    },
    {
      key: "pastMedical",
      title: "3. Past Medical History",
      content: activePatient?.history?.pastMedical?.content || "Dyslipidemia diagnosed 2021 (non-compliant with daily statin). Mild primary hypertension (diagnosed 2023).",
      source: "EMR Sync & OCR"
    },
    {
      key: "pastSurgical",
      title: "4. Past Surgical History",
      content: activePatient?.history?.pastSurgical?.content || "Laparoscopic Appendectomy (2008), uncomplicated procedure at Sterling Hospital.",
      source: "Archived Discharge Summary"
    },
    {
      key: "medications",
      title: "5. Drug & Medication History",
      content: activePatient?.history?.medications?.content || "Amlodipine 5mg OD (Morning). Atorvastatin 10mg HS (Night, irregular compliance: taking only 2-3 nights/wk).",
      source: "Prescription OCR + Patient Input"
    },
    {
      key: "allergies",
      title: "6. Allergy History",
      content: activePatient?.history?.allergies?.content || "Penicillin allergy: triggers cutaneous urticarial rash and facial pruritus. Avoid Beta-lactams.",
      source: "Patient Statement"
    },
    {
      key: "familyHistory",
      title: "7. Family Medical History",
      content: activePatient?.history?.familyHistory?.content || "Father had acute myocardial infarction at age 58. Mother has Type 2 Diabetes Mellitus on oral agents.",
      source: "Patient Questionnaire"
    },
    {
      key: "personalHistory",
      title: "8. Personal & Lifestyle History",
      content: activePatient?.history?.personalHistory?.content || "Non-smoker. Occasional social alcohol. Sedentary desk occupation. Moderate sleep deficit. High dietary salt intake.",
      source: "Patient Questionnaire"
    },
    {
      key: "reviewOfSystems",
      title: "9. Review of Systems (ROS)",
      content: activePatient?.history?.reviewOfSystems?.content || "Cardiovascular: Positive for exertional chest pressure & cold sweat. Respiratory: Exertional dyspnea. GI: Denies nausea or vomiting. Neuro: Denies dizziness or syncope.",
      source: "AI Guided Inquiry"
    },
    {
      key: "priorInvestigations",
      title: "10. Previous Investigations",
      content: activePatient?.history?.priorInvestigations?.content || "Resting ECG (2025): Normal sinus rhythm. Recent lipid profile (Nov 2025): Total Cholesterol 218 mg/dL, Triglycerides 210 mg/dL, Fasting Sugar 110 mg/dL.",
      source: "Digitized Lab Report OCR"
    }
  ];

  const handleEditClick = (key, currentContent) => {
    setEditingKey(key);
    setEditedText(currentContent);
  };

  const handleSaveEdit = () => {
    setEditingKey(null);
    addToast({
      title: "Summary Updated",
      message: "Your amendment will be forwarded to the examining physician.",
      type: "success"
    });
  };

  const handleSubmit = () => {
    submitToDoctor();
  };

  return (
    <div className="space-y-6 sm:space-y-8 max-w-4xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-200">
              Structured Clinical Draft
            </span>
            <span className="text-xs text-slate-500">SOAP Framework Format</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
            Pre-Consultation AI Clinical Summary
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Please review the synthesized history below. You can correct any section before final submission to the doctor's queue.
          </p>
        </div>

        {!isSubmitted ? (
          <button
            type="button"
            onClick={handleSubmit}
            className="px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md shadow-emerald-600/25 flex items-center gap-2 transition-all cursor-pointer"
          >
            <Send className="w-4 h-4" />
            <span>Submit to Doctor Queue</span>
          </button>
        ) : (
          <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Dispatched to OPD Room 04 (Token: {tokenNumber || "A103"})</span>
          </div>
        )}
      </div>

      {/* Mandatory Non-Autonomous Medical Disclaimer Banner */}
      <div className="bg-amber-50 rounded-3xl p-5 border-2 border-amber-300 shadow-xs flex items-start gap-3.5">
        <div className="w-10 h-10 rounded-2xl bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-sm">
          <AlertTriangle className="w-5 h-5" />
        </div>
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h4 className="text-sm font-black text-amber-950 uppercase tracking-wide">
              AI Generated Clinical Draft — Physician Verification Required
            </h4>
          </div>
          <p className="text-xs text-amber-900 leading-relaxed">
            This structured summary represents information gathered via conversational intake and document OCR. <strong>It is NOT a medical diagnosis or prescription.</strong> Your doctor will independently verify all complaints, perform a physical examination, and determine clinical treatment.
          </p>
        </div>
      </div>

      {/* Success Submission State if already submitted */}
      {isSubmitted && (
        <div className="bg-emerald-50 rounded-3xl p-6 border border-emerald-200 shadow-sm text-center space-y-3">
          <div className="w-12 h-12 rounded-full bg-emerald-500 text-white flex items-center justify-center mx-auto shadow-md shadow-emerald-500/30">
            <Check className="w-6 h-6 stroke-[3]" />
          </div>
          <h3 className="text-base font-black text-emerald-950">
            Intake Submitted & Token Dispatched!
          </h3>
          <p className="text-xs text-emerald-900 max-w-md mx-auto">
            Your clinical history is now active on <strong>Dr. S. Trivedi's</strong> desk console. Please wait in the 2nd Floor Cardiology Lobby for Token <strong>{tokenNumber || "A103"}</strong>.
          </p>
          <div className="pt-2 flex justify-center gap-3">
            <Link
              to="/patient/journey"
              className="px-5 py-2.5 rounded-xl bg-slate-900 text-white font-bold text-xs hover:bg-slate-800"
            >
              View Queue Status
            </Link>
          </div>
        </div>
      )}

      {/* Structured 10 Clinical Sections */}
      <div className="space-y-4">
        {sections.map((sec) => (
          <div
            key={sec.key}
            className="bg-white rounded-3xl p-6 border border-slate-200 shadow-2xs space-y-3 hover:border-blue-300 transition-colors"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <h4 className="text-sm font-bold text-slate-900">{sec.title}</h4>
                <span className="text-[10px] px-2 py-0.5 rounded bg-blue-50 text-blue-700 font-semibold">
                  Source: {sec.source}
                </span>
              </div>

              {!isSubmitted && editingKey !== sec.key && (
                <button
                  type="button"
                  onClick={() => handleEditClick(sec.key, sec.content)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-slate-100 transition-colors cursor-pointer"
                  title="Correct / Edit this section"
                >
                  <Edit3 className="w-4 h-4" />
                </button>
              )}
            </div>

            {editingKey === sec.key ? (
              <div className="space-y-2 pt-1">
                <textarea
                  rows={3}
                  value={editedText}
                  onChange={(e) => setEditedText(e.target.value)}
                  className="w-full text-xs sm:text-sm p-3 rounded-xl border border-blue-400 focus:outline-hidden bg-blue-50/20"
                />
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setEditingKey(null)}
                    className="px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-bold text-slate-600"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleSaveEdit}
                    className="px-4 py-1.5 rounded-lg bg-blue-600 text-white text-xs font-bold hover:bg-blue-700"
                  >
                    Save Amendment
                  </button>
                </div>
              </div>
            ) : (
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal bg-slate-50/60 p-3.5 rounded-2xl border border-slate-100">
                {sec.content}
              </p>
            )}
          </div>
        ))}
      </div>

      {/* Bottom Submission Action Button */}
      {!isSubmitted && (
        <div className="p-6 bg-slate-900 text-white rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h4 className="text-base font-bold">Ready to dispatch case to Doctor?</h4>
            <p className="text-xs text-slate-400">
              Forwarding your structured history notifies Dr. S. Trivedi's OPD queue immediately.
            </p>
          </div>

          <button
            type="button"
            onClick={handleSubmit}
            className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs shadow-lg shadow-emerald-500/30 flex items-center justify-center gap-2 cursor-pointer transition-all"
          >
            <Send className="w-4 h-4" />
            <span>Confirm & Submit to Doctor Queue</span>
          </button>
        </div>
      )}

    </div>
  );
};

export default PatientSummary;
