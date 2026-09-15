import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useDemo } from '../context/DemoContext';
import {
  Home,
  UserPlus,
  MessageSquareHeart,
  FileSearch,
  LayoutDashboard
} from 'lucide-react';

export const MobileBottomNav = () => {
  const location = useLocation();
  const { t } = useDemo();

  const mobileNavItems = [
    { name: t("nav.home", "Home"), path: "/", icon: Home },
    { name: t("common.patient", "Intake"), path: "/patient-intake", icon: UserPlus, badge: "1" },
    { name: t("nav.aiHistory", "AI History"), path: "/ai-history", icon: MessageSquareHeart, badge: "2" },
    { name: t("nav.documents", "OCR Scan"), path: "/documents", icon: FileSearch, badge: "3" },
    { name: t("common.doctor", "Doctor"), path: "/doctor-dashboard", icon: LayoutDashboard, badge: "5" }
  ];

  return (
    <nav
      className="lg:hidden fixed bottom-0 inset-x-0 bg-white/95 backdrop-blur-md border-t border-slate-200/90 py-1.5 px-3 z-40 shadow-lg flex items-center justify-around"
      aria-label="Mobile Navigation Bar"
    >
      {mobileNavItems.map((item) => {
        const Icon = item.icon;
        const isActive = location.pathname === item.path;

        return (
          <NavLink
            key={item.path}
            to={item.path}
            className={`flex flex-col items-center py-1 px-2.5 rounded-xl transition-all relative ${isActive
                ? 'text-teal-700 font-bold'
                : 'text-slate-500 hover:text-slate-800'
              }`}
          >
            <div className="relative">
              <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.5]' : 'stroke-2'}`} />
              {item.badge && (
                <span className={`absolute -top-1 -right-2 text-[9px] font-black w-3.5 h-3.5 rounded-full flex items-center justify-center ${isActive ? 'bg-teal-700 text-white' : 'bg-slate-200 text-slate-600'
                  }`}>
                  {item.badge}
                </span>
              )}
            </div>
            <span className="text-[10px] mt-0.5 tracking-tight">{item.name}</span>
            {isActive && (
              <span className="w-1 h-1 rounded-full bg-teal-600 mt-0.5" />
            )}
          </NavLink>
        );
      })}
    </nav>
  );
};
