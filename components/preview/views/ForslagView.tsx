'use client'

import { ArrowLeft, Pencil, Send, Check, FileDown } from 'lucide-react'
import { forslag } from '@/lib/fixtures/data'

const ROT_CAP_SINGLE = 50000
const ROT_CAP_DOUBLE = 100000

function fmtCurrency(n: number): string {
  return new Intl.NumberFormat('sv-SE', { maximumFractionDigits: 0 }).format(n) + ' SEK'
}

const STATUS_CONFIG: Record<
  string,
  { label: string; dot: string; text: string }
> = {
  utkast: { label: 'Utkast', dot: 'bg-muted', text: 'text-muted' },
  skickat: { label: 'Skickat', dot: 'bg-blue-400', text: 'text-blue-400' },
  accepterat: {
    label: 'Accepterat',
    dot: 'bg-emerald-400',
    text: 'text-emerald-400',
  },
  avvisat: { label: 'Avvisat', dot: 'bg-red-400', text: 'text-red-400' },
}

export function ForslagView() {
  const totals = forslag.faser.map((fas) => {
    const arbete = fas.arbete.reduce(
      (s, a) => s + a.timmar * a.timpris,
      0,
    )
    const material = fas.material.reduce(
      (s, m) => s + m.antal * m.a_pris,
      0,
    )
    return { fasId: fas.id, arbete, material, total: arbete + material }
  })

  const totalArbete = totals.reduce((s, t) => s + t.arbete, 0)
  const totalMaterial = totals.reduce((s, t) => s + t.material, 0)
  const subtotal = totalArbete + totalMaterial

  let rotAvdragBelopp = 0
  if (forslag.rot_avdrag) {
    const cap = forslag.rot_inkludera_medsokande
      ? ROT_CAP_DOUBLE
      : ROT_CAP_SINGLE
    rotAvdragBelopp = Math.min(
      totalArbete * (forslag.rot_procent / 100),
      cap,
    )
  }

  const netto = subtotal - rotAvdragBelopp
  const moms = netto * (forslag.moms_procent / 100)
  const totalt = netto + moms

  const status = STATUS_CONFIG[forslag.status]

  return (
    <div className="flex h-full flex-col">
      {/* Header */}
      <div className="flex shrink-0 flex-wrap items-center justify-between gap-2 border-b border-border bg-sidebar px-4 py-3 md:flex-nowrap md:gap-4 md:px-6">
        <div className="flex min-w-0 flex-1 items-center gap-3">
          <button className="flex shrink-0 items-center gap-1.5 text-sm text-muted transition-colors hover:text-fg">
            <ArrowLeft size={14} />
            Förslag
          </button>
          <span className="shrink-0 text-subtle">/</span>
          <span className="min-w-0 shrink truncate text-sm font-medium text-fg">
            {forslag.forslag_nummer} — {forslag.titel}
          </span>
          <div className="hidden shrink-0 items-center gap-1.5 rounded-full border border-border bg-elevated px-2.5 py-1 sm:flex">
            <span className={`size-1.5 rounded-full ${status.dot}`} />
            <span className={`text-[11px] ${status.text}`}>{status.label}</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="hidden items-center gap-1.5 rounded-lg border border-border bg-elevated px-3 py-1.5 text-xs text-fg transition-colors hover:bg-hover sm:flex">
            <FileDown size={12} /> PDF
          </button>
          <button className="hidden items-center gap-1.5 rounded-lg border border-border bg-elevated px-3 py-1.5 text-xs text-fg transition-colors hover:bg-hover md:flex">
            <Pencil size={12} /> Redigera
          </button>
          <button className="flex items-center gap-1.5 rounded-lg bg-fg px-3 py-1.5 text-xs font-medium text-bg transition-opacity hover:opacity-90">
            <Send size={12} />
            <span className="hidden sm:inline">Skicka för signatur</span>
            <span className="sm:hidden">Skicka</span>
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
              {forslag.forslag_nummer} · {forslag.kundnamn}
            </p>
            <h2 className="text-xl font-semibold text-fg">{forslag.titel}</h2>
            <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px]">
              <span className="text-subtle">
                Projekt:{' '}
                <span className="font-mono text-muted">
                  {forslag.projekt_namn}
                </span>
              </span>
              <span className="text-subtle">
                Skapat:{' '}
                <span className="text-muted">
                  {new Date(forslag.skapad_at).toLocaleDateString('sv-SE')}
                </span>
              </span>
            </div>
          </div>

          {/* Faser */}
          {forslag.faser.map((fas, i) => {
            const t = totals[i]
            return (
              <div key={fas.id} className="border-b border-border px-4 py-5 md:px-6 md:py-6 lg:px-8">
                <div className="mb-4 flex items-center justify-between">
                  <p className="text-[11px] uppercase tracking-widest text-muted">
                    Fas {i + 1} · {fas.namn}
                  </p>
                  <span className="font-mono text-xs text-fg">
                    {fmtCurrency(t.total)}
                  </span>
                </div>

                {/* Arbete */}
                {fas.arbete.length > 0 && (
                  <div className="mb-3">
                    <table className="w-full text-xs">
                      <thead>
                        <tr className="border-b border-border text-left">
                          <th className="py-1.5 text-[10px] font-medium uppercase tracking-wider text-subtle">
                            Arbete
                          </th>
                          <th className="w-16 py-1.5 text-right text-[10px] font-medium uppercase tracking-wider text-subtle">
                            Tim
                          </th>
                          <th className="w-20 py-1.5 text-right text-[10px] font-medium uppercase tracking-wider text-subtle">
                            á-pris
                          </th>
                          <th className="w-24 py-1.5 text-right text-[10px] font-medium uppercase tracking-wider text-subtle">
                            Summa
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {fas.arbete.map((row, idx) => (
                          <tr
                            key={idx}
                            className="border-b border-border/50 last:border-0"
                          >
                            <td className="py-1.5 text-fg">{row.beskrivning}</td>
                            <td className="py-1.5 text-right font-mono text-muted">
                              {row.timmar}
                            </td>
                            <td className="py-1.5 text-right font-mono text-muted">
                              {row.timpris}
                            </td>
                            <td className="py-1.5 text-right font-mono text-fg">
                              {fmtCurrency(row.timmar * row.timpris)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {/* Material */}
                {fas.material.length > 0 && (
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="border-b border-border text-left">
                        <th className="py-1.5 text-[10px] font-medium uppercase tracking-wider text-subtle">
                          Material
                        </th>
                        <th className="w-16 py-1.5 text-right text-[10px] font-medium uppercase tracking-wider text-subtle">
                          Antal
                        </th>
                        <th className="w-20 py-1.5 text-right text-[10px] font-medium uppercase tracking-wider text-subtle">
                          á-pris
                        </th>
                        <th className="w-24 py-1.5 text-right text-[10px] font-medium uppercase tracking-wider text-subtle">
                          Summa
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {fas.material.map((row, idx) => (
                        <tr
                          key={idx}
                          className="border-b border-border/50 last:border-0"
                        >
                          <td className="py-1.5 text-fg">{row.beskrivning}</td>
                          <td className="py-1.5 text-right font-mono text-muted">
                            {row.antal} {row.enhet}
                          </td>
                          <td className="py-1.5 text-right font-mono text-muted">
                            {row.a_pris}
                          </td>
                          <td className="py-1.5 text-right font-mono text-fg">
                            {fmtCurrency(row.antal * row.a_pris)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            )
          })}
        </div>

        {/* Right panel — totals */}
        <div className="flex w-[320px] shrink-0 flex-col overflow-auto border-l border-border bg-sidebar">
          <div className="shrink-0 border-b border-border px-5 py-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted">
              Kostnadssummering
            </p>
          </div>

          <div className="px-5 py-5">
            <SumRow label="Arbetskostnad" value={fmtCurrency(totalArbete)} />
            <SumRow label="Materialkostnad" value={fmtCurrency(totalMaterial)} />
            <div className="my-2 border-t border-border" />
            <SumRow label="Subtotal" value={fmtCurrency(subtotal)} />
            {forslag.rot_avdrag && rotAvdragBelopp > 0 && (
              <SumRow
                label={`ROT-avdrag ${forslag.rot_procent}%`}
                value={`− ${fmtCurrency(rotAvdragBelopp)}`}
                accent="emerald"
              />
            )}
            <SumRow label="Netto" value={fmtCurrency(netto)} />
            <SumRow
              label={`Moms ${forslag.moms_procent}%`}
              value={`+ ${fmtCurrency(moms)}`}
            />
            <div className="my-2 border-t border-border" />
            <SumRow label="TOTALT inkl. moms" value={fmtCurrency(totalt)} highlight />
          </div>

          {/* Signatur */}
          <div className="border-t border-border px-5 py-5">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted">
              Signering
            </p>
            <div className="mt-4 space-y-3">
              {[
                { label: 'Skickat till kund', done: true },
                { label: 'Öppnat av kund', done: true },
                { label: 'Signerat av kund', done: true },
              ].map((s, i) => (
                <div key={i} className="flex items-center gap-2.5">
                  <div
                    className={`flex size-5 items-center justify-center rounded-full ${
                      s.done
                        ? 'bg-emerald-500/15 text-emerald-400'
                        : 'border border-border text-subtle'
                    }`}
                  >
                    {s.done && <Check size={11} />}
                  </div>
                  <span
                    className={`text-xs ${s.done ? 'text-fg' : 'text-subtle'}`}
                  >
                    {s.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Acceptance */}
          <div className="mt-auto border-t border-border bg-emerald-500/5 px-5 py-5">
            <div className="mb-2 flex items-center gap-2 text-emerald-400">
              <Check size={14} />
              <span className="text-xs font-semibold uppercase tracking-wider">
                Accepterat av kund
              </span>
            </div>
            <p className="text-xs text-muted">Karlsson Bygg AB</p>
            <p className="mt-1 font-mono text-[11px] text-subtle">
              2026-03-04 14:22
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

function SumRow({
  label,
  value,
  highlight,
  accent,
}: {
  label: string
  value: string
  highlight?: boolean
  accent?: 'emerald'
}) {
  const valColor = highlight
    ? 'text-fg font-semibold'
    : accent === 'emerald'
      ? 'text-emerald-400'
      : 'text-muted'

  return (
    <div
      className={`flex items-center justify-between py-1.5 ${
        highlight ? 'text-fg font-semibold' : ''
      }`}
    >
      <span className={highlight ? 'text-sm' : 'text-xs text-muted'}>
        {label}
      </span>
      <span className={`${highlight ? 'text-sm' : 'text-xs'} font-mono ${valColor}`}>
        {value}
      </span>
    </div>
  )
}
