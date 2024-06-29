import { db, productVariants, variantOptions, variants } from '@fms/drizzle';
import { asc, eq, ilike, like } from 'drizzle-orm';
import {
  TQueryParams,
  TVariantOption,
  TVariantOptionCreateRequest,
  TVariantOptionResponse,
  TVariantOptionSingleResponse,
  TVariantOptionUpdateRequest,
  TVariantProduct,
} from '@fms/entities';

export const variantService = {
  findByProductId: async (id: string): Promise<TVariantProduct[]> => {
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

  pagination: async (params: TQueryParams): Promise<TVariantOptionResponse> => {
    const page = params?.page || 1;
    const perPage = params?.perPage || 10;
    const offset = (page - 1) * perPage;

    const data = await db
      .select()
      .from(variants)
      .where(ilike(variants.name, `%${params?.search || ''}%`))
      .limit(perPage)
      .offset(params?.search ? 0 : offset)
      .orderBy(asc(variants.name));

    const count = await db
      .select({ id: variants.id })
      .from(variants)
      .then((res) => res.length);

    const totalPage = Math.ceil(count / perPage);
    const nextPage = page < totalPage ? Number(page) + 1 : null;
    const prevPage = page > 1 ? Number(page - 1) : null;

    return {
      meta: {
        page,
        nextPage,
        prevPage,
        perPage,
        totalPage,
      },
      data,
    };
  },
  detail: async (id: string): Promise<TVariantOptionSingleResponse> => {
    const data = await db.query.variants.findFirst({
      where: eq(variants.id, id),
      with: {
        variantOptions: {
          columns: {
            id: true,
            name: true,
            amount: true,
          },
          with: {
            ingredient: {
              columns: {
                id: true,
                name: true,
              },
            },
            unitType: {
              columns: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
    });

    if (!data) {
      throw new Error('Variant not found');
    }

    return {
      data: {
        id: data.id,
        name: data.name,
        options: data.variantOptions,
      },
    };
  },
  create: async (
    data: TVariantOptionCreateRequest
  ): Promise<{
    message: string;
  }> => {
    await db.transaction(async (tx) => {
      const createVariant = await tx
        .insert(variants)
        .values({
          name: data.name,
        })
        .returning({
          id: variants.id,
        })
        .then((res) => res[0]);

      for await (const option of data.options) {
        await tx.insert(variantOptions).values({
          name: option.name,
          variantId: createVariant.id,
          ingredientId: option.ingredientId,
          unitTypeId: option.unitTypeId,
          amount: option.amount,
        });
      }
    });
    return {
      message: 'Create Variant Success',
    };
  },
  update: async (
    data: TVariantOptionUpdateRequest
  ): Promise<{
    message: string;
  }> => {
    await db.transaction(async (tx) => {
      if (data?.name) {
        await tx
          .update(variants)
          .set({ name: data.name })
          .where(eq(variants.id, data.id));
      }

      if (data?.options) {
        await tx
          .delete(variantOptions)
          .where(eq(variantOptions.variantId, data.id));

        for await (const option of data.options) {
          await tx.insert(variantOptions).values({
            name: option.name,
            variantId: data.id,
            ingredientId: option.ingredientId,
            unitTypeId: option.unitTypeId,
            amount: option.amount,
          });
        }
      }
    });

    return {
      message: 'Update Variant Success',
    };
  },
  delete: async (
    id: string
  ): Promise<{
    message: string;
  }> => {
    await db.delete(variants).where(eq(variants.id, id));
    return {
      message: 'Delete Variant Success',
    };
  },
  findAllWithSearch: async (search?: string): Promise<TVariantOption[]> => {
    const data = await db.query.variants.findMany({
      where: like(variants.name, `%${search || ''}%`),
      with: {
        variantOptions: {
          columns: {
            id: true,
            name: true,
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
