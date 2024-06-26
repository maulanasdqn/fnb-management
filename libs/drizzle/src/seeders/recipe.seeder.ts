import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from '../schemas';
import { config } from 'dotenv';
config();
export const seedRecipe = async <T extends Record<string, unknown>>(
  db: NodePgDatabase<T>
) => {
  try {
    const datas = await db
      .select({ id: schema.recipes.id })
      .from(schema.recipes);

    if (datas.length > 0) {
      return;
    }

    const unitTypes = await db
      .select({ id: schema.unitTypes.id, name: schema.unitTypes.name })
      .from(schema.unitTypes);

    const ingredients = await db
      .select({ id: schema.ingredients.id, name: schema.ingredients.name })
      .from(schema.ingredients);

    const newRecipe = [
      {
        name: 'Espresso',
        description:
          'A strong coffee brewed by forcing hot water under pressure through finely ground coffee beans.',
        details: [
          {
            amount: 18,
            unitTypeId: unitTypes.find(
              (val: { id: string; name: string }) => val.name === 'Gram'
            )?.id,
            ingredientId: ingredients.find(
              (val: { id: string; name: string }) => val.name === 'Coffee Beans'
            )?.id,
          },
          {
            amount: 30,
            unitTypeId: unitTypes.find(
              (val: { id: string; name: string }) => val.name === 'Milliliter'
            )?.id,
            ingredientId: ingredients.find(
              (val: { id: string; name: string }) => val.name === 'Water'
            )?.id,
          },
        ],
      },
      {
        name: 'Latte',
        description: 'A coffee drink made with espresso and steamed milk.',
        details: [
          {
            amount: 18,
            unitTypeId: unitTypes.find(
              (val: { id: string; name: string }) => val.name === 'Gram'
            )?.id,
            ingredientId: ingredients.find(
              (val: { id: string; name: string }) => val.name === 'Coffee Beans'
            )?.id,
          },
          {
            amount: 200,
            unitTypeId: unitTypes.find(
              (val: { id: string; name: string }) => val.name === 'Milliliter'
            )?.id,
            ingredientId: ingredients.find(
              (val: { id: string; name: string }) => val.name === 'Milk'
            )?.id,
          },
        ],
      },
      {
        name: 'Mocha',
        description: 'A chocolate-flavored variant of a caffè latte.',
        details: [
          {
            amount: 18,
            unitTypeId: unitTypes.find(
              (val: { id: string; name: string }) => val.name === 'Gram'
            )?.id,
            ingredientId: ingredients.find(
              (val: { id: string; name: string }) => val.name === 'Coffee Beans'
            )?.id,
          },
          {
            amount: 200,
            unitTypeId: unitTypes.find(
              (val: { id: string; name: string }) => val.name === 'Milliliter'
            )?.id,
            ingredientId: ingredients.find(
              (val: { id: string; name: string }) => val.name === 'Milk'
            )?.id,
          },
          {
            amount: 30,
            unitTypeId: unitTypes.find(
              (val: { id: string; name: string }) => val.name === 'Milliliter'
            )?.id,
            ingredientId: ingredients.find(
              (val: { id: string; name: string }) =>
                val.name === 'Chocolate Syrup'
            )?.id,
          },
        ],
      },
    ];

    console.log('Seeding recipe... 🚀');

    await db.insert(schema.recipes).values(newRecipe);

    for (const recipe of newRecipe) {
      await db.transaction(async (tx) => {
        const createRecipe = await tx
          .insert(schema.recipes)
          .values({
            name: recipe.name,
            description: recipe.description,
          })
          .returning({
            id: schema.recipes.id,
          })
          .then((data) => data[0]);

        for (const detail of recipe.details) {
          await tx.insert(schema.recipeIngredients).values({
            amount: detail.amount,
            unitTypeId: detail.unitTypeId as string,
            ingredientId: detail.ingredientId as string,
            recipeId: createRecipe.id as string,
          });
        }
      });
    }

    console.log('Seeding recipe done! 🎊');
  } catch (error) {
    console.error('Error seeding recipe:', error);
  }
};
