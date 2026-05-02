import { useTranslations } from 'next-intl'
import { ProductFrame, type ActiveSection } from './preview/ProductFrame'
import { WorkspaceView } from './preview/views/WorkspaceView'
import { KunderView } from './preview/views/KunderView'
import { ProjektView } from './preview/views/ProjektView'
import { KalenderView } from './preview/views/KalenderView'
import { ForslagView } from './preview/views/ForslagView'
import { WorkflowsView } from './preview/views/WorkflowsView'
import { PersonalView } from './preview/views/PersonalView'
import { EkonomiView } from './preview/views/EkonomiView'
import { EpostView } from './preview/views/EpostView'
import { ChatView } from './preview/views/ChatView'

type StackTabKey =
  | 'workspace'
  | 'kunder'
  | 'projekt'
  | 'forslag'
  | 'workflows'
  | 'kalender'
  | 'ekonomi'
  | 'personal'
  | 'epost'
  | 'chat'

const VIEWS: Array<{
  active: ActiveSection
  tabKey: StackTabKey
  Component: React.ComponentType
}> = [
  { active: 'workspace', tabKey: 'workspace', Component: WorkspaceView },
  { active: 'kunder', tabKey: 'kunder', Component: KunderView },
  { active: 'projekt', tabKey: 'projekt', Component: ProjektView },
  { active: 'forslag', tabKey: 'forslag', Component: ForslagView },
  { active: 'kalender', tabKey: 'kalender', Component: KalenderView },
  { active: 'workflows', tabKey: 'workflows', Component: WorkflowsView },
  { active: 'ekonomi', tabKey: 'ekonomi', Component: EkonomiView },
  { active: 'personal', tabKey: 'personal', Component: PersonalView },
  { active: 'epost', tabKey: 'epost', Component: EpostView },
  { active: 'chat', tabKey: 'chat', Component: ChatView },
]

export function LiveDemoStack() {
  const t = useTranslations('preview')
  const tTabs = useTranslations('preview.tabs')
  const tDesc = useTranslations('preview.viewDescriptions')

  return (
    <section id="preview" className="relative scroll-mt-24 py-12 md:py-20">
      <div
        aria-hidden
        className="absolute left-1/2 top-0 h-[600px] w-[1100px] -translate-x-1/2 bg-[radial-gradient(ellipse_50%_50%_at_50%_0%,rgba(52,211,153,0.10),transparent_70%)]"
      />

      <div className="container-x relative">
        <header className="mx-auto max-w-2xl text-center">
          <p className="eyebrow justify-center">{t('stackIntro.eyebrow')}</p>
          <h2 className="mt-5 text-balance text-[26px] font-semibold tracking-tight text-fg-strong sm:text-4xl md:text-5xl">
            <span className="headline-gradient">{t('stackIntro.title')}</span>
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-base text-muted text-balance">
            {t('stackIntro.sub')}
          </p>
        </header>

        <div className="mt-12 space-y-16 md:mt-16 md:space-y-24">
          {VIEWS.map((view, i) => {
            const Component = view.Component
            return (
              <article key={view.active} className="scroll-mt-24">
                <header className="mx-auto mb-5 max-w-3xl md:mb-6">
                  <p className="font-mono text-[11px] uppercase tracking-widest text-subtle">
                    {String(i + 1).padStart(2, '0')} · {tTabs(view.tabKey)}
                  </p>
                  <h3 className="mt-2 text-xl font-semibold text-fg-strong sm:text-2xl">
                    {tTabs(view.tabKey)}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {tDesc(view.tabKey)}
                  </p>
                </header>

                <ProductFrame active={view.active}>
                  <Component />
                </ProductFrame>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
