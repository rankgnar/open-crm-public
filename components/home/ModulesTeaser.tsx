import {
  Users,
  FolderKanban,
  CalendarDays,
  TrendingUp,
  ArrowRight,
  type LucideIcon,
} from 'lucide-react'
import { useTranslations } from 'next-intl'
import { Link } from '@/lib/i18n/navigation'

const ITEMS: Array<{
  modKey: 'kunder' | 'projekt' | 'schema' | 'ekonomi'
  icon: LucideIcon
}> = [
  { modKey: 'kunder', icon: Users },
  { modKey: 'projekt', icon: FolderKanban },
  { modKey: 'schema', icon: CalendarDays },
  { modKey: 'ekonomi', icon: TrendingUp },
]

export function ModulesTeaser() {
  const tHome = useTranslations('home.modulesTeaser')
  const tMod = useTranslations('modules')

  return (
    <section className="relative scroll-mt-24 py-16 md:py-28">
      <div className="container-x">
        <header className="mx-auto max-w-2xl text-center">
          <p className="eyebrow justify-center">{tHome('eyebrow')}</p>
          <h2 className="mt-5 text-balance text-[26px] font-semibold tracking-tight text-fg-strong sm:text-4xl md:text-[44px]">
            <span className="headline-gradient">{tHome('title')}</span>
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-base text-muted text-balance">
            {tHome('sub')}
          </p>
        </header>

        <div className="mt-12 grid grid-cols-1 gap-3 sm:grid-cols-2 md:gap-4 lg:grid-cols-4">
          {ITEMS.map(({ modKey, icon: Icon }) => (
            <div
              key={modKey}
              className="card group relative flex h-full flex-col p-5 md:p-6"
            >
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg border border-border-strong bg-surface text-accent-soft transition group-hover:border-accent/40 group-hover:bg-accent/5">
                <Icon size={18} strokeWidth={1.75} />
              </div>
              <h3 className="text-base font-semibold text-fg-strong">
                {tMod(`${modKey}.title`)}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {tMod(`${modKey}.desc`)}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <Link href="/produkten" className="btn btn-ghost !h-10 !text-sm">
            {tHome('cta')}
            <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </section>
  )
}
