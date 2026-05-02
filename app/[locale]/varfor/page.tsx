import { setRequestLocale } from 'next-intl/server'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { WhySection } from '@/components/WhySection'
import { TrustStrip } from '@/components/TrustStrip'
import { FinalCTA } from '@/components/FinalCTA'

export default async function VarforPage({
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
        <WhySection />
        <TrustStrip />
        <FinalCTA />
      </main>
      <Footer />
    </>
  )
}
