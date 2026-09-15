import React, { useState } from 'react';
import {
  Settings,
  Building2,
  ShieldCheck,
  Save,
  Lock,
  Sliders,
  AlertTriangle,
  Bell,
  Sparkles,
  Phone,
  RefreshCw
} from 'lucide-react';
import { useDemo } from '../../context/DemoContext';

export const AdminSettings = () => {
  const { adminSettings, updateAdminSettings, addToast } = useDemo();

  const [formData, setFormData] = useState({
    hospitalName: adminSettings.hospitalName || 'Civil Hospital Ahmedabad',
    facilityId: adminSettings.facilityId || 'HFR-GJ-AHM-0492',
    campus: 'Asarwa Campus, Ahmedabad, Gujarat',
    emergencyPhone: '+91 79 2268 0074',
    ocrConfidenceThreshold: 90,
    dpdpEnforced: true,
    autoEscalateRedFlags: true,
    retentionYears: 7,
    sessionTimeoutMin: 15
  });

  const handleSave = (e) => {
    e.preventDefault();
    updateAdminSettings({
      hospitalName: formData.hospitalName,
      facilityId: formData.facilityId
    });
    addToast({
      title: 'Hospital Settings Updated',
      message: 'System configuration and clinical triage parameters saved.',
      type: 'success'
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-black tracking-tight text-slate-900">Hospital Administration & System Settings</h1>
        <p className="text-xs text-slate-500 mt-1">
          Facility registry credentials, emergency broadcast routing, DPDP data protection parameters, and AI governance
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Section 1: Facility Identification */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
            <Building2 className="w-5 h-5 text-indigo-600" />
            <h2 className="font-bold text-sm text-slate-900">Healthcare Facility & ABDM Registry</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="font-bold text-slate-700 block mb-1">Hospital / Medical Center Name</label>
              <input
                type="text"
                value={formData.hospitalName}
                onChange={(e) => setFormData({ ...formData, hospitalName: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 font-semibold text-slate-900"
                required
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">ABDM Health Facility Registry (HFR) ID</label>
              <input
                type="text"
                value={formData.facilityId}
                onChange={(e) => setFormData({ ...formData, facilityId: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 font-mono font-bold text-indigo-900"
                required
              />
            </div>

            <div className="sm:col-span-2">
              <label className="font-bold text-slate-700 block mb-1">Hospital Campus & Geolocation</label>
              <input
                type="text"
                value={formData.campus}
                onChange={(e) => setFormData({ ...formData, campus: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 text-slate-800"
              />
            </div>
          </div>
        </div>

        {/* Section 2: Clinical Triage & Safety Governance */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
            <AlertTriangle className="w-5 h-5 text-rose-600" />
            <h2 className="font-bold text-sm text-slate-900">Clinical Safety & Emergency Escalation</h2>
          </div>

          <div className="space-y-4 text-xs">
            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-200">
              <div>
                <span className="font-bold text-slate-900 block">Automatic Rapid Emergency Escalation</span>
                <span className="text-slate-500 text-[11px]">
                  Instantly dispatch alert to Duty Emergency Medical Officer if patient triggers Level 1 chest pain or dyspnea at kiosk.
                </span>
              </div>
              <input
                type="checkbox"
                checked={formData.autoEscalateRedFlags}
                onChange={(e) => setFormData({ ...formData, autoEscalateRedFlags: e.target.checked })}
                className="w-5 h-5 accent-indigo-600 rounded cursor-pointer"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Emergency Rapid Response Hotline</label>
              <input
                type="text"
                value={formData.emergencyPhone}
                onChange={(e) => setFormData({ ...formData, emergencyPhone: e.target.value })}
                className="w-full sm:w-80 p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 font-mono font-bold text-slate-900"
              />
            </div>
          </div>
        </div>

        {/* Section 3: AI & OCR Governance */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
            <Sliders className="w-5 h-5 text-purple-600" />
            <h2 className="font-bold text-sm text-slate-900">AI Confidence & OCR Thresholds</h2>
          </div>

          <div className="space-y-4 text-xs">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-700">Minimum OCR Confidence Filter</span>
                <span className="font-mono font-bold text-purple-700">{formData.ocrConfidenceThreshold}%</span>
              </div>
              <input
                type="range"
                min="75"
                max="99"
                value={formData.ocrConfidenceThreshold}
                onChange={(e) => setFormData({ ...formData, ocrConfidenceThreshold: Number(e.target.value) })}
                className="w-full accent-purple-600 h-2 bg-slate-200 rounded-lg cursor-pointer"
              />
              <span className="text-[11px] text-slate-400 block">
                Entities with lower confidence require explicit physician side-by-side re-verification before EHR inclusion.
              </span>
            </div>

            <div className="p-4 bg-purple-50 rounded-2xl border border-purple-200 text-purple-900">
              <div className="flex items-center gap-2 font-bold mb-1">
                <ShieldCheck className="w-4 h-4 text-purple-700" />
                <span>Physician Verification Policy (Mandatory)</span>
              </div>
              <p className="text-[11px] leading-relaxed">
                In strict compliance with medical ethics regulations, AI summaries can never autonomously diagnose or prescribe medicines. Every clinical claim must be verified by a licensed doctor.
              </p>
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            type="submit"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md shadow-indigo-600/25 transition-all"
          >
            <Save className="w-4 h-4" />
            <span>Save Hospital Configuration</span>
          </button>
        </div>
      </form>
    </div>
  );
};
export default AdminSettings;
