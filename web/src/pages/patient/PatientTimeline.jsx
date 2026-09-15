import React, { useState } from 'react';
import {
  Clock,
  Calendar,
  FileText,
  Pill,
  Activity,
  Hospital,
  ChevronRight,
  Filter,
  CheckCircle2,
  X,
  ExternalLink,
  Search
} from 'lucide-react';
import { useDemo } from '../../context/DemoContext';

export const PatientTimeline = () => {
  const { timelineEvents } = useDemo();
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEvent, setSelectedEvent] = useState(null);

  const categories = ['All', 'Hospital Visit', 'Prescription', 'Lab Report', 'Investigation', 'Current Prescription'];

  const filteredEvents = timelineEvents.filter(ev => {
    const matchesCat = selectedFilter === 'All' || ev.category === selectedFilter;
    const matchesSearch = ev.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ev.details?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ev.medicine?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="space-y-6 sm:space-y-8 max-w-4xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-cyan-50 text-cyan-700 border border-cyan-200">
              Longitudinal Health Trajectory
            </span>
            <span className="text-xs text-slate-500">2008 – 2026 Care History</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
            Chronological Medical Timeline
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Aggregates past paper records, hospital admissions, and recent lab investigations into a continuous timeline.
          </p>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search past events, medicines, labs..."
            className="w-full text-xs pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 bg-white focus:outline-hidden focus:border-cyan-500"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
          {categories.map(cat => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedFilter(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                selectedFilter === cat
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Vertical Timeline List */}
      <div className="relative border-l-2 border-blue-200 ml-4 sm:ml-6 pl-6 sm:pl-8 space-y-6">
        {filteredEvents.map((ev, index) => (
          <div
            key={ev.id || index}
            className="relative group cursor-pointer"
            onClick={() => setSelectedEvent(ev)}
          >
            {/* Timeline Year Node Dot */}
            <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-6 h-6 rounded-full bg-white border-4 border-blue-600 group-hover:scale-125 transition-transform flex items-center justify-center shadow-xs">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
            </div>

            {/* Event Card */}
            <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-2xs group-hover:shadow-md group-hover:border-blue-300 transition-all space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <div className="flex items-center gap-2">
                  <span className="font-mono font-black text-sm text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-lg border border-blue-100">
                    {ev.year}
                  </span>
                  <span className="text-xs text-slate-500 font-semibold">{ev.date}</span>
                </div>
                <span className="inline-block text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 w-fit">
                  {ev.category}
                </span>
              </div>

              <div>
                <h4 className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                  {ev.title}
                </h4>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">{ev.details}</p>
              </div>

              {/* Badges for document, medicine, investigation */}
              <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-100 text-xs">
                {ev.medicine && ev.medicine !== "N/A" && (
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-lg bg-teal-50 text-teal-800 border border-teal-200">
                    <Pill className="w-3.5 h-3.5 text-teal-600" />
                    <span>{ev.medicine}</span>
                  </span>
                )}
                {ev.investigation && (
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-lg bg-purple-50 text-purple-800 border border-purple-200">
                    <Activity className="w-3.5 h-3.5 text-purple-600" />
                    <span>{ev.investigation}</span>
                  </span>
                )}
                {ev.document && (
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700">
                    <FileText className="w-3.5 h-3.5 text-slate-500" />
                    <span>{ev.document}</span>
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Detail Modal on Click */}
      {selectedEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-3xl p-6 max-w-lg w-full shadow-2xl border border-slate-200 space-y-4 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
                  {selectedEvent.year} • {selectedEvent.category}
                </span>
                <h3 className="text-base font-bold text-slate-900 mt-1">{selectedEvent.title}</h3>
              </div>
              <button
                onClick={() => setSelectedEvent(null)}
                className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <p className="text-[10px] font-bold uppercase text-slate-400">Clinical Narrative</p>
                <p className="text-slate-800 leading-relaxed mt-0.5">{selectedEvent.details}</p>
              </div>

              <div className="grid grid-cols-2 gap-2 bg-slate-50 p-3 rounded-2xl border border-slate-200">
                <div>
                  <p className="text-[10px] font-bold uppercase text-slate-400">Facility</p>
                  <p className="font-bold text-slate-800">{selectedEvent.facility || "Civil Hospital OPD"}</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase text-slate-400">Department</p>
                  <p className="font-bold text-slate-800">{selectedEvent.department || "Cardiology"}</p>
                </div>
              </div>

              {selectedEvent.medicine && (
                <div className="bg-teal-50/70 p-3 rounded-2xl border border-teal-200">
                  <p className="text-[10px] font-bold uppercase text-teal-800">Prescription / Medication Impact</p>
                  <p className="font-bold text-teal-900 mt-0.5">{selectedEvent.medicine}</p>
                </div>
              )}

              {selectedEvent.investigation && (
                <div className="bg-purple-50/70 p-3 rounded-2xl border border-purple-200">
                  <p className="text-[10px] font-bold uppercase text-purple-800">Diagnostic Investigations</p>
                  <p className="font-bold text-purple-900 mt-0.5">{selectedEvent.investigation}</p>
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={() => setSelectedEvent(null)}
              className="w-full py-2.5 rounded-xl bg-slate-900 text-white font-bold text-xs hover:bg-slate-800 transition-colors"
            >
              Close Details
            </button>
          </div>
        </div>
      )}

    </div>
  );
};

export default PatientTimeline;
