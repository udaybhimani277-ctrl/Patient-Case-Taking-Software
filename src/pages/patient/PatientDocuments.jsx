import React, { useState } from 'react';
import {
  UploadCloud,
  Camera,
  FileText,
  CheckCircle2,
  AlertCircle,
  Eye,
  Trash2,
  Clock,
  Sparkles,
  Search,
  Filter,
  Plus,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { useDemo } from '../../context/DemoContext';
import { VerificationModal } from '../../components/VerificationModal';

export const PatientDocuments = () => {
  const { documents, uploadDocument, addToast } = useDemo();

  const [selectedDoc, setSelectedDoc] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isProcessingUpload, setIsProcessingUpload] = useState(false);

  // New Document Upload State
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState('Prescription');
  const [isSimulatingCamera, setIsSimulatingCamera] = useState(false);

  const categories = ['All', 'Prescription', 'Lab Report', 'Imaging Report', 'Discharge Summary'];

  const filteredDocs = documents.filter(doc => {
    const matchesCat = selectedCategory === 'All' || doc.category === selectedCategory;
    const matchesSearch = doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.snippet?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const handleUploadSubmit = (e) => {
    e.preventDefault();
    if (!newTitle.trim()) {
      addToast({ title: "Input Required", message: "Please enter a document title.", type: "error" });
      return;
    }

    setIsProcessingUpload(true);
    setTimeout(() => {
      setIsProcessingUpload(false);
      const newDoc = uploadDocument({
        title: newTitle,
        category: newCategory,
        snippet: "Rx: Tab Metformin 500mg BD. Blood glucose fasting 114 mg/dL. Re-evaluate in 30 days.",
        extractedInfo: [
          { key: "Medicine", value: "Metformin 500 mg", frequency: "2/day (Morning & Night)", confidence: "96%" },
          { key: "Investigation", value: "Fasting Blood Glucose 114 mg/dL", status: "Mild Elevated", confidence: "94%" }
        ]
      });
      setNewTitle('');
      setSelectedDoc(newDoc);
      setModalOpen(true);
    }, 1200);
  };

  const handleCameraScan = () => {
    setIsSimulatingCamera(true);
    setTimeout(() => {
      setIsSimulatingCamera(false);
      const newDoc = uploadDocument({
        title: `Camera Scan — Prescription (${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })})`,
        category: "Prescription",
        snippet: "Rx: Tab Pantoprazole 40mg OD AC, Tab Paracetamol 650mg SOS. Review OPD.",
        extractedInfo: [
          { key: "Medicine", value: "Pantoprazole 40 mg", frequency: "1/day (Before Breakfast)", confidence: "95%" },
          { key: "Medicine", value: "Paracetamol 650 mg", frequency: "As needed (PRN)", confidence: "92%" }
        ]
      });
      setSelectedDoc(newDoc);
      setModalOpen(true);
    }, 1500);
  };

  return (
    <div className="space-y-6 sm:space-y-8 max-w-5xl mx-auto">
      
      {/* Header & OCR Notice */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-purple-50 text-purple-700 border border-purple-200">
              Optical Character Recognition (OCR)
            </span>
            <span className="text-xs text-slate-500">ABDM Health Locker</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
            Medical Records & Prescription Scanner
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Digitize crumpled paper prescriptions, lab reports, and discharge summaries with out-of-range flag detection.
          </p>
        </div>

        {/* Upload Buttons */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleCameraScan}
            disabled={isSimulatingCamera}
            className="px-4 py-2.5 rounded-xl bg-slate-900 text-white hover:bg-slate-800 font-bold text-xs flex items-center gap-2 transition-all cursor-pointer disabled:opacity-60 shadow-sm"
          >
            <Camera className="w-4 h-4 text-teal-400" />
            <span>{isSimulatingCamera ? "Scanning Camera..." : "Camera Scan"}</span>
          </button>
        </div>
      </div>

      {/* Upload Zone & Camera Dropzone Card */}
      <div className="bg-gradient-to-br from-purple-50/60 via-white to-slate-50 rounded-3xl p-6 border border-purple-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-purple-900 uppercase tracking-wider flex items-center gap-1.5">
            <UploadCloud className="w-4 h-4 text-purple-600" />
            Upload New Prescription or Lab Investigation
          </span>
          <span className="text-[10px] bg-emerald-50 text-emerald-800 border border-emerald-200 px-2.5 py-0.5 rounded-full font-bold">
            Average OCR Confidence: 94%
          </span>
        </div>

        <form onSubmit={handleUploadSubmit} className="grid grid-cols-1 sm:grid-cols-12 gap-3">
          <div className="sm:col-span-6 space-y-1">
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="Document Title (e.g. Sterling Hospital Lab Report 2026)"
              className="w-full text-xs p-3 rounded-xl border border-slate-200 bg-white focus:outline-hidden focus:border-purple-500"
            />
          </div>

          <div className="sm:col-span-3 space-y-1">
            <select
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              className="w-full text-xs p-3 rounded-xl border border-slate-200 bg-white focus:outline-hidden focus:border-purple-500 font-semibold text-slate-700"
            >
              <option value="Prescription">Prescription</option>
              <option value="Lab Report">Lab Report</option>
              <option value="Discharge Summary">Discharge Summary</option>
              <option value="Imaging Report">Imaging Report</option>
              <option value="Medical Certificate">Medical Certificate</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="sm:col-span-3">
            <button
              type="submit"
              disabled={isProcessingUpload}
              className="w-full py-3 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shadow-md shadow-purple-500/25 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 transition-all"
            >
              {isProcessingUpload ? (
                <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              ) : (
                <>
                  <Plus className="w-4 h-4" />
                  <span>Upload & Run OCR</span>
                </>
              )}
            </button>
          </div>
        </form>

        <p className="text-[11px] text-slate-500">
          Supports PNG, JPG, PDF scans. OCR automatically parses medications, doses, frequencies, and abnormal lab parameters.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search documents or medicines..."
            className="w-full text-xs pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 bg-white focus:outline-hidden focus:border-blue-500"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
          {categories.map(cat => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Documents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredDocs.map((doc) => (
          <div
            key={doc.id}
            className="bg-white rounded-3xl p-5 border border-slate-200 shadow-2xs hover:shadow-md hover:border-blue-300 transition-all space-y-3.5 flex flex-col justify-between"
          >
            <div className="space-y-2">
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900 leading-snug">{doc.title}</h4>
                    <p className="text-[10px] text-slate-500">{doc.facility} • {doc.date}</p>
                  </div>
                </div>

                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold shrink-0 ${
                  doc.status === 'Verified' ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-amber-50 text-amber-800 border border-amber-200'
                }`}>
                  {doc.status}
                </span>
              </div>

              {/* OCR Snippet */}
              <p className="text-xs text-slate-600 italic bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                "{doc.snippet}"
              </p>

              {/* Extracted Entities Tag Pills */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {doc.extractedInfo?.map((item, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 border border-blue-100"
                  >
                    <span>{item.key}:</span>
                    <strong className="text-slate-800">{item.value}</strong>
                  </span>
                ))}
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-[11px] font-bold text-emerald-600 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Confidence: {doc.confidence || "94%"}</span>
              </span>

              <button
                type="button"
                onClick={() => {
                  setSelectedDoc(doc);
                  setModalOpen(true);
                }}
                className="px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Verify OCR</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredDocs.length === 0 && (
        <div className="bg-white rounded-3xl p-10 text-center border border-slate-200 space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
            <FileText className="w-6 h-6" />
          </div>
          <h4 className="text-sm font-bold text-slate-800">No medical records match your search</h4>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Upload paper prescriptions, discharge certificates, or lab reports to run automated OCR parsing.
          </p>
        </div>
      )}

      {/* Side-by-Side Verification Modal */}
      {modalOpen && selectedDoc && (
        <VerificationModal
          document={selectedDoc}
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
        />
      )}

    </div>
  );
};

export default PatientDocuments;
