import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from '../schemas';
import { eq } from 'drizzle-orm';
import { config } from 'dotenv';
config();

export const seedProduct = async <T extends Record<string, unknown>>(
  db: NodePgDatabase<T>
) => {
  try {
    const products = await db
      .select({ id: schema.products.id })
      .from(schema.products);

    if (products.length > 0) {
      return;
    }

    console.log('Seeding product... 🚀');

    await db.transaction(async (tx) => {
      const [variantOptions, productCategory] = await Promise.all([
        tx
          .select({
            id: schema.variantOptions.id,
          })
          .from(schema.variantOptions),
        tx
          .select({
            id: schema.productCategories.id,
          })
          .from(schema.productCategories)
          .where(eq(schema.productCategories.name, 'Coffee')),
      ]);

      const [createLatte, createCoffeeMilk] = await Promise.all([
        tx
          .insert(schema.products)
          .values([
            {
              name: 'Latte',
              productCategoryId: productCategory[0].id,
              priceSelling: 15000,
              image:
                'https://coffeeaffection.com/wp-content/uploads/2021/05/Spanish-latte-milk-and-espresso-500x375.jpg',
              description:
                'Creamy and sweet with plenty of bold espresso, the Spanish latte is a delicious twist on a classic latte. You don’t need any special equipment or ingredients to make this satisfying drink!',
            },
          ])
          .returning({ id: schema.products.id })
          .then((data) => data[0]),
        tx
          .insert(schema.products)
          .values([
            {
              name: 'Coffee Milk',
              productCategoryId: productCategory[0].id,
              priceSelling: 10000,
              image:
                'https://sleepyowl.co/cdn/shop/files/YHF02067_7-min_e5b148de-a62d-460d-99c2-6fe83013965e.jpg?v=1656418725',
              description:
                'Coffee Milk is an Ocean State staple. Made with a sweet coffee flavored syrup and milk',
            },
          ])
          .returning({ id: schema.products.id })
          .then((data) => data[0]),
      ]);
      const variantLatte = variantOptions.map((el) => {
        return {
          productId: createLatte.id,
          variantOptionId: el.id,
        };
      });

      const variantCoffeeMilk = variantOptions.map((el) => {
        return {
          productId: createCoffeeMilk.id,
          variantOptionId: el.id,
        };
      });

      await tx
        .insert(schema.productVariants)
        .values([...variantLatte, ...variantCoffeeMilk]);
    });

    console.log('Seeding product done! 🎊');
  } catch (error) {
    console.error('Error seeding product:', error);
  }
};
