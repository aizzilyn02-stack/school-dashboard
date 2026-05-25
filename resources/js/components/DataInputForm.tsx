import React, { useState } from 'react';
import { X, Save } from 'lucide-react';

interface Props {
  selectedYear: string;
  selectedGrade: string;
  initialTab?: 'enrollment' | 'dropout' | 'classroom' | 'teacher';
  onClose: () => void;
}

export function DataInputForm({ selectedYear, selectedGrade, onClose, initialTab }: Props) {
  const [activeTab, setActiveTab] = useState<'enrollment' | 'dropout' | 'classroom' | 'teacher'>(initialTab ?? 'enrollment');
  const [formData, setFormData] = useState({
    schoolYear: selectedYear || '',
    gradeLevel: selectedGrade !== 'All Grades' ? selectedGrade : 'Kindergarten',
    maleStudents: '',
    femaleStudents: '',
    dropouts: '',
    repeaters: '',
    roomName: '',
    seatingCapacity: '',
    currentStudents: '',
    teacherName: '',
    subject: '',
    studentsAssigned: '',
  });

  const tabs = [
    { id: 'enrollment', label: 'Enrollment' },
    { id: 'dropout', label: 'Dropout / Repeater' },
    { id: 'classroom', label: 'Classroom' },
    { id: 'teacher', label: 'Teacher' },
  ] as const;

  const handleInput = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    (async () => {
      try {
        const csrf = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '';

        // Ensure we have a school_year_id
        const yearValue = formData.schoolYear || selectedYear || '';

        let schoolYearId: number | null = null;

        if (yearValue) {
          const res = await fetch('/school-years');
          const years = await res.json();
          const found = years.find((y: any) => y.year === yearValue);
          if (found) {
            schoolYearId = found.id;
          } else {
            const createRes = await fetch('/school-years', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': csrf,
              },
              body: JSON.stringify({ year: yearValue }),
            });
            const created = await createRes.json();
            schoolYearId = created.id;
          }
        }

        // Helper to post JSON
        const postJson = async (url: string, payload: any) => {
          const r = await fetch(url, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'X-CSRF-TOKEN': csrf,
            },
            body: JSON.stringify(payload),
          });
          if (!r.ok) throw new Error(`Request failed: ${r.status}`);
          return r.json();
        };

        if (activeTab === 'enrollment') {
          await postJson('/enrollments', {
            school_year_id: schoolYearId,
            grade_level: formData.gradeLevel,
            male_students: Number(formData.maleStudents) || 0,
            female_students: Number(formData.femaleStudents) || 0,
          });
        }

        if (activeTab === 'dropout') {
          const dropouts = Number(formData.dropouts) || 0;
          const repeaters = Number(formData.repeaters) || 0;
          const totalStudents = (Number(formData.maleStudents) || 0) + (Number(formData.femaleStudents) || 0) || 0;

          await postJson('/dropout-repeaters', {
            school_year_id: schoolYearId,
            grade_level: formData.gradeLevel,
            dropouts,
            repeaters,
            total_students: totalStudents,
          });
        }

        if (activeTab === 'classroom') {
          // pick first building as fallback
          let buildingId = null;
          try {
            const bRes = await fetch('/buildings');
            const buildings = await bRes.json();
            buildingId = buildings.length > 0 ? buildings[0].id : null;
          } catch (e) {
            buildingId = null;
          }

          await postJson('/classrooms', {
            school_year_id: schoolYearId,
            room_name: formData.roomName,
            grade_level: formData.gradeLevel,
            seating_capacity: Number(formData.seatingCapacity) || 0,
            current_students: Number(formData.currentStudents) || 0,
            building_id: buildingId,
          });
        }

        if (activeTab === 'teacher') {
          await postJson('/teachers', {
            school_year_id: schoolYearId,
            teacher_name: formData.teacherName,
            grade_level: formData.gradeLevel,
            subject: formData.subject,
            students_assigned: Number(formData.studentsAssigned) || 0,
            is_advisor: false,
          });
        }

        onClose();
        window.location.reload();
      } catch (error) {
        // Basic error feedback
        // eslint-disable-next-line no-console
        console.error(error);
        alert('Failed to save data. Check console for details.');
      }
    })();
  };

  return (
    <div className="rounded-[32px] bg-white shadow-2xl ring-1 ring-slate-200 w-full max-w-4xl overflow-hidden">
      <div className="bg-gradient-to-r from-sky-600 to-indigo-600 p-6 text-white">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold">Add New School Data</h2>
            <p className="mt-2 text-sm text-sky-100">Update the dashboard with fresh information across enrollment, classroom or staffing metrics.</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-2xl border border-white/25 bg-white/10 p-2 text-white transition hover:bg-white/20"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="border-b border-slate-200 bg-slate-50 px-6 py-4">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <div className="rounded-3xl bg-white p-4 shadow-sm">
            <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Selected Year</p>
            <p className="mt-2 text-lg font-semibold text-slate-900">{selectedYear || 'All Years'}</p>
          </div>
          <div className="rounded-3xl bg-white p-4 shadow-sm">
            <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Selected Grade</p>
            <p className="mt-2 text-lg font-semibold text-slate-900">{selectedGrade}</p>
          </div>
          <div className="rounded-3xl bg-white p-4 shadow-sm">
            <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Current Mode</p>
            <p className="mt-2 text-lg font-semibold text-slate-900">{tabs.find((tab) => tab.id === activeTab)?.label}</p>
          </div>
          <div className="rounded-3xl bg-white p-4 shadow-sm">
            <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Preview</p>
            <p className="mt-2 text-lg font-semibold text-slate-900">Quick add</p>
          </div>
        </div>
      </div>

      <div className="bg-slate-50 px-6 py-4">
        <div className="flex flex-wrap gap-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`rounded-3xl px-4 py-2 text-sm font-semibold transition ${
                activeTab === tab.id
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'bg-transparent text-slate-600 hover:bg-white hover:text-slate-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 bg-white px-6 py-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="text-sm font-medium text-slate-700">School Year</label>
            <input
              type="text"
              value={formData.schoolYear}
              onChange={(event) => handleInput('schoolYear', event.target.value)}
              placeholder="e.g. 2025-2026"
              className="mt-2 w-full rounded-3xl border border-slate-200 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-slate-700">Grade Level</label>
            <select
              value={formData.gradeLevel}
              onChange={(event) => handleInput('gradeLevel', event.target.value)}
              className="mt-2 w-full rounded-3xl border border-slate-200 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
            >
              {['Kindergarten', 'Grade 1', 'Grade 2', 'Grade 3', 'Grade 4', 'Grade 5', 'Grade 6'].map((grade) => (
                <option key={grade} value={grade}>{grade}</option>
              ))}
            </select>
          </div>
        </div>

        {activeTab === 'enrollment' && (
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="text-sm font-medium text-slate-700">Male Students</label>
              <input
                type="number"
                value={formData.maleStudents}
                onChange={(event) => handleInput('maleStudents', event.target.value)}
                className="mt-2 w-full rounded-3xl border border-slate-200 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-700">Female Students</label>
              <input
                type="number"
                value={formData.femaleStudents}
                onChange={(event) => handleInput('femaleStudents', event.target.value)}
                className="mt-2 w-full rounded-3xl border border-slate-200 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
              />
            </div>
          </div>
        )}

        {activeTab === 'dropout' && (
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="text-sm font-medium text-slate-700">Dropouts</label>
              <input
                type="number"
                value={formData.dropouts}
                onChange={(event) => handleInput('dropouts', event.target.value)}
                className="mt-2 w-full rounded-3xl border border-slate-200 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-700">Repeaters</label>
              <input
                type="number"
                value={formData.repeaters}
                onChange={(event) => handleInput('repeaters', event.target.value)}
                className="mt-2 w-full rounded-3xl border border-slate-200 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
              />
            </div>
          </div>
        )}

        {activeTab === 'classroom' && (
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="text-sm font-medium text-slate-700">Room Name</label>
              <input
                type="text"
                value={formData.roomName}
                onChange={(event) => handleInput('roomName', event.target.value)}
                className="mt-2 w-full rounded-3xl border border-slate-200 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-700">Seating Capacity</label>
              <input
                type="number"
                value={formData.seatingCapacity}
                onChange={(event) => handleInput('seatingCapacity', event.target.value)}
                className="mt-2 w-full rounded-3xl border border-slate-200 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-700">Current Students</label>
              <input
                type="number"
                value={formData.currentStudents}
                onChange={(event) => handleInput('currentStudents', event.target.value)}
                className="mt-2 w-full rounded-3xl border border-slate-200 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
              />
            </div>
          </div>
        )}

        {activeTab === 'teacher' && (
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="text-sm font-medium text-slate-700">Teacher Name</label>
              <input
                type="text"
                value={formData.teacherName}
                onChange={(event) => handleInput('teacherName', event.target.value)}
                className="mt-2 w-full rounded-3xl border border-slate-200 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-700">Subject</label>
              <input
                type="text"
                value={formData.subject}
                onChange={(event) => handleInput('subject', event.target.value)}
                className="mt-2 w-full rounded-3xl border border-slate-200 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-700">Students Assigned</label>
              <input
                type="number"
                value={formData.studentsAssigned}
                onChange={(event) => handleInput('studentsAssigned', event.target.value)}
                className="mt-2 w-full rounded-3xl border border-slate-200 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
              />
            </div>
          </div>
        )}

        <div className="flex flex-col gap-3 border-t border-slate-200 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="rounded-3xl bg-slate-50 p-4 text-sm text-slate-700">
            Use this form to keep dashboard metrics current. The new record is applied to the active year and grade selection.
          </div>
          <button
            type="submit"
            className="inline-flex items-center justify-center gap-2 rounded-3xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            <Save className="h-4 w-4" />
            Save Data
          </button>
        </div>
      </form>
    </div>
  );
}
