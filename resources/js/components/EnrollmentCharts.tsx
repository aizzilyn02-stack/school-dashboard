import React, { useMemo } from 'react';

interface Props {
  selectedYear: string;
  selectedGrade: string;
  enrollments: any[];
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

export function EnrollmentCharts({ selectedYear, selectedGrade, enrollments }: Props) {
  const filtered = useMemo(
    () =>
      enrollments.filter((entry) => {
        if (selectedYear && entry.year !== selectedYear) return false;
        if (selectedGrade !== 'All Grades' && entry.grade_level !== selectedGrade) return false;
        return true;
      }),
    [enrollments, selectedYear, selectedGrade]
  );

  const trendData = useMemo(() => {
    const map: Record<string, { year: string; male: number; female: number; total: number }> = {};
    filtered.forEach((entry) => {
      const year = entry.year || 'Unknown';
      if (!map[year]) {
        map[year] = { year, male: 0, female: 0, total: 0 };
      }
      map[year].male += entry.male_students || 0;
      map[year].female += entry.female_students || 0;
    });
    return Object.values(map)
      .map((row) => ({ ...row, total: row.male + row.female }))
      .sort((a, b) => a.year.localeCompare(b.year));
  }, [filtered]);

  const gradeData = useMemo(() => {
    const map: Record<string, { grade: string; male: number; female: number; total: number }> = {};
    filtered.forEach((entry) => {
      const grade = entry.grade_level;
      if (!map[grade]) {
        map[grade] = { grade, male: 0, female: 0, total: 0 };
      }
      map[grade].male += entry.male_students || 0;
      map[grade].female += entry.female_students || 0;
    });
    return Object.values(map)
      .map((row) => ({ ...row, total: row.male + row.female }))
      .sort((a, b) => gradeOrder.indexOf(a.grade) - gradeOrder.indexOf(b.grade));
  }, [filtered]);

  const totalMale = gradeData.reduce((sum, row) => sum + row.male, 0);
  const totalFemale = gradeData.reduce((sum, row) => sum + row.female, 0);

  const barWidth = (value: number, max: number) => `${Math.max(8, Math.round((value / Math.max(max, 1)) * 100))}%`;

  const maxTotal = Math.max(...gradeData.map((row) => row.total), 0);

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h3 className="text-xl font-semibold text-slate-900">Enrollment Trends</h3>
        <div className="mt-6 space-y-4">
          {trendData.map((row) => (
            <div key={row.year} className="rounded-3xl bg-slate-50 p-4">
              <div className="flex items-center justify-between text-sm text-slate-600">
                <span>{row.year}</span>
                <span>{row.total} students</span>
              </div>
              <div className="mt-3 grid gap-3 sm:grid-cols-3">
                <div className="rounded-2xl bg-white p-4 shadow-sm">
                  <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Total</p>
                  <p className="mt-2 text-2xl font-semibold text-slate-900">{row.total}</p>
                </div>
                <div className="rounded-2xl bg-white p-4 shadow-sm">
                  <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Male</p>
                  <p className="mt-2 text-2xl font-semibold text-slate-900">{row.male}</p>
                </div>
                <div className="rounded-2xl bg-white p-4 shadow-sm">
                  <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Female</p>
                  <p className="mt-2 text-2xl font-semibold text-slate-900">{row.female}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h3 className="text-xl font-semibold text-slate-900">Grade Comparison</h3>
        <div className="mt-6 space-y-4">
          {gradeData.map((row) => (
            <div key={row.grade}>
              <div className="flex items-center justify-between text-sm text-slate-600">
                <span>{row.grade}</span>
                <span>{row.total} total</span>
              </div>
              <div className="mt-2 rounded-full bg-slate-100 h-3 overflow-hidden">
                <div className="h-full bg-sky-500" style={{ width: barWidth(row.total, maxTotal) }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h3 className="text-xl font-semibold text-slate-900">Gender Breakdown</h3>
        <div className="mt-6 space-y-4">
          <div className="rounded-3xl bg-slate-50 p-4">
            <div className="flex items-center justify-between text-sm text-slate-600">
              <span>Male</span>
              <span>{totalMale}</span>
            </div>
            <div className="mt-2 rounded-full bg-slate-100 h-3 overflow-hidden">
              <div className="h-full bg-sky-500" style={{ width: totalMale + totalFemale > 0 ? `${(totalMale / (totalMale + totalFemale)) * 100}%` : '0%' }} />
            </div>
          </div>
          <div className="rounded-3xl bg-slate-50 p-4">
            <div className="flex items-center justify-between text-sm text-slate-600">
              <span>Female</span>
              <span>{totalFemale}</span>
            </div>
            <div className="mt-2 rounded-full bg-slate-100 h-3 overflow-hidden">
              <div className="h-full bg-fuchsia-500" style={{ width: totalMale + totalFemale > 0 ? `${(totalFemale / (totalMale + totalFemale)) * 100}%` : '0%' }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
