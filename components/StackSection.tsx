import {
  Atom,
  Database,
  Code2,
  Sparkles,
  Github,
  Zap,
  type LucideIcon,
} from 'lucide-react'
import { useTranslations } from 'next-intl'

const STACK: Array<{
  icon: LucideIcon
  name: string
  versionTag: string
  itemKey: 'electron' | 'react' | 'supabase' | 'ts' | 'tailwind' | 'github'
  color: string
}> = [
  {
    icon: Zap,
    name: 'Electron',
    versionTag: 'v33',
    itemKey: 'electron',
    color: 'text-cyan-300',
  },
  {
    icon: Atom,
    name: 'React',
    versionTag: 'v19',
    itemKey: 'react',
    color: 'text-sky-300',
  },
  {
    icon: Database,
    name: 'Supabase',
    versionTag: 'Postgres',
    itemKey: 'supabase',
    color: 'text-emerald-300',
  },
  {
    icon: Code2,
    name: 'TypeScript',
    versionTag: 'v5.7',
    itemKey: 'ts',
    color: 'text-blue-300',
  },
  {
    icon: Sparkles,
    name: 'Tailwind',
    versionTag: 'v4',
    itemKey: 'tailwind',
    color: 'text-teal-300',
  },
  {
    icon: Github,
    name: 'GitHub',
    versionTag: 'MIT',
    itemKey: 'github',
    color: 'text-violet-300',
  },
]

export function StackSection() {
  const t = useTranslations('stack')

  return (
    <section
      id="stack"
      className="relative scroll-mt-24 border-y border-border bg-surface/20 py-24 md:py-32"
    >
      <div className="container-x">
        <header className="mx-auto max-w-2xl text-center">
          <p className="eyebrow justify-center">{t('label')}</p>
          <h2 className="mt-5 text-balance text-3xl font-semibold tracking-tight text-fg-strong sm:text-4xl md:text-5xl">
            <span className="headline-gradient">{t('title')}</span>
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-base text-muted text-balance">
            {t('sub')}
          </p>
        </header>

        <div className="mt-14 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
          {STACK.map((s) => {
            const Icon = s.icon
            return (
              <div
                key={s.name}
                className="card group flex flex-col items-center gap-2.5 p-5 text-center"
              >
                <div className={`mb-1 ${s.color}`}>
                  <Icon size={22} strokeWidth={1.5} />
                </div>
                <p className="text-sm font-semibold text-fg-strong">{s.name}</p>
                <p className="font-mono text-[10px] uppercase tracking-widest text-subtle">
                  {s.versionTag}
                </p>
                <p className="mt-1 text-[11px] text-muted text-balance">
                  {t(`items.${s.itemKey}`)}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
