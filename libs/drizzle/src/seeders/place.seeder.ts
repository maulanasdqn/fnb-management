import * as schema from '../schemas';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { faker } = require('@faker-js/faker');
import { config } from 'dotenv';
config();

export const seedPlace = async (db: any) => {
  try {
    const data = await db.select({ id: schema.places.id }).from(schema.places);

    if (data.length > 0) {
      return;
    }
    const placeOptions = [];

    for (let i = 0; i < 10; i++) {
      placeOptions.push({
        name: `Place ${i + 1}`,
      });
    }

    console.log('Seeding place... 🚀');

    await db.insert(schema.places).values(placeOptions);

    console.log('Seeding place done! 🎊');
  } catch (error) {
    console.error('Error seeding place:', error);
  }
};
