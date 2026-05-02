import { setRequestLocale } from 'next-intl/server'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { ServicesSection } from '@/components/ServicesSection'
import { FinalCTA } from '@/components/FinalCTA'

export default async function TjansterPage({
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
        <ServicesSection />
        <FinalCTA />
      </main>
      <Footer />
    </>
  )
}
