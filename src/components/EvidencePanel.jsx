import React from 'react';
import { X, FileText, CheckCircle2, ShieldAlert, Sparkles, ExternalLink, ZoomIn, Calendar, Building } from 'lucide-react';

export const EvidencePanel = ({ 
  isOpen = false, 
  onClose = () => {}, 
  evidenceItem = null,
  onVerify = () => {} 
}) => {
  if (!isOpen || !evidenceItem) return null;

  const {
    claim = "Atorvastatin 10 mg HS",
    category = "Medication",
    source = "Prescription - Dr. S. Trivedi",
    date = "12 Aug 2026",
    facility = "Civil Hospital & Heart Institute",
    confidence = "94%",
    status = "Verified",
    snippet = "Rx: Tab. Atorvastatin 10mg HS, Tab. Amlodipine 5mg OD M/F. Review after 3 months with Lipid profile.",
    highlightedField = "Tab. Atorvastatin 10mg HS"
  } = evidenceItem;

  return (
    <div 
      className="fixed inset-0 z-[1100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
    >
      <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="p-5 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-500/20 text-blue-400 border border-blue-500/30 flex items-center justify-center">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-white">Source Document Evidence</h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30">
                  {category}
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Trace extracted clinical data back to primary verified source records
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body: Dual Pane */}
        <div className="p-6 overflow-y-auto space-y-6">
          
          {/* Clinical Claim Highlight */}
          <div className="p-4 rounded-2xl bg-blue-50/60 border border-blue-200/80">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700">
                Extracted Clinical Assertion
              </span>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-bold bg-white text-blue-700 border border-blue-200 shadow-2xs">
                <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                AI Confidence: {confidence}
              </span>
            </div>
            <h4 className="text-base font-bold text-slate-900">{claim}</h4>
            <div className="flex flex-wrap items-center gap-3 mt-2 text-xs text-slate-600">
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                <span>Dated: {date}</span>
              </span>
              <span className="flex items-center gap-1">
                <Building className="w-3.5 h-3.5 text-slate-400" />
                <span>{facility}</span>
              </span>
            </div>
          </div>

          {/* Original Source Document Excerpt Canvas */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h5 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Original Physical Document Record
              </h5>
              <span className="text-xs text-blue-600 font-semibold">{source}</span>
            </div>
            
            <div className="p-4 rounded-2xl bg-amber-50/40 border border-amber-200/80 font-mono text-xs text-slate-800 leading-relaxed shadow-inner">
              <div className="border-b border-amber-200/60 pb-2 mb-2 flex items-center justify-between text-[11px] text-amber-900/70 font-sans">
                <span>Prescription Ref: GMC-34190 • Dr. S. Trivedi</span>
                <span className="font-semibold text-emerald-700">✓ OCR Verified</span>
              </div>
              <p className="bg-white/80 p-3 rounded-xl border border-amber-200/60">
                {snippet}
              </p>
              <div className="mt-2 text-[11px] font-sans text-amber-800 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span>Verified against physician digital signature and OPD token history.</span>
              </div>
            </div>
          </div>

          {/* Clinician Note */}
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-600">
            <strong className="text-slate-800">Safety & Audit Trail:</strong> MediKiosk maintains non-repudiable document provenance. Clinical diagnoses and prescriptions remain under full physician authority.
          </div>

        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-slate-100 border-t border-slate-200 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl border border-slate-300 font-bold text-xs text-slate-700 hover:bg-slate-200 transition-colors"
          >
            Close Panel
          </button>
          <button
            type="button"
            onClick={() => {
              onVerify(evidenceItem);
              onClose();
            }}
            className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-xs transition-colors"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Confirm & Verify in Summary</span>
          </button>
        </div>

      </div>
    </div>
  );
};
