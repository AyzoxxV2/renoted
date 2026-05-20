export const siteUrl = 'https://www.renoted.fr'

export const cityPages = [
  {
    slug: 'lille',
    city: 'Lille',
    department: 'Nord',
    intro:
      "Renoted accompagne les propriétaires lillois pour réduire leur facture d'énergie avec des travaux ciblés, des artisans RGE et une estimation claire des aides.",
  },
  {
    slug: 'lens',
    city: 'Lens',
    department: 'Pas-de-Calais',
    intro:
      'Renoted aide les foyers de Lens à prioriser isolation, pompe à chaleur, photovoltaïque, rénovation générale et aides mobilisables avant de lancer les travaux.',
  },
  {
    slug: 'arras',
    city: 'Arras',
    department: 'Pas-de-Calais',
    intro:
      "À Arras, Teddy Lecomte vous aide à construire un projet de rénovation énergétique lisible, avec devis gratuit et sélection d'artisans RGE.",
  },
  {
    slug: 'amiens',
    city: 'Amiens',
    department: 'Somme',
    intro:
      'Renoted accompagne les propriétaires amiénois sur les travaux éligibles: isolation, chauffage, audit énergétique, photovoltaïque et rénovation générale.',
  },
  {
    slug: 'valenciennes',
    city: 'Valenciennes',
    department: 'Nord',
    intro:
      'À Valenciennes, un premier échange permet de vérifier les travaux utiles, les aides possibles et le meilleur calendrier de chantier.',
  },
  {
    slug: 'saint-quentin',
    city: 'Saint-Quentin',
    department: 'Aisne',
    intro:
      'À Saint-Quentin, Teddy vous aide à prioriser isolation, chauffage, bilan thermique et aides 2026 avant de lancer un chantier.',
  },
  {
    slug: 'peronne',
    city: 'Péronne',
    department: 'Somme',
    intro:
      'À Péronne et dans la Somme, Renoted accompagne les propriétaires sur les projets de rénovation énergétique et générale.',
  },
  {
    slug: 'bapaume',
    city: 'Bapaume',
    department: 'Pas-de-Calais',
    intro:
      'À Bapaume, un premier bilan permet de cadrer les travaux utiles, les aides mobilisables et le bon ordre d’intervention.',
  },
] as const

export const workPages = [
  {
    slug: 'isolation-combles',
    title: 'Isolation des combles',
    keyword: 'isolation des combles Hauts-de-France',
    benefit: "limiter les pertes de chaleur par la toiture, souvent l'une des priorités les plus rentables",
  },
  {
    slug: 'isolation-murs',
    title: 'Isolation des murs',
    keyword: 'isolation des murs Nord Pas-de-Calais',
    benefit: "améliorer le confort d'hiver et d'été en traitant une source majeure de déperdition",
  },
  {
    slug: 'pac-air-eau',
    title: 'Pompe à chaleur air/eau',
    keyword: 'pompe à chaleur air eau Hauts-de-France',
    benefit: 'remplacer un chauffage énergivore par un système plus performant avec aides possibles',
  },
  {
    slug: 'pac-air-air',
    title: 'Pompe à chaleur air/air',
    keyword: 'pompe à chaleur air air Hauts-de-France',
    benefit: 'chauffer et rafraîchir certaines pièces avec un système réversible performant',
  },
  {
    slug: 'poele-granules',
    title: 'Poêle à granulés',
    keyword: 'poêle à granulés Hauts-de-France',
    benefit: 'profiter d’un chauffage bois performant, confortable et adapté aux besoins du logement',
  },
  {
    slug: 'photovoltaique',
    title: 'Photovoltaïque',
    keyword: 'photovoltaïque Hauts-de-France',
    benefit: "produire une partie de votre électricité et mieux maîtriser vos factures sur la durée",
  },
  {
    slug: 'chauffe-eau-thermodynamique',
    title: 'Chauffe-eau thermodynamique',
    keyword: 'chauffe-eau thermodynamique Hauts-de-France',
    benefit: "réduire le coût de production d'eau chaude sanitaire avec un équipement performant",
  },
  {
    slug: 'audit-energetique',
    title: 'Audit énergétique et bilan thermique',
    keyword: 'audit énergétique Hauts-de-France',
    benefit: 'identifier les bons travaux, dans le bon ordre, avant de demander des devis',
  },
  {
    slug: 'renovation-generale',
    title: 'Rénovation générale intérieur extérieur',
    keyword: 'rénovation générale Hauts-de-France',
    benefit: 'coordonner carrelage, électricité, plomberie, revêtements de sols et aménagements extérieurs',
  },
] as const

export type CityPage = (typeof cityPages)[number]
export type WorkPage = (typeof workPages)[number]

export function getCityPage(slug: string) {
  return cityPages.find((page) => page.slug === slug)
}

export function getWorkPage(slug: string) {
  return workPages.find((page) => page.slug === slug)
}
