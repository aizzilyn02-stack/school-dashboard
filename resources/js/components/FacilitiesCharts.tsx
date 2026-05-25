import React, { useMemo } from 'react';

interface Props {
  buildings: any[];
  rooms: any[];
}

export function FacilitiesCharts({ buildings, rooms }: Props) {
  const conditionCounts = useMemo(() => {
    const map: Record<string, number> = {};
    rooms.forEach((room) => {
      const condition = room.condition || 'Unknown';
      map[condition] = (map[condition] || 0) + 1;
    });
    return Object.entries(map).map(([condition, count]) => ({ condition, count }));
  }, [rooms]);

  const usageCounts = useMemo(() => {
    const map: Record<string, number> = {};
    rooms.forEach((room) => {
      const usage = room.usage_category || 'Other';
      map[usage] = (map[usage] || 0) + 1;
    });
    return Object.entries(map).map(([usage_category, count]) => ({ usage_category, count }));
  }, [rooms]);

  const totalArea = useMemo(() => rooms.reduce((sum, room) => sum + (room.area_sqm || 0), 0), [rooms]);

  return (
    <div className="space-y-6">
      <div className="grid gap-4 lg:grid-cols-3">
        {buildings.map((building) => (
          <div key={building.id} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-900">{building.building_name}</h3>
            <div className="mt-4 space-y-3 text-sm text-slate-600">
              <div className="flex justify-between">
                <span>Total Rooms</span>
                <span>{building.total_rooms}</span>
              </div>
              <div className="flex justify-between">
                <span>Condition</span>
                <span>{building.condition}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="text-xl font-semibold text-slate-900">Room Condition Breakdown</h3>
          <div className="mt-6 space-y-4">
            {conditionCounts.map((row) => (
              <div key={row.condition} className="flex items-center justify-between rounded-3xl bg-slate-50 px-4 py-3">
                <span className="text-sm text-slate-700">{row.condition}</span>
                <span className="font-semibold text-slate-900">{row.count}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="text-xl font-semibold text-slate-900">Room Usage Summary</h3>
          <div className="mt-6 space-y-4">
            {usageCounts.map((row) => (
              <div key={row.usage_category} className="rounded-3xl bg-slate-50 p-4">
                <div className="flex items-center justify-between text-sm text-slate-600">
                  <span>{row.usage_category}</span>
                  <span>{row.count}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 rounded-3xl bg-slate-50 p-4 text-sm text-slate-700">
            Total area across rooms: <span className="font-semibold text-slate-900">{totalArea.toFixed(0)} m²</span>
          </div>
        </div>
      </div>
    </div>
  );
}
