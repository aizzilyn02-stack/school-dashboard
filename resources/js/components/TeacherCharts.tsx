import React, { useMemo } from 'react';

interface Props {
  selectedYear: string;
  selectedGrade: string;
  teachers: any[];
}

const gradeOrder = [
  'Kindergarten',
  'Grade 1',
  'Grade 2',
  'Grade 3',
  'Grade 4',
  'Grade 5',
  'Grade 6',
];

export function TeacherCharts({ selectedYear, selectedGrade, teachers }: Props) {
  const filtered = useMemo(
    () =>
      teachers.filter((entry) => {
        if (selectedYear && entry.year !== selectedYear) return false;
        if (selectedGrade !== 'All Grades' && entry.grade_level !== selectedGrade) return false;
        return true;
      }),
    [teachers, selectedYear, selectedGrade]
  );

  const totalTeachers = filtered.length;
  const totalStudentsAssigned = filtered.reduce((sum, entry) => sum + (entry.students_assigned || 0), 0);
  const avgStudentsPerTeacher = totalTeachers ? totalStudentsAssigned / totalTeachers : 0;

  const teacherCountByGrade = useMemo(() => {
    const counts: Record<string, number> = {};
    filtered.forEach((entry) => {
      const grade = entry.grade_level || 'Unknown';
      counts[grade] = (counts[grade] || 0) + 1;
    });
    return Object.entries(counts)
      .map(([grade, count]) => ({ grade, count }))
      .sort((a, b) => gradeOrder.indexOf(a.grade) - gradeOrder.indexOf(b.grade));
  }, [filtered]);

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="text-xl font-semibold text-slate-900">Teacher Deployment</h3>
            <p className="text-sm text-slate-500 mt-2">Deployment analytics focus on assignment coverage and staffing balance.</p>
          </div>
          <span className="text-sm text-slate-500">{totalTeachers} teachers analyzed</span>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="text-xl font-semibold text-slate-900">Deployment Summary</h3>
          <div className="mt-6 space-y-4">
            <div className="rounded-3xl bg-slate-50 p-4">
              <div className="text-sm text-slate-600">Total teachers in view</div>
              <div className="mt-2 text-3xl font-semibold text-slate-900">{totalTeachers}</div>
            </div>
            <div className="rounded-3xl bg-slate-50 p-4">
              <div className="text-sm text-slate-600">Students assigned</div>
              <div className="mt-2 text-3xl font-semibold text-slate-900">{totalStudentsAssigned}</div>
            </div>
            <div className="rounded-3xl bg-slate-50 p-4">
              <div className="text-sm text-slate-600">Average students per teacher</div>
              <div className="mt-2 text-3xl font-semibold text-slate-900">{avgStudentsPerTeacher.toFixed(1)}</div>
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="text-xl font-semibold text-slate-900">Teachers by Grade</h3>
          <div className="mt-6 space-y-3">
            {teacherCountByGrade.length > 0 ? (
              teacherCountByGrade.map((row) => (
                <div key={row.grade} className="rounded-3xl bg-slate-50 p-4">
                  <div className="flex items-center justify-between text-sm text-slate-600">
                    <span>{row.grade}</span>
                    <span>{row.count} teacher{row.count === 1 ? '' : 's'}</span>
                  </div>
                </div>
              ))
            ) : (
              <div className="rounded-3xl bg-slate-50 p-4 text-sm text-slate-600">No teacher data found for the selected filters.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
