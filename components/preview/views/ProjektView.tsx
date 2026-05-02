'use client'

import { useState } from 'react'
import { ArrowLeft, Pencil, Trash2, Send } from 'lucide-react'
import {
  type Anteckning,
  type Aktivitet,
  ANTECKNING_DOT,
} from '@/lib/fixtures/types'
import { projekt, anteckningar, aktiviteter } from '@/lib/fixtures/data'

const STATUSAR = [
  { namn: 'Planerad', farg: 'muted' as const },
  { namn: 'Förberedelse', farg: 'blue' as const },
  { namn: 'Pågående', farg: 'emerald' as const },
  { namn: 'Slutbesiktning', farg: 'amber' as const },
  { namn: 'Avslutad', farg: 'muted' as const },
]

const FARG_DOT: Record<string, string> = {
  emerald: 'bg-emerald-400',
  blue: 'bg-blue-400',
  amber: 'bg-amber-400',
  red: 'bg-red-400',
  muted: 'bg-muted',
}

const FARG_TEXT: Record<string, string> = {
  emerald: 'text-emerald-400',
  blue: 'text-blue-400',
  amber: 'text-amber-400',
  red: 'text-red-400',
  muted: 'text-muted',
}

function fmtCurrency(n: number): string {
  return new Intl.NumberFormat('sv-SE', { maximumFractionDigits: 0 }).format(n) + ' SEK'
}

function fmtDate(d: string): string {
  return new Date(d).toLocaleDateString('sv-SE')
}

function fmtDateTime(d: string): string {
  return new Date(d).toLocaleString('sv-SE', {
    dateStyle: 'short',
    timeStyle: 'short',
  })
}

type TimelineItem =
  | { kind: 'anteckning'; data: Anteckning }
  | { kind: 'aktivitet'; data: Aktivitet }

