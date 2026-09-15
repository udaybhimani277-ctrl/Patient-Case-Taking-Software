import React, { useState } from 'react';
import { useDemo } from '../context/DemoContext';
import { StatusBadge } from '../components/StatusBadge';
import { ProgressStepper } from '../components/ProgressStepper';
import {
  Users,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Search,
  X,
  Share2,
  FileText,
  Leaf,
  Check
} from 'lucide-react';

export const DoctorDashboard = () => {
  const {
    patients,
    activePatientId,
    switchPatient,
    setAbdmModalOpen,
    addToast
  } = useDemo();

  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState("All"); // 'All' | 'Priority' | 'Ready' | 'Completed'
  const [overviewPatient, setOverviewPatient] = useState(patients[0]);
  const [overviewOpen, setOverviewOpen] = useState(false);
  const [activeOverviewTab, setActiveOverviewTab] = useState("summary"); // 'summary' | 'timeline' | 'documents' | 'ayush'

  // Filter patients
  const filteredPatients = patients.filter(patient => {
    const matchesSearch =
      patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.chiefComplaint.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;

    if (filterCategory === "Priority") return patient.priority === "High";
    if (filterCategory === "Ready") return patient.status === "Ready";
    if (filterCategory === "Completed") return patient.status === "Completed";
    return true;
  });

  const handleOpenOverview = (patient) => {
    setOverviewPatient(patient);
    setOverviewOpen(true);
    switchPatient(patient.id);
  };

  const handleMarkConsulted = (patient) => {
    addToast({
      title: "Consultation Complete",
      message: `${patient.name} marked as Consulted. Prescription dispatched to Pharmacy.`,
      type: "success"
    });
    setOverviewOpen(false);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6 py-4">
      {/* 5-Step Stepper */}
      <ProgressStepper currentStepNumber={5} />

      {/* Hospital Header Banner (Reference Image Style) */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200">
                Dashboard Overview
              </span>
              <span className="text-xs text-slate-400 font-mono">Civil Hospital • OPD Room 04</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
              Welcome, Dr. Mehta
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Here's your patient overview for today.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={() => setAbdmModalOpen(true)}
              className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-2 shadow-xs shadow-blue-500/20 transition-colors"
            >
              <Share2 className="w-4 h-4" />
              <span>Sync ABDM Records</span>
            </button>
          </div>
        </div>

        {/* 4 OPD Metric Statistics (Matching Orange, Purple, Cyan, Rose icons in reference image) */}
        <div className="mt-6 grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-slate-50/70 border border-slate-200/80 rounded-2xl p-4.5 flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-500">Total Patients</p>
              <h3 className="text-2xl font-black text-slate-900 mt-1">12</h3>
            </div>
            <div className="w-11 h-11 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
          </div>

          <div className="bg-slate-50/70 border border-slate-200/80 rounded-2xl p-4.5 flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-500">New Patients</p>
              <h3 className="text-2xl font-black text-slate-900 mt-1">5</h3>
            </div>
            <div className="w-11 h-11 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5" />
            </div>
          </div>

          <div className="bg-slate-50/70 border border-slate-200/80 rounded-2xl p-4.5 flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-500">Follow Ups</p>
              <h3 className="text-2xl font-black text-slate-900 mt-1">3</h3>
            </div>
            <div className="w-11 h-11 rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center">
              <Clock className="w-5 h-5" />
            </div>
          </div>

          <div className="bg-slate-50/70 border border-slate-200/80 rounded-2xl p-4.5 flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-500">Pending Reports</p>
              <h3 className="text-2xl font-black text-slate-900 mt-1">2</h3>
            </div>
            <div className="w-11 h-11 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
              <AlertTriangle className="w-5 h-5" />
            </div>
          </div>
        </div>
      </div>

      {/* Patient Queue Management Card (Matching Reference Image Split Layout) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

        {/* Left 8 Columns: Recent Patients Queue */}
        <div className="lg:col-span-8 bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-7 shadow-xs space-y-5">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
            <div>
              <h2 className="text-lg font-bold text-slate-900">Recent Patients</h2>
              <p className="text-xs text-slate-500">Live intake queue awaiting physician evaluation</p>
            </div>

            {/* Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
              {["All", "Priority", "Ready", "Completed"].map((filter) => (
                <button
                  key={filter}
                  type="button"
                  onClick={() => setFilterCategory(filter)}
                  className={`px-3 py-1 rounded-xl text-xs font-bold transition-all shrink-0 ${filterCategory === filter
                      ? 'bg-blue-600 text-white shadow-2xs'
                      : 'bg-slate-50 text-slate-600 border border-slate-200 hover:bg-slate-100'
                    }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          {/* Search Box */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <Search className="w-4 h-4" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search patient by name, ID (PT-000123), or complaint..."
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 bg-slate-50/70 text-xs font-semibold focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-hidden transition-all"
            />
          </div>

          {/* Patient Table (Styled like Recent Patients in reference screenshot) */}
          <div className="overflow-x-auto rounded-2xl border border-slate-200">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-50/80 text-slate-500 font-bold border-b border-slate-200">
                  <th className="py-3 px-3.5">Name</th>
                  <th className="py-3 px-3.5">Age</th>
                  <th className="py-3 px-3.5">Gender</th>
                  <th className="py-3 px-3.5">Visit Date</th>
                  <th className="py-3 px-3.5">Priority</th>
                  <th className="py-3 px-3.5 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                {filteredPatients.map((patient) => {
                  const isSelected = patient.id === activePatientId;
                  const isHighPriority = patient.priority === "High";

                  return (
                    <tr
                      key={patient.id}
                      className={`hover:bg-slate-50 transition-colors cursor-pointer ${isSelected ? 'bg-blue-50/40' : ''
                        } ${isHighPriority ? 'bg-rose-50/20' : ''}`}
                      onClick={() => handleOpenOverview(patient)}
                    >
                      <td className="py-3.5 px-3.5">
                        <p className="font-bold text-slate-900">{patient.name}</p>
                        <p className="text-[10px] text-slate-400 font-mono">{patient.id}</p>
                      </td>
                      <td className="py-3.5 px-3.5 font-semibold text-slate-700">
                        {patient.age}
                      </td>
                      <td className="py-3.5 px-3.5 text-slate-600">
                        {patient.gender}
                      </td>
                      <td className="py-3.5 px-3.5 text-slate-500 font-medium">
                        {patient.visitDate || "10 Aug 2025"}
                      </td>
                      <td className="py-3.5 px-3.5">
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${patient.priority === "High" ? 'bg-rose-100 text-rose-800 animate-pulse' : 'bg-emerald-100 text-emerald-800'
                          }`}>
                          {patient.priority}
                        </span>
                      </td>
                      <td className="py-3.5 px-3.5 text-right">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleOpenOverview(patient);
                          }}
                          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold text-xs border border-blue-200/80 transition-colors"
                        >
                          <span>View</span>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {filteredPatients.length === 0 && (
            <div className="py-12 text-center text-slate-500">
              <Users className="w-8 h-8 mx-auto text-slate-300 mb-2" />
              <p className="text-sm font-bold text-slate-700">No matching patients in OPD queue</p>
              <p className="text-xs text-slate-400 mt-1">Try changing your search keywords or filter selection.</p>
            </div>
          )}
        </div>

        {/* Right 4 Columns: Upcoming Appointments (from Reference Image) */}
        <div className="lg:col-span-4 bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-7 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="text-base font-bold text-slate-900">Upcoming Appointments</h3>
            <span className="text-[10px] bg-blue-50 text-blue-700 font-bold px-2 py-0.5 rounded-full border border-blue-200">
              Today
            </span>
          </div>

          <div className="space-y-3">
            {[
              { name: "Sahil Desai", time: "10:30 AM", initials: "SD", bg: "bg-purple-100 text-purple-700" },
              { name: "Kavita Joshi", time: "11:15 AM", initials: "KJ", bg: "bg-rose-100 text-rose-700" },
              { name: "Arjun Mehta", time: "12:00 PM", initials: "AM", bg: "bg-orange-100 text-orange-700" },
              { name: "Priya Sharma", time: "01:30 PM", initials: "PS", bg: "bg-blue-100 text-blue-700" }
            ].map((apt, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 rounded-2xl bg-slate-50/70 border border-slate-100 hover:bg-slate-100/70 transition-colors">
                <div className="flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs ${apt.bg}`}>
                    {apt.initials}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">{apt.name}</h4>
                    <p className="text-[10px] text-slate-500">{apt.time}</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => addToast({ title: "Appointment Selected", message: `Opening profile for ${apt.name}.`, type: "info" })}
                  className="text-xs font-bold text-blue-600 hover:text-blue-800"
                >
                  Details
                </button>
              </div>
            ))}
          </div>

          <div className="pt-2 text-center border-t border-slate-100">
            <button
              type="button"
              onClick={() => addToast({ title: "Schedule View", message: "Showing full hospital OPD schedule.", type: "info" })}
              className="text-xs font-bold text-blue-600 hover:text-blue-800 transition-colors"
            >
              View All Appointments →
            </button>
          </div>
        </div>

      </div>

      {/* PATIENT CLINICAL OVERVIEW (SLIDEOVER / MODAL) */}
      {overviewOpen && overviewPatient && (
        <div
          className="fixed inset-0 z-[1100] flex items-center justify-end bg-slate-900/60 backdrop-blur-xs animate-in fade-in"
          role="dialog"
          aria-modal="true"
        >
          <div className="bg-white w-full max-w-3xl h-full shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-right duration-200">

            {/* Drawer Header */}
            <div className="p-5 bg-slate-900 text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-blue-500/20 text-blue-400 border border-blue-500/30 flex items-center justify-center font-bold">
                  {overviewPatient.name.split(" ").map(n => n[0]).join("")}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-bold text-white">{overviewPatient.name}</h3>
                    <span className="font-mono text-xs text-blue-400">({overviewPatient.id})</span>
                    <StatusBadge status={overviewPatient.priority} type="priority" />
                  </div>
                  <p className="text-xs text-slate-400">
                    {overviewPatient.age} yrs • {overviewPatient.gender} • Token: {overviewPatient.queueNumber} • ABHA: {overviewPatient.abhaId}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setOverviewOpen(false)}
                className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Overview Tabs */}
            <div className="bg-slate-50 px-6 pt-3 border-b border-slate-200 flex items-center gap-2">
              {[
                { id: "summary", label: "SOAP Summary", icon: FileText },
                { id: "timeline", label: "Timeline", icon: Clock },
                { id: "documents", label: "Documents", icon: Pill },
                { id: "ayush", label: "AYUSH Notes", icon: Leaf }
              ].map((tab) => {
                const Icon = tab.icon;
                const isCurrent = activeOverviewTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveOverviewTab(tab.id)}
                    className={`px-4 py-2.5 text-xs font-bold flex items-center gap-2 border-b-2 transition-all ${isCurrent
                        ? 'border-blue-600 text-blue-700 bg-white rounded-t-xl'
                        : 'border-transparent text-slate-500 hover:text-slate-800'
                      }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Drawer Body Content */}
            <div className="p-6 overflow-y-auto flex-1 space-y-5 text-xs">

              {/* TAB 1: SUMMARY */}
              {activeOverviewTab === "summary" && (
                <div className="space-y-4">

                  {/* Red Flag Warning */}
                  {overviewPatient.priority === "High" && (
                    <div className="p-3.5 bg-rose-50 border border-rose-200 rounded-2xl flex items-start gap-2.5 text-rose-900">
                      <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold">Urgent Clinical Alert:</span> Potential Acute Coronary Syndrome. Immediate 12-lead ECG, troponin, and physical exam required.
                      </div>
                    </div>
                  )}

                  {/* Vitals Bar */}
                  <div className="grid grid-cols-4 gap-2 bg-slate-50 p-3 rounded-2xl border border-slate-200 text-center">
                    <div>
                      <span className="text-[10px] text-slate-400 block">BP</span>
                      <span className="font-bold text-slate-800">{overviewPatient.vitals?.bloodPressure || "148/92"}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 block">PULSE</span>
                      <span className="font-bold text-slate-800">{overviewPatient.vitals?.heartRate || "98 bpm"}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 block">SpO2</span>
                      <span className="font-bold text-slate-800">{overviewPatient.vitals?.spO2 || "94%"}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 block">TEMP</span>
                      <span className="font-bold text-slate-800">{overviewPatient.vitals?.temperature || "98.6 °F"}</span>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-bold text-slate-900 uppercase text-[11px] mb-1">Chief Complaint:</h4>
                    <p className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-slate-700 leading-relaxed">
                      "{overviewPatient.chiefComplaint}"
                    </p>
                  </div>

                  <div>
                    <h4 className="font-bold text-slate-900 uppercase text-[11px] mb-1">History of Present Illness (HPI):</h4>
                    <p className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-slate-700 leading-relaxed">
                      {overviewPatient.history?.hpi}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                      <span className="font-bold text-slate-800 block mb-1">Current Medications</span>
                      <ul className="space-y-1 text-slate-600">
                        {(overviewPatient.history?.medications || []).map((m, i) => (
                          <li key={i}>• {m.name} {m.dose} ({m.frequency})</li>
                        ))}
                      </ul>
                    </div>
                    <div className="p-3 bg-rose-50/50 rounded-xl border border-rose-200">
                      <span className="font-bold text-rose-900 block mb-1">Known Allergies</span>
                      <ul className="space-y-1 text-rose-800">
                        {(overviewPatient.history?.allergies || []).map((a, i) => (
                          <li key={i}>• {a}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: TIMELINE */}
              {activeOverviewTab === "timeline" && (
                <div className="space-y-3">
                  <h4 className="font-bold text-slate-900 mb-2">Chronological Medical Milestones:</h4>
                  {(overviewPatient.timeline || []).map((ev, i) => (
                    <div key={i} className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-start gap-3">
                      <span className="px-2 py-0.5 rounded bg-slate-900 text-white font-mono font-bold text-[10px]">
                        {ev.year}
                      </span>
                      <div>
                        <p className="font-bold text-slate-800">{ev.title} <span className="text-[10px] text-slate-400 font-normal">({ev.date})</span></p>
                        <p className="text-slate-600 mt-0.5">{ev.details}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* TAB 3: DOCUMENTS */}
              {activeOverviewTab === "documents" && (
                <div className="space-y-3">
                  <h4 className="font-bold text-slate-900 mb-2">Digitized Physical Records:</h4>
                  {(overviewPatient.documents || []).map((doc) => (
                    <div key={doc.id} className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
                      <div>
                        <p className="font-bold text-slate-800">{doc.title}</p>
                        <p className="text-[10px] text-slate-500">{doc.type} • {doc.date} • OCR: {doc.confidence}</p>
                      </div>
                      <span className="px-2 py-0.5 rounded-full font-bold text-[10px] bg-emerald-50 text-emerald-800 border border-emerald-200">
                        {doc.status}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {/* TAB 4: AYUSH */}
              {activeOverviewTab === "ayush" && (
                <div className="space-y-3">
                  <h4 className="font-bold text-slate-900 mb-2">Ayurvedic Dashavidha Pariksha Summary:</h4>
                  {overviewPatient.ayush ? (
                    <div className="space-y-2">
                      <div className="p-3 bg-emerald-50/50 rounded-xl border border-emerald-200">
                        <span className="font-bold text-emerald-900">Prakriti & Vikriti:</span>
                        <p className="text-slate-700">{overviewPatient.ayush.prakriti} constitution with {overviewPatient.ayush.vikriti}</p>
                      </div>
                      <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                        <span className="font-bold text-slate-800">Ahara & Vihara Lifestyle:</span>
                        <p className="text-slate-600 mt-0.5">{overviewPatient.ayush.ahara}</p>
                        <p className="text-slate-600 mt-0.5">{overviewPatient.ayush.vihara}</p>
                      </div>
                    </div>
                  ) : (
                    <p className="text-slate-500 italic">No AYUSH profile recorded for this patient.</p>
                  )}
                </div>
              )}

            </div>

            {/* Drawer Footer Actions */}
            <div className="p-4 bg-slate-100 border-t border-slate-200 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => setOverviewOpen(false)}
                className="px-4 py-2.5 rounded-xl border border-slate-300 font-bold text-xs text-slate-700 hover:bg-slate-200 transition-colors"
              >
                Close Drawer
              </button>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setAbdmModalOpen(true)}
                  className="px-4 py-2.5 rounded-xl border border-teal-300 bg-teal-50 text-teal-800 font-bold text-xs hover:bg-teal-100 transition-colors flex items-center gap-1.5"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Sync ABHA</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleMarkConsulted(overviewPatient)}
                  className="px-5 py-2.5 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs flex items-center gap-1.5 transition-colors shadow-xs"
                >
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                  <span>Mark Consulted & Order Rx</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
