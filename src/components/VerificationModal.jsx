import React, { useState } from 'react';
import {
  X,
  CheckCircle2,
  Edit3,
  XCircle,
  FileText,
  ShieldCheck,
  Sparkles,
  AlertCircle,
  Calendar,
  Building2,
  Save,
  ZoomIn,
  ZoomOut
} from 'lucide-react';
import { useDemo } from '../context/DemoContext';

export const VerificationModal = ({ document, isOpen, onClose }) => {
  const { updateDocumentVerification } = useDemo();
  const [isEditing, setIsEditing] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(100);
  const [editedEntities, setEditedEntities] = useState(() => document?.extractedInfo || []);
  const [verificationNotes, setVerificationNotes] = useState(document?.verificationNotes || "");

  if (!isOpen || !document) return null;

  const handleConfirm = () => {
    updateDocumentVerification(document.id, "Verified", verificationNotes);
    onClose();
  };

  const handleReject = () => {
    updateDocumentVerification(document.id, "Rejected", verificationNotes || "Uncertain or unreadable scan");
    onClose();
  };

  const handleSaveEdit = () => {
    setIsEditing(false);
    updateDocumentVerification(document.id, "Verified", verificationNotes || "Manually corrected & verified");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-3 sm:p-6 overflow-y-auto">
      <div className="bg-white w-full max-w-5xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-150">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50/80">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm sm:text-base font-bold text-slate-900">{document.title}</h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 text-blue-800">
                  {document.category}
                </span>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                  document.status === 'Verified' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                }`}>
                  {document.status}
                </span>
              </div>
              <p className="text-xs text-slate-500">
                {document.facility} • Date: {document.date}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content: Side by Side (Left: Original Scan, Right: OCR Extracted Information) */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-y-auto min-h-0">
          
          {/* Left Side: Original Document Preview */}
          <div className="lg:col-span-6 p-6 border-b lg:border-b-0 lg:border-r border-slate-200 bg-slate-100/70 flex flex-col justify-between overflow-y-auto">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Original Document Scan
                </span>
                <div className="flex items-center gap-1.5 bg-white px-2 py-1 rounded-lg border border-slate-200 text-xs">
                  <button
                    type="button"
                    onClick={() => setZoomLevel(Math.max(70, zoomLevel - 15))}
                    className="p-0.5 text-slate-600 hover:text-slate-900"
                    title="Zoom Out"
                  >
                    <ZoomOut className="w-3.5 h-3.5" />
                  </button>
                  <span className="text-[11px] font-mono font-semibold">{zoomLevel}%</span>
                  <button
                    type="button"
                    onClick={() => setZoomLevel(Math.min(150, zoomLevel + 15))}
                    className="p-0.5 text-slate-600 hover:text-slate-900"
                    title="Zoom In"
                  >
                    <ZoomIn className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Simulated Paper Prescription / Lab Slip */}
              <div
                style={{ transform: `scale(${zoomLevel / 100})`, transformOrigin: 'top center' }}
                className="bg-white rounded-2xl p-6 border border-slate-300/80 shadow-md font-serif text-slate-900 space-y-4 transition-transform duration-150"
              >
                {/* Hospital Prescription Letterhead */}
                <div className="border-b-2 border-slate-800 pb-3 text-center">
                  <h4 className="font-bold text-base tracking-tight uppercase font-sans">
                    {document.facility}
                  </h4>
                  <p className="text-[10px] text-slate-500 font-sans">
                    Department of Clinical Medicine • OPD Consultation Record
                  </p>
                  <div className="flex justify-between text-[11px] text-slate-600 pt-2 font-sans border-t border-slate-100 mt-2">
                    <span>Date: {document.date}</span>
                    <span>UHID: P001-2026</span>
                  </div>
                </div>

                {/* Hand-scribed OCR snippet representation */}
                <div className="space-y-3 font-sans text-xs">
                  <div className="bg-blue-50/50 p-3 rounded-xl border border-blue-100">
                    <p className="text-[11px] font-bold text-blue-900 uppercase">Clinical Snippet / Rx Note:</p>
                    <p className="italic text-slate-700 mt-1 leading-relaxed">
                      "{document.snippet}"
                    </p>
                  </div>

                  <div className="p-3 bg-amber-50/60 rounded-xl border border-amber-200/80 text-[11px] space-y-1">
                    <div className="flex items-center gap-1.5 font-bold text-amber-900">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>OCR Optical Parsing Engine</span>
                    </div>
                    <p className="text-amber-800">
                      High-accuracy clinical NER detected {document.extractedInfo?.length || 2} clinical items.
                    </p>
                  </div>
                </div>

                {/* Doctor Stamp Simulation */}
                <div className="pt-4 border-t border-dashed border-slate-300 flex justify-between items-center text-[10px] text-slate-500 font-sans">
                  <span>Sign & Stamp Verified</span>
                  <span className="font-mono text-blue-700 font-bold border border-blue-300 px-2 py-0.5 rounded">
                    DOC-VERIFIED
                  </span>
                </div>
              </div>
            </div>

            <p className="text-[11px] text-slate-400 text-center mt-4">
              Stored securely under ABDM Health Locker. Encrypted end-to-end.
            </p>
          </div>

          {/* Right Side: AI Extracted Clinical Entities & Confidence */}
          <div className="lg:col-span-6 p-6 flex flex-col justify-between overflow-y-auto space-y-5">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    AI Extracted Clinical Entities
                  </span>
                  <p className="text-xs text-slate-600 mt-0.5">
                    Verify information against the scan on the left.
                  </p>
                </div>
                <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                  <span>AI Confidence: {document.confidence || "94%"}</span>
                </div>
              </div>

              {/* Extracted Entities List */}
              <div className="space-y-3 mt-4">
                {document.extractedInfo?.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/90 space-y-1.5 hover:border-blue-300 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wide">
                        {item.key}
                      </span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-blue-50 text-blue-700 border border-blue-200">
                        {item.confidence || "95%"} Confidence
                      </span>
                    </div>
                    <p className="text-sm font-bold text-slate-900">{item.value}</p>
                    {item.frequency && (
                      <p className="text-xs text-slate-600">Frequency: <span className="font-semibold">{item.frequency}</span></p>
                    )}
                    {item.status && (
                      <span className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded ${
                        item.status === 'High' ? 'bg-red-100 text-red-800' : 'bg-emerald-100 text-emerald-800'
                      }`}>
                        Reference: {item.status}
                      </span>
                    )}
                  </div>
                ))}
              </div>

              {/* Clinical Verification Notes Input */}
              <div className="mt-4 space-y-1.5">
                <label className="text-xs font-bold text-slate-700 flex items-center gap-1">
                  <Edit3 className="w-3.5 h-3.5 text-slate-400" />
                  <span>Physician / Verifier Notes (Optional):</span>
                </label>
                <textarea
                  rows={2}
                  value={verificationNotes}
                  onChange={(e) => setVerificationNotes(e.target.value)}
                  placeholder="e.g., Dosage confirmed against verbal history; review with doctor."
                  className="w-full text-xs p-3 rounded-xl border border-slate-200 focus:outline-hidden focus:border-blue-500 bg-white"
                />
              </div>

              {/* Physician Verification Disclaimer */}
              <div className="mt-4 p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-[11px] flex items-start gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-amber-600 mt-0.5" />
                <p>
                  <strong>Clinical Notice:</strong> Extracted data requires healthcare staff or physician verification prior to inclusion in definitive diagnostic summaries.
                </p>
              </div>
            </div>

            {/* Action Buttons: Confirm, Edit, Reject, Save */}
            <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-end gap-2.5">
              <button
                type="button"
                onClick={handleReject}
                className="px-4 py-2.5 rounded-xl border border-rose-200 text-rose-700 hover:bg-rose-50 font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <XCircle className="w-4 h-4" />
                <span>Reject Scan</span>
              </button>

              <button
                type="button"
                onClick={() => setIsEditing(!isEditing)}
                className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Edit3 className="w-4 h-4 text-slate-500" />
                <span>{isEditing ? "Cancel Edit" : "Edit Values"}</span>
              </button>

              <button
                type="button"
                onClick={handleConfirm}
                className="px-6 py-2.5 rounded-xl bg-emerald-600 text-white hover:bg-emerald-700 font-bold text-xs flex items-center gap-1.5 shadow-sm shadow-emerald-600/30 transition-all cursor-pointer"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Confirm & Verify</span>
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
