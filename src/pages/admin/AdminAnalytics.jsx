import React from 'react';
import {
  BarChart3,
  TrendingUp,
  Globe,
  Mic,
  Users,
  Clock,
  Zap,
  CheckCircle2,
  PieChart,
  Activity
} from 'lucide-react';
import { useDemo } from '../../context/DemoContext';

export const AdminAnalytics = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-black tracking-tight text-slate-900">Hospital Operational Analytics</h1>
        <p className="text-xs text-slate-500 mt-1">
          Longitudinal intake patterns, patient interaction modalities, and multilingual adoption metrics
        </p>
      </div>

      {/* 4 Overview Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Intake Completion</span>
          <span className="text-3xl font-black text-slate-900 mt-1 block">94.8%</span>
          <span className="text-[11px] text-emerald-600 font-bold mt-1 block">Only 5.2% needed kiosk helper</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Voice Navigation Adoption</span>
          <span className="text-3xl font-black text-indigo-600 mt-1 block">38.4%</span>
          <span className="text-[11px] text-slate-500 mt-1 block">Elderly & low-literacy users</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Avg Kiosk Dwell Time</span>
          <span className="text-3xl font-black text-slate-900 mt-1 block">4.2 min</span>
          <span className="text-[11px] text-purple-600 font-bold mt-1 block">Rapid digital self-intake</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Daily Consultation Gain</span>
          <span className="text-3xl font-black text-emerald-600 mt-1 block">+42%</span>
          <span className="text-[11px] text-emerald-600 font-bold mt-1 block">+8 to 12 more patients/OPD</span>
        </div>
      </div>

      {/* Analytics Breakdown Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Language Breakdown */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <Globe className="w-5 h-5 text-indigo-600" />
              <h2 className="font-bold text-sm text-slate-900">Multilingual Kiosk Utilization</h2>
            </div>
            <span className="text-xs font-bold text-slate-400">4 Regional Languages</span>
          </div>

          <div className="space-y-3 text-xs">
            <div>
              <div className="flex justify-between font-bold text-slate-800 mb-1">
                <span>Gujarati (ગુજરાતી)</span>
                <span>48% (68 patients)</span>
              </div>
              <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-indigo-600 rounded-full" style={{ width: '48%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between font-bold text-slate-800 mb-1">
                <span>Hindi (हिन्दी)</span>
                <span>32% (45 patients)</span>
              </div>
              <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-blue-600 rounded-full" style={{ width: '32%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between font-bold text-slate-800 mb-1">
                <span>English</span>
                <span>14% (20 patients)</span>
              </div>
              <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-cyan-500 rounded-full" style={{ width: '14%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between font-bold text-slate-800 mb-1">
                <span>Punjabi (ਪੰਜਾਬੀ)</span>
                <span>6% (9 patients)</span>
              </div>
              <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-amber-500 rounded-full" style={{ width: '6%' }} />
              </div>
            </div>
          </div>
        </div>

        {/* Hourly Arrival Distribution */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-indigo-600" />
              <h2 className="font-bold text-sm text-slate-900">Hourly OPD Arrival Curve</h2>
            </div>
            <span className="text-xs font-bold text-rose-600">Peak: 09:00 - 11:30 AM</span>
          </div>

          <div className="space-y-2.5 text-xs">
            <div className="flex items-center justify-between p-2.5 bg-slate-50 rounded-xl">
              <span className="font-mono text-slate-600">08:00 AM - 09:00 AM</span>
              <span className="font-bold text-slate-800">18 Intakes</span>
            </div>
            <div className="flex items-center justify-between p-2.5 bg-indigo-50 rounded-xl border border-indigo-200">
              <span className="font-mono font-bold text-indigo-950">09:00 AM - 10:30 AM (Peak Rush)</span>
              <span className="font-black text-indigo-700">54 Intakes</span>
            </div>
            <div className="flex items-center justify-between p-2.5 bg-indigo-50 rounded-xl border border-indigo-200">
              <span className="font-mono font-bold text-indigo-950">10:30 AM - 12:00 PM (High Rush)</span>
              <span className="font-black text-indigo-700">42 Intakes</span>
            </div>
            <div className="flex items-center justify-between p-2.5 bg-slate-50 rounded-xl">
              <span className="font-mono text-slate-600">12:00 PM - 02:00 PM</span>
              <span className="font-bold text-slate-800">28 Intakes</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
export default AdminAnalytics;
