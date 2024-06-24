import * as schema from '../schemas';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { faker } = require('@faker-js/faker');
import { config } from 'dotenv';
config();

export const seedPayment = async (db: any) => {
  try {
    const data = await db
      .select({ id: schema.payments.id })
      .from(schema.payments);

    if (data.length > 0) {
      return;
    }
    const paymentOptions = [];

    for (let i = 0; i < 10; i++) {
      paymentOptions.push({
        name: `Payment ${i + 1}`,
        accountName: faker.finance.accountName(),
        accountNumber: faker.finance.accountNumber(),
      });
    }

    console.log('Seeding payment... 🚀');

    await db.insert(schema.payments).values(paymentOptions);

    console.log('Seeding payment done! 🎊');
  } catch (error) {
    console.error('Error seeding payment:', error);
  }
};
