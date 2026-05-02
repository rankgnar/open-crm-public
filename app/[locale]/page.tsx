import { setRequestLocale } from 'next-intl/server'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { Hero } from '@/components/Hero'
import { TrustStrip } from '@/components/TrustStrip'
import { ModulesTeaser } from '@/components/home/ModulesTeaser'
import { WorkflowsTeaser } from '@/components/home/WorkflowsTeaser'
import { ServicesTeaser } from '@/components/home/ServicesTeaser'
import { WhyTeaser } from '@/components/home/WhyTeaser'
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
        <ModulesTeaser />
        <WorkflowsTeaser />
        <ServicesTeaser />
        <WhyTeaser />
        <FinalCTA />
      </main>
      <Footer />
    </>
  )
}
