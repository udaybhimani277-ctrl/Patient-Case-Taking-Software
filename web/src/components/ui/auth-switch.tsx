import { cn } from "@/lib/utils";
import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useDemo } from "@/context/DemoContext";
import {
  HeartPulse,
  User,
  Stethoscope,
  Lock,
  KeyRound,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  Phone,
  CreditCard,
  Building,
  CheckCircle2,
  Zap,
  Activity,
  Layers,
  FileText,
  UserCheck,
  BadgeCheck,
  Globe
} from "lucide-react";

export interface AuthSwitchProps {
  className?: string;
}

export const Component = ({ className }: AuthSwitchProps = {}) => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const requestedRole = searchParams.get("role") || (location.pathname.includes("doctor") ? "doctor" : "patient");
  const [authRole, setAuthRole] = useState<"patient" | "doctor">(requestedRole === "doctor" ? "doctor" : "patient");

  // Selected profile state
  const [selectedPatientId, setSelectedPatientId] = useState("P001");
  const [selectedDoctorId, setSelectedDoctorId] = useState("DOC-TRIVEDI");

  // Patient inputs
  const [abhaId, setAbhaId] = useState("91-4521-8890-1234");
  const [mobile, setMobile] = useState("+91 98250 44120");
  const [patientOtp, setPatientOtp] = useState("458921");

  // Doctor inputs
  const [doctorId, setDoctorId] = useState("DOC-TRIVEDI");
  const [doctorPin, setDoctorPin] = useState("1234");
  const [opdRoom, setOpdRoom] = useState("OPD Room 04 (Cardiology)");

  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const { loginPatient, loginDoctor, selectedLanguage, changeLanguage, t } = useDemo() as any;

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      if (authRole === "doctor") {
        loginDoctor(doctorId || selectedDoctorId || "DOC-TRIVEDI");
        navigate("/doctor-dashboard");
      } else {
        const targetId = selectedPatientId || (abhaId.includes("14-8892") ? "P002" : "P001");
        loginPatient(targetId);
        navigate("/patient-intake");
      }
    }, 450);
  };

  // Auto-fill demo profile fields without automatically logging in
  const handleQuickPatientSelect = (id: string, name: string, abha: string, mob: string) => {
    setSelectedPatientId(id);
    setAbhaId(abha);
    setMobile(mob);
    setPatientOtp("458921");
  };

  const handleQuickDoctorSelect = (id: string, room: string) => {
    setSelectedDoctorId(id);
    setDoctorId(id);
    setOpdRoom(room);
    setDoctorPin("1234");
  };

  // Instant 1-Click bypass handlers for reviewer buttons
  const handleInstantPatientLogin = (id: string = "P001") => {
    setIsLoading(true);
    setTimeout(() => {
      loginPatient(id);
      navigate("/patient-intake");
    }, 350);
  };

  const handleInstantDoctorLogin = (id: string = "DOC-TRIVEDI") => {
    setIsLoading(true);
    setTimeout(() => {
      loginDoctor(id);
      navigate("/doctor-dashboard");
    }, 350);
  };

  return (
    <div
      className={cn(
        "w-full max-w-5xl mx-auto rounded-3xl bg-white shadow-2xl border border-slate-200/90 overflow-hidden grid grid-cols-1 lg:grid-cols-12 transition-all duration-300",
        className
      )}
    >
      {/* LEFT COLUMN: Visual Healthcare Branding & Highlights */}
      <div className="lg:col-span-5 relative bg-gradient-to-br from-slate-900 via-blue-950 to-teal-950 p-6 sm:p-8 lg:p-10 flex flex-col justify-between text-white overflow-hidden">
        {/* Crisp Unsplash Healthcare Hospital Overlay */}
        <img
          src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&auto=format&fit=crop&q=80"
          alt="Smart Hospital OPD Kiosk"
          className="absolute inset-0 w-full h-full object-cover opacity-20 mix-blend-luminosity pointer-events-none"
        />

        {/* Ambient Glow Bubbles */}
        <div className="absolute -top-24 -left-24 w-72 h-72 rounded-full bg-blue-500/20 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-72 h-72 rounded-full bg-teal-500/20 blur-3xl pointer-events-none" />

        {/* Top Branding Section */}
        <div className="relative z-10 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-blue-200 text-xs font-semibold shadow-inner">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>MediKiosk v2.4 • Smart OPD Portal</span>
          </div>

          <div className="flex items-center gap-3 pt-2">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-teal-400 flex items-center justify-center text-white shadow-lg shadow-blue-500/30">
              <HeartPulse className="w-7 h-7 stroke-[2.5]" />
            </div>
            <div>
              <h1 className="text-2xl font-black tracking-tight text-white leading-none">
                Medi<span className="text-teal-400">Kiosk</span>
              </h1>
              <p className="text-xs text-blue-200/80 font-medium tracking-wide mt-1">
                Civil Hospital Digital Intake Platform
              </p>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed pt-2">
            Intelligent OPD pre-consultation kiosk with voice-to-text symptom intake, ABDM record linkage, and automated physician SOAP drafts.
          </p>

          {/* Feature Highlights Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2.5 pt-2">
            <div className="flex items-start gap-3 p-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xs">
              <div className="w-8 h-8 rounded-xl bg-blue-500/20 text-blue-300 flex items-center justify-center shrink-0">
                <UserCheck className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-bold text-white">Patient Kiosk Self-Intake</p>
                <p className="text-[11px] text-slate-400">ABHA & OTP check-in with 7 Indian languages.</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xs">
              <div className="w-8 h-8 rounded-xl bg-teal-500/20 text-teal-300 flex items-center justify-center shrink-0">
                <Stethoscope className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-bold text-white">Doctor Consultation Dashboard</p>
                <p className="text-[11px] text-slate-400">Live queue triage, red-flag alerts & Rx signing.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom One-Click Instant Bypass for Reviewers */}
        <div className="relative z-10 pt-6 mt-6 border-t border-white/10 space-y-2.5">
          <div className="flex items-center gap-1.5 text-xs font-bold text-blue-300">
            <Zap className="w-3.5 h-3.5 fill-blue-300" />
            <span>Instant 1-Click Evaluation Access:</span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => handleInstantPatientLogin("P001")}
              className="px-3 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-blue-900/40 transition-all cursor-pointer"
            >
              <User className="w-3.5 h-3.5" />
              <span>Enter as Patient</span>
            </button>

            <button
              type="button"
              onClick={() => handleInstantDoctorLogin("DOC-TRIVEDI")}
              className="px-3 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-teal-900/40 transition-all cursor-pointer"
            >
              <Stethoscope className="w-3.5 h-3.5" />
              <span>Enter as Doctor</span>
            </button>
          </div>
        </div>
      </div>

      {/* RIGHT COLUMN: Interactive Auth Switch & Form Portal */}
      <div className="lg:col-span-7 p-6 sm:p-8 lg:p-10 flex flex-col justify-between space-y-6 bg-slate-50/50">

        {/* Top Bar: Back to Home + Language Selector */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5 pb-2 border-b border-slate-200/80">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-blue-600 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>
              {selectedLanguage === 'gu' ? "← હોસ્પિટલ હોમ પેજ" : selectedLanguage === 'hi' ? "← अस्पताल होम पेज" : "← Hospital Home"}
            </span>
          </Link>

          {/* Quick Language Toggle */}
          <div className="flex items-center gap-1 bg-slate-200/80 p-1 rounded-xl border border-slate-300/80">
            {[
              { code: 'gu', label: 'ગુજરાતી' },
              { code: 'hi', label: 'हिन्दी' },
              { code: 'en', label: 'English' }
            ].map(lang => (
              <button
                key={lang.code}
                type="button"
                onClick={() => changeLanguage(lang.code)}
                className={cn(
                  "px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer",
                  selectedLanguage === lang.code
                    ? "bg-blue-600 text-white shadow-xs"
                    : "text-slate-600 hover:text-slate-900"
                )}
              >
                {lang.label}
              </button>
            ))}
          </div>
        </div>

        {/* Role Switcher Tabs (Patient vs Doctor - 2 Sides) */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              {selectedLanguage === 'gu' ? "લૉગિન મોડ પસંદ કરો (2 બાજુ):" : selectedLanguage === 'hi' ? "लॉगिन मोड चुनें (2 पक्ष):" : "Select Portal (2 Sides):"}
            </span>
            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
              <ShieldCheck className="w-3 h-3" />
              <span>ABDM Encrypted</span>
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 p-1.5 bg-slate-200/70 rounded-2xl border border-slate-300/60 shadow-inner">
            <button
              type="button"
              onClick={() => setAuthRole("patient")}
              className={cn(
                "py-3 px-4 rounded-xl text-xs font-black flex items-center justify-center gap-2.5 transition-all cursor-pointer",
                authRole === "patient"
                  ? "bg-white text-blue-700 shadow-md shadow-slate-300 ring-2 ring-blue-500/20"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/50"
              )}
            >
              <div className={cn(
                "w-7 h-7 rounded-lg flex items-center justify-center text-xs",
                authRole === "patient" ? "bg-blue-100 text-blue-700" : "bg-slate-300/70 text-slate-600"
              )}>
                <User className="w-4 h-4" />
              </div>
              <div className="text-left">
                <p className="leading-tight text-sm font-bold">
                  {selectedLanguage === 'gu' ? "દર્દી પોર્ટલ" : selectedLanguage === 'hi' ? "मरीज पोर्टल" : "Patient Kiosk"}
                </p>
                <p className="text-[10px] font-medium opacity-75">
                  {selectedLanguage === 'gu' ? "સેલ્ફ-ઇન્ટેક" : selectedLanguage === 'hi' ? "सेल्फ-इनटेक" : "Self-Intake"}
                </p>
              </div>
            </button>

            <button
              type="button"
              onClick={() => setAuthRole("doctor")}
              className={cn(
                "py-3 px-4 rounded-xl text-xs font-black flex items-center justify-center gap-2.5 transition-all cursor-pointer",
                authRole === "doctor"
                  ? "bg-teal-700 text-white shadow-md shadow-teal-900/20 ring-2 ring-teal-500/20"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/50"
              )}
            >
              <div className={cn(
                "w-7 h-7 rounded-lg flex items-center justify-center text-xs",
                authRole === "doctor" ? "bg-teal-800 text-teal-100" : "bg-slate-300/70 text-slate-600"
              )}>
                <Stethoscope className="w-4 h-4" />
              </div>
              <div className="text-left">
                <p className="leading-tight text-sm font-bold">
                  {selectedLanguage === 'gu' ? "ડૉક્ટર કન્સોલ" : selectedLanguage === 'hi' ? "डॉक्टर कंसोल" : "Doctor Portal"}
                </p>
                <p className="text-[10px] font-medium opacity-75">
                  {selectedLanguage === 'gu' ? "ઓપીડી ક્લિનિશિયન" : selectedLanguage === 'hi' ? "ओपीडी क्लिनिशियन" : "OPD Clinician"}
                </p>
              </div>
            </button>
          </div>
        </div>

        {/* Dynamic Form depending on selected role */}
        <form onSubmit={handleFormSubmit} className="space-y-4">
          {authRole === "patient" ? (
            /* PATIENT LOGIN FORM FIELDS */
            <div className="space-y-3 animate-in fade-in duration-200">
              <div className="space-y-1 text-left">
                <label className="text-xs font-bold text-slate-700 flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <CreditCard className="w-3.5 h-3.5 text-blue-600" />
                    <span>ABHA ID (Ayushman Bharat Health Account)</span>
                  </span>
                  <span className="text-[10px] text-blue-600 font-semibold">Verified</span>
                </label>
                <input
                  type="text"
                  value={abhaId}
                  onChange={(e) => setAbhaId(e.target.value)}
                  placeholder="91-4521-8890-1234"
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-xs font-bold text-slate-800 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all shadow-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-2 text-left">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-blue-600" />
                    <span>Mobile No.</span>
                  </label>
                  <input
                    type="text"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    placeholder="+91 98250 44120"
                    required
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-300 bg-white text-xs font-bold text-slate-800 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all shadow-xs"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                    <Lock className="w-3.5 h-3.5 text-blue-600" />
                    <span>OTP Code</span>
                  </label>
                  <input
                    type="password"
                    value={patientOtp}
                    onChange={(e) => setPatientOtp(e.target.value)}
                    placeholder="458921"
                    required
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-300 bg-white text-xs font-bold text-slate-800 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all shadow-xs"
                  />
                </div>
              </div>

              {/* Demo Patient Fast Selector Chips */}
              <div className="pt-1">
                <p className="text-[11px] font-semibold text-slate-500 mb-1.5 text-left flex items-center justify-between">
                  <span>Fill Demo Patient Profile:</span>
                  <span className="text-[10px] text-slate-400 font-normal">(Clicking fills form details)</span>
                </p>
                <div className="flex flex-wrap gap-1.5">
                  <button
                    type="button"
                    onClick={() => handleQuickPatientSelect("P001", "Rajesh Patel", "91-4521-8890-1234", "+91 98250 44120")}
                    className={cn(
                      "px-2.5 py-1 rounded-lg text-[11px] font-bold border transition-all cursor-pointer flex items-center gap-1",
                      selectedPatientId === "P001"
                        ? "bg-blue-100 text-blue-900 border-blue-400 ring-1 ring-blue-400/50 shadow-xs"
                        : "bg-blue-50/70 hover:bg-blue-100 text-blue-700 border-blue-200"
                    )}
                  >
                    <span>👤 Rajesh Patel (Token A103 • High)</span>
                    {selectedPatientId === "P001" && <span className="text-[10px] text-blue-700 font-black">✓</span>}
                  </button>
                  <button
                    type="button"
                    onClick={() => handleQuickPatientSelect("P002", "Priya Sharma", "14-8892-3341-9087", "+91 97123 88450")}
                    className={cn(
                      "px-2.5 py-1 rounded-lg text-[11px] font-bold border transition-all cursor-pointer flex items-center gap-1",
                      selectedPatientId === "P002"
                        ? "bg-blue-100 text-blue-900 border-blue-400 ring-1 ring-blue-400/50 shadow-xs"
                        : "bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200"
                    )}
                  >
                    <span>👤 Priya Sharma (Token A101)</span>
                    {selectedPatientId === "P002" && <span className="text-[10px] text-blue-700 font-black">✓</span>}
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* DOCTOR LOGIN FORM FIELDS */
            <div className="space-y-3 animate-in fade-in duration-200">
              <div className="space-y-1 text-left">
                <label className="text-xs font-bold text-slate-700 flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <Building className="w-3.5 h-3.5 text-teal-600" />
                    <span>Physician ID / Medical Council Reg.</span>
                  </span>
                  <span className="text-[10px] text-teal-700 font-semibold">GMC Active</span>
                </label>
                <input
                  type="text"
                  value={doctorId}
                  onChange={(e) => setDoctorId(e.target.value)}
                  placeholder="DOC-TRIVEDI or GMC-34190"
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-xs font-bold text-slate-800 focus:ring-2 focus:ring-teal-500 focus:outline-none transition-all shadow-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-2 text-left">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                    <Lock className="w-3.5 h-3.5 text-teal-600" />
                    <span>Security PIN</span>
                  </label>
                  <input
                    type="password"
                    value={doctorPin}
                    onChange={(e) => setDoctorPin(e.target.value)}
                    placeholder="1234"
                    required
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-300 bg-white text-xs font-bold text-slate-800 focus:ring-2 focus:ring-teal-500 focus:outline-none transition-all shadow-xs"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                    <Activity className="w-3.5 h-3.5 text-teal-600" />
                    <span>OPD Station</span>
                  </label>
                  <input
                    type="text"
                    value={opdRoom}
                    onChange={(e) => setOpdRoom(e.target.value)}
                    placeholder="OPD Room 04"
                    required
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-300 bg-white text-xs font-bold text-slate-800 focus:ring-2 focus:ring-teal-500 focus:outline-none transition-all shadow-xs"
                  />
                </div>
              </div>

              {/* Demo Doctor Fast Selector Chips */}
              <div className="pt-1">
                <p className="text-[11px] font-semibold text-slate-500 mb-1.5 text-left flex items-center justify-between">
                  <span>Fill Demo Physician:</span>
                  <span className="text-[10px] text-slate-400 font-normal">(Clicking fills form details)</span>
                </p>
                <div className="flex flex-wrap gap-1.5">
                  <button
                    type="button"
                    onClick={() => handleQuickDoctorSelect("DOC-TRIVEDI", "OPD Room 04 (Cardiology)")}
                    className={cn(
                      "px-2.5 py-1 rounded-lg text-[11px] font-bold border transition-all cursor-pointer flex items-center gap-1",
                      selectedDoctorId === "DOC-TRIVEDI"
                        ? "bg-teal-100 text-teal-900 border-teal-400 ring-1 ring-teal-400/50 shadow-xs"
                        : "bg-teal-50 hover:bg-teal-100 text-teal-800 border-teal-200"
                    )}
                  >
                    <span>🩺 Dr. S. Trivedi (Chief Cardiology)</span>
                    {selectedDoctorId === "DOC-TRIVEDI" && <span className="text-[10px] text-teal-700 font-black">✓</span>}
                  </button>
                  <button
                    type="button"
                    onClick={() => handleQuickDoctorSelect("DOC-MEHTA", "OPD Room 02 (General Medicine)")}
                    className={cn(
                      "px-2.5 py-1 rounded-lg text-[11px] font-bold border transition-all cursor-pointer flex items-center gap-1",
                      selectedDoctorId === "DOC-MEHTA"
                        ? "bg-teal-100 text-teal-900 border-teal-400 ring-1 ring-teal-400/50 shadow-xs"
                        : "bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200"
                    )}
                  >
                    <span>🩺 Dr. A. Mehta (Medicine)</span>
                    {selectedDoctorId === "DOC-MEHTA" && <span className="text-[10px] text-teal-700 font-black">✓</span>}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Primary Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className={cn(
              "w-full py-3.5 px-5 rounded-2xl text-white font-black text-sm flex items-center justify-center gap-2.5 shadow-lg transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer",
              authRole === "patient"
                ? "bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 shadow-blue-500/25"
                : "bg-gradient-to-r from-teal-600 via-teal-700 to-emerald-700 hover:from-teal-700 hover:to-emerald-800 shadow-teal-500/25"
            )}
          >
            <KeyRound className="w-4 h-4" />
            <span>
              {isLoading
                ? (selectedLanguage === 'gu' ? "ચકાસણી ચાલુ છે..." : selectedLanguage === 'hi' ? "सत्यापन जारी है..." : "Verifying Session...")
                : authRole === "patient"
                  ? (selectedLanguage === 'gu' ? "દર્દી તરીકે સાઇન ઇન કરો અને પોર્ટલ ખોલો" : selectedLanguage === 'hi' ? "मरीज के रूप में लॉगिन करें और पोर्टल खोलें" : "Sign In as Patient & Open Portal")
                  : (selectedLanguage === 'gu' ? "ડૉક્ટર તરીકે સાઇન ઇન કરો અને કન્સોલ ખોલો" : selectedLanguage === 'hi' ? "डॉक्टर के रूप में लॉगिन करें और कंसोल खोलें" : "Sign In as Doctor & Open Console")}
            </span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Footer Security Badges */}
        <div className="flex items-center justify-between text-[11px] font-medium text-slate-400 border-t border-slate-200/80 pt-3">
          <span className="flex items-center gap-1 text-slate-500 font-semibold">
            <BadgeCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>DPDP 2023 Compliant</span>
          </span>
          <span>Civil Hospital • SSIP Hackathon</span>
        </div>

      </div>
    </div>
  );
};

export const AuthSwitch = Component;
export default Component;
