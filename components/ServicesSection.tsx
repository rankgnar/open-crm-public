import { Check, ArrowRight } from 'lucide-react'
import { useTranslations } from 'next-intl'

const TIERS = [
  {
    key: 'install' as const,
    popular: false,
    includeKeys: [
      'include1',
      'include2',
      'include3',
      'include4',
      'include5',
    ] as const,
  },
  {
    key: 'customize' as const,
    popular: true,
    includeKeys: [
      'include1',
      'include2',
      'include3',
      'include4',
      'include5',
    ] as const,
  },
  {
    key: 'maintain' as const,
    popular: false,
    includeKeys: [
      'include1',
      'include2',
      'include3',
      'include4',
      'include5',
    ] as const,
  },
]

export function ServicesSection() {
  const t = useTranslations('services')

  return (
    <section
      id="services"
      className="relative scroll-mt-24 border-t border-border py-16 md:py-32"
    >
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

        <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-3">
          {TIERS.map((tier) => {
            const tierT = (k: string) => t(`tiers.${tier.key}.${k}`)
            return (
              <div
                key={tier.key}
                className={`relative flex flex-col rounded-2xl border p-5 transition-all duration-300 md:p-7 ${
                  tier.popular
                    ? 'border-accent/40 bg-gradient-to-b from-accent/5 to-transparent shadow-2xl shadow-accent/5'
                    : 'border-border bg-bg-elevated hover:border-border-strong'
                }`}
              >
                {tier.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full border border-accent/40 bg-bg-elevated px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-accent-soft">
                    {t('tiers.customize.popular')}
                  </span>
                )}

                <div className="space-y-1.5">
                  <h3 className="text-xl font-semibold text-fg-strong">
                    {tierT('name')}
                  </h3>
                  <p className="text-sm text-accent-soft">
                    {tierT('tagline')}
                  </p>
                </div>

                <p className="mt-4 text-sm leading-relaxed text-muted">
                  {tierT('desc')}
                </p>

                <div className="mt-6 border-y border-border py-5">
                  <p className="text-2xl font-semibold tracking-tight text-fg-strong">
                    {tierT('price')}
                  </p>
                  <p className="mt-1 font-mono text-[11px] uppercase tracking-widest text-subtle">
                    {tierT('priceNote')}
                  </p>
                </div>

                <ul className="mt-5 space-y-2.5 md:mt-6 md:space-y-3">
                  {tier.includeKeys.map((k) => (
                    <li key={k} className="flex items-start gap-2.5 text-sm">
                      <Check
                        size={15}
                        className="mt-0.5 shrink-0 text-accent-soft"
                        strokeWidth={2.25}
                      />
                      <span className="text-fg">{tierT(k)}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href="mailto:hello@open-crm.org"
                  className={`mt-8 w-full ${
                    tier.popular ? 'btn btn-primary' : 'btn btn-ghost'
                  }`}
                >
                  {tierT('cta')}
                  <ArrowRight size={15} />
                </a>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
