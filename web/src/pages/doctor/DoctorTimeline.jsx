import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Clock,
  Calendar,
  Filter,
  Search,
  Activity,
  Heart,
  Pill,
  FileText,
  AlertCircle,
  Stethoscope,
  ChevronRight,
  ExternalLink,
  ShieldCheck
} from 'lucide-react';
import { useDemo } from '../../context/DemoContext';

export const DoctorTimeline = () => {
  const { patientId } = useParams();
  const { patients, activePatient } = useDemo();

  const currentPatient = patients.find((p) => p.id === patientId) || activePatient;
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeEvent, setActiveEvent] = useState(null);

  const timelineEvents = [
    {
      id: 1,
      year: '2026 (Jan)',
      title: 'Exertional Chest Tightness & Dyspnea (Current Event)',
      category: 'Complaint',
      facility: 'Civil Hospital OPD (MediKiosk Kiosk 01)',
      details: 'Patient presented with 3-week history of retrosternal heaviness radiating to left shoulder on climbing stairs. BP 148/92, HR 84.',
      verified: true,
      tag: 'Current OPD'
    },
    {
      id: 2,
      year: '2026 (Jan)',
      title: 'Automated Metabolic & Lipid Panel',
      category: 'Lab',
      facility: 'Civil Hospital Central Laboratory',
      details: 'HbA1c: 7.6%, TC: 218 mg/dL, LDL: 138 mg/dL, Triglycerides: 194 mg/dL. Fasting Blood Glucose: 142 mg/dL.',
      verified: true,
      tag: 'Lab Report'
    },
    {
      id: 3,
      year: '2024 (Aug)',
      title: 'Hospitalization: Acute Gastroenteritis with Dehydration',
      category: 'Hospitalization',
      facility: 'Civil Hospital Ward 3B',
      details: 'Admitted for 48 hours with severe dehydration. Managed with IV fluids. Telmisartan temporarily held due to borderline BP 100/65.',
      verified: true,
      tag: 'Inpatient'
    },
    {
      id: 4,
      year: '2020 (Feb)',
      title: 'Diagnosis: Type 2 Diabetes Mellitus',
      category: 'Diagnosis',
      facility: 'Urban Community Health Center',
      details: 'Diagnosed with fasting glucose 168 mg/dL and HbA1c 8.2%. Initiated on Metformin 500mg BD with dietary lifestyle counseling.',
      verified: true,
      tag: 'Chronic Condition'
    },
    {
      id: 5,
      year: '2018 (Nov)',
      title: 'Diagnosis: Essential Hypertension',
      category: 'Diagnosis',
      facility: 'Dr. R. K. Mehta Clinic',
      details: 'Blood pressure consistently 154/96 mmHg over 3 readings. Started on Telmisartan 40mg once daily.',
      verified: true,
      tag: 'Chronic Condition'
    },
    {
      id: 6,
      year: '2016 (May)',
      title: 'Adverse Drug Reaction: Penicillin Urticaria',
      category: 'Allergy',
      facility: 'Dental Care Clinic',
      details: 'Developed acute generalized hives, lip swelling, and facial edema within 30 minutes of Amoxicillin dose. Emergency anti-histamine administered.',
      verified: true,
      tag: 'Critical Allergy'
    },
    {
      id: 7,
      year: '2012 (Sep)',
      title: 'Laparoscopic Appendectomy',
      category: 'Surgery',
      facility: 'Sardar Patel Municipal Hospital',
      details: 'Uncomplicated acute appendicitis. Laparoscopic excision with uneventful recovery. Histopathology confirmed acute suppurative appendicitis.',
      verified: true,
      tag: 'Surgical Record'
    }
  ];

  const filteredEvents = timelineEvents.filter((ev) => {
    const matchesCat = selectedCategory === 'All' ? true : ev.category === selectedCategory;
    const matchesSearch =
      ev.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ev.details.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ev.facility.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-slate-900">Longitudinal Medical Timeline</h1>
          <p className="text-xs text-slate-500 mt-1">
            Historical health progression (2012–2026) compiled from ABDM health records for <span className="font-bold text-slate-800">{currentPatient.name}</span>
          </p>
        </div>

        <div className="flex items-center gap-2">
          {['All', 'Diagnosis', 'Complaint', 'Hospitalization', 'Lab', 'Surgery', 'Allergy'].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                selectedCategory === cat
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-3">
        <Search className="w-4 h-4 text-slate-400" />
        <input
          type="text"
          placeholder="Filter timeline events by diagnosis, medication, clinic name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-transparent text-xs text-slate-800 focus:outline-none"
        />
      </div>

      {/* Vertical Timeline */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
        <div className="relative border-l-2 border-slate-200 ml-4 sm:ml-6 space-y-8">
          {filteredEvents.map((ev) => {
            const isAllergy = ev.category === 'Allergy';
            const isComplaint = ev.category === 'Complaint';

            return (
              <div
                key={ev.id}
                onClick={() => setActiveEvent(ev)}
                className="relative pl-6 sm:pl-8 group cursor-pointer"
              >
                {/* Timeline Dot */}
                <div
                  className={`absolute -left-[9px] top-1.5 w-4 h-4 rounded-full border-2 border-white shadow-sm transition-transform group-hover:scale-125 ${
                    isAllergy
                      ? 'bg-rose-600 ring-4 ring-rose-100'
                      : isComplaint
                      ? 'bg-amber-500 ring-4 ring-amber-100'
                      : 'bg-blue-600 ring-4 ring-blue-100'
                  }`}
                />

                {/* Timeline Card */}
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 hover:border-blue-300 hover:bg-blue-50/30 transition-all space-y-2">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-black px-2 py-0.5 rounded bg-slate-200 text-slate-800">
                        {ev.year}
                      </span>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          isAllergy
                            ? 'bg-rose-100 text-rose-800'
                            : isComplaint
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-blue-100 text-blue-800'
                        }`}
                      >
                        {ev.tag}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                      <span>{ev.facility}</span>
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" title="ABDM Verified Record" />
                    </div>
                  </div>

                  <h3 className="text-sm font-bold text-slate-900">{ev.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{ev.details}</p>

                  <div className="pt-2 flex items-center justify-between text-[11px] text-blue-600 font-semibold">
                    <span>Clinical Context & Lab Associations</span>
                    <span className="flex items-center gap-0.5">Inspect Details <ChevronRight className="w-3.5 h-3.5" /></span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Event Details Modal */}
      {activeEvent && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-lg w-full shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-blue-600" />
                <h3 className="font-bold text-base text-slate-900">{activeEvent.title}</h3>
              </div>
              <button
                onClick={() => setActiveEvent(null)}
                className="text-slate-400 hover:text-slate-600 font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 bg-slate-50 rounded-xl space-y-1">
                <span className="text-[10px] text-slate-400 block uppercase font-bold">Health Care Facility</span>
                <span className="font-bold text-slate-800">{activeEvent.facility}</span>
                <span className="text-slate-500 block font-mono text-[11px]">Period: {activeEvent.year}</span>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl space-y-1">
                <span className="text-[10px] text-slate-400 block uppercase font-bold">Clinical Notes</span>
                <p className="text-slate-700 leading-relaxed">{activeEvent.details}</p>
              </div>

              <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-emerald-900 space-y-1">
                <span className="font-bold flex items-center gap-1 text-emerald-800">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>ABDM Health Document Token Verified</span>
                </span>
                <p className="text-[11px] text-emerald-800">
                  Digital consent received from patient for longitudinal record access under Ayushman Bharat Digital Mission (ABDM).
                </p>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setActiveEvent(null)}
                className="px-4 py-2 rounded-xl bg-blue-600 text-white font-bold text-xs"
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
export default DoctorTimeline;
