import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import {
  HeartPulse,
  User,
  Stethoscope,
  ShieldAlert,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Building2,
  KeyRound,
  ShieldCheck,
  Zap,
  Globe
} from 'lucide-react';
import { useDemo } from '../../context/DemoContext';

export const LoginPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const initialRole = searchParams.get('role') || 'patient';

  const { loginPatient, loginDoctor, loginAdmin, selectedLanguage, changeLanguage, t } = useDemo();

  const [activeTab, setActiveTab] = useState(initialRole); // 'patient' | 'doctor' | 'admin'
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [rememberMe, setRememberMe] = useState(true);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!identifier.trim()) {
      setErrorMessage(
        activeTab === 'patient'
          ? "Please enter your Mobile Number or ABHA ID."
          : activeTab === 'doctor'
          ? "Please enter your Doctor ID or Medical Registration Number."
          : "Please enter your Admin Email address."
      );
      return;
    }

    if (!password.trim()) {
      setErrorMessage("Please enter your account password or PIN.");
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      if (activeTab === 'patient') {
        loginPatient("P001");
        navigate('/patient/dashboard');
      } else if (activeTab === 'doctor') {
        loginDoctor("DOC-TRIVEDI");
        navigate('/doctor/dashboard');
      } else {
        loginAdmin();
        navigate('/admin/dashboard');
      }
    }, 450);
  };

  // 1-Click Demo Login Handlers
  const handleDemoLogin = (role) => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      if (role === 'patient') {
        loginPatient("P001");
        navigate('/patient/dashboard');
      } else if (role === 'doctor') {
        loginDoctor("DOC-TRIVEDI");
        navigate('/doctor/dashboard');
      } else {
        loginAdmin();
        navigate('/admin/dashboard');
      }
    }, 300);
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center p-3 sm:p-6 my-auto">
      <div className="w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden grid grid-cols-1 lg:grid-cols-12 transition-all">

        {/* Left Column: Visual Branding & Value Proposition */}
        <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 via-blue-950 to-teal-950 p-6 sm:p-8 flex flex-col justify-between text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-blue-500/5 mix-blend-overlay"></div>

          <div className="relative z-10 space-y-6">
            <Link to="/" className="inline-flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-2xl bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-500/30">
                <HeartPulse className="w-6 h-6 stroke-[2.4]" />
              </div>
              <div>
                <span className="font-black text-xl tracking-tight text-white">
                  Medi<span className="text-teal-400">Kiosk</span>
                </span>
                <p className="text-[10px] text-teal-300 font-medium">Civil Hospital Smart OPD</p>
              </div>
            </Link>

            <div className="space-y-3 pt-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 text-[11px] font-bold border border-teal-500/30">
                <Sparkles className="w-3.5 h-3.5" />
                <span>AI-Powered Clinical Intake</span>
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-white leading-snug">
                From Patient's Story to Physician-Ready History.
              </h2>
              <p className="text-xs text-slate-300 leading-relaxed">
                Empowering government & private OPDs with instant conversational intake, ABHA aggregation, and rapid clinical summaries.
              </p>
            </div>

            <div className="space-y-2.5 pt-2 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
                <span>Multilingual Voice & Touch Questioning</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
                <span>Optical OCR Prescription Digitization</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
                <span>DPDP Compliant & ABDM FHIR Ready</span>
              </div>
            </div>
          </div>

          <div className="relative z-10 pt-8 border-t border-slate-800/80 text-[11px] text-slate-400 flex items-center justify-between">
            <span>Hospital Node #01</span>
            <span className="text-emerald-400 font-semibold flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Secure Portal
            </span>
          </div>
        </div>

        {/* Right Column: 3-Role Authentication Console */}
        <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-between">
          <div className="space-y-6">

            {/* Top Heading */}
            <div className="space-y-1">
              <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                Sign in to Portal
              </h3>
              <p className="text-xs text-slate-500">
                Select your role to access your personalized medical portal.
              </p>
            </div>

            {/* Role Tabs */}
            <div className="grid grid-cols-3 gap-1.5 p-1 bg-slate-100 rounded-2xl border border-slate-200">
              <button
                type="button"
                onClick={() => {
                  setActiveTab('patient');
                  setErrorMessage('');
                }}
                className={`py-2.5 px-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                  activeTab === 'patient'
                    ? 'bg-white text-blue-700 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <User className="w-4 h-4" />
                <span>Patient</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setActiveTab('doctor');
                  setErrorMessage('');
                }}
                className={`py-2.5 px-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                  activeTab === 'doctor'
                    ? 'bg-white text-blue-700 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Stethoscope className="w-4 h-4" />
                <span>Doctor</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setActiveTab('admin');
                  setErrorMessage('');
                }}
                className={`py-2.5 px-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                  activeTab === 'admin'
                    ? 'bg-white text-blue-700 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Building2 className="w-4 h-4" />
                <span>Admin</span>
              </button>
            </div>

            {/* Quick 1-Click Demo Bypass Banner */}
            <div className="bg-blue-50/70 border border-blue-200/80 p-3.5 rounded-2xl space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-blue-900 flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-blue-600" />
                  Instant 1-Click Demo Access
                </span>
                <span className="text-[10px] text-blue-600 bg-blue-100/70 px-2 py-0.5 rounded-full font-bold">
                  Reviewer Bypass
                </span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => handleDemoLogin('patient')}
                  className="py-1.5 px-2 rounded-xl bg-white border border-blue-200 text-blue-800 text-[11px] font-bold hover:bg-blue-600 hover:text-white transition-all shadow-2xs text-center truncate cursor-pointer"
                >
                  Rajesh (Patient)
                </button>
                <button
                  type="button"
                  onClick={() => handleDemoLogin('doctor')}
                  className="py-1.5 px-2 rounded-xl bg-white border border-blue-200 text-blue-800 text-[11px] font-bold hover:bg-blue-600 hover:text-white transition-all shadow-2xs text-center truncate cursor-pointer"
                >
                  Dr. Trivedi (OPD)
                </button>
                <button
                  type="button"
                  onClick={() => handleDemoLogin('admin')}
                  className="py-1.5 px-2 rounded-xl bg-white border border-blue-200 text-blue-800 text-[11px] font-bold hover:bg-blue-600 hover:text-white transition-all shadow-2xs text-center truncate cursor-pointer"
                >
                  Admin Sharma
                </button>
              </div>
            </div>

            {/* Error Message */}
            {errorMessage && (
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-start gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-600 mt-0.5" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Standard Login Form */}
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">
                  {activeTab === 'patient'
                    ? "Mobile Number or ABHA ID"
                    : activeTab === 'doctor'
                    ? "Doctor Registration ID / Email"
                    : "Admin Hospital Email"}
                </label>
                <input
                  type="text"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  placeholder={
                    activeTab === 'patient'
                      ? "e.g. 98250 44120 or 91-4521-8890"
                      : activeTab === 'doctor'
                      ? "e.g. GMC-34190 or dr.trivedi@civilhospital.gov.in"
                      : "e.g. admin@civilhospital.gov.in"
                  }
                  className="w-full text-xs p-3 rounded-xl border border-slate-200 focus:outline-hidden focus:border-blue-500 bg-slate-50 focus:bg-white transition-colors"
                />
              </div>

              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-700">Password or Security PIN</label>
                  <Link
                    to="/forgot-password"
                    className="text-[11px] font-bold text-blue-600 hover:text-blue-800"
                  >
                    Forgot Password?
                  </Link>
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter account password"
                    className="w-full text-xs p-3 pr-10 rounded-xl border border-slate-200 focus:outline-hidden focus:border-blue-500 bg-slate-50 focus:bg-white transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs pt-1">
                <label className="flex items-center gap-2 cursor-pointer text-slate-600">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span>Keep me signed in</span>
                </label>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-98 text-white font-bold text-sm shadow-md shadow-blue-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
              >
                {isLoading ? (
                  <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                ) : (
                  <>
                    <span>Sign In to {activeTab === 'patient' ? "Patient Portal" : activeTab === 'doctor' ? "Doctor Station" : "Admin Console"}</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

          </div>

          {/* Bottom Footer links */}
          <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
            <span>
              Don't have an account?{' '}
              <Link to="/register" className="font-bold text-blue-600 hover:underline">
                Register New User
              </Link>
            </span>
            <Link to="/" className="text-slate-400 hover:text-slate-600">
              Return to Public Overview
            </Link>
          </div>

        </div>

      </div>
    </div>
  );
};

export default LoginPage;
