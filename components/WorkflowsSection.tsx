'use client'

import { useTranslations } from 'next-intl'
import { Link } from '@/lib/i18n/navigation'
import {
  Database,
  Sparkles,
  CheckCircle2,
  ChevronDown,
  Workflow,
  GitBranch,
  Clock,
  Bot,
  ToggleRight,
  Play,
  Loader2,
} from 'lucide-react'

const FEATURES = [
  {
    icon: GitBranch,
    titleKey: 'features.0.title',
    descKey: 'features.0.desc',
  },
  {
    icon: Bot,
    titleKey: 'features.1.title',
    descKey: 'features.1.desc',
  },
  {
    icon: Clock,
    titleKey: 'features.2.title',
    descKey: 'features.2.desc',
  },
  {
    icon: Database,
    titleKey: 'features.3.title',
    descKey: 'features.3.desc',
  },
] as const

export function WorkflowsSection() {
  const t = useTranslations('workflows')

  return (
    <section
      id="workflows"
      className="relative scroll-mt-24 overflow-hidden border-y border-border bg-surface/20 py-16 md:py-32"
    >
      <div
        aria-hidden
        className="absolute left-1/2 top-0 h-[600px] w-[1100px] -translate-x-1/2 bg-[radial-gradient(ellipse_50%_50%_at_50%_0%,rgba(167,139,250,0.10),transparent_70%)]"
      />

      <div className="container-x relative">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Left: copy + features */}
          <div className="lg:col-span-5">
            <p className="eyebrow">{t('label')}</p>
            <h2 className="mt-5 text-balance text-[26px] font-semibold leading-[1.1] tracking-tight text-fg-strong sm:text-4xl md:text-[44px]">
              <span className="headline-gradient">{t('title')}</span>
            </h2>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-muted text-balance sm:text-lg">
              {t('sub')}
            </p>

            <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2">
              {FEATURES.map((f, i) => {
                const Icon = f.icon
                return (
                  <div key={i} className="flex gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-border-strong bg-bg-elevated text-violet-300">
                      <Icon size={16} strokeWidth={1.75} />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-fg-strong">
                        {t(f.titleKey)}
                      </p>
                      <p className="mt-1 text-[13px] leading-relaxed text-muted">
                        {t(f.descKey)}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-3">
              <Link href="/produkten" className="btn btn-primary !h-10 !text-sm">
                <Workflow size={14} /> {t('cta')}
              </Link>
              <span className="text-xs text-subtle">{t('tagline')}</span>
            </div>
          </div>

          {/* Right: visual node diagram — desktop only, hidden on mobile/tablet */}
          <div className="relative hidden lg:col-span-7 lg:block">
            <NodeDiagram />
          </div>
        </div>
      </div>
    </section>
  )
}

type NodeCategory = 'data' | 'ai' | 'action'

const CAT_BORDER: Record<NodeCategory, string> = {
  data: 'border-l-blue-400/70',
  ai: 'border-l-violet-400/70',
  action: 'border-l-emerald-400/70',
}

const CAT_ICON_COLOR: Record<NodeCategory, string> = {
  data: 'text-blue-400',
  ai: 'text-violet-400',
  action: 'text-emerald-400',
}

const FLOW_NODES: Array<{
  category: NodeCategory
  label: string
  summary: string
  status?: 'done' | 'running'
}> = [
  {
    category: 'data',
    label: 'Projekt',
    summary: 'Hämtar projektdata med kund och ROT-inställningar',
    status: 'done',
  },
  {
    category: 'data',
    label: 'Projektfiler',
    summary: '4 dokument · 2 anteckningar',
    status: 'done',
  },
  {
    category: 'ai',
    label: 'AI — Generera',
    summary: 'AI-assistent: Offert-skribent',
    status: 'done',
  },
  {
    category: 'action',
    label: 'Skapa förslag',
    summary: 'Giltig 30 dagar · Moms 25%',
    status: 'done',
  },
  {
    category: 'action',
    label: 'Skicka för signatur',
    summary: 'Mall: offert_signatur',
    status: 'running',
  },
]

function CategoryIcon({ category }: { category: NodeCategory }) {
  if (category === 'data') return <Database size={14} />
  if (category === 'ai') return <Sparkles size={14} />
  return <CheckCircle2 size={14} />
}

function NodeDiagram() {
  return (
    <div className="relative">
      <div
        aria-hidden
        className="absolute -inset-12 rounded-full bg-[radial-gradient(circle_at_50%_50%,rgba(167,139,250,0.16),transparent_60%)] blur-3xl"
      />

      <div
        className="relative overflow-hidden rounded-2xl border border-border-strong shadow-2xl shadow-black/40"
        style={{ backgroundColor: 'var(--color-app-bg)' }}
      >
        {/* Title bar — matches the real WorkflowEditor header */}
        <div
          className="flex items-center gap-3 border-b border-border px-4 py-2.5"
          style={{ backgroundColor: 'var(--color-app-sidebar)' }}
        >
          <Workflow size={13} className="text-violet-400" />
          <span className="flex-1 truncate text-[12px] font-semibold text-fg">
            Offert — AI-utkast → Skicka för signatur
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/30 bg-emerald-500/10 px-2 py-0.5">
            <span className="size-1.5 animate-pulse rounded-full bg-emerald-400" />
            <span className="text-[10px] text-emerald-400">47 körningar 30d</span>
          </span>
          <ToggleRight size={16} className="text-emerald-400" />
          <button className="flex items-center gap-1.5 rounded border border-border bg-elevated px-2.5 py-1 text-[11px] text-fg">
            <Play size={11} /> Kör
          </button>
        </div>

        {/* Beskrivning */}
        <div className="border-b border-border px-4 pb-2 pt-3">
          <p className="text-[11px] text-muted">
            Genererar ett offertförslag från projektdata och skickar för digital
            signatur.
          </p>
        </div>

        {/* Vertical NodeCard stack */}
        <div className="px-4 py-5">
          <div className="mx-auto flex max-w-md flex-col gap-0">
            {FLOW_NODES.map((n, i) => (
              <div key={i}>
                <div
                  className={`overflow-hidden rounded-lg border border-border border-l-2 bg-elevated ${CAT_BORDER[n.category]}`}
                >
                  <div className="flex items-center gap-2.5 px-3 py-2">
                    <span className={CAT_ICON_COLOR[n.category]}>
                      <CategoryIcon category={n.category} />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-[12px] font-medium text-fg">
                        {n.label}
                      </p>
                      <p className="mt-0.5 truncate text-[10.5px] text-muted">
                        {n.summary}
                      </p>
                    </div>
                    {n.status === 'running' ? (
                      <Loader2
                        size={12}
                        className="shrink-0 animate-spin text-amber-400"
                      />
                    ) : (
                      <CheckCircle2
                        size={12}
                        className="shrink-0 text-emerald-400"
                      />
                    )}
                  </div>
                </div>
                {i < FLOW_NODES.length - 1 && (
                  <div className="flex flex-col items-center py-0.5">
                    <div className="h-4 w-px bg-border" />
                    <ChevronDown size={12} className="text-subtle" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
