'use client'

import { Sun, Moon } from 'lucide-react'

const STORAGE_KEY = 'open-crm-web-theme'

function toggleTheme(): void {
  const current = document.documentElement.getAttribute('data-theme')
  const next = current === 'light' ? 'dark' : 'light'
  document.documentElement.setAttribute('data-theme', next)
  try {
    window.localStorage.setItem(STORAGE_KEY, next)
  } catch {
    // localStorage may be unavailable; ignore.
  }
}

export function ThemeToggle() {
  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle theme"
      title="Toggle theme"
      className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border-strong bg-bg-elevated/40 text-muted transition hover:border-faint hover:text-fg"
    >
      <Sun size={14} className="theme-dark-only" />
      <Moon size={14} className="theme-light-only" />
    </button>
  )
}
