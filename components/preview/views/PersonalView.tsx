'use client'

import { Search, Plus, Calendar, Clock, ChevronRight } from 'lucide-react'
import { personalMembers } from '@/lib/fixtures/data'
import type { PersonalMember } from '@/lib/fixtures/types'

const COLOR_BG: Record<PersonalMember['color'], string> = {
  cyan: 'bg-cyan-500/15 text-cyan-300 border-cyan-500/30',
  emerald: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
  amber: 'bg-amber-500/15 text-amber-300 border-amber-500/30',
  rose: 'bg-rose-500/15 text-rose-300 border-rose-500/30',
  violet: 'bg-violet-500/15 text-violet-300 border-violet-500/30',
  blue: 'bg-blue-500/15 text-blue-300 border-blue-500/30',
}

export function PersonalView() {
  const aktiva = personalMembers.filter((p) => p.status === 'aktiv').length
  const lediga = personalMembers.filter((p) => p.status === 'ledig').length
  const totalRapporter = personalMembers.reduce(
    (s, p) => s + p.rapporter_pending,
    0,
  )
  const totalLedighet = personalMembers.reduce(
    (s, p) => s + p.ledighet_pending,
    0,
  )

  return (
    <div className="flex h-full flex-col">
      {/* Header */}
      <div className="flex shrink-0 flex-wrap items-center gap-2 border-b border-border bg-sidebar px-4 py-3 md:flex-nowrap md:gap-4 md:px-6">
        <h1 className="shrink-0 text-base font-semibold text-fg">Personal</h1>
        <span className="rounded-full border border-border bg-elevated px-2 py-0.5 text-xs text-muted">
          {personalMembers.length}
        </span>
        <div className="relative ml-1 min-w-0 flex-1 md:ml-2 md:max-w-xs">
          <Search
            size={13}
            className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-subtle"
          />
          <input
            className="input w-full pl-8 text-sm"
            placeholder="Sök..."
            readOnly
          />
        </div>
        <div className="hidden items-center gap-1 rounded-md border border-border bg-elevated p-0.5 lg:flex">
          {(['Översikt', 'Tidrapporter', 'Ledighet', 'Löner'] as const).map(
            (v, i) => (
              <button
                key={v}
                className={`rounded px-2.5 py-1 text-[11px] font-medium transition-colors ${
                  i === 0 ? 'bg-hover text-fg' : 'text-muted hover:text-fg'
                }`}
              >
                {v}
              </button>
            ),
          )}
        </div>
        <button className="ml-auto hidden shrink-0 items-center gap-1.5 rounded-lg border border-border bg-elevated px-3 py-1.5 text-sm text-fg transition-colors hover:bg-hover sm:flex">
          <Plus size={14} /> Anställ
        </button>
      </div>

      {/* KPI strip */}
      <div className="grid shrink-0 grid-cols-2 border-b border-border bg-sidebar md:grid-cols-4">
        <Kpi label="Aktiva" value={aktiva} />
        <Kpi label="Lediga idag" value={lediga} color="text-blue-400" />
        <Kpi
          label="Rapporter att godkänna"
          value={totalRapporter}
          color={totalRapporter > 0 ? 'text-amber-400' : undefined}
          pulse={totalRapporter > 0}
        />
        <Kpi
          label="Ledighetsansökningar"
          value={totalLedighet}
          color={totalLedighet > 0 ? 'text-amber-400' : undefined}
          pulse={totalLedighet > 0}
        />
      </div>

      {/* Table */}
      <div className="flex-1 overflow-auto">
        <table className="w-full text-sm">
          <thead className="sticky top-0 bg-sidebar">
            <tr className="border-b border-border text-left">
              <th className="px-6 py-2.5 text-[11px] font-medium uppercase tracking-wider text-muted">
                Anställd
              </th>
              <th className="px-4 py-2.5 text-[11px] font-medium uppercase tracking-wider text-muted">
                Yrke
              </th>
              <th className="px-4 py-2.5 text-[11px] font-medium uppercase tracking-wider text-muted">
                Status
              </th>
              <th className="px-4 py-2.5 text-[11px] font-medium uppercase tracking-wider text-muted">
                Timmar denna vecka
              </th>
              <th className="px-4 py-2.5 text-[11px] font-medium uppercase tracking-wider text-muted">
                Att åtgärda
              </th>
              <th className="w-10" />
            </tr>
          </thead>
          <tbody>
            {personalMembers.map((p) => (
              <tr
                key={p.id}
                className="group cursor-pointer border-b border-border transition-colors hover:bg-hover"
              >
                <td className="px-6 py-3">
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex h-8 w-8 items-center justify-center rounded-full border text-[11px] font-semibold ${COLOR_BG[p.color]}`}
                    >
                      {p.initials}
                    </div>
                    <div>
                      <p className="font-medium text-fg">{p.namn}</p>
                      <p className="text-[11px] text-subtle">ID #{p.id}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 text-muted">{p.yrke}</td>
                <td className="px-4 py-3">
                  <div className="inline-flex items-center gap-1.5">
                    <span
                      className={`size-1.5 rounded-full ${
                        p.status === 'aktiv'
                          ? 'bg-emerald-400'
                          : p.status === 'ledig'
                            ? 'bg-blue-400'
                            : 'bg-subtle'
                      }`}
                    />
                    <span
                      className={`text-xs ${
                        p.status === 'aktiv'
                          ? 'text-emerald-400'
                          : p.status === 'ledig'
                            ? 'text-blue-400'
                            : 'text-subtle'
                      }`}
                    >
                      {p.status === 'aktiv'
                        ? 'Aktiv'
                        : p.status === 'ledig'
                          ? 'Ledig'
                          : 'Inaktiv'}
                    </span>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs text-fg tabular-nums">
                      {p.timmar_v}/{p.timmar_v_max}h
                    </span>
                    <div className="h-1 w-24 overflow-hidden rounded-full bg-surface-2">
                      <div
                        className={`h-full rounded-full ${
                          p.timmar_v > p.timmar_v_max
                            ? 'bg-amber-400'
                            : 'bg-gradient-to-r from-accent-deep to-accent'
                        }`}
                        style={{
                          width: `${Math.min((p.timmar_v / p.timmar_v_max) * 100, 100)}%`,
                        }}
                      />
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    {p.rapporter_pending > 0 && (
                      <span className="inline-flex items-center gap-1 rounded border border-amber-400/30 bg-amber-500/10 px-1.5 py-0.5 text-[10px] text-amber-400">
                        <Clock size={10} /> {p.rapporter_pending} rapport
                      </span>
                    )}
                    {p.ledighet_pending > 0 && (
                      <span className="inline-flex items-center gap-1 rounded border border-blue-400/30 bg-blue-500/10 px-1.5 py-0.5 text-[10px] text-blue-400">
                        <Calendar size={10} /> {p.ledighet_pending} ledighet
                      </span>
                    )}
                    {p.rapporter_pending === 0 && p.ledighet_pending === 0 && (
                      <span className="text-xs text-subtle">—</span>
                    )}
                  </div>
                </td>
                <td className="pr-4">
                  <ChevronRight
                    size={14}
                    className="text-subtle opacity-0 transition-opacity group-hover:opacity-100"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function Kpi({
  label,
  value,
  color,
  pulse,
}: {
  label: string
  value: number
  color?: string
  pulse?: boolean
}) {
  return (
    <div className="border-r border-border px-6 py-3 last:border-r-0">
      <div className="flex items-baseline gap-2">
        <span
          className={`text-2xl font-semibold tabular-nums ${color ?? 'text-fg'}`}
        >
          {value}
        </span>
        {pulse && value > 0 && (
          <span className="size-1.5 animate-pulse rounded-full bg-amber-400" />
        )}
      </div>
      <p className="mt-0.5 text-[11px] uppercase tracking-wider text-muted">
        {label}
      </p>
    </div>
  )
}
