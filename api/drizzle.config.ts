import { env } from '@/env'
import { defineConfig } from 'drizzle-kit'


console.log('DB URL:', env.DATABASE_URL);
export default defineConfig({
  dialect: 'postgresql',
  dbCredentials: {
    url: env.DATABASE_URL,
  },
  out: './src/db/migrations',
  schema: './src/db/schema/index.ts',
  casing: 'snake_case',
})