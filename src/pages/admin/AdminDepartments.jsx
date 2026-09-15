import React, { useState } from 'react';
import {
  Building2,
  Plus,
  Users,
  Clock,
  ArrowRight,
  Sparkles,
  Search,
  CheckCircle2,
  ShieldCheck,
  Stethoscope
} from 'lucide-react';
import { useDemo } from '../../context/DemoContext';

export const AdminDepartments = () => {
  const { departments, addDepartment, addToast } = useDemo();

  const [showAddModal, setShowAddModal] = useState(false);
  const [newDept, setNewDept] = useState({
    name: '',
    code: '',
    headDoctor: '',
    floor: '1',
    consultants: 3
  });

  const handleAddDept = (e) => {
    e.preventDefault();
    if (!newDept.name || !newDept.headDoctor) return;

    addDepartment({
      ...newDept,
      consultants: Number(newDept.consultants) || 2
    });

    setShowAddModal(false);
    setNewDept({ name: '', code: '', headDoctor: '', floor: '1', consultants: 3 });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-slate-900">Hospital Clinical Departments</h1>
          <p className="text-xs text-slate-500 mt-1">
            Departmental OPD capacity, consultation rooms, waiting queues, and clinical leads
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-md shadow-indigo-600/20 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Add Department</span>
        </button>
      </div>

      {/* Department Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {departments.map((dept) => (
          <div
            key={dept.id}
            className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-700 flex items-center justify-center font-black text-sm">
                  {dept.code || dept.name.slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <h2 className="text-base font-bold text-slate-900">{dept.name}</h2>
                  <span className="text-[11px] text-slate-500">Floor {dept.floor} • Wing B</span>
                </div>
              </div>

              <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                {dept.consultants} Doctors
              </span>
            </div>

            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 space-y-1 text-xs">
              <span className="text-[10px] text-slate-400 uppercase font-bold block">Department Head</span>
              <span className="font-bold text-slate-800">{dept.headDoctor}</span>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-1 text-xs">
              <div className="p-3 bg-blue-50/60 rounded-xl border border-blue-100">
                <span className="text-[10px] text-blue-700 block font-bold uppercase">Current Waiting</span>
                <span className="font-mono font-black text-lg text-blue-950 mt-0.5 block">
                  {dept.currentQueue} Patients
                </span>
              </div>

              <div className="p-3 bg-purple-50/60 rounded-xl border border-purple-100">
                <span className="text-[10px] text-purple-700 block font-bold uppercase">Avg Wait Time</span>
                <span className="font-mono font-black text-lg text-purple-950 mt-0.5 block">
                  ~{dept.avgWaitMin} min
                </span>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between text-xs text-slate-500 border-t border-slate-100">
              <span className="flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Kiosks Linked: 2</span>
              </span>
              <span className="font-bold text-indigo-600 hover:text-indigo-700 cursor-pointer">
                View Queue →
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Add Department Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-4">
            <h3 className="font-bold text-lg text-slate-900">Add Hospital Department</h3>

            <form onSubmit={handleAddDept} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Department Name</label>
                <input
                  type="text"
                  placeholder="e.g. Neurology OPD"
                  value={newDept.name}
                  onChange={(e) => setNewDept({ ...newDept, name: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 font-medium"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Code</label>
                  <input
                    type="text"
                    placeholder="NEURO"
                    value={newDept.code}
                    onChange={(e) => setNewDept({ ...newDept, code: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 font-mono font-bold"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Floor</label>
                  <input
                    type="text"
                    placeholder="2"
                    value={newDept.floor}
                    onChange={(e) => setNewDept({ ...newDept, floor: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Head Doctor</label>
                <input
                  type="text"
                  placeholder="e.g. Dr. K. N. Joshi"
                  value={newDept.headDoctor}
                  onChange={(e) => setNewDept({ ...newDept, headDoctor: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 font-medium"
                  required
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Active Consultants</label>
                <input
                  type="number"
                  placeholder="3"
                  value={newDept.consultants}
                  onChange={(e) => setNewDept({ ...newDept, consultants: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold shadow-md shadow-indigo-600/20"
                >
                  Create Department
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
export default AdminDepartments;
