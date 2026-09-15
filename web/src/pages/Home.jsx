import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDemo } from '../context/DemoContext';
import {
  ArrowRight,
  Sparkles,
  MessageSquare,
  Mic,
  FileSearch,
  Clock,
  AlertTriangle,
  Flower2,
  FileText,
  Share2,
  ShieldCheck,
  CheckCircle2,
  Stethoscope,
  Users,
  Timer,
  Layers,
  HeartHandshake,
  Check,
  ChevronRight,
  Shield,
  Activity,
  UserCheck,
  LogIn,
  User,
  HeartPulse,
  Hospital,
  KeyRound,
  LogOut
} from 'lucide-react';
import { StatCard } from '../components/StatCard';
import { AudioInstructionBtn } from '../components/AudioInstructionBtn';

export const Home = () => {
  const navigate = useNavigate();
  const { 
    setActiveStep, 
    switchPatient, 
    isAuthenticated, 
    userRole, 
    activeDoctor,
    activePatient,
    t, 
    selectedLanguage,
    logout 
  } = useDemo();

  const handleStartIntake = () => {
    if (!isAuthenticated) {
      navigate('/login?role=patient');
      return;
    }
    setActiveStep(1);
    navigate('/patient-intake');
  };

  const coreFeatures = [
    {
      id: "ai-convo",
      title: "1. Conversational AI",
      desc: "Conducts adaptive, SOCRATES-style clinical questioning tailored to patient symptoms in their native tongue.",
      icon: MessageSquare,
      color: "cyan",
      link: "/ai-history"
    },
    {
      id: "voice-touch",
      title: "2. Voice + Touch Input",
      desc: "Patients can either tap large touch-optimized cards or speak naturally using simulated speech recognition.",
      icon: Mic,
      color: "teal",
      link: "/ai-history"
    },
    {
      id: "med-ocr",
      title: "3. Medical OCR",
      desc: "Instantly digitizes paper prescriptions, lab reports, and discharge summaries with out-of-range flag detection.",
      icon: FileSearch,
      color: "emerald",
      link: "/documents"
    },
    {
      id: "smart-timeline",
      title: "4. Smart Timeline",
      desc: "Synthesizes scattered medical history into an intuitive chronological trajectory spanning years of care.",
      icon: Clock,
      color: "purple",
      link: "/timeline"
    },
    {
      id: "red-flag",
      title: "5. Red Flag Detection",
      desc: "Identifies potentially critical complaints (e.g. chest pain + dyspnea) and triggers immediate triage escalation.",
      icon: AlertTriangle,
      color: "rose",
      link: "/ai-history"
    },
    {
      id: "ayush-mode",
      title: "6. AYUSH Mode",
      desc: "Captures traditional Ayurvedic history including Dashavidha Pariksha, Ahara, Vihara, and Prakriti profiling.",
      icon: Flower2,
      color: "amber",
      link: "/ayush"
    },
    {
      id: "clinical-summary",
      title: "7. Clinical Summary",
      desc: "Condenses raw patient input into structured SOAP clinical drafts for physician review in under 30 seconds.",
      icon: FileText,
      color: "cyan",
      link: "/clinical-summary"
    },
    {
      id: "abdm-ready",
      title: "8. ABDM Ready",
      desc: "Engineered for India's digital health mission with mock ABHA verification and FHIR R4 interoperability.",
      icon: Share2,
      color: "teal",
      link: "/doctor-dashboard"
    }
  ];

  const journeySteps = [
    {
      num: "01",
      step: "Identify",
      title: "Registration & Demographics",
      desc: "Patient verifies ABHA ID, selects preferred language, and grants explicit consent.",
      path: "/patient-intake"
    },
    {
      num: "02",
      step: "Converse",
      title: "AI Clinical Questioning",
      desc: "Kiosk asks adaptive follow-ups via voice and touch, running real-time red-flag checks.",
      path: "/ai-history"
    },
    {
      num: "03",
      step: "Scan",
      title: "Digitize Prior Documents",
      desc: "OCR extracts past medications, dosages, and lab investigations with range analysis.",
      path: "/documents"
    },
    {
      num: "04",
      step: "Summarize",
      title: "Generate Structured Draft",
      desc: "Synthesizes conversational data, timeline, and documents into physician-ready summary.",
      path: "/clinical-summary"
    },
    {
      num: "05",
      step: "Consult",
      title: "Physician Consultation",
      desc: "Doctor reviews structured history instantly, focusing the 3-minute visit on treatment.",
      path: "/doctor-dashboard"
    }
  ];

  const whyPoints = [
    { title: "Reduce consultation burden", desc: "Saves 3-5 minutes of repetitive interrogation per patient in crowded government and private OPDs." },
    { title: "Capture comprehensive history", desc: "Structured SOCRATES framework ensures no critical symptom details or past comorbidities are skipped." },
    { title: "Digitize old medical records", desc: "Transforms crumpled physical prescriptions and faded lab reports into structured searchable digital data." },
    { title: "Improve accessibility", desc: "Large accessible buttons, touch-friendly UI, and voice guidance empower elderly and low-literacy patients." },
    { title: "Support multilingual patients", desc: "Seamless Hindi, Gujarati, Marathi, Bengali, Tamil, Telugu, and English clinical intake." },
    { title: "Prepare physician-ready summaries", desc: "Drafts SOAP notes with 92%+ completeness while keeping full clinical diagnosis in physician hands." }
  ];

  return (
    <div className="space-y-16 py-6 sm:py-10">

      {/* Hero Section (Matching Reference Design: Patient Case Taking) */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-50/80 via-white to-sky-50/50 border border-blue-100 p-6 sm:p-10 lg:p-14 shadow-sm">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">

          {/* Left Column: Headline, Badges, CTAs */}
          <div className="lg:col-span-7 space-y-6 text-left">

            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold tracking-wide">
              <Hospital className="w-3.5 h-3.5 text-blue-600" />
              <span>
                {selectedLanguage === 'gu'
                  ? "સિવિલ હોસ્પિટલ • સ્માર્ટ OPD કિઓસ્ક પોર્ટલ"
                  : selectedLanguage === 'hi'
                  ? "सिविल अस्पताल • स्मार्ट ओपीडी कियोस्क पोर्टल"
                  : "Civil Hospital • Smart OPD Kiosk Platform"}
              </span>
            </div>

            <div className="space-y-3">
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight text-slate-900">
                {t("home.heroTitle", "Smarter OPD Intake, Faster Doctor Decisions.")}
              </h1>
              <p className="text-slate-600 text-base sm:text-lg max-w-xl font-normal leading-relaxed">
                {t("home.heroSubtitle", "Multilingual AI-driven clinical history taking, instant ABDM record aggregation, smart document OCR, and real-time triage scoring for Indian public healthcare.")}
              </p>
            </div>

            {/* 3 Feature Badges */}
            <div className="flex flex-wrap gap-3 pt-1">
              <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-blue-50 border border-blue-100 text-blue-800 text-xs font-semibold shadow-2xs">
                <FileText className="w-4 h-4 text-blue-600" />
                <span>{selectedLanguage === 'gu' ? "સરળ ડેટા એન્ટ્રી" : selectedLanguage === 'hi' ? "सरल डेटा प्रविष्टि" : "Easy Data Entry"}</span>
              </div>
              <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-cyan-50 border border-cyan-100 text-cyan-800 text-xs font-semibold shadow-2xs">
                <Sparkles className="w-4 h-4 text-cyan-600" />
                <span>{selectedLanguage === 'gu' ? "સ્માર્ટ કેસ સારાંશ" : selectedLanguage === 'hi' ? "स्मार्ट केस सारांश" : "Smart Summary"}</span>
              </div>
              <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-emerald-50 border border-emerald-100 text-emerald-800 text-xs font-semibold shadow-2xs">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>{selectedLanguage === 'gu' ? "ચોક્કસ તબીબી નિર્ણયો" : selectedLanguage === 'hi' ? "सटीक चिकित्सकीय निर्णय" : "Better Decisions"}</span>
              </div>
            </div>

            {/* Auth-Aware Action Area: Hide Login Button Once Logged In */}
            {!isAuthenticated ? (
              <div className="flex flex-col sm:flex-row items-center gap-3.5 pt-2">
                <Link
                  to="/login"
                  className="w-full sm:w-auto px-9 py-4 rounded-2xl bg-blue-600 text-white font-black text-base hover:bg-blue-700 active:scale-98 transition-all flex items-center justify-center gap-2.5 shadow-lg shadow-blue-500/30 cursor-pointer"
                >
                  <LogIn className="w-5 h-5" />
                  <span>
                    {selectedLanguage === 'gu' 
                      ? "લૉગિન (Login)" 
                      : selectedLanguage === 'hi' 
                      ? "लॉगिन (Login)" 
                      : "Login"}
                  </span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            ) : (
              <div className="space-y-3.5 pt-2">
                {/* Active Session Indicator Pill */}
                <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>
                    {selectedLanguage === 'gu'
                      ? `લૉગિન થયેલ છે: ${userRole === 'doctor' ? `${activeDoctor?.name || 'Dr. Mehta'} (ડૉક્ટર • ${activeDoctor?.room || 'OPD Room #04'})` : `${activePatient?.name || 'દર્દી'} (ટોકન: ${activePatient?.token || 'A103'})`}`
                      : selectedLanguage === 'hi'
                      ? `सक्रिय सत्र: ${userRole === 'doctor' ? `${activeDoctor?.name || 'Dr. Mehta'} (डॉक्टर • ${activeDoctor?.room || 'OPD Room #04'})` : `${activePatient?.name || 'मरीज'} (टोकन: ${activePatient?.token || 'A103'})`}`
                      : `Active Session: ${userRole === 'doctor' ? `${activeDoctor?.name || 'Dr. Mehta'} (Doctor • ${activeDoctor?.room || 'OPD Room #04'})` : `${activePatient?.name || 'Patient'} (Token: ${activePatient?.token || 'A103'})`}`}
                  </span>
                </div>

                {/* Primary Destination Action Buttons */}
                <div className="flex flex-wrap items-center gap-3">
                  {userRole === 'admin' ? (
                    <Link
                      to="/admin/dashboard"
                      className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-indigo-600 text-white font-bold text-base hover:bg-indigo-700 active:scale-98 transition-all flex items-center justify-center gap-2.5 shadow-lg shadow-indigo-500/25 cursor-pointer"
                    >
                      <Building2 className="w-5 h-5" />
                      <span>
                        {selectedLanguage === 'gu'
                          ? "એડમિન કમાન્ડ સેન્ટર ખોલો"
                          : selectedLanguage === 'hi'
                          ? "एडमिन कमांड सेंटर खोलें"
                          : "Open Hospital Admin Console"}
                      </span>
                      <ArrowRight className="w-5 h-5" />
                    </Link>
                  ) : userRole === 'doctor' ? (
                    <Link
                      to="/doctor/dashboard"
                      className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-blue-600 text-white font-bold text-base hover:bg-blue-700 active:scale-98 transition-all flex items-center justify-center gap-2.5 shadow-lg shadow-blue-500/25 cursor-pointer"
                    >
                      <Stethoscope className="w-5 h-5" />
                      <span>
                        {selectedLanguage === 'gu' 
                          ? "ડૉક્ટર ડેશબોર્ડ ખોલો" 
                          : selectedLanguage === 'hi' 
                          ? "डॉक्टर डैशबोर्ड खोलें" 
                          : "Open Doctor Dashboard"}
                      </span>
                      <ArrowRight className="w-5 h-5" />
                    </Link>
                  ) : (
                    <Link
                      to="/patient/dashboard"
                      className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-blue-600 text-white font-bold text-base hover:bg-blue-700 active:scale-98 transition-all flex items-center justify-center gap-2.5 shadow-lg shadow-blue-500/25 cursor-pointer"
                    >
                      <UserCheck className="w-5 h-5" />
                      <span>
                        {selectedLanguage === 'gu' 
                          ? "પેશન્ટ પોર્ટલ / ડેશબોર્ડ ખોલો" 
                          : selectedLanguage === 'hi' 
                          ? "मरीज डैशबोर्ड खोलें" 
                          : "Open Patient Dashboard"}
                      </span>
                      <ArrowRight className="w-5 h-5" />
                    </Link>
                  )}

                  <Link
                    to="/clinical-summary"
                    className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-white text-slate-700 hover:bg-slate-50 border border-slate-200 font-bold text-sm transition-all flex items-center justify-center gap-2 shadow-2xs"
                  >
                    <FileText className="w-4 h-4 text-blue-600" />
                    <span>
                      {selectedLanguage === 'gu' 
                        ? "ક્લિનિકલ સમરી જુઓ" 
                        : selectedLanguage === 'hi' 
                        ? "क्लिनिकल सारांश देखें" 
                        : "Clinical Summary"}
                    </span>
                  </Link>

                  <button
                    type="button"
                    onClick={logout}
                    className="w-full sm:w-auto px-4 py-3.5 rounded-2xl text-xs font-bold text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                    title="Log out of current session"
                  >
                    <LogOut className="w-4 h-4 text-rose-600" />
                    <span>
                      {selectedLanguage === 'gu' ? "લૉગ આઉટ" : selectedLanguage === 'hi' ? "लॉग आउट" : "Log Out"}
                    </span>
                  </button>
                </div>
              </div>
            )}

            <div className="pt-1">
              <AudioInstructionBtn 
                label={selectedLanguage === 'gu' ? "ઓડિયો માર્ગદર્શન સાંભળો" : selectedLanguage === 'hi' ? "ऑडियो मार्गदर्शन सुनें" : "Listen to Audio Overview"} 
                text={
                  !isAuthenticated
                    ? (selectedLanguage === 'gu' 
                        ? "સિવિલ હોસ્પિટલ સ્માર્ટ ઓપીડી કિઓસ્કમાં આપનું સ્વાગત છે. આગળ વધવા માટે કૃપા કરીને લૉગિન બટન દબાવો." 
                        : selectedLanguage === 'hi' 
                        ? "सिविल अस्पताल स्मार्ट ओपीडी कियोस्क में आपका स्वागत है। आगे बढ़ने के लिए कृपया लॉगिन बटन दबाएं।" 
                        : "Welcome to MediKiosk Civil Hospital Smart OPD. Please click the Login button to get started.")
                    : (selectedLanguage === 'gu'
                        ? `આપનું સ્વાગત છે. આપ ${userRole === 'doctor' ? 'ડૉક્ટર' : 'દર્દી'} તરીકે લૉગિન થયેલા છો. આગળ વધવા માટે પોર્ટલ બટન દબાવો.`
                        : selectedLanguage === 'hi'
                        ? `आपका स्वागत है। आप ${userRole === 'doctor' ? 'डॉक्टर' : 'मरीज'} के रूप में लॉगिन हैं। आगे बढ़ने के लिए पोर्टल बटन दबाएं।`
                        : `Welcome! You are logged in as ${userRole === 'doctor' ? 'Doctor' : 'Patient'}. Click the portal button to continue.`)
                } 
              />
            </div>

          </div>

          {/* Right Column: Visual Case Taking Showcase Card */}
          <div className="lg:col-span-5 relative flex justify-center">

            {/* Background circular glow */}
            <div className="absolute inset-0 bg-blue-100/60 rounded-full filter blur-3xl -z-10 scale-90" />

            {/* Interactive Preview Card Styled as Doctor & Patient Card */}
            <div className="w-full max-w-sm bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xl relative space-y-4">

              {/* Doctor Avatar Header */}
              <div className="flex items-center gap-3.5 pb-4 border-b border-slate-100">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-cyan-500 flex items-center justify-center text-white shadow-sm shadow-blue-500/20">
                  <Stethoscope className="w-6 h-6 stroke-[2.2]" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold text-slate-900">Dr. Mehta</h3>
                    <span className="text-[10px] bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full font-semibold border border-blue-100">Consultant</span>
                  </div>
                  <p className="text-xs text-slate-500">Civil Hospital • OPD Room #04</p>
                </div>
              </div>

              {/* Patient Card Preview like in image */}
              <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/70 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xs">
                      RS
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900">Riya Sharma</h4>
                      <p className="text-[10px] text-slate-500">PT-000123 • 28y Female</p>
                    </div>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                    Registered
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-left pt-1">
                  <div className="bg-white p-2.5 rounded-xl border border-slate-100">
                    <p className="text-[10px] text-slate-400 font-medium">Chief Complaint</p>
                    <p className="text-xs font-bold text-slate-800 truncate">Fever & Body Pain</p>
                  </div>
                  <div className="bg-white p-2.5 rounded-xl border border-slate-100">
                    <p className="text-[10px] text-slate-400 font-medium">Vitals Check</p>
                    <p className="text-xs font-bold text-emerald-600">BP 118/76 • 98%</p>
                  </div>
                </div>
              </div>

              {/* Status footer inside card */}
              <div className="flex items-center justify-between text-xs text-slate-500 px-1 pt-1">
                <span className="flex items-center gap-1.5 text-blue-600 font-medium text-[11px]">
                  <Activity className="w-3.5 h-3.5" />
                  AI Summary Ready
                </span>
                <Link
                  to="/clinical-summary"
                  className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1"
                >
                  <span>View Case</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>

            </div>

          </div>

        </div>

        {/* Connected Healthcare Workflow Steps below Hero */}
        <div className="mt-12 pt-8 border-t border-slate-200/80">
          <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-5 text-left">
            Connected Clinical Case Taking Workflow
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5 text-left">

            <div className="bg-white border border-slate-200/80 p-4 rounded-2xl relative shadow-2xs hover:border-blue-200 transition-colors">
              <div className="w-9 h-9 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center mb-3">
                <UserCheck className="w-5 h-5" />
              </div>
              <p className="text-xs font-bold text-orange-600">Step 1</p>
              <h4 className="text-sm font-bold text-slate-900">Patient Registration</h4>
              <p className="text-[11px] text-slate-500 mt-1">Kiosk check-in, ABHA verification, audio & language choice.</p>
            </div>

            <div className="bg-white border border-slate-200/80 p-4 rounded-2xl relative shadow-2xs hover:border-blue-200 transition-colors">
              <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mb-3">
                <Sparkles className="w-5 h-5" />
              </div>
              <p className="text-xs font-bold text-purple-600">Step 2</p>
              <h4 className="text-sm font-bold text-slate-900">Case Taking</h4>
              <p className="text-[11px] text-slate-500 mt-1">Adaptive clinical questioning + real-time red-flag triage.</p>
            </div>

            <div className="bg-white border border-slate-200/80 p-4 rounded-2xl relative shadow-2xs hover:border-blue-200 transition-colors">
              <div className="w-9 h-9 rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center mb-3">
                <FileSearch className="w-5 h-5" />
              </div>
              <p className="text-xs font-bold text-cyan-600">Step 3</p>
              <h4 className="text-sm font-bold text-slate-900">Document Digitization</h4>
              <p className="text-[11px] text-slate-500 mt-1">Past prescriptions, lab ranges, and medical timeline generation.</p>
            </div>

            <div className="bg-white border border-slate-200/80 p-4 rounded-2xl relative shadow-2xs hover:border-blue-200 transition-colors">
              <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3">
                <Stethoscope className="w-5 h-5" />
              </div>
              <p className="text-xs font-bold text-emerald-600">Step 4</p>
              <h4 className="text-sm font-bold text-slate-900">Physician Summary</h4>
              <p className="text-[11px] text-slate-500 mt-1">SOAP report delivered to doctor dashboard for fast diagnosis.</p>
            </div>

          </div>
        </div>

      </section>

      {/* Statistics Cards */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <StatCard
          title="Potential OPD Volume"
          value="4,000–10,000"
          subtitle="Potential OPD patients per day in major civil hospitals"
          icon={Users}
          color="cyan"
        />
        <StatCard
          title="Consultation Window"
          value="2–5 min"
          subtitle="Typical consultation window per patient needing rapid history"
          icon={Timer}
          color="amber"
        />
        <StatCard
          title="Patient Intake Pipeline"
          value="5 Steps"
          subtitle="End-to-end journey: Identify → Converse → Scan → Summarize → Consult"
          icon={Layers}
          color="emerald"
        />
      </section>

      {/* Why MediKiosk? Section */}
      <section className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-10 shadow-xs">
        <div className="max-w-3xl mb-8">
          <span className="text-xs font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-2.5 py-1 rounded-md border border-teal-100">
            The Healthcare Solution
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-2">
            Why MediKiosk?
          </h2>
          <p className="text-sm text-slate-600 mt-1">
            Overcrowded OPDs force physicians to spend 70% of their limited minutes asking basic administrative and demographic questions. MediKiosk bridges this bottleneck.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {whyPoints.map((pt, i) => (
            <div key={i} className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-teal-200 transition-colors">
              <div className="w-8 h-8 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center font-bold text-xs mb-3">
                <Check className="w-4 h-4 stroke-[3]" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-1.5">{pt.title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">{pt.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Core Features Grid */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-2.5 py-1 rounded-md border border-teal-100">
              Platform Modules
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-2">
              Core Platform Features
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              Engineered with modern healthcare standards for clinical clarity and user accessibility.
            </p>
          </div>
          <Link
            to="/about"
            className="inline-flex items-center gap-1 text-xs font-bold text-teal-700 hover:text-teal-800"
          >
            <span>View Full Architecture Showcase</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {coreFeatures.map((feat) => {
            const Icon = feat.icon;
            return (
              <Link
                key={feat.id}
                to={feat.link}
                className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-2xs hover:shadow-md hover:border-teal-300 transition-all duration-200 group flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-teal-50 border border-teal-100 text-teal-700 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 mb-1 group-hover:text-teal-700 transition-colors">
                    {feat.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {feat.desc}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-teal-700">
                  <span>Explore Module</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-slate-900 text-white rounded-3xl p-6 sm:p-10 border border-slate-800 shadow-lg">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-teal-400 bg-teal-500/10 px-3 py-1 rounded-full border border-teal-500/20">
            End-to-End Workflow
          </span>
          <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-white mt-3">
            How It Works
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm mt-2">
            Five intuitive stages connecting arrival at the OPD kiosk directly to the physician's examination desk.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {journeySteps.map((step, idx) => (
            <Link
              key={step.num}
              to={step.path}
              className="bg-slate-800/80 border border-slate-700/80 hover:border-teal-500/50 p-4 rounded-2xl flex flex-col justify-between transition-all group"
            >
              <div>
                <span className="text-2xl font-black text-teal-400/60 group-hover:text-teal-400 transition-colors font-mono">
                  {step.num}
                </span>
                <span className="block text-xs font-bold uppercase tracking-wider text-slate-300 mt-1">
                  {step.step}
                </span>
                <h4 className="text-sm font-bold text-white mt-1 group-hover:text-teal-300 transition-colors">
                  {step.title}
                </h4>
                <p className="text-[11px] text-slate-400 mt-1.5 leading-relaxed">
                  {step.desc}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-700/60 flex items-center text-[11px] font-bold text-teal-400">
                <span>View Demo Step</span>
                <ChevronRight className="w-3.5 h-3.5 ml-auto group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Security & Privacy First Section */}
      <section className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-10 shadow-xs">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-2.5 py-1 rounded-md border border-teal-100">
              Governance & Safety
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-2">
              Privacy First by Design
            </h2>
            <p className="text-sm text-slate-600 mt-1 leading-relaxed">
              Designed with privacy and consent principles in mind. Compliant with India's Digital Personal Data Protection (DPDP) standards in conceptual architecture.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Consent-First Design</h4>
                  <p className="text-[11px] text-slate-500">Explicit granular permission required prior to recording voice or scanning records.</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Secure In-Memory Processing</h4>
                  <p className="text-[11px] text-slate-500">Data lives only within the session buffer; no unencrypted persistent storage.</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Temporary Session Handling</h4>
                  <p className="text-[11px] text-slate-500">Kiosk auto-resets when consultation finishes to protect patient confidentiality.</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-slate-900">ABDM-Ready Architecture</h4>
                  <p className="text-[11px] text-slate-500">Uses standard FHIR R4 resources (Condition, MedicationStatement, Encounter).</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200/90 w-full lg:w-80 shrink-0 text-center space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-teal-100 text-teal-800 flex items-center justify-center mx-auto">
              <Shield className="w-6 h-6" />
            </div>
            <h4 className="text-sm font-bold text-slate-900">Review Privacy Settings</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Explore the interactive DPDP consent framework and audio disclosure demo.
            </p>
            <Link
              to="/consent"
              className="block w-full py-2.5 px-4 rounded-xl font-bold text-xs bg-slate-900 text-white hover:bg-slate-800 transition-colors"
            >
              Open Privacy & Consent Module
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};