export function ProjektView() {
  const [currentStatus, setCurrentStatus] = useState(projekt.status)
  const [tab, setTab] = useState<'anteckningar' | 'dokument' | 'betalningsplan'>(
    'anteckningar',
  )

  const items: TimelineItem[] = [
    ...anteckningar.map((a) => ({ kind: 'anteckning' as const, data: a })),
    ...aktiviteter.map((a) => ({ kind: 'aktivitet' as const, data: a })),
  ].sort(
    (a, b) =>
      new Date(a.data.skapad_at).getTime() -
      new Date(b.data.skapad_at).getTime(),
  )

  return (
    <div className="flex h-full flex-col">
      {/* Header */}
      <div className="flex shrink-0 flex-wrap items-center justify-between gap-2 border-b border-border bg-sidebar px-4 py-3 md:flex-nowrap md:gap-4 md:px-6">
        <div className="flex min-w-0 flex-1 items-center gap-3">
          <button className="flex shrink-0 items-center gap-1.5 text-sm text-muted transition-colors hover:text-fg">
            <ArrowLeft size={14} />
            Projekt
          </button>
          <span className="shrink-0 text-subtle">/</span>
          <span className="min-w-0 shrink truncate text-sm font-medium text-fg">
            {projekt.projekt_nummer} — {projekt.namn}
          </span>
          <div className="hidden min-w-0 items-center overflow-x-auto md:flex">
            {STATUSAR.map((s, i) => {
              const active = s.namn === currentStatus
              return (
                <div key={s.namn} className="flex shrink-0 items-center">
                  {i > 0 && <div className="h-px w-6 bg-subtle/70" />}
                  <button
                    onClick={() => setCurrentStatus(s.namn)}
                    className={`flex shrink-0 items-center gap-1.5 rounded-full px-2 py-1 text-[11px] transition-colors ${
                      active
                        ? 'cursor-default border border-border bg-elevated'
                        : 'border border-transparent text-muted hover:bg-hover hover:text-fg'
                    }`}
                  >
                    <span
                      className={`size-2 rounded-full ${
                        active ? FARG_DOT[s.farg] : 'border border-subtle'
                      }`}
                    />
                    <span className={active ? FARG_TEXT[s.farg] : ''}>
                      {s.namn}
                    </span>
                  </button>
                </div>
              )
            })}
          </div>
        </div>
        <div className="hidden items-center gap-2 sm:flex">
          <button className="flex items-center gap-1.5 rounded-lg border border-border bg-elevated px-3 py-1.5 text-xs text-fg transition-colors hover:bg-hover">
            <Pencil size={12} /> Redigera
          </button>
          <button className="flex items-center gap-1.5 rounded-lg border border-border bg-elevated px-3 py-1.5 text-xs text-muted transition-colors hover:border-red-400/30 hover:text-red-400">
            <Trash2 size={12} /> Ta bort
          </button>
        </div>
      </div>

      {/* Body */}
      <div className="flex min-h-0 flex-1">
        {/* Main column */}
        <div className="flex flex-1 flex-col overflow-auto">
          {/* Title block */}
          <div className="border-b border-border px-4 py-5 md:px-6 md:py-6 lg:px-8">
            <p className="mb-0.5 text-[11px] uppercase tracking-widest text-muted">
              {projekt.projekt_nummer}
            </p>
            <h2 className="text-xl font-semibold text-fg">{projekt.namn}</h2>
          </div>

          {/* Kund */}
          <DetailSection title="Kund">
            <DetailField label="Kundnummer" value={projekt.kundnummer} />
            <DetailField label="Kundnamn" value={projekt.kundnamn} />
          </DetailSection>

          {/* Projektinfo */}
          <DetailSection title="Projektinfo">
            <DetailField label="Status" value={currentStatus} />
            <DetailField
              label="Preliminär budget"
              value={fmtCurrency(projekt.budget_total)}
            />
            <DetailField label="Startdatum" value={fmtDate(projekt.startdatum)} />
            <DetailField label="Slutdatum" value={fmtDate(projekt.slutdatum)} />
            <DetailField
              label="Betalningsvillkor"
              value={projekt.betalningsvillkor}
            />
            <DetailField
              label="ROT-avdrag"
              value={
                projekt.rot_avdrag
                  ? `Ja — ${projekt.rot_procent}%`
                  : 'Nej'
              }
            />
            {projekt.beskrivning && (
              <>
                <div className="col-span-3 border-t border-border" />
                <div className="col-span-3 flex flex-col gap-1">
                  <span className="text-[11px] uppercase tracking-wider text-muted">
                    Beskrivning
                  </span>
                  <p className="text-sm leading-relaxed text-muted">
                    {projekt.beskrivning}
                  </p>
                </div>
              </>
            )}
          </DetailSection>

          {/* Arbetsplats */}
          <DetailSection title="Arbetsplats">
            <DetailField label="Adress" value={projekt.arbetsplats_adress} />
            <DetailField label="Stad" value={projekt.arbetsplats_stad} />
          </DetailSection>

          {/* Meta footer */}
          <div className="mt-auto flex flex-wrap items-center gap-x-6 gap-y-1 border-t border-border px-4 py-4 md:px-6 lg:px-8">
            <span className="text-xs text-subtle">
              Skapad:{' '}
              <span className="text-muted">{fmtDate(projekt.skapad_at)}</span>
            </span>
            <span className="text-xs text-subtle">
              Uppdaterad:{' '}
              <span className="text-muted">{fmtDate(projekt.uppdaterad_at)}</span>
            </span>
          </div>
        </div>

        {/* Right panel — desktop only, hidden under lg to keep main column readable */}
        <div className="hidden w-[320px] shrink-0 flex-col border-l border-border lg:flex xl:w-[360px]">
          <div className="flex shrink-0 border-b border-border">
            {(
              [
                ['anteckningar', 'Anteckningar', anteckningar.length],
                ['dokument', 'Dokument', 4],
                ['betalningsplan', 'Betalningsplan', 3],
              ] as const
            ).map(([key, label, count]) => (
              <button
                key={key}
                onClick={() => setTab(key)}
                className={`flex items-center gap-1.5 border-b-2 px-3 py-3 text-[11px] font-semibold uppercase tracking-wider transition-colors ${
                  tab === key
                    ? 'border-fg text-fg'
                    : 'border-transparent text-muted hover:text-fg'
                }`}
              >
                {label}
                <span className="rounded-full border border-border bg-elevated px-1.5 py-0.5 text-[10px]">
                  {count}
                </span>
              </button>
            ))}
          </div>

          {tab === 'anteckningar' && (
            <div className="flex min-h-0 flex-1 flex-col">
              <div className="flex-1 overflow-auto">
                <div className="relative py-4">
                  <div className="absolute bottom-0 left-[27px] top-0 w-px bg-border" />
                  {items.map((item) => {
                    if (item.kind === 'aktivitet') {
                      return (
                        <div
                          key={`akt-${item.data.id}`}
                          className="relative flex gap-3 px-4 pb-4"
                        >
                          <div className="relative z-10 ml-[1px] mt-1 size-2 shrink-0 rounded-full border border-subtle bg-subtle" />
                          <div className="min-w-0 flex-1">
                            <p className="text-[11px] italic text-subtle">
                              {item.data.text}
                            </p>
                            <p className="mt-0.5 text-[10px] text-subtle/60">
                              {fmtDateTime(item.data.skapad_at)}
                            </p>
                          </div>
                        </div>
                      )
                    }
                    const a = item.data
                    return (
                      <div
                        key={a.id}
                        className="group relative flex gap-3 px-4 pb-5 last:pb-2"
                      >
                        <div className="relative mt-1 flex shrink-0 flex-col items-center">
                          <div
                            className={`relative z-10 size-2.5 rounded-full border-2 ${ANTECKNING_DOT[a.farg]}`}
                          />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-start justify-between gap-2">
                            <span className="text-xs font-semibold leading-relaxed text-fg">
                              {a.titel}
                            </span>
                            <div className="mt-0.5 flex shrink-0 items-center gap-0.5 opacity-0 transition-all group-hover:opacity-100">
                              <button className="p-1 text-subtle hover:text-fg">
                                <Pencil size={11} />
                              </button>
                              <button className="p-1 text-subtle hover:text-red-400">
                                <Trash2 size={11} />
                              </button>
                            </div>
                          </div>
                          <p className="mt-0.5 text-[11px] text-subtle">
                            {fmtDateTime(a.skapad_at)}
                          </p>
                          {a.innehall && (
                            <p className="mt-1.5 text-xs leading-relaxed text-muted">
                              {a.innehall.length > 90
                                ? a.innehall.slice(0, 90) + '…'
                                : a.innehall}
                            </p>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              <form className="flex shrink-0 flex-col gap-2 border-t border-border p-4">
                <input className="input text-xs" placeholder="Titel *" readOnly />
                <div className="flex items-center gap-1.5">
                  {(
                    ['muted', 'emerald', 'amber', 'red', 'blue'] as const
                  ).map((c) => (
                    <button
                      key={c}
                      type="button"
                      className={`size-3 rounded-full border-2 opacity-50 ${ANTECKNING_DOT[c]}`}
                    />
                  ))}
                </div>
                <textarea
                  className="input resize-none text-xs"
                  rows={3}
                  placeholder="Innehåll (valfritt)..."
                  readOnly
                />
                <button
                  type="button"
                  disabled
                  className="flex items-center justify-center gap-1.5 rounded-lg bg-fg px-3 py-1.5 text-xs font-medium text-bg opacity-30"
                >
                  <Send size={11} /> Lägg till anteckning
                </button>
              </form>
            </div>
          )}

          {tab !== 'anteckningar' && (
            <div className="flex flex-1 items-center justify-center p-6">
              <p className="text-center text-xs text-subtle">
                {tab === 'dokument' ? '4 dokument uppladdade' : 'Betalningsplan i 3 etapper'}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function DetailSection({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <div className="border-b border-border px-8 py-6">
      <p className="mb-4 text-[11px] uppercase tracking-widest text-muted">
        {title}
      </p>
      <div className="grid grid-cols-3 gap-x-8 gap-y-5">{children}</div>
    </div>
  )
}

function DetailField({
  label,
  value,
}: {
  label: string
  value: string | null | undefined
}) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-[11px] uppercase tracking-wider text-muted">
        {label}
      </span>
      <span className="text-sm text-fg">{value ?? '—'}</span>
    </div>
  )
}
