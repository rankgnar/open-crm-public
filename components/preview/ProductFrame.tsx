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
import { useTranslations } from 'next-intl'

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

type TabKey =
  | 'workspace'
  | 'kunder'
  | 'projekt'
  | 'forslag'
  | 'kalender'
  | 'ekonomi'
  | 'personal'
  | 'workflows'
  | 'chat'
type FrameKey = 'arbete' | 'fakturor' | 'tema' | 'installningar'

const NAV: Array<{ key: ActiveSection; icon: LucideIcon; tabKey: TabKey }> = [
  { key: 'workspace', icon: Home, tabKey: 'workspace' },
  { key: 'kunder', icon: Users, tabKey: 'kunder' },
  { key: 'projekt', icon: FolderKanban, tabKey: 'projekt' },
  { key: 'forslag', icon: FileText, tabKey: 'forslag' },
  { key: 'kalender', icon: CalendarDays, tabKey: 'kalender' },
  { key: 'ekonomi', icon: TrendingUp, tabKey: 'ekonomi' },
  { key: 'personal', icon: UserCog, tabKey: 'personal' },
]

type AlsoItem =
  | { key: ActiveSection; icon: LucideIcon; tabKey: TabKey }
  | { key: null; icon: LucideIcon; frameKey: FrameKey }

const NAV_ALSO: AlsoItem[] = [
  { key: 'workflows', icon: Workflow, tabKey: 'workflows' },
  { key: 'chat', icon: MessageSquare, tabKey: 'chat' },
  { key: null, icon: HardHat, frameKey: 'arbete' },
  { key: null, icon: Receipt, frameKey: 'fakturor' },
]

export function ProductFrame({
  active,
  children,
  height,
}: {
  active: ActiveSection
  children: React.ReactNode
  /** Optional desktop (lg+) height in px. Mobile/tablet are fixed responsive. */
  height?: number
}) {
  const tTabs = useTranslations('preview.tabs')
  const tFrame = useTranslations('preview.frame')
  const lgHeight = height ? `${height}px` : '620px'
  return (
    <div className="relative w-full">
      {/* Glow */}
      <div
        aria-hidden
        className="absolute -inset-12 rounded-full bg-[radial-gradient(ellipse_60%_60%_at_50%_50%,rgba(52,211,153,0.14),transparent_65%)] blur-3xl"
      />

      {/* Window */}
      <div
        className="relative overflow-hidden rounded-xl border border-border-strong shadow-2xl shadow-black/60 lg:rounded-2xl"
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

        {/* Body — taller on desktop, compact-but-tappable on mobile */}
        <div
          className="flex h-[520px] md:h-[580px] lg:h-[var(--frame-h)]"
          style={{ ['--frame-h' as string]: lgHeight }}
        >
          {/* Sidebar — hidden on mobile so the content area takes full width */}
          <aside
            className="hidden w-14 shrink-0 flex-col border-r border-border md:flex"
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
                    title={tTabs(item.tabKey)}
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
                const label =
                  'tabKey' in item ? tTabs(item.tabKey) : tFrame(item.frameKey)
                return (
                  <div
                    key={i}
                    title={label}
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
                title={tFrame('tema')}
                className="flex h-9 w-9 items-center justify-center rounded-md text-subtle"
              >
                <Sun size={14} strokeWidth={1.75} />
              </button>
              <button
                title={tFrame('installningar')}
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
