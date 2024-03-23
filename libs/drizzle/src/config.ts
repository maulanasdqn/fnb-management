import type { Config } from 'drizzle-kit';

export default {
  schema: './libs/drizzle/src/schemas/*',
  out: './libs/drizzle/src/migrations',
  driver: 'pg',
  dbCredentials: {
    connectionString: process.env['DATABASE_URL'] as string,
  },
} satisfies Config;