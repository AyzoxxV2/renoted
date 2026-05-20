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
async function sendEmail(
  to: string,
  subject: string,
  html: string,
  replyTo?: string
): Promise<boolean> {
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
        reply_to: replyTo,
        subject,
        html,
      }),
    })

    if (!response.ok) {
      const errorBody = await response.text().catch(() => 'Impossible de lire la réponse Resend')
      console.error('Erreur Resend:', {
        status: response.status,
        to,
        from: fromEmail,
        subject,
        body: errorBody,
      })
      return false
    }

    return true
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
  const projectLabel = projectTypeLabels[data.typeProjet] || data.typeProjet
  const requestDate = new Date().toLocaleString('fr-FR', { timeZone: 'Europe/Paris' })
  const sourcePath = data.sourcePath ? escapeHtml(data.sourcePath) : 'Page non renseignée'

  const html = `
    <!DOCTYPE html>
    <html lang="fr">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Nouveau lead Renoted</title>
    </head>
    <body style="margin:0; padding:0; background:#f3f6f5; font-family:Arial, Helvetica, sans-serif; color:#0f172a;">
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f3f6f5; padding:24px 12px;">
        <tr>
          <td align="center">
            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:680px; background:#ffffff; border:1px solid #d9e4dd; border-radius:14px; overflow:hidden;">
              <tr>
                <td style="background:#0d7a3e; padding:26px 28px;">
                  <p style="margin:0 0 8px; color:#b9f6d2; font-size:13px; font-weight:700; text-transform:uppercase; letter-spacing:.08em;">Nouveau lead Renoted</p>
                  <h1 style="margin:0; color:#ffffff; font-size:26px; line-height:1.2;">${safePrenom} ${safeNom}</h1>
                  <p style="margin:10px 0 0; color:#e6fff0; font-size:15px;">Demande d'étude gratuite reçue le ${requestDate}</p>
                </td>
              </tr>
              <tr>
                <td style="padding:24px 28px 8px;">
                  <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                    <tr>
                      <td style="padding:0 0 12px;">
                        <span style="display:inline-block; background:#e8f8ef; color:#0d7a3e; border:1px solid #bdeccd; border-radius:999px; padding:8px 12px; font-size:14px; font-weight:700;">${projectLabel}</span>
                      </td>
                    </tr>
                    <tr>
                      <td style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:12px; padding:18px;">
                        <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                          <tr>
                            <td style="padding:0 0 14px;">
                              <p style="margin:0 0 4px; color:#64748b; font-size:12px; font-weight:700; text-transform:uppercase;">Téléphone</p>
                              <a href="tel:${safeTelephone}" style="color:#0f172a; font-size:22px; font-weight:800; text-decoration:none;">${safeTelephone}</a>
                            </td>
                          </tr>
                          <tr>
                            <td style="padding:0;">
                              <p style="margin:0 0 4px; color:#64748b; font-size:12px; font-weight:700; text-transform:uppercase;">Email</p>
                              <a href="mailto:${safeEmail}" style="color:#0d7a3e; font-size:17px; font-weight:700; text-decoration:underline;">${safeEmail}</a>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
              <tr>
                <td style="padding:12px 28px;">
                  <table role="presentation" cellspacing="0" cellpadding="0">
                    <tr>
                      <td style="padding:0 10px 10px 0;">
                        <a href="tel:${safeTelephone}" style="display:inline-block; background:#1eb564; color:#ffffff; font-size:15px; font-weight:800; text-decoration:none; padding:13px 18px; border-radius:9px;">Appeler le prospect</a>
                      </td>
                      <td style="padding:0 0 10px;">
                        <a href="mailto:${safeEmail}?subject=Votre demande d'étude Renoted" style="display:inline-block; background:#ffffff; color:#0d7a3e; border:1px solid #0d7a3e; font-size:15px; font-weight:800; text-decoration:none; padding:12px 18px; border-radius:9px;">Répondre par email</a>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
              ${data.message ? `
              <tr>
                <td style="padding:4px 28px 16px;">
                  <p style="margin:0 0 8px; color:#64748b; font-size:12px; font-weight:700; text-transform:uppercase;">Message du prospect</p>
                  <div style="background:#fffaf0; border:1px solid #f6d488; border-left:5px solid #eab308; border-radius:10px; padding:16px; color:#1f2937; font-size:16px; line-height:1.55;">${safeMessage}</div>
                </td>
              </tr>
              ` : ''}
              <tr>
                <td style="padding:4px 28px 24px;">
                  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse; border:1px solid #e2e8f0; border-radius:10px; overflow:hidden;">
                    <tr>
                      <td style="background:#f8fafc; color:#64748b; padding:12px 14px; font-size:13px; font-weight:700; width:42%;">Nom complet</td>
                      <td style="padding:12px 14px; font-size:14px; font-weight:700;">${safePrenom} ${safeNom}</td>
                    </tr>
                    <tr>
                      <td style="background:#f8fafc; color:#64748b; padding:12px 14px; font-size:13px; font-weight:700;">Projet</td>
                      <td style="padding:12px 14px; font-size:14px;">${projectLabel}</td>
                    </tr>
                    <tr>
                      <td style="background:#f8fafc; color:#64748b; padding:12px 14px; font-size:13px; font-weight:700;">Marketing</td>
                      <td style="padding:12px 14px; font-size:14px;">${data.marketing ? 'Accepté' : 'Refusé'}</td>
                    </tr>
                    <tr>
                      <td style="background:#f8fafc; color:#64748b; padding:12px 14px; font-size:13px; font-weight:700;">Page source</td>
                      <td style="padding:12px 14px; font-size:14px;">${sourcePath}</td>
                    </tr>
                  </table>
                </td>
              </tr>
              <tr>
                <td style="background:#f8fafc; border-top:1px solid #e2e8f0; padding:18px 28px; color:#64748b; font-size:13px; line-height:1.5;">
                  Renoted - Mandataire local Effy Hauts-de-France<br>
                  Email automatique envoyé depuis le formulaire de contact de renoted.fr.
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `

  const teddyEmail = process.env.TEDDY_EMAIL || 'contact@renoted.fr'
  return sendEmail(teddyEmail, `Nouveau lead Renoted : ${data.prenom} ${data.nom} - ${projectLabel}`, html, data.email)
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
