'use client'

import { type ReactNode } from 'react'
import { RefreshCw } from 'lucide-react'
import { workspaceOverview as ov } from '@/lib/fixtures/data'

const fmt = new Intl.NumberFormat('sv-SE')
const fmtSEK = (n: number) => `${fmt.format(Math.round(n))} kr`

const SV_DAYS = ['må', 'ti', 'on', 'to', 'fr', 'lö', 'sö']
const TODAY = new Date(2026, 4, 6)

function HourMin(iso: string): string {
  const d = new Date(iso)
  return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`
}

function Tile({
  title,
  className,
  children,
  pulse,
}: {
  title: string
  className?: string
  children: ReactNode
  pulse?: boolean
}) {
  return (
    <div
      className={`flex flex-col bg-elevated p-3 transition-colors hover:bg-hover ${className ?? ''}`}
    >
      <div className="mb-1.5 flex items-center justify-between">
        <span className="text-[9px] font-sans uppercase tracking-[0.18em] text-muted">
          {title}
        </span>
        {pulse && (
          <span className="inline-block size-1.5 animate-pulse rounded-full bg-emerald-400" />
        )}
      </div>
      <div className="flex min-h-0 flex-1 flex-col">{children}</div>
    </div>
  )
}

function Sparkline({
  data,
  height = 28,
  color = 'currentColor',
}: {
  data: number[]
  height?: number
  color?: string
}) {
  if (data.length === 0) return null
  const max = Math.max(...data, 1)
  const min = Math.min(...data, 0)
  const range = max - min || 1
  const stepX = data.length > 1 ? 100 / (data.length - 1) : 0
  const points = data.map((v, i) => {
    const x = i * stepX
    const y = height - ((v - min) / range) * height
    return [x, y] as const
  })
  const path = points.reduce(
    (acc, [x, y], i) => acc + (i === 0 ? `M${x},${y}` : ` L${x},${y}`),
    '',
  )
  const last = points[points.length - 1]

  return (
    <svg
      width="100%"
      height={height}
      viewBox={`0 0 100 ${height}`}
      preserveAspectRatio="none"
    >
      <path
        d={path}
        fill="none"
        stroke={color}
        strokeWidth="1.2"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      {last && <circle cx={last[0]} cy={last[1]} r={1.6} fill={color} />}
    </svg>
  )
}

export function WorkspaceView() {
  const datum = TODAY.toLocaleDateString('sv-SE', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  })
  const klocka = '09:42'

  const projTotal = ov.projekt.total || 1
  const projColors = [
    'bg-emerald-400/80',
    'bg-blue-400/70',
    'bg-amber-400/70',
    'bg-fg/50',
    'bg-muted/60',
  ]

  const tidMax = Math.max(...ov.tidplan.per_dag_denna_vecka.map((d) => d.count), 1)
  const todayKey = '2026-05-06'

  const kostDelta =
    ((ov.kostnader.denna_manad - ov.kostnader.foregaende_manad) /
      ov.kostnader.foregaende_manad) *
    100
  const positive = kostDelta >= 0

  return (
    <div className="flex h-full flex-col">
      {/* Header */}
      <div className="flex shrink-0 items-center justify-between border-b border-border bg-sidebar px-5 py-2.5">
        <div>
          <div className="text-[9px] uppercase tracking-[0.2em] text-muted">
            Workspace
          </div>
          <div className="text-xs text-fg first-letter:uppercase">
            {datum}{' '}
            <span className="ml-1.5 font-mono text-muted">{klocka}</span>
          </div>
        </div>
        <button className="flex items-center gap-1.5 rounded px-2 py-1 text-[10px] text-muted transition-colors hover:bg-hover hover:text-fg">
          <RefreshCw size={11} />
          Uppdatera
        </button>
      </div>

      {/* Bento — 4 rows × 12 cols */}
      <div className="flex-1 bg-fg/15 p-px">
        <div
          className="grid h-full gap-px"
          style={{
            gridTemplateColumns: 'repeat(12, minmax(0, 1fr))',
            gridTemplateRows: 'repeat(4, minmax(0, 1fr))',
          }}
        >
          {/* Row 1-2 — Heroes */}

          {/* KUNDER */}
          <Tile title="Kunder" className="col-span-3 row-span-2">
            <div className="flex items-baseline gap-2">
              <span className="text-[28px] font-semibold leading-none text-fg tabular-nums">
                {fmt.format(ov.kunder.total)}
              </span>
              <span className="text-[10px] tabular-nums text-emerald-400">
                +{ov.kunder.nya_senaste_vecka}
              </span>
            </div>
            <div className="mt-0.5 text-[10px] text-muted">senaste 30d</div>
            <div className="mt-2 flex flex-1 items-end text-fg/60">
              <Sparkline data={ov.kunder.sparkline_30d} height={32} />
            </div>
          </Tile>

          {/* PROJEKT PIPELINE */}
          <Tile title="Projekt — pipeline" className="col-span-6 row-span-2">
            <div className="flex items-baseline gap-2.5">
              <span className="text-[28px] font-semibold leading-none text-fg tabular-nums">
                {ov.projekt.total}
              </span>
              <span className="text-[10px] text-muted">totalt</span>
            </div>
            <div className="mt-2.5 flex h-1.5 w-full overflow-hidden rounded-sm">
              {ov.projekt.per_status.map((s, i) => (
                <div
                  key={s.status}
                  className={projColors[i % projColors.length]}
                  style={{ width: `${(s.count / projTotal) * 100}%` }}
                />
              ))}
            </div>
            <div className="mt-2.5 grid flex-1 grid-cols-2 content-start gap-x-3 gap-y-1">
              {ov.projekt.per_status.slice(0, 5).map((s, i) => (
                <div key={s.status} className="flex min-w-0 items-center gap-1.5">
                  <span
                    className={`size-1.5 shrink-0 rounded-sm ${projColors[i % projColors.length]}`}
                  />
                  <span className="text-[10px] tabular-nums text-fg">
                    {s.count}
                  </span>
                  <span className="truncate text-[10px] text-muted">
                    {s.status}
                  </span>
                </div>
              ))}
            </div>
          </Tile>

          {/* AI */}
          <Tile title="AI · Workflows" className="col-span-3 row-span-2">
            <div className="flex flex-col gap-1.5">
              <div className="text-[9px] uppercase tracking-[0.14em] text-subtle">
                Leverantörer
              </div>
              <div className="grid grid-cols-2 gap-x-2 gap-y-1">
                {ov.ai.leverantorer.map((p) => (
                  <div
                    key={p.slug}
                    className="flex min-w-0 items-center gap-1.5"
                  >
                    <span
                      className={`size-1.5 shrink-0 rounded-full ${
                        p.status === 'ok'
                          ? 'bg-emerald-400'
                          : p.status === 'no_key'
                            ? 'bg-amber-400'
                            : 'bg-subtle'
                      }`}
                    />
                    <span className="truncate text-[10px] text-fg">
                      {p.namn}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-auto flex flex-col border-t border-fg/15 pt-1">
              {[
                ['Assistenter', ov.ai.assistenter_aktiva],
                ['Flöden', ov.ai.workflows_aktiva],
                ['Noder', ov.ai.noder_count],
                ['Kontext', ov.ai.kontext_count],
              ].map(([label, value]) => (
                <div
                  key={label as string}
                  className="flex items-center justify-between border-b border-fg/10 py-0.5 last:border-b-0"
                >
                  <span className="text-[10px] text-muted">{label}</span>
                  <span className="text-[10px] tabular-nums text-fg">
                    {value}
                  </span>
                </div>
              ))}
            </div>
          </Tile>

          {/* Row 3 — pipeline & period */}

          <Tile title="Förslag" className="col-span-3 row-span-1">
            <div className="flex items-baseline gap-1.5">
              <span className="text-base font-semibold leading-none tabular-nums text-fg">
                {ov.forslag.total}
              </span>
              <span className="text-[9px] text-muted">totalt</span>
            </div>
            <div className="mt-1.5 space-y-0.5">
              {ov.forslag.per_status.slice(0, 2).map((s) => (
                <div
                  key={s.status}
                  className="flex justify-between text-[10px]"
                >
                  <span className="truncate text-muted">{s.status}</span>
                  <span className="tabular-nums text-fg">{s.count}</span>
                </div>
              ))}
            </div>
          </Tile>

          <Tile title="Order" className="col-span-3 row-span-1">
            <div className="flex items-baseline gap-1.5">
              <span className="text-base font-semibold leading-none tabular-nums text-fg">
                {ov.ordrar.total}
              </span>
              <span className="text-[9px] text-muted">totalt</span>
            </div>
            <div className="mt-auto pt-1 text-[10px] tabular-nums text-subtle">
              Aktivt: {fmtSEK(ov.ordrar.belopp_aktiva)}
            </div>
          </Tile>

          {/* TIDPLAN — week heatmap */}
          <Tile title="Tidplan — denna vecka" className="col-span-3 row-span-1">
            <div className="flex items-baseline gap-2.5">
              <div>
                <div className="text-base font-semibold leading-none tabular-nums text-fg">
                  {ov.tidplan.idag}
                </div>
                <div className="text-[9px] text-muted">idag</div>
              </div>
              <div>
                <div className="text-xs font-medium leading-none tabular-nums text-muted">
                  {ov.tidplan.imorgon}
                </div>
                <div className="text-[9px] text-subtle">imorgon</div>
              </div>
            </div>
            <div className="mt-auto grid grid-cols-7 gap-0.5">
              {ov.tidplan.per_dag_denna_vecka.map((d, i) => {
                const h = d.count > 0 ? Math.max((d.count / tidMax) * 100, 25) : 0
                const isToday = d.datum === todayKey
                return (
                  <div
                    key={d.datum}
                    className="flex flex-col items-center gap-0.5"
                  >
                    <div className="relative flex h-4 w-full items-end">
                      {d.count > 0 ? (
                        <div
                          className={`w-full rounded-sm ${isToday ? 'bg-emerald-400' : 'bg-fg/40'}`}
                          style={{ height: `${h}%` }}
                        />
                      ) : (
                        <div
                          className={`h-px w-full ${isToday ? 'bg-emerald-400/60' : 'bg-fg/15'}`}
                        />
                      )}
                    </div>
                    <span
                      className={`text-[8px] ${isToday ? 'font-medium text-emerald-400' : 'text-muted'}`}
                    >
                      {SV_DAYS[i]}
                    </span>
                  </div>
                )
              })}
            </div>
          </Tile>

          {/* KOSTNADER */}
          <Tile title="Kostnader" className="col-span-3 row-span-1">
            <div className="flex items-baseline gap-1.5">
              <span className="text-sm font-semibold leading-none tabular-nums text-fg">
                {fmtSEK(ov.kostnader.denna_manad)}
              </span>
              <span
                className={`text-[10px] tabular-nums ${
                  positive ? 'text-amber-400' : 'text-emerald-400'
                }`}
              >
                {positive ? '↑' : '↓'} {Math.abs(kostDelta).toFixed(0)}%
              </span>
            </div>
            <div className="text-[9px] text-muted">denna månad</div>
            <div className="mt-auto flex items-end text-fg/60">
              <Sparkline data={ov.kostnader.sparkline_12m} height={20} />
            </div>
          </Tile>

          {/* Row 4 — comms & people */}

          <Tile
            title="Signera"
            className="col-span-2 row-span-1"
            pulse={ov.signatur.vantande > 0}
          >
            <div
              className={`text-base font-semibold leading-none tabular-nums ${
                ov.signatur.vantande > 0 ? 'text-amber-400' : 'text-fg'
              }`}
            >
              {ov.signatur.vantande}
            </div>
            <div className="mt-0.5 text-[9px] text-muted">
              {ov.signatur.signerade_30d} signerade 30d
            </div>
          </Tile>

          <Tile title="Kalender" className="col-span-2 row-span-1">
            <div className="text-base font-semibold leading-none tabular-nums text-fg">
              {ov.kalender.idag}
            </div>
            <div className="text-[9px] text-muted">möten idag</div>
            {ov.kalender.nasta_handelser[0] && (
              <div className="mt-auto truncate text-[9px] text-subtle">
                <span className="font-mono text-fg/70">
                  {HourMin(ov.kalender.nasta_handelser[0].start)}
                </span>{' '}
                {ov.kalender.nasta_handelser[0].titel}
              </div>
            )}
          </Tile>

          <Tile
            title="Personal"
            className="col-span-3 row-span-1"
            pulse={ov.personal.tidrapporter_inskickade > 0}
          >
            <div className="flex items-baseline gap-1.5">
              <span className="text-base font-semibold leading-none tabular-nums text-fg">
                {ov.personal.aktiva}
              </span>
              <span className="text-[9px] text-muted">
                aktiva · {ov.personal.total} totalt
              </span>
            </div>
            <div className="mt-auto pt-1 text-[10px]">
              <span className="tabular-nums text-amber-400">
                {ov.personal.tidrapporter_inskickade}
              </span>{' '}
              <span className="text-muted">tidrapporter att godkänna</span>
            </div>
          </Tile>

          <Tile title="Fortnox" className="col-span-3 row-span-1">
            <div className="flex items-center gap-1.5">
              <span className="size-1.5 rounded-full bg-emerald-400" />
              <span className="text-xs font-medium text-fg">Synkad</span>
            </div>
            <div className="mt-auto pt-1 font-mono text-[9px] text-muted">
              {new Date(ov.fortnox.senaste_synk).toLocaleString('sv-SE', {
                dateStyle: 'short',
                timeStyle: 'short',
              })}
            </div>
          </Tile>

          <Tile title="Fakturering" className="col-span-2 row-span-1">
            <div className="text-base font-semibold leading-none tabular-nums text-fg">
              {ov.fakturering.antal_planer}
            </div>
            <div className="text-[9px] text-muted">planer</div>
            {ov.fakturering.nasta_forfall && (
              <div className="mt-auto pt-1">
                <div className="font-mono text-[9px] text-muted">
                  {ov.fakturering.nasta_forfall.datum}
                </div>
                <div className="text-[10px] tabular-nums text-fg">
                  {fmtSEK(ov.fakturering.nasta_forfall.belopp)}
                </div>
              </div>
            )}
          </Tile>
        </div>
      </div>
    </div>
  )
}
