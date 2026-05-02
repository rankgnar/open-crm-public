import { ArrowRight, Mail } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { Link } from '@/lib/i18n/navigation'

export function ServicesTeaser() {
  const tHome = useTranslations('home.servicesTeaser')

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

        <div className="mt-8 flex justify-center md:mt-10">
          <Link
            href="/tjanster"
            className="btn btn-primary !h-10 !text-sm md:!h-11 md:!text-base"
          >
            <Mail size={15} />
            {tHome('cta')}
            <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </section>
  )
}
