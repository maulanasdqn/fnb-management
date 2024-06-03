import * as schema from '../schemas';
import { config } from 'dotenv';
config();

export const seedProductCategory = async (db: any) => {
  try {
    const productCategories = await db
      .select({ id: schema.productCategories.id })
      .from(schema.productCategories);

    if (productCategories.length > 0) {
      return;
    }
    const drinkCategories = [
      { name: 'Coffee' },
      { name: 'Tea' },
      { name: 'Cold Beverages' },
      { name: 'Hot Beverages' },
      { name: 'Juices and Smoothies' },
      { name: 'Alcoholic Beverages' },
      { name: 'Non-Alcoholic Beverages' },
    ];
    console.log('Seeding product category... 🚀');

    await db.insert(schema.productCategories).values(drinkCategories);

    console.log('Seeding product category done! 🎊');
  } catch (error) {
    console.error('Error seeding product category:', error);
  }
};
