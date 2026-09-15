import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Compass,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  User,
  Globe,
  ShieldCheck,
  MessageSquare,
  FileSearch,
  CheckSquare,
  FileText,
  Send,
  Ticket,
  Clock,
  Sparkles,
  Volume2,
  VolumeX,
  AlertTriangle,
  ArrowRight,
  Building2,
  Stethoscope
} from 'lucide-react';
import { useDemo } from '../../context/DemoContext';
import { SUPPORTED_LANGUAGES } from '../../data/patients';

export const PatientJourney = () => {
  const {
    activePatient,
    tokenNumber,
    selectedLanguage,
    changeLanguage,
    historyCompleteness,
    audioNarration,
    toggleAudioNarration,
    addToast
  } = useDemo();

  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);

  const steps = [
    {
      id: 1,
      title: 'Identity Verification',
      desc: 'Verify ABHA ID, UHID, and basic patient demographics',
      icon: User,
      route: '/patient/profile'
    },
    {
      id: 2,
      title: 'Language Selection',
      desc: 'Choose primary communication language for voice & kiosk prompts',
      icon: Globe,
      route: '/patient/dashboard'
    },
    {
      id: 3,
      title: 'Data Privacy Consent',
      desc: 'DPDP Act 2023 compliant consent for clinical AI intake & ABDM sharing',
      icon: ShieldCheck,
      route: '/patient/consent'
    },
    {
      id: 4,
      title: 'Clinical History Intake',
      desc: 'Adaptive voice and touch SOCRATES complaint analysis',
      icon: MessageSquare,
      route: '/patient/history'
    },
    {
      id: 5,
      title: 'Document & OCR Scan',
      desc: 'Scan previous prescriptions, lab reports, and discharge summaries',
      icon: FileSearch,
      route: '/patient/documents'
    },
    {
      id: 6,
      title: 'Extraction Verification',
      desc: 'Side-by-side human confirmation of extracted clinical entities',
      icon: CheckSquare,
      route: '/patient/documents'
    },
    {
      id: 7,
      title: 'AI Clinical Summary',
      desc: 'Physician-ready SOAP structured brief with clinical verification label',
      icon: FileText,
      route: '/patient/summary'
    },
    {
      id: 8,
      title: 'Doctor Queue Submission',
      desc: 'Token generation and priority triage routing to consulting OPD',
      icon: Send,
      route: '/patient/summary'
    },
    {
      id: 9,
      title: 'Queue Live Tracking',
      desc: 'Real-time room allocation, position in queue, and estimated wait',
      icon: Ticket,
      route: '/patient/dashboard'
    }
  ];

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    } else {
      addToast({
        title: 'Intake Complete!',
        message: 'Your token is active in the OPD queue. Please proceed to Waiting Area 2.',
        type: 'success'
      });
      navigate('/patient/dashboard');
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const playVoicePrompt = (text) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.95;
      window.speechSynthesis.speak(utterance);
      addToast({
        title: 'Voice Guidance Playing',
        message: text.slice(0, 45) + '...',
        type: 'info'
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-blue-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl shadow-blue-900/15 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 text-blue-100 text-xs font-semibold backdrop-blur-md">
              <Compass className="w-3.5 h-3.5" />
              <span>Full Kiosk Workflow • Step {currentStep} of {steps.length}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight">Complete Patient Intake Journey</h1>
            <p className="text-blue-100 text-sm max-w-xl">
              From arrival at the kiosk to walking into Room 4 for consultation, MediKiosk guides you step-by-step with multi-lingual audio and touch instructions.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => playVoicePrompt(steps[currentStep - 1].desc)}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/20 hover:bg-white/30 text-white text-sm font-semibold backdrop-blur-md transition-all border border-white/20"
            >
              <Volume2 className="w-4 h-4 text-cyan-300" />
              <span>Hear Step Instructions</span>
            </button>
            <div className="bg-white/10 px-4 py-2 rounded-xl backdrop-blur-md border border-white/10 text-right">
              <span className="text-[10px] uppercase font-bold text-blue-200 block">Token Number</span>
              <span className="font-mono text-xl font-black text-amber-300">{tokenNumber}</span>
            </div>
          </div>
        </div>

        {/* Horizontal Progress Bar */}
        <div className="mt-8 pt-6 border-t border-white/15">
          <div className="flex items-center justify-between text-xs text-blue-200 font-medium mb-2">
            <span>Overall Progress</span>
            <span className="font-bold text-white">{Math.round((currentStep / steps.length) * 100)}% Completed</span>
          </div>
          <div className="w-full h-2.5 bg-blue-950/60 rounded-full overflow-hidden p-0.5">
            <div
              className="h-full bg-gradient-to-r from-cyan-400 to-emerald-400 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${(currentStep / steps.length) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Stepper Navigation Strip */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm overflow-x-auto">
        <div className="flex items-center justify-between min-w-[760px] gap-2">
          {steps.map((s, idx) => {
            const Icon = s.icon;
            const isCompleted = currentStep > s.id;
            const isCurrent = currentStep === s.id;

            return (
              <React.Fragment key={s.id}>
                <button
                  onClick={() => setCurrentStep(s.id)}
                  className={`flex items-center gap-2 p-2 rounded-xl text-left transition-all ${
                    isCurrent
                      ? 'bg-blue-50 text-blue-800 ring-2 ring-blue-600 ring-offset-1'
                      : isCompleted
                      ? 'text-emerald-700 hover:bg-emerald-50'
                      : 'text-slate-400 hover:bg-slate-50'
                  }`}
                >
                  <div
                    className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 ${
                      isCurrent
                        ? 'bg-blue-600 text-white shadow-sm'
                        : isCompleted
                        ? 'bg-emerald-600 text-white'
                        : 'bg-slate-100 text-slate-500'
                    }`}
                  >
                    {isCompleted ? <CheckCircle2 className="w-4 h-4" /> : s.id}
                  </div>
                  <div className="hidden sm:block">
                    <p className={`text-xs font-bold leading-tight ${isCurrent ? 'text-blue-900' : 'text-slate-700'}`}>
                      {s.title}
                    </p>
                  </div>
                </button>
                {idx < steps.length - 1 && (
                  <div className={`h-0.5 flex-1 min-w-[12px] ${isCompleted ? 'bg-emerald-400' : 'bg-slate-200'}`} />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* Active Step Content Preview & Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Step Detail Card */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
                {React.createElement(steps[currentStep - 1].icon, { className: 'w-7 h-7' })}
              </div>
              <div>
                <span className="text-xs font-bold tracking-wider uppercase text-blue-600">Stage {currentStep} Focus</span>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900">{steps[currentStep - 1].title}</h2>
                <p className="text-slate-500 text-sm mt-1">{steps[currentStep - 1].desc}</p>
              </div>
            </div>
            
            <button
              onClick={() => playVoicePrompt(`${steps[currentStep - 1].title}. ${steps[currentStep - 1].desc}`)}
              className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
              title="Voice Instructions"
            >
              <Volume2 className="w-5 h-5 text-blue-600" />
            </button>
          </div>

          {/* Interactive Step Specific Highlights */}
          {currentStep === 1 && (
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
              <h3 className="text-sm font-bold text-slate-800">Demo Patient Identity Verified:</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3 bg-white rounded-xl border border-slate-200">
                  <span className="text-[11px] text-slate-400 block font-semibold">PATIENT NAME</span>
                  <span className="font-bold text-slate-900">{activePatient.name}</span>
                </div>
                <div className="p-3 bg-white rounded-xl border border-slate-200">
                  <span className="text-[11px] text-slate-400 block font-semibold">UHID</span>
                  <span className="font-mono font-bold text-blue-600">{activePatient.uhid}</span>
                </div>
                <div className="p-3 bg-white rounded-xl border border-slate-200">
                  <span className="text-[11px] text-slate-400 block font-semibold">ABHA ADDRESS</span>
                  <span className="font-mono font-semibold text-emerald-600 text-xs">{activePatient.abhaAddress}</span>
                </div>
              </div>
              <p className="text-xs text-slate-500">Need to update your contact number or emergency contact? Visit the Profile section.</p>
            </div>
          )}

          {currentStep === 2 && (
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
              <h3 className="text-sm font-bold text-slate-800">Select Kiosk Voice & Display Language:</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {SUPPORTED_LANGUAGES.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      changeLanguage(lang.code);
                      addToast({
                        title: 'Language Updated',
                        message: `Switched to ${lang.label} (${lang.native})`,
                        type: 'info'
                      });
                    }}
                    className={`p-3.5 rounded-xl border text-center transition-all ${
                      selectedLanguage === lang.code
                        ? 'bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-500/20 font-bold'
                        : 'bg-white text-slate-700 border-slate-200 hover:border-blue-300 font-medium'
                    }`}
                  >
                    <span className="block text-base">{lang.native}</span>
                    <span className="text-xs opacity-75">{lang.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-3">
              <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm">
                <ShieldCheck className="w-5 h-5 text-emerald-600" />
                <span>DPDP Act 2023 Digital Consent Granted</span>
              </div>
              <p className="text-xs text-emerald-900 leading-relaxed">
                You have authorized Civil Hospital OPD to capture clinical history and upload prior records for physician consultation. Your data will be encrypted and stored under ABDM health data guidelines.
              </p>
            </div>
          )}

          {currentStep === 4 && (
            <div className="p-5 rounded-2xl bg-blue-50 border border-blue-200 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-blue-800 uppercase">SOCRATES Complaint Completeness</span>
                <span className="text-xs font-black text-blue-900">{historyCompleteness}%</span>
              </div>
              <div className="w-full h-2.5 bg-blue-200 rounded-full overflow-hidden">
                <div className="h-full bg-blue-600 rounded-full" style={{ width: `${historyCompleteness}%` }} />
              </div>
              <p className="text-xs text-blue-900">
                Chief Complaint: <span className="font-bold">{activePatient.chiefComplaint}</span>. Pain site, onset, radiation, and triggers recorded through touch and speech inputs.
              </p>
            </div>
          )}

          {currentStep >= 5 && currentStep <= 7 && (
            <div className="p-5 rounded-2xl bg-indigo-50 border border-indigo-200 space-y-3">
              <div className="flex items-center gap-2 text-indigo-900 font-bold text-sm">
                <Sparkles className="w-5 h-5 text-indigo-600" />
                <span>Documents Extracted & Clinical Summary Formatted</span>
              </div>
              <p className="text-xs text-indigo-800 leading-relaxed">
                MediKiosk OCR analyzed previous discharge summaries and prescriptions. All AI summaries are marked: <span className="font-mono font-bold bg-white px-1.5 py-0.5 rounded text-amber-700">AI GENERATED — PHYSICIAN VERIFICATION REQUIRED</span>.
              </p>
            </div>
          )}

          {currentStep >= 8 && (
            <div className="p-5 rounded-2xl bg-amber-50 border border-amber-200 space-y-3">
              <div className="flex items-center gap-2 text-amber-900 font-bold text-sm">
                <Clock className="w-5 h-5 text-amber-600" />
                <span>Patient Queue Position Active</span>
              </div>
              <p className="text-xs text-amber-800">
                You are currently <span className="font-bold">#2 in line</span> for Dr. Priya Sharma (Cardiology OPD Room 4). Estimated wait time is ~14 minutes.
              </p>
            </div>
          )}

          {/* Stepper Control Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-100">
            <button
              onClick={handlePrev}
              disabled={currentStep === 1}
              className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-bold text-sm transition-all ${
                currentStep === 1
                  ? 'text-slate-300 cursor-not-allowed bg-slate-50'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Previous Step</span>
            </button>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                onClick={() => navigate(steps[currentStep - 1].route)}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-bold text-sm bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors border border-blue-200"
              >
                <span>Open {steps[currentStep - 1].title} Page</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={handleNext}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-sm bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-500/25 transition-all"
              >
                <span>{currentStep === steps.length ? 'Finish & Track' : 'Next Step'}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Right Info Box: Live Kiosk Summary & Direct Jump */}
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <Ticket className="w-4 h-4 text-blue-600" />
              <span>Live Kiosk State</span>
            </h3>

            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                <span className="text-xs text-slate-500">Current Token</span>
                <span className="font-mono font-bold text-slate-900">{tokenNumber}</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                <span className="text-xs text-slate-500">Department</span>
                <span className="font-semibold text-slate-800 text-xs">Cardiology OPD</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                <span className="text-xs text-slate-500">Assigned Doctor</span>
                <span className="font-semibold text-slate-800 text-xs">Dr. Priya Sharma</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                <span className="text-xs text-slate-500">Consultation Room</span>
                <span className="font-bold text-blue-700 text-xs">Room 4 (1st Floor)</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200">
              <div className="flex items-center gap-2 text-amber-800 text-xs font-bold mb-1">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                <span>Triage Protocol</span>
              </div>
              <p className="text-[11px] text-amber-900">
                If you experience sudden severe chest squeezing, difficulty breathing, or dizziness while waiting, press the red Priority Alert button immediately.
              </p>
            </div>
          </div>

          {/* Quick Jump List */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-3">
            <h3 className="font-bold text-slate-900 text-sm">Quick Jump to Intake Module</h3>
            <div className="space-y-1.5">
              {steps.map((s) => (
                <button
                  key={s.id}
                  onClick={() => {
                    setCurrentStep(s.id);
                    navigate(s.route);
                  }}
                  className="w-full flex items-center justify-between p-2.5 rounded-xl text-left hover:bg-slate-50 text-xs font-semibold text-slate-700 transition-colors group"
                >
                  <span className="group-hover:text-blue-600">{s.id}. {s.title}</span>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all" />
                </button>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
export default PatientJourney;
