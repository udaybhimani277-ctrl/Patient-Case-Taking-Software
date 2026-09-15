import React, { useState } from 'react';
import { AlertTriangle, BellRing, Check, X, ShieldAlert, HeartPulse, ArrowRight } from 'lucide-react';
import { useDemo } from '../context/DemoContext';

export const TriageAlertModal = () => {
  const { triageModalOpen, setTriageModalOpen, activePatient, addToast } = useDemo();
  const [isNotifying, setIsNotifying] = useState(false);
  const [notifiedSuccess, setNotifiedSuccess] = useState(false);

  if (!triageModalOpen) return null;

  const handleDispatchNotification = () => {
    setIsNotifying(true);
    setTimeout(() => {
      setIsNotifying(false);
      setNotifiedSuccess(true);
      addToast({
        title: "Triage Alert Acknowledged",
        message: "OPD Triage Nurse has received the telemetry packet.",
        type: "success"
      });
      setTimeout(() => {
        setNotifiedSuccess(false);
        setTriageModalOpen(false);
      }, 2500);
    }, 1200);
  };

  return (
    <div 
      className="fixed inset-0 z-[1100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="triage-modal-title"
    >
      <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl border border-red-200 overflow-hidden relative">
        {/* Urgent header bar */}
        <div className="bg-rose-600 text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/20 flex items-center justify-center text-white ring-2 ring-white/30 animate-pulse">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-rose-100">
                Clinical Safety Check
              </span>
              <h3 id="triage-modal-title" className="text-lg font-bold leading-snug">
                ⚠️ Priority Attention Required
              </h3>
            </div>
          </div>
          <button
            onClick={() => setTriageModalOpen(false)}
            className="p-2 rounded-xl text-rose-100 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-5">
          <div className="bg-rose-50/80 border border-rose-200/90 rounded-2xl p-4 text-rose-900 text-sm">
            <div className="flex items-start gap-3">
              <ShieldAlert className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold">Potential red-flag symptoms detected:</p>
                <p className="mt-1 text-rose-800 text-xs leading-relaxed">
                  Patient reported <span className="font-bold">acute substernal chest discomfort with exertional dyspnea</span>.
                  Clinical protocols require priority physical examination and 12-lead ECG review by on-duty physician.
                </p>
              </div>
            </div>
          </div>

          {/* Vitals Snapshot */}
          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/80 text-xs">
            <div className="flex items-center justify-between mb-2">
              <span className="font-bold text-slate-700 flex items-center gap-1.5">
                <HeartPulse className="w-4 h-4 text-rose-600" />
                Vitals Telemetry ({activePatient.name} – {activePatient.id})
              </span>
              <span className="px-2 py-0.5 rounded-full font-bold bg-rose-100 text-rose-800 border border-rose-200">
                HIGH PRIORITY
              </span>
            </div>
            <div className="grid grid-cols-3 gap-2 text-center pt-2">
              <div className="bg-white p-2 rounded-xl border border-slate-200">
                <p className="text-slate-400 text-[10px]">BLOOD PRESSURE</p>
                <p className="font-bold text-slate-800 text-sm">{activePatient.vitals?.bloodPressure || "148/92"}</p>
              </div>
              <div className="bg-white p-2 rounded-xl border border-slate-200">
                <p className="text-slate-400 text-[10px]">HEART RATE</p>
                <p className="font-bold text-slate-800 text-sm">{activePatient.vitals?.heartRate || "98 bpm"}</p>
              </div>
              <div className="bg-white p-2 rounded-xl border border-slate-200">
                <p className="text-slate-400 text-[10px]">OXYGEN (SpO2)</p>
                <p className="font-bold text-slate-800 text-sm">{activePatient.vitals?.spO2 || "94%"}</p>
              </div>
            </div>
          </div>

          {/* Disclaimer banner */}
          <p className="text-[11px] text-slate-500 italic text-center bg-slate-100/60 p-2.5 rounded-xl border border-slate-200/60">
            ⚠️ Prototype Demonstration: Red-flag triage visualization only. This system does not replace direct clinical diagnosis by qualified medical staff.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              type="button"
              disabled={isNotifying || notifiedSuccess}
              onClick={handleDispatchNotification}
              className={`flex-1 py-3 px-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-sm transition-all ${
                notifiedSuccess
                  ? 'bg-emerald-600 text-white'
                  : 'bg-rose-600 text-white hover:bg-rose-700 active:scale-98'
              }`}
            >
              {isNotifying ? (
                <>
                  <BellRing className="w-4 h-4 animate-bounce" />
                  <span>Dispatching to Triage Desk...</span>
                </>
              ) : notifiedSuccess ? (
                <>
                  <Check className="w-4 h-4 stroke-[3]" />
                  <span>Triage Staff Notified!</span>
                </>
              ) : (
                <>
                  <BellRing className="w-4 h-4" />
                  <span>Notify Triage Staff Now</span>
                </>
              )}
            </button>
            <button
              type="button"
              onClick={() => setTriageModalOpen(false)}
              className="py-3 px-4 rounded-xl border border-slate-200 font-semibold text-slate-700 hover:bg-slate-50 text-sm"
            >
              Dismiss
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
