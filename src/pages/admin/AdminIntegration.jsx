import React, { useState } from 'react';
import {
  Share2,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  Server,
  Database,
  Lock,
  ShieldCheck,
  Zap,
  Globe,
  Radio,
  ExternalLink,
  Layers
} from 'lucide-react';
import { useDemo } from '../../context/DemoContext';

export const AdminIntegration = () => {
  const { addToast } = useDemo();
  const [isTesting, setIsTesting] = useState(false);
  const [testResult, setTestResult] = useState(null);

  const gateways = [
    {
      name: 'ABDM Milestone 1 (M1)',
      desc: 'ABHA Creation, Aadhaar OTP Verification, and Profile Seeding',
      status: 'Connected',
      latency: '34 ms',
      uptime: '99.98%',
      protocol: 'REST / OAuth 2.0 (NDHM Gateway)'
    },
    {
      name: 'ABDM Milestone 2 (M2)',
      desc: 'HIP / Health Document Discovery, Linking & Encryption',
      status: 'Connected',
      latency: '22 ms',
      uptime: '99.95%',
      protocol: 'FHIR R4 / Diffie-Hellman Key Exchange'
    },
    {
      name: 'ABDM Milestone 3 (M3)',
      desc: 'HIU / Health Information Exchange & Granular Consent Manager',
      status: 'Connected',
      latency: '28 ms',
      uptime: '99.92%',
      protocol: 'DPDP Digital Consent Artefacts'
    },
    {
      name: 'Civil Hospital HIS EMR Engine',
      desc: 'On-premise Hospital Information System database bridge',
      status: 'Connected',
      latency: '12 ms',
      uptime: '100%',
      protocol: 'HL7 v2.5 / PostgreSQL Sync'
    },
    {
      name: 'NIC e-Hospital Connector',
      desc: 'National Informatics Centre OPD token & billing gateway',
      status: 'Connected',
      latency: '48 ms',
      uptime: '99.85%',
      protocol: 'SOAP / XML API'
    }
  ];

  const handleTestPing = () => {
    setIsTesting(true);
    setTestResult(null);

    setTimeout(() => {
      setIsTesting(false);
      setTestResult({
        timestamp: new Date().toLocaleTimeString(),
        status: 'ALL GATEWAYS HEALTHY',
        abdmPayload: 'HTTP 200 OK | Session Token: eyJhbGciOiJIUzI1NiIsInR5c... (Valid)',
        fhirStatus: 'FHIR Bundle Parser: 14 resource profiles verified',
        hisSync: 'Civil Hospital EMR Node: Sync lag 0.04s'
      });
      addToast({
        title: 'Integration Test Successful',
        message: 'All 5 ABDM, FHIR, and HIS endpoints returned 200 OK.',
        type: 'success'
      });
    }, 1200);
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-slate-900">ABDM & HIS/EMR Interoperability</h1>
          <p className="text-xs text-slate-500 mt-1">
            Ayushman Bharat Digital Mission (M1, M2, M3), FHIR R4 Bundle Server, and local EMR gateway status
          </p>
        </div>

        <button
          onClick={handleTestPing}
          disabled={isTesting}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md shadow-indigo-600/20 transition-all"
        >
          <RefreshCw className={`w-4 h-4 ${isTesting ? 'animate-spin' : ''}`} />
          <span>{isTesting ? 'Pinging Gateways...' : 'Test ABDM Gateway Ping'}</span>
        </button>
      </div>

      {/* Integration Architecture Diagram */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-6 sm:p-8 text-white border border-slate-800 shadow-xl space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Share2 className="w-5 h-5 text-indigo-400" />
            <h2 className="font-bold text-base text-white">Healthcare Interoperability Data Flow</h2>
          </div>
          <span className="text-[11px] font-mono font-bold text-emerald-400 flex items-center gap-1">
            <Radio className="w-3.5 h-3.5 animate-pulse" /> Live ABDM Sandbox
          </span>
        </div>

        {/* Visual Architecture Boxes */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
          <div className="p-4 bg-white/10 rounded-2xl border border-white/15 backdrop-blur-md space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-300">1. Intake Edge</span>
            <p className="font-bold text-sm">MediKiosk Hardware</p>
            <p className="text-[11px] text-slate-300">Touch, Voice, OCR Scanner</p>
          </div>

          <div className="p-4 bg-white/10 rounded-2xl border border-white/15 backdrop-blur-md space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-purple-300">2. Processing Core</span>
            <p className="font-bold text-sm">MediKiosk AI Engine</p>
            <p className="text-[11px] text-slate-300">SOCRATES, SOAP, Triage</p>
          </div>

          <div className="p-4 bg-white/10 rounded-2xl border border-white/15 backdrop-blur-md space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-300">3. National Gateway</span>
            <p className="font-bold text-sm">ABDM M1 / M2 / M3</p>
            <p className="text-[11px] text-slate-300">ABHA, FHIR R4, DPDP</p>
          </div>

          <div className="p-4 bg-white/10 rounded-2xl border border-white/15 backdrop-blur-md space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-300">4. Hospital EMR</span>
            <p className="font-bold text-sm">Civil Hospital HIS</p>
            <p className="text-[11px] text-slate-300">Doctor EHR & Pharmacy</p>
          </div>
        </div>
      </div>

      {/* Gateway Status Cards */}
      <div className="space-y-3">
        <h2 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Gateway Connectivity Matrix</h2>
        {gateways.map((gw, idx) => (
          <div
            key={idx}
            className="p-5 rounded-3xl bg-white border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4"
          >
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-sm text-slate-900">{gw.name}</h3>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-mono text-[10px] font-bold">
                    {gw.status}
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">{gw.desc}</p>
              </div>
            </div>

            <div className="flex items-center gap-6 text-xs text-right shrink-0">
              <div>
                <span className="text-slate-400 block text-[10px]">Latency</span>
                <span className="font-mono font-bold text-slate-800">{gw.latency}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">Uptime</span>
                <span className="font-mono font-bold text-emerald-600">{gw.uptime}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">Protocol</span>
                <span className="font-mono font-bold text-slate-700">{gw.protocol}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Test Results Output */}
      {testResult && (
        <div className="p-5 rounded-3xl bg-slate-900 text-white font-mono text-xs space-y-2 shadow-xl border border-slate-800">
          <div className="flex items-center justify-between text-emerald-400 font-bold border-b border-slate-800 pb-2">
            <span>[DIAGNOSTIC TEST REPORT] - {testResult.timestamp}</span>
            <span>STATUS: 200 OK</span>
          </div>
          <p className="text-slate-300">❯ {testResult.abdmPayload}</p>
          <p className="text-slate-300">❯ {testResult.fhirStatus}</p>
          <p className="text-slate-300">❯ {testResult.hisSync}</p>
        </div>
      )}
    </div>
  );
};
export default AdminIntegration;
