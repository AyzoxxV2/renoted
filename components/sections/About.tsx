'use client'

import { motion } from 'framer-motion'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'

const cities = [
  'Lille', 'Valenciennes', 'Douai', 'Lens', 'Arras',
  'Calais', 'Boulogne-sur-Mer', 'Amiens', 'Roubaix', 'Tourcoing',
  'Villeneuve-d\'Ascq', 'Béthune', 'Saint-Omer', 'Maubeuge',
  'Cambrai', 'Saint-Quentin', 'Péronne', 'Bapaume',
]

const values = [
  {
    icon: '🤝',
    title: 'Proximité',
    text: 'Mandataire local, je me déplace chez vous dans toute la région Hauts-de-France.',
  },
  {
    icon: '🔍',
    title: 'Transparence',
    text: 'Je vous explique clairement toutes les aides auxquelles vous avez droit, sans jargon.',
  },
  {
    icon: '€',
    title: 'Financement optimisé',
    text: 'Selon votre dossier, les aides et solutions de financement peuvent réduire fortement votre reste à charge.',
  },
  {
    icon: '🏆',
    title: 'Excellence',
    text: 'Partenaire officiel Effy, N°1 de la rénovation énergétique en France depuis 17 ans.',
  },
]

export default function About() {
  return (
    <section
      id="apropos"
      className="py-20 md:py-28 bg-[#F8FAFC]"
      aria-labelledby="about-title"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          {/* Left — Photo & values */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Photo */}
            <div className="relative mb-8">
              <div
                className="h-72 w-72 mx-auto lg:mx-0 rounded-2xl bg-gradient-to-br from-[#0D7A3E] to-[#1EB564] flex items-center justify-center shadow-card-lg overflow-hidden"
                role="img"
                aria-label="Photo de Teddy Lecomte, fondateur de Renoted"
              >
                <img
                  src="/images/teddy.jpg"
                  alt="Teddy Lecomte, mandataire Effy en Hauts-de-France"
                  className="h-full w-full object-cover object-[55%_14%]"
                  loading="lazy"
                />
              </div>
              {/* Badge overlay */}
              <div className="absolute -bottom-4 -right-4 lg:right-auto lg:-left-4 bg-white rounded-xl shadow-card-hover p-3 border border-slate-200">
                <p className="text-[#B68400] font-bold text-sm">E Mandataire officiel</p>
                <p className="text-slate-500 text-xs">Partenaire Effy certifié</p>
              </div>
            </div>

            {/* Values grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
              {values.map((v, i) => (
                <motion.div
                  key={v.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="bg-white rounded-xl p-4 border border-slate-200 shadow-card"
                >
                  <span className="text-2xl">{v.icon}</span>
                  <h3 className="font-bold text-[#0F172A] mt-2 mb-1">{v.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{v.text}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right — Text content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <Badge variant="green" className="mb-4">À propos</Badge>
            <h2 id="about-title" className="text-3xl md:text-4xl font-extrabold text-[#0F172A] mb-5">
              Teddy Lecomte,<br />
              <span className="text-[#1EB564]">votre expert local</span><br />
              en rénovation énergétique
            </h2>

            <div className="space-y-4 text-slate-600 leading-relaxed">
              <p>
                Natif et installé en Hauts-de-France, je connais les spécificités de votre région :
                un parc immobilier souvent ancien, un climat qui nécessite une bonne isolation, et
                des habitants qui méritent un accompagnement honnête et transparent.
              </p>
              <p>
                En tant que <strong className="text-[#0F172A]">mandataire local d&apos;Effy</strong>,
                le N°1 de la rénovation énergétique en France, je bénéficie des meilleures conditions
                pour vous obtenir le maximum d&apos;aides de l&apos;État. Mon rôle : simplifier vos démarches,
                coordonner les artisans RGE et vous accompagner de A à Z.
              </p>
              <p>
                Ma promesse : <strong className="text-[#0F172A]">zéro jargon, zéro mauvaise surprise</strong>.
                Vous savez dès le départ ce que vous allez payer, les aides mobilisables et ce qu&apos;il
                reste éventuellement à financer.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 my-7">
              {[
                { value: '17', label: 'ans Effy', suffix: '' },
                { value: '500K', label: 'familles aidées', suffix: '+' },
                { value: '5K', label: 'artisans RGE', suffix: '+' },
              ].map((stat) => (
                <div key={stat.label} className="text-center bg-white rounded-xl p-4 border border-slate-200 shadow-card">
                  <p className="text-2xl font-extrabold text-[#1EB564]">
                    {stat.value}{stat.suffix}
                  </p>
                  <p className="text-slate-500 text-xs mt-1">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* Zone d'intervention */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-card p-5 mb-6">
              <p className="font-semibold text-[#0F172A] text-sm mb-3 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-[#1EB564]" aria-hidden="true">
                  <path fillRule="evenodd" d="m9.69 18.933.003.001C9.89 19.02 10 19 10 19s.11.02.308-.066l.002-.001.006-.003.018-.008a5.741 5.741 0 0 0 .281-.14c.186-.096.446-.24.757-.433.62-.384 1.445-.966 2.274-1.765C15.302 14.988 17 12.493 17 9A7 7 0 1 0 3 9c0 3.492 1.698 5.988 3.355 7.584a13.731 13.731 0 0 0 2.273 1.765 11.842 11.842 0 0 0 .976.544l.062.029.018.008.006.003ZM10 11.25a2.25 2.25 0 1 0 0-4.5 2.25 2.25 0 0 0 0 4.5Z" clipRule="evenodd" />
                </svg>
                Zone d&apos;intervention — Hauts-de-France
              </p>
              <div className="flex flex-wrap gap-2">
                {cities.map((city) => (
                  <span
                    key={city}
                    className="text-xs bg-[#E8F8EF] text-[#0D7A3E] px-2.5 py-1 rounded-full font-medium"
                  >
                    {city}
                  </span>
                ))}
                <span className="text-xs text-slate-400 px-2.5 py-1">et toute la région…</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                size="lg"
                onClick={() => {
                  const el = document.querySelector('#contact')
                  if (el) {
                    const top = el.getBoundingClientRect().top + window.scrollY - 80
                    window.scrollTo({ top, behavior: 'smooth' })
                  }
                }}
              >
                Contacter Teddy
              </Button>
              <a
                href="tel:+33624291096"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 border-2 border-[#1EB564] text-[#1EB564] rounded-btn font-semibold hover:bg-[#E8F8EF] transition-all"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4" aria-hidden="true">
                  <path fillRule="evenodd" d="M2 3.5A1.5 1.5 0 013.5 2h1.148a1.5 1.5 0 011.465 1.175l.716 3.223a1.5 1.5 0 01-1.052 1.767l-.933.267c-.41.117-.643.555-.48.95a11.542 11.542 0 006.254 6.254c.395.163.833-.07.95-.48l.267-.933a1.5 1.5 0 011.767-1.052l3.223.716A1.5 1.5 0 0118 15.352V16.5a1.5 1.5 0 01-1.5 1.5H15c-1.149 0-2.263-.15-3.326-.43A13.022 13.022 0 012.43 8.326 13.019 13.019 0 012 5V3.5z" clipRule="evenodd" />
                </svg>
                06.24.29.10.96
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
