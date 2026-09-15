import React, { useState } from 'react';
import {
  User,
  Edit3,
  Save,
  X,
  Phone,
  Calendar,
  Globe,
  ShieldCheck,
  QrCode,
  AlertCircle,
  CheckCircle2,
  HeartPulse,
  UserCheck
} from 'lucide-react';
import { useDemo } from '../../context/DemoContext';
import { SUPPORTED_LANGUAGES } from '../../data/patients';

export const PatientProfile = () => {
  const { activePatient, updateActivePatient, addToast } = useDemo();

  const [isEditing, setIsEditing] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const [formData, setFormData] = useState({
    name: activePatient?.name || "Rajesh Patel",
    age: activePatient?.age || 54,
    gender: activePatient?.gender || "Male",
    mobile: activePatient?.mobile || "+91 98250 44120",
    emergencyContact: "+91 98250 99881 (Wife - Meenaben)",
    abhaId: activePatient?.abhaId || "91-4521-8890-1234",
    language: activePatient?.language || "Gujarati",
    bloodGroup: "B Positive (B+)",
    address: "B-402, Shivalik Greens, SG Highway, Ahmedabad, Gujarat - 380054"
  });

  const handleSaveClick = (e) => {
    e.preventDefault();
    setShowConfirmModal(true);
  };

  const confirmSave = () => {
    updateActivePatient({
      name: formData.name,
      age: parseInt(formData.age) || activePatient.age,
      gender: formData.gender,
      mobile: formData.mobile,
      abhaId: formData.abhaId,
      language: formData.language
    });
    setShowConfirmModal(false);
    setIsEditing(false);
    addToast({
      title: "Profile Updated Successfully",
      message: "Your clinical demographic data and emergency contacts have been saved.",
      type: "success"
    });
  };

  return (
    <div className="space-y-6 sm:space-y-8 max-w-4xl mx-auto">
      
      {/* Header with Edit / Save Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900">
            Patient Demographic & Medical Profile
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Verified patient identity linked with Ayushman Bharat Digital Mission (ABDM).
          </p>
        </div>

        <div className="flex items-center gap-2">
          {!isEditing ? (
            <button
              type="button"
              onClick={() => setIsEditing(true)}
              className="px-5 py-2.5 rounded-xl bg-blue-600 text-white font-bold text-xs hover:bg-blue-700 shadow-sm shadow-blue-500/25 flex items-center gap-2 transition-all cursor-pointer"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Edit Profile</span>
            </button>
          ) : (
            <>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-100 font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
                <span>Cancel</span>
              </button>
              <button
                type="button"
                onClick={handleSaveClick}
                className="px-5 py-2.5 rounded-xl bg-emerald-600 text-white font-bold text-xs hover:bg-emerald-700 shadow-sm shadow-emerald-600/25 flex items-center gap-2 transition-all cursor-pointer"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Save Changes</span>
              </button>
            </>
          )}
        </div>
      </div>

      {/* Profile Completion Bar */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-2xs space-y-3">
        <div className="flex items-center justify-between text-xs">
          <span className="font-bold text-slate-700 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            Profile Verification & Completion
          </span>
          <span className="font-mono font-black text-blue-700">92% Complete</span>
        </div>
        <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-blue-600 to-teal-500 rounded-full w-[92%]" />
        </div>
        <p className="text-[11px] text-slate-500">
          Demographics, ABHA linking, and emergency contact details verified by Hospital Admission Desk.
        </p>
      </div>

      {/* Main Form Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        
        {/* Card 1: Core Identification */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-2xs space-y-4">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <User className="w-4 h-4 text-blue-600" />
            Personal Identification
          </h3>

          <div className="space-y-3">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-600">Full Legal Name</label>
              <input
                type="text"
                disabled={!isEditing}
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full text-xs p-3 rounded-xl border border-slate-200 bg-slate-50 disabled:opacity-75 focus:bg-white focus:outline-hidden focus:border-blue-500 font-semibold text-slate-800"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-600">Age</label>
                <input
                  type="number"
                  disabled={!isEditing}
                  value={formData.age}
                  onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                  className="w-full text-xs p-3 rounded-xl border border-slate-200 bg-slate-50 disabled:opacity-75 focus:bg-white focus:outline-hidden focus:border-blue-500 font-semibold"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-600">Gender</label>
                <select
                  disabled={!isEditing}
                  value={formData.gender}
                  onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                  className="w-full text-xs p-3 rounded-xl border border-slate-200 bg-slate-50 disabled:opacity-75 focus:bg-white focus:outline-hidden focus:border-blue-500 font-semibold"
                >
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-600">Blood Group</label>
                <input
                  type="text"
                  disabled={!isEditing}
                  value={formData.bloodGroup}
                  onChange={(e) => setFormData({ ...formData, bloodGroup: e.target.value })}
                  className="w-full text-xs p-3 rounded-xl border border-slate-200 bg-slate-50 disabled:opacity-75 focus:bg-white font-semibold"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-600">Preferred Language</label>
                <select
                  disabled={!isEditing}
                  value={formData.language}
                  onChange={(e) => setFormData({ ...formData, language: e.target.value })}
                  className="w-full text-xs p-3 rounded-xl border border-slate-200 bg-slate-50 disabled:opacity-75 focus:bg-white font-semibold"
                >
                  {SUPPORTED_LANGUAGES.map(l => (
                    <option key={l.code} value={l.name}>{l.name} ({l.nativeName})</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Card 2: Contact & ABHA */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-2xs space-y-4">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <Phone className="w-4 h-4 text-teal-600" />
            Contact & Digital Health ID
          </h3>

          <div className="space-y-3">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-600">Mobile Number</label>
              <input
                type="tel"
                disabled={!isEditing}
                value={formData.mobile}
                onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                className="w-full text-xs p-3 rounded-xl border border-slate-200 bg-slate-50 disabled:opacity-75 focus:bg-white font-semibold"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-600">Emergency Contact</label>
              <input
                type="text"
                disabled={!isEditing}
                value={formData.emergencyContact}
                onChange={(e) => setFormData({ ...formData, emergencyContact: e.target.value })}
                className="w-full text-xs p-3 rounded-xl border border-slate-200 bg-slate-50 disabled:opacity-75 focus:bg-white font-semibold"
              />
            </div>

            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-600">ABHA ID (Ayushman Bharat)</label>
                <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 font-bold border border-emerald-200">
                  ABDM Verified
                </span>
              </div>
              <input
                type="text"
                disabled={!isEditing}
                value={formData.abhaId}
                onChange={(e) => setFormData({ ...formData, abhaId: e.target.value })}
                className="w-full text-xs p-3 rounded-xl border border-slate-200 bg-slate-50 disabled:opacity-75 focus:bg-white font-mono font-bold text-slate-900"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-600">Residential Address</label>
              <textarea
                rows={2}
                disabled={!isEditing}
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="w-full text-xs p-3 rounded-xl border border-slate-200 bg-slate-50 disabled:opacity-75 focus:bg-white"
              />
            </div>
          </div>
        </div>

      </div>

      {/* Confirmation Modal before saving important information */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl border border-slate-200 space-y-4 animate-in zoom-in-95 duration-150">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto">
              <AlertCircle className="w-6 h-6" />
            </div>
            
            <div className="text-center space-y-1">
              <h3 className="text-base font-bold text-slate-900">Confirm Profile Updates</h3>
              <p className="text-xs text-slate-500">
                You are updating primary identification details linked with your hospital UHID record. Please verify changes.
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-1.5 text-left">
              <p><strong>Name:</strong> {formData.name}</p>
              <p><strong>Mobile:</strong> {formData.mobile}</p>
              <p><strong>Emergency:</strong> {formData.emergencyContact}</p>
              <p><strong>Language:</strong> {formData.language}</p>
            </div>

            <div className="grid grid-cols-2 gap-2.5 pt-2">
              <button
                type="button"
                onClick={() => setShowConfirmModal(false)}
                className="py-2.5 rounded-xl border border-slate-200 text-slate-700 font-bold text-xs hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmSave}
                className="py-2.5 rounded-xl bg-blue-600 text-white font-bold text-xs hover:bg-blue-700 shadow-md shadow-blue-500/25"
              >
                Confirm & Save
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default PatientProfile;
