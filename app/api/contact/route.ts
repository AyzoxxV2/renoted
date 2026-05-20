import { NextRequest, NextResponse } from 'next/server'
import { contactApiSchema } from '@/lib/schema'
import {
  sendLeadEmailToTeddy,
  sendConfirmationEmail,
  sendWelcomeMarketingEmail,
} from '@/lib/email'
import type { ContactFormData } from '@/lib/schema'

const rateLimitStore = new Map<string, { count: number; resetAt: number }>()
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000

function isRateLimited(request: NextRequest) {
  const forwarded = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
  const ip = forwarded || request.headers.get('x-real-ip') || 'local'
  const now = Date.now()
  const current = rateLimitStore.get(ip)
  const max = Number(process.env.CONTACT_RATE_LIMIT_MAX || 6)

  if (!current || current.resetAt < now) {
    rateLimitStore.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS })
    return false
  }

  current.count += 1
  return current.count > max
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

export async function POST(request: NextRequest) {
  try {
    if (isRateLimited(request)) {
      return NextResponse.json(
        {
          success: false,
          message:
            'Trop de demandes ont été envoyées depuis cette connexion. Veuillez réessayer plus tard ou appeler le 06.24.29.10.96.',
        },
        { status: 429 }
      )
    }

    const body = await request.json()

    // Validation Zod
    const parsed = contactApiSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json(
        {
          success: false,
          errors: parsed.error.flatten().fieldErrors,
          message: 'Les données du formulaire sont invalides.',
        },
        { status: 400 }
      )
    }

    const data = parsed.data

    if (data.website) {
      return NextResponse.json(
        {
          success: true,
          message: 'Merci, votre demande est bien prise en compte.',
        },
        { status: 200 }
      )
    }

    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json(
        {
          success: false,
          fallback: true,
          mailtoHref: createFallbackMailto(data),
          message:
            "L'envoi automatique des emails n'est pas encore configuré. Ouvrez l'email pré-rempli pour transmettre votre demande à Teddy.",
        },
        { status: 503 }
      )
    }

    // Envoi des emails en parallèle
    const emailPromises: Promise<boolean>[] = [
      sendLeadEmailToTeddy(data),
      sendConfirmationEmail(data),
    ]

    if (data.marketing) {
      emailPromises.push(sendWelcomeMarketingEmail(data))
    }

    const results = await Promise.allSettled(emailPromises)
    const allSucceeded = results.every(
      (r) => r.status === 'fulfilled' && r.value === true
    )

    if (!allSucceeded) {
      console.error('Certains emails n\'ont pas pu être envoyés:', results)
    }

    return NextResponse.json(
      {
        success: true,
        message: `Merci ${data.prenom} ! Votre demande a bien été envoyée. Teddy vous contactera dans les 24h.`,
        marketing: data.marketing,
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Erreur API contact:', error)
    return NextResponse.json(
      {
        success: false,
        message: 'Une erreur serveur est survenue. Veuillez réessayer ou appeler le 06.24.29.10.96.',
      },
      { status: 500 }
    )
  }
}
