import React from 'react';
import { useDemo } from '../context/DemoContext';
import { CheckCircle2, AlertTriangle, Info, AlertOctagon, X } from 'lucide-react';

export const ToastContainer = () => {
  const { toasts, removeToast } = useDemo();

  if (!toasts || toasts.length === 0) return null;

  const iconMap = {
    success: <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />,
    error: <AlertOctagon className="w-5 h-5 text-rose-600 shrink-0" />,
    warning: <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />,
    info: <Info className="w-5 h-5 text-teal-600 shrink-0" />
  };

  const borderMap = {
    success: "border-emerald-200 bg-white",
    error: "border-rose-200 bg-white",
    warning: "border-amber-200 bg-white",
    info: "border-teal-200 bg-white"
  };

  return (
    <div 
      className="fixed bottom-5 right-5 z-[1200] flex flex-col gap-2.5 max-w-sm w-full pointer-events-none"
      aria-live="polite"
    >
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`pointer-events-auto p-4 rounded-2xl border shadow-lg transition-all duration-200 flex items-start justify-between gap-3 ${
            borderMap[toast.type] || "border-slate-200 bg-white"
          }`}
        >
          <div className="flex items-start gap-3">
            {iconMap[toast.type] || iconMap.info}
            <div>
              <p className="text-xs font-bold text-slate-900">{toast.title}</p>
              {toast.message && (
                <p className="text-xs text-slate-600 mt-0.5 leading-snug">{toast.message}</p>
              )}
            </div>
          </div>
          <button
            onClick={() => removeToast(toast.id)}
            className="text-slate-400 hover:text-slate-600 p-1 -mr-1 -mt-1 rounded-lg"
            aria-label="Dismiss toast"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      ))}
    </div>
  );
};
