import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from '../schemas';
import { config } from 'dotenv';
config();
export const seedVariant = async <T extends Record<string, unknown>>(
  db: NodePgDatabase<T>
) => {
  try {
    const variants = await db
      .select({ id: schema.variants.id })
      .from(schema.variants);

    if (variants.length > 0) {
      return;
    }

    console.log('Seeding variant... 🚀');

    await db.transaction(async (tx) => {
      const variantIce = await tx
        .insert(schema.variants)
        .values([{ name: 'Ice' }])
        .returning({ id: schema.variants.id })
        .then((data) => data[0]);

      await tx.insert(schema.variantOptions).values([
        {
          name: 'Less Ice',
          variantId: variantIce.id,
        },
        {
          name: 'Extra Ice',
          variantId: variantIce.id,
        },
      ]);

      const variantSugar = await tx
        .insert(schema.variants)
        .values({ name: 'Sugar' })
        .returning({ id: schema.variants.id })
        .then((data) => data[0]);

      await tx.insert(schema.variantOptions).values([
        {
          name: 'Less Sugar',
          variantId: variantIce.id,
        },
        {
          name: 'Extra Sugar',
          variantId: variantSugar.id,
        },
      ]);

      const variantSize = await tx
        .insert(schema.variants)
        .values({ name: 'Sugar' })
        .returning({ id: schema.variants.id })
        .then((data) => data[0]);

      await tx.insert(schema.variantOptions).values([
        {
          name: 'Medium',
          variantId: variantIce.id,
        },
        {
          name: 'Large',
          variantId: variantSize.id,
        },
      ]);
    });
    console.log('Seeding variant done! 🎊');
  } catch (error) {
    console.error('Error seeding variant:', error);
  }
};
