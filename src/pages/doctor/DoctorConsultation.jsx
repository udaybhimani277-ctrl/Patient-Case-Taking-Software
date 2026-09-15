import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Stethoscope,
  CheckCircle2,
  FileText,
  Pill,
  Plus,
  Trash2,
  Calendar,
  Save,
  Printer,
  Sparkles,
  AlertTriangle,
  ArrowRight,
  ShieldCheck,
  User,
  HeartPulse,
  Clock
} from 'lucide-react';
import { useDemo } from '../../context/DemoContext';

export const DoctorConsultation = () => {
  const { patientId } = useParams();
  const {
    patients,
    activePatient,
    activeDoctor,
    updatePatientStatus,
    addToast
  } = useDemo();

  const navigate = useNavigate();
  const currentPatient = patients.find((p) => p.id === patientId) || activePatient;

  // Physical Examination findings
  const [examFindings, setExamFindings] = useState({
    general: 'Conscious, oriented, mildly anxious. No pallor, icterus, or clubbing.',
    cvs: 'S1, S2 heard normally. No audible murmurs or gallops. JVP normal.',
    rs: 'Bilateral vesicular breath sounds. Clear lung bases, no wheezing.',
    vitalsConfirm: 'BP 146/90 mmHg, HR 82 bpm, SpO2 98% on room air.'
  });

  // Clinical Assessment
  const [assessment, setAssessment] = useState(
    'Angina Pectoris (Exertional) with Essential Hypertension (Suboptimally controlled) and Type 2 Diabetes Mellitus'
  );
  const [icd10Code, setIcd10Code] = useState('I20.9 - Angina pectoris, unspecified');

  // Prescription List
  const [prescriptions, setPrescriptions] = useState([
    { id: 1, medicine: 'Tab. Telmisartan', dosage: '40 mg', freq: '1-0-0', duration: '30 Days', timing: 'Morning after breakfast' },
    { id: 2, medicine: 'Tab. Metformin', dosage: '500 mg', freq: '1-0-1', duration: '30 Days', timing: 'After meals' },
    { id: 3, medicine: 'Tab. Atorvastatin', dosage: '20 mg', freq: '0-0-1', duration: '30 Days', timing: 'Bedtime (Reinstated)' },
    { id: 4, medicine: 'Tab. Sorbitrate (Nitroglycerin)', dosage: '5 mg', freq: 'SOS', duration: '15 Tabs', timing: 'Sublingual on acute chest pain' }
  ]);

  const [newRx, setNewRx] = useState({ medicine: '', dosage: '', freq: '1-0-0', duration: '30 Days', timing: 'After meals' });
  const [investigations, setInvestigations] = useState('12-Lead ECG, 2D Echocardiography with Doppler, Lipid Profile, Serum Creatinine');
  const [followUp, setFollowUp] = useState('7 Days (or immediately if rest pain occurs)');
  const [isCompleted, setIsCompleted] = useState(false);

  const handleAddRx = (e) => {
    e.preventDefault();
    if (!newRx.medicine) return;

    if (newRx.medicine.toLowerCase().includes('penicillin') || newRx.medicine.toLowerCase().includes('amoxicillin')) {
      addToast({
        title: 'CONTRAINDICATION BLOCKED',
        message: 'Patient has documented severe allergy to Penicillin!',
        type: 'error'
      });
      return;
    }

    setPrescriptions([...prescriptions, { ...newRx, id: Date.now() }]);
    setNewRx({ medicine: '', dosage: '', freq: '1-0-0', duration: '30 Days', timing: 'After meals' });
  };

  const handleRemoveRx = (id) => {
    setPrescriptions(prescriptions.filter((p) => p.id !== id));
  };

  const handleCompleteConsultation = () => {
    updatePatientStatus(currentPatient.id, 'Completed');
    setIsCompleted(true);
    addToast({
      title: 'Consultation Finalized & Signed',
      message: `Prescription saved for ${currentPatient.name}. Queue status updated to Completed.`,
      type: 'success'
    });
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black tracking-tight text-slate-900">Physician Consultation & EHR</h1>
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
              Live Examination Room
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Patient: <span className="font-bold text-slate-800">{currentPatient.name}</span> • Token {currentPatient.token || 'T01'} • UHID: {currentPatient.uhid}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => window.print()}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs transition-colors"
          >
            <Printer className="w-4 h-4 text-slate-600" />
            <span>Print Prescription Slip</span>
          </button>
          
          <button
            onClick={handleCompleteConsultation}
            disabled={isCompleted}
            className={`inline-flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-xs shadow-md transition-all ${
              isCompleted
                ? 'bg-slate-200 text-slate-500 cursor-not-allowed'
                : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-600/20'
            }`}
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>{isCompleted ? 'Consultation Signed' : 'Sign & Complete Consultation'}</span>
          </button>
        </div>
      </div>

      {/* Completion Alert */}
      {isCompleted && (
        <div className="p-5 rounded-3xl bg-emerald-50 border-2 border-emerald-300 text-emerald-950 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold">
              ✓
            </div>
            <div>
              <h3 className="font-bold text-sm">Consultation Successfully Finalized</h3>
              <p className="text-xs text-emerald-800">
                Prescription has been digitally signed and routed to the Civil Hospital Pharmacy counter.
              </p>
            </div>
          </div>
          <button
            onClick={() => navigate('/doctor/queue')}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs shadow-sm"
          >
            <span>Call Next Patient</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Main Form: Physical Exam & Assessment */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Physical Examination */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
            <Stethoscope className="w-5 h-5 text-blue-600" />
            <h2 className="font-bold text-sm text-slate-900">Physical Examination Findings</h2>
          </div>

          <div className="space-y-3 text-xs">
            <div>
              <label className="font-bold text-slate-700 block mb-1">General Examination</label>
              <textarea
                rows={2}
                value={examFindings.general}
                onChange={(e) => setExamFindings({ ...examFindings, general: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 font-medium"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Cardiovascular System (CVS)</label>
              <textarea
                rows={2}
                value={examFindings.cvs}
                onChange={(e) => setExamFindings({ ...examFindings, cvs: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 font-medium"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Respiratory System (RS)</label>
              <textarea
                rows={2}
                value={examFindings.rs}
                onChange={(e) => setExamFindings({ ...examFindings, rs: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 font-medium"
              />
            </div>
          </div>
        </div>

        {/* Diagnosis & ICD-10 */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
            <HeartPulse className="w-5 h-5 text-rose-600" />
            <h2 className="font-bold text-sm text-slate-900">Diagnosis & ICD-10 Classification</h2>
          </div>

          <div className="space-y-3 text-xs">
            <div>
              <label className="font-bold text-slate-700 block mb-1">Primary Clinical Assessment</label>
              <textarea
                rows={3}
                value={assessment}
                onChange={(e) => setAssessment(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 font-medium text-slate-900"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Primary ICD-10 Code</label>
              <select
                value={icd10Code}
                onChange={(e) => setIcd10Code(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 font-mono font-bold text-blue-900"
              >
                <option value="I20.9 - Angina pectoris, unspecified">I20.9 - Angina pectoris, unspecified</option>
                <option value="I20.8 - Other forms of angina pectoris">I20.8 - Other forms of angina pectoris</option>
                <option value="I10 - Essential (primary) hypertension">I10 - Essential (primary) hypertension</option>
                <option value="E11.9 - Type 2 diabetes mellitus without complications">E11.9 - Type 2 diabetes mellitus</option>
              </select>
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Diagnostic Investigations Ordered</label>
              <input
                type="text"
                value={investigations}
                onChange={(e) => setInvestigations(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 font-medium"
              />
            </div>
          </div>
        </div>

      </div>

      {/* Prescription Builder */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <Pill className="w-5 h-5 text-emerald-600" />
            <h2 className="font-bold text-sm text-slate-900">Prescription Rx (Civil Hospital Formulary)</h2>
          </div>
          <span className="text-xs text-slate-400">Electronic Prescription • Signed by Dr. {activeDoctor.name}</span>
        </div>

        {/* Existing Prescriptions Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 text-[11px] font-bold text-slate-500 uppercase">
                <th className="py-2.5 px-3">Medicine</th>
                <th className="py-2.5 px-3">Dosage</th>
                <th className="py-2.5 px-3">Frequency</th>
                <th className="py-2.5 px-3">Duration</th>
                <th className="py-2.5 px-3">Instructions</th>
                <th className="py-2.5 px-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {prescriptions.map((p) => (
                <tr key={p.id} className="hover:bg-slate-50">
                  <td className="py-3 px-3 font-bold text-slate-900">{p.medicine}</td>
                  <td className="py-3 px-3 font-medium text-slate-700">{p.dosage}</td>
                  <td className="py-3 px-3 font-mono font-bold text-blue-600">{p.freq}</td>
                  <td className="py-3 px-3 text-slate-600">{p.duration}</td>
                  <td className="py-3 px-3 text-slate-600">{p.timing}</td>
                  <td className="py-3 px-3 text-right">
                    <button
                      onClick={() => handleRemoveRx(p.id)}
                      className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                      title="Remove"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Add Prescription Row */}
        <form onSubmit={handleAddRx} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 grid grid-cols-1 sm:grid-cols-6 gap-2 text-xs items-end">
          <div className="sm:col-span-2">
            <label className="font-semibold text-slate-600 block mb-1">Medicine Name</label>
            <input
              type="text"
              placeholder="e.g. Tab. Amlodipine"
              value={newRx.medicine}
              onChange={(e) => setNewRx({ ...newRx, medicine: e.target.value })}
              className="w-full p-2 bg-white border border-slate-200 rounded-lg"
              required
            />
          </div>
          <div>
            <label className="font-semibold text-slate-600 block mb-1">Dose</label>
            <input
              type="text"
              placeholder="5 mg"
              value={newRx.dosage}
              onChange={(e) => setNewRx({ ...newRx, dosage: e.target.value })}
              className="w-full p-2 bg-white border border-slate-200 rounded-lg"
              required
            />
          </div>
          <div>
            <label className="font-semibold text-slate-600 block mb-1">Freq</label>
            <select
              value={newRx.freq}
              onChange={(e) => setNewRx({ ...newRx, freq: e.target.value })}
              className="w-full p-2 bg-white border border-slate-200 rounded-lg"
            >
              <option value="1-0-0">1-0-0</option>
              <option value="0-1-0">0-1-0</option>
              <option value="0-0-1">0-0-1</option>
              <option value="1-0-1">1-0-1</option>
              <option value="SOS">SOS</option>
            </select>
          </div>
          <div>
            <label className="font-semibold text-slate-600 block mb-1">Duration</label>
            <input
              type="text"
              placeholder="30 Days"
              value={newRx.duration}
              onChange={(e) => setNewRx({ ...newRx, duration: e.target.value })}
              className="w-full p-2 bg-white border border-slate-200 rounded-lg"
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full p-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg flex items-center justify-center gap-1 shadow-2xs"
            >
              <Plus className="w-4 h-4" /> Add
            </button>
          </div>
        </form>
      </div>

      {/* Follow-up & Discharge */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <label className="text-xs font-bold text-slate-700 block">Follow-Up Schedule</label>
          <input
            type="text"
            value={followUp}
            onChange={(e) => setFollowUp(e.target.value)}
            className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 w-72"
          />
        </div>

        <div className="text-right text-xs text-slate-400">
          <p>Consulting Officer: Dr. {activeDoctor.name}, MD</p>
          <p>Registration No: G-48291 • Room: {activeDoctor.room}</p>
        </div>
      </div>
    </div>
  );
};
export default DoctorConsultation;
