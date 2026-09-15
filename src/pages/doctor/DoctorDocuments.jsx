import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  FileSearch,
  CheckCircle2,
  AlertTriangle,
  ZoomIn,
  ZoomOut,
  RotateCw,
  Eye,
  Edit3,
  ExternalLink,
  Download,
  Check,
  X,
  FileText
} from 'lucide-react';
import { useDemo } from '../../context/DemoContext';
import { VerificationModal } from '../../components/VerificationModal';

export const DoctorDocuments = () => {
  const { patientId } = useParams();
  const {
    patients,
    activePatient,
    documents,
    verifyDocument,
    addToast
  } = useDemo();

  const currentPatient = patients.find((p) => p.id === patientId) || activePatient;
  const [selectedDoc, setSelectedDoc] = useState(documents[0] || null);
  const [zoomLevel, setZoomLevel] = useState(100);
  const [rotation, setRotation] = useState(0);
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [verifyModalOpen, setVerifyModalOpen] = useState(false);

  const filteredDocs = documents.filter((doc) => {
    if (categoryFilter === 'All') return true;
    return doc.type.toLowerCase().includes(categoryFilter.toLowerCase());
  });

  const handleVerify = (docId) => {
    verifyDocument(docId);
    addToast({
      title: 'Document OCR Verified',
      message: 'Clinical entities confirmed by consulting physician.',
      type: 'success'
    });
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-slate-900">Medical Documents & OCR Extraction</h1>
          <p className="text-xs text-slate-500 mt-1">
            Review original paper records against AI-extracted clinical entities for <span className="font-bold text-slate-800">{currentPatient.name}</span>
          </p>
        </div>

        <div className="flex items-center gap-2">
          {['All', 'Prescription', 'Discharge', 'Lab'].map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                categoryFilter === cat
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Main Two-Column Document Viewer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Document List (4 cols) */}
        <div className="lg:col-span-4 space-y-3">
          <h2 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Patient Records ({filteredDocs.length})</h2>
          <div className="space-y-2.5">
            {filteredDocs.map((doc) => {
              const isSelected = selectedDoc?.id === doc.id;
              return (
                <div
                  key={doc.id}
                  onClick={() => {
                    setSelectedDoc(doc);
                    setZoomLevel(100);
                    setRotation(0);
                  }}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-blue-50/80 border-blue-400 ring-2 ring-blue-500/20 shadow-sm'
                      : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
                        <FileText className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="font-bold text-xs text-slate-900 block">{doc.name}</span>
                        <span className="text-[10px] text-slate-500">{doc.date} • {doc.doctor}</span>
                      </div>
                    </div>
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        doc.status === 'Verified'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {doc.status}
                    </span>
                  </div>

                  <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                    <span>{doc.entities?.length || 0} entities extracted</span>
                    <span className="font-bold text-blue-600">View Scan →</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Original Image + Extracted OCR Entities (8 cols) */}
        <div className="lg:col-span-8 bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
          {selectedDoc ? (
            <>
              {/* Document Header & Controls */}
              <div className="p-4 bg-slate-50 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-xs text-slate-900">{selectedDoc.name}</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-slate-200 text-slate-700 font-mono">
                    {selectedDoc.type}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <div className="flex items-center bg-white rounded-xl border border-slate-200 p-1 text-xs">
                    <button
                      onClick={() => setZoomLevel((z) => Math.max(50, z - 15))}
                      className="p-1 hover:bg-slate-100 rounded text-slate-600"
                      title="Zoom Out"
                    >
                      <ZoomOut className="w-3.5 h-3.5" />
                    </button>
                    <span className="px-2 font-mono font-bold text-slate-700">{zoomLevel}%</span>
                    <button
                      onClick={() => setZoomLevel((z) => Math.min(200, z + 15))}
                      className="p-1 hover:bg-slate-100 rounded text-slate-600"
                      title="Zoom In"
                    >
                      <ZoomIn className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <button
                    onClick={() => setRotation((r) => (r + 90) % 360)}
                    className="p-2 bg-white rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-600"
                    title="Rotate 90°"
                  >
                    <RotateCw className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => setVerifyModalOpen(true)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-sm"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Verify Extraction</span>
                  </button>
                </div>
              </div>

              {/* Document Display & OCR Breakdown */}
              <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                
                {/* Visual Document Preview */}
                <div className="bg-slate-900/90 rounded-2xl p-4 flex items-center justify-center min-h-[320px] overflow-hidden relative">
                  <div
                    style={{
                      transform: `scale(${zoomLevel / 100}) rotate(${rotation}deg)`,
                      transition: 'transform 0.2s ease-out'
                    }}
                    className="bg-white p-6 rounded-lg shadow-xl max-w-xs text-[10px] font-mono text-slate-800 space-y-3 pointer-events-none select-none border border-slate-200"
                  >
                    <div className="border-b border-slate-300 pb-2 text-center">
                      <p className="font-bold uppercase tracking-wider text-xs">CIVIL HOSPITAL AHMEDABAD</p>
                      <p className="text-[9px] text-slate-500">Department of Cardiology • Prescription Slip</p>
                    </div>
                    <div className="flex justify-between text-[9px] text-slate-600">
                      <span>Pt: Ramesh Patel (54/M)</span>
                      <span>Date: {selectedDoc.date}</span>
                    </div>
                    <div className="py-2 space-y-1">
                      <p className="font-bold text-[10px]">Rx:</p>
                      <p>1. Tab. Telmisartan 40mg - 1-0-0 (Morning)</p>
                      <p>2. Tab. Metformin 500mg - 1-0-1 (After Meals)</p>
                      <p>3. Tab. Atorvastatin 20mg - 0-0-1 (Bedtime)</p>
                    </div>
                    <div className="border-t border-slate-200 pt-2 text-right">
                      <p className="italic text-[9px]">Dr. Priya Sharma, MD (Cardiology)</p>
                      <p className="text-[8px] text-slate-400">Reg No: G-48291</p>
                    </div>
                  </div>
                </div>

                {/* Extracted Entities List */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                      Extracted Clinical Data (OCR)
                    </h3>
                    <span className="font-mono text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      98.4% Confidence
                    </span>
                  </div>

                  <div className="space-y-2.5">
                    {selectedDoc.entities?.map((ent, idx) => (
                      <div
                        key={idx}
                        className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1 text-xs"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-slate-900">{ent.label || ent.key}</span>
                          <span className="font-mono text-[10px] text-blue-600 font-semibold">{ent.type || 'Clinical Entity'}</span>
                        </div>
                        <p className="text-slate-700 font-mono text-[11px] bg-white p-1.5 rounded border border-slate-200">
                          {ent.value}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs">
                    <div className="flex items-center gap-1.5 font-bold mb-1">
                      <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                      <span>Physician Action Required</span>
                    </div>
                    <p className="text-[11px]">
                      Ensure extracted medications and dosages match the handwritten script before approving EHR import.
                    </p>
                  </div>
                </div>

              </div>
            </>
          ) : (
            <div className="p-12 text-center text-slate-400">
              Select a document to inspect OCR extraction.
            </div>
          )}
        </div>

      </div>

      {/* Side-by-side Verification Modal */}
      {verifyModalOpen && selectedDoc && (
        <VerificationModal
          document={selectedDoc}
          onClose={() => setVerifyModalOpen(false)}
          onConfirm={() => {
            handleVerify(selectedDoc.id);
            setVerifyModalOpen(false);
          }}
        />
      )}
    </div>
  );
};
export default DoctorDocuments;
