'use client'

import { Search, Send, Paperclip, Smile, Phone } from 'lucide-react'
import { chatThreads, chatMessages } from '@/lib/fixtures/data'
import type { ChatThread } from '@/lib/fixtures/types'

const COLOR_BG: Record<ChatThread['color'], string> = {
  cyan: 'bg-cyan-500/15 text-cyan-300 border-cyan-500/30',
  emerald: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
  amber: 'bg-amber-500/15 text-amber-300 border-amber-500/30',
  rose: 'bg-rose-500/15 text-rose-300 border-rose-500/30',
  violet: 'bg-violet-500/15 text-violet-300 border-violet-500/30',
  blue: 'bg-blue-500/15 text-blue-300 border-blue-500/30',
}

export function ChatView() {
  const active = chatThreads[0]

  return (
    <div className="flex h-full">
      {/* Thread list — desktop only; mobile shows just the active conversation */}
      <aside className="hidden w-72 shrink-0 flex-col border-r border-border bg-sidebar md:flex lg:w-80">
        <div className="border-b border-border p-4">
          <h1 className="text-base font-semibold text-fg">Chat</h1>
          <div className="relative mt-3">
            <Search
              size={13}
              className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-subtle"
            />
            <input
              className="input w-full pl-8 text-sm"
              placeholder="Sök personal..."
              readOnly
            />
          </div>
        </div>
        <ul className="flex-1 overflow-auto">
          {chatThreads.map((t, i) => (
            <li key={t.id}>
              <button
                className={`flex w-full items-start gap-3 border-b border-border px-4 py-3 text-left transition-colors ${
                  i === 0 ? 'bg-elevated' : 'hover:bg-hover'
                }`}
              >
                <div className="relative shrink-0">
                  <div
                    className={`flex h-9 w-9 items-center justify-center rounded-full border text-xs font-semibold ${COLOR_BG[t.color]}`}
                  >
                    {t.initials}
                  </div>
                  {t.online && (
                    <span className="absolute bottom-0 right-0 size-2.5 rounded-full border-2 border-sidebar bg-emerald-400" />
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <p className="truncate text-sm font-medium text-fg">
                      {t.namn}
                    </p>
                    <span className="shrink-0 font-mono text-[10px] tabular-nums text-subtle">
                      {t.time}
                    </span>
                  </div>
                  <div className="mt-0.5 flex items-center justify-between gap-2">
                    <p className="truncate text-xs text-muted">{t.preview}</p>
                    {t.unread > 0 && (
                      <span className="inline-flex h-[18px] min-w-[18px] shrink-0 items-center justify-center rounded-full bg-red-400 px-1.5 text-[10px] font-semibold tabular-nums text-white">
                        {t.unread}
                      </span>
                    )}
                  </div>
                </div>
              </button>
            </li>
          ))}
        </ul>
      </aside>

      {/* Active conversation */}
      <main className="flex min-w-0 flex-1 flex-col">
        {/* Header */}
        <div className="flex shrink-0 items-center justify-between gap-3 border-b border-border bg-sidebar px-4 py-3 md:px-6">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div
                className={`flex h-9 w-9 items-center justify-center rounded-full border text-xs font-semibold ${COLOR_BG[active.color]}`}
              >
                {active.initials}
              </div>
              {active.online && (
                <span className="absolute bottom-0 right-0 size-2.5 rounded-full border-2 border-sidebar bg-emerald-400" />
              )}
            </div>
            <div>
              <p className="text-sm font-medium text-fg">{active.namn}</p>
              <p className="text-[11px] text-emerald-400">
                {active.online ? 'Online' : 'Offline'} · {active.yrke}
              </p>
            </div>
          </div>
          <button className="flex h-8 w-8 items-center justify-center rounded-md border border-border text-muted transition-colors hover:bg-hover hover:text-fg">
            <Phone size={13} />
          </button>
        </div>

        {/* Messages */}
        <div className="flex flex-1 flex-col gap-3 overflow-auto px-4 py-5 md:px-6">
          <div className="self-center text-[10px] uppercase tracking-widest text-subtle">
            Idag
          </div>
          {chatMessages.map((m) => (
            <div
              key={m.id}
              className={`flex max-w-[78%] flex-col gap-1 ${
                m.fromMe ? 'self-end items-end' : 'self-start items-start'
              }`}
            >
              <div
                className={`rounded-2xl px-3.5 py-2 text-sm leading-relaxed ${
                  m.fromMe
                    ? 'rounded-br-sm bg-fg text-bg'
                    : 'rounded-bl-sm bg-elevated text-fg'
                }`}
              >
                {m.text}
              </div>
              <span className="px-1 font-mono text-[10px] text-subtle">
                {m.time}
              </span>
            </div>
          ))}
        </div>

        {/* Input */}
        <div className="shrink-0 border-t border-border bg-sidebar p-4">
          <div className="flex items-center gap-2 rounded-xl border border-border bg-elevated px-3 py-2">
            <button className="text-subtle hover:text-fg">
              <Paperclip size={14} />
            </button>
            <input
              className="flex-1 bg-transparent text-sm text-fg outline-none placeholder:text-subtle"
              placeholder="Skriv ett meddelande..."
              readOnly
            />
            <button className="text-subtle hover:text-fg">
              <Smile size={14} />
            </button>
            <button className="flex h-7 w-7 items-center justify-center rounded-lg bg-fg text-bg transition-opacity hover:opacity-80">
              <Send size={12} />
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}
