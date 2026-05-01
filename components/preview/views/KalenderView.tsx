'use client'

import { useState } from 'react'
import {
  ChevronLeft,
  ChevronRight,
  Plus,
  Briefcase,
  MapPin,
  Truck,
  Users,
  type LucideIcon,
} from 'lucide-react'
import { kalenderEvents } from '@/lib/fixtures/data'
import type { KalenderEvent } from '@/lib/fixtures/types'

const TYP: Record<
  KalenderEvent['typ'],
  { label: string; color: string; bg: string; icon: LucideIcon }
> = {
  uppgift: {
    label: 'Uppgift',
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/10 border-emerald-500/30',
    icon: Briefcase,
  },
  besok: {
    label: 'Besök',
    color: 'text-blue-400',
    bg: 'bg-blue-500/10 border-blue-500/30',
    icon: MapPin,
  },
  leverans: {
    label: 'Leverans',
    color: 'text-amber-400',
    bg: 'bg-amber-500/10 border-amber-500/30',
    icon: Truck,
  },
  mote: {
    label: 'Möte',
    color: 'text-violet-400',
    bg: 'bg-violet-500/10 border-violet-500/30',
    icon: Users,
  },
}

const VECKODAGAR = ['Mån', 'Tis', 'Ons', 'Tor', 'Fre', 'Lör', 'Sön']

const MANADER = [
  'Januari',
  'Februari',
  'Mars',
  'April',
  'Maj',
  'Juni',
  'Juli',
  'Augusti',
  'September',
  'Oktober',
  'November',
  'December',
]

function buildMonthGrid(year: number, month: number): Date[] {
  const first = new Date(year, month, 1)
  const dayOfWeek = (first.getDay() + 6) % 7 // Monday-first
  const start = new Date(year, month, 1 - dayOfWeek)
  return Array.from({ length: 42 }, (_, i) => {
    const d = new Date(start)
    d.setDate(start.getDate() + i)
    return d
  })
}

function eventsForDay(d: Date): KalenderEvent[] {
  return kalenderEvents.filter((e) => {
    const dt = new Date(e.start)
    return (
      dt.getFullYear() === d.getFullYear() &&
      dt.getMonth() === d.getMonth() &&
      dt.getDate() === d.getDate()
    )
  })
}

