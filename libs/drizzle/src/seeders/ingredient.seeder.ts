import * as schema from '../schemas';
import { config } from 'dotenv';
config();
export const seedIngredient = async (db: any) => {
  try {
    const ingrdientExist = await db
      .select({ id: schema.ingredients.id })
      .from(schema.ingredients);

    if (ingrdientExist.length > 0) {
      return;
    }

    const unitTypes = await db
      .select({ id: schema.unitTypes.id, name: schema.unitTypes.name })
      .from(schema.unitTypes);

    const ingredients = [
      {
        name: 'Coffee Beans',
        price: 100000,
        amount: 5,
        unitTypeId: unitTypes.find(
          (unit: { id: string; name: string }) => unit.name === 'Kilogram'
        )?.id,
      },
      {
        name: 'Milk',
        price: 50000,
        amount: 20,
        unitTypeId: unitTypes.find(
          (unit: { id: string; name: string }) => unit.name === 'Liter'
        )?.id,
      },
      {
        name: 'Sugar',
        price: 90000,
        amount: 15,
        unitTypeId: unitTypes.find(
          (unit: { id: string; name: string }) => unit.name === 'Kilogram'
        )?.id,
      },
      {
        name: 'Chocolate Syrup',
        price: 100000,
        amount: 5,
        unitTypeId: unitTypes.find(
          (unit: { id: string; name: string }) => unit.name === 'Liter'
        )?.id,
      },
      {
        name: 'Vanilla Syrup',
        price: 122300,
        amount: 5,
        unitTypeId: unitTypes.find(
          (unit: { id: string; name: string }) => unit.name === 'Liter'
        )?.id,
      },
      {
        name: 'Whipped Cream',
        price: 12430034,
        amount: 3,
        unitTypeId: unitTypes.find(
          (unit: { id: string; name: string }) => unit.name === 'Liter'
        )?.id,
      },
      {
        name: 'Espresso',
        price: 232045,
        amount: 2,
        unitTypeId: unitTypes.find(
          (unit: { id: string; name: string }) => unit.name === 'Kilogram'
        )?.id,
      },
      {
        name: 'Ice',
        price: 133004,
        amount: 50,
        unitTypeId: unitTypes.find(
          (unit: { id: string; name: string }) => unit.name === 'Kilogram'
        )?.id,
      },
    ];
    console.log('Seeding ingredient... 🚀');

    await db.insert(schema.ingredients).values(ingredients);

    console.log('Seeding ingredient done! 🎊');
  } catch (error) {
    console.error('Error seeding ingredient:', error);
  }
};
