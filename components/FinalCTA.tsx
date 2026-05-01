import { ArrowRight, Calendar } from 'lucide-react'
import { useTranslations } from 'next-intl'

export function FinalCTA() {
  const t = useTranslations('finalCta')

  return (
    <section
      id="cta"
      className="relative overflow-hidden border-t border-border py-28 md:py-36"
    >
      {/* Glow */}
      <div
        aria-hidden
        className="absolute left-1/2 top-1/2 h-[500px] w-[1000px] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(ellipse_50%_50%_at_50%_50%,rgba(34,211,238,0.16),transparent_70%)]"
      />
      <div className="absolute inset-0 grid-bg mask-fade-b opacity-40" />

      <div className="container-x relative text-center">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-balance text-4xl font-semibold leading-[1.05] tracking-tightest text-fg-strong sm:text-5xl md:text-[64px]">
            <span className="accent-gradient">{t('title')}</span>
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-base text-muted text-balance sm:text-lg">
            {t('sub')}
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a href="mailto:hello@open-crm.org" className="btn btn-primary !h-12 !px-7 !text-base">
              <Calendar size={16} />
              {t('cta')}
              <ArrowRight size={16} />
            </a>
            <a href="#" className="text-sm text-muted underline-offset-4 hover:text-fg hover:underline">
              {t('secondary')}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