export function KalenderView() {
  const [cursor, setCursor] = useState(new Date(2026, 4, 1))
  const [selected, setSelected] = useState<KalenderEvent | null>(
    kalenderEvents[0] ?? null,
  )

  const year = cursor.getFullYear()
  const month = cursor.getMonth()
  const days = buildMonthGrid(year, month)
  const today = new Date(2026, 4, 5)

  return (
    <div className="flex h-full flex-col">
      {/* Header */}
      <div className="flex shrink-0 items-center gap-4 border-b border-border bg-sidebar px-6 py-3">
        <h1 className="text-base font-semibold text-fg">Schema</h1>

        <div className="flex items-center gap-1">
          <button
            onClick={() => setCursor(new Date(year, month - 1, 1))}
            className="rounded p-1.5 text-muted transition-colors hover:bg-hover hover:text-fg"
          >
            <ChevronLeft size={14} />
          </button>
          <span className="min-w-[140px] text-center text-sm font-medium text-fg">
            {MANADER[month]} {year}
          </span>
          <button
            onClick={() => setCursor(new Date(year, month + 1, 1))}
            className="rounded p-1.5 text-muted transition-colors hover:bg-hover hover:text-fg"
          >
            <ChevronRight size={14} />
          </button>
        </div>

        <div className="flex items-center gap-1 rounded-md border border-border bg-elevated p-0.5">
          {(['Månad', 'Vecka', 'Dag'] as const).map((v, i) => (
            <button
              key={v}
              className={`rounded px-2.5 py-1 text-[11px] font-medium transition-colors ${
                i === 0 ? 'bg-hover text-fg' : 'text-muted hover:text-fg'
              }`}
            >
              {v}
            </button>
          ))}
        </div>

        <div className="ml-auto flex items-center gap-3">
          {Object.entries(TYP).map(([k, v]) => (
            <div key={k} className="flex items-center gap-1.5 text-[11px] text-muted">
              <span className={`size-1.5 rounded-full ${v.color.replace('text-', 'bg-')}`} />
              {v.label}
            </div>
          ))}
        </div>

        <button className="flex items-center gap-1.5 rounded-lg border border-border bg-elevated px-3 py-1.5 text-sm text-fg transition-colors hover:bg-hover">
          <Plus size={14} /> Ny händelse
        </button>
      </div>

      {/* Body */}
      <div className="flex min-h-0 flex-1">
        {/* Calendar grid */}
        <div className="flex flex-1 flex-col overflow-hidden">
          {/* Week day headers */}
          <div className="grid grid-cols-7 border-b border-border bg-sidebar">
            {VECKODAGAR.map((d) => (
              <div
                key={d}
                className="px-3 py-2 text-[11px] font-medium uppercase tracking-wider text-muted"
              >
                {d}
              </div>
            ))}
          </div>

          {/* Days grid */}
          <div className="grid flex-1 grid-cols-7 grid-rows-6 overflow-hidden border-l border-border">
            {days.map((d, i) => {
              const inMonth = d.getMonth() === month
              const isToday =
                d.getFullYear() === today.getFullYear() &&
                d.getMonth() === today.getMonth() &&
                d.getDate() === today.getDate()
              const evs = eventsForDay(d)

              return (
                <div
                  key={i}
                  className={`flex flex-col gap-1 overflow-hidden border-b border-r border-border p-1.5 ${
                    inMonth ? '' : 'bg-bg/50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={`flex h-5 min-w-[20px] items-center justify-center rounded-full px-1 text-[11px] font-medium ${
                        isToday
                          ? 'bg-fg text-bg'
                          : inMonth
                            ? 'text-fg'
                            : 'text-subtle'
                      }`}
                    >
                      {d.getDate()}
                    </span>
                  </div>
                  <div className="flex min-h-0 flex-col gap-0.5 overflow-hidden">
                    {evs.slice(0, 3).map((e) => {
                      const t = TYP[e.typ]
                      return (
                        <button
                          key={e.id}
                          onClick={() => setSelected(e)}
                          className={`truncate rounded border px-1.5 py-0.5 text-left text-[10px] transition-all hover:scale-[1.02] ${t.bg} ${t.color} ${
                            e.slutford ? 'opacity-50 line-through' : ''
                          }`}
                          title={e.titel}
                        >
                          {new Date(e.start).toLocaleTimeString('sv-SE', {
                            hour: '2-digit',
                            minute: '2-digit',
                          })}{' '}
                          {e.titel}
                        </button>
                      )
                    })}
                    {evs.length > 3 && (
                      <span className="px-1.5 text-[10px] text-subtle">
                        +{evs.length - 3} till
                      </span>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Right panel — selected event */}
        <div className="flex w-[300px] shrink-0 flex-col border-l border-border bg-sidebar">
          {selected ? (
            <>
              <div className="border-b border-border px-5 py-4">
                <p className="text-[11px] uppercase tracking-widest text-muted">
                  {TYP[selected.typ].label}
                </p>
                <h3 className="mt-1 text-sm font-semibold text-fg">
                  {selected.titel}
                </h3>
              </div>

              <div className="flex flex-col gap-4 overflow-auto px-5 py-5">
                <Field
                  label="Datum"
                  value={new Date(selected.start).toLocaleDateString('sv-SE', {
                    weekday: 'long',
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })}
                />
                <Field
                  label="Tid"
                  value={`${new Date(selected.start).toLocaleTimeString('sv-SE', {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}${
                    selected.end
                      ? ' – ' +
                        new Date(selected.end).toLocaleTimeString('sv-SE', {
                          hour: '2-digit',
                          minute: '2-digit',
                        })
                      : ''
                  }`}
                />
                {selected.projekt && (
                  <Field label="Projekt" value={selected.projekt} mono />
                )}
                <Field
                  label="Status"
                  value={selected.slutford ? 'Slutförd' : 'Planerad'}
                  color={
                    selected.slutford ? 'text-subtle line-through' : 'text-fg'
                  }
                />
              </div>

              <div className="mt-auto border-t border-border px-5 py-4">
                <button className="w-full rounded-lg border border-border bg-elevated py-2 text-xs text-fg transition-colors hover:bg-hover">
                  Markera som slutförd
                </button>
              </div>
            </>
          ) : (
            <div className="flex flex-1 items-center justify-center p-6">
              <p className="text-center text-xs text-subtle">
                Klicka en händelse för detaljer
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function Field({
  label,
  value,
  mono,
  color,
}: {
  label: string
  value: string
  mono?: boolean
  color?: string
}) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-[11px] uppercase tracking-wider text-muted">
        {label}
      </span>
      <span
        className={`text-sm ${color ?? 'text-fg'} ${mono ? 'font-mono text-xs' : ''}`}
      >
        {value}
      </span>
    </div>
  )
}
