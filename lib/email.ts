import { ContactFormData } from './schema'

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

const projectTypeLabels: Record<string, string> = {
  isolation: 'Isolation thermique',
  chauffage: 'Pompe à chaleur / Chauffage',
  photovoltaique: 'Photovoltaïque',
  audit: 'Audit énergétique',
  bilan_thermique: 'Bilan thermique',
  renovation_globale: 'Rénovation globale énergétique',
  renovation_generale: 'Rénovation générale intérieur / extérieur',
  autre: 'Autre',
}

// Utilise Resend si RESEND_API_KEY est défini, sinon log en console (dev)
async function sendEmail(to: string, subject: string, html: string): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY
  const fromEmail = process.env.FROM_EMAIL || 'no-reply@renoted.fr'

  if (!apiKey) {
    console.log('--- EMAIL (dev mode, no RESEND_API_KEY) ---')
    console.log('To:', to)
    console.log('Subject:', subject)
    console.log('---')
    return true
  }

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: `Renoted <${fromEmail}>`,
        to: [to],
        subject,
        html,
      }),
    })

    return response.ok
  } catch (error) {
    console.error('Erreur envoi email:', error)
    return false
  }
}

export async function sendLeadEmailToTeddy(data: ContactFormData): Promise<boolean> {
  const safePrenom = escapeHtml(data.prenom)
  const safeNom = escapeHtml(data.nom)
  const safeEmail = escapeHtml(data.email)
  const safeTelephone = escapeHtml(data.telephone)
  const safeMessage = data.message ? escapeHtml(data.message).replace(/\n/g, '<br>') : ''

  const html = `
    <!DOCTYPE html>
    <html lang="fr">
    <head><meta charset="UTF-8"><style>
      body { font-family: Inter, Arial, sans-serif; background: #f8fafc; margin: 0; padding: 20px; }
      .container { max-width: 600px; margin: 0 auto; background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.07); }
      .header { background: linear-gradient(135deg, #0D7A3E, #1EB564); padding: 32px; color: white; }
      .header h1 { margin: 0; font-size: 24px; }
      .header p { margin: 8px 0 0; opacity: 0.9; }
      .body { padding: 32px; }
      .field { margin-bottom: 20px; border-bottom: 1px solid #E2E8F0; padding-bottom: 16px; }
      .field:last-child { border-bottom: none; }
      .label { font-size: 12px; font-weight: 600; color: #64748B; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px; }
      .value { font-size: 16px; color: #0F172A; font-weight: 500; }
      .badge { display: inline-block; background: #E8F8EF; color: #0D7A3E; padding: 4px 12px; border-radius: 20px; font-size: 13px; font-weight: 600; }
      .footer { background: #F8FAFC; padding: 20px 32px; font-size: 13px; color: #64748B; }
      .cta { display: inline-block; background: #1EB564; color: white; text-decoration: none; padding: 14px 28px; border-radius: 8px; font-weight: 600; margin-top: 16px; }
    </style></head>
    <body>
    <div class="container">
      <div class="header">
        <h1>🔔 Nouveau lead — Renoted</h1>
        <p>Un prospect vient de remplir le formulaire de contact</p>
      </div>
      <div class="body">
        <div class="field">
          <div class="label">Identité</div>
          <div class="value">${safePrenom} ${safeNom}</div>
        </div>
        <div class="field">
          <div class="label">Email</div>
          <div class="value"><a href="mailto:${safeEmail}">${safeEmail}</a></div>
        </div>
        <div class="field">
          <div class="label">Téléphone</div>
          <div class="value"><a href="tel:${safeTelephone}">${safeTelephone}</a></div>
        </div>
        <div class="field">
          <div class="label">Type de projet</div>
          <div class="value"><span class="badge">${projectTypeLabels[data.typeProjet] || data.typeProjet}</span></div>
        </div>
        ${data.message ? `
        <div class="field">
          <div class="label">Message</div>
          <div class="value">${safeMessage}</div>
        </div>
        ` : ''}
        <div class="field">
          <div class="label">Consentement marketing</div>
          <div class="value">${data.marketing ? '✅ Accepté — à inscrire dans la liste marketing' : '❌ Non accepté — confirmation simple uniquement'}</div>
        </div>
        <div class="field">
          <div class="label">Date de la demande</div>
          <div class="value">${new Date().toLocaleString('fr-FR', { timeZone: 'Europe/Paris' })}</div>
        </div>
        <a href="tel:${safeTelephone}" class="cta">📞 Appeler maintenant</a>
      </div>
      <div class="footer">
        Renoted • Mandataire local Effy Hauts-de-France • contact@renoted.fr
      </div>
    </div>
    </body>
    </html>
  `

  const teddyEmail = process.env.TEDDY_EMAIL || 'contact@renoted.fr'
  return sendEmail(teddyEmail, `🔔 Nouveau lead : ${data.prenom} ${data.nom} — ${projectTypeLabels[data.typeProjet] || data.typeProjet}`, html)
}

