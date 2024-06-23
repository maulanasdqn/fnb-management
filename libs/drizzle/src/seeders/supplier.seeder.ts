import * as schema from '../schemas';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { faker } = require('@faker-js/faker');

export const seedSupplier = async (db: any) => {
  try {
    const data = await db
      .select({ id: schema.suppliers.id })
      .from(schema.suppliers);

    if (data.length > 0) {
      return;
    }

    const dummySupplier = [];

    for (let i = 0; i < 10; i++) {
      dummySupplier.push({
        fullName: faker.person.fullName(),
        address: faker.location.city(),
        phoneNumber: faker.phone.number(),
      });
    }

    console.log('Seeding supplier... 🚀');

    await db.insert(schema.suppliers).values(dummySupplier);

    console.log('Seeding supplier done! 🎊');
  } catch (error) {
    console.error('Error seeding supplier:', error);
  }
};
