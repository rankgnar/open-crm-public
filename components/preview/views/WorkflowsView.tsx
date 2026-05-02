'use client'

import {
  Database,
  Sparkles,
  CheckCircle2,
  ChevronUp,
  ChevronDown,
  Pencil,
  X,
  Plus,
  Play,
  ToggleRight,
  MoreHorizontal,
  GitBranch,
  ListOrdered,
  Zap,
  type LucideIcon,
} from 'lucide-react'

type Category = 'data' | 'ai' | 'action'

const CAT_STYLE: Record<Category, { border: string; icon: string }> = {
  data: { border: 'border-l-blue-400/70', icon: 'text-blue-400' },
  ai: { border: 'border-l-violet-400/70', icon: 'text-violet-400' },
  action: { border: 'border-l-emerald-400/70', icon: 'text-emerald-400' },
}

const CAT_ICON: Record<Category, LucideIcon> = {
  data: Database,
  ai: Sparkles,
  action: CheckCircle2,
}

type Node = {
  id: string
  label: string
  category: Category
  summary: string
}

type Workflow = {
  id: string
  namn: string
  kategori: string
  beskrivning: string
  aktiv: boolean
  runs_30d: number
  nodes: Node[]
}

const WORKFLOWS: Workflow[] = [
  {
    id: 'wf-offert',
    namn: 'Offert — AI-utkast → Skicka för signatur',
    kategori: 'Försäljning',
    beskrivning:
      'Genererar ett offertförslag från projektdata, skapar tidplan och skickar för digital signatur.',
    aktiv: true,
    runs_30d: 47,
    nodes: [
      {
        id: 'n1',
        label: 'Projekt',
        category: 'data',
        summary: 'Hämtar projektdata med kund och ROT-inställningar',
      },
      {
        id: 'n2',
        label: 'Projektanteckningar',
        category: 'data',
        summary: 'Hämtar alla anteckningar för projektet',
      },
      {
        id: 'n3',
        label: 'AI — Generera',
        category: 'ai',
        summary: 'Offert-skribent · Mall: offert_v3',
      },
      {
        id: 'n4',
        label: 'Skapa förslag',
        category: 'action',
        summary: 'Giltig 30 dagar · Moms 25%',
      },
      {
        id: 'n5',
        label: 'Skapa tidplan',
        category: 'action',
        summary: 'Genererar kalenderhändelser per fas',
      },
      {
        id: 'n6',
        label: 'Skicka e-post',
        category: 'action',
        summary: 'Mall: offert_signatur',
      },
    ],
  },
  {
    id: 'wf-tidplan',
    namn: 'Tidplan från fas-mallar',
    kategori: 'Planering',
    beskrivning: 'Bygger en initial tidplan baserat på valda fas-mallar.',
    aktiv: true,
    runs_30d: 12,
    nodes: [],
  },
  {
    id: 'wf-material',
    namn: 'Material — matcha katalog + webbpriser',
    kategori: 'Inköp',
    beskrivning:
      'Estimerar material från AI och berikar med priser från katalog och webben.',
    aktiv: true,
    runs_30d: 19,
    nodes: [],
  },
  {
    id: 'wf-revisor',
    namn: 'Revisor — applicera korrigeringar',
    kategori: 'Kvalitet',
    beskrivning:
      'Läser AI-revisorns korrigeringar och applicerar dem på arbete- och materialrader.',
    aktiv: false,
    runs_30d: 4,
    nodes: [],
  },
  {
    id: 'wf-fakturera',
    namn: 'Fakturera fas (Fortnox)',
    kategori: 'Ekonomi',
    beskrivning: 'Skapar och skickar faktura via Fortnox när en fas markeras klar.',
    aktiv: true,
    runs_30d: 8,
    nodes: [],
  },
]

const TABS = [
  { key: 'workflows', label: 'Workflows', icon: GitBranch, active: true },
  { key: 'sekvenser', label: 'Sekvenser', icon: ListOrdered, active: false },
  { key: 'triggers', label: 'Triggers', icon: Zap, active: false },
]

