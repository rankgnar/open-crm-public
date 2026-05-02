'use client'

import { useState, useRef, useEffect } from 'react'
import {
  Plus,
  Eye,
  EyeOff,
  Search,
  X,
  Trash2,
  ArrowUp,
  ArrowDown,
  ArrowUpDown,
} from 'lucide-react'
import {
  type Kund,
  type KundStatusar,
  KUND_FARG_DOT,
  KUND_FARG_TEXT,
} from '@/lib/fixtures/types'
import { kunder, kundStatusar } from '@/lib/fixtures/data'

function maskOrgNummer(value: string): string {
  if (value.length <= 4) return '••••••••'
  return '••••••' + value.slice(-4)
}

function StatusPicker({
  kund,
  statusar,
  onChange,
}: {
  kund: Kund
  statusar: KundStatusar[]
  onChange: (id: string, namn: string) => void
}) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const current = statusar.find((s) => s.namn === kund.status)

  useEffect(() => {
    if (!open) return
    function onDown(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', onDown)
    return () => document.removeEventListener('mousedown', onDown)
  }, [open])

  return (
    <div ref={ref} className="relative inline-flex">
      <button
        onClick={(e) => {
          e.stopPropagation()
          setOpen((v) => !v)
        }}
        className="inline-flex items-center gap-1.5 rounded px-1.5 py-0.5 text-xs transition-colors hover:bg-hover"
      >
        <span
          className={`size-1.5 shrink-0 rounded-full ${KUND_FARG_DOT[current?.farg ?? 'muted']}`}
        />
        <span className={KUND_FARG_TEXT[current?.farg ?? 'muted']}>
          {kund.status || '—'}
        </span>
      </button>

      {open && (
        <div className="absolute left-0 top-full z-20 mt-1 min-w-[130px] overflow-hidden rounded-lg border border-border bg-elevated shadow-lg">
          {statusar.map((s) => (
            <button
              key={s.id}
              onClick={(e) => {
                e.stopPropagation()
                onChange(kund.id, s.namn)
                setOpen(false)
              }}
              className={`flex w-full items-center gap-2 px-3 py-2 text-left text-xs transition-colors hover:bg-hover ${
                s.namn === kund.status ? 'bg-hover' : ''
              }`}
            >
              <span
                className={`size-1.5 shrink-0 rounded-full ${KUND_FARG_DOT[s.farg]}`}
              />
              <span className={KUND_FARG_TEXT[s.farg]}>{s.namn}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export function KunderView() {
  const [data, setData] = useState<Kund[]>(kunder)
  const [revealed, setRevealed] = useState<Set<string>>(new Set())
  const [query, setQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [selected, setSelected] = useState<Set<string>>(new Set())
  const [sortCol, setSortCol] = useState<string | null>(null)
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc')

  function handleSort(col: string) {
    if (sortCol === col) setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'))
    else {
      setSortCol(col)
      setSortDir('asc')
    }
  }

  function toggleReveal(e: React.MouseEvent, id: string) {
    e.stopPropagation()
    setRevealed((prev) => {
      const n = new Set(prev)
      n.has(id) ? n.delete(id) : n.add(id)
      return n
    })
  }

  function toggleSelect(e: React.MouseEvent, id: string) {
    e.stopPropagation()
    setSelected((prev) => {
      const n = new Set(prev)
      n.has(id) ? n.delete(id) : n.add(id)
      return n
    })
  }

  function changeStatus(id: string, namn: string) {
    setData((prev) => prev.map((k) => (k.id === id ? { ...k, status: namn } : k)))
  }

  const filtered = data.filter((k) => {
    const q = query.toLowerCase()
    const matchesQuery =
      !q ||
      [k.namn, k.kundnummer, k.email, k.telefon, k.stad, k.org_nummer].some(
        (v) => v?.toLowerCase().includes(q),
      )
    return matchesQuery && (!statusFilter || k.status === statusFilter)
  })

  const sorted = sortCol
    ? [...filtered].sort((a, b) => {
        const av = (a as unknown as Record<string, string>)[sortCol] ?? ''
        const bv = (b as unknown as Record<string, string>)[sortCol] ?? ''
        const cmp = String(av).localeCompare(String(bv), 'sv')
        return sortDir === 'asc' ? cmp : -cmp
      })
    : filtered

  const allFilteredSelected =
    filtered.length > 0 && filtered.every((k) => selected.has(k.id))

  function toggleAll(e: React.MouseEvent) {
    e.stopPropagation()
    setSelected(
      allFilteredSelected ? new Set() : new Set(filtered.map((k) => k.id)),
    )
  }

  const isFiltering = query !== '' || statusFilter !== ''

  return (
    <div className="flex h-full flex-col">
      {/* Header */}
      <div className="flex flex-wrap items-center gap-2 border-b border-border px-4 py-3 md:flex-nowrap md:gap-4 md:px-6">
        <div className="flex shrink-0 items-center gap-2.5">
          <h1 className="text-base font-semibold text-fg">Kunder</h1>
          <span className="rounded-full border border-border bg-elevated px-2 py-0.5 text-xs text-muted">
            {isFiltering ? `${filtered.length} / ${data.length}` : data.length}
          </span>
        </div>
        <div className="relative min-w-0 flex-1 md:max-w-xs">
          <Search
            size={13}
            className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-subtle"
          />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Sök..."
            className="input w-full pl-8 pr-7 text-sm"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-subtle transition-colors hover:text-fg"
            >
              <X size={12} />
            </button>
          )}
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="input hidden w-48 shrink-0 text-sm text-muted md:block"
        >
          <option value="">Alla statusar</option>
          {kundStatusar.map((s) => (
            <option key={s.id} value={s.namn}>
              {s.namn}
            </option>
          ))}
        </select>
        <button className="ml-auto hidden shrink-0 items-center gap-1.5 rounded-lg border border-border bg-elevated px-3 py-1.5 text-sm text-fg transition-colors hover:bg-hover sm:flex">
          <Plus size={14} /> Ny kund
        </button>
      </div>

      {filtered.length === 0 ? (
        <div className="flex flex-1 items-center justify-center">
          <p className="text-sm text-muted">Inga kunder matchar sökningen.</p>
        </div>
      ) : (
        <div className="flex-1 overflow-auto">
          <table className="w-full text-sm">
            <thead className="sticky top-0 z-10 bg-sidebar">
              <tr className="border-b border-border text-left">
                <th className="w-8 py-2.5 pl-4 pr-2">
                  <input
                    type="checkbox"
                    checked={allFilteredSelected}
                    onChange={() => {}}
                    onClick={toggleAll}
                    className="cursor-pointer rounded border-border accent-emerald-400"
                  />
                </th>
                {(
                  [
                    ['kundnummer', 'Nr'],
                    ['namn', 'Namn'],
                    ['stad', 'Ort'],
                    ['telefon', 'Telefon'],
                    ['email', 'Email'],
                    ['org_nummer', 'Org / Personnr'],
                    ['status', 'Status'],
                    ['skapad_at', 'Skapad'],
                  ] as [string, string][]
                ).map(([col, label]) => (
                  <th
                    key={col}
                    onClick={() => handleSort(col)}
                    className="group/th cursor-pointer select-none px-4 py-2.5 text-[11px] font-medium uppercase tracking-wider text-muted transition-colors hover:text-fg"
                  >
                    <div className="flex items-center gap-1">
                      {label}
                      {sortCol === col ? (
                        sortDir === 'asc' ? (
                          <ArrowUp size={10} className="shrink-0 text-fg" />
                        ) : (
                          <ArrowDown size={10} className="shrink-0 text-fg" />
                        )
                      ) : (
                        <ArrowUpDown
                          size={10}
                          className="shrink-0 opacity-0 transition-opacity group-hover/th:opacity-40"
                        />
                      )}
                    </div>
                  </th>
                ))}
                <th className="w-10" />
              </tr>
            </thead>
            <tbody>
              {sorted.map((kund) => {
                const isRevealed = revealed.has(kund.id)
                const isSelected = selected.has(kund.id)
                return (
                  <tr
                    key={kund.id}
                    className={`group cursor-pointer border-b border-border transition-colors hover:bg-hover ${
                      isSelected ? 'bg-elevated' : ''
                    }`}
                  >
                    <td
                      className="py-3 pl-4 pr-2"
                      onClick={(e) => toggleSelect(e, kund.id)}
                    >
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => {}}
                        className="cursor-pointer rounded border-border accent-emerald-400"
                      />
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 font-mono text-xs text-muted">
                      {kund.kundnummer ?? '—'}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 font-medium text-fg">
                      {kund.namn}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-muted">
                      {kund.stad ?? '—'}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-muted">
                      {kund.telefon ?? '—'}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-muted">
                      {kund.email ?? '—'}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3">
                      {kund.org_nummer ? (
                        <button
                          onClick={(e) => toggleReveal(e, kund.id)}
                          className="flex items-center gap-1.5 font-mono text-xs text-muted transition-colors hover:text-fg"
                        >
                          {isRevealed
                            ? kund.org_nummer
                            : maskOrgNummer(kund.org_nummer)}
                          {isRevealed ? (
                            <EyeOff size={11} className="text-subtle" />
                          ) : (
                            <Eye
                              size={11}
                              className="text-subtle opacity-0 transition-opacity group-hover:opacity-100"
                            />
                          )}
                        </button>
                      ) : (
                        <span className="text-muted">—</span>
                      )}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3">
                      <StatusPicker
                        kund={kund}
                        statusar={kundStatusar}
                        onChange={changeStatus}
                      />
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-xs text-muted">
                      {new Date(kund.skapad_at).toLocaleDateString('sv-SE')}
                    </td>
                    <td className="whitespace-nowrap py-3 pr-4">
                      <button className="text-muted opacity-0 transition-all hover:text-red-400 group-hover:opacity-100">
                        <Trash2 size={13} />
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
