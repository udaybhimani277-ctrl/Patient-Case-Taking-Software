import React, { useState } from 'react';
import {
  UserCheck,
  Plus,
  Search,
  Building2,
  Stethoscope,
  Clock,
  CheckCircle2,
  AlertCircle,
  ToggleLeft,
  ToggleRight,
  ShieldCheck,
  Edit3
} from 'lucide-react';
import { useDemo } from '../../context/DemoContext';

export const AdminDoctors = () => {
  const {
    departments,
    activeDoctor,
    addToast
  } = useDemo();

  const [doctorsList, setDoctorsList] = useState([
    {
      id: 'DOC-01',
      name: 'Dr. Priya Sharma',
      department: 'Cardiology OPD',
      room: 'Room 4',
      specialization: 'MD (Cardiology), DM Fellow',
      shift: '08:30 AM - 02:00 PM',
      currentQueue: 8,
      completedToday: 14,
      status: 'On Duty'
    },
    {
      id: 'DOC-02',
      name: 'Dr. Rajesh Verma',
      department: 'General Medicine',
      room: 'Room 2',
      specialization: 'MD (General Medicine)',
      shift: '09:00 AM - 03:00 PM',
      currentQueue: 12,
      completedToday: 22,
      status: 'On Duty'
    },
    {
      id: 'DOC-03',
      name: 'Dr. Ananya Desai',
      department: 'Orthopedics',
      room: 'Room 7',
      specialization: 'MS (Orthopedics)',
      shift: '09:00 AM - 02:00 PM',
      currentQueue: 6,
      completedToday: 18,
      status: 'Break'
    },
    {
      id: 'DOC-04',
      name: 'Vaidya Harish Shastri',
      department: 'AYUSH Holistic Wing',
      room: 'Room 11',
      specialization: 'BAMS, MD (Ayurveda)',
      shift: '08:00 AM - 01:00 PM',
      currentQueue: 5,
      completedToday: 12,
      status: 'On Duty'
    },
    {
      id: 'DOC-05',
      name: 'Dr. Vikram Patel',
      department: 'Pediatrics',
      room: 'Room 9',
      specialization: 'MD (Pediatrics)',
      shift: '09:30 AM - 03:30 PM',
      currentQueue: 4,
      completedToday: 15,
      status: 'Off Duty'
    }
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newDoc, setNewDoc] = useState({
    name: '',
    department: 'Cardiology OPD',
    room: '',
    specialization: '',
    shift: '09:00 AM - 02:00 PM'
  });

  const toggleStatus = (id) => {
    setDoctorsList((prev) =>
      prev.map((doc) => {
        if (doc.id === id) {
          const nextStatus = doc.status === 'On Duty' ? 'Break' : doc.status === 'Break' ? 'Off Duty' : 'On Duty';
          addToast({
            title: `Doctor Status Updated`,
            message: `${doc.name} marked as ${nextStatus}`,
            type: 'info'
          });
          return { ...doc, status: nextStatus };
        }
        return doc;
      })
    );
  };

  const handleAddDoctor = (e) => {
    e.preventDefault();
    if (!newDoc.name || !newDoc.room) return;

    const created = {
      id: `DOC-0${doctorsList.length + 1}`,
      name: newDoc.name,
      department: newDoc.department,
      room: newDoc.room,
      specialization: newDoc.specialization || 'Clinical Specialist',
      shift: newDoc.shift,
      currentQueue: 0,
      completedToday: 0,
      status: 'On Duty'
    };

    setDoctorsList([...doctorsList, created]);
    setShowAddModal(false);
    setNewDoc({
      name: '',
      department: 'Cardiology OPD',
      room: '',
      specialization: '',
      shift: '09:00 AM - 02:00 PM'
    });

    addToast({
      title: 'Doctor Roster Updated',
      message: `${created.name} assigned to ${created.room}.`,
      type: 'success'
    });
  };

  const filteredDoctors = doctorsList.filter(
    (d) =>
      d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.room.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-slate-900">Doctor & Consultant Roster</h1>
          <p className="text-xs text-slate-500 mt-1">
            Manage consulting physicians, room assignments, active OPD shifts, and consultation queues
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-md shadow-indigo-600/20 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Consultant</span>
        </button>
      </div>

      {/* Search Bar */}
      <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-3">
        <Search className="w-4 h-4 text-slate-400" />
        <input
          type="text"
          placeholder="Search by physician name, department, or consultation room..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-transparent text-xs text-slate-800 focus:outline-none font-medium"
        />
      </div>

      {/* Doctors Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 text-[11px] font-bold text-slate-500 uppercase tracking-wider border-b border-slate-200">
                <th className="py-3.5 px-4">Doctor & Specialty</th>
                <th className="py-3.5 px-4">Department & Room</th>
                <th className="py-3.5 px-4">Shift Timings</th>
                <th className="py-3.5 px-4">OPD Queue / Today</th>
                <th className="py-3.5 px-4">Duty Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredDoctors.map((doc) => {
                const isOnDuty = doc.status === 'On Duty';
                const isBreak = doc.status === 'Break';

                return (
                  <tr key={doc.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-2xl bg-indigo-50 text-indigo-700 font-bold flex items-center justify-center text-xs">
                          {doc.name.replace('Dr. ', '').replace('Vaidya ', '').charAt(0)}
                        </div>
                        <div>
                          <span className="font-bold text-slate-900 block">{doc.name}</span>
                          <span className="text-[11px] text-slate-500">{doc.specialization}</span>
                        </div>
                      </div>
                    </td>

                    <td className="py-4 px-4">
                      <span className="font-semibold text-slate-800 block">{doc.department}</span>
                      <span className="text-[11px] font-mono font-bold text-indigo-600">{doc.room}</span>
                    </td>

                    <td className="py-4 px-4 text-slate-600 font-medium">
                      <div className="flex items-center gap-1.5 text-[11px]">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        <span>{doc.shift}</span>
                      </div>
                    </td>

                    <td className="py-4 px-4">
                      <div className="space-y-0.5">
                        <span className="font-mono font-black text-slate-900">{doc.currentQueue} waiting</span>
                        <span className="text-[10px] text-slate-400 block">{doc.completedToday} completed today</span>
                      </div>
                    </td>

                    <td className="py-4 px-4">
                      <button
                        onClick={() => toggleStatus(doc.id)}
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold transition-all ${
                          isOnDuty
                            ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                            : isBreak
                            ? 'bg-amber-100 text-amber-800 hover:bg-amber-200'
                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }`}
                        title="Click to toggle status"
                      >
                        <span className={`w-1.5 h-1.5 rounded-full ${isOnDuty ? 'bg-emerald-600' : isBreak ? 'bg-amber-600' : 'bg-slate-400'}`} />
                        <span>{doc.status}</span>
                      </button>
                    </td>

                    <td className="py-4 px-4 text-right">
                      <button
                        onClick={() => toggleStatus(doc.id)}
                        className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors"
                      >
                        Change Status
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Consultant Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-4">
            <h3 className="font-bold text-lg text-slate-900">Add New Consulting Physician</h3>
            
            <form onSubmit={handleAddDoctor} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Doctor Name & Title</label>
                <input
                  type="text"
                  placeholder="e.g. Dr. Ramesh Kumar"
                  value={newDoc.name}
                  onChange={(e) => setNewDoc({ ...newDoc, name: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 font-medium"
                  required
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Department</label>
                <select
                  value={newDoc.department}
                  onChange={(e) => setNewDoc({ ...newDoc, department: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 font-medium"
                >
                  {departments.map((d) => (
                    <option key={d.id} value={d.name}>
                      {d.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Room No.</label>
                  <input
                    type="text"
                    placeholder="Room 5"
                    value={newDoc.room}
                    onChange={(e) => setNewDoc({ ...newDoc, room: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500"
                    required
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Shift Hours</label>
                  <input
                    type="text"
                    placeholder="09:00 - 02:00"
                    value={newDoc.shift}
                    onChange={(e) => setNewDoc({ ...newDoc, shift: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Specialization / Qualifications</label>
                <input
                  type="text"
                  placeholder="MD (Cardiology), DNB"
                  value={newDoc.specialization}
                  onChange={(e) => setNewDoc({ ...newDoc, specialization: e.target.value })}
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
                  Add Consultant
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
export default AdminDoctors;
