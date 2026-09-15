import React from 'react';

export const StatCard = ({ title, value, subtitle, icon: Icon, trend, color = "cyan" }) => {
  const colorStyles = {
    cyan: {
      iconBg: "bg-cyan-50 text-cyan-700 border-cyan-100",
      valueColor: "text-slate-900"
    },
    teal: {
      iconBg: "bg-teal-50 text-teal-700 border-teal-100",
      valueColor: "text-slate-900"
    },
    amber: {
      iconBg: "bg-amber-50 text-amber-700 border-amber-100",
      valueColor: "text-slate-900"
    },
    rose: {
      iconBg: "bg-rose-50 text-rose-700 border-rose-100",
      valueColor: "text-rose-700"
    },
    emerald: {
      iconBg: "bg-emerald-50 text-emerald-700 border-emerald-100",
      valueColor: "text-slate-900"
    }
  };

  const currentStyle = colorStyles[color] || colorStyles.cyan;

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs hover:shadow-md transition-all duration-200 group">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">{title}</p>
          <h3 className={`text-2xl lg:text-3xl font-bold tracking-tight ${currentStyle.valueColor}`}>
            {value}
          </h3>
        </div>
        {Icon && (
          <div className={`p-3 rounded-xl border ${currentStyle.iconBg} transition-transform group-hover:scale-105`}>
            <Icon className="w-5 h-5" />
          </div>
        )}
      </div>

      {(subtitle || trend) && (
        <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <span>{subtitle}</span>
          {trend && (
            <span className="inline-flex items-center font-semibold text-emerald-700">
              {trend}
            </span>
          )}
        </div>
      )}
    </div>
  );
};
