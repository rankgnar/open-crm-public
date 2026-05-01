import { Github } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { Logo } from './Logo'

const GITHUB_URL = 'https://github.com/rankgnar/open-crm-public'

export function Footer() {
  const t = useTranslations('footer')

  return (
    <footer className="border-t border-border bg-bg">
      <div className="container-x py-16">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <Logo />
            <p className="mt-4 max-w-xs text-sm text-muted">{t('tagline')}</p>
            <div className="mt-6 flex items-center gap-2">
              <a
                href={GITHUB_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-9 items-center gap-1.5 rounded-md border border-border-strong px-3 text-sm text-muted transition hover:border-faint hover:text-fg"
              >
                <Github size={14} />
                <span>{t('github')}</span>
              </a>
            </div>
          </div>

          <div className="md:col-span-7 grid grid-cols-2 gap-8 sm:grid-cols-3">
            <FooterCol title={t('product')}>
              <FooterLink href="#modules">{t('modules')}</FooterLink>
              <FooterLink href="#stack">{t('stack')}</FooterLink>
              <FooterLink href="#services">{t('services')}</FooterLink>
              <FooterLink href="#cta">{t('demo')}</FooterLink>
            </FooterCol>

            <FooterCol title={t('resources')}>
              <FooterLink href={GITHUB_URL} external>
                {t('github')}
              </FooterLink>
              <FooterLink href="#" muted>
                {t('docs')}
              </FooterLink>
              <FooterLink href="#" muted>
                {t('changelog')}
              </FooterLink>
              <FooterLink href={`${GITHUB_URL}/blob/main/LICENSE`} external>
                {t('license')}
              </FooterLink>
            </FooterCol>

            <FooterCol title={t('company')}>
              <FooterLink href="mailto:hello@open-crm.org">
                {t('contact')}
              </FooterLink>
              <FooterLink href="#" muted>
                {t('privacy')}
              </FooterLink>
            </FooterCol>
          </div>
        </div>

        <div className="mt-14 flex border-t border-border pt-6 sm:items-center sm:justify-end">
          <p className="font-mono text-[11px] text-subtle">
            {t('license_short')}
          </p>
        </div>
      </div>
    </footer>
  )
}

function FooterCol({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <div className="space-y-3">
      <p className="text-[11px] font-semibold uppercase tracking-widest text-subtle">
        {title}
      </p>
      <ul className="space-y-2">{children}</ul>
    </div>
  )
}

function FooterLink({
  href,
  children,
  external,
  muted,
}: {
  href: string
  children: React.ReactNode
  external?: boolean
  muted?: boolean
}) {
  return (
    <li>
      <a
        href={href}
        {...(external
          ? { target: '_blank', rel: 'noopener noreferrer' }
          : {})}
        className={`text-sm transition ${
          muted ? 'text-subtle hover:text-muted' : 'text-muted hover:text-fg'
        }`}
      >
        {children}
      </a>
    </li>
  )
}
