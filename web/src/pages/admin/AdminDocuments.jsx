import React, { useState } from 'react';
import {
  FileSearch,
  CheckCircle2,
  Clock,
  Zap,
  Filter,
  Search,
  FileText,
  Sparkles,
  Download,
  Eye,
  ShieldCheck
} from 'lucide-react';
import { useDemo } from '../../context/DemoContext';

export const AdminDocuments = () => {
  const { documents, addToast } = useDemo();

  const [categoryFilter, setCategoryFilter] = useState('All');
  const [selectedDoc, setSelectedDoc] = useState(null);

  const filteredDocs = documents.filter((doc) => {
    if (categoryFilter === 'All') return true;
    return doc.type.toLowerCase().includes(categoryFilter.toLowerCase());
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-slate-900">Document Processing & OCR Pipeline</h1>
          <p className="text-xs text-slate-500 mt-1">
            Real-time ingestion metrics, OCR optical character recognition throughput, and physician verification logs
          </p>
        </div>

        <div className="flex items-center gap-2">
          {['All', 'Prescription', 'Discharge', 'Lab'].map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                categoryFilter === cat
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* 4 Pipeline Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Documents Processed</span>
          <span className="text-3xl font-black text-slate-900 mt-1 block">184</span>
          <span className="text-[11px] text-emerald-600 font-bold mt-1 block">Across 6 kiosk scanner beds</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Avg OCR Latency</span>
          <span className="text-3xl font-black text-indigo-600 mt-1 block">1.8s</span>
          <span className="text-[11px] text-slate-500 mt-1 block">Cloud vision inference time</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Entity Confidence</span>
          <span className="text-3xl font-black text-slate-900 mt-1 block">96.8%</span>
          <span className="text-[11px] text-emerald-600 font-bold mt-1 block">Clinical NLP named entities</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Verification Rate</span>
          <span className="text-3xl font-black text-slate-900 mt-1 block">98.2%</span>
          <span className="text-[11px] text-blue-600 font-bold mt-1 block">Physician confirmed in EHR</span>
        </div>
      </div>

      {/* Document Pipeline Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <h2 className="text-sm font-bold text-slate-900">Recent Ingested Paper Records</h2>
          <span className="text-xs text-slate-500 font-mono">Real-time Kafka/FHIR Ingestion Queue</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 text-[11px] font-bold text-slate-500 uppercase tracking-wider border-b border-slate-200">
                <th className="py-3 px-4">Document Title</th>
                <th className="py-3 px-4">Type</th>
                <th className="py-3 px-4">Processing Latency</th>
                <th className="py-3 px-4">Confidence</th>
                <th className="py-3 px-4">Verification Status</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredDocs.map((doc) => (
                <tr key={doc.id} className="hover:bg-slate-50">
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-700 flex items-center justify-center font-bold">
                        <FileText className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="font-bold text-slate-900 block">{doc.name}</span>
                        <span className="text-[10px] text-slate-500">{doc.date} • {doc.doctor}</span>
                      </div>
                    </div>
                  </td>

                  <td className="py-3.5 px-4 font-mono font-bold text-slate-700">
                    {doc.type}
                  </td>

                  <td className="py-3.5 px-4 font-mono text-slate-600">
                    1.6s
                  </td>

                  <td className="py-3.5 px-4">
                    <span className="font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 text-[11px]">
                      98.4%
                    </span>
                  </td>

                  <td className="py-3.5 px-4">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        doc.status === 'Verified'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {doc.status}
                    </span>
                  </td>

                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => setSelectedDoc(doc)}
                      className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold"
                    >
                      <Eye className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Doc Modal */}
      {selectedDoc && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-sm text-slate-900">{selectedDoc.name}</h3>
              <button
                onClick={() => setSelectedDoc(null)}
                className="text-slate-400 hover:text-slate-600 font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-2 text-xs">
              <div className="p-3 bg-slate-50 rounded-xl space-y-1">
                <span className="text-[10px] text-slate-400 font-bold uppercase block">Extracted Entities</span>
                {selectedDoc.entities?.map((e, idx) => (
                  <div key={idx} className="flex justify-between py-1 border-b border-slate-200 text-[11px]">
                    <span className="font-bold text-slate-700">{e.label || e.key}:</span>
                    <span className="font-mono text-slate-900">{e.value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setSelectedDoc(null)}
                className="px-4 py-2 rounded-xl bg-indigo-600 text-white font-bold text-xs"
              >
                Close Record
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default AdminDocuments;
