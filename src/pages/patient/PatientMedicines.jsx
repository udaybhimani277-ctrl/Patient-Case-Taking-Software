import React, { useState } from 'react';
import {
  Pill,
  ShieldAlert,
  AlertTriangle,
  CheckCircle2,
  Plus,
  Clock,
  FileText,
  HelpCircle,
  X,
  Sparkles,
  Info
} from 'lucide-react';
import { useDemo } from '../../context/DemoContext';

export const PatientMedicines = () => {
  const { medications, addToast } = useDemo();

  const [showAddModal, setShowAddModal] = useState(false);
  const [newMed, setNewMed] = useState({
    name: '',
    dosage: '',
    frequency: 'Once Daily (OD)',
    reason: ''
  });

  const allergies = [
    {
      id: "ALG-01",
      allergen: "Penicillin (Beta-Lactam)",
      severity: "High",
      reaction: "Cutaneous urticaria, pruritus, facial erythema",
      source: "Patient Verbal History & EMR Flag",
      status: "Verified",
      date: "Diagnosed 2018"
    },
    {
      id: "ALG-02",
      allergen: "Sulfa Antibiotics",
      severity: "Low / Denied",
      reaction: "No prior adverse reaction documented",
      source: "Patient Intake Question",
      status: "Verified",
      date: "Checked Today"
    }
  ];

  const handleAddMedicine = (e) => {
    e.preventDefault();
    if (!newMed.name.trim()) return;

    addToast({
      title: "Medication Reported",
      message: `${newMed.name} ${newMed.dosage} added to intake review for physician confirmation.`,
      type: "success"
    });
    setShowAddModal(false);
    setNewMed({ name: '', dosage: '', frequency: 'Once Daily (OD)', reason: '' });
  };

  return (
    <div className="space-y-6 sm:space-y-8 max-w-4xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-teal-50 text-teal-700 border border-teal-200">
              Pharmacotherapy & Safety
            </span>
            <span className="text-xs text-slate-500">Cross-Referenced with OCR</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
            Medicines & Allergy Reconciliation
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Cross-verifies patient self-reported medicines against physical prescriptions and past hospital records.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2.5 rounded-xl bg-teal-600 text-white hover:bg-teal-700 font-bold text-xs flex items-center gap-2 shadow-sm shadow-teal-600/25 transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Report Another Medicine</span>
        </button>
      </div>

      {/* Medication Reconciliation Discrepancy Banner */}
      <div className="bg-amber-50 rounded-3xl p-6 border-2 border-amber-300 shadow-xs space-y-3">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-2xl bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-sm">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h3 className="text-sm sm:text-base font-bold text-amber-950">
                ⚠ Medication Discrepancy Detected
              </h3>
              <span className="px-2 py-0.5 rounded bg-amber-200/80 text-amber-900 font-mono text-[10px] font-bold">
                Clinical Flag
              </span>
            </div>
            <p className="text-xs text-amber-900 leading-relaxed">
              Discrepancy identified between your active prescription (Atorvastatin 10mg Daily) and your self-reported frequency ("taking only 2-3 times per week").
            </p>
            <p className="text-[11px] font-bold text-amber-950 pt-1">
              "Please review this discrepancy with your doctor during consultation. Do not stop or alter dosages on your own."
            </p>
          </div>
        </div>
      </div>

      {/* Section 1: Medication Reconciliation Comparison Cards */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Pill className="w-4 h-4 text-teal-600" />
            Current & Previous Medicines Cross-Check
          </h3>
          <span className="text-xs text-slate-500">Source Tracing Active</span>
        </div>

        <div className="grid grid-cols-1 gap-3.5">
          {medications.map((med) => (
            <div
              key={med.id}
              className={`bg-white rounded-3xl p-5 border shadow-2xs transition-all space-y-3 ${
                med.hasDiscrepancy ? 'border-amber-300 bg-amber-50/20' : 'border-slate-200'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold ${
                    med.hasDiscrepancy ? 'bg-amber-100 text-amber-800' : 'bg-teal-50 text-teal-700'
                  }`}>
                    <Pill className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">{med.name}</h4>
                    <p className="text-[11px] text-slate-500 font-semibold">{med.status}</p>
                  </div>
                </div>

                <span className={`px-2.5 py-1 rounded-full text-xs font-bold w-fit ${
                  med.hasDiscrepancy
                    ? 'bg-amber-100 text-amber-900 border border-amber-200'
                    : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                }`}>
                  {med.hasDiscrepancy ? "⚠ Discrepancy" : "✓ Verified Match"}
                </span>
              </div>

              {/* Triple Comparison Grid: Patient Reported vs Previous vs Active */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs pt-1">
                <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100">
                  <p className="text-[10px] font-bold uppercase text-slate-400">Patient Reported</p>
                  <p className="font-bold text-slate-800 mt-0.5">{med.patientReported}</p>
                </div>
                <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100">
                  <p className="text-[10px] font-bold uppercase text-slate-400">Past Medical Record</p>
                  <p className="font-semibold text-slate-700 mt-0.5">{med.previousRecord}</p>
                </div>
                <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100">
                  <p className="text-[10px] font-bold uppercase text-slate-400">Current Rx (Active)</p>
                  <p className="font-semibold text-slate-700 mt-0.5">{med.currentPrescription}</p>
                </div>
              </div>

              {med.recommendation && (
                <div className="bg-blue-50/60 p-3 rounded-xl border border-blue-100 text-[11px] text-blue-900 flex items-start gap-1.5">
                  <Info className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                  <span><strong>Clinical Context:</strong> {med.recommendation}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Section 2: Allergy Verification Cards */}
      <div className="space-y-4 pt-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-rose-600" />
            Documented Allergies & Adverse Reactions
          </h3>
          <span className="text-xs text-rose-600 font-bold bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
            High Priority Alert
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {allergies.map((alg) => (
            <div
              key={alg.id}
              className="bg-white rounded-3xl p-5 border border-slate-200 shadow-2xs space-y-3"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center font-bold text-xs">
                    !
                  </div>
                  <h4 className="text-sm font-bold text-slate-900">{alg.allergen}</h4>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded font-bold bg-rose-100 text-rose-800">
                  {alg.severity} Severity
                </span>
              </div>

              <div className="text-xs space-y-1 bg-rose-50/40 p-3 rounded-2xl border border-rose-100">
                <p className="text-[10px] font-bold text-rose-900 uppercase">Documented Reaction:</p>
                <p className="text-slate-700 font-medium">{alg.reaction}</p>
              </div>

              <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
                <span>Source: {alg.source}</span>
                <span className="text-emerald-700 font-bold">✓ {alg.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Safety Notice */}
      <div className="p-4 rounded-2xl bg-slate-100 border border-slate-200 text-slate-600 text-xs flex items-start gap-2">
        <HelpCircle className="w-4 h-4 shrink-0 text-slate-400 mt-0.5" />
        <p>
          MediKiosk strictly cross-references reported and extracted medications for physician verification. It does not automatically modify, start, or cease prescriptions.
        </p>
      </div>

      {/* Add Medicine Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl border border-slate-200 space-y-4 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900">Report Additional Medicine</h3>
              <button onClick={() => setShowAddModal(false)} className="p-1 text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddMedicine} className="space-y-3">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Medicine Name *</label>
                <input
                  type="text"
                  required
                  value={newMed.name}
                  onChange={(e) => setNewMed({ ...newMed, name: e.target.value })}
                  placeholder="e.g. Metformin or Telmisartan"
                  className="w-full text-xs p-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Dosage</label>
                  <input
                    type="text"
                    value={newMed.dosage}
                    onChange={(e) => setNewMed({ ...newMed, dosage: e.target.value })}
                    placeholder="e.g. 500 mg or 40 mg"
                    className="w-full text-xs p-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Frequency</label>
                  <select
                    value={newMed.frequency}
                    onChange={(e) => setNewMed({ ...newMed, frequency: e.target.value })}
                    className="w-full text-xs p-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white"
                  >
                    <option>Once Daily (OD)</option>
                    <option>Twice Daily (BD)</option>
                    <option>Thrice Daily (TDS)</option>
                    <option>As Needed (PRN)</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Condition / Reason</label>
                <input
                  type="text"
                  value={newMed.reason}
                  onChange={(e) => setNewMed({ ...newMed, reason: e.target.value })}
                  placeholder="e.g. For blood sugar control"
                  className="w-full text-xs p-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 text-xs font-bold hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-teal-600 text-white text-xs font-bold hover:bg-teal-700 shadow-sm"
                >
                  Add to Case
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default PatientMedicines;
