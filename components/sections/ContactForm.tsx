'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { motion, AnimatePresence } from 'framer-motion'
import { contactFormSchema, type ContactFormData } from '@/lib/schema'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import { trackEvent } from '@/lib/tracking'

const projectTypes = [
  { value: 'isolation', label: '🏠 Isolation (combles, murs, sol)' },
  { value: 'chauffage', label: '🔥 Chauffage (PAC, poêle, chauffe-eau)' },
  { value: 'photovoltaique', label: '☀️ Photovoltaïque' },
  { value: 'audit', label: '📋 Audit énergétique' },
  { value: 'bilan_thermique', label: '🌡️ Bilan thermique' },
  { value: 'renovation_globale', label: '🏡 Rénovation globale énergétique' },
  { value: 'renovation_generale', label: '🛠️ Rénovation générale intérieur / extérieur' },
  { value: 'autre', label: '💬 Autre / Je ne sais pas encore' },
]

interface Toast {
  type: 'success' | 'error'
  message: string
}

function createFallbackMailto(data: ContactFormData) {
  const subject = encodeURIComponent(`Demande d'étude Renoted - ${data.prenom} ${data.nom}`)
  const body = encodeURIComponent(
    [
      `Bonjour Teddy,`,
      ``,
      `Je souhaite être recontacté(e) pour un projet de rénovation énergétique.`,
      ``,
      `Nom : ${data.prenom} ${data.nom}`,
      `Email : ${data.email}`,
      `Téléphone : ${data.telephone}`,
      `Type de projet : ${data.typeProjet}`,
      `Message : ${data.message || 'Non renseigné'}`,
      ``,
      `Consentement RGPD : oui`,
      `Informations/offres Renoted : ${data.marketing ? 'oui' : 'non'}`,
    ].join('\n')
  )

  return `mailto:contact@renoted.fr?subject=${subject}&body=${body}`
}

