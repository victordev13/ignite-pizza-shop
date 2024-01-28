import { z } from 'zod'

const truthyValues = ['1', 'true']

const envSchema = z.object({
  VITE_API_URL: z.string().url(),
  VITE_API_USE_RESPONSE_DELAY: z
    .string()
    .transform((value) => truthyValues.includes(value)),
})

export const env = envSchema.parse(import.meta.env)
