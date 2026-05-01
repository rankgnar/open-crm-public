import { notFound } from 'next/navigation'
import { NextIntlClientProvider, hasLocale } from 'next-intl'
import { setRequestLocale } from 'next-intl/server'
import { routing } from '@/lib/i18n/routing'

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale: requested } = await params
  if (!hasLocale(routing.locales, requested)) notFound()
  setRequestLocale(requested)

  return (
    <NextIntlClientProvider locale={requested}>
      {children}
    </NextIntlClientProvider>
  )
}
