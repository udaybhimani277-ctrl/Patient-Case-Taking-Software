import React, { useState } from 'react';
import {
  ScrollText,
  Search,
  Filter,
  Download,
  ShieldCheck,
  Clock,
  User,
  CheckCircle2,
  AlertTriangle,
  Lock,
  FileText
} from 'lucide-react';
import { useDemo } from '../../context/DemoContext';

export const AdminAuditLogs = () => {
  const { auditLogs, addToast } = useDemo();

  const [searchQuery, setSearchQuery] = useState('');
  const [userTypeFilter, setUserTypeFilter] = useState('All');

  const filteredLogs = auditLogs.filter((log) => {
    const matchesSearch =
      log.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.resource.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesUser =
      userTypeFilter === 'All' ? true : log.userType?.toLowerCase() === userTypeFilter.toLowerCase();

    return matchesSearch && matchesUser;
  });

  const handleExportLogs = () => {
    const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(
      JSON.stringify(filteredLogs, null, 2)
    )}`;
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', jsonString);
    downloadAnchor.setAttribute('download', `medikiosk_audit_trail_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();

    addToast({
      title: 'Audit Trail Exported',
      message: 'DPDP and NABH compliance JSON artifact generated.',
      type: 'success'
    });
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-slate-900">DPDP & NABH Audit Trail</h1>
          <p className="text-xs text-slate-500 mt-1">
            Immutable regulatory audit log of all clinical data accesses, consent grants, and physician verifications
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleExportLogs}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold transition-colors shadow-2xs"
          >
            <Download className="w-4 h-4 text-purple-600" />
            <span>Export Audit JSON</span>
          </button>
          <span className="px-3 py-1.5 rounded-xl bg-purple-50 text-purple-800 text-xs font-bold border border-purple-200">
            {filteredLogs.length} Events Logged
          </span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search audit logs by actor, action description, or resource ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:bg-white focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <div className="flex items-center gap-1 bg-slate-50 p-1 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600">
          <span className="px-2 text-slate-400">Actor:</span>
          {['All', 'Patient', 'Doctor', 'Admin', 'System'].map((type) => (
            <button
              key={type}
              onClick={() => setUserTypeFilter(type)}
              className={`px-2.5 py-1 rounded-lg transition-all ${
                userTypeFilter === type
                  ? 'bg-white text-purple-700 shadow-2xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Audit Log Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 text-[11px] font-bold text-slate-500 uppercase tracking-wider border-b border-slate-200">
                <th className="py-3 px-4">Timestamp</th>
                <th className="py-3 px-4">Actor / Role</th>
                <th className="py-3 px-4">Action Performed</th>
                <th className="py-3 px-4">Target Resource</th>
                <th className="py-3 px-4">IP / Terminal</th>
                <th className="py-3 px-4 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-mono text-[11px]">
              {filteredLogs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-50">
                  <td className="py-3.5 px-4 text-slate-600">
                    {log.timestamp}
                  </td>

                  <td className="py-3.5 px-4 font-sans font-bold text-slate-900">
                    <span className="block">{log.user}</span>
                    <span className="text-[10px] font-mono font-normal text-slate-400">{log.userType || 'User'}</span>
                  </td>

                  <td className="py-3.5 px-4 font-sans font-medium text-slate-800">
                    {log.action}
                  </td>

                  <td className="py-3.5 px-4 text-indigo-700 font-bold">
                    {log.resource}
                  </td>

                  <td className="py-3.5 px-4 text-slate-500 text-[10px]">
                    {log.ip || '192.168.1.104'}
                  </td>

                  <td className="py-3.5 px-4 text-right">
                    <span className="inline-flex items-center gap-1 text-emerald-700 font-bold text-[10px] bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 font-sans">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>Success</span>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
export default AdminAuditLogs;
