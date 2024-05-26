import { seedPermission } from './seeders/permission.seeder';
import { seedSuperAdmin } from './seeders/user.seeder';
import { Pool } from 'pg';
import * as schema from './schemas';
import { drizzle } from 'drizzle-orm/node-postgres';
const dbUrl = process.env['DATABASE_URL'] as string;
const dbQueryClient = new Pool({
  connectionString: dbUrl,
});

const db = drizzle(dbQueryClient, {
  schema,
});

async function main() {
  try {
    await seedPermission(db);
    await seedSuperAdmin(db);
  } catch (error) {
    console.error(error);
  }
}

main();
