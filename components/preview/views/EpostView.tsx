'use client'

import {
  Search,
  PenSquare,
  Inbox,
  Send,
  FileEdit,
  Trash2,
  Reply,
  Forward,
  Star,
  Paperclip,
  type LucideIcon,
} from 'lucide-react'

type Folder = { key: string; label: string; icon: LucideIcon; count?: number }

const FOLDERS: Folder[] = [
  { key: 'inbox', label: 'Inkorgen', icon: Inbox, count: 4 },
  { key: 'sent', label: 'Skickade', icon: Send },
  { key: 'drafts', label: 'Utkast', icon: FileEdit, count: 2 },
  { key: 'starred', label: 'Stjärnmärkta', icon: Star },
  { key: 'trash', label: 'Papperskorgen', icon: Trash2 },
]

const LABELS = [
  { name: 'Karlsson Bygg AB', color: 'bg-cyan-400' },
  { name: 'Lindqvist Fastigheter', color: 'bg-emerald-400' },
  { name: 'Nordic Materials', color: 'bg-amber-400' },
  { name: 'Fortnox', color: 'bg-violet-400' },
]

type Email = {
  id: string
  from: string
  initials: string
  color: string
  subject: string
  preview: string
  time: string
  unread?: boolean
  starred?: boolean
  hasAttachment?: boolean
  label?: string
}

const EMAILS: Email[] = [
  {
    id: '1',
    from: 'Erik Karlsson',
    initials: 'EK',
    color: 'bg-cyan-500/15 text-cyan-300 border-cyan-500/30',
    subject: 'OFF-245 — godkänd, fortsätter med kontrakt',
    preview:
      'Hej, vi har gått igenom offerten internt och vi vill köra på det vi pratade om. Skickar bilder...',
    time: '09:42',
    unread: true,
    hasAttachment: true,
    label: 'Karlsson Bygg AB',
  },
  {
    id: '2',
    from: 'Anna Lindqvist',
    initials: 'AL',
    color: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
    subject: 'Beställning material — vecka 19',
    preview:
      'Här kommer listan över det material vi behöver för Vasagatan 44. Har lagt till några extra...',
    time: '08:15',
    unread: true,
    label: 'Nordic Materials',
  },
  {
    id: '3',
    from: 'Fortnox Support',
    initials: 'FX',
    color: 'bg-violet-500/15 text-violet-300 border-violet-500/30',
    subject: 'Faktura 2026-1184 har betalats',
    preview:
      'Vi vill informera om att fakturan har betalats av Karlsson Bygg AB. Beloppet är överfört...',
    time: 'Igår',
    unread: true,
    label: 'Fortnox',
  },
  {
    id: '4',
    from: 'Niklas Larsson',
    initials: 'NL',
    color: 'bg-amber-500/15 text-amber-300 border-amber-500/30',
    subject: 'Återkoppling besök 3 maj',
    preview:
      'Tack för besöket igår. Som vi pratade om så vill vi gärna se en uppdaterad tidplan innan...',
    time: 'Igår',
    unread: true,
    starred: true,
    label: 'Lindqvist Fastigheter',
  },
  {
    id: '5',
    from: 'Johanna Vester',
    initials: 'JV',
    color: 'bg-rose-500/15 text-rose-300 border-rose-500/30',
    subject: 'Re: Slutbesiktning Stora Nygatan',
    preview:
      'Perfekt! Då bokar vi in den 15:e maj klockan 10. Hör av dig om något ändras...',
    time: 'Mån',
  },
  {
    id: '6',
    from: 'Eva Hellgren',
    initials: 'EH',
    color: 'bg-cyan-500/15 text-cyan-300 border-cyan-500/30',
    subject: 'Tidrapport vecka 18',
    preview:
      'Hej, här kommer min tidrapport för förra veckan. Karlsson 24h, Lindqvist 8h, intern 2h...',
    time: '28 apr',
    hasAttachment: true,
  },
  {
    id: '7',
    from: 'Markus Berg',
    initials: 'MB',
    color: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
    subject: 'Offertförfrågan — ny renovering',
    preview:
      'Vi blev rekommenderade av en granne och skulle vilja ha en offert på renovering av kök...',
    time: '27 apr',
  },
  {
    id: '8',
    from: 'Anna Lindqvist',
    initials: 'AL',
    color: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
    subject: 'Re: ROT-avdrag — frågor från kund',
    preview:
      'Tack för informationen. Då vet vi hur vi ska förklara det för kunden. Skickar bekräftelse...',
    time: '24 apr',
    label: 'Nordic Materials',
  },
]

