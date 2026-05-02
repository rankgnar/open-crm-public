import { ArrowRight } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { Link } from '@/lib/i18n/navigation'

const TIERS = ['install', 'customize', 'maintain'] as const

export function ServicesTeaser() {
  const tHome = useTranslations('home.servicesTeaser')
  const tSrv = useTranslations('services')

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

        <div className="mt-8 grid grid-cols-1 gap-3 md:mt-12 md:grid-cols-3 md:gap-4">
          {TIERS.map((tier) => {
            const isPopular = tier === 'customize'
            return (
              <div
                key={tier}
                className={`flex flex-col rounded-2xl border p-5 ${
                  isPopular
                    ? 'border-accent/40 bg-gradient-to-b from-accent/5 to-transparent'
                    : 'border-border bg-bg-elevated'
                }`}
              >
                <h3 className="text-lg font-semibold text-fg-strong">
                  {tSrv(`tiers.${tier}.name`)}
                </h3>
                <p className="mt-1 text-sm text-accent-soft">
                  {tSrv(`tiers.${tier}.tagline`)}
                </p>
                <p className="mt-5 text-xl font-semibold tracking-tight text-fg-strong">
                  {tSrv(`tiers.${tier}.price`)}
                </p>
                <p className="mt-1 font-mono text-[10px] uppercase tracking-widest text-subtle">
                  {tSrv(`tiers.${tier}.priceNote`)}
                </p>
              </div>
            )
          })}
        </div>

        <div className="mt-8 flex justify-center md:mt-10">
          <Link href="/tjanster" className="btn btn-primary !h-9 !text-xs md:!h-10 md:!text-sm">
            {tHome('cta')}
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  )
}
