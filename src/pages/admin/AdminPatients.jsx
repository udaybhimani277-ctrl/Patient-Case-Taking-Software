import React, { useState } from 'react';
import {
  Users,
  Search,
  Filter,
  Download,
  Eye,
  ShieldCheck,
  AlertTriangle,
  User,
  Clock,
  Phone,
  ArrowRight,
  FileText,
  Building2,
  Calendar
} from 'lucide-react';
import { useDemo } from '../../context/DemoContext';

export const AdminPatients = () => {
  const { patients, departments, addToast } = useDemo();

  const [searchQuery, setSearchQuery] = useState('');
  const [deptFilter, setDeptFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedPatient, setSelectedPatient] = useState(null);

  const filteredPatients = patients.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.uhid.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.abhaAddress && p.abhaAddress.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (p.chiefComplaint && p.chiefComplaint.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesDept = deptFilter === 'All' ? true : (p.department || 'Cardiology') === deptFilter;
    const matchesStatus = statusFilter === 'All' ? true : p.status === statusFilter;

    return matchesSearch && matchesDept && matchesStatus;
  });

  const handleExportCSV = () => {
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      ['UHID,Name,Age,Gender,Token,Department,Status,Triage,Chief Complaint']
        .concat(
          filteredPatients.map(
            (p) =>
              `${p.uhid},"${p.name}",${p.age},${p.gender},${p.token || 'T01'},${p.department || 'Cardiology'},${p.status},${p.triageLevel},"${p.chiefComplaint}"`
          )
        )
        .join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `medikiosk_patients_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    addToast({
      title: 'Patient Directory Exported',
      message: 'CSV file generated for hospital records and audit.',
      type: 'success'
    });
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-slate-900">Hospital Patient Directory</h1>
          <p className="text-xs text-slate-500 mt-1">
            Master intake directory across all OPD stations and MediKiosk touchpoints
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleExportCSV}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold transition-colors shadow-2xs"
          >
            <Download className="w-4 h-4 text-indigo-600" />
            <span>Export CSV</span>
          </button>
          <span className="px-3 py-1.5 rounded-xl bg-indigo-50 text-indigo-800 text-xs font-bold border border-indigo-200">
            {filteredPatients.length} Active Records
          </span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by Patient Name, UHID, ABHA ID, or Complaint..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:bg-white focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <select
            value={deptFilter}
            onChange={(e) => setDeptFilter(e.target.value)}
            className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-700"
          >
            <option value="All">All Departments</option>
            {departments.map((d) => (
              <option key={d.id} value={d.name}>
                {d.name}
              </option>
            ))}
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-700"
          >
            <option value="All">All Statuses</option>
            <option value="Waiting">Waiting</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
      </div>

      {/* Patients Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 text-[11px] font-bold text-slate-500 uppercase tracking-wider border-b border-slate-200">
                <th className="py-3.5 px-4">Patient & UHID</th>
                <th className="py-3.5 px-4">ABDM / ABHA ID</th>
                <th className="py-3.5 px-4">Department & Room</th>
                <th className="py-3.5 px-4">Triage Priority</th>
                <th className="py-3.5 px-4">Intake Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredPatients.map((p) => {
                const isCritical = p.triageLevel?.includes('Level 1') || p.triageLevel?.includes('Red');

                return (
                  <tr key={p.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-700 font-bold flex items-center justify-center text-xs">
                          {p.name.charAt(0)}
                        </div>
                        <div>
                          <span className="font-bold text-slate-900 block">{p.name}</span>
                          <span className="text-[11px] text-slate-500 font-mono">
                            UHID: {p.uhid} • {p.age}y/{p.gender}
                          </span>
                        </div>
                      </div>
                    </td>

                    <td className="py-4 px-4 font-mono text-[11px] text-slate-700">
                      <span className="flex items-center gap-1">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                        <span>{p.abhaAddress || 'ramesh.patel@abdm'}</span>
                      </span>
                    </td>

                    <td className="py-4 px-4 text-slate-800 font-medium">
                      <span className="block font-semibold">{p.department || 'Cardiology OPD'}</span>
                      <span className="text-[10px] text-slate-400">Room 4 • Dr. Priya Sharma</span>
                    </td>

                    <td className="py-4 px-4">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold ${
                          isCritical
                            ? 'bg-rose-100 text-rose-800'
                            : p.triageLevel?.includes('Level 2')
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-emerald-100 text-emerald-800'
                        }`}
                      >
                        {isCritical && <AlertTriangle className="w-3 h-3" />}
                        <span>{p.triageLevel || 'Routine'}</span>
                      </span>
                    </td>

                    <td className="py-4 px-4">
                      <span
                        className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${
                          p.status === 'Waiting'
                            ? 'bg-amber-50 text-amber-700 border border-amber-200'
                            : p.status === 'In Progress'
                            ? 'bg-blue-50 text-blue-700 border border-blue-200'
                            : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        }`}
                      >
                        {p.status}
                      </span>
                    </td>

                    <td className="py-4 px-4 text-right">
                      <button
                        onClick={() => setSelectedPatient(p)}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors"
                      >
                        <Eye className="w-3.5 h-3.5 text-indigo-600" />
                        <span>Inspect Profile</span>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Patient Detail Drawer / Modal */}
      {selectedPatient && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-xl w-full shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-indigo-100 text-indigo-800 font-black text-lg flex items-center justify-center">
                  {selectedPatient.name.charAt(0)}
                </div>
                <div>
                  <h2 className="text-lg font-bold text-slate-900">{selectedPatient.name}</h2>
                  <span className="font-mono text-xs text-slate-500">UHID: {selectedPatient.uhid}</span>
                </div>
              </div>
              <button
                onClick={() => setSelectedPatient(null)}
                className="text-slate-400 hover:text-slate-600 font-bold"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-slate-50 rounded-xl">
                <span className="text-[10px] text-slate-400 uppercase font-bold block">Age / Gender</span>
                <span className="font-bold text-slate-800">{selectedPatient.age} Years • {selectedPatient.gender}</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl">
                <span className="text-[10px] text-slate-400 uppercase font-bold block">Phone Contact</span>
                <span className="font-mono font-bold text-slate-800">{selectedPatient.phone || '+91 98765 43210'}</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl">
                <span className="text-[10px] text-slate-400 uppercase font-bold block">ABHA Address</span>
                <span className="font-mono font-bold text-emerald-700">{selectedPatient.abhaAddress || 'ramesh@abdm'}</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl">
                <span className="text-[10px] text-slate-400 uppercase font-bold block">Kiosk Token</span>
                <span className="font-mono font-black text-indigo-600">{selectedPatient.token || 'T01'}</span>
              </div>
            </div>

            <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 text-xs space-y-1">
              <span className="font-bold text-slate-700 block">Chief Complaint</span>
              <p className="text-slate-900 font-medium">{selectedPatient.chiefComplaint}</p>
            </div>

            <div className="p-3.5 bg-emerald-50 rounded-2xl border border-emerald-200 text-xs space-y-1 text-emerald-900">
              <span className="font-bold flex items-center gap-1 text-emerald-800">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>ABDM Digital Health Record Linked</span>
              </span>
              <p className="text-[11px] text-emerald-800">
                Consent valid under DPDP Act 2023 for OPD consultation and automated EHR synchronization.
              </p>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setSelectedPatient(null)}
                className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs"
              >
                Close Profile
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default AdminPatients;
