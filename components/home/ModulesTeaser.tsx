import {
  Users,
  FolderKanban,
  FileText,
  CalendarDays,
  TrendingUp,
  Receipt,
  ArrowRight,
  type LucideIcon,
} from 'lucide-react'
import { useTranslations } from 'next-intl'
import { Link } from '@/lib/i18n/navigation'

const STAGES: Array<{
  key: string
  icon: LucideIcon
  i18nKey: 'kunder' | 'projekt' | 'offert' | 'schema' | 'ekonomi' | 'fakturor'
}> = [
  { key: 'kunder', icon: Users, i18nKey: 'kunder' },
  { key: 'projekt', icon: FolderKanban, i18nKey: 'projekt' },
  { key: 'forslag', icon: FileText, i18nKey: 'offert' },
  { key: 'kalender', icon: CalendarDays, i18nKey: 'schema' },
  { key: 'ekonomi', icon: TrendingUp, i18nKey: 'ekonomi' },
  { key: 'fakturor', icon: Receipt, i18nKey: 'fakturor' },
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

        {/* Pipeline — horizontal on md+, vertical on mobile */}
        <div className="relative mx-auto mt-14 max-w-4xl">
          {/* Desktop track (between station centers, behind icons) */}
          <div
            aria-hidden
            className="absolute left-[8.33%] right-[8.33%] top-7 hidden h-px bg-gradient-to-r from-accent/0 via-accent/60 to-accent/0 md:block"
          />
          {/* Mobile track (vertical, left side) */}
          <div
            aria-hidden
            className="absolute bottom-7 left-7 top-7 w-px bg-gradient-to-b from-accent/0 via-accent/60 to-accent/0 md:hidden"
          />

          <ol className="relative flex flex-col gap-3 md:grid md:grid-cols-6 md:gap-2">
            {STAGES.map((s, i) => {
              const Icon = s.icon
              return (
                <li
                  key={s.key}
                  className="flex items-center gap-4 md:flex-col md:gap-3 md:text-center"
                >
                  <div className="group relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-accent/40 bg-bg-elevated shadow-[0_0_24px_-4px_rgba(52,211,153,0.45)] transition-all hover:border-accent/70 hover:shadow-[0_0_32px_-4px_rgba(52,211,153,0.6)]">
                    <Icon
                      size={20}
                      strokeWidth={1.75}
                      className="text-accent-soft"
                    />
                  </div>
                  <div className="md:text-center">
                    <p className="font-mono text-[10px] uppercase tracking-widest text-subtle">
                      {String(i + 1).padStart(2, '0')}
                    </p>
                    <p className="mt-0.5 text-sm font-medium text-fg md:mt-1">
                      {tMod(`${s.i18nKey}.title`)}
                    </p>
                  </div>
                </li>
              )
            })}
          </ol>
        </div>

        <div className="mt-14 flex justify-center">
          <Link href="/produkten" className="btn btn-ghost !h-10 !text-sm">
            {tHome('cta')}
            <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </section>
  )
}
