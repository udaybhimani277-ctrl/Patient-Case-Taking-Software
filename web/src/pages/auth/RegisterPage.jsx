import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  HeartPulse,
  User,
  Stethoscope,
  Building2,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
  Globe
} from 'lucide-react';
import { useDemo } from '../../context/DemoContext';
import { SUPPORTED_LANGUAGES } from '../../data/patients';

export const RegisterPage = () => {
  const navigate = useNavigate();
  const { registerUser, t } = useDemo();

  const [activeTab, setActiveTab] = useState('patient'); // 'patient' | 'doctor' | 'admin'
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Patient Fields
  const [patientData, setPatientData] = useState({
    name: '',
    age: '',
    gender: 'Male',
    mobile: '',
    preferredLanguage: 'Gujarati',
    abhaId: '',
    password: '',
    confirmPassword: '',
    consent: true
  });

  // Doctor Fields
  const [doctorData, setDoctorData] = useState({
    name: '',
    councilReg: '',
    department: 'General Medicine',
    specialization: 'Internal Medicine',
    hospital: 'Civil Hospital & Medical College',
    email: '',
    mobile: '',
    password: '',
    confirmPassword: ''
  });

  // Admin Fields
  const [adminData, setAdminData] = useState({
    hospital: 'Civil Hospital & Medical College',
    adminName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handlePatientSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('');
    if (!patientData.name.trim() || !patientData.mobile.trim() || !patientData.password.trim()) {
      setErrorMessage("Please fill in all mandatory patient fields.");
      return;
    }
    if (patientData.password !== patientData.confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }
    if (!patientData.consent) {
      setErrorMessage("Consent is required for OPD clinical record creation.");
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      registerUser('patient', patientData);
      navigate('/patient/dashboard');
    }, 450);
  };

  const handleDoctorSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('');
    if (!doctorData.name.trim() || !doctorData.councilReg.trim() || !doctorData.password.trim()) {
      setErrorMessage("Please enter Doctor Name, Council Registration ID, and Password.");
      return;
    }
    if (doctorData.password !== doctorData.confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      registerUser('doctor', doctorData);
      navigate('/doctor/dashboard');
    }, 450);
  };

  const handleAdminSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('');
    if (!adminData.adminName.trim() || !adminData.email.trim() || !adminData.password.trim()) {
      setErrorMessage("Please enter Admin Name, Email, and Password.");
      return;
    }
    if (adminData.password !== adminData.confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      registerUser('admin', adminData);
      navigate('/admin/dashboard');
    }, 450);
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center p-3 sm:p-6 my-auto">
      <div className="w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden grid grid-cols-1 lg:grid-cols-12 transition-all">

        {/* Left Column: Visual Healthcare Branding */}
        <div className="lg:col-span-4 bg-gradient-to-br from-slate-900 via-blue-950 to-teal-950 p-6 sm:p-8 flex flex-col justify-between text-white relative">
          <div className="space-y-6">
            <Link to="/" className="inline-flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-2xl bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-500/30">
                <HeartPulse className="w-6 h-6 stroke-[2.4]" />
              </div>
              <div>
                <span className="font-black text-xl tracking-tight text-white">
                  Medi<span className="text-teal-400">Kiosk</span>
                </span>
                <p className="text-[10px] text-teal-300 font-medium">Healthcare Registration</p>
              </div>
            </Link>

            <div className="space-y-2 pt-2">
              <h3 className="text-xl sm:text-2xl font-black text-white">
                Create Clinical Account
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Join India's smarter OPD intake mission. One platform connecting arrival at the kiosk directly to the physician console.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2 text-xs text-slate-200">
              <div className="flex items-center gap-2 font-bold text-teal-300">
                <ShieldCheck className="w-4 h-4" />
                <span>DPDP 2023 Compliant</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Your medical history and identification details remain isolated, encrypted, and accessible only by authorized care providers.
              </p>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-800 text-[11px] text-slate-400">
            Civil Hospital • MediKiosk Network
          </div>
        </div>

        {/* Right Column: Registration Form */}
        <div className="lg:col-span-8 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto">
          <div className="space-y-5">

            {/* Role Switcher Tabs */}
            <div className="flex items-center justify-between">
              <h4 className="text-base font-black text-slate-900">
                Select Registration Type:
              </h4>
              <div className="inline-flex p-1 bg-slate-100 rounded-xl border border-slate-200 text-xs">
                <button
                  type="button"
                  onClick={() => { setActiveTab('patient'); setErrorMessage(''); }}
                  className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                    activeTab === 'patient' ? 'bg-white text-blue-700 shadow-xs' : 'text-slate-600'
                  }`}
                >
                  Patient
                </button>
                <button
                  type="button"
                  onClick={() => { setActiveTab('doctor'); setErrorMessage(''); }}
                  className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                    activeTab === 'doctor' ? 'bg-white text-blue-700 shadow-xs' : 'text-slate-600'
                  }`}
                >
                  Doctor
                </button>
                <button
                  type="button"
                  onClick={() => { setActiveTab('admin'); setErrorMessage(''); }}
                  className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                    activeTab === 'admin' ? 'bg-white text-blue-700 shadow-xs' : 'text-slate-600'
                  }`}
                >
                  Admin
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

            {/* PATIENT REGISTRATION FORM */}
            {activeTab === 'patient' && (
              <form onSubmit={handlePatientSubmit} className="space-y-3.5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={patientData.name}
                      onChange={(e) => setPatientData({ ...patientData, name: e.target.value })}
                      placeholder="e.g. Ramesh Patel"
                      className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:outline-hidden focus:border-blue-500 bg-slate-50 focus:bg-white"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">Mobile Number *</label>
                    <input
                      type="tel"
                      required
                      value={patientData.mobile}
                      onChange={(e) => setPatientData({ ...patientData, mobile: e.target.value })}
                      placeholder="+91 98250 44120"
                      className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:outline-hidden focus:border-blue-500 bg-slate-50 focus:bg-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">Age *</label>
                    <input
                      type="number"
                      required
                      value={patientData.age}
                      onChange={(e) => setPatientData({ ...patientData, age: e.target.value })}
                      placeholder="45"
                      className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:outline-hidden focus:border-blue-500 bg-slate-50 focus:bg-white"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">Gender</label>
                    <select
                      value={patientData.gender}
                      onChange={(e) => setPatientData({ ...patientData, gender: e.target.value })}
                      className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:outline-hidden focus:border-blue-500 bg-slate-50 focus:bg-white"
                    >
                      <option>Male</option>
                      <option>Female</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">Language</label>
                    <select
                      value={patientData.preferredLanguage}
                      onChange={(e) => setPatientData({ ...patientData, preferredLanguage: e.target.value })}
                      className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:outline-hidden focus:border-blue-500 bg-slate-50 focus:bg-white"
                    >
                      {SUPPORTED_LANGUAGES.map(l => (
                        <option key={l.code} value={l.name}>{l.name} ({l.nativeName})</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">ABHA Number / ABHA Address (Optional)</label>
                  <input
                    type="text"
                    value={patientData.abhaId}
                    onChange={(e) => setPatientData({ ...patientData, abhaId: e.target.value })}
                    placeholder="e.g. 14-8892-3341-9087 or ramesh@abdm"
                    className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:outline-hidden focus:border-blue-500 bg-slate-50 focus:bg-white"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">Create Password *</label>
                    <input
                      type="password"
                      required
                      value={patientData.password}
                      onChange={(e) => setPatientData({ ...patientData, password: e.target.value })}
                      placeholder="Minimum 6 characters"
                      className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:outline-hidden focus:border-blue-500 bg-slate-50 focus:bg-white"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">Confirm Password *</label>
                    <input
                      type="password"
                      required
                      value={patientData.confirmPassword}
                      onChange={(e) => setPatientData({ ...patientData, confirmPassword: e.target.value })}
                      placeholder="Re-enter password"
                      className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:outline-hidden focus:border-blue-500 bg-slate-50 focus:bg-white"
                    />
                  </div>
                </div>

                <label className="flex items-start gap-2 text-xs text-slate-600 cursor-pointer pt-1">
                  <input
                    type="checkbox"
                    checked={patientData.consent}
                    onChange={(e) => setPatientData({ ...patientData, consent: e.target.checked })}
                    className="mt-0.5 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span>
                    I grant explicit consent for AI-assisted clinical case taking, document OCR extraction, and physician summary preparation under DPDP framework.
                  </span>
                </label>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
                >
                  {isLoading ? "Creating Patient Account..." : "Register Patient & Start Kiosk Session"}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}

            {/* DOCTOR REGISTRATION FORM */}
            {activeTab === 'doctor' && (
              <form onSubmit={handleDoctorSubmit} className="space-y-3.5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">Doctor Full Name *</label>
                    <input
                      type="text"
                      required
                      value={doctorData.name}
                      onChange={(e) => setDoctorData({ ...doctorData, name: e.target.value })}
                      placeholder="e.g. Dr. Rajeshwari Patel"
                      className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:outline-hidden focus:border-blue-500 bg-slate-50 focus:bg-white"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">Medical Council Reg. ID *</label>
                    <input
                      type="text"
                      required
                      value={doctorData.councilReg}
                      onChange={(e) => setDoctorData({ ...doctorData, councilReg: e.target.value })}
                      placeholder="e.g. GMC-34190 or MCI-88902"
                      className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:outline-hidden focus:border-blue-500 bg-slate-50 focus:bg-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">Department</label>
                    <select
                      value={doctorData.department}
                      onChange={(e) => setDoctorData({ ...doctorData, department: e.target.value })}
                      className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:outline-hidden focus:border-blue-500 bg-slate-50 focus:bg-white"
                    >
                      <option>General Medicine</option>
                      <option>Cardiology</option>
                      <option>ENT</option>
                      <option>Orthopedics</option>
                      <option>Pediatrics</option>
                      <option>AYUSH / Ayurveda</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">Specialization</label>
                    <input
                      type="text"
                      value={doctorData.specialization}
                      onChange={(e) => setDoctorData({ ...doctorData, specialization: e.target.value })}
                      placeholder="e.g. Interventional Cardiology"
                      className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:outline-hidden focus:border-blue-500 bg-slate-50 focus:bg-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">Hospital / Facility</label>
                    <input
                      type="text"
                      value={doctorData.hospital}
                      onChange={(e) => setDoctorData({ ...doctorData, hospital: e.target.value })}
                      placeholder="Civil Hospital & Medical College"
                      className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:outline-hidden focus:border-blue-500 bg-slate-50 focus:bg-white"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">Hospital Email / Mobile</label>
                    <input
                      type="text"
                      value={doctorData.email}
                      onChange={(e) => setDoctorData({ ...doctorData, email: e.target.value })}
                      placeholder="dr.patel@civilhospital.gov.in"
                      className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:outline-hidden focus:border-blue-500 bg-slate-50 focus:bg-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">Create Password *</label>
                    <input
                      type="password"
                      required
                      value={doctorData.password}
                      onChange={(e) => setDoctorData({ ...doctorData, password: e.target.value })}
                      placeholder="Secure password"
                      className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:outline-hidden focus:border-blue-500 bg-slate-50 focus:bg-white"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">Confirm Password *</label>
                    <input
                      type="password"
                      required
                      value={doctorData.confirmPassword}
                      onChange={(e) => setDoctorData({ ...doctorData, confirmPassword: e.target.value })}
                      placeholder="Repeat password"
                      className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:outline-hidden focus:border-blue-500 bg-slate-50 focus:bg-white"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
                >
                  {isLoading ? "Enrolling Doctor..." : "Register Doctor & Enter Clinical Station"}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}

            {/* ADMIN REGISTRATION FORM */}
            {activeTab === 'admin' && (
              <form onSubmit={handleAdminSubmit} className="space-y-3.5">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Hospital / Healthcare Institution *</label>
                  <input
                    type="text"
                    required
                    value={adminData.hospital}
                    onChange={(e) => setAdminData({ ...adminData, hospital: e.target.value })}
                    placeholder="Civil Hospital & Medical College, Ahmedabad"
                    className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:outline-hidden focus:border-blue-500 bg-slate-50 focus:bg-white"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">Admin Full Name *</label>
                    <input
                      type="text"
                      required
                      value={adminData.adminName}
                      onChange={(e) => setAdminData({ ...adminData, adminName: e.target.value })}
                      placeholder="e.g. S. Sharma"
                      className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:outline-hidden focus:border-blue-500 bg-slate-50 focus:bg-white"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">Administrative Email *</label>
                    <input
                      type="email"
                      required
                      value={adminData.email}
                      onChange={(e) => setAdminData({ ...adminData, email: e.target.value })}
                      placeholder="admin@civilhospital.gov.in"
                      className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:outline-hidden focus:border-blue-500 bg-slate-50 focus:bg-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">Password *</label>
                    <input
                      type="password"
                      required
                      value={adminData.password}
                      onChange={(e) => setAdminData({ ...adminData, password: e.target.value })}
                      placeholder="Admin secret key"
                      className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:outline-hidden focus:border-blue-500 bg-slate-50 focus:bg-white"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">Confirm Password *</label>
                    <input
                      type="password"
                      required
                      value={adminData.confirmPassword}
                      onChange={(e) => setAdminData({ ...adminData, confirmPassword: e.target.value })}
                      placeholder="Repeat password"
                      className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:outline-hidden focus:border-blue-500 bg-slate-50 focus:bg-white"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
                >
                  {isLoading ? "Authorizing Admin..." : "Provision Admin Command Console"}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}

          </div>

          <div className="pt-6 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>
              Already registered?{' '}
              <Link to="/login" className="font-bold text-blue-600 hover:underline">
                Sign In
              </Link>
            </span>
            <Link to="/" className="text-slate-400 hover:text-slate-600">
              Home
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};

export default RegisterPage;
