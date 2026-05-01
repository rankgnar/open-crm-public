import { Server, Unlock, Flag, Scale } from 'lucide-react'
import { useTranslations } from 'next-intl'

export function TrustStrip() {
  const t = useTranslations('trust')

  const items = [
    { icon: Server, title: t('items.self'), desc: t('items.selfDesc') },
    { icon: Unlock, title: t('items.noLockIn'), desc: t('items.noLockInDesc') },
    { icon: Flag, title: t('items.swedish'), desc: t('items.swedishDesc') },
    { icon: Scale, title: t('items.mit'), desc: t('items.mitDesc') },
  ]

  return (
    <section className="relative border-y border-border bg-surface/30">
      <div className="container-x py-10">
        <div className="grid grid-cols-2 gap-x-6 gap-y-6 md:grid-cols-4">
          {items.map((item) => {
            const Icon = item.icon
            return (
              <div key={item.title} className="flex items-start gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-border-strong bg-bg-elevated text-accent-soft">
                  <Icon size={15} strokeWidth={1.75} />
                </div>
                <div>
                  <p className="text-sm font-medium text-fg-strong">
                    {item.title}
                  </p>
                  <p className="text-xs text-subtle">{item.desc}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
