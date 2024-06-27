import {
  db,
  ingredients,
  stockOpnames,
  unitTypes,
  variantOptions,
  variants,
} from '@fms/drizzle';
import { asc, eq, ilike } from 'drizzle-orm';
import {
  TQueryParams,
  TStockOpnameCreateRequest,
  TStockOpnameResponse,
  TStockOpnameSingleResponse,
  TStockOpnameUpdateRequest,
} from '@fms/entities';

export const stockOpenameService = {
  pagination: async (params: TQueryParams): Promise<TStockOpnameResponse> => {
    const page = params?.page || 1;
    const perPage = params?.perPage || 10;
    const offset = (page - 1) * perPage;

    const data = await db
      .select({
        id: stockOpnames.id,
        ingredient: {
          id: ingredients.id,
          name: ingredients.name,
        },
        unitType: {
          id: unitTypes.id,
          name: unitTypes.name,
        },
        amount: stockOpnames.amount,
        createdAt: stockOpnames.createdAt,
        updatedAt: stockOpnames.updatedAt,
      })
      .from(stockOpnames)
      .where(ilike(ingredients.name, `%${params?.search || ''}%`))
      .leftJoin(ingredients, eq(ingredients.id, stockOpnames.ingredientId))
      .leftJoin(unitTypes, eq(unitTypes.id, stockOpnames.unitTypeId))
      .limit(perPage)
      .offset(params?.search ? 0 : offset)
      .orderBy(asc(ingredients.name));

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
  detail: async (id: string): Promise<TStockOpnameSingleResponse> => {
    const data = await db.query.stockOpnames.findFirst({
      where: eq(stockOpnames.id, id),
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
    });

    if (!data) {
      throw new Error('Stock Opname not found');
    }

    return {
      data,
    };
  },
  create: async (
    data: TStockOpnameCreateRequest
  ): Promise<{
    message: string;
  }> => {
    await db
      .insert(stockOpnames)
      .values({
        ingredientId: data.ingredientId,
        unitTypeId: data.unitTypeId,
        amount: data.amount,
      })
      .returning();

    return {
      message: 'Create stock opname Success',
    };
  },
  update: async (
    data: TStockOpnameUpdateRequest
  ): Promise<{
    message: string;
  }> => {
    await db
      .update(stockOpnames)
      .set({
        ingredientId: data.ingredientId,
        unitTypeId: data.unitTypeId,
        amount: data.amount,
      })
      .where(eq(stockOpnames.id, data.id));

    return {
      message: 'Update stock opname Success',
    };
  },
  delete: async (
    id: string
  ): Promise<{
    message: string;
  }> => {
    await db.delete(variants).where(eq(variants.id, id));
    return {
      message: 'Delete stock opname Success',
    };
  },
};
