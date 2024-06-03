import { seedPermission } from './seeders/permission.seeder';
import { seedSuperAdmin } from './seeders/user.seeder';
import { Pool } from 'pg';
import * as schema from './schemas';
import { drizzle } from 'drizzle-orm/node-postgres';
import { seedProductCategory } from './seeders/product-category.seeder';
import { seedVariant } from './seeders/variant.seeder';
import { seedProduct } from './seeders/product.seeder';
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
    await seedProductCategory(db);
    await seedVariant<typeof schema>(db);
    await seedProduct<typeof schema>(db);
  } catch (error) {
    console.error(error);
  }
}

main();
