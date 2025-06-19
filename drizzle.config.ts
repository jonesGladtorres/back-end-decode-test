import 'dotenv/config'; // <-- A LINHA MAIS IMPORTANTE! Carrega o .env
import type { Config } from 'drizzle-kit';

// Validação para garantir que a variável de ambiente foi carregada
if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL is not set in the environment variables');
}

export default {
  schema: './src/infrastructure/database/schema.ts',
  out: './drizzle/migrations',
  dialect: 'postgresql', // Especifica o dialeto explicitamente
  dbCredentials: {
    // Usa a variável carregada do .env
    url: process.env.DATABASE_URL,
  },
} satisfies Config;
