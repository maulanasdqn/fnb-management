import {
  db,
  products,
  productVariants,
  variantOptions,
  variants,
} from '@fms/drizzle';
import { eq } from 'drizzle-orm';
import { TVariantOption } from '@fms/entities';
export const findVariantByProductId = async (
  id: string
): Promise<TVariantOption[]> => {
  const variantProduct = await db
    .select({
      id: variants.id,
      name: variants.name,
      option: {
        id: variantOptions.id,
        name: variantOptions.name,
      },
    })
    .from(variants)
    .leftJoin(variantOptions, eq(variantOptions.variantId, variants.id))
    .leftJoin(
      productVariants,
      eq(productVariants.variantOptionId, variantOptions.id)
    )
    .leftJoin(products, eq(products.id, productVariants.productId))
    .where(eq(productVariants.productId, id));

  return Object.values(
    variantProduct?.reduce((acc, { id, name, option }) => {
      if (!acc[name]) {
        acc[name] = { id, name, options: [] };
      }
      if (option) {
        acc[name].options.push(option);
      }
      return acc;
    }, {} as Record<string, TVariantOption>)
  );
};
