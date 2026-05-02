import {
  Settings,
  Wrench,
  Plug,
  Headphones,
  GraduationCap,
  ArrowRightLeft,
  Mail,
  ArrowRight,
  type LucideIcon,
} from 'lucide-react'
import { useTranslations } from 'next-intl'

type AreaKey =
  | 'installation'
  | 'customization'
  | 'integration'
  | 'support'
  | 'training'
  | 'migration'

const AREAS: Array<{ key: AreaKey; icon: LucideIcon }> = [
  { key: 'installation', icon: Settings },
  { key: 'customization', icon: Wrench },
  { key: 'integration', icon: Plug },
  { key: 'support', icon: Headphones },
  { key: 'training', icon: GraduationCap },
  { key: 'migration', icon: ArrowRightLeft },
]

export function ServicesSection() {
  const t = useTranslations('services')

  return (
    <section
      id="services"
      className="relative scroll-mt-24 border-t border-border py-12 md:py-24"
    >
      <div className="container-x">
        <header className="mx-auto max-w-2xl text-center">
          <p className="eyebrow justify-center">{t('label')}</p>
          <h2 className="mt-3 text-balance text-2xl font-semibold tracking-tight text-fg-strong sm:text-3xl md:mt-5 md:text-[44px]">
            <span className="headline-gradient">{t('title')}</span>
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-muted text-balance md:mt-5 md:text-base">
            {t('sub')}
          </p>
        </header>

        {/* Areas grid */}
        <div className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2 md:mt-14 md:grid-cols-3 md:gap-4">
          {AREAS.map(({ key, icon: Icon }) => (
            <div key={key} className="card flex flex-col p-5 md:p-6">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg border border-border-strong bg-surface text-accent-soft">
                <Icon size={18} strokeWidth={1.75} />
              </div>
              <h3 className="text-base font-semibold text-fg-strong">
                {t(`areas.${key}.title`)}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {t(`areas.${key}.desc`)}
              </p>
            </div>
          ))}
        </div>

        {/* Consultation CTA block */}
        <div className="mx-auto mt-12 max-w-2xl rounded-2xl border border-accent/30 bg-gradient-to-b from-accent/5 to-transparent p-6 text-center md:mt-16 md:p-8">
          <h3 className="text-xl font-semibold text-fg-strong sm:text-2xl">
            {t('cta.title')}
          </h3>
          <p className="mx-auto mt-3 max-w-md text-sm text-muted text-balance md:text-base">
            {t('cta.sub')}
          </p>
          <a
            href="mailto:hello@open-crm.org"
            className="btn btn-primary mt-6 !h-11 !text-sm md:!text-base"
          >
            <Mail size={15} />
            {t('cta.button')}
            <ArrowRight size={15} />
          </a>
        </div>
      </div>
    </section>
  )
}
