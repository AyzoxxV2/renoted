import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import PhoneButton from '@/components/ui/PhoneButton'
import ScrollToTop from '@/components/ui/ScrollToTop'
import ContactForm from '@/components/sections/ContactForm'
import { cityPages, getCityPage, siteUrl, workPages } from '@/lib/seo-pages'

export function generateStaticParams() {
  return cityPages.map((page) => ({ slug: page.slug }))
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const page = getCityPage(params.slug)
  if (!page) return {}

  return {
    title: `Rénovation énergétique ${page.city} | Devis gratuit Renoted`,
    description: `${page.intro} Rendez-vous gratuit sous 24h avec Teddy Lecomte, mandataire local Effy.`,
    alternates: {
      canonical: `${siteUrl}/villes/${page.slug}`,
    },
  }
}

export default function CityLandingPage({ params }: { params: { slug: string } }) {
  const page = getCityPage(params.slug)
  if (!page) notFound()

  return (
    <>
      <Header />
      <main>
        <section className="relative overflow-hidden bg-[#0F172A] px-4 pb-20 pt-32 text-white sm:px-6 lg:px-8">
          <div className="absolute inset-0 gradient-hero opacity-90" aria-hidden="true" />
          <div className="relative mx-auto max-w-5xl">
            <p className="mb-4 inline-flex rounded-full border border-[#1EB564]/40 bg-[#1EB564]/15 px-4 py-2 text-sm font-semibold text-[#8EF0B9]">
              {page.city} · {page.department}
            </p>
            <h1 className="max-w-4xl text-4xl font-extrabold leading-tight md:text-6xl">
              Rénovation énergétique à {page.city}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/80">{page.intro}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="#contact"
                className="inline-flex items-center justify-center rounded-btn bg-[#1EB564] px-7 py-4 font-bold text-white shadow-lg shadow-[#1EB564]/25 transition-colors hover:bg-[#0D7A3E]"
              >
                Demander un rendez-vous gratuit
              </a>
              <a
                href="tel:+33624291096"
                className="inline-flex items-center justify-center rounded-btn border-2 border-white/30 px-7 py-4 font-bold text-white transition-colors hover:bg-white/10"
              >
                Appeler Teddy
              </a>
            </div>
          </div>
        </section>

        <section className="bg-white py-16">
          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 px-4 sm:px-6 lg:grid-cols-3 lg:px-8">
            {[
              ['Travaux utiles', 'Isolation, pompe à chaleur, chauffe-eau thermodynamique, photovoltaïque, bilan thermique et rénovation générale.'],
              ['Aides vérifiées', "MaPrimeRénov', CEE, éco-PTZ, TVA réduite et aides locales quand elles existent."],
              ['Artisans RGE', 'Mise en relation avec des professionnels qualifiés pour préserver votre éligibilité aux aides.'],
            ].map(([title, text]) => (
              <article key={title} className="rounded-card border border-slate-200 bg-[#F8FAFC] p-6 shadow-card">
                <h2 className="font-bold text-[#0F172A]">{title}</h2>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="bg-[#F8FAFC] py-16" aria-labelledby="city-works-title">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <h2 id="city-works-title" className="text-3xl font-extrabold text-[#0F172A]">
                Travaux accompagnés à {page.city}
              </h2>
              <p className="mt-3 text-slate-600">
                Isolation, chauffage, photovoltaïque, bilan thermique ou rénovation générale : chaque solution est étudiée selon votre logement,
                vos aides possibles et l’ordre logique des travaux.
              </p>
            </div>
            <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {workPages.map((work) => (
                <Link
                  key={work.slug}
                  href={`/travaux/${work.slug}`}
                  className="rounded-xl border border-slate-200 bg-white p-4 text-sm font-semibold text-[#0F172A] shadow-card transition-all hover:-translate-y-1 hover:border-[#1EB564]/40 hover:text-[#0D7A3E] hover:shadow-card-hover"
                >
                  {work.title}
                </Link>
              ))}
            </div>
          </div>
        </section>

        <ContactForm />
      </main>
      <Footer />
      <PhoneButton />
      <ScrollToTop />
    </>
  )
}