export async function sendConfirmationEmail(data: ContactFormData): Promise<boolean> {
  const safePrenom = escapeHtml(data.prenom)

  const html = `
    <!DOCTYPE html>
    <html lang="fr">
    <head><meta charset="UTF-8"><style>
      body { font-family: Inter, Arial, sans-serif; background: #f8fafc; margin: 0; padding: 20px; }
      .container { max-width: 600px; margin: 0 auto; background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.07); }
      .header { background: linear-gradient(135deg, #0D7A3E, #1EB564); padding: 32px; color: white; text-align: center; }
      .header h1 { margin: 0; font-size: 26px; }
      .header p { margin: 8px 0 0; opacity: 0.9; font-size: 15px; }
      .body { padding: 32px; }
      .body h2 { color: #0F172A; font-size: 20px; margin-top: 0; }
      .body p { color: #475569; line-height: 1.7; }
      .highlight { background: #E8F8EF; border-left: 4px solid #1EB564; padding: 16px 20px; border-radius: 0 8px 8px 0; margin: 24px 0; }
      .highlight p { margin: 0; color: #0D7A3E; font-weight: 500; }
      .contact-box { background: #F8FAFC; border-radius: 8px; padding: 20px; margin: 24px 0; }
      .cta { display: block; text-align: center; background: #1EB564; color: white; text-decoration: none; padding: 16px 32px; border-radius: 8px; font-weight: 700; font-size: 16px; margin: 24px 0; }
      .footer { background: #F8FAFC; padding: 20px 32px; font-size: 13px; color: #94A3B8; text-align: center; border-top: 1px solid #E2E8F0; }
      strong { color: #0F172A; }
    </style></head>
    <body>
    <div class="container">
      <div class="header">
        <h1>✅ Demande reçue !</h1>
        <p>Bonjour ${safePrenom}, nous avons bien reçu votre demande</p>
      </div>
      <div class="body">
        <h2>Merci pour votre confiance, ${safePrenom} !</h2>
        <p>Votre demande d'étude pour <strong>${projectTypeLabels[data.typeProjet] || 'votre projet'}</strong> a bien été enregistrée.</p>
        
        <div class="highlight">
          <p>🕐 Teddy Lecomte vous contactera dans les <strong>24 heures</strong> pour analyser votre situation et vous présenter les aides auxquelles vous avez droit.</p>
        </div>

        <p>En attendant, sachez que plusieurs aides peuvent réduire le coût de vos travaux de rénovation énergétique en 2026. Selon votre situation, vous pouvez prétendre à :</p>
        <ul style="color: #475569; line-height: 2;">
          <li>🏠 <strong>MaPrimeRénov'</strong> — montant selon vos revenus, votre logement et vos travaux</li>
          <li>⚡ <strong>CEE (Certificats d'Économie d'Énergie)</strong> — prime complémentaire</li>
          <li>💳 <strong>Éco-PTZ</strong> — prêt à 0% jusqu'à 50 000€</li>
          <li>🔖 <strong>TVA réduite à 5,5%</strong> sur les travaux</li>
        </ul>

        <div class="contact-box">
          <p style="margin: 0 0 8px; font-weight: 600; color: #0F172A;">Une question ? Contactez Teddy directement :</p>
          <p style="margin: 0; color: #475569;">📞 <a href="tel:+33624291096" style="color: #1EB564; font-weight: 600;">06.24.29.10.96</a> — Lun-Ven 9h-20h | Sam 9h-12h</p>
          <p style="margin: 4px 0 0; color: #475569;">✉️ <a href="mailto:contact@renoted.fr" style="color: #1EB564;">contact@renoted.fr</a></p>
        </div>

        <a href="tel:+33624291096" class="cta">📞 Appeler Teddy maintenant</a>
      </div>
      <div class="footer">
        <p><strong>Renoted</strong> — Mandataire local Effy Hauts-de-France</p>
        <p>Cet email a été envoyé suite à votre demande sur renoted.fr.<br>
        Si vous n'êtes pas à l'origine de cette demande, ignorez cet email.</p>
      </div>
    </div>
    </body>
    </html>
  `

  return sendEmail(
    data.email,
    `✅ Renoted — Votre demande d'étude a bien été reçue, ${data.prenom} !`,
    html
  )
}

