'use client'

import { useTranslations } from 'next-intl'
import {
  Zap,
  Database,
  Sparkles,
  FileDown,
  Mail,
  Save,
  Workflow,
  GitBranch,
  Clock,
  Bot,
  CheckCircle2,
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
              <a href="#preview" className="btn btn-primary !h-10 !text-sm">
                <Workflow size={14} /> {t('cta')}
              </a>
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

function NodeDiagram() {
  return (
    <div className="relative">
      <div
        aria-hidden
        className="absolute -inset-12 rounded-full bg-[radial-gradient(circle_at_50%_50%,rgba(167,139,250,0.16),transparent_60%)] blur-3xl"
      />

      <div
        className="relative overflow-hidden rounded-2xl border border-border-strong shadow-2xl shadow-black/40"
        style={{
          backgroundColor: 'var(--color-app-bg)',
          minHeight: 380,
          backgroundImage:
            'radial-gradient(circle, var(--color-grid-line) 1px, transparent 1px)',
          backgroundSize: '20px 20px',
        }}
      >
        {/* Title strip */}
        <div
          className="flex items-center justify-between border-b border-border px-4 py-2.5"
          style={{ backgroundColor: 'var(--color-app-sidebar)' }}
        >
          <div className="flex items-center gap-2">
            <Workflow size={14} className="text-violet-400" />
            <span className="text-[12px] font-medium text-fg">
              Offert → AI-utkast → Skicka
            </span>
            <span className="ml-2 inline-flex items-center gap-1.5 rounded-full border border-emerald-400/30 bg-emerald-500/10 px-2 py-0.5">
              <span className="size-1.5 animate-pulse rounded-full bg-emerald-400" />
              <span className="text-[10px] text-emerald-400">Aktiv · 47 körningar 30d</span>
            </span>
          </div>
          <span className="font-mono text-[10px] text-subtle">96% lyckade</span>
        </div>

        <svg
          viewBox="0 0 760 320"
          className="block w-full"
          style={{ height: 320 }}
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            <linearGradient id="ws-edge" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="rgba(167,139,250,0.5)" />
              <stop offset="100%" stopColor="rgba(52,211,153,0.85)" />
            </linearGradient>
            <marker
              id="ws-arrow"
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

          {/* edges */}
          <path d="M170,160 C200,160 220,160 250,160" stroke="url(#ws-edge)" strokeWidth="1.5" fill="none" markerEnd="url(#ws-arrow)" />
          <path d="M390,160 C420,160 420,90 450,90" stroke="url(#ws-edge)" strokeWidth="1.5" fill="none" markerEnd="url(#ws-arrow)" />
          <path d="M390,160 C420,160 420,230 450,230" stroke="url(#ws-edge)" strokeWidth="1.5" fill="none" markerEnd="url(#ws-arrow)" />
          <path d="M590,90 C620,90 620,160 650,160" stroke="url(#ws-edge)" strokeWidth="1.5" fill="none" markerEnd="url(#ws-arrow)" />
          <path d="M590,230 C620,230 620,160 650,160" stroke="url(#ws-edge)" strokeWidth="1.5" fill="none" markerEnd="url(#ws-arrow)" />
        </svg>

        {/* Nodes positioned over the SVG */}
        <div className="absolute inset-0 pointer-events-none">
          <DiagramNode
            icon={Zap}
            label="Trigger"
            sub="Status: klar_för_granskning"
            color="amber"
            x="3%"
            y="38%"
          />
          <DiagramNode
            icon={Database}
            label="Hämta kontext"
            sub="4 dokument · 2 anteckningar"
            color="blue"
            x="32%"
            y="38%"
          />
          <DiagramNode
            icon={Sparkles}
            label="AI · Claude Sonnet"
            sub="Generera följebrev"
            color="violet"
            x="59%"
            y="14%"
          />
          <DiagramNode
            icon={FileDown}
            label="Render PDF"
            sub="Mall: offert_v3"
            color="cyan"
            x="59%"
            y="58%"
          />
          <DiagramNode
            icon={Mail}
            label="Skicka för signatur"
            sub="Zoho · 12s"
            color="rose"
            x="86%"
            y="38%"
            running
          />
        </div>
      </div>
    </div>
  )
}

const COLORS: Record<
  string,
  { ring: string; icon: string; bg: string }
> = {
  amber: {
    ring: 'border-amber-400/40',
    icon: 'text-amber-400',
    bg: 'bg-amber-500/10',
  },
  blue: {
    ring: 'border-blue-400/40',
    icon: 'text-blue-400',
    bg: 'bg-blue-500/10',
  },
  violet: {
    ring: 'border-violet-400/40',
    icon: 'text-violet-400',
    bg: 'bg-violet-500/10',
  },
  cyan: {
    ring: 'border-cyan-400/40',
    icon: 'text-cyan-400',
    bg: 'bg-cyan-500/10',
  },
  rose: {
    ring: 'border-rose-400/40',
    icon: 'text-rose-400',
    bg: 'bg-rose-500/10',
  },
}

function DiagramNode({
  icon: Icon,
  label,
  sub,
  color,
  x,
  y,
  running,
}: {
  icon: typeof Zap
  label: string
  sub: string
  color: keyof typeof COLORS
  x: string
  y: string
  running?: boolean
}) {
  const c = COLORS[color]
  return (
    <div
      className={`pointer-events-auto absolute flex w-[160px] -translate-x-0 flex-col rounded-lg border bg-elevated p-2.5 shadow-lg ${c.ring}`}
      style={{ left: x, top: y }}
    >
      <div className="flex items-center gap-2">
        <div
          className={`flex size-6 items-center justify-center rounded-md ${c.bg} ${c.icon}`}
        >
          <Icon size={13} strokeWidth={1.75} />
        </div>
        <span className="flex-1 truncate text-[11px] font-medium text-fg">
          {label}
        </span>
        {running ? (
          <span className="size-1.5 animate-pulse rounded-full bg-amber-400" />
        ) : (
          <CheckCircle2 size={11} className="text-emerald-400" />
        )}
      </div>
      <p className="mt-1 truncate font-mono text-[9px] text-subtle">{sub}</p>
    </div>
  )
}
