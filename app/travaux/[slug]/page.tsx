import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import PhoneButton from '@/components/ui/PhoneButton'
import ScrollToTop from '@/components/ui/ScrollToTop'
import ContactForm from '@/components/sections/ContactForm'
import { cityPages, getWorkPage, siteUrl, workPages } from '@/lib/seo-pages'

export function generateStaticParams() {
  return workPages.map((page) => ({ slug: page.slug }))
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const page = getWorkPage(params.slug)
  if (!page) return {}

  return {
    title: `${page.title} Hauts-de-France | Devis gratuit Renoted`,
    description: `Projet ${page.keyword}: Renoted vous aide à vérifier les aides, le devis et les artisans RGE avant travaux.`,
    alternates: {
      canonical: `${siteUrl}/travaux/${page.slug}`,
    },
  }
}

export default function WorkLandingPage({ params }: { params: { slug: string } }) {
  const page = getWorkPage(params.slug)
  if (!page) notFound()

  return (
    <>
      <Header />
      <main>
        <section className="relative overflow-hidden bg-[#0F172A] px-4 pb-20 pt-32 text-white sm:px-6 lg:px-8">
          <div className="absolute inset-0 gradient-hero opacity-90" aria-hidden="true" />
          <div className="relative mx-auto max-w-5xl">
            <p className="mb-4 inline-flex rounded-full border border-[#1EB564]/40 bg-[#1EB564]/15 px-4 py-2 text-sm font-semibold text-[#8EF0B9]">
              Travaux RGE · Hauts-de-France
            </p>
            <h1 className="max-w-4xl text-4xl font-extrabold leading-tight md:text-6xl">
              {page.title} en Hauts-de-France
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/80">
              Ce type de travaux peut {page.benefit}. Teddy Lecomte vérifie votre situation,
              les aides mobilisables et le bon montage avant de vous orienter vers un devis.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="#contact"
                className="inline-flex items-center justify-center rounded-btn bg-[#1EB564] px-7 py-4 font-bold text-white shadow-lg shadow-[#1EB564]/25 transition-colors hover:bg-[#0D7A3E]"
              >
                Estimer mes aides
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
          <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold text-[#0F172A]">Pourquoi passer par Renoted ?</h2>
            <p className="mt-4 text-lg leading-relaxed text-slate-600">
              Vous obtenez une lecture claire des aides, du reste à charge et des étapes avant de
              vous engager. L’objectif n’est pas de vendre un chantier à tout prix, mais de valider
              un projet cohérent et finançable.
            </p>
          </div>
        </section>

        <section className="bg-[#F8FAFC] py-16" aria-labelledby="work-cities-title">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <h2 id="work-cities-title" className="text-3xl font-extrabold text-[#0F172A]">
                Intervention locale en Hauts-de-France
              </h2>
              <p className="mt-3 text-slate-600">
                Teddy accompagne les propriétaires dans les principales villes de la région, avec
                une première lecture des aides et du bon montage de projet.
              </p>
            </div>
            <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {cityPages.map((city) => (
                <Link
                  key={city.slug}
                  href={`/villes/${city.slug}`}
                  className="rounded-xl border border-slate-200 bg-white p-4 text-sm font-semibold text-[#0F172A] shadow-card transition-all hover:-translate-y-1 hover:border-[#1EB564]/40 hover:text-[#0D7A3E] hover:shadow-card-hover"
                >
                  {page.title} à {city.city}
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
