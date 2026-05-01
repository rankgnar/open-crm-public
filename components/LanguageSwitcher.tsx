'use client'

import { useState, useRef, useEffect } from 'react'
import { ChevronDown, Globe } from 'lucide-react'
import { usePathname, useRouter } from '@/lib/i18n/navigation'
import { useParams } from 'next/navigation'
import { routing, type Locale } from '@/lib/i18n/routing'

const NAMES: Record<Locale, string> = {
  sv: 'Svenska',
  en: 'English',
  es: 'Español',
}

const SHORT: Record<Locale, string> = {
  sv: 'SV',
  en: 'EN',
  es: 'ES',
}

export function LanguageSwitcher() {
  const router = useRouter()
  const pathname = usePathname()
  const params = useParams()
  const current = (params?.locale as Locale) ?? routing.defaultLocale
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', onClick)
    return () => document.removeEventListener('mousedown', onClick)
  }, [])

  function change(locale: Locale) {
    setOpen(false)
    router.replace(pathname, { locale })
  }

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="inline-flex h-9 items-center gap-1.5 rounded-md border border-border-strong bg-bg-elevated/40 px-3 text-sm text-muted transition hover:border-faint hover:text-fg"
        aria-label="Change language"
      >
        <Globe size={14} className="opacity-70" />
        <span className="font-medium">{SHORT[current]}</span>
        <ChevronDown size={13} className="opacity-50" />
      </button>

      {open && (
        <div className="absolute right-0 top-full z-50 mt-2 w-40 overflow-hidden rounded-lg border border-border-strong bg-surface shadow-2xl shadow-black/40">
          {routing.locales.map((loc) => (
            <button
              key={loc}
              onClick={() => change(loc)}
              className={`flex w-full items-center justify-between px-3 py-2 text-left text-sm transition ${
                loc === current
                  ? 'bg-hover text-accent-soft'
                  : 'text-fg hover:bg-hover'
              }`}
            >
              <span>{NAMES[loc]}</span>
              <span className="font-mono text-[11px] text-subtle">
                {SHORT[loc]}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
