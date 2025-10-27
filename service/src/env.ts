import { z } from "zod"

const envSchema = z.object({
  DATABASE_URL: z.string().startsWith("postgres://", {
    message: "DATABASE_URL must be a valid Postgres URL"
  }),
})

export const env = envSchema.parse(process.env)