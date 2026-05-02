import { ArrowRight, Heart } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { Link } from '@/lib/i18n/navigation'

export function WhyTeaser() {
  const t = useTranslations('home.whyTeaser')

  return (
    <section className="relative border-t border-border py-12 md:py-20">
      <div
        aria-hidden
        className="absolute left-1/2 top-1/2 h-[300px] w-[600px] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(ellipse_50%_50%_at_50%_50%,rgba(52,211,153,0.06),transparent_70%)]"
      />

      <div className="container-x relative">
        <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-border-strong bg-bg-elevated text-accent-soft md:h-10 md:w-10">
            <Heart size={14} strokeWidth={1.75} className="md:hidden" />
            <Heart size={16} strokeWidth={1.75} className="hidden md:block" />
          </div>
          <p className="eyebrow mt-4 justify-center md:mt-5">{t('eyebrow')}</p>
          <h2 className="mt-3 text-balance text-xl font-semibold tracking-tight text-fg-strong sm:text-3xl md:mt-4 md:text-4xl">
            <span className="headline-gradient">{t('title')}</span>
          </h2>
          <p className="mt-3 max-w-xl text-sm text-muted text-balance md:mt-5 md:text-base">
            {t('sub')}
          </p>
          <Link href="/varfor" className="btn btn-ghost mt-6 !h-9 !text-xs md:mt-8 md:!h-10 md:!text-sm">
            {t('cta')}
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  )
}
