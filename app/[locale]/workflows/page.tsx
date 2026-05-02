import { setRequestLocale } from 'next-intl/server'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { WorkflowsSection } from '@/components/WorkflowsSection'
import { IntegrationsStrip } from '@/components/IntegrationsStrip'
import { FinalCTA } from '@/components/FinalCTA'

export default async function WorkflowsPage({
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
        <WorkflowsSection />
        <IntegrationsStrip />
        <FinalCTA />
      </main>
      <Footer />
    </>
  )
}
