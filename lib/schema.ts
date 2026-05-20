import { z } from 'zod'

export const contactFormSchema = z.object({
  prenom: z
    .string()
    .min(2, 'Le prénom doit contenir au moins 2 caractères')
    .max(50, 'Le prénom est trop long'),
  nom: z
    .string()
    .min(2, 'Le nom doit contenir au moins 2 caractères')
    .max(50, 'Le nom est trop long'),
  email: z
    .string()
    .email("L'adresse email n'est pas valide"),
  telephone: z
    .string()
    .regex(
      /^(\+33|0033|0)[1-9]([0-9]{8})$/,
      'Le numéro de téléphone n\'est pas valide (format français)'
    ),
  typeProjet: z.enum([
    'isolation',
    'chauffage',
    'photovoltaique',
    'audit',
    'bilan_thermique',
    'renovation_globale',
    'renovation_generale',
    'autre',
  ], {
    errorMap: () => ({ message: 'Veuillez sélectionner un type de projet' }),
  }),
  message: z.string().max(1000, 'Le message est trop long (1000 caractères max)').optional(),
  website: z.string().max(0).optional(),
  sourcePath: z.string().max(200).optional(),
  rgpd: z.boolean().refine((val) => val === true, {
    message: 'Vous devez accepter les conditions pour envoyer votre demande',
  }),
  marketing: z.boolean().default(true),
})

export type ContactFormData = z.infer<typeof contactFormSchema>

export const contactApiSchema = contactFormSchema
