import React, { useState } from 'react';
import { Share2, Check, ShieldCheck, Database, RefreshCw, X, Server, CheckCircle2, ArrowRight } from 'lucide-react';
import { useDemo } from '../context/DemoContext';

export const AbdmSyncModal = () => {
  const { abdmModalOpen, setAbdmModalOpen, activePatient, addToast } = useDemo();
  const [syncStep, setSyncStep] = useState(0); // 0: idle, 1: Preparing, 2: Validating, 3: FHIR Payload, 4: Complete
  const [isSyncing, setIsSyncing] = useState(false);

  if (!abdmModalOpen) return null;

  const steps = [
    { label: "Preparing Record", desc: "Packaging clinical history & vitals" },
    { label: "Validating Data", desc: "Checking SNOMED-CT & LOINC terminology" },
    { label: "Preparing FHIR Payload", desc: "Generating bundle (DiagnosticReport, Condition, Encounter)" },
    { label: "Sync Complete", desc: "ABDM Health Information Provider (HIP) acknowledged" }
  ];

  const handleStartSync = () => {
    setIsSyncing(true);
    setSyncStep(1);

    setTimeout(() => {
      setSyncStep(2);
      setTimeout(() => {
        setSyncStep(3);
        setTimeout(() => {
          setSyncStep(4);
          setIsSyncing(false);
          addToast({
            title: "ABDM FHIR Bundle Synced",
            message: `Record synced for ABHA: ${activePatient.abhaId}`,
            type: "success"
          });
        }, 900);
      }, 900);
    }, 900);
  };

  const handleReset = () => {
    setSyncStep(0);
    setIsSyncing(false);
  };

  return (
    <div
      className="fixed inset-0 z-[1100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
    >
      <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="bg-slate-900 text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-teal-500/20 text-teal-400 border border-teal-500/30 flex items-center justify-center">
              <Share2 className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-teal-400">
                Ayushman Bharat Digital Mission
              </span>
              <h3 className="text-lg font-bold">Digital Health Integration Demo</h3>
            </div>
          </div>
          <button
            onClick={() => setAbdmModalOpen(false)}
            className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-5">
          {/* Status grid */}
          <div className="grid grid-cols-2 gap-2.5 text-xs">
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
              <div className="flex items-center justify-between text-slate-500 mb-1">
                <span>ABHA ID</span>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
              </div>
              <p className="font-bold text-slate-800 font-mono text-[11px]">{activePatient.abhaId}</p>
              <p className="text-[10px] text-emerald-700 font-medium mt-0.5">✓ Patient Identified</p>
            </div>

            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
              <div className="flex items-center justify-between text-slate-500 mb-1">
                <span>FHIR Bundle</span>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
              </div>
              <p className="font-bold text-slate-800">FHIR R4 Compliant</p>
              <p className="text-[10px] text-emerald-700 font-medium mt-0.5">✓ Ready to Sync</p>
            </div>

            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
              <div className="flex items-center justify-between text-slate-500 mb-1">
                <span>Hospital HIS</span>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
              </div>
              <p className="font-bold text-slate-800">Civil OPD Gateway</p>
              <p className="text-[10px] text-emerald-700 font-medium mt-0.5">✓ Connected</p>
            </div>

            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
              <div className="flex items-center justify-between text-slate-500 mb-1">
                <span>ABDM Gateway</span>
                <ShieldCheck className="w-3.5 h-3.5 text-teal-600" />
              </div>
              <p className="font-bold text-slate-800">Sandbox v2</p>
              <p className="text-[10px] text-teal-700 font-medium mt-0.5">Demo Integration</p>
            </div>
          </div>

          {/* Sync Progress Pipeline */}
          <div className="bg-slate-50/80 p-4 rounded-2xl border border-slate-200/80">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
              Sync Pipeline Execution
            </h4>
            <div className="space-y-3">
              {steps.map((step, idx) => {
                const stepNum = idx + 1;
                const isDone = syncStep > stepNum || syncStep === 4;
                const isCurrent = syncStep === stepNum && syncStep !== 4;
                const isPending = syncStep < stepNum;

                return (
                  <div key={step.label} className="flex items-start gap-3 text-xs">
                    <div className="mt-0.5">
                      {isDone ? (
                        <div className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center">
                          <Check className="w-3 h-3 stroke-[3]" />
                        </div>
                      ) : isCurrent ? (
                        <div className="w-5 h-5 rounded-full bg-teal-600 text-white flex items-center justify-center animate-spin">
                          <RefreshCw className="w-3 h-3" />
                        </div>
                      ) : (
                        <div className="w-5 h-5 rounded-full border border-slate-300 bg-white text-slate-400 flex items-center justify-center font-bold text-[10px]">
                          {stepNum}
                        </div>
                      )}
                    </div>
                    <div>
                      <p className={`font-bold ${isCurrent ? 'text-teal-700' : isDone ? 'text-slate-800' : 'text-slate-400'}`}>
                        {step.label}
                      </p>
                      <p className="text-[11px] text-slate-500">{step.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Safe Disclaimer */}
          <p className="text-[11px] text-slate-500 text-center italic bg-teal-50/70 p-2.5 rounded-xl border border-teal-100">
            Prototype Demo — Designed for ABHA/ABDM interoperability demonstration. No real health data is transmitted.
          </p>

          <div className="flex gap-3 pt-2">
            {syncStep === 4 ? (
              <button
                type="button"
                onClick={handleReset}
                className="flex-1 py-3 px-4 rounded-xl font-bold text-sm bg-teal-600 text-white hover:bg-teal-700 transition-colors flex items-center justify-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Sync Complete – Reset Demo</span>
              </button>
            ) : (
              <button
                type="button"
                disabled={isSyncing}
                onClick={handleStartSync}
                className="flex-1 py-3 px-4 rounded-xl font-bold text-sm bg-teal-600 text-white hover:bg-teal-700 disabled:opacity-60 transition-colors flex items-center justify-center gap-2 shadow-sm"
              >
                {isSyncing ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Synchronizing with ABDM...</span>
                  </>
                ) : (
                  <>
                    <Share2 className="w-4 h-4" />
                    <span>Sync Patient Record Now</span>
                  </>
                )}
              </button>
            )}
            <button
              type="button"
              onClick={() => setAbdmModalOpen(false)}
              className="py-3 px-4 rounded-xl border border-slate-200 font-semibold text-slate-700 hover:bg-slate-50 text-sm"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
