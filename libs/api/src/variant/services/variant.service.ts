import { db, productVariants } from '@fms/drizzle';
import { eq } from 'drizzle-orm';
import { TVariantOption } from '@fms/entities';

export const variantService = {
  findByProductId: async (id: string): Promise<TVariantOption[]> => {
    const data = await db.query.variants.findMany({
      columns: {
        id: true,
        name: true,
      },
      with: {
        variantOptions: {
          columns: {
            id: true,
            name: true,
          },
          with: {
            productVariants: {
              where: eq(productVariants.productId, id),
            },
          },
        },
      },
    });

    return data.map((el) => ({
      id: el.id,
      name: el.name,
      options: el.variantOptions.map((option) => ({
        id: option.id,
        name: option.name,
      })),
    }));
  },
};