export default function ContactForm() {
  const [toast, setToast] = useState<Toast | null>(null)
  const [submitted, setSubmitted] = useState(false)
  const [fallbackMailto, setFallbackMailto] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      marketing: true,
      rgpd: false,
    },
  })

  const onSubmit = async (data: ContactFormData) => {
    setFallbackMailto(null)

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          sourcePath: `${window.location.pathname}${window.location.hash}`,
        }),
      })
      const result = await res.json()

      if (res.ok && result.success) {
        trackEvent('generate_lead', {
          project_type: data.typeProjet,
          marketing: data.marketing,
        })
        setToast({ type: 'success', message: result.message })
        setSubmitted(true)
        reset()
        setTimeout(() => setToast(null), 8000)
      } else {
        if (result.fallback && result.mailtoHref) {
          trackEvent('lead_fallback_mailto', {
            project_type: data.typeProjet,
          })
          setFallbackMailto(result.mailtoHref)
        }

        setToast({
          type: 'error',
          message: result.message || 'Une erreur est survenue. Veuillez réessayer.',
        })
        setTimeout(() => setToast(null), 6000)
      }
    } catch {
      setFallbackMailto(createFallbackMailto(data))
      setToast({
        type: 'error',
        message: 'Erreur de connexion. Vous pouvez transmettre la demande par email pré-rempli ou appeler Teddy.',
      })
      setTimeout(() => setToast(null), 6000)
    }
  }

  return (
    <section
      id="contact"
      className="py-20 md:py-28 bg-[#0F172A] relative overflow-hidden"
      aria-labelledby="contact-title"
    >
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-14 items-start">
          {/* Left info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2 text-white"
          >
            <Badge variant="green" className="mb-4">📬 Étude gratuite</Badge>
            <h2 id="contact-title" className="text-3xl md:text-4xl font-extrabold text-white mb-5">
              Obtenez votre<br />
              <span className="text-[#1EB564]">étude gratuite</span><br />
              sous 24h
            </h2>
            <p className="text-slate-400 text-base leading-relaxed mb-8">
              Remplissez ce formulaire et Teddy Lecomte vous contacte personnellement
              pour analyser votre situation et calculer vos aides.
            </p>

            {/* Contact cards */}
            <div className="space-y-4">
              <a
                href="tel:+33624291096"
                className="flex items-center gap-4 bg-white/5 hover:bg-white/10 rounded-xl p-4 border border-white/10 transition-all group"
              >
                <div className="h-10 w-10 rounded-full bg-[#1EB564]/20 flex items-center justify-center text-[#1EB564] flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5" aria-hidden="true">
                    <path fillRule="evenodd" d="M2 3.5A1.5 1.5 0 013.5 2h1.148a1.5 1.5 0 011.465 1.175l.716 3.223a1.5 1.5 0 01-1.052 1.767l-.933.267c-.41.117-.643.555-.48.95a11.542 11.542 0 006.254 6.254c.395.163.833-.07.95-.48l.267-.933a1.5 1.5 0 011.767-1.052l3.223.716A1.5 1.5 0 0118 15.352V16.5a1.5 1.5 0 01-1.5 1.5H15c-1.149 0-2.263-.15-3.326-.43A13.022 13.022 0 012.43 8.326 13.019 13.019 0 012 5V3.5z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="text-white font-bold text-lg group-hover:text-[#1EB564] transition-colors">
                    06.24.29.10.96
                  </p>
                  <p className="text-slate-400 text-xs">Lun-Ven 9h-20h · Sam 9h-12h</p>
                </div>
              </a>

              <a
                href="mailto:contact@renoted.fr"
                className="flex items-center gap-4 bg-white/5 hover:bg-white/10 rounded-xl p-4 border border-white/10 transition-all group"
              >
                <div className="h-10 w-10 rounded-full bg-[#1EB564]/20 flex items-center justify-center text-[#1EB564] flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5" aria-hidden="true">
                    <path d="M3 4a2 2 0 00-2 2v1.161l8.441 4.221a1.25 1.25 0 001.118 0L19 7.162V6a2 2 0 00-2-2H3z" />
                    <path d="M19 8.839l-7.77 3.885a2.75 2.75 0 01-2.46 0L1 8.839V14a2 2 0 002 2h14a2 2 0 002-2V8.839z" />
                  </svg>
                </div>
                <div>
                  <p className="text-white font-medium text-sm group-hover:text-[#1EB564] transition-colors break-all">
                    contact@renoted.fr
                  </p>
                  <p className="text-slate-400 text-xs">Rappel sous 24h ouvrées</p>
                </div>
              </a>
            </div>

            {/* Reassurance */}
            <div className="mt-8 space-y-2">
              {[
                'Étude gratuite et sans engagement',
                'Rappel sous 24h ouvrées',
                'Aides calculées et dossiers gérés',
                'Artisans RGE sélectionnés',
              ].map((item) => (
                <div key={item} className="flex items-center gap-2 text-slate-300 text-sm">
                  <span className="text-[#1EB564]">✓</span>
                  {item}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-3"
          >
            {/* Toast notification */}
            <AnimatePresence>
              {toast && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  role="alert"
                  className={`mb-6 px-5 py-4 rounded-xl flex items-start gap-3 ${
                    toast.type === 'success'
                      ? 'bg-[#E8F8EF] border border-[#1EB564]/30 text-[#0D7A3E]'
                      : 'bg-red-50 border border-red-200 text-red-700'
                  }`}
                >
                  <span className="text-xl">{toast.type === 'success' ? '✅' : '❌'}</span>
                  <p className="font-medium text-sm">{toast.message}</p>
                </motion.div>
              )}
            </AnimatePresence>

            {fallbackMailto && !submitted && (
              <motion.div
                initial={{ opacity: 0, y: -12 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 rounded-xl border border-amber-200 bg-amber-50 p-5 text-amber-900"
                role="status"
              >
                <p className="text-sm font-bold">Envoi automatique non configuré</p>
                <p className="mt-1 text-sm leading-relaxed">
                  Le site peut déjà convertir sans backend : ouvrez l&apos;email pré-rempli, vérifiez le
                  contenu, puis envoyez-le à Teddy.
                </p>
                <div className="mt-4 flex flex-col sm:flex-row gap-3">
                  <a
                    href={fallbackMailto}
                    className="inline-flex items-center justify-center rounded-btn bg-[#1EB564] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#0D7A3E]"
                  >
                    Ouvrir l&apos;email pré-rempli
                  </a>
                  <a
                    href="tel:+33624291096"
                    className="inline-flex items-center justify-center rounded-btn border-2 border-amber-300 px-5 py-3 text-sm font-semibold text-amber-900 transition-colors hover:bg-amber-100"
                  >
                    Appeler Teddy
                  </a>
                </div>
              </motion.div>
            )}

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white rounded-2xl p-10 text-center shadow-card-lg"
              >
                <div className="text-6xl mb-4">🎉</div>
                <h3 className="text-2xl font-bold text-[#0F172A] mb-3">Demande envoyée !</h3>
                <p className="text-slate-500 mb-6">
                  Teddy Lecomte vous contactera dans les 24h pour analyser votre projet
                  et vous présenter les aides auxquelles vous avez droit.
                </p>
                <a href="tel:+33624291096" className="inline-flex items-center gap-2 bg-[#1EB564] text-white px-6 py-3 rounded-btn font-semibold hover:bg-[#0D7A3E] transition-colors">
                  📞 Appeler Teddy maintenant
                </a>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-4 block w-full text-slate-400 text-sm hover:text-slate-600"
                >
                  Envoyer une autre demande
                </button>
              </motion.div>
            ) : (
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="bg-white rounded-2xl shadow-card-lg overflow-hidden"
                noValidate
              >
                <div className="bg-gradient-to-r from-[#1EB564] to-[#0D7A3E] px-6 py-5">
                  <h3 className="text-white font-bold text-lg">Votre demande d&apos;étude gratuite</h3>
                  <p className="text-white/80 text-sm mt-0.5">Tous les champs marqués * sont obligatoires</p>
                </div>

                <div className="p-6 md:p-8 space-y-5">
                  <input
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    className="hidden"
                    aria-hidden="true"
                    {...register('website')}
                  />

                  {/* Prénom / Nom */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="prenom" className="block text-sm font-semibold text-[#0F172A] mb-1.5">
                        Prénom <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="prenom"
                        type="text"
                        autoComplete="given-name"
                        placeholder="Marie"
                        {...register('prenom')}
                        className={`w-full px-4 py-2.5 rounded-xl border text-[#0F172A] text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-[#1EB564] focus:border-transparent ${
                          errors.prenom ? 'border-red-400 bg-red-50' : 'border-slate-200 bg-slate-50 hover:border-slate-300'
                        }`}
                        aria-describedby={errors.prenom ? 'prenom-error' : undefined}
                        aria-invalid={!!errors.prenom}
                      />
                      {errors.prenom && (
                        <p id="prenom-error" className="mt-1 text-red-500 text-xs" role="alert">{errors.prenom.message}</p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="nom" className="block text-sm font-semibold text-[#0F172A] mb-1.5">
                        Nom <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="nom"
                        type="text"
                        autoComplete="family-name"
                        placeholder="Dupont"
                        {...register('nom')}
                        className={`w-full px-4 py-2.5 rounded-xl border text-[#0F172A] text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-[#1EB564] focus:border-transparent ${
                          errors.nom ? 'border-red-400 bg-red-50' : 'border-slate-200 bg-slate-50 hover:border-slate-300'
                        }`}
                        aria-describedby={errors.nom ? 'nom-error' : undefined}
                        aria-invalid={!!errors.nom}
                      />
                      {errors.nom && (
                        <p id="nom-error" className="mt-1 text-red-500 text-xs" role="alert">{errors.nom.message}</p>
                      )}
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-[#0F172A] mb-1.5">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="email"
                      type="email"
                      autoComplete="email"
                      placeholder="marie.dupont@email.fr"
                      {...register('email')}
                      className={`w-full px-4 py-2.5 rounded-xl border text-[#0F172A] text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-[#1EB564] focus:border-transparent ${
                        errors.email ? 'border-red-400 bg-red-50' : 'border-slate-200 bg-slate-50 hover:border-slate-300'
                      }`}
                      aria-describedby={errors.email ? 'email-error' : undefined}
                      aria-invalid={!!errors.email}
                    />
                    {errors.email && (
                      <p id="email-error" className="mt-1 text-red-500 text-xs" role="alert">{errors.email.message}</p>
                    )}
                  </div>

                  {/* Téléphone */}
                  <div>
                    <label htmlFor="telephone" className="block text-sm font-semibold text-[#0F172A] mb-1.5">
                      Téléphone <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="telephone"
                      type="tel"
                      autoComplete="tel"
                      placeholder="06 12 34 56 78"
                      {...register('telephone')}
                      className={`w-full px-4 py-2.5 rounded-xl border text-[#0F172A] text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-[#1EB564] focus:border-transparent ${
                        errors.telephone ? 'border-red-400 bg-red-50' : 'border-slate-200 bg-slate-50 hover:border-slate-300'
                      }`}
                      aria-describedby={errors.telephone ? 'tel-error' : undefined}
                      aria-invalid={!!errors.telephone}
                    />
                    {errors.telephone && (
                      <p id="tel-error" className="mt-1 text-red-500 text-xs" role="alert">{errors.telephone.message}</p>
                    )}
                  </div>

                  {/* Type de projet */}
                  <div>
                    <label htmlFor="typeProjet" className="block text-sm font-semibold text-[#0F172A] mb-1.5">
                      Type de projet <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="typeProjet"
                      {...register('typeProjet')}
                      className={`w-full px-4 py-2.5 rounded-xl border text-[#0F172A] text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-[#1EB564] focus:border-transparent bg-slate-50 ${
                        errors.typeProjet ? 'border-red-400' : 'border-slate-200'
                      }`}
                      defaultValue=""
                      aria-describedby={errors.typeProjet ? 'type-error' : undefined}
                      aria-invalid={!!errors.typeProjet}
                    >
                      <option value="" disabled>Sélectionner votre projet…</option>
                      {projectTypes.map((t) => (
                        <option key={t.value} value={t.value}>{t.label}</option>
                      ))}
                    </select>
                    {errors.typeProjet && (
                      <p id="type-error" className="mt-1 text-red-500 text-xs" role="alert">{errors.typeProjet.message}</p>
                    )}
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="message" className="block text-sm font-semibold text-[#0F172A] mb-1.5">
                      Message <span className="text-slate-400 font-normal">(optionnel)</span>
                    </label>
                    <textarea
                      id="message"
                      rows={3}
                      placeholder="Décrivez votre projet, votre type de logement, vos questions…"
                      {...register('message')}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-[#0F172A] text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-[#1EB564] focus:border-transparent hover:border-slate-300 resize-none"
                    />
                  </div>

                  {/* RGPD checkboxes */}
                  <div className="space-y-3 pt-2 border-t border-slate-100">
                    {/* RGPD obligatoire */}
                    <label className="flex items-start gap-3 cursor-pointer group">
                      <input
                        type="checkbox"
                        {...register('rgpd')}
                        className="mt-0.5 h-4 w-4 rounded border-slate-300 text-[#1EB564] focus:ring-[#1EB564] cursor-pointer flex-shrink-0"
                        aria-describedby={errors.rgpd ? 'rgpd-error' : undefined}
                        aria-invalid={!!errors.rgpd}
                      />
                      <span className="text-slate-600 text-xs leading-relaxed">
                        <span className="text-red-500">*</span>{' '}
                        J&apos;accepte que mes données personnelles soient utilisées par Renoted
                        pour traiter ma demande d&apos;étude, conformément au{' '}
                        <a href="#rgpd" className="text-[#1EB564] underline">Règlement RGPD</a>.
                      </span>
                    </label>
                    {errors.rgpd && (
                      <p id="rgpd-error" className="text-red-500 text-xs ml-7" role="alert">{errors.rgpd.message}</p>
                    )}

                    {/* Marketing (optionnel, coché par défaut) */}
                    <label className="flex items-start gap-3 cursor-pointer group">
                      <input
                        type="checkbox"
                        {...register('marketing')}
                        className="mt-0.5 h-4 w-4 rounded border-slate-300 text-[#1EB564] focus:ring-[#1EB564] cursor-pointer flex-shrink-0"
                      />
                      <span className="text-slate-600 text-xs leading-relaxed">
                        ✅ J&apos;accepte de recevoir des informations et offres de Renoted par email/SMS
                        (actualités aides, conseils rénovation). Décochez pour ne pas recevoir ces
                        communications. Désabonnement possible à tout moment.
                      </span>
                    </label>
                  </div>

                  {/* Submit */}
                  <Button
                    type="submit"
                    size="lg"
                    fullWidth
                    loading={isSubmitting}
                    className="text-base shadow-lg mt-2"
                  >
                    {isSubmitting ? 'Envoi en cours…' : '🏠 Demander mon étude gratuite'}
                  </Button>

                  <p className="text-center text-slate-400 text-xs">
                    Gratuit · Sans engagement · Rappel sous 24h ouvrées
                  </p>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
