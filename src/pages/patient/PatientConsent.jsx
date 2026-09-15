import React, { useState } from 'react';
import {
  ShieldCheck,
  Volume2,
  Lock,
  Eye,
  FileCheck2,
  AlertCircle,
  HelpCircle,
  RefreshCw,
  CheckCircle2,
  XCircle,
  UserCheck
} from 'lucide-react';
import { useDemo } from '../../context/DemoContext';

export const PatientConsent = () => {
  const { consentSettings, setConsentSettings, playAudio, addToast, selectedLanguage } = useDemo();

  const [settings, setSettings] = useState(consentSettings);

  const handleToggle = (key) => {
    const updated = { ...settings, [key]: !settings[key] };
    setSettings(updated);
    setConsentSettings(updated);
    addToast({
      title: "Consent Preferences Updated",
      message: `Granular consent for ${key} set to ${updated[key] ? 'Granted' : 'Revoked'}.`,
      type: "info"
    });
  };

  const handleReadAloud = () => {
    const consentText = selectedLanguage === 'gu'
      ? "તમારો ડેટા ફક્ત ડૉક્ટર કન્સલ્ટેશન અને કેસ સમરી માટે લેવામાં આવે છે. કોઈ તૃતીય પક્ષને વેચવામાં આવતો નથી."
      : selectedLanguage === 'hi'
      ? "आपका डेटा केवल डॉक्टर परामर्श और केस सारांश के लिए एकत्र किया जाता है। इसे किसी तीसरे पक्ष को साझा नहीं किया जाता।"
      : "Your medical data is gathered exclusively for preparing physician case history. It is encrypted in memory and accessible only by your examining doctor.";
    playAudio(consentText);
  };

  return (
    <div className="space-y-6 sm:space-y-8 max-w-4xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-teal-50 text-teal-700 border border-teal-200">
              DPDP Architecture
            </span>
            <span className="text-xs text-slate-500">Consent-First Data Governance</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
            Consent & Patient Data Privacy
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Transparently control what health data is collected, why it is gathered, and who is authorized to review it.
          </p>
        </div>

        <button
          type="button"
          onClick={handleReadAloud}
          className="px-4 py-2.5 rounded-xl bg-slate-900 text-white hover:bg-slate-800 font-bold text-xs flex items-center gap-2 transition-colors cursor-pointer shadow-sm"
        >
          <Volume2 className="w-4 h-4 text-teal-400" />
          <span>Read Consent Aloud</span>
        </button>
      </div>

      {/* 4 Pillars of Data Governance */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-2xs space-y-2">
          <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-xs">
            1
          </div>
          <h4 className="text-sm font-bold text-slate-900">What Data is Collected?</h4>
          <p className="text-xs text-slate-600 leading-relaxed">
            Demographic details (Name, Age, Gender), self-reported chief complaints, audio recordings of responses, and scanned prescriptions or lab reports.
          </p>
        </div>

        <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-2xs space-y-2">
          <div className="w-8 h-8 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center font-bold text-xs">
            2
          </div>
          <h4 className="text-sm font-bold text-slate-900">Why is it Collected?</h4>
          <p className="text-xs text-slate-600 leading-relaxed">
            Exclusively to organize a chronological case trajectory and draft a structured SOAP note for the physician, saving up to 5 minutes of OPD consultation interrogation.
          </p>
        </div>

        <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-2xs space-y-2">
          <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold text-xs">
            3
          </div>
          <h4 className="text-sm font-bold text-slate-900">Who Has Access?</h4>
          <p className="text-xs text-slate-600 leading-relaxed">
            Strict role-based access: Only you (the patient) and your examining consultant (Dr. S. Trivedi / OPD Room 04) can inspect full clinical history.
          </p>
        </div>

        <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-2xs space-y-2">
          <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold text-xs">
            4
          </div>
          <h4 className="text-sm font-bold text-slate-900">What May be Shared?</h4>
          <p className="text-xs text-slate-600 leading-relaxed">
            Zero third-party monetization or marketing. Records are transferred only across ABDM health lockers when explicitly authorized by you with OTP.
          </p>
        </div>

      </div>

      {/* Granular Consent Controls */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-2xs space-y-5">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h3 className="text-sm sm:text-base font-bold text-slate-900">Granular Privacy Toggles</h3>
            <p className="text-xs text-slate-500">You can grant or revoke specific processing permissions at any time.</p>
          </div>
          <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
            DPDP v2.1 Policy
          </span>
        </div>

        <div className="space-y-3.5">
          {[
            {
              key: "dataCollection",
              title: "Clinical Demographic & Symptom Collection",
              desc: "Allows MediKiosk to store your chief complaint and symptom answers during kiosk check-in."
            },
            {
              key: "voiceRecording",
              title: "Voice Audio Capture & Speech-to-Text",
              desc: "Allows temporary audio buffer for spoken Gujarati/Hindi/English clinical responses."
            },
            {
              key: "medicalDocuments",
              title: "Prescription OCR & Optical Analysis",
              desc: "Permits parsing paper prescriptions and discharge sheets to detect drug names and dosages."
            },
            {
              key: "recordSharing",
              title: "ABDM Health Locker Federation",
              desc: "Allows linking summary with Ayushman Bharat ABHA ID for longitudinal hospital portability."
            }
          ].map((item) => (
            <div
              key={item.key}
              className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-4"
            >
              <div className="space-y-0.5">
                <h4 className="text-xs sm:text-sm font-bold text-slate-900">{item.title}</h4>
                <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
              </div>

              <button
                type="button"
                onClick={() => handleToggle(item.key)}
                className={`w-12 h-7 rounded-full p-1 transition-colors shrink-0 ${
                  settings[item.key] ? 'bg-emerald-600' : 'bg-slate-300'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full bg-white transition-transform ${
                    settings[item.key] ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Legal & Compliance Notice */}
      <div className="p-4 rounded-2xl bg-slate-100 border border-slate-200 text-slate-600 text-xs flex items-start gap-2.5">
        <HelpCircle className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
        <p>
          <strong>Governance Notice:</strong> MediKiosk architectural design follows the principles of India's Digital Personal Data Protection (DPDP) Act 2023. Formal compliance audits are subject to hospital institutional review.
        </p>
      </div>

    </div>
  );
};

export default PatientConsent;
