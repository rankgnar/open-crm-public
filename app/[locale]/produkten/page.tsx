import { setRequestLocale } from 'next-intl/server'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { LiveDemo } from '@/components/LiveDemo'
import { ModulesGrid } from '@/components/ModulesGrid'
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
        <LiveDemo />
        <ModulesGrid />
        <StackSection />
        <FinalCTA />
      </main>
      <Footer />
    </>
  )
}
