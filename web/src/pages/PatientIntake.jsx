import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDemo } from '../context/DemoContext';
import { SUPPORTED_LANGUAGES } from '../data/patients';
import { ProgressStepper } from '../components/ProgressStepper';
import { AudioInstructionBtn } from '../components/AudioInstructionBtn';
import {
  User,
  Phone,
  CreditCard,
  Calendar,
  ShieldCheck,
  ArrowRight,
  Save,
  Check,
  Sparkles,
  Info,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

export const PatientIntake = () => {
  const navigate = useNavigate();
  const {
    activePatient,
    updateActivePatient,
    setActiveStep,
    selectedLanguage,
    setSelectedLanguage,
    changeLanguage,
    t,
    addToast
  } = useDemo();

  // Form State initialized from active patient
  const [formData, setFormData] = useState({
    name: activePatient.name || "Rajesh Patel",
    age: activePatient.age || 54,
    gender: activePatient.gender || "Male",
    mobile: activePatient.mobile || "+91 98250 44120",
    abhaId: activePatient.abhaId || "91-4521-8890-1234",
    patientType: activePatient.type || "Existing Patient",
    preferredLanguage: selectedLanguage || "gu",
    consentGiven: true
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = "Patient Name is required";
    if (!formData.age || formData.age <= 0 || formData.age > 120) errs.age = "Please enter a valid age";
    if (!formData.mobile.trim() || formData.mobile.length < 10) errs.mobile = "Valid 10-digit mobile number required";
    if (!formData.abhaId.trim()) errs.abhaId = "ABHA ID or National Health ID is required";
    if (!formData.consentGiven) errs.consentGiven = "Patient consent is mandatory for clinical intake processing";
    return errs;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const handleLanguageSelect = (langCode) => {
    setFormData(prev => ({ ...prev, preferredLanguage: langCode }));
    changeLanguage(langCode);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      addToast({
        title: "Validation Incomplete",
        message: "Please fill out all required fields and verify consent.",
        type: "error"
      });
      return;
    }

    setIsSubmitting(true);

    // Save to context
    updateActivePatient({
      name: formData.name,
      age: Number(formData.age),
      gender: formData.gender,
      mobile: formData.mobile,
      abhaId: formData.abhaId,
      type: formData.patientType,
      language: SUPPORTED_LANGUAGES.find(l => l.code === formData.preferredLanguage)?.name || "Gujarati"
    });

    setTimeout(() => {
      setIsSubmitting(false);
      addToast({
        title: "Patient Profile Created Successfully",
        message: `Registered ${formData.name} (${formData.abhaId}). Ready for AI History.`,
        type: "success"
      });
      setActiveStep(2);
      navigate('/ai-history');
    }, 600);
  };

  const handleSaveLater = () => {
    addToast({
      title: "Intake Draft Saved",
      message: "Session state preserved. You can resume intake using the ABHA ID.",
      type: "info"
    });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 py-4">
      {/* 5-Step Journey Stepper */}
      <ProgressStepper currentStepNumber={1} />

      {/* Page Header */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200">
                {t("intake.stageBadge", "Stage 01: Registration")}
              </span>
              <span className="text-xs text-slate-500 font-mono">{t("intake.opdKiosk", "OPD Kiosk Check-In")}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
              {t("intake.title", "Patient Registration")}
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              {t("intake.subtitle", "Quickly capture patient information, verify ABHA ID, and select preferred communication language.")}
            </p>
          </div>

          <AudioInstructionBtn
            label={t("intake.audioBtn", "Play Audio Instructions")}
            text={t("intake.audioInstruction", "Please confirm your name, age, mobile number, and ABHA ID. Select the language you are most comfortable speaking.")}
          />
        </div>

        {/* 2-Column Split: Form on Left, Avatar Card on Right */}
        <form onSubmit={handleSubmit} className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

            {/* Left 8 Columns: Form Fields */}
            <div className="lg:col-span-8 space-y-5">

              {/* Patient Full Name */}
              <div>
                <label htmlFor="patient-name" className="block text-xs font-bold text-slate-700 mb-1.5">
                  {t("intake.fullName", "Full Name")} <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <User className="w-4 h-4" />
                  </div>
                  <input
                    id="patient-name"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder={t("intake.fullNamePlaceholder", "Enter patient name")}
                    className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm font-semibold transition-colors focus:outline-hidden focus:ring-2 ${errors.name
                        ? 'border-rose-300 focus:ring-rose-200 bg-rose-50/20'
                        : 'border-slate-200 focus:border-blue-500 focus:ring-blue-100'
                      }`}
                  />
                </div>
                {errors.name && <p className="text-[11px] text-rose-600 mt-1">{errors.name}</p>}
              </div>

              {/* Age & Gender */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="patient-age" className="block text-xs font-bold text-slate-700 mb-1.5">
                    {t("intake.age", "Age")} <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <Calendar className="w-4 h-4" />
                    </div>
                    <input
                      id="patient-age"
                      type="number"
                      name="age"
                      min="1"
                      max="120"
                      value={formData.age}
                      onChange={handleChange}
                      placeholder={t("intake.age", "Enter age")}
                      className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    />
                  </div>
                  {errors.age && <p className="text-[11px] text-rose-600 mt-1">{errors.age}</p>}
                </div>

                {/* Gender Radio Pills */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    {t("intake.gender", "Gender")} <span className="text-rose-500">*</span>
                  </label>
                  <div className="flex items-center gap-3 pt-1">
                    {["Male", "Female", "Other"].map((g) => (
                      <label key={g} className="flex items-center gap-1.5 cursor-pointer text-xs font-semibold text-slate-700">
                        <input
                          type="radio"
                          name="gender"
                          value={g}
                          checked={formData.gender === g}
                          onChange={handleChange}
                          className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                        />
                        <span>{g === "Male" ? t("intake.male", "Male") : g === "Female" ? t("intake.female", "Female") : t("intake.other", "Other")}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              {/* Phone Number & ABHA ID */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="patient-mobile" className="block text-xs font-bold text-slate-700 mb-1.5">
                    {t("intake.mobile", "Phone Number")} <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <Phone className="w-4 h-4" />
                    </div>
                    <input
                      id="patient-mobile"
                      type="text"
                      name="mobile"
                      value={formData.mobile}
                      onChange={handleChange}
                      placeholder={t("intake.mobile", "Enter mobile number")}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold focus:border-blue-500 focus:ring-2 focus:ring-blue-100 font-mono"
                    />
                  </div>
                  {errors.mobile && <p className="text-[11px] text-rose-600 mt-1">{errors.mobile}</p>}
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label htmlFor="patient-abha" className="block text-xs font-bold text-slate-700">
                      {t("intake.abha", "ABHA / Health ID")} <span className="text-rose-500">*</span>
                    </label>
                    <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                      ✓ {t("intake.abhaVerified", "ABHA Verified")}
                    </span>
                  </div>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <CreditCard className="w-4 h-4" />
                    </div>
                    <input
                      id="patient-abha"
                      type="text"
                      name="abhaId"
                      value={formData.abhaId}
                      onChange={handleChange}
                      placeholder="Enter ABHA ID"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold focus:border-blue-500 focus:ring-2 focus:ring-blue-100 font-mono"
                    />
                  </div>
                  {errors.abhaId && <p className="text-[11px] text-rose-600 mt-1">{errors.abhaId}</p>}
                </div>
              </div>

              {/* Address Field */}
              <div>
                <label htmlFor="patient-address" className="block text-xs font-bold text-slate-700 mb-1.5">
                  {t("intake.address", "Address / City")}
                </label>
                <input
                  id="patient-address"
                  type="text"
                  name="address"
                  placeholder={t("intake.address", "Enter address")}
                  defaultValue="Near Civil Hospital Road, Ahmedabad, Gujarat"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              {/* Preferred Language Selection (7 Languages) */}
              <div className="pt-1">
                <label className="block text-xs font-bold text-slate-700 mb-2">
                  {t("intake.preferredLanguage", "Select Preferred Conversational Language")}
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
                  {SUPPORTED_LANGUAGES.map((lang) => {
                    const isSelected = selectedLanguage === lang.code || formData.preferredLanguage === lang.code;
                    return (
                      <button
                        key={lang.code}
                        type="button"
                        onClick={() => handleLanguageSelect(lang.code)}
                        className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${isSelected
                            ? 'bg-blue-50 border-blue-600 text-blue-900 ring-2 ring-blue-600/20 shadow-2xs font-bold'
                            : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                          }`}
                      >
                        <p className="text-xs font-black">{lang.nativeName}</p>
                        <p className="text-[10px] text-slate-500">{lang.name}</p>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Mandatory Consent Checkbox */}
              <div className="bg-slate-50 rounded-2xl p-3.5 border border-slate-200/90">
                <label className="flex items-start gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    name="consentGiven"
                    checked={formData.consentGiven}
                    onChange={handleChange}
                    className="mt-0.5 w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500"
                  />
                  <div className="text-xs text-slate-700 leading-relaxed">
                    <span className="font-bold text-slate-900">
                      {t("intake.consentAgreement", "I consent to pre-consultation digital history capture.")}
                    </span>{" "}
                    {t("intake.consentSub", "Data is safely stored under DPDP healthcare principles.")}
                  </div>
                </label>
                {errors.consentGiven && (
                  <p className="text-[11px] text-rose-600 pl-6.5 mt-1">{errors.consentGiven}</p>
                )}
              </div>

            </div>

            {/* Right 4 Columns: Patient Avatar Card */}
            <div className="lg:col-span-4 bg-slate-50/90 border border-slate-200/80 rounded-3xl p-6 text-center space-y-4">
              <div className="relative inline-block">
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-blue-100 border-4 border-white shadow-md mx-auto flex items-center justify-center text-blue-700 text-3xl font-bold">
                  {formData.name.split(" ").map(n => n[0]).join("")}
                </div>
                <span className="absolute bottom-1 right-1 w-5 h-5 rounded-full bg-emerald-500 border-2 border-white flex items-center justify-center text-white text-[10px]">
                  ✓
                </span>
              </div>

              <div>
                <p className="text-xs text-slate-400 font-medium">{t("intake.patientId", "Patient ID")}</p>
                <h3 className="text-sm font-mono font-bold text-slate-900">
                  {activePatient.id || "PT-000123"}
                </h3>
              </div>

              <div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{t("intake.statusRegistered", "Registered")}</span>
                </span>
              </div>

              <div className="pt-2 text-left text-xs text-slate-500 space-y-1.5 border-t border-slate-200/80">
                <div className="flex justify-between">
                  <span>{t("intake.fullName", "Name")}:</span>
                  <span className="font-semibold text-slate-800">{formData.name}</span>
                </div>
                <div className="flex justify-between">
                  <span>{t("intake.age", "Age")} / {t("intake.gender", "Gender")}:</span>
                  <span className="font-semibold text-slate-800">{formData.age}y / {formData.gender}</span>
                </div>
                <div className="flex justify-between">
                  <span>{t("intake.mobile", "Phone")}:</span>
                  <span className="font-mono text-slate-800">{formData.mobile}</span>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-sm shadow-blue-500/25 transition-all active:scale-98 cursor-pointer"
              >
                <span>{t("intake.proceedBtn", "Save & Continue")}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        </form>
      </div>
    </div>
  );
};
