import React, { useMemo } from 'react';

interface Props {
  selectedYear: string;
  selectedGrade: string;
  classrooms: any[];
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

export function ClassroomCharts({ selectedYear, selectedGrade, classrooms }: Props) {
  const filtered = useMemo(
    () =>
      classrooms.filter((entry) => {
        if (selectedYear && entry.year !== selectedYear) return false;
        if (selectedGrade !== 'All Grades' && entry.grade_level !== selectedGrade) return false;
        return true;
      }),
    [classrooms, selectedYear, selectedGrade]
  );

  const capacityByGrade = useMemo(() => {
    const map: Record<string, { grade: string; capacity: number; current: number }> = {};
    filtered.forEach((entry) => {
      const grade = entry.grade_level;
      if (!map[grade]) {
        map[grade] = { grade, capacity: 0, current: 0 };
      }
      map[grade].capacity += entry.seating_capacity || 0;
      map[grade].current += entry.current_students || 0;
    });
    return Object.values(map).sort((a, b) => gradeOrder.indexOf(a.grade) - gradeOrder.indexOf(b.grade));
  }, [filtered]);

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="text-xl font-semibold text-slate-900">Classroom Utilization</h3>
            <p className="text-sm text-slate-500 mt-2">Usage across grades highlights capacity pressure and overcrowding risks.</p>
          </div>
          <div className="text-right text-sm text-slate-500">
            {filtered.length === 0 ? 'No classroom records for the selected filters.' : `${filtered.length} classroom records included`}
          </div>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {capacityByGrade.map((row) => {
            const utilization = row.capacity > 0 ? (row.current / row.capacity) * 100 : 0;
            return (
              <div key={row.grade} className="rounded-3xl bg-slate-50 p-4 shadow-sm">
                <div className="flex items-center justify-between text-sm text-slate-600">
                  <p>{row.grade}</p>
                  <p>{utilization.toFixed(0)}%</p>
                </div>
                <div className="mt-3 rounded-full bg-slate-200 h-3 overflow-hidden">
                  <div className="h-full bg-sky-500" style={{ width: `${Math.min(utilization, 100)}%` }} />
                </div>
                <div className="mt-3 flex justify-between text-xs text-slate-500">
                  <span>{row.current} occupied</span>
                  <span>{row.capacity} capacity</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
