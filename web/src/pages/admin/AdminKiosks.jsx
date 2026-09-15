import React, { useState } from 'react';
import {
  Tv,
  RefreshCw,
  Power,
  Wrench,
  CheckCircle2,
  AlertTriangle,
  Camera,
  Printer,
  Mic,
  Monitor,
  Wifi,
  Sparkles,
  Plus
} from 'lucide-react';
import { useDemo } from '../../context/DemoContext';

export const AdminKiosks = () => {
  const { kiosks, updateKioskStatus, addToast } = useDemo();

  const [rebootingId, setRebootingId] = useState(null);
  const [testingId, setTestingId] = useState(null);

  const handleReboot = (kioskId) => {
    setRebootingId(kioskId);
    addToast({
      title: 'Remote Reboot Signal Sent',
      message: `Rebooting ${kioskId}...`,
      type: 'info'
    });

    setTimeout(() => {
      setRebootingId(null);
      updateKioskStatus(kioskId, 'Online');
      addToast({
        title: 'Kiosk Online',
        message: `${kioskId} successfully rebooted and reconnected to MediKiosk Cloud.`,
        type: 'success'
      });
    }, 2000);
  };

  const handleSelfTest = (kioskId) => {
    setTestingId(kioskId);
    setTimeout(() => {
      setTestingId(null);
      addToast({
        title: 'Hardware Diagnostics Passed',
        message: `${kioskId}: Camera (1080p OK), OCR Scanner OK, Thermal Printer (92% paper), Mic Array OK.`,
        type: 'success'
      });
    }, 1500);
  };

  const toggleMaintenance = (kiosk) => {
    const nextStatus = kiosk.status === 'Maintenance' ? 'Online' : 'Maintenance';
    updateKioskStatus(kiosk.id, nextStatus);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-slate-900">MediKiosk Hardware Fleet</h1>
          <p className="text-xs text-slate-500 mt-1">
            Real-time IoT device monitoring, peripheral diagnostics, and remote kiosk administration
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200">
            {kiosks.filter((k) => k.status === 'Online').length} / {kiosks.length} Online
          </span>
        </div>
      </div>

      {/* Fleet Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {kiosks.map((k) => {
          const isOnline = k.status === 'Online';
          const isRebooting = rebootingId === k.id;
          const isTesting = testingId === k.id;

          return (
            <div
              key={k.id}
              className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4 hover:shadow-md transition-shadow"
            >
              {/* Card Header */}
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-sm shadow-sm ${
                      isOnline
                        ? 'bg-indigo-50 text-indigo-700'
                        : 'bg-amber-50 text-amber-700'
                    }`}
                  >
                    <Tv className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-slate-900">{k.name}</h2>
                    <span className="text-[11px] text-slate-500 font-mono">{k.id}</span>
                  </div>
                </div>

                <span
                  className={`px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold ${
                    isRebooting
                      ? 'bg-blue-100 text-blue-800'
                      : isOnline
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-amber-100 text-amber-800'
                  }`}
                >
                  {isRebooting ? 'Rebooting...' : k.status}
                </span>
              </div>

              {/* Location & Network */}
              <div className="p-3.5 bg-slate-50 rounded-2xl space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-400 font-semibold">Location:</span>
                  <span className="font-bold text-slate-800">{k.location}</span>
                </div>
                <div className="flex justify-between font-mono text-[11px]">
                  <span className="text-slate-400 font-sans">IP Address:</span>
                  <span className="text-slate-700">{k.ipAddress || '192.168.1.104'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400 font-semibold">Today's Intakes:</span>
                  <span className="font-bold text-indigo-600">{k.dailyIntakes} patients</span>
                </div>
              </div>

              {/* Peripheral Health Indicators */}
              <div className="space-y-1.5 pt-1">
                <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
                  Peripheral Status
                </span>
                <div className="grid grid-cols-4 gap-2 text-center text-[10px] font-bold">
                  <div className="p-2 bg-slate-50 rounded-xl border border-slate-100">
                    <Monitor className="w-4 h-4 mx-auto text-emerald-600 mb-0.5" />
                    <span className="text-slate-700">Touch</span>
                  </div>
                  <div className="p-2 bg-slate-50 rounded-xl border border-slate-100">
                    <Camera className="w-4 h-4 mx-auto text-emerald-600 mb-0.5" />
                    <span className="text-slate-700">Scan</span>
                  </div>
                  <div className="p-2 bg-slate-50 rounded-xl border border-slate-100">
                    <Mic className="w-4 h-4 mx-auto text-emerald-600 mb-0.5" />
                    <span className="text-slate-700">Audio</span>
                  </div>
                  <div className="p-2 bg-slate-50 rounded-xl border border-slate-100">
                    <Printer className="w-4 h-4 mx-auto text-emerald-600 mb-0.5" />
                    <span className="text-slate-700">Print</span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
                <button
                  onClick={() => handleSelfTest(k.id)}
                  disabled={isTesting}
                  className="flex-1 py-2 px-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors flex items-center justify-center gap-1"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isTesting ? 'animate-spin text-indigo-600' : ''}`} />
                  <span>{isTesting ? 'Testing...' : 'Self-Test'}</span>
                </button>

                <button
                  onClick={() => handleReboot(k.id)}
                  disabled={isRebooting}
                  className="flex-1 py-2 px-2.5 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-800 text-xs font-bold transition-colors flex items-center justify-center gap-1 border border-indigo-200"
                >
                  <Power className="w-3.5 h-3.5" />
                  <span>Reboot</span>
                </button>

                <button
                  onClick={() => toggleMaintenance(k)}
                  className={`p-2 rounded-xl transition-colors ${
                    k.status === 'Maintenance'
                      ? 'bg-amber-100 text-amber-800'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
                  }`}
                  title="Toggle Maintenance Mode"
                >
                  <Wrench className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default AdminKiosks;
