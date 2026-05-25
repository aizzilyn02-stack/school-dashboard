import React, { useMemo } from 'react';

interface Props {
  selectedYear: string;
  selectedGrade: string;
  dropoutRepeaters: any[];
}

export function DropoutRepeaterCharts({ selectedYear, selectedGrade, dropoutRepeaters }: Props) {
  const filtered = useMemo(
    () =>
      dropoutRepeaters.filter((entry) => {
        if (selectedYear && entry.year !== selectedYear) return false;
        if (selectedGrade !== 'All Grades' && entry.grade_level !== selectedGrade) return false;
        return true;
      }),
    [dropoutRepeaters, selectedYear, selectedGrade]
  );

  const trendData = useMemo(() => {
    const map: Record<string, { year: string; dropout_rate: number; repeater_rate: number; dropouts: number; repeaters: number; total_students: number }> = {};
    filtered.forEach((entry) => {
      const year = entry.year || 'Unknown';
      if (!map[year]) {
        map[year] = { year, dropout_rate: 0, repeater_rate: 0, dropouts: 0, repeaters: 0, total_students: 0 };
      }
      map[year].dropouts += entry.dropouts || 0;
      map[year].repeaters += entry.repeaters || 0;
      map[year].total_students += entry.total_students || 0;
    });
    return Object.values(map)
      .map((row) => ({
        ...row,
        dropout_rate: row.total_students > 0 ? (row.dropouts / row.total_students) * 100 : 0,
        repeater_rate: row.total_students > 0 ? (row.repeaters / row.total_students) * 100 : 0,
      }))
      .sort((a, b) => a.year.localeCompare(b.year));
  }, [filtered]);

  // Get data for all years (not filtered by selectedYear) for the trend line chart
  const allYearsTrendData = useMemo(() => {
    const map: Record<string, { year: string; dropouts: number; repeaters: number }> = {};
    dropoutRepeaters.forEach((entry) => {
      const year = entry.year || 'Unknown';
      if (!map[year]) {
        map[year] = { year, dropouts: 0, repeaters: 0 };
      }
      map[year].dropouts += entry.dropouts || 0;
      map[year].repeaters += entry.repeaters || 0;
    });
    return Object.values(map).sort((a, b) => a.year.localeCompare(b.year));
  }, [dropoutRepeaters]);

  // Calculate max values for line chart scaling
  const maxDropouts = Math.max(...allYearsTrendData.map(row => row.dropouts), 1);
  const maxRepeaters = Math.max(...allYearsTrendData.map(row => row.repeaters), 1);
  const chartMaxY = Math.max(maxDropouts, maxRepeaters);

  // Generate SVG line chart
  const chartWidth = 600;
  const chartHeight = 300;
  const padding = 40;
  const plotWidth = chartWidth - padding * 2;
  const plotHeight = chartHeight - padding * 2;

  const xStep = plotWidth / Math.max(allYearsTrendData.length - 1, 1);
  const yScale = plotHeight / chartMaxY;

  const dropoutPoints = allYearsTrendData.map((row, i) => ({
    x: padding + i * xStep,
    y: padding + plotHeight - (row.dropouts * yScale),
    value: row.dropouts,
  }));

  const repeaterPoints = allYearsTrendData.map((row, i) => ({
    x: padding + i * xStep,
    y: padding + plotHeight - (row.repeaters * yScale),
    value: row.repeaters,
  }));

  const dropoutPath = dropoutPoints.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
  const repeaterPath = repeaterPoints.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h3 className="text-xl font-semibold text-slate-900">Dropout & Repeater Trend</h3>
        <div className="mt-6 space-y-4">
          {trendData.map((row) => (
            <div key={row.year} className="rounded-3xl bg-slate-50 p-4">
              <div className="flex items-center justify-between text-sm text-slate-600">
                <span>{row.year}</span>
                <span>{row.dropout_rate.toFixed(2)}% / {row.repeater_rate.toFixed(2)}%</span>
              </div>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <div className="rounded-3xl bg-white p-4 shadow-sm">
                  <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Dropout Rate</p>
                  <p className="mt-2 text-2xl font-semibold text-slate-900">{row.dropout_rate.toFixed(2)}%</p>
                </div>
                <div className="rounded-3xl bg-white p-4 shadow-sm">
                  <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Repeater Rate</p>
                  <p className="mt-2 text-2xl font-semibold text-slate-900">{row.repeater_rate.toFixed(2)}%</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h3 className="text-xl font-semibold text-slate-900">Dropout & Repeater Trend Over Time</h3>
        <div className="mt-6">
          <div className="overflow-x-auto">
            <svg width="100%" height="400" viewBox={`0 0 ${chartWidth} ${chartHeight}`} style={{ minWidth: '600px' }}>
              {/* Grid lines */}
              {[0, 1, 2, 3, 4].map((i) => (
                <line
                  key={`grid-h-${i}`}
                  x1={padding}
                  y1={padding + (plotHeight / 4) * i}
                  x2={chartWidth - padding}
                  y2={padding + (plotHeight / 4) * i}
                  stroke="#e2e8f0"
                  strokeWidth="1"
                />
              ))}

              {/* Y-axis */}
              <line x1={padding} y1={padding} x2={padding} y2={padding + plotHeight} stroke="#64748b" strokeWidth="2" />
              
              {/* X-axis */}
              <line x1={padding} y1={padding + plotHeight} x2={chartWidth - padding} y2={padding + plotHeight} stroke="#64748b" strokeWidth="2" />

              {/* Y-axis labels */}
              {[0, 1, 2, 3, 4].map((i) => {
                const value = Math.round((chartMaxY / 4) * i);
                return (
                  <text
                    key={`y-label-${i}`}
                    x={padding - 10}
                    y={padding + plotHeight - (plotHeight / 4) * i + 5}
                    fontSize="12"
                    fill="#64748b"
                    textAnchor="end"
                  >
                    {value}
                  </text>
                );
              })}

              {/* X-axis labels and grid */}
              {allYearsTrendData.map((row, i) => (
                <g key={`x-axis-${i}`}>
                  <line
                    x1={padding + i * xStep}
                    y1={padding + plotHeight}
                    x2={padding + i * xStep}
                    y2={padding + plotHeight + 5}
                    stroke="#64748b"
                    strokeWidth="1"
                  />
                  <text
                    x={padding + i * xStep}
                    y={padding + plotHeight + 20}
                    fontSize="12"
                    fill="#64748b"
                    textAnchor="middle"
                  >
                    {row.year}
                  </text>
                </g>
              ))}

              {/* Dropout line */}
              <path
                d={dropoutPath}
                stroke="#ef4444"
                strokeWidth="3"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Repeater line */}
              <path
                d={repeaterPath}
                stroke="#f59e0b"
                strokeWidth="3"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Dropout points */}
              {dropoutPoints.map((p, i) => (
                <circle key={`dropout-${i}`} cx={p.x} cy={p.y} r="5" fill="#ef4444" />
              ))}

              {/* Repeater points */}
              {repeaterPoints.map((p, i) => (
                <circle key={`repeater-${i}`} cx={p.x} cy={p.y} r="5" fill="#f59e0b" />
              ))}
            </svg>
          </div>

          {/* Legend */}
          <div className="mt-6 flex gap-6">
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-red-500" />
              <span className="text-sm text-slate-600">Dropouts</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-amber-500" />
              <span className="text-sm text-slate-600">Repeaters</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
