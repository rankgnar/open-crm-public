'use client'

import {
  Plus,
  Play,
  Pause,
  CheckCircle2,
  Loader2,
  Zap,
  Database,
  Sparkles,
  FileDown,
  Save,
  Mail,
  GitBranch,
  type LucideIcon,
} from 'lucide-react'
import {
  type WorkflowNode,
  type WorkflowEdge,
  type WorkflowNodeKind,
} from '@/lib/fixtures/types'
import { workflows } from '@/lib/fixtures/data'

const ICONS: Record<WorkflowNodeKind, LucideIcon> = {
  trigger: Zap,
  'data-context': Database,
  'ai-generate': Sparkles,
  'action-pdf': FileDown,
  'action-save': Save,
  'action-email': Mail,
  condition: GitBranch,
}

const COLORS: Record<WorkflowNodeKind, { ring: string; icon: string; bg: string }> = {
  trigger: {
    ring: 'border-amber-400/40',
    icon: 'text-amber-400',
    bg: 'bg-amber-500/10',
  },
  'data-context': {
    ring: 'border-blue-400/40',
    icon: 'text-blue-400',
    bg: 'bg-blue-500/10',
  },
  'ai-generate': {
    ring: 'border-violet-400/40',
    icon: 'text-violet-400',
    bg: 'bg-violet-500/10',
  },
  'action-pdf': {
    ring: 'border-cyan-400/40',
    icon: 'text-cyan-400',
    bg: 'bg-cyan-500/10',
  },
  'action-save': {
    ring: 'border-emerald-400/40',
    icon: 'text-emerald-400',
    bg: 'bg-emerald-500/10',
  },
  'action-email': {
    ring: 'border-rose-400/40',
    icon: 'text-rose-400',
    bg: 'bg-rose-500/10',
  },
  condition: {
    ring: 'border-fg/40',
    icon: 'text-fg',
    bg: 'bg-fg/10',
  },
}

const NODE_W = 168
const NODE_H = 72

const WORKFLOW_LIST = [
  { id: 'wf1', namn: 'Offert → AI-utkast → Skicka', runs: 47, active: true },
  { id: 'wf2', namn: 'Faktura betald → Tackmail', runs: 38, active: true },
  { id: 'wf3', namn: 'ÄTA → Generera PM', runs: 24, active: true },
  { id: 'wf4', namn: 'Vecko-rapport för projektledare', runs: 12, active: true },
  { id: 'wf5', namn: 'Kund onboarding', runs: 8, active: false },
]

function edgePath(from: WorkflowNode, to: WorkflowNode): string {
  const x1 = from.x + NODE_W
  const y1 = from.y + NODE_H / 2
  const x2 = to.x
  const y2 = to.y + NODE_H / 2
  const midX = (x1 + x2) / 2
  return `M${x1},${y1} C${midX},${y1} ${midX},${y2} ${x2},${y2}`
}

