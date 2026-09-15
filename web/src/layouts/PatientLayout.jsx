import React, { useState } from 'react';
import { Outlet, NavLink, useNavigate, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  User,
  MessageSquare,
  FileSearch,
  Clock,
  Pill,
  FileText,
  ShieldCheck,
  AlertTriangle,
  Compass,
  Flower2,
  Ticket,
  LogOut,
  Menu,
  X,
  HeartPulse,
  Share2,
  Globe,
  Bell,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { useDemo } from '../context/DemoContext';
import { SUPPORTED_LANGUAGES } from '../data/patients';

export const PatientLayout = () => {
  const {
    activePatient,
    tokenNumber,
    selectedLanguage,
    changeLanguage,
    historyCompleteness,
    logout,
    notifyTriage,
    setAbdmModalOpen,
    t
  } = useDemo();

  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // 10 Core Patient Modules + AYUSH Mode
  const navItems = [
    { label: '1. Dashboard', path: '/patient/dashboard', icon: LayoutDashboard },
    { label: '2. My Profile', path: '/patient/profile', icon: User },
    { label: '3. Clinical History', path: '/patient/history', icon: MessageSquare, badge: 'Voice + AI' },
    { label: '4. Medical Documents', path: '/patient/documents', icon: FileSearch, badge: 'OCR' },
    { label: '5. Medical Timeline', path: '/patient/timeline', icon: Clock },
    { label: '6. Medicines & Allergies', path: '/patient/medicines', icon: Pill },
    { label: '7. AI Summary', path: '/patient/summary', icon: FileText, badge: 'SOAP' },
    { label: '8. Consent & Privacy', path: '/patient/consent', icon: ShieldCheck, badge: 'DPDP' },
    { label: '9. Priority Alerts', path: '/patient/alerts', icon: AlertTriangle, badge: 'Triage' },
    { label: '10. Complete Journey', path: '/patient/journey', icon: Compass, highlight: true },
    { label: 'AYUSH Mode', path: '/patient/ayush-history', icon: Flower2, tag: 'Ayurveda' }
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col text-slate-800">
      
      {/* Top Patient Navigation Header */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-18 flex items-center justify-between">
          
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-slate-600 hover:bg-slate-100"
              aria-label="Toggle navigation"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            <div
              onClick={() => navigate('/patient/dashboard')}
              className="flex items-center gap-2.5 cursor-pointer"
            >
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-blue-600 flex items-center justify-center text-white shadow-sm shadow-blue-500/25">
                <HeartPulse className="w-5 h-5 stroke-[2.2]" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-black text-lg tracking-tight text-slate-900">MediKiosk</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                    Patient Kiosk
                  </span>
                </div>
                <p className="text-[10px] text-slate-500 hidden sm:block">Civil Hospital • Interactive OPD Station</p>
              </div>
            </div>
          </div>

          {/* Right Header Tools */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Live Token Badge */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 text-white rounded-xl font-mono font-bold text-xs shadow-sm shadow-blue-500/20">
              <Ticket className="w-3.5 h-3.5" />
              <span>Token: {activePatient?.token || tokenNumber || 'A103'}</span>
            </div>

            {/* Emergency Red-Flag Triage Trigger */}
            <button
              type="button"
              onClick={() => notifyTriage()}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 transition-colors cursor-pointer"
              title="Trigger Bedside Triage Assistance"
            >
              <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
              <span>Nurse Assist</span>
            </button>

            {/* ABDM Sync Button */}
            <button
              type="button"
              onClick={() => setAbdmModalOpen(true)}
              className="hidden md:inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-semibold bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors"
            >
              <Share2 className="w-3.5 h-3.5 text-blue-600" />
              <span>ABDM</span>
            </button>

            {/* Language Switcher */}
            <div className="flex items-center gap-1 px-2 py-1.5 rounded-xl border border-slate-200 bg-white text-xs">
              <Globe className="w-3.5 h-3.5 text-blue-600" />
              <select
                value={selectedLanguage}
                onChange={(e) => changeLanguage(e.target.value)}
                className="bg-transparent border-none outline-hidden text-xs font-semibold text-slate-800 cursor-pointer pr-1"
              >
                {SUPPORTED_LANGUAGES.map(l => (
                  <option key={l.code} value={l.code}>{l.name}</option>
                ))}
              </select>
            </div>

            {/* Logout */}
            <button
              type="button"
              onClick={logout}
              className="p-2 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
              title="Log Out of Session"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>

        </div>
      </header>

      {/* Main Workspace Layout */}
      <div className="flex-1 flex w-full relative">
        
        {/* Left Sidebar (Desktop) */}
        <aside className="hidden lg:flex flex-col w-64 xl:w-72 bg-white border-r border-slate-200/90 p-4 shrink-0 h-[calc(100vh-4.5rem)] sticky top-[4.5rem] overflow-y-auto">
          
          {/* Active Patient Pill */}
          <div className="p-3.5 rounded-2xl bg-blue-50/60 border border-blue-100 mb-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs">
                {activePatient?.name?.charAt(0) || 'P'}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-bold text-slate-900 truncate">{activePatient?.name || 'Ramesh Patel'}</p>
                <p className="text-[10px] text-slate-500 font-mono">UHID: {activePatient?.id || 'P001'}</p>
              </div>
            </div>
            
            {/* History Progress Mini Bar */}
            <div className="mt-2.5 pt-2 border-t border-blue-100/60 flex items-center justify-between text-[10px]">
              <span className="text-slate-500 font-semibold">Intake Progress</span>
              <span className="font-bold text-blue-700">{historyCompleteness || 82}%</span>
            </div>
            <div className="w-full h-1.5 bg-blue-200/60 rounded-full overflow-hidden mt-1">
              <div
                className="h-full bg-blue-600 rounded-full transition-all duration-300"
                style={{ width: `${historyCompleteness || 82}%` }}
              />
            </div>
          </div>

          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-2 mb-2">
            Patient Kiosk Modules
          </p>

          {/* Navigation Links */}
          <nav className="space-y-1 flex-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/25'
                      : item.highlight
                      ? 'text-blue-900 bg-blue-50/70 hover:bg-blue-100/70'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                    <span className="truncate">{item.label}</span>
                  </div>

                  {item.badge && (
                    <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold ${
                      isActive ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                  {item.tag && (
                    <span className="text-[10px] px-1.5 py-0.5 rounded font-bold bg-amber-50 text-amber-800 border border-amber-200">
                      {item.tag}
                    </span>
                  )}
                </NavLink>
              );
            })}
          </nav>

          <div className="mt-4 pt-3 border-t border-slate-100 text-[10px] text-slate-400 text-center">
            Civil Hospital OPD Kiosk v3.2
          </div>
        </aside>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex">
            <div className="w-72 bg-white h-full p-4 flex flex-col justify-between shadow-2xl animate-in slide-in-from-left duration-200">
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <HeartPulse className="w-5 h-5 text-blue-600" />
                    <span className="font-bold text-sm text-slate-900">Patient Navigation</span>
                  </div>
                  <button onClick={() => setMobileMenuOpen(false)} className="p-1 text-slate-400">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <nav className="space-y-1">
                  {navItems.map((item) => (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      onClick={() => setMobileMenuOpen(false)}
                      className={({ isActive }) =>
                        `flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold ${
                          isActive ? 'bg-blue-600 text-white' : 'text-slate-700 hover:bg-slate-100'
                        }`
                      }
                    >
                      <span>{item.label}</span>
                      <ChevronRight className="w-3.5 h-3.5 opacity-60" />
                    </NavLink>
                  ))}
                </nav>
              </div>

              <button
                type="button"
                onClick={logout}
                className="w-full py-2.5 rounded-xl bg-rose-50 text-rose-700 font-bold text-xs flex items-center justify-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                <span>End Session</span>
              </button>
            </div>
            <div className="flex-1" onClick={() => setMobileMenuOpen(false)}></div>
          </div>
        )}

        {/* Main Routed Content Area */}
        <main className="flex-1 min-w-0 p-4 sm:p-6 lg:p-8 max-w-6xl mx-auto w-full">
          <Outlet />
        </main>

      </div>

    </div>
  );
};

export default PatientLayout;
