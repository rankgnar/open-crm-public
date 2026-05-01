import type { Metadata, Viewport } from 'next'
import { THEME_INIT_SCRIPT } from '@/lib/theme'
import './globals.css'

export const metadata: Metadata = {
  title: 'open-crm — CRM you actually own',
  description:
    'Open source CRM for service companies. Self-hosted, MIT licensed.',
  metadataBase: new URL('https://open-crm.org'),
  openGraph: {
    title: 'open-crm — CRM you actually own',
    description:
      'Open source CRM for service companies. Self-hosted, MIT licensed.',
    type: 'website',
    url: 'https://open-crm.org',
    siteName: 'open-crm',
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-touch-icon.png',
  },
}

export const viewport: Viewport = {
  themeColor: '#0a0a0a',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="sv" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }}
        />
        <link rel="preconnect" href="https://rsms.me/" />
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600&display=swap"
        />
      </head>
      <body className="bg-bg text-fg antialiased">{children}</body>
    </html>
  )
}
