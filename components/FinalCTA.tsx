import { ArrowRight, Calendar } from 'lucide-react'
import { useTranslations } from 'next-intl'

export function FinalCTA() {
  const t = useTranslations('finalCta')

  return (
    <section
      id="cta"
      className="relative overflow-hidden border-t border-border py-14 md:py-32"
    >
      {/* Glow */}
      <div
        aria-hidden
        className="absolute left-1/2 top-1/2 h-[500px] w-[1000px] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(ellipse_50%_50%_at_50%_50%,rgba(52,211,153,0.16),transparent_70%)]"
      />
      <div className="absolute inset-0 grid-bg mask-fade-b opacity-40" />

      <div className="container-x relative text-center">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-balance text-[22px] font-semibold leading-[1.08] tracking-tightest text-fg-strong sm:text-4xl md:text-5xl lg:text-[64px]">
            <span className="accent-gradient">{t('title')}</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm text-muted text-balance md:mt-6 md:text-lg">
            {t('sub')}
          </p>

          <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row md:mt-10">
            <a href="mailto:hello@open-crm.org" className="btn btn-primary w-full !h-11 !px-5 !text-sm sm:w-auto md:!h-12 md:!px-7 md:!text-base">
              <Calendar size={15} />
              {t('cta')}
              <ArrowRight size={15} />
            </a>
            <a href="#" className="text-xs text-muted underline-offset-4 hover:text-fg hover:underline md:text-sm">
              {t('secondary')}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
