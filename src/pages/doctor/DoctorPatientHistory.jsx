import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  FileCheck2,
  CheckCircle2,
  Edit3,
  XCircle,
  AlertTriangle,
  HeartPulse,
  Pill,
  Clock,
  Sparkles,
  ShieldCheck,
  Save,
  ArrowRight,
  Stethoscope,
  Activity,
  History,
  FileText
} from 'lucide-react';
import { useDemo } from '../../context/DemoContext';

export const DoctorPatientHistory = () => {
  const { patientId } = useParams();
  const {
    patients,
    activePatient,
    switchPatient,
    activeDoctor,
    addToast
  } = useDemo();

  const navigate = useNavigate();
  const currentPatient = patients.find((p) => p.id === patientId) || activePatient;

  // Verification status for each section
  const [sectionStatuses, setSectionStatuses] = useState({
    complaint: 'confirmed',
    socrates: 'confirmed',
    pmh: 'confirmed',
    medications: 'pending',
    allergies: 'confirmed',
    family: 'confirmed',
    social: 'pending',
    vitals: 'confirmed'
  });

  const [editModal, setEditModal] = useState({
    isOpen: false,
    sectionKey: '',
    sectionTitle: '',
    content: ''
  });

  const handleStatusChange = (sectionKey, status) => {
    setSectionStatuses((prev) => ({ ...prev, [sectionKey]: status }));
    addToast({
      title: `Section Marked as ${status.toUpperCase()}`,
      message: `${sectionKey.toUpperCase()} updated by Dr. ${activeDoctor.name}`,
      type: status === 'confirmed' ? 'success' : status === 'rejected' ? 'error' : 'info'
    });
  };

  const handleOpenEdit = (sectionKey, title, currentContent) => {
    setEditModal({
      isOpen: true,
      sectionKey,
      sectionTitle: title,
      content: typeof currentContent === 'string' ? currentContent : JSON.stringify(currentContent, null, 2)
    });
  };

  const handleSaveEdit = () => {
    setSectionStatuses((prev) => ({ ...prev, [editModal.sectionKey]: 'confirmed' }));
    setEditModal({ isOpen: false, sectionKey: '', sectionTitle: '', content: '' });
    addToast({
      title: 'Clinical Correction Saved',
      message: `${editModal.sectionTitle} verified and updated.`,
      type: 'success'
    });
  };

  return (
    <div className="space-y-6">
      {/* Top Clinical Safety Warning Banner */}
      <div className="bg-amber-500/10 border-2 border-amber-500/30 rounded-3xl p-5 text-amber-950 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-sm shadow-amber-500/20">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-black tracking-wider uppercase text-amber-900 bg-amber-200/80 px-2 py-0.5 rounded">
                AI GENERATED — PHYSICIAN VERIFICATION REQUIRED
              </span>
            </div>
            <p className="text-xs text-amber-900/90 mt-1 leading-relaxed">
              MediKiosk clinical history synthesized from patient kiosk voice/touch responses and OCR document extractions. Review each section and confirm, edit, or reject before finalizing EHR note.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => {
              addToast({
                title: 'All Sections Verified',
                message: 'Clinical history marked as verified by consulting physician.',
                type: 'success'
              });
              navigate(`/doctor/patient/${currentPatient.id}/consultation`);
            }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md shadow-emerald-600/20 transition-all"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Approve & Open EHR</span>
          </button>
        </div>
      </div>

      {/* Patient Mini Banner */}
      <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-800 font-black text-lg flex items-center justify-center">
            {currentPatient.name.charAt(0)}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-slate-900">{currentPatient.name}</h2>
              <span className="font-mono text-xs px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                TOKEN {currentPatient.token || 'T01'}
              </span>
              <span className="text-xs text-slate-500 font-mono">UHID: {currentPatient.uhid}</span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              {currentPatient.age} Yrs • {currentPatient.gender} • Consulting for: <span className="font-bold text-slate-800">{currentPatient.chiefComplaint}</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate(`/doctor/patient/${currentPatient.id}/summary`)}
            className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors"
          >
            View SOAP Summary
          </button>
          <button
            onClick={() => navigate(`/doctor/patient/${currentPatient.id}/medications`)}
            className="px-3.5 py-2 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-800 font-bold text-xs border border-amber-200 transition-colors"
          >
            Medication Flags
          </button>
        </div>
      </div>

      {/* 10 Clinical History Sections Grid */}
      <div className="space-y-4">
        
        {/* Section 1: Chief Complaint */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-blue-100 text-blue-700 font-black text-xs flex items-center justify-center">1</span>
              <h3 className="font-bold text-sm text-slate-900">Chief Complaint (મુખ્ય તકલીફ)</h3>
            </div>
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => handleStatusChange('complaint', 'confirmed')}
                className={`p-1.5 rounded-lg border text-xs font-semibold flex items-center gap-1 transition-all ${
                  sectionStatuses.complaint === 'confirmed'
                    ? 'bg-emerald-50 text-emerald-700 border-emerald-300 font-bold'
                    : 'text-slate-400 hover:bg-slate-50'
                }`}
                title="Confirm"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Confirm</span>
              </button>
              <button
                onClick={() => handleOpenEdit('complaint', 'Chief Complaint', currentPatient.chiefComplaint)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-slate-50 text-xs flex items-center gap-1"
                title="Edit"
              >
                <Edit3 className="w-4 h-4" />
                <span>Edit</span>
              </button>
              <button
                onClick={() => handleStatusChange('complaint', 'rejected')}
                className={`p-1.5 rounded-lg border text-xs font-semibold flex items-center gap-1 transition-all ${
                  sectionStatuses.complaint === 'rejected'
                    ? 'bg-rose-50 text-rose-700 border-rose-300 font-bold'
                    : 'text-slate-400 hover:bg-slate-50'
                }`}
                title="Reject"
              >
                <XCircle className="w-4 h-4 text-rose-600" />
                <span>Reject</span>
              </button>
            </div>
          </div>
          <div className={`p-3.5 rounded-xl bg-slate-50 text-xs text-slate-800 leading-relaxed ${
            sectionStatuses.complaint === 'rejected' ? 'line-through text-slate-400' : ''
          }`}>
            <span className="font-bold text-rose-700">{currentPatient.chiefComplaint}</span> — Patient reported retrosternal tightness on exertion lasting ~15 minutes, with shortness of breath on climbing stairs.
          </div>
        </div>

        {/* Section 2: HPI SOCRATES */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-blue-100 text-blue-700 font-black text-xs flex items-center justify-center">2</span>
              <h3 className="font-bold text-sm text-slate-900">History of Present Illness (SOCRATES Analysis)</h3>
            </div>
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => handleStatusChange('socrates', 'confirmed')}
                className={`p-1.5 rounded-lg border text-xs font-semibold flex items-center gap-1 transition-all ${
                  sectionStatuses.socrates === 'confirmed'
                    ? 'bg-emerald-50 text-emerald-700 border-emerald-300 font-bold'
                    : 'text-slate-400 hover:bg-slate-50'
                }`}
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Confirm</span>
              </button>
              <button
                onClick={() => handleOpenEdit('socrates', 'SOCRATES Details', 'Site: Retrosternal\nOnset: Gradual past 3 weeks\nCharacter: Heavy pressure\nRadiation: Left shoulder and arm\nAssociations: Diaphoresis, Dyspnea\nTiming: Worse morning & stairs\nExacerbating: Brisk walking\nSeverity: 7/10')}
                className="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-slate-50 text-xs flex items-center gap-1"
              >
                <Edit3 className="w-4 h-4" />
                <span>Edit</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs">
            <div className="p-3 bg-slate-50 rounded-xl">
              <span className="text-[10px] text-slate-400 block uppercase font-bold">Site</span>
              <span className="font-semibold text-slate-800">Retrosternal / Precordial</span>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl">
              <span className="text-[10px] text-slate-400 block uppercase font-bold">Onset</span>
              <span className="font-semibold text-slate-800">Gradual (Past 3 weeks)</span>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl">
              <span className="text-[10px] text-slate-400 block uppercase font-bold">Character</span>
              <span className="font-semibold text-slate-800">Constricting / Heaviness</span>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl">
              <span className="text-[10px] text-slate-400 block uppercase font-bold">Radiation</span>
              <span className="font-bold text-rose-700">Left shoulder & medial arm</span>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl">
              <span className="text-[10px] text-slate-400 block uppercase font-bold">Associations</span>
              <span className="font-semibold text-slate-800">Diaphoresis, Exertional dyspnea</span>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl">
              <span className="text-[10px] text-slate-400 block uppercase font-bold">Timing</span>
              <span className="font-semibold text-slate-800">Episodes last 10-15 mins</span>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl">
              <span className="text-[10px] text-slate-400 block uppercase font-bold">Relieving Factor</span>
              <span className="font-semibold text-slate-800">Rest relieves within 5 mins</span>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl">
              <span className="text-[10px] text-slate-400 block uppercase font-bold">Severity</span>
              <span className="font-bold text-amber-600">7 / 10 On Exertion</span>
            </div>
          </div>
        </div>

        {/* Section 3: Past Medical & Surgical History */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-blue-100 text-blue-700 font-black text-xs flex items-center justify-center">3</span>
              <h3 className="font-bold text-sm text-slate-900">Past Medical & Surgical History</h3>
            </div>
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => handleStatusChange('pmh', 'confirmed')}
                className={`p-1.5 rounded-lg border text-xs font-semibold flex items-center gap-1 transition-all ${
                  sectionStatuses.pmh === 'confirmed'
                    ? 'bg-emerald-50 text-emerald-700 border-emerald-300 font-bold'
                    : 'text-slate-400 hover:bg-slate-50'
                }`}
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Confirm</span>
              </button>
            </div>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-50 text-xs space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-800 font-bold">Hypertension</span>
              <span className="text-slate-600">Diagnosed 2018 (~8 years). Target organ: None reported.</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-800 font-bold">Type 2 Diabetes Mellitus</span>
              <span className="text-slate-600">Diagnosed 2020. Last HbA1c 7.6% (Civil Hospital Lab, Jan 2026).</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-slate-200 text-slate-800 font-bold">Prior Surgeries</span>
              <span className="text-slate-600">Laparoscopic Appendectomy (2012, uneventful recovery).</span>
            </div>
          </div>
        </div>

        {/* Section 4: Current Medications & Reconciliation */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-blue-100 text-blue-700 font-black text-xs flex items-center justify-center">4</span>
              <h3 className="font-bold text-sm text-slate-900">Current Medications & Discrepancies</h3>
              <span className="px-2 py-0.5 bg-amber-100 text-amber-800 rounded text-[10px] font-bold">1 Flag</span>
            </div>
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => navigate(`/doctor/patient/${currentPatient.id}/medications`)}
                className="p-1.5 rounded-lg bg-amber-50 text-amber-800 text-xs font-bold border border-amber-200 hover:bg-amber-100 flex items-center gap-1"
              >
                <span>Reconcile Medications</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-50 text-xs space-y-2">
            <div className="flex items-center justify-between py-1 border-b border-slate-200">
              <span className="font-bold text-slate-800">1. Telmisartan 40mg</span>
              <span className="text-slate-500">1 tab daily morning • High Adherence</span>
            </div>
            <div className="flex items-center justify-between py-1 border-b border-slate-200">
              <span className="font-bold text-slate-800">2. Metformin 500mg</span>
              <span className="text-slate-500">1 tab twice daily with meals • High Adherence</span>
            </div>
            <div className="flex items-center justify-between py-1 bg-amber-50/80 p-2 rounded-lg border border-amber-200">
              <span className="font-bold text-amber-900">3. Atorvastatin 20mg (Discrepancy)</span>
              <span className="text-amber-800 font-semibold">Patient taking 10mg instead of 20mg (reported nausea)</span>
            </div>
          </div>
        </div>

        {/* Section 5: Allergies */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-blue-100 text-blue-700 font-black text-xs flex items-center justify-center">5</span>
              <h3 className="font-bold text-sm text-slate-900">Known Allergies & Adverse Drug Reactions</h3>
            </div>
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => handleStatusChange('allergies', 'confirmed')}
                className="p-1.5 rounded-lg bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-300 flex items-center gap-1"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Confirmed</span>
              </button>
            </div>
          </div>
          <div className="p-3.5 rounded-xl bg-rose-50/50 border border-rose-200 text-xs flex items-center justify-between">
            <div>
              <span className="font-bold text-rose-900 block">Penicillin (Severe Urticaria & Facial Swelling)</span>
              <span className="text-rose-700 text-[11px]">Reported reaction in 2016 during dental extraction. Avoid beta-lactam antibiotics.</span>
            </div>
            <span className="px-2.5 py-1 rounded-full bg-rose-200 text-rose-800 font-mono font-bold text-[10px]">
              CRITICAL
            </span>
          </div>
        </div>

        {/* Section 6: Baseline Kiosk Vitals */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-blue-100 text-blue-700 font-black text-xs flex items-center justify-center">6</span>
              <h3 className="font-bold text-sm text-slate-900">Baseline Vitals Captured at Kiosk</h3>
            </div>
            <span className="text-[11px] text-slate-400">Captured at 10:12 AM</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-xs">
            <div className="p-3 bg-slate-50 rounded-xl">
              <span className="text-[10px] text-slate-400 block uppercase font-bold">Blood Pressure</span>
              <span className="font-black text-rose-600 text-sm">148/92 mmHg</span>
              <span className="text-[10px] text-rose-600 block">Stage 1 HTN</span>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl">
              <span className="text-[10px] text-slate-400 block uppercase font-bold">Heart Rate</span>
              <span className="font-black text-slate-800 text-sm">84 bpm</span>
              <span className="text-[10px] text-emerald-600 block">Regular sinus</span>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl">
              <span className="text-[10px] text-slate-400 block uppercase font-bold">SpO2</span>
              <span className="font-black text-emerald-600 text-sm">98%</span>
              <span className="text-[10px] text-emerald-600 block">On Room Air</span>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl">
              <span className="text-[10px] text-slate-400 block uppercase font-bold">Body Temp</span>
              <span className="font-black text-slate-800 text-sm">98.4 °F</span>
              <span className="text-[10px] text-slate-500 block">Afebrile</span>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl">
              <span className="text-[10px] text-slate-400 block uppercase font-bold">BMI</span>
              <span className="font-black text-amber-600 text-sm">26.2</span>
              <span className="text-[10px] text-amber-600 block">Overweight</span>
            </div>
          </div>
        </div>

      </div>

      {/* Edit Clinical Modal */}
      {editModal.isOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-lg w-full shadow-2xl space-y-4">
            <h3 className="font-bold text-lg text-slate-900">
              Edit Clinical Claim: {editModal.sectionTitle}
            </h3>
            <p className="text-xs text-slate-500">
              Your edits will be recorded under your physician credential (Dr. {activeDoctor.name}).
            </p>
            <textarea
              rows={6}
              value={editModal.content}
              onChange={(e) => setEditModal({ ...editModal, content: e.target.value })}
              className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl text-xs font-mono text-slate-800 focus:ring-2 focus:ring-blue-500"
            />
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setEditModal({ isOpen: false, sectionKey: '', sectionTitle: '', content: '' })}
                className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveEdit}
                className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-sm"
              >
                Save Clinical Note
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default DoctorPatientHistory;
