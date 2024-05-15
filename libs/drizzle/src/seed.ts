import { seedPermission } from './seeders/permission.seeder';

async function main() {
  try {
    await seedPermission();
  } catch (error) {
    console.error(error);
  }
}

main();
