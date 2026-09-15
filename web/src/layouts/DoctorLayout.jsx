import React, { useState } from 'react';
import { Outlet, NavLink, useNavigate, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  FileCheck2,
  AlertOctagon,
  FileText,
  Clock,
  ExternalLink,
  Pill,
  CheckCircle2,
  Stethoscope,
  UserCheck,
  LogOut,
  Bell,
  Menu,
  X,
  Hospital,
  ChevronDown,
  BarChart3,
  Flower2,
  Activity,
  Ticket
} from 'lucide-react';
import { useDemo } from '../context/DemoContext';

export const DoctorLayout = () => {
  const {
    activeDoctor,
    patients,
    activePatient,
    switchPatient,
    alerts,
    logout,
    notifyTriage,
    t
  } = useDemo();

  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [patientDropdownOpen, setPatientDropdownOpen] = useState(false);

  const activeAlertsCount = alerts?.filter(a => a.status === 'New' || a.status === 'Active')?.length || 0;
  const currentPatientId = activePatient?.id || "P001";

  // Exact 10 Doctor Modules + AYUSH Mode
  const navItems = [
    { label: '1. OPD Dashboard', path: '/doctor/dashboard', icon: LayoutDashboard },
    { label: '2. Patient Queue', path: '/doctor/queue', icon: Users, badge: `${patients.length}` },
    { label: '3. Patient History', path: `/doctor/patient/${currentPatientId}/history`, matchPrefix: '/doctor/patient/', matchSuffix: '/history', icon: FileCheck2 },
    { label: '4. AI Summary', path: `/doctor/patient/${currentPatientId}/summary`, matchSuffix: '/summary', icon: FileText, badge: 'SOAP' },
    { label: '5. Documents & OCR', path: `/doctor/patient/${currentPatientId}/documents`, matchSuffix: '/documents', icon: ExternalLink },
    { label: '6. Medical Timeline', path: `/doctor/patient/${currentPatientId}/timeline`, matchSuffix: '/timeline', icon: Clock },
    { label: '7. Medication Review', path: `/doctor/patient/${currentPatientId}/medications`, matchSuffix: '/medications', icon: Pill, badge: 'Flag' },
    { label: '8. Clinical Alerts', path: '/doctor/alerts', icon: AlertOctagon, alertCount: activeAlertsCount },
    { label: '9. Consultation & EHR', path: `/doctor/patient/${currentPatientId}/consultation`, matchSuffix: '/consultation', icon: Stethoscope, highlight: true },
    { label: '10. Doctor Analytics', path: '/doctor/analytics', icon: BarChart3 },
    { label: 'AYUSH Review', path: `/doctor/patient/${currentPatientId}/ayush`, matchSuffix: '/ayush', icon: Flower2, tag: 'Ayurveda' }
  ];

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col text-slate-800">

      {/* Top Clinical Header */}
      <header className="sticky top-0 z-40 bg-slate-900 text-white border-b border-slate-800 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-18 flex items-center justify-between">

          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800"
              aria-label="Toggle navigation"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            <div
              onClick={() => navigate('/doctor/dashboard')}
              className="flex items-center gap-2.5 cursor-pointer"
            >
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-500/30">
                <Hospital className="w-5 h-5 stroke-[2.2]" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-black text-lg tracking-tight text-white">MediKiosk</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-cyan-900/60 text-cyan-300 border border-cyan-700">
                    Doctor Station
                  </span>
                </div>
                <p className="text-[10px] text-slate-400 hidden sm:block">
                  Civil Hospital • {activeDoctor?.room || "OPD Room 04"} ({activeDoctor?.department || "Cardiology"})
                </p>
              </div>
            </div>
          </div>

          {/* Center / Right: Patient Selector & Alerts */}
          <div className="flex items-center gap-2 sm:gap-3">

            {/* Active Patient Switcher Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setPatientDropdownOpen(!patientDropdownOpen)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-800 border border-slate-700 hover:bg-slate-700/80 text-xs text-white transition-colors"
                title="Select patient from queue"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span className="font-bold truncate max-w-[120px] sm:max-w-[160px]">
                  {activePatient?.name || "Rajesh Patel"}
                </span>
                <span className="hidden sm:inline text-[10px] text-cyan-300 font-mono">
                  ({activePatient?.token || "A103"})
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {patientDropdownOpen && (
                <div className="absolute right-0 mt-2 w-72 bg-white text-slate-800 rounded-2xl shadow-2xl border border-slate-200 p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="px-3 py-2 border-b border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900">OPD Waiting Queue</span>
                    <span className="text-[10px] bg-blue-50 text-blue-700 px-2 py-0.5 rounded font-bold">
                      {patients.length} Ready
                    </span>
                  </div>
                  <div className="space-y-1 mt-1 max-h-60 overflow-y-auto">
                    {patients.map(p => (
                      <button
                        key={p.id}
                        type="button"
                        onClick={() => {
                          switchPatient(p.id);
                          setPatientDropdownOpen(false);
                          navigate(`/doctor/patient/${p.id}/summary`);
                        }}
                        className={`w-full text-left px-3 py-2 rounded-xl text-xs flex items-center justify-between transition-colors ${
                          p.id === activePatient.id ? 'bg-blue-50 text-blue-900 font-bold' : 'hover:bg-slate-50 text-slate-700'
                        }`}
                      >
                        <div>
                          <p className="font-bold">{p.name}</p>
                          <p className="text-[10px] text-slate-400">{p.token || p.id} • {p.department}</p>
                        </div>
                        <span className={`text-[10px] px-2 py-0.5 rounded font-bold ${
                          p.priority === 'High' ? 'bg-rose-100 text-rose-800' : 'bg-slate-100 text-slate-600'
                        }`}>
                          {p.priority}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Doctor Profile Banner */}
            <div className="hidden md:flex items-center gap-2 bg-slate-800/80 px-3 py-1.5 rounded-xl border border-slate-700 text-xs">
              <Stethoscope className="w-3.5 h-3.5 text-cyan-400" />
              <span className="font-bold text-white">{activeDoctor?.name || "Dr. S. Trivedi"}</span>
            </div>

            {/* Logout */}
            <button
              type="button"
              onClick={logout}
              className="p-2 rounded-xl text-slate-400 hover:text-rose-400 hover:bg-slate-800 transition-colors cursor-pointer"
              title="End Doctor Session"
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

          {/* Active Consultation Patient Card */}
          <div className="p-3.5 rounded-2xl bg-slate-900 text-white mb-4 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-cyan-300 uppercase tracking-wide">
                Active In-Desk Case
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                {activePatient?.token || "A103"}
              </span>
            </div>
            <h4 className="text-sm font-bold text-white mt-1.5 truncate">
              {activePatient?.name || "Rajesh Patel"}
            </h4>
            <p className="text-[11px] text-slate-400">
              {activePatient?.age || 54}y {activePatient?.gender || "Male"} • {activePatient?.department || "Cardiology"}
            </p>
            <div className="mt-2 pt-2 border-t border-slate-800 flex items-center justify-between text-[11px]">
              <span className="text-slate-400">Intake Confidence:</span>
              <span className="font-mono font-bold text-emerald-400">{activePatient?.completeness || 94}%</span>
            </div>
          </div>

          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-2 mb-2">
            Doctor Station Modules
          </p>

          {/* Navigation Links */}
          <nav className="space-y-1 flex-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive =
                location.pathname === item.path ||
                (item.matchSuffix && location.pathname.endsWith(item.matchSuffix));

              return (
                <NavLink
                  key={item.label}
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
                  {item.alertCount > 0 && (
                    <span className="text-[10px] px-1.5 py-0.5 rounded-full font-bold bg-rose-500 text-white animate-pulse">
                      {item.alertCount}
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
            MediKiosk Clinical Console • v3.2
          </div>
        </aside>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex">
            <div className="w-72 bg-white h-full p-4 flex flex-col justify-between shadow-2xl animate-in slide-in-from-left duration-200">
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <Hospital className="w-5 h-5 text-blue-600" />
                    <span className="font-bold text-sm text-slate-900">Doctor Navigation</span>
                  </div>
                  <button onClick={() => setMobileMenuOpen(false)} className="p-1 text-slate-400">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <nav className="space-y-1">
                  {navItems.map((item) => (
                    <NavLink
                      key={item.label}
                      to={item.path}
                      onClick={() => setMobileMenuOpen(false)}
                      className={({ isActive }) =>
                        `flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold ${
                          isActive ? 'bg-blue-600 text-white' : 'text-slate-700 hover:bg-slate-100'
                        }`
                      }
                    >
                      <span>{item.label}</span>
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
                <span>Log Out Station</span>
              </button>
            </div>
            <div className="flex-1" onClick={() => setMobileMenuOpen(false)}></div>
          </div>
        )}

        {/* Main Routed Content Area */}
        <main className="flex-1 min-w-0 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
          <Outlet />
        </main>

      </div>

    </div>
  );
};

export default DoctorLayout;
