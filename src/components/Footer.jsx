import React from 'react';
import { Link } from 'react-router-dom';
import { HeartPulse, Shield, Lock, Award, HeartHandshake } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-400 text-xs border-t border-slate-800 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">

          {/* Brand & Mission */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2 text-white">
              <div className="w-8 h-8 rounded-xl bg-teal-600 flex items-center justify-center text-white">
                <HeartPulse className="w-5 h-5" />
              </div>
              <span className="text-lg font-black tracking-tight">
                Medi<span className="text-teal-400">Kiosk</span>
              </span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed max-w-md">
              "AI-Powered Clinical History. Faster Consultations. Better Patient Records."
            </p>
            <p className="text-slate-500 text-[11px] leading-relaxed">
              MediKiosk is an interactive digital intake kiosk prototype created for academic demonstration and healthcare hackathons. It bridges high patient volumes and physician time constraints through structured conversational pre-consultation.
            </p>
            <div className="flex flex-wrap gap-2 pt-1">
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-slate-800 text-teal-400 text-[10px] font-bold border border-slate-700">
                <Shield className="w-3 h-3" /> DPDP-Ready Principles
              </span>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-slate-800 text-teal-400 text-[10px] font-bold border border-slate-700">
                <Award className="w-3 h-3" /> ABDM / FHIR Interoperability
              </span>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-slate-800 text-teal-400 text-[10px] font-bold border border-slate-700">
                <HeartHandshake className="w-3 h-3" /> AYUSH Supported
              </span>
            </div>
          </div>

          {/* Patient Journey Links */}
          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-3">
              Patient Journey
            </h4>
            <ul className="space-y-2">
              <li><Link to="/patient-intake" className="hover:text-white transition-colors">01. Patient Registration</Link></li>
              <li><Link to="/ai-history" className="hover:text-white transition-colors">02. AI Clinical History</Link></li>
              <li><Link to="/documents" className="hover:text-white transition-colors">03. Document Digitization</Link></li>
              <li><Link to="/timeline" className="hover:text-white transition-colors">Patient Medical Timeline</Link></li>
              <li><Link to="/ayush" className="hover:text-white transition-colors">AYUSH Dashavidha Pariksha</Link></li>
              <li><Link to="/clinical-summary" className="hover:text-white transition-colors">04. Clinical Summary</Link></li>
              <li><Link to="/doctor-dashboard" className="hover:text-white transition-colors">05. Doctor Dashboard</Link></li>
            </ul>
          </div>

          {/* Security & Project */}
          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-3">
              Governance & Info
            </h4>
            <ul className="space-y-2">
              <li><Link to="/consent" className="hover:text-white transition-colors">Privacy & Consent Framework</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors">Why MediKiosk is Different</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors">Problem & Solution Concept</Link></li>
              <li><a href="#disclaimer" className="hover:text-white transition-colors">Clinical Disclaimer</a></li>
            </ul>
            <div className="mt-4 p-3 bg-slate-800/80 rounded-xl border border-slate-700/80 text-[11px] text-slate-400">
              <span className="block font-bold text-slate-300">Prototype Mode</span>
              No real patient health information (PHI) is processed or transmitted.
            </div>
          </div>
        </div>

        {/* Prototype Safety Notice */}
        <div id="disclaimer" className="pt-6 border-t border-slate-800 text-center space-y-2">
          <p className="text-[11px] text-slate-500 max-w-3xl mx-auto leading-relaxed">
            <strong className="text-slate-400">Mandatory Prototype Disclaimer:</strong> MediKiosk is a conceptual student/hackathon research prototype. All clinical summaries, red flag indicators, OCR extractions, and AYUSH classifications are demonstrations for physician assistance only. MediKiosk does NOT provide automated medical diagnosis, clinical treatment plans, or emergency dispatch services. Qualified healthcare physicians maintain ultimate clinical authority.
          </p>
          <p className="text-[10px] text-slate-600">
            © 2026 MediKiosk Platform • Designed with privacy and consent principles in mind.
          </p>
        </div>
      </div>
    </footer>
  );
};
