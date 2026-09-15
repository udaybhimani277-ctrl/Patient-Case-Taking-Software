import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDemo } from '../context/DemoContext';
import { MOCK_DOCUMENTS, OCR_STAGES } from '../data/documents';
import { ProgressStepper } from '../components/ProgressStepper';
import { StatusBadge } from '../components/StatusBadge';
import { AudioInstructionBtn } from '../components/AudioInstructionBtn';
import {
  UploadCloud,
  Scan,
  Camera,
  FileText,
  CheckCircle2,
  AlertCircle,
  Clock,
  Sparkles,
  ArrowRight,
  FileSearch,
  RefreshCw,
  ShieldAlert,
  Calendar,
  Pill,
  Activity,
  Layers
} from 'lucide-react';

export const Documents = () => {
  const navigate = useNavigate();
  const { activePatient, setActiveStep, addToast } = useDemo();

  const [selectedDocCategory, setSelectedDocCategory] = useState("Prescription");
  const [activeDoc, setActiveDoc] = useState(MOCK_DOCUMENTS[0]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentOcrStage, setCurrentOcrStage] = useState(5); // 1 to 5, default completed
  const [activeTab, setActiveTab] = useState("all"); // 'all' | 'meds' | 'labs'

  const categories = [
    { id: "Prescription", label: "Prescription", icon: Pill },
    { id: "Lab Report", label: "Lab Report", icon: Activity },
    { id: "Discharge Summary", label: "Discharge Summary", icon: FileText },
    { id: "Imaging Report", label: "Imaging Report", icon: Scan }
  ];

  const handleSimulateScan = (docType = "Prescription") => {
    setIsProcessing(true);
    setCurrentOcrStage(1);
    setSelectedDocCategory(docType);

    // Pick document matching type or fallback
    const match = MOCK_DOCUMENTS.find(d => d.category === docType) || MOCK_DOCUMENTS[0];
    setActiveDoc(match);

    addToast({
      title: "Document Intake Started",
      message: `Running neural OCR extraction for ${docType}...`,
      type: "info"
    });

    // Animate stages sequentially
    setTimeout(() => {
      setCurrentOcrStage(2);
      setTimeout(() => {
        setCurrentOcrStage(3);
        setTimeout(() => {
          setCurrentOcrStage(4);
          setTimeout(() => {
            setCurrentOcrStage(5);
            setIsProcessing(false);
            addToast({
              title: "OCR Extraction Complete",
              message: `Digitized with ${match.confidence} optical confidence.`,
              type: "success"
            });
          }, 600);
        }, 800);
      }, 800);
    }, 700);
  };

  const handleContinue = () => {
    setActiveStep(4);
    navigate('/clinical-summary');
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6 py-4">
      {/* 5-Step Stepper */}
      <ProgressStepper currentStepNumber={3} />

      {/* Header Banner */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-teal-50 text-teal-800 border border-teal-200">
                Stage 03: Scan
              </span>
              <span className="text-xs text-slate-500 font-mono">Neural Optical Recognition</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
              Medical Document Digitization
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Digitize past prescriptions, lab tests, and discharge summaries into structured FHIR records.
            </p>
          </div>

          <AudioInstructionBtn
            label="Audio Guidance"
            text="Place your paper prescription or lab test under the scanner glass or upload a photo to digitize previous treatments."
          />
        </div>

        {/* Upload & Action Area */}
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-6">

          {/* LEFT: Upload Box & Category Selection (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-600">
              Upload Medical Documents
            </h3>

            {/* Document Category Pills */}
            <div className="grid grid-cols-2 gap-2">
              {categories.map((cat) => {
                const Icon = cat.icon;
                const isSelected = selectedDocCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => handleSimulateScan(cat.id)}
                    className={`p-3 rounded-2xl border text-left transition-all flex items-center gap-2.5 ${isSelected
                        ? 'bg-teal-50 border-teal-600 text-teal-900 ring-2 ring-teal-600/20'
                        : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                      }`}
                  >
                    <div className={`p-2 rounded-xl ${isSelected ? 'bg-teal-700 text-white' : 'bg-white text-slate-500'}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-xs font-bold">{cat.label}</p>
                      <p className="text-[10px] text-slate-400">Supported Demo</p>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Interactive Scanner / Drop Area */}
            <div className="relative border-2 border-dashed border-slate-300 rounded-3xl p-6 text-center bg-slate-50/60 hover:bg-slate-50 transition-colors">

              {/* Laser Scanning Animation Beam */}
              {isProcessing && (
                <div className="absolute inset-x-4 h-1 bg-gradient-to-r from-transparent via-teal-500 to-transparent shadow-md shadow-teal-500/50 animate-scan-beam z-20 pointer-events-none" />
              )}

              <div className="w-14 h-14 rounded-2xl bg-teal-50 text-teal-700 border border-teal-100 flex items-center justify-center mx-auto mb-3">
                <UploadCloud className="w-7 h-7" />
              </div>

              <h4 className="text-sm font-bold text-slate-800">
                Scan or Drop Medical Record
              </h4>
              <p className="text-xs text-slate-500 max-w-xs mx-auto mt-1 mb-4">
                Accepts JPG, PNG, or PDF. Demo simulator will run high-speed clinical token extraction.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-2">
                <button
                  type="button"
                  disabled={isProcessing}
                  onClick={() => handleSimulateScan("Prescription")}
                  className="px-3.5 py-2 rounded-xl bg-teal-700 hover:bg-teal-800 text-white text-xs font-bold flex items-center gap-1.5 shadow-xs transition-colors"
                >
                  <Scan className="w-3.5 h-3.5" />
                  <span>Scan Document</span>
                </button>

                <button
                  type="button"
                  disabled={isProcessing}
                  onClick={() => handleSimulateScan("Lab Report")}
                  className="px-3.5 py-2 rounded-xl bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 text-xs font-bold flex items-center gap-1.5 transition-colors"
                >
                  <UploadCloud className="w-3.5 h-3.5 text-teal-600" />
                  <span>Upload Document</span>
                </button>

                <button
                  type="button"
                  disabled={isProcessing}
                  onClick={() => handleSimulateScan("Imaging Report")}
                  className="px-3 py-2 rounded-xl bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 text-xs font-bold flex items-center gap-1.5 transition-colors"
                >
                  <Camera className="w-3.5 h-3.5 text-teal-600" />
                  <span>Take Photo</span>
                </button>
              </div>

              {/* Supported formats label */}
              <div className="mt-4 pt-3 border-t border-slate-200/80 flex items-center justify-center gap-4 text-[10px] text-slate-400 font-medium">
                <span>Prescriptions</span>
                <span>•</span>
                <span>Lab Reports</span>
                <span>•</span>
                <span>Discharge Summaries</span>
              </div>
            </div>

            {/* OCR Pipeline Animation Stepper */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-600">
                  OCR Engine Pipeline
                </span>
                <span className="text-xs font-mono font-bold text-teal-700">
                  {isProcessing ? "Processing..." : "Status: Ready"}
                </span>
              </div>

              <div className="space-y-2">
                {OCR_STAGES.map((st) => {
                  const isDone = currentOcrStage >= st.id;
                  const isCurrent = currentOcrStage === st.id && isProcessing;
                  return (
                    <div key={st.id} className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        {isCurrent ? (
                          <RefreshCw className="w-3.5 h-3.5 text-teal-600 animate-spin" />
                        ) : isDone ? (
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        ) : (
                          <div className="w-3.5 h-3.5 rounded-full border border-slate-300" />
                        )}
                        <span className={`font-medium ${isCurrent ? 'text-teal-800 font-bold' : isDone ? 'text-slate-700' : 'text-slate-400'}`}>
                          {st.id}. {st.label}
                        </span>
                      </div>
                      <span className="text-[10px] text-slate-400">{st.description}</span>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

          {/* RIGHT: Processed Document View & Investigation Table (7 cols) */}
          <div className="lg:col-span-7 space-y-5">

            {/* Document Overview Banner */}
            <div className="bg-slate-900 text-white p-5 rounded-3xl border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded-md bg-teal-500/20 text-teal-300 text-[10px] font-bold uppercase tracking-wider">
                    {activeDoc.category}
                  </span>
                  <span className="text-xs text-slate-400">{activeDoc.facility}</span>
                </div>
                <h3 className="text-base font-bold text-white mt-1">
                  {activeDoc.title}
                </h3>
                <p className="text-xs text-slate-400 font-mono mt-0.5">
                  Record Date: {activeDoc.date}
                </p>
              </div>

              {/* OCR Confidence Indicator */}
              <div className="bg-slate-800/90 border border-slate-700 p-3 rounded-2xl text-center sm:text-right shrink-0">
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">OCR Confidence</p>
                <div className="flex items-center gap-1.5 justify-center sm:justify-end mt-0.5">
                  <Sparkles className="w-4 h-4 text-teal-400" />
                  <span className="text-lg font-black text-teal-400">{activeDoc.confidence}</span>
                </div>
                <p className="text-[10px] text-emerald-400 font-semibold mt-0.5">Verified Medical Lexicon</p>
              </div>
            </div>

            {/* Extracted Clinical Diagnosis & Details */}
            <div className="bg-white rounded-3xl border border-slate-200/90 p-5 shadow-xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Extracted Clinical Information
                </span>
                <span className="text-xs text-slate-500">
                  Doctor: <strong className="text-slate-800">{activeDoc.extractedData?.physician || "Dr. S. Trivedi"}</strong>
                </span>
              </div>

              <div className="p-3.5 bg-teal-50/60 rounded-2xl border border-teal-100 flex items-start gap-3 text-xs">
                <FileSearch className="w-4 h-4 text-teal-700 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-teal-900">Extracted Primary Diagnosis:</span>
                  <p className="text-teal-800 text-sm font-semibold mt-0.5">
                    {activeDoc.extractedData?.diagnosis || "Essential Hypertension & Mixed Dyslipidemia"}
                  </p>
                </div>
              </div>

              {/* Extracted Medications Section */}
              {activeDoc.extractedData?.medications && (
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-2.5 flex items-center gap-1.5">
                    <Pill className="w-3.5 h-3.5 text-teal-700" />
                    <span>Extracted Medications & Dosage Schedule</span>
                  </h4>
                  <div className="space-y-2">
                    {activeDoc.extractedData.medications.map((med, i) => (
                      <div key={i} className="p-3 bg-slate-50 rounded-2xl border border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                        <div>
                          <p className="font-bold text-slate-900 text-sm">{med.name} <span className="text-teal-700 font-mono text-xs">({med.dosage})</span></p>
                          <p className="text-slate-500 text-[11px] mt-0.5">{med.instructions}</p>
                        </div>
                        <div className="text-left sm:text-right shrink-0">
                          <span className="inline-block bg-white px-2.5 py-1 rounded-lg border border-slate-200 font-semibold text-slate-700 text-xs">
                            {med.frequency}
                          </span>
                          <span className="block text-[10px] text-slate-400 mt-0.5">{med.duration}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* LAB REPORT ANALYSIS TABLE */}
              <div className="pt-2">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                    <Activity className="w-3.5 h-3.5 text-teal-700" />
                    <span>Extracted Investigation Results (Lab Analysis)</span>
                  </h4>
                  <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                    Range Highlights Active
                  </span>
                </div>

                <div className="overflow-x-auto rounded-2xl border border-slate-200">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-slate-100/80 text-slate-600 font-bold border-b border-slate-200">
                        <th className="py-2.5 px-3">Test</th>
                        <th className="py-2.5 px-3">Result</th>
                        <th className="py-2.5 px-3">Reference Range</th>
                        <th className="py-2.5 px-3">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 bg-white">
                      {/* Hemoglobin */}
                      <tr className="hover:bg-rose-50/40 transition-colors bg-rose-50/20">
                        <td className="py-3 px-3 font-semibold text-slate-900">
                          Hemoglobin (Hb)
                          <span className="block text-[10px] text-slate-400 font-normal">Whole Blood EDTA</span>
                        </td>
                        <td className="py-3 px-3 font-mono font-bold text-rose-700 text-sm">
                          10.2 <span className="text-xs font-normal text-slate-500">g/dL</span>
                        </td>
                        <td className="py-3 px-3 text-slate-600 font-mono">13.0 – 17.0</td>
                        <td className="py-3 px-3">
                          <StatusBadge status="Abnormal" type="status" />
                        </td>
                      </tr>

                      {/* Glucose */}
                      <tr className="hover:bg-amber-50/40 transition-colors bg-amber-50/10">
                        <td className="py-3 px-3 font-semibold text-slate-900">
                          Fasting Blood Glucose
                          <span className="block text-[10px] text-slate-400 font-normal">Serum Fluoride</span>
                        </td>
                        <td className="py-3 px-3 font-mono font-bold text-amber-800 text-sm">
                          110 <span className="text-xs font-normal text-slate-500">mg/dL</span>
                        </td>
                        <td className="py-3 px-3 text-slate-600 font-mono">70 – 100</td>
                        <td className="py-3 px-3">
                          <StatusBadge status="Abnormal" type="status" />
                        </td>
                      </tr>

                      {/* Cholesterol */}
                      <tr className="hover:bg-amber-50/40 transition-colors">
                        <td className="py-3 px-3 font-semibold text-slate-900">
                          Total Cholesterol
                          <span className="block text-[10px] text-slate-400 font-normal">Lipid Panel</span>
                        </td>
                        <td className="py-3 px-3 font-mono font-bold text-amber-800 text-sm">
                          218 <span className="text-xs font-normal text-slate-500">mg/dL</span>
                        </td>
                        <td className="py-3 px-3 text-slate-600 font-mono">&lt; 200</td>
                        <td className="py-3 px-3">
                          <StatusBadge status="Abnormal" type="status" />
                        </td>
                      </tr>

                      {/* Platelet */}
                      <tr className="hover:bg-slate-50 transition-colors">
                        <td className="py-3 px-3 font-semibold text-slate-900">
                          Platelet Count
                          <span className="block text-[10px] text-slate-400 font-normal">Automated Cell Counter</span>
                        </td>
                        <td className="py-3 px-3 font-mono font-bold text-slate-800 text-sm">
                          195,000 <span className="text-xs font-normal text-slate-500">/µL</span>
                        </td>
                        <td className="py-3 px-3 text-slate-600 font-mono">150,000 – 450,000</td>
                        <td className="py-3 px-3">
                          <StatusBadge status="Normal" type="status" />
                        </td>
                      </tr>

                      {/* Creatinine */}
                      <tr className="hover:bg-slate-50 transition-colors">
                        <td className="py-3 px-3 font-semibold text-slate-900">
                          Serum Creatinine
                          <span className="block text-[10px] text-slate-400 font-normal">Modified Jaffe's</span>
                        </td>
                        <td className="py-3 px-3 font-mono font-bold text-slate-800 text-sm">
                          0.92 <span className="text-xs font-normal text-slate-500">mg/dL</span>
                        </td>
                        <td className="py-3 px-3 text-slate-600 font-mono">0.70 – 1.30</td>
                        <td className="py-3 px-3">
                          <StatusBadge status="Normal" type="status" />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* Potential Attention Required Callout */}
                <div className="mt-3 p-3 bg-amber-50 border border-amber-200 rounded-2xl flex items-start gap-2.5 text-xs text-amber-900">
                  <ShieldAlert className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold">Potential attention required:</span> Hemoglobin (10.2 g/dL) is below normal range and Fasting Glucose (110 mg/dL) exceeds normal threshold. Flagged for physician review.
                  </div>
                </div>

                <p className="text-[10px] text-slate-400 italic mt-2 text-center">
                  * OCR Prototype Demonstration: Extracted values must be correlated with clinical judgment. Not for autonomous diagnosis.
                </p>
              </div>

            </div>

            {/* Bottom Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
              <button
                type="button"
                onClick={() => navigate('/timeline')}
                className="w-full sm:w-auto px-5 py-3 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs font-bold text-slate-700 flex items-center justify-center gap-2 transition-colors"
              >
                <Clock className="w-4 h-4 text-teal-600" />
                <span>View Full Medical Timeline</span>
              </button>

              <button
                type="button"
                onClick={handleContinue}
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-sm transition-all"
              >
                <span>Generate Clinical Summary</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};
