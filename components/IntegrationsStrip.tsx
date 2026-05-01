import { useTranslations } from 'next-intl'

const INTEGRATIONS = [
  { name: 'Fortnox', dot: 'bg-blue-400' },
  { name: 'Zoho Mail', dot: 'bg-rose-400' },
  { name: 'Google Workspace', dot: 'bg-emerald-400' },
  { name: 'Claude', dot: 'bg-violet-400' },
  { name: 'OpenAI', dot: 'bg-cyan-400' },
  { name: 'Mistral', dot: 'bg-amber-400' },
  { name: 'Supabase', dot: 'bg-emerald-400' },
  { name: 'Visma', dot: 'bg-sky-400' },
  { name: 'BankID', dot: 'bg-fg' },
]

export function IntegrationsStrip() {
  const t = useTranslations('integrations')

  return (
    <section className="border-y border-border bg-bg py-10">
      <div className="container-x">
        <p className="text-center text-[11px] font-semibold uppercase tracking-widest text-subtle">
          {t('label')}
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
          {INTEGRATIONS.map((i) => (
            <div
              key={i.name}
              className="inline-flex items-center gap-2 rounded-full border border-border-strong bg-bg-elevated px-3.5 py-1.5"
            >
              <span className={`size-1.5 rounded-full ${i.dot}`} />
              <span className="text-sm text-fg">{i.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
