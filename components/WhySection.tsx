import { useTranslations } from 'next-intl'
import { Lock, Database, Heart } from 'lucide-react'

export function WhySection() {
  const t = useTranslations('why')

  return (
    <section className="relative py-24 md:py-32">
      <div
        aria-hidden
        className="absolute left-1/2 top-1/2 h-[480px] w-[860px] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(ellipse_50%_50%_at_50%_50%,rgba(52,211,153,0.08),transparent_70%)]"
      />

      <div className="container-x relative">
        <div className="mx-auto max-w-3xl">
          <p className="eyebrow">{t('label')}</p>
          <h2 className="mt-5 text-balance text-3xl font-semibold leading-[1.1] tracking-tight text-fg-strong sm:text-4xl md:text-[44px]">
            <span className="headline-gradient">{t('title')}</span>
          </h2>

          <div className="mt-10 space-y-6 text-lg leading-relaxed text-muted">
            <p className="flex gap-4">
              <Lock
                size={18}
                className="mt-1.5 shrink-0 text-accent-soft"
                strokeWidth={1.75}
              />
              <span>{t('p1')}</span>
            </p>
            <p className="flex gap-4">
              <Database
                size={18}
                className="mt-1.5 shrink-0 text-accent-soft"
                strokeWidth={1.75}
              />
              <span>{t('p2')}</span>
            </p>
            <p className="flex gap-4">
              <Heart
                size={18}
                className="mt-1.5 shrink-0 text-accent-soft"
                strokeWidth={1.75}
              />
              <span className="font-medium text-fg">{t('p3')}</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
