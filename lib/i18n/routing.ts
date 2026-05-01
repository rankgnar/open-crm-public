import { defineRouting } from 'next-intl/routing'

export const routing = defineRouting({
  locales: ['sv', 'en', 'es'],
  defaultLocale: 'sv',
  localePrefix: 'always',
})

export type Locale = (typeof routing.locales)[number]
