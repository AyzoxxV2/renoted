'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Badge from '@/components/ui/Badge'

const faqs = [
  {
    question: 'Quelles aides existent pour la rénovation énergétique en 2026 ?',
    answer:
      "En 2026, les principaux leviers restent MaPrimeRénov', les Certificats d'Économie d'Énergie (CEE), l'éco-PTZ, la TVA réduite à 5,5% et certaines aides locales. Le montant dépend toujours de vos revenus, de votre logement, du gain énergétique attendu et des travaux retenus. Teddy vérifie les dispositifs mobilisables avant tout devis afin d'éviter les promesses floues et de construire un plan de financement réaliste.",
  },
  {
    question: "C'est quoi MaPrimeRénov' et comment ça fonctionne ?",
    answer:
      "MaPrimeRénov' est l'aide phare de l'État pour la rénovation énergétique des logements, gérée par l'ANAH. Elle est attribuée selon vos revenus fiscaux de référence, la taille de votre foyer, le logement et le parcours choisi : rénovation par geste ou rénovation d'ampleur. Teddy vous aide à identifier le parcours le plus cohérent et à préparer un dossier conforme avec des artisans RGE.",
  },
  {
    question: "Qu'est-ce qu'un mandataire Effy et quel est son rôle ?",
    answer:
      "Un mandataire Effy est un conseiller local agréé par Effy, le N°1 de la rénovation énergétique en France depuis 17 ans. Contrairement à un simple commercial, le mandataire est formé aux aides de l'État, aux normes RGE et aux spécificités techniques de chaque type de travaux. Mon rôle en tant que mandataire Effy en Hauts-de-France : je réalise un bilan de votre logement, je calcule précisément les aides auxquelles vous avez droit, je vous mets en relation avec des artisans RGE partenaires, je monte vos dossiers d'aides et je suis votre chantier jusqu'à la fin.",
  },
  {
    question: 'Est-ce vraiment gratuit ? Il n\'y a pas de frais cachés ?',
    answer:
      "Oui, l'étude Renoted et l'accompagnement sont gratuits et sans engagement. Les visites, le calcul des aides, la constitution des dossiers administratifs et le suivi de chantier sont inclus. Les travaux peuvent ensuite être financés par les aides disponibles et, si besoin, par un éco-PTZ. Le reste à charge exact dépend de votre situation : il est toujours annoncé avant signature.",
  },
  {
    question: 'Combien de temps durent les travaux de rénovation énergétique ?',
    answer:
      "La durée des travaux varie selon leur nature. Une isolation des combles perdus se fait généralement en 1 journée. L'isolation des combles aménagés ou des murs prend 2 à 5 jours selon la surface. L'installation d'une pompe à chaleur air/eau prend 2 à 4 jours. Une installation photovoltaïque prend souvent 1 à 3 jours. Un poêle à granulés nécessite 1 à 2 jours. Les délais de planification avec l'artisan peuvent être de quelques semaines selon les disponibilités. Pour les démarches administratives (dossier MaPrimeRénov'), comptez 4 à 8 semaines. Teddy suit l'avancement de votre dossier et vous tient informé à chaque étape.",
  },
  {
    question: 'Mes artisans sont-ils vraiment certifiés RGE ?',
    answer:
      "Oui, et c'est non négociable. La certification RGE (Reconnu Garant de l'Environnement) est obligatoire pour bénéficier des aides de l'État comme MaPrimeRénov' et les CEE. Tous les artisans que je sélectionne dans le réseau Effy sont certifiés RGE par des organismes accrédités (Qualibat, Qualifelec, QualiPAC…). Cette certification garantit leur compétence technique pour les travaux d'économies d'énergie et est renouvelée tous les 4 ans après contrôle. Je vérifie systématiquement la validité de leur certification avant tout chantier. Vous pouvez également vérifier le statut RGE de n'importe quel artisan sur le site france-renov.gouv.fr.",
  },
  {
    question: 'Je suis locataire, puis-je bénéficier des aides à la rénovation ?',
    answer:
      "La situation des locataires est plus limitée mais pas impossible. MaPrimeRénov' est en principe réservée aux propriétaires (occupants ou bailleurs). En tant que locataire, vous ne pouvez pas entreprendre des travaux d'isolation ou de chauffage sans l'accord de votre propriétaire. Cependant, certaines aides peuvent vous concerner indirectement : votre propriétaire peut bénéficier de MaPrimeRénov' Bailleur pour rénover son bien, ce qui améliore votre confort. Pour les équipements individuels (chauffe-eau thermodynamique par exemple), certains cas spécifiques permettent une éligibilité. Je vous recommande de contacter Teddy pour analyser précisément votre situation de locataire.",
  },
  {
    question: "Comment financer le reste à charge s'il en reste un ?",
    answer:
      "Si après toutes les aides un reste à charge subsiste, plusieurs solutions existent. L'éco-PTZ (Éco-Prêt à Taux Zéro) vous permet d'emprunter jusqu'à 50 000€ sans intérêts, remboursable sur 20 ans maximum, sans condition de ressources. Il est cumulable avec MaPrimeRénov'. Certaines banques proposent des prêts travaux dédiés à taux préférentiels. La Région Hauts-de-France propose parfois des aides complémentaires. Des aides locales (département, commune) peuvent s'ajouter selon votre ville. L'ANAH propose également des aides spécifiques pour les propriétaires occupants aux revenus très modestes. Teddy analyse votre situation complète pour trouver le montage financier optimal.",
  },
  {
    question: "Hauts-de-France : y a-t-il des aides régionales supplémentaires ?",
    answer:
      "Oui, les Hauts-de-France disposent de dispositifs d'aide complémentaires aux aides nationales. La Région Hauts-de-France soutient la rénovation énergétique dans le cadre de son plan Climat. Certains départements (Nord, Pas-de-Calais, Somme, Oise, Aisne) proposent des aides spécifiques pour les foyers modestes. De nombreuses communes et intercommunalités (MEL, Douaisis, Artois…) ont des programmes locaux d'aide à la rénovation. Action Logement intervient pour les salariés du secteur privé. L'ADIL (Agence Départementale pour l'Information sur le Logement) peut vous orienter vers des aides méconnues. Teddy, en tant qu'expert local, connaît ces dispositifs régionaux et veille à ce que vous n'en ratiez aucun.",
  },
  {
    question: 'Comment contacter Teddy Lecomte et dans quels délais ?',
    answer:
      "Vous pouvez contacter Teddy de plusieurs façons. Par téléphone au 06.24.29.10.96 du lundi au vendredi de 9h à 20h et le samedi de 9h à 12h — c'est souvent le moyen le plus rapide. Par email à contact@renoted.fr, avec un rappel sous 24h ouvrées. Via le formulaire de contact sur ce site, Teddy vous rappelle sous 24h ouvrées. Teddy se déplace également à domicile gratuitement dans toute la région Hauts-de-France pour réaliser le bilan énergétique de votre logement.",
  },
]

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer,
    },
  })),
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i)

  return (
    <section
      id="faq"
      className="py-20 md:py-28 bg-[#F8FAFC]"
      aria-labelledby="faq-title"
    >
      {/* FAQ Schema.org */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <Badge variant="green" className="mb-4">FAQ</Badge>
          <h2 id="faq-title" className="text-3xl md:text-4xl font-extrabold text-[#0F172A] mb-4">
            Questions fréquentes sur<br className="hidden sm:block" /> la rénovation énergétique
          </h2>
          <p className="text-slate-500 text-lg max-w-xl mx-auto">
            Tout ce que vous devez savoir avant de vous lancer dans vos travaux
            en Hauts-de-France.
          </p>
        </motion.div>

        {/* Accordion */}
        <div className="space-y-3" role="list">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.4, delay: Math.min(i * 0.05, 0.3) }}
              className="bg-white rounded-xl border border-slate-200 shadow-card overflow-hidden"
              role="listitem"
            >
              <button
                onClick={() => toggle(i)}
                className="w-full flex items-center justify-between gap-4 px-6 py-4 text-left hover:bg-slate-50 transition-colors"
                aria-expanded={openIndex === i}
                aria-controls={`faq-answer-${i}`}
              >
                <span className="flex items-start gap-3">
                  <span
                    className="flex-shrink-0 h-6 w-6 rounded-full bg-[#E8F8EF] text-[#1EB564] flex items-center justify-center text-xs font-bold mt-0.5"
                    aria-hidden="true"
                  >
                    {i + 1}
                  </span>
                  <span className="font-semibold text-[#0F172A] text-sm md:text-base leading-snug">
                    {faq.question}
                  </span>
                </span>
                <span
                  className={`flex-shrink-0 h-8 w-8 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                    openIndex === i
                      ? 'border-[#1EB564] bg-[#1EB564] text-white rotate-45'
                      : 'border-slate-200 text-slate-400'
                  }`}
                  aria-hidden="true"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-4 h-4"
                  >
                    <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
                  </svg>
                </span>
              </button>

              <AnimatePresence initial={false}>
                {openIndex === i && (
                  <motion.div
                    id={`faq-answer-${i}`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    style={{ overflow: 'hidden' }}
                    role="region"
                    aria-labelledby={`faq-question-${i}`}
                  >
                    <div className="px-6 pb-5 pt-1 border-t border-slate-100">
                      <p className="text-slate-600 text-sm leading-relaxed pl-9">
                        {faq.answer}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mt-12 bg-white rounded-2xl border border-slate-200 shadow-card p-8"
        >
          <h3 className="font-bold text-[#0F172A] text-xl mb-2">
            Votre question n&apos;est pas listée ?
          </h3>
          <p className="text-slate-500 mb-5 text-sm">
            Teddy est disponible pour répondre à toutes vos questions sur la rénovation
            énergétique en Hauts-de-France.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href="tel:+33624291096"
              className="inline-flex items-center gap-2 bg-[#1EB564] text-white px-6 py-3 rounded-btn font-semibold hover:bg-[#0D7A3E] transition-colors shadow-md"
            >
              📞 06.24.29.10.96
            </a>
            <button
              onClick={() => {
                const el = document.querySelector('#contact')
                if (el) {
                  const top = el.getBoundingClientRect().top + window.scrollY - 80
                  window.scrollTo({ top, behavior: 'smooth' })
                }
              }}
              className="inline-flex items-center gap-2 border-2 border-[#1EB564] text-[#1EB564] px-6 py-3 rounded-btn font-semibold hover:bg-[#E8F8EF] transition-colors"
            >
              ✉️ Envoyer un message
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
