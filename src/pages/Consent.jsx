import React from 'react';
import { useDemo } from '../context/DemoContext';
import { AudioInstructionBtn } from '../components/AudioInstructionBtn';
import { 
  ShieldCheck, 
  Lock, 
  Mic, 
  FileText, 
  Share2, 
  Database, 
  CheckCircle2, 
  XCircle, 
  RefreshCcw, 
  AlertCircle,
  Clock,
  Key
} from 'lucide-react';

export const Consent = () => {
  const { consentSettings, setConsentSettings, addToast } = useDemo();

  const handleToggle = (key) => {
    setConsentSettings(prev => {
      const updated = { ...prev, [key]: !prev[key] };
      addToast({
        title: "Consent Preference Updated",
        message: `${key.replace(/([A-Z])/g, ' $1').toUpperCase()} set to ${updated[key] ? 'ENABLED' : 'DISABLED'}.`,
        type: "info"
      });
      return updated;
    });
  };

  const handleGrantAll = () => {
    setConsentSettings({
      dataCollection: true,
      voiceRecording: true,
      medicalDocuments: true,
      clinicalHistory: true,
      recordSharing: true,
      grantedAt: "2026-09-11 15:45",
      version: "v2.1-DPDP"
    });
    addToast({
      title: "All Consents Granted",
      message: "Patient authorized full digital intake processing.",
      type: "success"
    });
  };

  const handleRevokeAll = () => {
    setConsentSettings({
      dataCollection: false,
      voiceRecording: false,
      medicalDocuments: false,
      clinicalHistory: false,
      recordSharing: false,
      grantedAt: null,
      version: "v2.1-DPDP"
    });
    addToast({
      title: "Consent Revoked",
      message: "All optional processing disabled. Session data purge scheduled.",
      type: "warning"
    });
  };

  const consentItems = [
    {
      key: "dataCollection",
      title: "1. Primary Intake Data Collection",
      desc: "Permission to capture basic demographics (Name, Age, Gender, Mobile, ABHA ID) strictly for your OPD consultation.",
      icon: Database,
      mandatory: true
    },
    {
      key: "voiceRecording",
      title: "2. Voice Audio Processing",
      desc: "Permission to temporarily convert spoken native language responses into structured clinical text on the kiosk.",
      icon: Mic,
      mandatory: false
    },
    {
      key: "medicalDocuments",
      title: "3. Medical Document Digitization (OCR)",
      desc: "Permission to scan past paper prescriptions and laboratory reports to detect historical treatments and lab ranges.",
      icon: FileText,
      mandatory: false
    },
    {
      key: "clinicalHistory",
      title: "4. AI Clinical History Structuring",
      desc: "Permission for our clinical model to organize your symptoms into a structured SOAP pre-brief draft for your doctor.",
      icon: ShieldCheck,
      mandatory: false
    },
    {
      key: "recordSharing",
      title: "5. Interoperable Record Sharing (ABDM/FHIR)",
      desc: "Permission to package the completed consultation summary into your personal Ayushman Bharat Digital Health Locker.",
      icon: Share2,
      mandatory: false
    }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6 py-4">
      
      {/* Header Banner */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-teal-50 text-teal-800 border border-teal-200 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-teal-600" />
                DPDP Principle Framework
              </span>
              <span className="text-xs text-slate-400 font-mono">Notice & Choice</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-2">
              Privacy & Patient Consent
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              You maintain full sovereignty over your health data. Choose what the kiosk is permitted to process during this OPD intake.
            </p>
          </div>

          <AudioInstructionBtn
            label="Listen to Consent Explanation"
            text="Your health data is private. You can choose whether to allow voice recording, old document scanning, and sharing with your Ayushman Bharat Health Locker."
          />
        </div>

        {/* Essential Notice Callout */}
        <div className="mt-6 p-4 bg-teal-50/70 border border-teal-200 rounded-2xl flex items-start gap-3 text-xs text-teal-950">
          <Lock className="w-4 h-4 text-teal-700 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold">Consent is required before processing patient information.</span> Your explicit approval is captured with cryptographic timestamps for the hospital session audit log.
          </div>
        </div>

        {/* Granular Consent Cards */}
        <div className="mt-6 space-y-3">
          {consentItems.map((item) => {
            const Icon = item.icon;
            const isGranted = consentSettings[item.key];
            return (
              <div
                key={item.key}
                className={`p-4 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                  isGranted
                    ? 'bg-white border-teal-200 shadow-2xs'
                    : 'bg-slate-50/80 border-slate-200 opacity-80'
                }`}
              >
                <div className="flex items-start gap-3 max-w-xl">
                  <div className={`p-2.5 rounded-xl shrink-0 ${isGranted ? 'bg-teal-50 text-teal-700' : 'bg-slate-200 text-slate-500'}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-xs font-bold text-slate-900">{item.title}</h4>
                      {item.mandatory && (
                        <span className="text-[10px] font-bold text-amber-800 bg-amber-50 px-1.5 py-0.2 rounded border border-amber-200">
                          Mandatory
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>

                {/* Switch Toggle */}
                <button
                  type="button"
                  onClick={() => handleToggle(item.key)}
                  className={`w-12 h-6 rounded-full transition-colors relative self-end sm:self-center shrink-0 focus:outline-hidden ${
                    isGranted ? 'bg-teal-600' : 'bg-slate-300'
                  }`}
                  aria-label={`Toggle ${item.title}`}
                >
                  <span
                    className={`block w-4 h-4 rounded-full bg-white shadow-xs transition-transform transform ${
                      isGranted ? 'translate-x-7' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            );
          })}
        </div>

        {/* Global Consent Buttons */}
        <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs text-slate-500 font-mono">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            <span>Timestamp: {consentSettings.grantedAt || "Not Granted"} • Version: {consentSettings.version}</span>
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            <button
              type="button"
              onClick={handleRevokeAll}
              className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl border border-rose-200 text-rose-700 hover:bg-rose-50 font-bold text-xs transition-colors"
            >
              Revoke Consent
            </button>

            <button
              type="button"
              onClick={handleGrantAll}
              className="flex-1 sm:flex-initial px-6 py-2.5 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs shadow-xs transition-colors"
            >
              Grant All Consents
            </button>
          </div>
        </div>

      </div>

      {/* Security Architecture Highlights Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs space-y-2">
          <div className="w-8 h-8 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <h4 className="text-xs font-bold text-slate-900">DPDP-Ready Design</h4>
          <p className="text-[11px] text-slate-500 leading-relaxed">
            Architected according to India's Digital Personal Data Protection Act with purpose limitation and opt-out support.
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs space-y-2">
          <div className="w-8 h-8 rounded-xl bg-cyan-50 text-cyan-700 flex items-center justify-center">
            <Lock className="w-4 h-4" />
          </div>
          <h4 className="text-xs font-bold text-slate-900">Consent-First Flow</h4>
          <p className="text-[11px] text-slate-500 leading-relaxed">
            No audio processing or medical OCR starts until you acknowledge the on-screen and audio disclosures.
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs space-y-2">
          <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
            <Key className="w-4 h-4" />
          </div>
          <h4 className="text-xs font-bold text-slate-900">Secure Processing</h4>
          <p className="text-[11px] text-slate-500 leading-relaxed">
            Session tokens use TLS 1.3 in-transit encryption with zero unauthorized external API telemetry.
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs space-y-2">
          <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center">
            <Clock className="w-4 h-4" />
          </div>
          <h4 className="text-xs font-bold text-slate-900">Temporary Sessions</h4>
          <p className="text-[11px] text-slate-500 leading-relaxed">
            Kiosk memory flushes automatically after physician handoff, preventing subsequent patient record leakage.
          </p>
        </div>

      </div>

      {/* Non-Legal Compliance Disclaimer (MANDATORY REQUIREMENT) */}
      <div className="p-4 bg-slate-100 rounded-2xl border border-slate-200 text-center text-xs text-slate-500">
        <p>
          <strong className="text-slate-700">Prototype Disclaimer:</strong> Designed with privacy and consent principles in mind. This interface demonstrates consent management for academic and prototype evaluation. It does not constitute legal certification or statutory compliance certification.
        </p>
      </div>

    </div>
  );
};
