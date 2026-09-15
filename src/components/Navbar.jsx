import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDemo } from '../context/DemoContext';
import { SUPPORTED_LANGUAGES } from '../data/patients';
import {
  Globe,
  Bell,
  Menu,
  X,
  Sparkles,
  Share2,
  ChevronDown,
  User,
  Volume2,
  HeartPulse,
  Stethoscope,
  LogIn,
  LogOut,
  KeyRound
} from 'lucide-react';

export const Navbar = () => {
  const location = useLocation();
  const {
    isAuthenticated,
    selectedLanguage,
    changeLanguage,
    t,
    setAbdmModalOpen,
    activePatient,
    switchPatient,
    patients,
    activeDoctor,
    userRole,
    addToast,
    logout
  } = useDemo();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [patientPickerOpen, setPatientPickerOpen] = useState(false);
  const [loginMenuOpen, setLoginMenuOpen] = useState(false);

  const navLinks = [
    { name: t("nav.home", "Home"), path: "/" },
    { name: t("nav.patientIntake", "01 Patient Intake"), path: "/patient-intake" },
    { name: t("nav.aiHistory", "02 AI History"), path: "/ai-history" },
    { name: t("nav.documents", "03 Document OCR"), path: "/documents" },
    { name: t("nav.timeline", "Medical Timeline"), path: "/timeline" },
    { name: t("nav.ayush", "AYUSH Mode"), path: "/ayush" },
    { name: t("nav.clinicalSummary", "04 Clinical Summary"), path: "/clinical-summary" },
    { name: t("nav.doctorDashboard", "05 Doctor Dashboard"), path: "/doctor-dashboard" },
    { name: t("nav.consent", "Privacy & Consent"), path: "/consent" },
    { name: t("nav.about", "About"), path: "/about" }
  ];

  const notifications = [
    { id: 1, title: "Triage Alert Flagged", time: "2 min ago", unread: true, text: "Rajesh Patel (MK-1001) flagged with chest discomfort" },
    { id: 2, title: "OCR Document Parsed", time: "14 min ago", unread: false, text: "Prescription for Priya Sharma successfully digitized" },
    { id: 3, title: "FHIR Payload Formatted", time: "1 hr ago", unread: false, text: "ABDM readiness validated for OPD Batch 12" }
  ];

  return (
    <header className="fixed top-0 left-0 right-0 w-full z-[1000] bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-2xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-3">

          {/* Brand Logo & Platform Title */}
          <div className="flex items-center gap-3">
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-blue-600 flex items-center justify-center text-white shadow-sm shadow-blue-500/25 group-hover:scale-105 transition-transform">
                <HeartPulse className="w-6 h-6 stroke-[2.4]" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xl sm:text-2xl font-black tracking-tight text-slate-900">
                    Medi<span className="text-blue-600">Kiosk</span>
                  </span>
                  <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-200">
                    Smart OPD
                  </span>
                </div>
                <p className="text-[11px] font-medium text-slate-500 tracking-wide">
                  {t("common.appTagline", "Smart Case History • Better Care")}
                </p>
              </div>
            </Link>
          </div>

          {/* Right Action Tools */}
          <div className="flex items-center gap-2 sm:gap-3">

            {/* Authenticated Actions Only */}
            {isAuthenticated && (
              <>
                {/* Direct Logout Button */}
                <button
                  type="button"
                  onClick={logout}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 shadow-2xs transition-colors cursor-pointer"
                  title="Log Out & Return to Login Screen"
                >
                  <LogOut className="w-3.5 h-3.5 text-rose-600" />
                  <span className="hidden sm:inline">{t("common.logout", "Log Out")}</span>
                </button>

                {/* Active Demo Patient Switcher */}
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setPatientPickerOpen(!patientPickerOpen)}
                    className="flex items-center gap-2 px-2.5 py-1.5 rounded-xl border border-slate-200 bg-slate-50/80 hover:bg-slate-100 text-xs text-slate-700 transition-colors"
                    title="Switch Demo Patient Profile"
                  >
                    <div className={`w-2 h-2 rounded-full ${activePatient.priority === 'High' ? 'bg-rose-500 animate-pulse' : 'bg-emerald-500'}`} />
                    <span className="font-semibold text-slate-800 truncate max-w-[80px] sm:max-w-[110px]">
                      {userRole === 'doctor' ? (activeDoctor?.name || 'Dr. Mehta') : activePatient.name}
                    </span>
                    <span className="hidden sm:inline text-[10px] text-slate-500 font-mono">
                      ({userRole === 'doctor' ? t('common.doctor', 'Doctor') : activePatient.id})
                    </span>
                    <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                  </button>

                  {patientPickerOpen && (
                    <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-slate-200 p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                      <div className="px-3 py-2 border-b border-slate-100">
                        <p className="text-xs font-bold text-slate-900">{t("nav.switchRoleBtn", "Switch Demo Profile")}</p>
                        <p className="text-[11px] text-slate-500">Test different clinical scenarios</p>
                      </div>
                      <div className="space-y-1 mt-1 max-h-60 overflow-y-auto">
                        {patients.map(p => (
                          <button
                            key={p.id}
                            type="button"
                            onClick={() => {
                              switchPatient(p.id);
                              setPatientPickerOpen(false);
                            }}
                            className={`w-full text-left px-3 py-2 rounded-xl text-xs flex items-center justify-between transition-colors ${p.id === activePatient.id ? 'bg-blue-50 text-blue-900 font-bold' : 'hover:bg-slate-50 text-slate-700'
                              }`}
                          >
                            <div>
                              <p className="font-semibold">{p.name}</p>
                              <p className="text-[10px] text-slate-400">{p.id} • {p.language}</p>
                            </div>
                            <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold ${p.priority === 'High' ? 'bg-red-100 text-red-800' : p.priority === 'Medium' ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'
                              }`}>
                              {p.priority}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </>
            )}

            {/* Language Selector */}
            <div className="relative flex items-center">
              <label htmlFor="language-select" className="sr-only">Choose Language</label>
              <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border border-slate-200 bg-white text-xs font-medium text-slate-700 hover:border-slate-300 transition-colors">
                <Globe className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                <select
                  id="language-select"
                  value={selectedLanguage}
                  onChange={(e) => changeLanguage(e.target.value)}
                  className="bg-transparent border-none outline-hidden text-xs font-semibold text-slate-800 cursor-pointer pr-1"
                >
                  {SUPPORTED_LANGUAGES.map(lang => (
                    <option key={lang.code} value={lang.code}>
                      {lang.nativeName} ({lang.name})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* ABDM Sync Button */}
            <button
              type="button"
              onClick={() => setAbdmModalOpen(true)}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200/80 transition-colors"
              title="ABDM / ABHA FHIR Sync Demo"
            >
              <Share2 className="w-3.5 h-3.5 text-blue-600" />
              <span>{t("nav.abdmSyncBtn", "ABDM Sync")}</span>
            </button>

            {/* Notifications Bell */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setNotifOpen(!notifOpen)}
                className="p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 relative transition-colors"
                aria-label="View notifications"
              >
                <Bell className="w-4 h-4" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
              </button>

              {notifOpen && (
                <div className="absolute right-0 mt-2 w-72 sm:w-80 bg-white rounded-2xl shadow-xl border border-slate-200 p-3 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                    <p className="text-xs font-bold text-slate-900">Hospital OPD Notifications</p>
                    <span className="text-[10px] bg-rose-50 text-rose-700 px-1.5 py-0.5 rounded-md font-bold">1 New Alert</span>
                  </div>
                  <div className="space-y-2 mt-2">
                    {notifications.map(n => (
                      <div key={n.id} className={`p-2.5 rounded-xl text-xs transition-colors ${n.unread ? 'bg-rose-50/70 border border-rose-100' : 'bg-slate-50'}`}>
                        <div className="flex items-center justify-between font-bold text-slate-800">
                          <span>{n.title}</span>
                          <span className="text-[10px] text-slate-400 font-normal">{n.time}</span>
                        </div>
                        <p className="text-[11px] text-slate-600 mt-1 leading-snug">{n.text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Navigation Drawer Toggle */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-slate-700 hover:bg-slate-100 transition-colors"
              aria-label="Open Navigation Bar"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

          </div>
        </div>
      </div>

      {/* Mobile Navigation Bar Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-6 space-y-3 animate-in slide-in-from-top duration-200 shadow-lg max-h-[calc(100vh-4rem)] overflow-y-auto">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <p className="text-xs font-bold text-slate-800">Active Patient: {activePatient.name}</p>
              <p className="text-[10px] text-slate-500">{activePatient.id} • {activePatient.language}</p>
            </div>
            <button
              type="button"
              onClick={() => {
                setAbdmModalOpen(true);
                setMobileMenuOpen(false);
              }}
              className="text-xs font-semibold px-2.5 py-1 bg-teal-50 text-teal-800 rounded-lg border border-teal-200"
            >
              ABDM Sync
            </button>
          </div>
          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Navigation Menu</p>
          <div className="grid grid-cols-2 gap-1.5">
            {navLinks.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${isActive
                      ? 'bg-teal-700 text-white shadow-xs'
                      : 'text-slate-700 bg-slate-50 hover:bg-slate-100'
                    }`}
                >
                  {item.name}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
};
