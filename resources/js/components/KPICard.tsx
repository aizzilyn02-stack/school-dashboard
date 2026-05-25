import React from 'react';
import { LucideIcon, ArrowUpRight, ArrowDownRight } from 'lucide-react';

interface KPICardProps {
  title: string;
  value: number;
  suffix?: string;
  icon: LucideIcon;
  change?: number;
  changeLabel?: string;
  color?: 'blue' | 'green' | 'purple' | 'red' | 'orange' | 'amber';
}

const colorMap: Record<NonNullable<KPICardProps['color']>, string> = {
  blue: 'from-sky-500 to-blue-500',
  green: 'from-emerald-500 to-teal-500',
  purple: 'from-violet-500 to-fuchsia-500',
  red: 'from-red-500 to-rose-500',
  orange: 'from-amber-500 to-orange-500',
  amber: 'from-amber-600 to-lime-500',
};

export function KPICard({ title, value, suffix, icon: Icon, change, changeLabel, color = 'blue' }: KPICardProps) {
  const formattedValue = value.toLocaleString(undefined, { maximumFractionDigits: suffix === '%' ? 2 : 1 });
  const showChange = change !== undefined && change !== null;

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">{title}</p>
          <p className="mt-4 text-3xl font-semibold text-slate-900">
            {formattedValue}
            {suffix && <span className="ml-1 text-base font-medium text-slate-500">{suffix}</span>}
          </p>
        </div>
        <div className={`flex h-12 w-12 items-center justify-center rounded-3xl bg-gradient-to-br ${colorMap[color]} text-white shadow-lg`}>
          <Icon className="h-5 w-5" />
        </div>
      </div>
      {showChange && (
        <div className="mt-4 flex items-center gap-2 text-sm leading-none">
          {change! >= 0 ? (
            <ArrowUpRight className="h-4 w-4 text-emerald-500" />
          ) : (
            <ArrowDownRight className="h-4 w-4 text-rose-500" />
          )}
          <span className={`${change! >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
            {Math.abs(change!).toLocaleString(undefined, { maximumFractionDigits: suffix === '%' ? 2 : 1 })}{suffix === '%' ? '%' : ''}
          </span>
          <span className="text-slate-500">{changeLabel ?? 'vs prior year'}</span>
        </div>
      )}
    </div>
  );
}
