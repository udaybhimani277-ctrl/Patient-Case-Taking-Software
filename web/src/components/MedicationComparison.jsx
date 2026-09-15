import React from 'react';
import { AlertTriangle, CheckCircle2, Pill, ShieldAlert, Check, RefreshCw } from 'lucide-react';

export const MedicationComparison = ({ 
  medications = [], 
  onResolveDiscrepancy = () => {} 
}) => {
  return (
    <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-200 flex items-center gap-1">
              <AlertTriangle className="w-3 h-3 text-amber-600" />
              Medication Audit
            </span>
            <span className="text-xs text-slate-400 font-mono">3-Way Cross-Check</span>
          </div>
          <h3 className="text-lg font-bold text-slate-900 mt-1">
            Medication Reconciliation Matrix
          </h3>
          <p className="text-xs text-slate-500">
            Triangulates patient verbal claims, past hospital archives, and current pharmacy orders.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-600 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200">
            {medications.filter(m => m.hasDiscrepancy).length} Discrepancy Flagged
          </span>
        </div>
      </div>

      {/* Discrepancy Warning Callout */}
      {medications.some(m => m.hasDiscrepancy) && (
        <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div className="text-xs text-amber-900 space-y-1">
            <strong className="font-bold text-amber-950">Medication Discrepancy Detected:</strong>
            <p>
              Inconsistent statin dosing frequency detected between patient verbal statement and active cardiology prescription. Physician verification and patient adherence counseling recommended.
            </p>
          </div>
        </div>
      )}

      {/* Comparison Grid Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-200 text-[11px] uppercase tracking-wider text-slate-400 bg-slate-50/70">
              <th className="py-3 px-4 rounded-l-xl">Medication</th>
              <th className="py-3 px-4">Patient Reported (Intake)</th>
              <th className="py-3 px-4">Previous Document</th>
              <th className="py-3 px-4">Current Prescription</th>
              <th className="py-3 px-4 rounded-r-xl text-right">Physician Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-xs">
            {medications.map((med) => (
              <tr 
                key={med.id}
                className={`transition-colors ${med.hasDiscrepancy ? 'bg-amber-50/30 hover:bg-amber-50/60' : 'hover:bg-slate-50/60'}`}
              >
                <td className="py-3.5 px-4 font-bold text-slate-900">
                  <div className="flex items-center gap-2">
                    <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${
                      med.hasDiscrepancy ? 'bg-amber-100 text-amber-700' : 'bg-blue-50 text-blue-700'
                    }`}>
                      <Pill className="w-4 h-4" />
                    </div>
                    <span>{med.name}</span>
                  </div>
                </td>
                <td className="py-3.5 px-4 text-slate-700 font-medium">
                  {med.patientReported}
                </td>
                <td className="py-3.5 px-4 text-slate-600">
                  {med.previousRecord}
                </td>
                <td className="py-3.5 px-4 text-slate-800 font-semibold">
                  {med.currentPrescription}
                </td>
                <td className="py-3.5 px-4 text-right">
                  {med.hasDiscrepancy ? (
                    <button
                      type="button"
                      onClick={() => onResolveDiscrepancy(med.id)}
                      className="px-3 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-[11px] transition-colors inline-flex items-center gap-1 shadow-2xs"
                    >
                      <Check className="w-3.5 h-3.5" />
                      <span>Reconcile & Resolve</span>
                    </button>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      Consistent
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Clinical Disclaimer */}
      <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 text-[11px] text-slate-500 flex items-center justify-between">
        <span><strong>Mandatory Clinical Protocol:</strong> MediKiosk surfaces comparison data for doctor review only. Never instruct patients to change medication independently.</span>
      </div>
    </div>
  );
};
