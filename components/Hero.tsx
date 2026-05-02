'use client'

import { ArrowRight, Github, Copy, Check } from 'lucide-react'
import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { Link } from '@/lib/i18n/navigation'
import { ProductFrame } from './preview/ProductFrame'
import { WorkspaceView } from './preview/views/WorkspaceView'

const GITHUB_URL = 'https://github.com/rankgnar/open-crm-public'

export function Hero() {
  const t = useTranslations('hero')
  const command = t('command')
  const [copied, setCopied] = useState(false)

  function copy() {
    navigator.clipboard.writeText(command)
    setCopied(true)
    setTimeout(() => setCopied(false), 1800)
  }

  return (
    <section className="relative overflow-hidden pt-16 pb-12 md:pt-40 md:pb-32">
      {/* Background layers */}
      <div className="absolute inset-0 grid-bg mask-fade-b opacity-60" />
      <div
        aria-hidden
        className="absolute left-1/2 top-0 h-[600px] w-[1200px] -translate-x-1/2 bg-[radial-gradient(ellipse_50%_50%_at_50%_0%,rgba(52,211,153,0.18),transparent_70%)]"
      />

      <div className="container-x relative">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Left: copy */}
          <div className="lg:col-span-6 lg:pt-6">
            <div className="pill animate-fade-up">
              <span className="pulse-dot" />
              <span>{t('badge')}</span>
            </div>

            <h1
              className="mt-5 text-[28px] font-semibold leading-[1.05] tracking-tightest text-balance sm:text-[40px] md:text-[56px] lg:text-[68px] animate-fade-up"
              style={{ animationDelay: '60ms' }}
            >
              <span className="headline-gradient block">{t('titleLine1')}</span>
              <span className="accent-gradient block">{t('titleLine2')}</span>
            </h1>

            <p
              className="mt-6 max-w-xl text-base leading-relaxed text-muted text-balance sm:text-lg animate-fade-up"
              style={{ animationDelay: '120ms' }}
            >
              {t('sub')}
            </p>

            {/* Command box */}
            <div
              className="mt-8 flex max-w-md items-center gap-2 rounded-xl border border-border-strong bg-surface/80 p-1 pl-4 backdrop-blur-sm animate-fade-up"
              style={{ animationDelay: '180ms' }}
            >
              <span className="font-mono text-sm text-subtle select-none">$</span>
              <code className="flex-1 overflow-x-auto whitespace-nowrap font-mono text-[13px] text-fg-strong [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                {command}
              </code>
              <button
                onClick={copy}
                className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-border-strong bg-bg-elevated text-muted transition hover:border-faint hover:text-fg"
                aria-label="Copy command"
              >
                {copied ? (
                  <Check size={14} className="text-success" />
                ) : (
                  <Copy size={14} />
                )}
              </button>
            </div>

            {/* CTAs */}
            <div
              className="mt-7 flex flex-col gap-3 animate-fade-up sm:flex-row sm:flex-wrap sm:items-center"
              style={{ animationDelay: '240ms' }}
            >
              <Link href="/tjanster" className="btn btn-primary w-full sm:w-auto">
                {t('ctaPrimary')}
                <ArrowRight size={15} />
              </Link>
              <a
                href={GITHUB_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ghost w-full sm:w-auto"
              >
                <Github size={15} />
                {t('ctaSecondary')}
              </a>
            </div>
          </div>

          {/* Right: live product frame — desktop only, hidden on mobile/tablet */}
          <div
            className="hidden animate-fade-up lg:col-span-6 lg:block"
            style={{ animationDelay: '300ms' }}
          >
            <ProductFrame active="workspace" height={460}>
              <WorkspaceView />
            </ProductFrame>
          </div>
        </div>
      </div>
    </section>
  )
}
