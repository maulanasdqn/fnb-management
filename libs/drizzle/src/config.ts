import { defineConfig } from "drizzle-kit";

export default defineConfig( {
  schema: './libs/drizzle/src/schemas/*',
  out: './libs/drizzle/src/migrations',
  dialect: "postgresql",
  dbCredentials: {
    url: process.env['DATABASE_URL'] as string,
  },
});
