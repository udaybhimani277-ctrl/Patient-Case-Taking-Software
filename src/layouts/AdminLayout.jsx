import React, { useState } from 'react';
import { Outlet, NavLink, useNavigate, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  UserCheck,
  Building2,
  Tv,
  AlertTriangle,
  FileSearch,
  BarChart3,
  TrendingDown,
  Share2,
  ScrollText,
  Settings,
  LogOut,
  Menu,
  X,
  Hospital,
  ShieldCheck,
  CheckCircle2,
  Activity
} from 'lucide-react';
import { useDemo } from '../context/DemoContext';

export const AdminLayout = () => {
  const {
    adminUser,
    kiosks,
    alerts,
    departments,
    patients,
    logout,
    adminSettings
  } = useDemo();

  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const activeAlertsCount = alerts?.filter(a => a.status === 'New' || a.status === 'Active')?.length || 0;
  const onlineKiosks = kiosks?.filter(k => k.status === 'Online')?.length || 0;

  // 11 Core Admin Modules + Settings
  const navItems = [
    { label: '1. Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
    { label: '2. Patient Directory', path: '/admin/patients', icon: Users, badge: `${patients.length}` },
    { label: '3. Doctor Roster', path: '/admin/doctors', icon: UserCheck },
    { label: '4. Departments', path: '/admin/departments', icon: Building2, badge: `${departments.length}` },
    { label: '5. Kiosk Fleet', path: '/admin/kiosks', icon: Tv, badge: `${onlineKiosks}/${kiosks.length} Live` },
    { label: '6. Priority Alerts', path: '/admin/alerts', icon: AlertTriangle, alertCount: activeAlertsCount },
    { label: '7. Document Pipeline', path: '/admin/documents', icon: FileSearch },
    { label: '8. Hospital Analytics', path: '/admin/analytics', icon: BarChart3 },
    { label: '9. Bottleneck Analytics', path: '/admin/bottlenecks', icon: TrendingDown, highlight: true },
    { label: '10. ABDM & HIS Integration', path: '/admin/integration', icon: Share2, badge: 'FHIR' },
    { label: '11. Audit Logs', path: '/admin/audit', icon: ScrollText },
    { label: 'Settings & Security', path: '/admin/settings', icon: Settings }
  ];

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col text-slate-800">

      {/* Top Admin Navigation Header */}
      <header className="sticky top-0 z-40 bg-slate-950 text-white border-b border-slate-800 shadow-md">
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
              onClick={() => navigate('/admin/dashboard')}
              className="flex items-center gap-2.5 cursor-pointer"
            >
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-indigo-500/30">
                <Building2 className="w-5 h-5 stroke-[2.2]" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-black text-lg tracking-tight text-white">MediKiosk</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-900/60 text-purple-300 border border-purple-700">
                    Hospital Admin
                  </span>
                </div>
                <p className="text-[10px] text-slate-400 hidden sm:block">
                  {adminSettings?.hospitalName || "Civil Hospital & Medical College"} • Central Fleet Control
                </p>
              </div>
            </div>
          </div>

          {/* Right Admin Stats & Controls */}
          <div className="flex items-center gap-2 sm:gap-3">

            {/* Kiosks Fleet Pulse */}
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800/90 border border-slate-700 text-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="font-mono text-emerald-300 font-bold">{onlineKiosks}/{kiosks.length}</span>
              <span className="text-slate-400">Kiosks Online</span>
            </div>

            {/* Active Admin Profile */}
            <div className="hidden md:flex items-center gap-2 bg-slate-800/80 px-3 py-1.5 rounded-xl border border-slate-700 text-xs text-slate-200">
              <ShieldCheck className="w-3.5 h-3.5 text-purple-400" />
              <span className="font-bold">{adminUser?.name || "Admin Sharma"}</span>
            </div>

            {/* Logout */}
            <button
              type="button"
              onClick={logout}
              className="p-2 rounded-xl text-slate-400 hover:text-rose-400 hover:bg-slate-800 transition-colors cursor-pointer"
              title="Sign Out of Admin Console"
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

          {/* Hospital Status Banner */}
          <div className="p-3.5 rounded-2xl bg-purple-50/70 border border-purple-100 mb-4">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-purple-800 uppercase tracking-wide">
                OPD Terminal Status
              </span>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            </div>
            <h4 className="text-xs font-bold text-slate-900 mt-1">
              Active Fleet: 6 Terminals
            </h4>
            <p className="text-[10px] text-slate-500">
              Avg Wait: 4.2 min • 482 Daily Inquiries
            </p>
          </div>

          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-2 mb-2">
            Administration Modules
          </p>

          {/* Navigation Links */}
          <nav className="space-y-1 flex-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;

              return (
                <NavLink
                  key={item.label}
                  to={item.path}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${
                    isActive
                      ? 'bg-purple-700 text-white shadow-sm shadow-purple-600/25'
                      : item.highlight
                      ? 'text-purple-900 bg-purple-50/70 hover:bg-purple-100/70'
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
                </NavLink>
              );
            })}
          </nav>

          <div className="mt-4 pt-3 border-t border-slate-100 text-[10px] text-slate-400 text-center">
            Hospital Admin Portal • DPDP Ready
          </div>
        </aside>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex">
            <div className="w-72 bg-white h-full p-4 flex flex-col justify-between shadow-2xl animate-in slide-in-from-left duration-200">
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <Building2 className="w-5 h-5 text-purple-700" />
                    <span className="font-bold text-sm text-slate-900">Admin Modules</span>
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
                          isActive ? 'bg-purple-700 text-white' : 'text-slate-700 hover:bg-slate-100'
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
                <span>Exit Console</span>
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

export default AdminLayout;