export function WorkflowsView() {
  const wf = workflows[0]

  return (
    <div className="flex h-full flex-col">
      {/* Header */}
      <div className="flex shrink-0 flex-wrap items-center justify-between gap-2 border-b border-border bg-sidebar px-4 py-3 md:flex-nowrap md:gap-4 md:px-6">
        <div className="flex min-w-0 items-center gap-3">
          <h1 className="shrink-0 text-base font-semibold text-fg">Workflows</h1>
          <span className="shrink-0 text-subtle">/</span>
          <span className="min-w-0 truncate text-sm text-fg">{wf.namn}</span>
          <div className="hidden shrink-0 items-center gap-1.5 rounded-full border border-emerald-400/30 bg-emerald-500/10 px-2.5 py-0.5 sm:flex">
            <span className="size-1.5 animate-pulse rounded-full bg-emerald-400" />
            <span className="text-[11px] text-emerald-400">Aktiv</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="hidden items-center gap-1.5 rounded-lg border border-border bg-elevated px-3 py-1.5 text-xs text-fg transition-colors hover:bg-hover sm:flex">
            <Pause size={12} /> Pausa
          </button>
          <button className="flex items-center gap-1.5 rounded-lg bg-fg px-3 py-1.5 text-xs font-medium text-bg transition-opacity hover:opacity-90">
            <Play size={12} /> <span className="hidden sm:inline">Kör manuellt</span><span className="sm:hidden">Kör</span>
          </button>
        </div>
      </div>

      {/* Body */}
      <div className="flex min-h-0 flex-1">
        {/* Left list — hidden on small screens; canvas takes full width */}
        <aside className="hidden w-52 shrink-0 flex-col border-r border-border bg-sidebar lg:flex">
          <div className="flex items-center justify-between border-b border-border px-4 py-3">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-muted">
              Mina flöden
            </span>
            <button className="flex h-6 w-6 items-center justify-center rounded-md text-muted hover:bg-hover hover:text-fg">
              <Plus size={13} />
            </button>
          </div>
          <ul className="flex-1 overflow-auto py-1">
            {WORKFLOW_LIST.map((w, i) => (
              <li key={w.id}>
                <button
                  className={`flex w-full flex-col items-start gap-0.5 px-4 py-2.5 text-left text-xs transition-colors ${
                    i === 0 ? 'bg-elevated text-fg' : 'text-muted hover:bg-hover'
                  }`}
                >
                  <div className="flex w-full items-center gap-2">
                    <span
                      className={`size-1.5 rounded-full ${
                        w.active ? 'bg-emerald-400' : 'bg-subtle'
                      }`}
                    />
                    <span className="flex-1 truncate text-[11px] leading-snug">
                      {w.namn}
                    </span>
                  </div>
                  <span className="ml-3.5 font-mono text-[10px] text-subtle">
                    {w.runs} körningar 30d
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </aside>

        {/* Canvas */}
        <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
          <div
            className="relative flex-1 overflow-auto"
            style={{
              backgroundImage:
                'radial-gradient(circle, var(--color-grid-line) 1px, transparent 1px)',
              backgroundSize: '20px 20px',
            }}
          >
            <div className="relative" style={{ width: 880, height: 280 }}>
              {/* SVG edges */}
              <svg
                className="absolute inset-0 pointer-events-none"
                width="880"
                height="280"
              >
                <defs>
                  <linearGradient id="wfedge" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="rgba(52,211,153,0.5)" />
                    <stop offset="100%" stopColor="rgba(52,211,153,0.85)" />
                  </linearGradient>
                  <marker
                    id="wfarrow"
                    viewBox="0 0 10 10"
                    refX="8"
                    refY="5"
                    markerWidth="5"
                    markerHeight="5"
                    orient="auto"
                  >
                    <path d="M0,0 L10,5 L0,10 z" fill="rgba(52,211,153,0.85)" />
                  </marker>
                </defs>
                {wf.edges.map((edge: WorkflowEdge, i: number) => {
                  const from = wf.nodes.find((n) => n.id === edge.from)
                  const to = wf.nodes.find((n) => n.id === edge.to)
                  if (!from || !to) return null
                  return (
                    <path
                      key={i}
                      d={edgePath(from, to)}
                      fill="none"
                      stroke="url(#wfedge)"
                      strokeWidth="1.5"
                      markerEnd="url(#wfarrow)"
                    />
                  )
                })}
              </svg>

              {/* Nodes */}
              {wf.nodes.map((node: WorkflowNode) => {
                const Icon = ICONS[node.kind]
                const color = COLORS[node.kind]
                return (
                  <div
                    key={node.id}
                    className={`absolute flex flex-col rounded-lg border bg-elevated p-2.5 shadow-lg transition-transform hover:scale-[1.02] ${color.ring}`}
                    style={{
                      left: node.x,
                      top: node.y,
                      width: NODE_W,
                      height: NODE_H,
                    }}
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className={`flex size-6 items-center justify-center rounded-md ${color.bg} ${color.icon}`}
                      >
                        <Icon size={13} strokeWidth={1.75} />
                      </div>
                      <span className="flex-1 truncate text-[11px] font-medium text-fg">
                        {node.label}
                      </span>
                      {node.status === 'ok' && (
                        <CheckCircle2 size={11} className="text-emerald-400" />
                      )}
                      {node.status === 'running' && (
                        <Loader2
                          size={11}
                          className="animate-spin text-amber-400"
                        />
                      )}
                    </div>
                    {node.sub && (
                      <p className="mt-1 truncate font-mono text-[9px] text-subtle">
                        {node.sub}
                      </p>
                    )}
                  </div>
                )
              })}
            </div>
          </div>

          {/* Footer stats */}
          <div className="flex shrink-0 items-center gap-6 border-t border-border bg-sidebar px-6 py-2.5">
            <Stat label="Körningar 30d" value="47" />
            <Stat label="Lyckade" value="96%" color="text-emerald-400" />
            <Stat label="Snitt-tid" value="3.4s" />
            <Stat label="Senaste" value="för 12s sedan" />
          </div>
        </div>

        {/* Right log */}
        <aside className="flex w-72 shrink-0 flex-col border-l border-border bg-sidebar">
          <div className="flex items-center justify-between border-b border-border px-4 py-3">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-muted">
              Senaste körning
            </span>
            <span className="font-mono text-[10px] text-subtle">2026-05-06</span>
          </div>
          <ol className="flex-1 overflow-auto px-4 py-3">
            {wf.log.map((entry, i) => {
              const last = i === wf.log.length - 1
              return (
                <li key={entry.id} className="relative flex gap-3 pb-3">
                  {!last && (
                    <span className="absolute left-2 top-3 h-full w-px bg-border" />
                  )}
                  <span
                    className={`relative z-10 mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full ${
                      entry.status === 'ok'
                        ? 'bg-emerald-500/15'
                        : entry.status === 'running'
                          ? 'bg-amber-500/15'
                          : 'bg-rose-500/15'
                    }`}
                  >
                    {entry.status === 'ok' && (
                      <CheckCircle2
                        size={10}
                        className="text-emerald-400"
                      />
                    )}
                    {entry.status === 'running' && (
                      <Loader2
                        size={9}
                        className="animate-spin text-amber-400"
                      />
                    )}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[11px] text-fg">{entry.node}</p>
                    <div className="mt-0.5 flex items-center gap-2 font-mono text-[10px] text-subtle">
                      <span>{entry.time}</span>
                      {entry.ms && <span>· {entry.ms}ms</span>}
                    </div>
                  </div>
                </li>
              )
            })}
          </ol>
        </aside>
      </div>
    </div>
  )
}

function Stat({
  label,
  value,
  color,
}: {
  label: string
  value: string
  color?: string
}) {
  return (
    <div className="flex items-baseline gap-2">
      <span className={`text-sm font-semibold tabular-nums ${color ?? 'text-fg'}`}>
        {value}
      </span>
      <span className="text-[10px] uppercase tracking-wider text-subtle">
        {label}
      </span>
    </div>
  )
}
