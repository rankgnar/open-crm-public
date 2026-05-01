import { setRequestLocale } from 'next-intl/server'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { Hero } from '@/components/Hero'
import { TrustStrip } from '@/components/TrustStrip'
import { LiveDemo } from '@/components/LiveDemo'
import { ModulesGrid } from '@/components/ModulesGrid'
import { WorkflowsSection } from '@/components/WorkflowsSection'
import { IntegrationsStrip } from '@/components/IntegrationsStrip'
import { StackSection } from '@/components/StackSection'
import { WhySection } from '@/components/WhySection'
import { ServicesSection } from '@/components/ServicesSection'
import { FinalCTA } from '@/components/FinalCTA'

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)

  return (
    <>
      <Navbar />
      <main className="overflow-x-hidden">
        <Hero />
        <TrustStrip />
        <LiveDemo />
        <ModulesGrid />
        <WorkflowsSection />
        <IntegrationsStrip />
        <StackSection />
        <WhySection />
        <ServicesSection />
        <FinalCTA />
      </main>
      <Footer />
    </>
  )
}