export function WorkflowsView() {
  const active = WORKFLOWS[0]

  return (
    <div className="flex h-full">
      {/* Sidebar */}
      <aside className="flex w-60 shrink-0 flex-col border-r border-border">
        {/* Tab header */}
        <div className="flex shrink-0 items-center gap-2 border-b border-border px-3 py-3">
          <ChevronUp size={14} className="rotate-[-90deg] text-subtle" />
          <GitBranch size={13} className="text-muted" />
          <span className="text-xs font-medium text-fg">Workflows</span>
        </div>

        {/* Workflow list */}
        <div className="flex-1 overflow-auto">
          <div className="flex items-center justify-between px-3 py-2">
            <span className="text-[10px] font-semibold uppercase tracking-widest text-subtle">
              {WORKFLOWS.length} flöden
            </span>
            <button className="flex h-6 w-6 items-center justify-center rounded text-subtle hover:bg-hover hover:text-fg">
              <Plus size={13} />
            </button>
          </div>
          <ul>
            {WORKFLOWS.map((w, i) => (
              <li key={w.id}>
                <button
                  className={`flex w-full flex-col items-start gap-1 px-3 py-2.5 text-left transition-colors ${
                    i === 0 ? 'bg-elevated' : 'hover:bg-hover'
                  }`}
                >
                  <div className="flex w-full items-center gap-2">
                    <span
                      className={`size-1.5 shrink-0 rounded-full ${
                        w.aktiv ? 'bg-emerald-400' : 'bg-subtle'
                      }`}
                    />
                    <span
                      className={`flex-1 truncate text-[12px] leading-snug ${
                        i === 0 ? 'text-fg' : 'text-muted'
                      }`}
                    >
                      {w.namn}
                    </span>
                  </div>
                  <span className="ml-3.5 font-mono text-[10px] text-subtle">
                    {w.kategori} · {w.runs_30d} körningar 30d
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </aside>

      {/* Main */}
      <div className="flex min-w-0 flex-1 flex-col">
        {/* Header */}
        <div className="flex shrink-0 items-center gap-3 border-b border-border px-6 py-3">
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-fg">{active.namn}</p>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <button className="text-emerald-400" title="Aktivera/inaktivera">
              <ToggleRight size={18} />
            </button>
            <button className="flex items-center gap-1.5 rounded border border-border bg-elevated px-3 py-1.5 text-xs text-fg transition-colors hover:bg-hover">
              <Play size={13} /> Kör
            </button>
            <button className="rounded p-1.5 text-muted hover:bg-hover hover:text-fg">
              <MoreHorizontal size={16} />
            </button>
          </div>
        </div>

        {/* Beskrivning */}
        <div className="shrink-0 border-b border-border px-6 pb-2 pt-3">
          <p className="text-xs text-muted">{active.beskrivning}</p>
        </div>

        {/* Node list */}
        <div className="flex-1 overflow-auto px-6 py-5">
          <div className="mx-auto flex max-w-lg flex-col gap-0">
            {active.nodes.map((node, i) => (
              <div key={node.id}>
                <NodeCard node={node} index={i} total={active.nodes.length} />
                {i < active.nodes.length - 1 && <NodeConnector />}
              </div>
            ))}
            <div className="mt-1">
              <NodeConnector />
            </div>
            <div className="flex justify-center">
              <button className="flex items-center gap-1.5 rounded-lg border border-dashed border-border bg-transparent px-3 py-2 text-xs text-muted transition-colors hover:border-border-strong hover:text-fg">
                <Plus size={13} /> Lägg till nod
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function NodeCard({
  node,
  index,
  total,
}: {
  node: Node
  index: number
  total: number
}) {
  const styles = CAT_STYLE[node.category]
  const Icon = CAT_ICON[node.category]
  return (
    <div
      className={`overflow-hidden rounded-lg border border-border border-l-2 bg-elevated ${styles.border}`}
    >
      <div className="flex items-center gap-2.5 px-3.5 py-2.5">
        <span className={styles.icon}>
          <Icon size={14} />
        </span>
        <div className="min-w-0 flex-1">
          <p className="truncate text-xs font-medium text-fg">{node.label}</p>
          <p className="mt-0.5 truncate text-[11px] text-muted">{node.summary}</p>
        </div>
        <div className="flex shrink-0 items-center gap-0.5">
          <button
            disabled={index === 0}
            className="rounded p-1 text-subtle transition-colors hover:bg-hover hover:text-fg disabled:cursor-not-allowed disabled:opacity-20"
          >
            <ChevronUp size={13} />
          </button>
          <button
            disabled={index === total - 1}
            className="rounded p-1 text-subtle transition-colors hover:bg-hover hover:text-fg disabled:cursor-not-allowed disabled:opacity-20"
          >
            <ChevronDown size={13} />
          </button>
          <button className="rounded p-1 text-subtle transition-colors hover:bg-hover hover:text-fg">
            <Pencil size={13} />
          </button>
          <button className="rounded p-1 text-subtle transition-colors hover:bg-hover hover:text-red-400">
            <X size={13} />
          </button>
        </div>
      </div>
    </div>
  )
}

function NodeConnector() {
  return (
    <div className="flex flex-col items-center py-0.5">
      <div className="h-4 w-px bg-border" />
      <ChevronDown size={12} className="text-subtle" />
    </div>
  )
}
