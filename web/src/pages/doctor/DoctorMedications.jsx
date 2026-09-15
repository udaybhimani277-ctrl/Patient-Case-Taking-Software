import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Pill,
  AlertTriangle,
  CheckCircle2,
  AlertCircle,
  Plus,
  Trash2,
  Edit3,
  ShieldAlert,
  ArrowRight,
  Sparkles,
  RotateCcw
} from 'lucide-react';
import { useDemo } from '../../context/DemoContext';

export const DoctorMedications = () => {
  const { patientId } = useParams();
  const {
    patients,
    activePatient,
    activeDoctor,
    addToast
  } = useDemo();

  const currentPatient = patients.find((p) => p.id === patientId) || activePatient;

  const [medications, setMedications] = useState([
    {
      id: 1,
      name: 'Telmisartan',
      prescribedDose: '40 mg OD (Morning)',
      actualDose: '40 mg OD',
      adherence: 'High',
      status: 'Reconciled',
      notes: 'Blood pressure control'
    },
    {
      id: 2,
      name: 'Metformin',
      prescribedDose: '500 mg BD (After Meals)',
      actualDose: '500 mg BD',
      adherence: 'High',
      status: 'Reconciled',
      notes: 'T2DM glycemic control'
    },
    {
      id: 3,
      name: 'Atorvastatin',
      prescribedDose: '20 mg HS (Bedtime)',
      actualDose: '10 mg HS',
      adherence: 'Under-dosing (Discrepancy)',
      status: 'Flagged',
      notes: 'Patient halved tablet due to reported morning nausea'
    },
    {
      id: 4,
      name: 'Aspirin (Ecosprin)',
      prescribedDose: '75 mg OD',
      actualDose: 'Omitted by patient',
      adherence: 'Non-Adherent (Discrepancy)',
      status: 'Flagged',
      notes: 'Stopped 2 months ago without doctor consultation'
    }
  ]);

  const [allergies, setAllergies] = useState([
    { allergen: 'Penicillin (Beta-Lactams)', reaction: 'Severe Urticaria & Angioedema (2016)', severity: 'Critical' },
    { allergen: 'Diclofenac / NSAIDs', reaction: 'Gastric Pyrosis & Dyspepsia', severity: 'Moderate' }
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [newMed, setNewMed] = useState({
    name: '',
    dose: '',
    freq: 'Once Daily (OD)',
    timing: 'Morning'
  });

  const handleResolveFlag = (medId, action) => {
    setMedications((prev) =>
      prev.map((m) =>
        m.id === medId
          ? {
              ...m,
              status: 'Reconciled',
              adherence: 'Reconciled by Doctor',
              notes: `Physician resolved: ${action}`
            }
          : m
      )
    );
    addToast({
      title: 'Medication Reconciled',
      message: `Adjusted dosage and recorded physician rationale.`,
      type: 'success'
    });
  };

  const handleAddMedication = (e) => {
    e.preventDefault();
    if (!newMed.name) return;

    // Check allergy conflict
    if (newMed.name.toLowerCase().includes('penicillin') || newMed.name.toLowerCase().includes('amoxicillin')) {
      addToast({
        title: 'ALLERGY WARNING BLOCKED',
        message: 'Patient has documented severe allergy to Penicillin!',
        type: 'error'
      });
      return;
    }

    const added = {
      id: Date.now(),
      name: newMed.name,
      prescribedDose: `${newMed.dose} ${newMed.freq} (${newMed.timing})`,
      actualDose: `${newMed.dose} ${newMed.freq}`,
      adherence: 'New Prescription',
      status: 'Reconciled',
      notes: `Added by Dr. ${activeDoctor.name}`
    };

    setMedications([...medications, added]);
    setShowAddModal(false);
    setNewMed({ name: '', dose: '', freq: 'Once Daily (OD)', timing: 'Morning' });
    addToast({
      title: 'Medication Added',
      message: `${added.name} added to current prescription regimen.`,
      type: 'success'
    });
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-slate-900">Medication Reconciliation Board</h1>
          <p className="text-xs text-slate-500 mt-1">
            Compare past prescription orders with actual intake reported at the kiosk for <span className="font-bold text-slate-800">{currentPatient.name}</span>
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-500/20 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Regimen</span>
        </button>
      </div>

      {/* Allergy Alert Banner */}
      <div className="bg-rose-50 border-2 border-rose-200 rounded-3xl p-5 text-rose-950 flex items-start gap-4">
        <div className="w-10 h-10 rounded-xl bg-rose-600 text-white flex items-center justify-center shrink-0 shadow-sm shadow-rose-600/20">
          <ShieldAlert className="w-5 h-5" />
        </div>
        <div className="space-y-1.5 flex-1">
          <div className="flex items-center justify-between">
            <span className="font-bold text-xs uppercase tracking-wider text-rose-900">
              Documented Drug Allergies & Contraindications
            </span>
            <span className="px-2 py-0.5 rounded-full bg-rose-200 text-rose-800 text-[10px] font-mono font-bold">
              2 ACTIVE ALERTS
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs pt-1">
            {allergies.map((al, idx) => (
              <div key={idx} className="p-2.5 bg-white/80 rounded-xl border border-rose-200">
                <span className="font-bold text-rose-900">{al.allergen}</span>
                <p className="text-[11px] text-rose-800 mt-0.5">{al.reaction}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Medication Reconciliation Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Pill className="w-5 h-5 text-blue-600" />
            <h2 className="font-bold text-sm text-slate-900">Active Reconciliation Matrix</h2>
          </div>
          <span className="text-xs text-slate-500">
            {medications.filter((m) => m.status === 'Flagged').length} Discrepancies Require Doctor Resolution
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                <th className="py-3 px-4">Medication</th>
                <th className="py-3 px-4">Prescribed Regimen</th>
                <th className="py-3 px-4">Actual Intake (Kiosk)</th>
                <th className="py-3 px-4">Status & Notes</th>
                <th className="py-3 px-4 text-right">Doctor Resolution</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {medications.map((m) => {
                const isFlagged = m.status === 'Flagged';
                return (
                  <tr
                    key={m.id}
                    className={`hover:bg-slate-50 transition-colors ${
                      isFlagged ? 'bg-amber-50/40' : ''
                    }`}
                  >
                    <td className="py-3.5 px-4 font-bold text-slate-900">
                      <div className="flex items-center gap-2">
                        <span className="w-7 h-7 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center text-xs font-black">
                          Rx
                        </span>
                        <span>{m.name}</span>
                      </div>
                    </td>

                    <td className="py-3.5 px-4 font-medium text-slate-700">
                      {m.prescribedDose}
                    </td>

                    <td className="py-3.5 px-4">
                      <span
                        className={`font-semibold ${
                          isFlagged ? 'text-amber-800 font-bold' : 'text-slate-800'
                        }`}
                      >
                        {m.actualDose}
                      </span>
                      <span className="text-[10px] text-slate-400 block">{m.adherence}</span>
                    </td>

                    <td className="py-3.5 px-4 max-w-xs">
                      <p className="text-[11px] text-slate-600 leading-tight">{m.notes}</p>
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      {isFlagged ? (
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => handleResolveFlag(m.id, 'Counsel patient & reinstate full prescribed dose')}
                            className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[11px] transition-colors"
                          >
                            Reinstate 20mg
                          </button>
                          <button
                            onClick={() => handleResolveFlag(m.id, 'Endorsed lower dose 10mg due to GI intolerance')}
                            className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-[11px] transition-colors"
                          >
                            Keep 10mg
                          </button>
                        </div>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-emerald-700 font-bold text-[11px]">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Reconciled</span>
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Regimen Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-4">
            <h3 className="font-bold text-base text-slate-900">Add New Prescription / Regimen</h3>
            <form onSubmit={handleAddMedication} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Medication Name</label>
                <input
                  type="text"
                  placeholder="e.g. Nitroglycerin / Sorbitrate"
                  value={newMed.name}
                  onChange={(e) => setNewMed({ ...newMed, name: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Strength / Dosage</label>
                <input
                  type="text"
                  placeholder="e.g. 5 mg Sublingual"
                  value={newMed.dose}
                  onChange={(e) => setNewMed({ ...newMed, dose: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Frequency</label>
                  <select
                    value={newMed.freq}
                    onChange={(e) => setNewMed({ ...newMed, freq: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 font-medium"
                  >
                    <option value="Once Daily (OD)">Once Daily (OD)</option>
                    <option value="Twice Daily (BD)">Twice Daily (BD)</option>
                    <option value="Thrice Daily (TDS)">Thrice Daily (TDS)</option>
                    <option value="SOS (As needed for pain)">SOS (As needed)</option>
                  </select>
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Timing</label>
                  <select
                    value={newMed.timing}
                    onChange={(e) => setNewMed({ ...newMed, timing: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 font-medium"
                  >
                    <option value="Morning">Morning</option>
                    <option value="Bedtime">Bedtime</option>
                    <option value="After Meals">After Meals</option>
                    <option value="With Onset of Chest Pain">With Chest Pain</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-blue-600 text-white font-bold text-xs hover:bg-blue-700 shadow-sm"
                >
                  Save Regimen
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
export default DoctorMedications;
