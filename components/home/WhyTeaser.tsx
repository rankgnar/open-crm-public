import { ArrowRight, Heart } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { Link } from '@/lib/i18n/navigation'

export function WhyTeaser() {
  const t = useTranslations('home.whyTeaser')

  return (
    <section className="relative border-t border-border py-16 md:py-24">
      <div
        aria-hidden
        className="absolute left-1/2 top-1/2 h-[300px] w-[600px] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(ellipse_50%_50%_at_50%_50%,rgba(52,211,153,0.06),transparent_70%)]"
      />

      <div className="container-x relative">
        <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-border-strong bg-bg-elevated text-accent-soft">
            <Heart size={16} strokeWidth={1.75} />
          </div>
          <p className="eyebrow mt-5 justify-center">{t('eyebrow')}</p>
          <h2 className="mt-4 text-balance text-[24px] font-semibold tracking-tight text-fg-strong sm:text-3xl md:text-4xl">
            <span className="headline-gradient">{t('title')}</span>
          </h2>
          <p className="mt-5 max-w-xl text-base text-muted text-balance">
            {t('sub')}
          </p>
          <Link href="/varfor" className="btn btn-ghost mt-8 !h-10 !text-sm">
            {t('cta')}
            <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </section>
  )
}
