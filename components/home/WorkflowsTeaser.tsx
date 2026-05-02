import { ArrowRight, GitBranch, Bot, Database, Clock } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { Link } from '@/lib/i18n/navigation'

const FEATURES = [
  { icon: GitBranch, key: 'features.0.title' as const },
  { icon: Bot, key: 'features.1.title' as const },
  { icon: Clock, key: 'features.2.title' as const },
  { icon: Database, key: 'features.3.title' as const },
]

export function WorkflowsTeaser() {
  const tHome = useTranslations('home.workflowsTeaser')
  const tWf = useTranslations('workflows')

  return (
    <section className="relative scroll-mt-24 overflow-hidden border-y border-border bg-surface/20 py-16 md:py-28">
      <div
        aria-hidden
        className="absolute left-1/2 top-0 h-[400px] w-[900px] -translate-x-1/2 bg-[radial-gradient(ellipse_50%_50%_at_50%_0%,rgba(167,139,250,0.10),transparent_70%)]"
      />

      <div className="container-x relative">
        <header className="mx-auto max-w-2xl text-center">
          <p className="eyebrow justify-center">{tHome('eyebrow')}</p>
          <h2 className="mt-5 text-balance text-[26px] font-semibold tracking-tight text-fg-strong sm:text-4xl md:text-[44px]">
            <span className="headline-gradient">{tHome('title')}</span>
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-base text-muted text-balance">
            {tHome('sub')}
          </p>
        </header>

        <div className="mx-auto mt-10 grid max-w-3xl grid-cols-2 gap-3 sm:grid-cols-4">
          {FEATURES.map(({ icon: Icon, key }) => (
            <div
              key={key}
              className="flex flex-col items-center gap-2 rounded-xl border border-border-strong bg-bg-elevated/40 px-3 py-4 text-center"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-md border border-border-strong bg-bg-elevated text-violet-300">
                <Icon size={16} strokeWidth={1.75} />
              </div>
              <p className="text-[12px] font-medium text-fg leading-tight">
                {tWf(key)}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <Link href="/workflows" className="btn btn-ghost !h-10 !text-sm">
            {tHome('cta')}
            <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </section>
  )
}
