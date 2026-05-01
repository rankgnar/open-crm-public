'use client'

import {
  Home,
  Users,
  FolderKanban,
  CalendarDays,
  Workflow,
  HardHat,
  FileText,
  TrendingUp,
  Receipt,
  UserCog,
  MessageSquare,
  Settings,
  PanelLeft,
  Sun,
  type LucideIcon,
} from 'lucide-react'

export type ActiveSection =
  | 'workspace'
  | 'kunder'
  | 'projekt'
  | 'forslag'
  | 'kalender'
  | 'ekonomi'
  | 'personal'
  | 'workflows'
  | 'chat'

const NAV: Array<{ key: ActiveSection; icon: LucideIcon; label: string }> = [
  { key: 'workspace', icon: Home, label: 'Workspace' },
  { key: 'kunder', icon: Users, label: 'Kunder' },
  { key: 'projekt', icon: FolderKanban, label: 'Projekt' },
  { key: 'forslag', icon: FileText, label: 'Förslag' },
  { key: 'kalender', icon: CalendarDays, label: 'Schema' },
  { key: 'ekonomi', icon: TrendingUp, label: 'Ekonomi' },
  { key: 'personal', icon: UserCog, label: 'Personal' },
]

const NAV_ALSO: Array<{ key: ActiveSection | null; icon: LucideIcon; label: string }> = [
  { key: 'workflows', icon: Workflow, label: 'Workflows' },
  { key: 'chat', icon: MessageSquare, label: 'Chat' },
  { key: null, icon: HardHat, label: 'Arbete' },
  { key: null, icon: Receipt, label: 'Fakturor' },
]

export function ProductFrame({
  active,
  children,
  height = 560,
}: {
  active: ActiveSection
  children: React.ReactNode
  height?: number
}) {
  return (
    <div className="relative w-full">
      {/* Glow */}
      <div
        aria-hidden
        className="absolute -inset-12 rounded-full bg-[radial-gradient(ellipse_60%_60%_at_50%_50%,rgba(34,211,238,0.14),transparent_65%)] blur-3xl"
      />

      {/* Window */}
      <div
        className="relative overflow-hidden rounded-2xl border border-border-strong shadow-2xl shadow-black/60"
        style={{
          backgroundColor: 'var(--color-app-bg)',
          color: 'var(--color-fg)',
        }}
      >
        {/* Title bar */}
        <div
          className="flex h-9 items-center gap-2 border-b border-border px-3"
          style={{ backgroundColor: 'var(--color-app-sidebar)' }}
        >
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f56]/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#27c93f]/80" />
          </div>
          <div className="ml-3 flex-1 text-center font-mono text-[11px] text-subtle">
            open-crm.app
          </div>
          <div className="w-12" />
        </div>

        {/* Body */}
        <div className="flex" style={{ height }}>
          {/* Sidebar */}
          <aside
            className="flex w-14 shrink-0 flex-col border-r border-border"
            style={{ backgroundColor: 'var(--color-app-sidebar)' }}
          >
            <div className="flex h-10 items-center justify-end pr-2">
              <PanelLeft size={14} className="text-subtle" strokeWidth={1.75} />
            </div>
            <nav className="flex flex-1 flex-col px-2 pt-1">
              {NAV.map((item) => {
                const Icon = item.icon
                const isActive = item.key === active
                return (
                  <div
                    key={item.key}
                    title={item.label}
                    className={`mb-0.5 flex h-9 items-center justify-center rounded-md transition-colors ${
                      isActive ? 'text-fg' : 'text-muted'
                    }`}
                    style={
                      isActive
                        ? { backgroundColor: 'var(--color-app-hover)' }
                        : undefined
                    }
                  >
                    <Icon size={16} strokeWidth={1.75} />
                  </div>
                )
              })}

              <div className="my-2 border-t border-border" />

              {NAV_ALSO.map((item, i) => {
                const Icon = item.icon
                const isActive = item.key === active
                return (
                  <div
                    key={i}
                    title={item.label}
                    className={`mb-0.5 flex h-9 items-center justify-center rounded-md transition-colors ${
                      isActive ? 'text-fg' : 'text-subtle'
                    }`}
                    style={
                      isActive
                        ? { backgroundColor: 'var(--color-app-hover)' }
                        : undefined
                    }
                  >
                    <Icon size={16} strokeWidth={1.75} />
                  </div>
                )
              })}
            </nav>

            <div className="flex flex-col items-center gap-1 px-2 pb-3">
              <button
                title="Tema"
                className="flex h-9 w-9 items-center justify-center rounded-md text-subtle"
              >
                <Sun size={14} strokeWidth={1.75} />
              </button>
              <button
                title="Inställningar"
                className="flex h-9 w-9 items-center justify-center rounded-md text-subtle"
              >
                <Settings size={14} strokeWidth={1.75} />
              </button>
            </div>
          </aside>

          {/* Content */}
          <main className="flex-1 overflow-hidden">{children}</main>
        </div>
      </div>
    </div>
  )
}
