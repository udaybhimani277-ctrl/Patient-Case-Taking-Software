import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  FileText,
  Copy,
  ExternalLink,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Stethoscope,
  Info,
  Layers,
  ChevronRight
} from 'lucide-react';
import { useDemo } from '../../context/DemoContext';

export const DoctorPatientSummary = () => {
  const { patientId } = useParams();
  const {
    patients,
    activePatient,
    activeDoctor,
    addToast
  } = useDemo();

  const navigate = useNavigate();
  const currentPatient = patients.find((p) => p.id === patientId) || activePatient;

  const [activeEvidence, setActiveEvidence] = useState(null);

  const soapData = {
    subjective: {
      complaint: currentPatient.chiefComplaint || 'Exertional chest discomfort radiating to left arm (3 weeks)',
      hpi: '54-year-old male presents with retrosternal constricting discomfort occurring primarily when climbing stairs or walking briskly. Episodes typically last 10 to 15 minutes and resolve with rest. Associated with mild diaphoresis and exertional dyspnea. Denies orthopnea, PND, or syncope.',
      pmh: 'Essential Hypertension (diagnosed 2018), Type 2 Diabetes Mellitus (diagnosed 2020). Previous appendectomy (2012).',
      evidenceHpi: {
        docName: 'Kiosk SOCRATES Voice Intake',
        date: 'Today, 10:14 AM',
        snippet: 'Patient stated: "When climbing stairs at my shop, heavy pressure on chest radiating to left arm, relieved after sitting for 5 mins."'
      }
    },
    objective: {
      vitals: 'BP: 148/92 mmHg | HR: 84 bpm (Regular) | SpO2: 98% (Room Air) | Temp: 98.4°F | BMI: 26.2 kg/m²',
      labs: 'HbA1c: 7.6% (Civil Hospital Lab, Jan 2026) | Fasting Blood Sugar: 142 mg/dL | Serum Creatinine: 0.9 mg/dL | Total Cholesterol: 218 mg/dL | LDL: 138 mg/dL',
      ecg: 'Baseline sinus rhythm at 82 bpm. T-wave flattening in lead V5-V6. No acute ST elevation.',
      evidenceLab: {
        docName: 'Civil Hospital Central Lab Report',
        date: '14 Jan 2026',
        snippet: 'Automated Chemistry: HbA1c: 7.6% (Uncontrolled). Lipid Panel: TC 218 mg/dL, LDL-C 138 mg/dL, HDL 42 mg/dL.'
      }
    },
    assessment: {
      primary: '1. Angina Pectoris (Probable Exertional Angina / CAD) - ICD-10: I20.9',
      secondary: '2. Essential Hypertension (Suboptimally Controlled) - ICD-10: I10',
      tertiary: '3. Type 2 Diabetes Mellitus with Dyslipidemia - ICD-10: E11.69',
      rationale: 'Classic exertional retrosternal pain relieved by rest in a patient with multiple cardiovascular risk factors (Age >50, Male, HTN, T2DM, Dyslipidemia).'
    },
    plan: {
      diagnostics: 'Urgent 12-lead ECG, 2D Echocardiography, and Serum Troponin I / TMT if resting ECG normal.',
      medications: '1. Reconcile Atorvastatin to 20mg tab at bedtime (resolve adherence issue). 2. Continue Telmisartan 40mg PO OD. 3. Continue Metformin 500mg PO BD. 4. Prescribe Sublingual Nitroglycerin (Sorbitrate 5mg) SOS for chest pain.',
      lifestyle: 'Strict low-salt, low-fat diabetic diet. Avoid unaccustomed heavy exertion until cardiac clearance.',
      followUp: 'Cardiology Review within 48 hours or immediate ER referral if rest pain occurs.'
    }
  };

  const handleCopySOAP = () => {
    const textToCopy = `=== MEDIKIOSK CLINICAL SOAP SUMMARY ===
PATIENT: ${currentPatient.name} | UHID: ${currentPatient.uhid} | TOKEN: ${currentPatient.token || 'T01'}
PHYSICIAN: Dr. ${activeDoctor.name} (${activeDoctor.department})
DATE: ${new Date().toLocaleDateString()}

[S] SUBJECTIVE:
- Chief Complaint: ${soapData.subjective.complaint}
- HPI: ${soapData.subjective.hpi}
- PMH: ${soapData.subjective.pmh}

[O] OBJECTIVE:
- Vitals: ${soapData.objective.vitals}
- Labs: ${soapData.objective.labs}
- ECG: ${soapData.objective.ecg}

[A] ASSESSMENT:
- ${soapData.assessment.primary}
- ${soapData.assessment.secondary}
- ${soapData.assessment.tertiary}

[P] PLAN:
- Diagnostics: ${soapData.plan.diagnostics}
- Medications: ${soapData.plan.medications}
- Lifestyle & Follow-up: ${soapData.plan.lifestyle} | ${soapData.plan.followUp}

AI GENERATED — VERIFIED BY PHYSICIAN`;

    navigator.clipboard.writeText(textToCopy);
    addToast({
      title: 'SOAP Note Copied to Clipboard',
      message: 'Structured EMR summary ready for pasting into hospital EHR.',
      type: 'success'
    });
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black tracking-tight text-slate-900">Physician SOAP Summary</h1>
            <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-900 border border-amber-300">
              AI GENERATED — PHYSICIAN VERIFICATION REQUIRED
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Synthesized clinical brief for <span className="font-bold text-slate-800">{currentPatient.name}</span> (UHID: {currentPatient.uhid})
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleCopySOAP}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors"
          >
            <Copy className="w-4 h-4 text-blue-600" />
            <span>Copy SOAP to EHR</span>
          </button>
          <button
            onClick={() => navigate(`/doctor/patient/${currentPatient.id}/consultation`)}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-500/20 transition-all"
          >
            <span>Proceed to Consultation</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 4 SOAP Quadrants */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* [S] Subjective */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-xl bg-blue-600 text-white font-black text-sm flex items-center justify-center">
                S
              </span>
              <h2 className="text-base font-bold text-slate-900">Subjective (Patient Narrative)</h2>
            </div>
            <button
              onClick={() => setActiveEvidence(soapData.subjective.evidenceHpi)}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-blue-50 text-blue-700 text-[11px] font-bold border border-blue-200 hover:bg-blue-100 transition-colors"
            >
              <ExternalLink className="w-3 h-3" />
              <span>Evidence: Voice SOCRATES</span>
            </button>
          </div>

          <div className="space-y-3 text-xs text-slate-700 leading-relaxed">
            <div>
              <span className="font-bold text-slate-900 block">Chief Complaint:</span>
              <p className="p-2.5 bg-slate-50 rounded-xl mt-1 font-medium">{soapData.subjective.complaint}</p>
            </div>
            <div>
              <span className="font-bold text-slate-900 block">History of Present Illness:</span>
              <p className="p-2.5 bg-slate-50 rounded-xl mt-1">{soapData.subjective.hpi}</p>
            </div>
            <div>
              <span className="font-bold text-slate-900 block">Past Medical History:</span>
              <p className="p-2.5 bg-slate-50 rounded-xl mt-1">{soapData.subjective.pmh}</p>
            </div>
          </div>
        </div>

        {/* [O] Objective */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-xl bg-cyan-600 text-white font-black text-sm flex items-center justify-center">
                O
              </span>
              <h2 className="text-base font-bold text-slate-900">Objective (Vitals & Labs)</h2>
            </div>
            <button
              onClick={() => setActiveEvidence(soapData.objective.evidenceLab)}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-cyan-50 text-cyan-800 text-[11px] font-bold border border-cyan-200 hover:bg-cyan-100 transition-colors"
            >
              <ExternalLink className="w-3 h-3" />
              <span>Evidence: Lab Scan</span>
            </button>
          </div>

          <div className="space-y-3 text-xs text-slate-700 leading-relaxed">
            <div>
              <span className="font-bold text-slate-900 block">Kiosk Vitals:</span>
              <p className="p-2.5 bg-slate-50 rounded-xl mt-1 font-mono font-bold text-slate-800">{soapData.objective.vitals}</p>
            </div>
            <div>
              <span className="font-bold text-slate-900 block">Recent Laboratory Findings:</span>
              <p className="p-2.5 bg-slate-50 rounded-xl mt-1 font-medium">{soapData.objective.labs}</p>
            </div>
            <div>
              <span className="font-bold text-slate-900 block">Electrocardiogram (ECG):</span>
              <p className="p-2.5 bg-slate-50 rounded-xl mt-1 font-medium">{soapData.objective.ecg}</p>
            </div>
          </div>
        </div>

        {/* [A] Assessment */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-xl bg-amber-600 text-white font-black text-sm flex items-center justify-center">
                A
              </span>
              <h2 className="text-base font-bold text-slate-900">Assessment & Differential Diagnoses</h2>
            </div>
            <span className="text-xs text-amber-800 font-bold px-2 py-0.5 bg-amber-50 rounded border border-amber-200">
              ICD-10 Coded
            </span>
          </div>

          <div className="space-y-2.5 text-xs">
            <div className="p-3 bg-rose-50/70 border border-rose-200 rounded-xl">
              <span className="font-bold text-rose-900 block">{soapData.assessment.primary}</span>
              <span className="text-[11px] text-rose-700">Highest clinical suspicion based on exertional radiation.</span>
            </div>
            <div className="p-3 bg-blue-50/70 border border-blue-200 rounded-xl">
              <span className="font-bold text-blue-900 block">{soapData.assessment.secondary}</span>
              <span className="text-[11px] text-blue-700">BP 148/92 mmHg currently above target of &lt;130/80.</span>
            </div>
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
              <span className="font-bold text-slate-800 block">{soapData.assessment.tertiary}</span>
            </div>
          </div>
        </div>

        {/* [P] Plan */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-xl bg-emerald-600 text-white font-black text-sm flex items-center justify-center">
                P
              </span>
              <h2 className="text-base font-bold text-slate-900">Proposed Management Plan</h2>
            </div>
            <span className="text-xs text-emerald-800 font-bold px-2 py-0.5 bg-emerald-50 rounded border border-emerald-200">
              Actionable
            </span>
          </div>

          <div className="space-y-3 text-xs text-slate-700 leading-relaxed">
            <div>
              <span className="font-bold text-slate-900 block">Recommended Diagnostics:</span>
              <p className="p-2.5 bg-slate-50 rounded-xl mt-1 font-medium">{soapData.plan.diagnostics}</p>
            </div>
            <div>
              <span className="font-bold text-slate-900 block">Medication Adjustments:</span>
              <p className="p-2.5 bg-slate-50 rounded-xl mt-1 font-medium text-slate-800">{soapData.plan.medications}</p>
            </div>
            <div>
              <span className="font-bold text-slate-900 block">Lifestyle & Follow-Up:</span>
              <p className="p-2.5 bg-slate-50 rounded-xl mt-1 font-medium">{soapData.plan.lifestyle} • {soapData.plan.followUp}</p>
            </div>
          </div>
        </div>

      </div>

      {/* Evidence Viewer Modal */}
      {activeEvidence && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2 text-blue-700 font-bold text-sm">
                <ExternalLink className="w-4 h-4" />
                <span>Source Verification Record</span>
              </div>
              <button
                onClick={() => setActiveEvidence(null)}
                className="text-slate-400 hover:text-slate-600 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-900 block">{activeEvidence.docName}</span>
              <span className="text-[10px] text-slate-400 block font-mono">Timestamp: {activeEvidence.date}</span>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs font-mono text-slate-800 leading-relaxed">
                "{activeEvidence.snippet}"
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setActiveEvidence(null)}
                className="px-4 py-2 rounded-xl bg-blue-600 text-white font-bold text-xs"
              >
                Close Evidence
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default DoctorPatientSummary;
