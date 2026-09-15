import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useDemo } from '../context/DemoContext';
import {
  Home,
  UserPlus,
  MessageSquareHeart,
  FileSearch,
  Clock,
  Flower2,
  FileText,
  LayoutDashboard,
  ShieldCheck,
  Info,
  ChevronRight,
  Compass,
  Layers,
  Activity,
  PanelLeft,
  KeyRound,
  LogOut
} from 'lucide-react';

export const Sidebar = () => {
  const location = useLocation();
  const { logout, t, isAuthenticated } = useDemo();

  const navSections = [
    {
      heading: t("nav.overview", "OVERVIEW"),
      items: [
        { name: t("nav.home", "Home / Overview"), path: "/", icon: Home }
      ]
    },
    ...(!isAuthenticated ? [{
      heading: t("nav.authentication", "AUTHENTICATION"),
      items: [
        { name: t("nav.loginAuth", "Login & Auth Switch"), path: "/login", icon: KeyRound, tag: "Portal" }
      ]
    }] : []),
    {
      heading: t("nav.coreJourney", "CORE PATIENT JOURNEY (5 STEPS)"),
      items: [
        { name: t("nav.patientIntake", "01 Patient Intake"), path: "/patient-intake", icon: UserPlus, badge: t("nav.step1Badge", "Step 1") },
        { name: t("nav.aiHistory", "02 AI History"), path: "/ai-history", icon: MessageSquareHeart, badge: t("nav.step2Badge", "Step 2") },
        { name: t("nav.documents", "03 Document OCR"), path: "/documents", icon: FileSearch, badge: t("nav.step3Badge", "Step 3") },
        { name: t("nav.clinicalSummary", "04 Clinical Summary"), path: "/clinical-summary", icon: FileText, badge: t("nav.step4Badge", "Step 4") },
        { name: t("nav.doctorDashboard", "05 Doctor Dashboard"), path: "/doctor-dashboard", icon: LayoutDashboard, badge: t("nav.step5Badge", "Step 5"), highlight: true }
      ]
    },
    {
      heading: t("nav.clinicalRecords", "CLINICAL RECORDS & MODES"),
      items: [
        { name: t("nav.timeline", "Medical Timeline"), path: "/timeline", icon: Clock },
        { name: t("nav.ayush", "AYUSH Mode"), path: "/ayush", icon: Flower2, tag: "Ayurveda" }
      ]
    },
    {
      heading: t("nav.governance", "GOVERNANCE & WHITE PAPER"),
      items: [
        { name: t("nav.consent", "Privacy & Consent"), path: "/consent", icon: ShieldCheck },
        { name: t("nav.about", "About & Showcase"), path: "/about", icon: Info }
      ]
    },
    {
      heading: "UI COMPONENTS",
      items: [
        { name: t("nav.dashboardSidebar", "Dashboard Sidebar"), path: "/dashboard-sidebar", icon: PanelLeft, tag: "Preview" }
      ]
    }
  ];

  return (
    <aside className="hidden lg:flex flex-col w-72 bg-white border-r border-slate-200/90 p-5 shrink-0 fixed left-0 top-16 sm:top-20 bottom-0 h-[calc(100vh-4rem)] sm:h-[calc(100vh-5rem)] overflow-y-auto shadow-2xs z-30">

      {/* Structured Navigation Groups */}
      <nav className="space-y-4 flex-1 overflow-y-auto pr-1" aria-label="Main Navigation Bar">
        {navSections.map((section, sIdx) => (
          <div key={sIdx} className="space-y-1">
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-3 mb-1">
              {section.heading}
            </p>

            {section.items.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={`group relative flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all duration-150 ${isActive
                      ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/25'
                      : item.highlight
                        ? 'text-blue-900 hover:bg-blue-50 bg-blue-50/60 font-bold'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                    }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : item.highlight ? 'text-blue-600' : 'text-slate-400 group-hover:text-slate-700'}`} />
                    <span className="truncate">{item.name}</span>
                  </div>

                  {item.badge && (
                    <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold ${isActive ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'
                      }`}>
                      {item.badge}
                    </span>
                  )}
                  {item.tag && (
                    <span className="text-[10px] px-1.5 py-0.5 rounded font-bold bg-blue-50 text-blue-700 border border-blue-200">
                      {item.tag}
                    </span>
                  )}
                </NavLink>
              );
            })}
          </div>
        ))}
      </nav>

      {/* Bottom Logout Button */}
      <div className="mt-3 pt-3 border-t border-slate-100">
        <button
          type="button"
          onClick={logout}
          className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-500 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer text-left"
        >
          <LogOut className="w-4 h-4 text-rose-500" />
          <span>Log Out</span>
        </button>
      </div>

    </aside>
  );
};
