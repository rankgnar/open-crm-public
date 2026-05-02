'use client'

import { TrendingUp, TrendingDown, Filter, Download } from 'lucide-react'
import { ekonomiProjects } from '@/lib/fixtures/data'

const fmtSEK = (n: number) =>
  new Intl.NumberFormat('sv-SE', { maximumFractionDigits: 0 }).format(n) + ' kr'

const STATUS_COLOR: Record<string, { dot: string; ring: string }> = {
  green: { dot: 'bg-emerald-400', ring: 'ring-emerald-400/30' },
  amber: { dot: 'bg-amber-400', ring: 'ring-amber-400/30' },
  red: { dot: 'bg-red-400', ring: 'ring-red-400/30' },
}

export function EkonomiView() {
  const totalBudget = ekonomiProjects.reduce((s, p) => s + p.budget, 0)
  const totalForbrukat = ekonomiProjects.reduce(
    (s, p) => s + p.forbrukat,
    0,
  )
  const totalFakturerat = ekonomiProjects.reduce(
    (s, p) => s + p.fakturerat,
    0,
  )
  const utestaende = totalForbrukat - totalFakturerat
  const marginal =
    ((totalForbrukat - totalFakturerat) / totalForbrukat) * 100

  return (
    <div className="flex h-full flex-col">
      {/* Header */}
      <div className="flex shrink-0 flex-wrap items-center justify-between gap-2 border-b border-border bg-sidebar px-4 py-3 md:flex-nowrap md:gap-4 md:px-6">
        <div className="flex min-w-0 items-center gap-3">
          <h1 className="text-base font-semibold text-fg">Ekonomi</h1>
          <div className="hidden items-center gap-1 rounded-md border border-border bg-elevated p-0.5 sm:flex">
            {(['Översikt', 'Per projekt', 'Per månad', 'Kostnader'] as const).map(
              (v, i) => (
                <button
                  key={v}
                  className={`rounded px-2.5 py-1 text-[11px] font-medium transition-colors ${
                    i === 1 ? 'bg-hover text-fg' : 'text-muted hover:text-fg'
                  }`}
                >
                  {v}
                </button>
              ),
            )}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="hidden items-center gap-1.5 rounded-lg border border-border bg-elevated px-3 py-1.5 text-xs text-fg transition-colors hover:bg-hover sm:flex">
            <Filter size={12} /> Filter
          </button>
          <button className="flex items-center gap-1.5 rounded-lg border border-border bg-elevated px-3 py-1.5 text-xs text-fg transition-colors hover:bg-hover">
            <Download size={12} /> Exportera
          </button>
        </div>
      </div>

      {/* KPI grid */}
      <div className="grid shrink-0 grid-cols-2 gap-px border-b border-border bg-border md:grid-cols-4">
        <KpiCard
          label="Total budget"
          value={fmtSEK(totalBudget)}
          sub={`${ekonomiProjects.length} projekt`}
        />
        <KpiCard
          label="Förbrukat"
          value={fmtSEK(totalForbrukat)}
          sub={`${((totalForbrukat / totalBudget) * 100).toFixed(0)}% av budget`}
        />
        <KpiCard
          label="Fakturerat"
          value={fmtSEK(totalFakturerat)}
          sub={`Utestående: ${fmtSEK(utestaende)}`}
        />
        <KpiCard
          label="Total marginal"
          value={`${marginal.toFixed(1)}%`}
          sub="vägt snitt"
          icon={
            marginal > 0 ? (
              <TrendingUp size={12} className="text-emerald-400" />
            ) : (
              <TrendingDown size={12} className="text-red-400" />
            )
          }
        />
      </div>

      {/* Table */}
      <div className="flex-1 overflow-auto">
        <table className="w-full text-sm">
          <thead className="sticky top-0 z-10 bg-sidebar">
            <tr className="border-b border-border text-left">
              <th className="px-6 py-2.5 text-[11px] font-medium uppercase tracking-wider text-muted">
                Projekt
              </th>
              <th className="px-4 py-2.5 text-[11px] font-medium uppercase tracking-wider text-muted">
                Kund
              </th>
              <th className="px-4 py-2.5 text-right text-[11px] font-medium uppercase tracking-wider text-muted">
                Budget
              </th>
              <th className="px-4 py-2.5 text-[11px] font-medium uppercase tracking-wider text-muted">
                Förbrukat
              </th>
              <th className="px-4 py-2.5 text-right text-[11px] font-medium uppercase tracking-wider text-muted">
                Fakturerat
              </th>
              <th className="px-4 py-2.5 text-right text-[11px] font-medium uppercase tracking-wider text-muted">
                Marginal
              </th>
              <th className="px-4 py-2.5 text-[11px] font-medium uppercase tracking-wider text-muted">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {ekonomiProjects.map((p) => {
              const pct = (p.forbrukat / p.budget) * 100
              const overBudget = pct > 100
              const status = STATUS_COLOR[p.status]
              return (
                <tr
                  key={p.projekt_nummer}
                  className="group cursor-pointer border-b border-border transition-colors hover:bg-hover"
                >
                  <td className="px-6 py-3">
                    <div className="font-mono text-[11px] text-subtle">
                      {p.projekt_nummer}
                    </div>
                    <div className="mt-0.5 truncate font-medium text-fg">
                      {p.namn}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-muted">{p.kund}</td>
                  <td className="px-4 py-3 text-right font-mono text-fg tabular-nums">
                    {fmtSEK(p.budget)}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <span
                        className={`font-mono text-xs tabular-nums ${
                          overBudget ? 'text-red-400' : 'text-fg'
                        }`}
                      >
                        {pct.toFixed(0)}%
                      </span>
                      <div className="relative h-1 w-24 overflow-hidden rounded-full bg-surface-2">
                        <div
                          className={`h-full rounded-full ${
                            overBudget
                              ? 'bg-red-400'
                              : pct > 85
                                ? 'bg-amber-400'
                                : 'bg-gradient-to-r from-accent-deep to-accent'
                          }`}
                          style={{ width: `${Math.min(pct, 100)}%` }}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-right font-mono text-muted tabular-nums">
                    {fmtSEK(p.fakturerat)}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <span
                      className={`font-mono text-xs tabular-nums ${
                        p.marginal_pct > 15
                          ? 'text-emerald-400'
                          : p.marginal_pct > 5
                            ? 'text-fg'
                            : p.marginal_pct > 0
                              ? 'text-amber-400'
                              : 'text-red-400'
                      }`}
                    >
                      {p.marginal_pct > 0 ? '+' : ''}
                      {p.marginal_pct.toFixed(1)}%
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex h-2 w-2 rounded-full ring-2 ${status.ring} ${status.dot}`}
                    />
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function KpiCard({
  label,
  value,
  sub,
  icon,
}: {
  label: string
  value: string
  sub: string
  icon?: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-1 bg-bg-elevated px-4 py-3 md:px-6 md:py-4">
      <p className="text-[10px] font-semibold uppercase tracking-widest text-muted">
        {label}
      </p>
      <div className="flex items-center gap-2">
        <span className="text-base font-semibold tabular-nums text-fg md:text-xl">
          {value}
        </span>
        {icon}
      </div>
      <p className="truncate text-[11px] text-subtle">{sub}</p>
    </div>
  )
}
