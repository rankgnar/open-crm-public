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
    <section className="relative scroll-mt-24 py-12 md:py-24">
      <div className="container-x">
        <header className="mx-auto max-w-2xl text-center">
          <p className="eyebrow justify-center">{tHome('eyebrow')}</p>
          <h2 className="mt-3 text-balance text-xl font-semibold tracking-tight text-fg-strong sm:text-3xl md:mt-5 md:text-[40px]">
            <span className="headline-gradient">{tHome('title')}</span>
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-muted text-balance md:mt-5 md:text-base">
            {tHome('sub')}
          </p>
        </header>

        {/* Pipeline — vertical compact stepper on mobile, horizontal track on md+ */}
        <div className="relative mx-auto mt-10 max-w-4xl md:mt-14">
          {/* Desktop horizontal track */}
          <div
            aria-hidden
            className="absolute left-[8.33%] right-[8.33%] top-7 hidden h-px bg-gradient-to-r from-accent/0 via-accent/60 to-accent/0 md:block"
          />
          {/* Mobile vertical track — solid, aligned to circle center (44/2 = 22 from left) */}
          <div
            aria-hidden
            className="absolute bottom-[22px] left-[22px] top-[22px] w-px bg-accent/30 md:hidden"
          />

          <ol className="relative flex flex-col gap-2 md:grid md:grid-cols-6 md:gap-2">
            {STAGES.map((s, i) => {
              const Icon = s.icon
              return (
                <li
                  key={s.key}
                  className="flex items-center gap-3 md:flex-col md:gap-3 md:text-center"
                >
                  <div className="relative z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-accent/40 bg-bg-elevated shadow-[0_0_18px_-4px_rgba(52,211,153,0.45)] md:h-14 md:w-14">
                    <Icon
                      size={16}
                      strokeWidth={1.75}
                      className="text-accent-soft md:hidden"
                    />
                    <Icon
                      size={20}
                      strokeWidth={1.75}
                      className="hidden text-accent-soft md:block"
                    />
                  </div>
                  <div className="flex items-baseline gap-2 md:flex-col md:items-center md:gap-0 md:text-center">
                    <span className="font-mono text-[10px] uppercase tracking-widest text-subtle">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="text-sm font-medium text-fg md:mt-1 md:text-sm">
                      {tMod(`${s.i18nKey}.title`)}
                    </span>
                  </div>
                </li>
              )
            })}
          </ol>
        </div>

        <div className="mt-10 flex justify-center md:mt-14">
          <Link href="/produkten" className="btn btn-ghost !h-9 !text-xs md:!h-10 md:!text-sm">
            {tHome('cta')}
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  )
}
