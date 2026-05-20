import Link from 'next/link'
import { cityPages, workPages } from '@/lib/seo-pages'

const usefulLinks = [
  { label: 'MaPrimeRénov\' (officiel)', href: 'https://www.maprimerenov.gouv.fr', external: true },
  { label: 'Site Effy', href: 'https://www.effy.fr', external: true },
  { label: 'Aides ANAH', href: 'https://www.anah.fr', external: true },
  { label: 'Eco-PTZ — Service Public', href: 'https://www.service-public.fr/particuliers/vosdroits/F19905', external: true },
  { label: 'Mentions légales', href: '#mentions-legales', external: false },
  { label: 'Politique de confidentialité', href: '#confidentialite', external: false },
]

const footerCities = cityPages.slice(0, 6)

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-[#0F172A] text-white" role="contentinfo">
      {/* Top band */}
      <div className="bg-[#1EB564] py-5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="bg-white/20 rounded-full p-2">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5" aria-hidden="true">
                <path fillRule="evenodd" d="M2 3.5A1.5 1.5 0 013.5 2h1.148a1.5 1.5 0 011.465 1.175l.716 3.223a1.5 1.5 0 01-1.052 1.767l-.933.267c-.41.117-.643.555-.48.95a11.542 11.542 0 006.254 6.254c.395.163.833-.07.95-.48l.267-.933a1.5 1.5 0 011.767-1.052l3.223.716A1.5 1.5 0 0118 15.352V16.5a1.5 1.5 0 01-1.5 1.5H15c-1.149 0-2.263-.15-3.326-.43A13.022 13.022 0 012.43 8.326 13.019 13.019 0 012 5V3.5z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <p className="font-bold text-white">Un projet de rénovation ?</p>
              <p className="text-white/80 text-sm">Teddy vous rappelle sous 24h ouvrées</p>
            </div>
          </div>
          <a
            href="tel:+33624291096"
            className="inline-flex items-center gap-2 bg-white text-[#0D7A3E] font-bold px-6 py-3 rounded-btn hover:bg-slate-50 transition-colors text-lg"
          >
            📞 06.24.29.10.96
          </a>
        </div>
      </div>

      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand column */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl font-extrabold text-white">Renoted</span>
              <span className="h-2.5 w-2.5 rounded-full bg-[#1EB564]"></span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed mb-5">
              Mandataire local Effy en Hauts-de-France. Accompagnement personnalisé pour vos
              travaux de rénovation énergétique et maximisation de vos aides.
            </p>
            {/* Social */}
            <div className="flex items-center gap-3">
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook Renoted"
                className="h-9 w-9 rounded-full bg-white/10 hover:bg-[#1EB564] transition-colors flex items-center justify-center"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/>
                </svg>
              </a>
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram Renoted"
                className="h-9 w-9 rounded-full bg-white/10 hover:bg-[#1EB564] transition-colors flex items-center justify-center"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"/>
                </svg>
              </a>
              <a
                href="https://www.linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn Renoted"
                className="h-9 w-9 rounded-full bg-white/10 hover:bg-[#1EB564] transition-colors flex items-center justify-center"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
              Nos services
            </h3>
            <ul className="space-y-2.5">
              {workPages.map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/travaux/${service.slug}`}
                    className="text-slate-400 text-sm hover:text-[#1EB564] transition-colors flex items-center gap-2"
                  >
                    <span className="text-[#1EB564] text-xs">▸</span>
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Useful links */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
              Liens utiles
            </h3>
            <ul className="space-y-2.5">
              {usefulLinks.map((link) => (
                <li key={link.label}>
                  {link.external ? (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-400 text-sm hover:text-[#1EB564] transition-colors flex items-center gap-2"
                    >
                      <span className="text-[#1EB564] text-xs">▸</span>
                      {link.label}
                    </a>
                  ) : (
                    <a
                      href={link.href}
                      className="text-slate-400 text-sm hover:text-[#1EB564] transition-colors flex items-center gap-2"
                    >
                      <span className="text-[#1EB564] text-xs">▸</span>
                      {link.label}
                    </a>
                  )}
                </li>
              ))}
              {footerCities.map((city) => (
                <li key={city.slug}>
                  <Link
                    href={`/villes/${city.slug}`}
                    className="text-slate-400 text-sm hover:text-[#1EB564] transition-colors flex items-center gap-2"
                  >
                    <span className="text-[#1EB564] text-xs">▸</span>
                    Rénovation à {city.city}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
              Contact & Horaires
            </h3>
            <address className="not-italic space-y-4">
              <div>
                <p className="text-slate-400 text-sm mb-1">Téléphone</p>
                <a
                  href="tel:+33624291096"
                  className="text-[#1EB564] font-bold text-lg hover:text-[#0D7A3E] transition-colors"
                >
                  06.24.29.10.96
                </a>
              </div>
              <div>
                <p className="text-slate-400 text-sm mb-1">Email</p>
                <a
                href="mailto:contact@renoted.fr"
                  className="text-white text-sm hover:text-[#1EB564] transition-colors break-all"
                >
                  contact@renoted.fr
                </a>
              </div>
              <div>
                <p className="text-slate-400 text-sm mb-2">Horaires d&apos;ouverture</p>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#1EB564] flex-shrink-0"></span>
                    <span className="text-white text-sm">Lun–Ven : 9h – 20h</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#1EB564] flex-shrink-0"></span>
                    <span className="text-white text-sm">Samedi : 9h – 12h</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-600 flex-shrink-0"></span>
                    <span className="text-slate-400 text-sm">Dimanche : Fermé</span>
                  </div>
                </div>
              </div>
              <div>
                <p className="text-slate-400 text-sm mb-1">Zone d&apos;intervention</p>
                <p className="text-white text-sm">Hauts-de-France</p>
                <p className="text-slate-400 text-xs mt-1">
                  Nord · Pas-de-Calais · Somme · Oise · Aisne
                </p>
              </div>
            </address>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-slate-500 text-sm">
            © {currentYear} Renoted — Mandataire local Effy Hauts-de-France. Tous droits réservés.
          </p>
          <div className="flex items-center gap-4 text-slate-500 text-xs">
            <a href="#mentions-legales" className="hover:text-slate-300 transition-colors">Mentions légales</a>
            <span>·</span>
            <a href="#confidentialite" className="hover:text-slate-300 transition-colors">Confidentialité</a>
            <span>·</span>
            <a href="#rgpd" className="hover:text-slate-300 transition-colors">RGPD</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
