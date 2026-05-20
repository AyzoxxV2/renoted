# Renoted — Site Web Rénovation Énergétique

Site production-ready pour **Renoted**, mandataire local Effy en Hauts-de-France.  
Construit avec **Next.js 14**, **TypeScript**, **Tailwind CSS v3**, **Framer Motion**.

---

## 🚀 Installation rapide

```bash
# 1. Cloner / dézipper le projet
cd renoted

# 2. Installer les dépendances
npm install

# 3. Configurer les variables d'environnement
cp .env.local.example .env.local
# Éditez .env.local avec vos vraies valeurs

# 4. Lancer en développement
npm run dev

# 5. Ouvrir http://localhost:3000
```

---

## 📦 Stack technique

| Technologie | Version | Rôle |
|---|---|---|
| Next.js | 14.2.5 | Framework fullstack (App Router) |
| React | 18.3 | UI Library |
| TypeScript | 5.5 | Typage strict |
| Tailwind CSS | 3.4 | Styling utility-first |
| Framer Motion | 11 | Animations (scroll, counters, carousel) |
| React Hook Form | 7.52 | Gestion formulaires |
| Zod | 3.23 | Validation client + serveur |
| Resend | 3.3 | Envoi d'emails transactionnels |

---

## 🔧 Configuration emails (Resend)

1. Créez un compte sur [resend.com](https://resend.com)
2. Vérifiez votre domaine `renoted.fr` dans Resend
3. Copiez votre clé API dans `.env.local` :
   ```
   RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxx
   FROM_EMAIL=no-reply@renoted.fr
   TEDDY_EMAIL=contact@renoted.fr
   ```

**Sans clé Resend** : les emails sont loggés dans la console (mode développement).

---

## 📁 Structure du projet

```
renoted/
├── app/
│   ├── layout.tsx          ← SEO global, Schema.org LocalBusiness, fonts
│   ├── page.tsx            ← Homepage (assembly de toutes les sections)
│   ├── globals.css         ← Styles globaux Tailwind
│   ├── sitemap.ts          ← Sitemap XML dynamique
│   ├── robots.ts           ← robots.txt
│   └── api/contact/        ← API Route email + validation Zod
├── components/
│   ├── layout/
│   │   ├── Header.tsx      ← Navigation sticky, menu mobile, CTA
│   │   └── Footer.tsx      ← Colonnes, horaires, réseaux sociaux
│   ├── sections/
│   │   ├── Hero.tsx        ← H1, compteurs animés, CTAs
│   │   ├── TrustBar.tsx    ← Logos de confiance
│   │   ├── Services.tsx    ← 8 cards services avec icônes SVG
│   │   ├── HowItWorks.tsx  ← Timeline 4 étapes
│   │   ├── Aides.tsx       ← Cards aides + simulateur interactif
│   │   ├── SolteoWidget.tsx← Iframe Solteo photovoltaïque
│   │   ├── Testimonials.tsx← Carousel 3 avis
│   │   ├── About.tsx       ← Présentation Teddy + zone intervention
│   │   ├── ContactForm.tsx ← Formulaire RGPD + soumission API
│   │   └── FAQ.tsx         ← Accordéon 10 questions + Schema FAQPage
│   └── ui/
│       ├── Button.tsx      ← Composant bouton réutilisable
│       ├── Badge.tsx       ← Badges colorés
│       ├── Card.tsx        ← Carte générique avec hover
│       ├── PhoneButton.tsx ← Bouton flottant mobile
│       ├── CookieBanner.tsx← Bannière RGPD cookies
│       └── ScrollToTop.tsx ← Bouton retour haut de page
├── lib/
│   ├── email.ts            ← Logique emails Resend (lead, confirmation, marketing)
│   └── schema.ts           ← Schémas de validation Zod
└── public/                 ← Logo, favicon, Open Graph, images à ajouter
```

---

## 🌐 Déploiement Vercel

```bash
# Option 1 : Via CLI Vercel
npm install -g vercel
vercel deploy --prod

# Option 2 : Via interface Vercel
# 1. Pousser le code sur GitHub
# 2. Importer le projet sur vercel.com
# 3. Ajouter les variables d'environnement dans les Settings Vercel
# 4. Déployer
```

**Variables d'environnement à ajouter dans Vercel** :
- `RESEND_API_KEY`
- `FROM_EMAIL`
- `TEDDY_EMAIL`
- `NEXT_PUBLIC_SITE_URL`

---

## 🖼️ Images à ajouter dans `/public`

| Fichier | Dimensions | Usage |
|---|---|---|
| `og-image.svg` | 1200×630px | Open Graph / partage réseaux |
| `favicon.svg` | 64×64px | Onglet navigateur |
| `logo.svg` | 260×64px | Logo et partage |
| `teddy-lecomte.jpg` | 400×400px | Photo section À propos |

---

## 🔍 SEO checklist

- [x] Title & meta description optimisés
- [x] Schema.org LocalBusiness (layout.tsx)
- [x] Schema.org FAQPage (FAQ.tsx)
- [x] Open Graph + Twitter Card
- [x] Sitemap.xml dynamique
- [x] robots.txt permissif
- [x] Alt text sur toutes les images
- [x] H1 unique, hiérarchie H2/H3 respectée
- [x] Mots-clés locaux intégrés naturellement
- [x] canonical URL
- [ ] Ajouter l'ID Google Analytics 4 (`G-XXXXXXXXXX`) dans layout.tsx

---

## ✅ Checklist avant mise en ligne

- Ajouter une vraie photo de Teddy dans `public/teddy-lecomte.jpg`
- Remplacer ou valider `public/og-image.svg`, `public/logo.svg`, `public/favicon.svg`
- Renseigner `RESEND_API_KEY`, `FROM_EMAIL`, `TEDDY_EMAIL`
- Renseigner `NEXT_PUBLIC_GA_MEASUREMENT_ID` pour suivre les conversions
- Vérifier les pages SEO locales `/villes/lille`, `/villes/dunkerque`, `/travaux/isolation-combles`, etc.
- Tester un envoi formulaire en production avec une vraie adresse email
- Créer un compte Google Search Console et envoyer `https://www.renoted.fr/sitemap.xml`
- Brancher un outil de rendez-vous si Teddy veut des créneaux réservables directement

---

## 📞 Contacts

- **Fondateur** : Teddy Lecomte
- **Tél** : 06.24.29.10.96
- **Email** : contact@renoted.fr
- **Partenaire** : [Effy.fr](https://www.effy.fr)