export function EpostView() {
  const active = EMAILS[0]

  return (
    <div className="flex h-full">
      {/* Folders sidebar */}
      <aside className="flex w-48 shrink-0 flex-col border-r border-border bg-sidebar">
        <div className="border-b border-border px-3 py-3">
          <button className="flex w-full items-center justify-center gap-2 rounded-lg bg-fg px-3 py-2 text-xs font-medium text-bg transition-opacity hover:opacity-90">
            <PenSquare size={13} /> Ny e-post
          </button>
        </div>
        <nav className="flex-1 overflow-auto px-2 py-2">
          {FOLDERS.map((f, i) => {
            const Icon = f.icon
            const isActive = i === 0
            return (
              <button
                key={f.key}
                className={`mb-0.5 flex w-full items-center justify-between rounded-md px-2.5 py-1.5 text-xs transition-colors ${
                  isActive
                    ? 'bg-elevated text-fg'
                    : 'text-muted hover:bg-hover hover:text-fg'
                }`}
              >
                <span className="flex items-center gap-2.5">
                  <Icon size={13} strokeWidth={1.75} />
                  {f.label}
                </span>
                {f.count != null && (
                  <span className="rounded bg-bg px-1.5 py-px font-mono text-[10px] text-muted">
                    {f.count}
                  </span>
                )}
              </button>
            )
          })}

          <div className="mt-4 border-t border-border pt-3">
            <p className="mb-1.5 px-2.5 text-[10px] font-semibold uppercase tracking-widest text-subtle">
              Etiketter
            </p>
            {LABELS.map((l) => (
              <button
                key={l.name}
                className="mb-0.5 flex w-full items-center gap-2 rounded-md px-2.5 py-1.5 text-xs text-muted transition-colors hover:bg-hover hover:text-fg"
              >
                <span className={`size-2 rounded-sm ${l.color}`} />
                <span className="truncate">{l.name}</span>
              </button>
            ))}
          </div>
        </nav>
      </aside>

      {/* Email list */}
      <div className="flex w-[360px] shrink-0 flex-col border-r border-border">
        <div className="border-b border-border bg-sidebar px-4 py-3">
          <div className="flex items-center justify-between">
            <h1 className="text-base font-semibold text-fg">Inkorgen</h1>
            <span className="rounded-full border border-border bg-elevated px-2 py-0.5 text-xs text-muted">
              {EMAILS.filter((e) => e.unread).length} nya
            </span>
          </div>
          <div className="relative mt-3">
            <Search
              size={13}
              className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-subtle"
            />
            <input
              className="input w-full pl-8 text-sm"
              placeholder="Sök i e-post..."
              readOnly
            />
          </div>
        </div>

        <ul className="flex-1 overflow-auto">
          {EMAILS.map((e, i) => (
            <li key={e.id}>
              <button
                className={`flex w-full items-start gap-3 border-b border-border px-4 py-3 text-left transition-colors ${
                  i === 0 ? 'bg-elevated' : 'hover:bg-hover'
                }`}
              >
                <div
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border text-[10px] font-semibold ${e.color}`}
                >
                  {e.initials}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <p
                      className={`truncate text-sm ${
                        e.unread ? 'font-semibold text-fg' : 'font-medium text-muted'
                      }`}
                    >
                      {e.from}
                    </p>
                    <span className="shrink-0 font-mono text-[10px] tabular-nums text-subtle">
                      {e.time}
                    </span>
                  </div>
                  <p
                    className={`mt-0.5 truncate text-xs ${
                      e.unread ? 'font-medium text-fg' : 'text-muted'
                    }`}
                  >
                    {e.subject}
                  </p>
                  <p className="mt-0.5 truncate text-[11px] text-subtle">
                    {e.preview}
                  </p>
                  <div className="mt-1.5 flex items-center gap-1.5">
                    {e.label && (
                      <span className="rounded border border-border bg-elevated px-1.5 py-px text-[10px] text-muted">
                        {e.label}
                      </span>
                    )}
                    {e.hasAttachment && (
                      <Paperclip size={10} className="text-subtle" />
                    )}
                    {e.starred && (
                      <Star
                        size={10}
                        className="fill-amber-400 text-amber-400"
                      />
                    )}
                    {e.unread && (
                      <span className="ml-auto size-1.5 rounded-full bg-emerald-400" />
                    )}
                  </div>
                </div>
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Reading pane */}
      <main className="flex flex-1 flex-col overflow-hidden">
        <div className="border-b border-border bg-sidebar px-6 py-4">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0 flex-1">
              <h2 className="text-lg font-semibold text-fg">{active.subject}</h2>
              <div className="mt-2 flex items-center gap-3">
                <div
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border text-xs font-semibold ${active.color}`}
                >
                  {active.initials}
                </div>
                <div>
                  <p className="text-sm font-medium text-fg">
                    {active.from}{' '}
                    <span className="ml-1 text-xs font-normal text-subtle">
                      &lt;erik@karlssonbygg.se&gt;
                    </span>
                  </p>
                  <p className="text-[11px] text-subtle">
                    till mig · {active.time}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex shrink-0 items-center gap-1.5">
              <button className="flex h-8 items-center gap-1.5 rounded-md border border-border bg-elevated px-2.5 text-xs text-muted transition-colors hover:text-fg">
                <Reply size={12} /> Svara
              </button>
              <button className="flex h-8 items-center gap-1.5 rounded-md border border-border bg-elevated px-2.5 text-xs text-muted transition-colors hover:text-fg">
                <Forward size={12} /> Vidarebefordra
              </button>
            </div>
          </div>
        </div>

        <div className="flex-1 space-y-4 overflow-auto px-6 py-6 text-sm leading-relaxed text-muted">
          <p>Hej!</p>
          <p>
            Vi har gått igenom offerten internt och vi vill köra på det vi
            pratade om vid besöket den 28 april. Tidsplanen ser bra ut och vi
            är okej med ROT-avdraget på 30%.
          </p>
          <p>
            Bifogar bilderna som du ville ha av badrummet — det är där det
            största jobbet ligger. Vi ses som planerat på onsdag för att gå
            igenom kontraktet.
          </p>
          <p>
            En sak till: kan ni ta med en preliminär leveransplan för
            materialet? Vi vill stämma av med vår fastighetsförvaltare innan
            vi sätter igång.
          </p>
          <p>
            Mvh,
            <br />
            Erik Karlsson
            <br />
            <span className="text-subtle">Karlsson Bygg AB · 070-123 45 67</span>
          </p>

          <div className="mt-6 grid grid-cols-2 gap-3">
            {[
              { name: 'badrum-vasagatan-1.jpg', size: '2.4 MB' },
              { name: 'badrum-vasagatan-2.jpg', size: '1.9 MB' },
            ].map((a) => (
              <div
                key={a.name}
                className="flex items-center gap-3 rounded-lg border border-border bg-elevated p-3"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded border border-border bg-bg text-subtle">
                  <Paperclip size={14} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-xs font-medium text-fg">
                    {a.name}
                  </p>
                  <p className="text-[11px] text-subtle">{a.size}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
