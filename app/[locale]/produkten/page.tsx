import { setRequestLocale } from 'next-intl/server'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { LiveDemoStack } from '@/components/LiveDemoStack'
import { StackSection } from '@/components/StackSection'
import { FinalCTA } from '@/components/FinalCTA'

export default async function ProduktenPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)

  return (
    <>
      <Navbar />
      <main className="overflow-x-hidden pt-16">
        <LiveDemoStack />
        <StackSection />
        <FinalCTA />
      </main>
      <Footer />
    </>
  )
}