export async function sendWelcomeMarketingEmail(data: ContactFormData): Promise<boolean> {
  const safePrenom = escapeHtml(data.prenom)

  const html = `
    <!DOCTYPE html>
    <html lang="fr">
    <head><meta charset="UTF-8"><style>
      body { font-family: Inter, Arial, sans-serif; background: #f8fafc; margin: 0; padding: 20px; }
      .container { max-width: 600px; margin: 0 auto; background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.07); }
      .header { background: linear-gradient(135deg, #0D7A3E, #1EB564); padding: 32px; color: white; text-align: center; }
      .body { padding: 32px; }
      .body p { color: #475569; line-height: 1.7; }
      .footer { background: #F8FAFC; padding: 20px 32px; font-size: 12px; color: #94A3B8; text-align: center; }
      .unsubscribe { color: #94A3B8; text-decoration: underline; }
    </style></head>
    <body>
    <div class="container">
      <div class="header">
        <h1>🎉 Bienvenue chez Renoted, ${safePrenom} !</h1>
      </div>
      <div class="body">
        <p>Merci de rejoindre la communauté Renoted ! En tant que mandataire officiel Effy en Hauts-de-France, je suis là pour vous accompagner dans tous vos projets de rénovation énergétique.</p>
        <p>Vous recevrez régulièrement des informations sur :</p>
        <ul style="color: #475569; line-height: 2;">
          <li>📰 Les nouvelles aides disponibles en 2026</li>
          <li>💡 Conseils pratiques pour réduire votre facture d'énergie</li>
          <li>🏡 Témoignages de familles qui ont réalisé leurs travaux</li>
          <li>🎁 Offres et promotions exclusives partenaires</li>
        </ul>
        <p>À très vite,<br><strong>Teddy Lecomte</strong><br>Mandataire local Effy — Hauts-de-France</p>
      </div>
      <div class="footer">
        <p>Renoted • Mandataire Effy Hauts-de-France</p>
        <p>Vous recevez cet email car vous avez coché la case "Recevoir des informations" sur renoted.fr.<br>
        <a href="mailto:contact@renoted.fr?subject=Désabonnement" class="unsubscribe">Se désabonner</a></p>
      </div>
    </div>
    </body>
    </html>
  `

  return sendEmail(
    data.email,
    '🎉 Bienvenue chez Renoted — Votre expert rénovation en Hauts-de-France',
    html
  )
}
