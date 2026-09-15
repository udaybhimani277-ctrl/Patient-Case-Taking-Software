import React, { useState } from 'react';
import { useDemo } from '../context/DemoContext';
import { 
  Clock, 
  Sparkles, 
  Calendar, 
  FileText, 
  Filter, 
  Stethoscope, 
  Pill, 
  Activity, 
  ArrowRight, 
  ChevronRight, 
  X,
  Hospital,
  Eye,
  Printer,
  HeartPulse,
  User
} from 'lucide-react';
import { AudioInstructionBtn } from '../components/AudioInstructionBtn';

export const Timeline = () => {
  const { activePatient, addToast } = useDemo();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedEventModal, setSelectedEventModal] = useState(null);

  const categories = ["All", "Prescriptions", "Lab Reports", "Diagnoses", "Hospital Visits"];

  // Filter events
  const timelineItems = activePatient.timeline || [];
  const filteredItems = selectedCategory === "All"
    ? timelineItems
    : timelineItems.filter(item => item.category === selectedCategory);

  const handleCategoryFilter = (cat) => {
    setSelectedCategory(cat);
    addToast({
      title: "Timeline Filtered",
      message: `Showing ${cat === 'All' ? 'all chronological events' : cat}.`,
      type: "info"
    });
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case "Prescriptions":
        return <Pill className="w-4 h-4 text-emerald-600" />;
      case "Lab Reports":
        return <Activity className="w-4 h-4 text-teal-600" />;
      case "Diagnoses":
        return <Stethoscope className="w-4 h-4 text-purple-600" />;
      case "Hospital Visits":
      default:
        return <Hospital className="w-4 h-4 text-cyan-600" />;
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 py-4">
      
      {/* Header Banner (Matching Reference Design: Patient Case History) */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-7 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-base shadow-xs">
              {activePatient.name.split(" ").map(n => n[0]).join("")}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold text-slate-900">{activePatient.name}</h1>
                <span className="font-mono text-xs text-blue-600 font-bold">({activePatient.id})</span>
              </div>
              <p className="text-xs text-slate-500">
                Age: <strong className="text-slate-700">{activePatient.age}</strong> | Gender: <strong className="text-slate-700">{activePatient.gender}</strong> | Visit Date: <strong className="text-slate-700">10 Aug 2025</strong>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={() => window.print()}
              className="px-4 py-2 rounded-xl bg-white border border-blue-200 text-blue-700 hover:bg-blue-50 text-xs font-bold flex items-center gap-1.5 shadow-2xs transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Report</span>
            </button>
            <AudioInstructionBtn
              variant="compact"
              label="Audio Summary"
              text={`Medical timeline for ${activePatient.name}.`}
            />
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1 shrink-0 mr-1">
            <Filter className="w-3.5 h-3.5" /> Filter:
          </span>
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => handleCategoryFilter(cat)}
                className={`px-3 py-1 rounded-xl text-xs font-bold transition-all shrink-0 ${
                  isSelected
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-slate-50 text-slate-700 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* 2-Column Split: Timeline on Left, Printable Case Report Card on Right (Reference Image Style) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left 7 Columns: Vertical Timeline */}
        <div className="lg:col-span-7 relative pl-6 sm:pl-8 space-y-6 before:absolute before:left-3 sm:before:left-4 before:top-4 before:bottom-4 before:w-0.5 before:bg-gradient-to-b before:from-blue-600 before:via-purple-300 before:to-slate-200">
          {filteredItems.map((event, idx) => (
            <div key={idx} className="relative group">
              
              {/* Timeline Bullet Node */}
              <div className="absolute -left-6 sm:-left-8 top-1.5 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white border-2 border-blue-600 flex items-center justify-center shadow-xs group-hover:scale-110 group-hover:bg-blue-50 transition-all z-10">
                {getCategoryIcon(event.category)}
              </div>

              {/* Timeline Content Card */}
              <div className="bg-white rounded-3xl border border-slate-200/90 p-5 shadow-xs hover:shadow-md transition-all group-hover:border-blue-200 space-y-2.5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded-md text-xs font-black bg-blue-50 text-blue-800 font-mono border border-blue-100">
                      {event.year}
                    </span>
                    <span className="text-xs font-bold text-slate-500 flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      {event.date}
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-700">
                      {event.category}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => setSelectedEventModal(event)}
                    className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>View Details</span>
                  </button>
                </div>

                <div>
                  <h3 className="text-sm font-bold text-slate-900 group-hover:text-blue-700 transition-colors">
                    {event.title}
                  </h3>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    {event.details}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Right 5 Columns: Patient Case History Report Card (Reference Image Style) */}
        <div className="lg:col-span-5 bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4">
          <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100">
            <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-xs">
              <HeartPulse className="w-4 h-4 stroke-[2.4]" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">Patient Case History Report</h3>
              <p className="text-[10px] text-slate-400">Civil Hospital • OPD Consultation</p>
            </div>
          </div>

          {/* Demographic Metadata Table from Screenshot */}
          <div className="bg-slate-50 rounded-2xl p-3.5 text-xs border border-slate-100 space-y-1.5 font-medium">
            <div className="grid grid-cols-2">
              <span className="text-slate-400">Patient Name:</span>
              <span className="text-slate-900 font-bold">{activePatient.name}</span>
            </div>
            <div className="grid grid-cols-2">
              <span className="text-slate-400">Patient ID:</span>
              <span className="font-mono text-blue-700 font-bold">{activePatient.id}</span>
            </div>
            <div className="grid grid-cols-2">
              <span className="text-slate-400">Age / Gender:</span>
              <span className="text-slate-800">{activePatient.age} / {activePatient.gender}</span>
            </div>
            <div className="grid grid-cols-2">
              <span className="text-slate-400">Visit Date:</span>
              <span className="text-slate-800">10 Aug 2025</span>
            </div>
          </div>

          {/* Summary Box */}
          <div className="space-y-1">
            <p className="text-xs font-bold text-slate-700">Summary</p>
            <p className="text-xs text-slate-600 leading-relaxed bg-blue-50/40 p-3 rounded-xl border border-blue-100/60">
              Patient presented with chief complaints and medical history recorded via MediKiosk digital intake. Vitals are stable and pre-consultation screening is complete. Prescribed symptomatic treatment and advised clinical follow-up.
            </p>
          </div>

          {/* Diagnosis Box */}
          <div className="space-y-1">
            <p className="text-xs font-bold text-slate-700">Diagnosis</p>
            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between text-xs">
              <span className="font-bold text-slate-800">{activePatient.chiefComplaint?.split(" ")[0] || "Viral"} Fever</span>
              <span className="text-[10px] bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full font-bold">Stable</span>
            </div>
          </div>

          {/* Doctor Signature Block from Screenshot */}
          <div className="pt-4 border-t border-slate-100 text-right">
            <p className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Doctor's Signature</p>
            <p className="font-signature text-2xl text-slate-800 italic pr-2 select-none">
              Dr. Mehta
            </p>
            <p className="text-[10px] text-slate-500">Consultant Physician (Civil Hospital)</p>
          </div>
        </div>

      </div>

      {filteredItems.length === 0 && (
        <div className="bg-white rounded-3xl border border-slate-200 p-8 text-center text-slate-500">
          <Clock className="w-8 h-8 text-slate-300 mx-auto mb-2" />
          <p className="text-sm font-bold text-slate-700">No records found for category "{selectedCategory}"</p>
          <p className="text-xs text-slate-400 mt-1">Switch to "All" to view the complete historical trajectory.</p>
        </div>
      )}

      {/* Event Details Modal */}
      {selectedEventModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in"
          role="dialog"
          aria-modal="true"
        >
          <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl border border-slate-200 p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center">
                  {getCategoryIcon(selectedEventModal.category)}
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    {selectedEventModal.category}
                  </span>
                  <h4 className="text-sm font-bold text-slate-900">{selectedEventModal.title}</h4>
                </div>
              </div>
              <button
                onClick={() => setSelectedEventModal(null)}
                className="text-slate-400 hover:text-slate-700 p-1.5 rounded-lg"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">Recorded Date:</span>
                <span className="font-bold text-slate-800">{selectedEventModal.date}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">Document Type:</span>
                <span className="font-bold text-teal-700">{selectedEventModal.category}</span>
              </div>
              <div className="py-1">
                <span className="text-slate-500 block mb-1">Clinical Observations & Findings:</span>
                <p className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-slate-700 leading-relaxed font-medium">
                  {selectedEventModal.details}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setSelectedEventModal(null)}
              className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs"
            >
              Close Record View
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
