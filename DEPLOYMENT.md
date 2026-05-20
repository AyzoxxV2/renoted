# Mise en ligne Renoted

## 1. GitHub

Créer un dépôt GitHub nommé `renoted`, puis envoyer le contenu du dossier projet.

À envoyer :
- `app`
- `components`
- `lib`
- `public`
- `.env.local.example`
- `.gitignore`
- `DEPLOYMENT.md`
- `next.config.js`
- `package.json`
- `package-lock.json`
- `postcss.config.js`
- `README.md`
- `tailwind.config.ts`
- `tsconfig.json`
- `next-env.d.ts`

À ne pas envoyer :
- `.next`
- `node_modules`
- `.env.local`
- `images`

## 2. Vercel

Dans Vercel :

1. New Project
2. Importer `AyzoxxV2/renoted`
3. Framework Preset : Next.js
4. Build Command : `npm run build`
5. Output Directory : laisser vide
6. Installer / Deploy

Variables d'environnement à ajouter dans Vercel :

```env
RESEND_API_KEY=...
FROM_EMAIL=no-reply@renoted.fr
TEDDY_EMAIL=contact@renoted.fr
NEXT_PUBLIC_SITE_URL=https://www.renoted.fr
```

Optionnel plus tard :

```env
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
CONTACT_RATE_LIMIT_MAX=6
```

## 3. Domaine Vercel

Dans Vercel, ajouter les domaines :

- `renoted.fr`
- `www.renoted.fr`

Vercel donnera les entrées DNS exactes à mettre dans OVH.

## 4. OVH DNS

Dans OVH > `renoted.fr` > Zone DNS :

- conserver les NS OVH
- conserver/adapter les entrées email nécessaires
- remplacer les anciennes entrées web OVH par les entrées données par Vercel
- ajouter ensuite les entrées Resend pour l'envoi d'emails

Ne pas supprimer les entrées mail tant que `contact@renoted.fr` n'est pas validé.

## 5. Resend

Dans Resend :

1. Ajouter le domaine `renoted.fr`
2. Copier les enregistrements DNS fournis
3. Les ajouter dans OVH
4. Cliquer sur Verify DNS Records
5. Utiliser `no-reply@renoted.fr` comme expéditeur
