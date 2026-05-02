'use client'

import { useEffect, useState } from 'react'
import { Github, Menu, X } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { Link } from '@/lib/i18n/navigation'
import { Logo } from './Logo'
import { LanguageSwitcher } from './LanguageSwitcher'
import { ThemeToggle } from './ThemeToggle'

const GITHUB_URL = 'https://github.com/rankgnar/open-crm-public'

export function Navbar() {
  const t = useTranslations('nav')
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = [
    { href: '/produkten', label: t('produkten') },
    { href: '/workflows', label: t('workflows') },
    { href: '/tjanster', label: t('services') },
    { href: '/varfor', label: t('why') },
  ]

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'border-b border-border bg-bg/80 backdrop-blur-xl'
          : 'border-b border-transparent'
      }`}
    >
      <div className="container-x flex h-16 items-center justify-between">
        <Link href="/" className="shrink-0">
          <Logo />
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm text-muted transition hover:text-fg"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <ThemeToggle />
          <LanguageSwitcher />
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-9 items-center gap-1.5 rounded-md border border-border-strong bg-bg-elevated/40 px-3 text-sm text-muted transition hover:border-faint hover:text-fg"
          >
            <Github size={14} />
            <span>{t('github')}</span>
          </a>
          <Link href="/tjanster" className="btn btn-primary !h-9 !text-sm">
            {t('book')}
          </Link>
        </div>

        {/* Mobile actions — always visible outside the hamburger */}
        <div className="flex items-center gap-1.5 md:hidden">
          <ThemeToggle />
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border-strong bg-bg-elevated/40 text-muted transition hover:border-faint hover:text-fg"
          >
            <Github size={14} />
          </a>
          <button
            className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border-strong text-muted"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="border-t border-border bg-bg/95 backdrop-blur-xl md:hidden">
          <div className="container-x flex flex-col gap-1 py-3">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setMobileOpen(false)}
                className="rounded-md px-3 py-2.5 text-sm text-fg hover:bg-hover"
              >
                {l.label}
              </Link>
            ))}
            <div className="mt-2 flex flex-col gap-3 border-t border-border pt-3">
              <LanguageSwitcher />
              <Link
                href="/tjanster"
                onClick={() => setMobileOpen(false)}
                className="btn btn-primary !h-10 w-full !text-sm"
              >
                {t('book')}
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
