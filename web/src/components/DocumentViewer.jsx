import React, { useState } from 'react';
import { 
  FileText, 
  ZoomIn, 
  ZoomOut, 
  RotateCw, 
  ChevronLeft, 
  ChevronRight, 
  CheckCircle2, 
  Edit3, 
  XCircle, 
  Sparkles, 
  Calendar, 
  Building,
  Check,
  AlertTriangle
} from 'lucide-react';

export const DocumentViewer = ({ 
  documents = [], 
  initialDocumentId = null,
  onVerifyDocument = () => {} 
}) => {
  const [selectedDocId, setSelectedDocId] = useState(initialDocumentId || (documents[0]?.id ?? null));
  const [zoomLevel, setZoomLevel] = useState(100);
  const [rotation, setRotation] = useState(0);

  const activeDoc = documents.find(d => d.id === selectedDocId) || documents[0];

  const handleZoomIn = () => setZoomLevel(prev => Math.min(prev + 20, 180));
  const handleZoomOut = () => setZoomLevel(prev => Math.max(prev - 20, 60));
  const handleRotate = () => setRotation(prev => (prev + 90) % 360);

  const currentIndex = documents.findIndex(d => d.id === selectedDocId);
  const handlePrev = () => {
    if (currentIndex > 0) setSelectedDocId(documents[currentIndex - 1].id);
  };
  const handleNext = () => {
    if (currentIndex < documents.length - 1) setSelectedDocId(documents[currentIndex + 1].id);
  };

  if (!activeDoc) {
    return (
      <div className="p-12 text-center bg-white rounded-3xl border border-slate-200 text-slate-400">
        No documents available for preview.
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden flex flex-col lg:flex-row min-h-[640px]">
      
      {/* LEFT COLUMN: Document List */}
      <div className="w-full lg:w-72 border-r border-slate-200/90 p-4 bg-slate-50/50 flex flex-col shrink-0">
        <div className="flex items-center justify-between pb-3 border-b border-slate-200">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
            Document Catalog
          </h4>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-800">
            {documents.length} Files
          </span>
        </div>

        <div className="space-y-2 mt-3 overflow-y-auto max-h-[550px]">
          {documents.map((doc) => {
            const isSelected = doc.id === activeDoc.id;
            return (
              <button
                key={doc.id}
                type="button"
                onClick={() => setSelectedDocId(doc.id)}
                className={`w-full text-left p-3 rounded-2xl transition-all border ${
                  isSelected 
                    ? 'bg-blue-600 text-white border-blue-600 shadow-xs' 
                    : 'bg-white hover:bg-slate-100 text-slate-700 border-slate-200/80'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <span className={`text-[10px] font-bold uppercase px-1.5 py-0.5 rounded ${
                    isSelected ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'
                  }`}>
                    {doc.category}
                  </span>
                  <span className={`text-[10px] font-mono ${isSelected ? 'text-blue-100' : 'text-slate-400'}`}>
                    {doc.date}
                  </span>
                </div>
                <h5 className="text-xs font-bold mt-1.5 truncate">{doc.title}</h5>
                <p className={`text-[10px] mt-0.5 truncate ${isSelected ? 'text-blue-100' : 'text-slate-500'}`}>
                  {doc.facility}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* CENTER COLUMN: Document Canvas Viewer */}
      <div className="flex-1 flex flex-col bg-slate-100/70 border-r border-slate-200/90 overflow-hidden">
        
        {/* Controls Toolbar */}
        <div className="p-3 bg-white border-b border-slate-200 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={handlePrev}
              disabled={currentIndex <= 0}
              className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-600 disabled:opacity-30"
              title="Previous Document"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-xs font-bold text-slate-600 px-2">
              {currentIndex + 1} / {documents.length}
            </span>
            <button
              type="button"
              onClick={handleNext}
              disabled={currentIndex >= documents.length - 1}
              className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-600 disabled:opacity-30"
              title="Next Document"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleZoomOut}
              className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-600"
              title="Zoom Out"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <span className="text-xs font-mono text-slate-600 min-w-[45px] text-center">
              {zoomLevel}%
            </span>
            <button
              type="button"
              onClick={handleZoomIn}
              className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-600"
              title="Zoom In"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={handleRotate}
              className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-600"
              title="Rotate 90°"
            >
              <RotateCw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Canvas Display */}
        <div className="flex-1 p-6 flex items-center justify-center overflow-auto min-h-[400px]">
          <div 
            className="bg-white rounded-2xl shadow-md border border-slate-300 p-8 max-w-lg w-full transition-all duration-200"
            style={{ 
              transform: `scale(${zoomLevel / 100}) rotate(${rotation}deg)`,
              transformOrigin: 'center center' 
            }}
          >
            {/* Mock prescription / lab sheet header */}
            <div className="border-b-2 border-slate-800 pb-4 mb-4 flex items-center justify-between">
              <div>
                <h3 className="font-black text-sm uppercase tracking-tight text-slate-900">{activeDoc.facility}</h3>
                <p className="text-[10px] text-slate-500">Government Medical College OPD Service</p>
              </div>
              <div className="text-right">
                <span className="text-[10px] font-mono text-slate-600">{activeDoc.date}</span>
                <p className="text-[9px] font-bold text-blue-700">REF: {activeDoc.id}</p>
              </div>
            </div>

            {/* Document Content Simulation */}
            <div className="space-y-4 py-2 text-xs text-slate-700 font-sans">
              <div className="p-3 bg-amber-50/50 rounded-xl border border-amber-200/80 font-mono text-[11px] leading-relaxed">
                <span className="block font-bold text-amber-900 mb-1">OCR Physical Document Preview:</span>
                {activeDoc.snippet}
              </div>

              <div className="grid grid-cols-2 gap-3 text-[11px] pt-2 border-t border-slate-100">
                <div>
                  <span className="font-bold text-slate-500">Document Type:</span>
                  <p className="font-semibold text-slate-800">{activeDoc.category}</p>
                </div>
                <div>
                  <span className="font-bold text-slate-500">Digitization Date:</span>
                  <p className="font-semibold text-slate-800">{activeDoc.date}</p>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-slate-200 flex items-center justify-between text-[10px] text-slate-400">
              <span>Authentic Clinical Record</span>
              <span className="font-signature text-base text-blue-800">Dr. S. Trivedi</span>
            </div>
          </div>
        </div>

      </div>

      {/* RIGHT COLUMN: AI Extracted Data & Confidence */}
      <div className="w-full lg:w-80 p-5 bg-white flex flex-col justify-between shrink-0">
        <div className="space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                OCR Intelligence
              </span>
              <h4 className="text-sm font-bold text-slate-900">Extracted Information</h4>
            </div>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-bold bg-blue-50 text-blue-700 border border-blue-200">
              <Sparkles className="w-3 h-3 text-blue-600" />
              {activeDoc.confidence} Confidence
            </span>
          </div>

          <div className="space-y-2.5">
            {activeDoc.extractedInfo && activeDoc.extractedInfo.length > 0 ? (
              activeDoc.extractedInfo.map((item, idx) => (
                <div key={idx} className="p-3 bg-slate-50 rounded-xl border border-slate-200/80">
                  <div className="flex items-center justify-between text-[10px] font-bold text-slate-500 uppercase">
                    <span>{item.key}</span>
                    {item.confidence && (
                      <span className="text-blue-600">{item.confidence}</span>
                    )}
                  </div>
                  <p className="text-xs font-bold text-slate-900 mt-0.5">{item.value}</p>
                  {item.frequency && (
                    <p className="text-[11px] text-slate-600 mt-0.5">Dose: {item.frequency}</p>
                  )}
                  {item.status && (
                    <span className={`inline-block mt-1 text-[10px] px-2 py-0.5 rounded font-bold ${
                      item.status === 'High' ? 'bg-rose-100 text-rose-800' : 'bg-emerald-100 text-emerald-800'
                    }`}>
                      {item.status}
                    </span>
                  )}
                </div>
              ))
            ) : (
              <p className="text-xs text-slate-500 italic">No structured fields extracted.</p>
            )}
          </div>
        </div>

        {/* Verification Actions */}
        <div className="pt-4 border-t border-slate-100 space-y-2 mt-4">
          <button
            type="button"
            onClick={() => onVerifyDocument(activeDoc.id, 'Verified')}
            className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-xs transition-colors"
          >
            <Check className="w-4 h-4" />
            <span>Confirm & Verify Document</span>
          </button>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => onVerifyDocument(activeDoc.id, 'Needs Review')}
              className="flex-1 py-2 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 font-bold text-xs flex items-center justify-center gap-1"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Edit Data</span>
            </button>
            <button
              type="button"
              onClick={() => onVerifyDocument(activeDoc.id, 'Rejected')}
              className="flex-1 py-2 rounded-xl border border-rose-200 text-rose-700 hover:bg-rose-50 font-bold text-xs flex items-center justify-center gap-1"
            >
              <XCircle className="w-3.5 h-3.5" />
              <span>Reject</span>
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};
