export default function Legal() {
  return (
    <section className="bg-[#F8FAFC] py-16" aria-label="Informations légales">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-4 text-sm leading-relaxed text-slate-600 sm:px-6 lg:grid-cols-3 lg:px-8">
        <article id="mentions-legales" className="scroll-mt-28 rounded-card border border-slate-200 bg-white p-6 shadow-card">
          <h2 className="text-base font-bold text-[#0F172A]">Mentions légales</h2>
          <p className="mt-3">
            Renoted est présenté comme un service d’accompagnement local porté par Teddy Lecomte,
            mandataire Effy en Hauts-de-France. Contact: contact@renoted.fr, 06.24.29.10.96.
          </p>
          <p className="mt-3">
            Les informations du site sont fournies à titre indicatif et doivent être confirmées lors
            d’une étude personnalisée avant tout engagement.
          </p>
        </article>

        <article id="confidentialite" className="scroll-mt-28 rounded-card border border-slate-200 bg-white p-6 shadow-card">
          <h2 className="text-base font-bold text-[#0F172A]">Confidentialité</h2>
          <p className="mt-3">
            Les données transmises via le formulaire servent uniquement à traiter votre demande de
            devis, vous recontacter et préparer une estimation d’aides. Elles ne sont pas revendues.
          </p>
          <p className="mt-3">
            Les cookies peuvent être utilisés pour améliorer l’expérience du site et mesurer le trafic
            de manière agrégée, selon votre choix dans la bannière de consentement.
          </p>
        </article>

        <article id="rgpd" className="scroll-mt-28 rounded-card border border-slate-200 bg-white p-6 shadow-card">
          <h2 className="text-base font-bold text-[#0F172A]">RGPD</h2>
          <p className="mt-3">
            Vous pouvez demander l’accès, la rectification ou la suppression de vos données personnelles
            en écrivant à contact@renoted.fr. Une demande marketing peut être refusée au moment
            de l’envoi du formulaire ou retirée à tout moment.
          </p>
          <p className="mt-3">
            La durée de conservation doit être limitée au temps nécessaire au suivi commercial et aux
            obligations légales applicables.
          </p>
        </article>
      </div>
    </section>
  )
}
