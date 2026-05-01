import {
  Users,
  FolderKanban,
  CalendarDays,
  HardHat,
  Package,
  FileText,
  TrendingUp,
  Receipt,
  type LucideIcon,
} from 'lucide-react'
import { useTranslations } from 'next-intl'

type ModuleKey =
  | 'kunder'
  | 'projekt'
  | 'schema'
  | 'arbete'
  | 'material'
  | 'offert'
  | 'ekonomi'
  | 'fakturor'

const MODULES: Array<{
  key: ModuleKey
  icon: LucideIcon
  number: string
  span: string
  decoration?: 'avatars' | 'bar' | 'phases' | 'sparkline' | 'invoices'
}> = [
  {
    key: 'kunder',
    icon: Users,
    number: '01',
    span: 'lg:col-span-7',
    decoration: 'avatars',
  },
  {
    key: 'projekt',
    icon: FolderKanban,
    number: '02',
    span: 'lg:col-span-5',
    decoration: 'phases',
  },
  {
    key: 'schema',
    icon: CalendarDays,
    number: '03',
    span: 'lg:col-span-4',
  },
  {
    key: 'arbete',
    icon: HardHat,
    number: '04',
    span: 'lg:col-span-4',
    decoration: 'bar',
  },
  {
    key: 'material',
    icon: Package,
    number: '05',
    span: 'lg:col-span-4',
  },
  {
    key: 'offert',
    icon: FileText,
    number: '06',
    span: 'lg:col-span-5',
  },
  {
    key: 'ekonomi',
    icon: TrendingUp,
    number: '07',
    span: 'lg:col-span-3',
    decoration: 'sparkline',
  },
  {
    key: 'fakturor',
    icon: Receipt,
    number: '08',
    span: 'lg:col-span-4',
    decoration: 'invoices',
  },
]

export function ModulesGrid() {
  const t = useTranslations('modules')

  return (
    <section id="modules" className="relative scroll-mt-24 py-16 md:py-32">
      <div className="container-x">
        <header className="mx-auto max-w-2xl text-center">
          <p className="eyebrow justify-center">{t('label')}</p>
          <h2 className="mt-5 text-balance text-[26px] font-semibold tracking-tight text-fg-strong sm:text-4xl md:text-5xl">
            <span className="headline-gradient">{t('title')}</span>
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-base text-muted text-balance">
            {t('sub')}
          </p>
        </header>

        <div className="mt-12 grid grid-cols-1 gap-3 md:mt-16 md:grid-cols-2 md:gap-4 lg:grid-cols-12">
          {MODULES.map((mod) => (
            <ModuleCard
              key={mod.key}
              icon={mod.icon}
              number={mod.number}
              title={t(`${mod.key}.title`)}
              desc={t(`${mod.key}.desc`)}
              span={mod.span}
              decoration={mod.decoration}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

function ModuleCard({
  icon: Icon,
  number,
  title,
  desc,
  span,
  decoration,
}: {
  icon: LucideIcon
  number: string
  title: string
  desc: string
  span: string
  decoration?: 'avatars' | 'bar' | 'phases' | 'sparkline' | 'invoices'
}) {
  return (
    <div
      className={`card card-glow group relative flex h-full min-h-[180px] flex-col p-5 md:min-h-[220px] md:p-6 ${span}`}
    >
      <div className="mb-5 flex items-start justify-between">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-border-strong bg-surface text-accent-soft transition group-hover:border-accent/40 group-hover:bg-accent/5">
          <Icon size={18} strokeWidth={1.75} />
        </div>
        <span className="font-mono text-[10px] tracking-widest text-faint">
          {number}
        </span>
      </div>

      <h3 className="text-lg font-semibold text-fg-strong">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted">{desc}</p>

      {decoration && (
        <div className="mt-auto pt-6">
          <Decoration kind={decoration} />
        </div>
      )}
    </div>
  )
}

function Decoration({ kind }: { kind: NonNullable<'avatars' | 'bar' | 'phases' | 'sparkline' | 'invoices'> }) {
  if (kind === 'avatars') {
    const initials = ['KB', 'AS', 'NL', 'JV', 'EH']
    const colors = [
      'bg-cyan-500/15 text-cyan-300 border-cyan-500/30',
      'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
      'bg-amber-500/15 text-amber-300 border-amber-500/30',
      'bg-violet-500/15 text-violet-300 border-violet-500/30',
      'bg-rose-500/15 text-rose-300 border-rose-500/30',
    ]
    return (
      <div className="flex items-center gap-3">
        <div className="flex -space-x-2">
          {initials.map((i, idx) => (
            <div
              key={i}
              className={`flex h-7 w-7 items-center justify-center rounded-full border ${colors[idx]} text-[10px] font-semibold ring-2 ring-bg-elevated`}
            >
              {i}
            </div>
          ))}
        </div>
        <span className="font-mono text-[11px] text-subtle">+ 124</span>
      </div>
    )
  }

  if (kind === 'phases') {
    return (
      <div className="space-y-1.5">
        <div className="flex h-1.5 gap-0.5">
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              className={`flex-1 rounded-full ${
                i < 7
                  ? 'bg-accent/80'
                  : i === 7
                    ? 'bg-accent/40'
                    : 'bg-border-strong'
              }`}
            />
          ))}
        </div>
        <p className="font-mono text-[10px] text-subtle">7 / 12 faser</p>
      </div>
    )
  }

  if (kind === 'bar') {
    return (
      <div className="space-y-1.5">
        <div className="flex items-baseline justify-between">
          <span className="font-mono text-[11px] text-subtle">ROT</span>
          <span className="font-mono text-[11px] text-accent-soft">- 30%</span>
        </div>
        <div className="h-1 overflow-hidden rounded-full bg-surface-2">
          <div className="h-full w-[70%] rounded-full bg-gradient-to-r from-accent-deep to-accent" />
        </div>
      </div>
    )
  }

  if (kind === 'sparkline') {
    return (
      <svg
        viewBox="0 0 120 40"
        className="h-10 w-full"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="sparkFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgb(34,211,238)" stopOpacity="0.4" />
            <stop offset="100%" stopColor="rgb(34,211,238)" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path
          d="M0,32 L15,28 L30,30 L45,22 L60,24 L75,16 L90,18 L105,8 L120,10 L120,40 L0,40 Z"
          fill="url(#sparkFill)"
        />
        <path
          d="M0,32 L15,28 L30,30 L45,22 L60,24 L75,16 L90,18 L105,8 L120,10"
          fill="none"
          stroke="rgb(34,211,238)"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    )
  }

  if (kind === 'invoices') {
    return (
      <div className="grid grid-cols-4 gap-1.5">
        {[
          { label: 'Skickade', color: 'bg-accent/30' },
          { label: 'Obetalda', color: 'bg-warning/40' },
          { label: 'Försenade', color: 'bg-danger/40' },
          { label: 'Betalda', color: 'bg-success/40' },
        ].map((s) => (
          <div key={s.label} className="space-y-1.5">
            <div className={`h-1 rounded-full ${s.color}`} />
            <p className="truncate text-[10px] text-subtle">{s.label}</p>
          </div>
        ))}
      </div>
    )
  }

  return null
}
