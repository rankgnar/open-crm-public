'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import {
  Workflow,
  Users,
  FolderKanban,
  FileText,
  CalendarDays,
  TrendingUp,
  UserCog,
  MessageSquare,
} from 'lucide-react'
import { ProductFrame, type ActiveSection } from './preview/ProductFrame'
import { KunderView } from './preview/views/KunderView'
import { ProjektView } from './preview/views/ProjektView'
import { KalenderView } from './preview/views/KalenderView'
import { ForslagView } from './preview/views/ForslagView'
import { WorkflowsView } from './preview/views/WorkflowsView'
import { PersonalView } from './preview/views/PersonalView'
import { EkonomiView } from './preview/views/EkonomiView'
import { ChatView } from './preview/views/ChatView'

const TABS: Array<{
  key: ActiveSection
  icon: typeof Users
  labelKey: string
}> = [
  { key: 'kunder', icon: Users, labelKey: 'kunder' },
  { key: 'projekt', icon: FolderKanban, labelKey: 'projekt' },
  { key: 'forslag', icon: FileText, labelKey: 'forslag' },
  { key: 'workflows', icon: Workflow, labelKey: 'workflows' },
  { key: 'kalender', icon: CalendarDays, labelKey: 'kalender' },
  { key: 'ekonomi', icon: TrendingUp, labelKey: 'ekonomi' },
  { key: 'personal', icon: UserCog, labelKey: 'personal' },
  { key: 'chat', icon: MessageSquare, labelKey: 'chat' },
]

export function LiveDemo() {
  const t = useTranslations('preview')
  const [active, setActive] = useState<ActiveSection>('kunder')

  return (
    <section id="preview" className="relative hidden scroll-mt-24 py-16 md:py-32 lg:block">
      <div
        aria-hidden
        className="absolute left-1/2 top-0 h-[600px] w-[1100px] -translate-x-1/2 bg-[radial-gradient(ellipse_50%_50%_at_50%_0%,rgba(52,211,153,0.10),transparent_70%)]"
      />

      <div className="container-x relative">
        <header className="mx-auto max-w-2xl text-center">
          <p className="eyebrow justify-center">{t('label')}</p>
          <p className="mx-auto mt-5 max-w-xl text-base text-muted text-balance">
            {t('sub')}
          </p>
        </header>

        {/* Tabs — scrollable on small screens */}
        <div className="mt-12 flex justify-center">
          <div className="max-w-full overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <div className="inline-flex items-center gap-1 rounded-xl border border-border-strong bg-surface/60 p-1 backdrop-blur-sm">
              {TABS.map((tab) => {
                const Icon = tab.icon
                const isActive = tab.key === active
                return (
                  <button
                    key={tab.key}
                    onClick={() => setActive(tab.key)}
                    className={`inline-flex shrink-0 items-center gap-2 rounded-lg px-3 py-2 text-[13px] font-medium transition-all md:px-3.5 md:text-sm ${
                      isActive
                        ? 'bg-bg-elevated text-fg-strong shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]'
                        : 'text-muted hover:text-fg'
                    }`}
                  >
                    <Icon
                      size={14}
                      strokeWidth={1.75}
                      className={isActive ? 'text-accent-soft' : ''}
                    />
                    {t(`tabs.${tab.labelKey}`)}
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        {/* Frame with active view — horizontally scrollable on mobile */}
        <div className="-mx-5 mt-10 overflow-x-auto pb-3 [scrollbar-width:none] sm:mx-0 lg:overflow-visible lg:pb-0 [&::-webkit-scrollbar]:hidden">
          <div className="px-5 sm:px-0">
            <div className="min-w-[1020px] lg:min-w-0">
              <ProductFrame active={active} height={620}>
                {active === 'kunder' && <KunderView />}
                {active === 'projekt' && <ProjektView />}
                {active === 'forslag' && <ForslagView />}
                {active === 'workflows' && <WorkflowsView />}
                {active === 'kalender' && <KalenderView />}
                {active === 'ekonomi' && <EkonomiView />}
                {active === 'personal' && <PersonalView />}
                {active === 'chat' && <ChatView />}
              </ProductFrame>
            </div>
          </div>
        </div>

        <p className="mx-auto mt-8 flex max-w-xl items-center justify-center gap-2 text-center text-xs text-subtle">
          <span aria-hidden className="sm:hidden">←</span>
          <span>{t('hint')}</span>
          <span aria-hidden className="sm:hidden">→</span>
        </p>
      </div>
    </section>
  )
}
