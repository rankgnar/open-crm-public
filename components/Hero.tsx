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
    <section className="relative overflow-hidden pt-12 pb-10 md:pt-40 md:pb-32">
      {/* Background layers */}
      <div className="absolute inset-0 grid-bg mask-fade-b opacity-60" />
      <div
        aria-hidden
        className="absolute left-1/2 top-0 h-[600px] w-[1200px] -translate-x-1/2 bg-[radial-gradient(ellipse_50%_50%_at_50%_0%,rgba(52,211,153,0.18),transparent_70%)]"
      />

      <div className="container-x relative">
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-16">
          {/* Left: copy */}
          <div className="lg:col-span-6 lg:pt-6">
            <div className="pill animate-fade-up">
              <span className="pulse-dot" />
              <span>{t('badge')}</span>
            </div>

            <h1
              className="mt-4 text-[22px] font-semibold leading-[1.08] tracking-tightest text-balance sm:text-[34px] md:text-[52px] lg:text-[68px] animate-fade-up"
              style={{ animationDelay: '60ms' }}
            >
              <span className="headline-gradient block">{t('titleLine1')}</span>
              <span className="accent-gradient block">{t('titleLine2')}</span>
            </h1>

            <p
              className="mt-4 max-w-xl text-sm leading-relaxed text-muted text-balance sm:text-base md:mt-6 md:text-lg animate-fade-up"
              style={{ animationDelay: '120ms' }}
            >
              {t('sub')}
            </p>

            {/* Command box */}
            <div
              className="mt-6 flex max-w-md items-center gap-2 rounded-xl border border-border-strong bg-surface/80 p-1 pl-3 backdrop-blur-sm animate-fade-up md:mt-8 md:pl-4"
              style={{ animationDelay: '180ms' }}
            >
              <span className="font-mono text-xs text-subtle select-none md:text-sm">$</span>
              <code className="flex-1 overflow-x-auto whitespace-nowrap font-mono text-[12px] text-fg-strong [scrollbar-width:none] md:text-[13px] [&::-webkit-scrollbar]:hidden">
                {command}
              </code>
              <button
                onClick={copy}
                className="inline-flex h-7 w-7 items-center justify-center rounded-md border border-border-strong bg-bg-elevated text-muted transition hover:border-faint hover:text-fg md:h-8 md:w-8"
                aria-label="Copy command"
              >
                {copied ? (
                  <Check size={13} className="text-success" />
                ) : (
                  <Copy size={13} />
                )}
              </button>
            </div>

            {/* CTAs */}
            <div
              className="mt-5 flex flex-col gap-2.5 animate-fade-up sm:flex-row sm:flex-wrap sm:items-center md:mt-7 md:gap-3"
              style={{ animationDelay: '240ms' }}
            >
              <Link href="/tjanster" className="btn btn-primary w-full !h-10 !text-sm sm:w-auto md:!h-11 md:!text-base">
                {t('ctaPrimary')}
                <ArrowRight size={14} />
              </Link>
              <a
                href={GITHUB_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ghost w-full !h-10 !text-sm sm:w-auto md:!h-11 md:!text-base"
              >
                <Github size={14} />
                {t('ctaSecondary')}
              </a>
            </div>
          </div>

          {/* Right: live product frame — full UI, scaled to fit on mobile */}
          <div
            className="animate-fade-up lg:col-span-6"
            style={{ animationDelay: '300ms' }}
          >
            <ProductFrame active="workspace" height={460} naturalWidth={640}>
              <WorkspaceView />
            </ProductFrame>
          </div>
        </div>
      </div>
    </section>
  )
}
