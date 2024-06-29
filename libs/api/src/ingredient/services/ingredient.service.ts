import { db, ingredients, unitTypeConversions } from '@fms/drizzle';
import {
  TIngredient,
  TIngredientCreateRequest,
  TIngredientResponse,
  TIngredientSingleResponse,
  TIngredientUpdateRequest,
  TQueryParams,
} from '@fms/entities';
import { asc, eq, ilike } from 'drizzle-orm';

export const ingredientService = {
  findMany: async (params?: TQueryParams): Promise<TIngredientResponse> => {
    const page = params?.page || 1;
    const perPage = params?.perPage || 10;
    const offset = (page - 1) * perPage;

    const data = await db
      .select({
        id: ingredients.id,
        name: ingredients.name,
        price: ingredients.price,
        amount: ingredients.amount,
        createdAt: ingredients.createdAt,
        updatedAt: ingredients.updatedAt,
      })
      .from(ingredients)
      .where(ilike(ingredients.name, `%${params?.search || ''}%`))
      .limit(perPage)
      .offset(params?.search ? 0 : offset)
      .orderBy(asc(ingredients.name));

    const count = await db
      .select({ id: ingredients.id })
      .from(ingredients)
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
  findOne: async (id: string): Promise<TIngredientSingleResponse> => {
    const data = await db.query.ingredients.findFirst({
      where: eq(ingredients.id, id),
      columns: {
        id: true,
        name: true,
        price: true,
        amount: true,
        createdAt: true,
        updatedAt: true,
      },
      with: {
        unitType: {
          columns: {
            id: true,
            name: true,
          },
        },
      },
    });
    if (!data) {
      throw new Error('Ingredient not found');
    }

    const dataUnitConversions = await db.query.unitTypeConversions.findMany({
      columns: {
        id: true,
        conversionFactor: true,
      },
      with: {
        fromUnitType: {
          columns: {
            id: true,
            name: true,
          },
        },
        toUnitType: {
          columns: {
            id: true,
            name: true,
          },
        },
      },
    });

    const stockInBaseUnit = data.amount;
    const baseUnitName = data.unitType.name;

    const stock = { [baseUnitName]: stockInBaseUnit };

    for (const conversion of dataUnitConversions) {
      if (conversion.fromUnitType.name === data.unitType.name) {
        stock[conversion.toUnitType.name] =
          stockInBaseUnit * conversion.conversionFactor;
      } else if (conversion.toUnitType.name === data.unitType.name) {
        stock[conversion.fromUnitType.name] =
          stockInBaseUnit / conversion.conversionFactor;
      }
    }

    return {
      data: {
        id: data.id,
        name: data.name,
        price: data.price,
        amount: data.amount,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt,
        stock,
      },
    };
  },
  create: async (
    data: TIngredientCreateRequest
  ): Promise<{ message: string }> => {
    await db.insert(ingredients).values({
      name: data.name,
      price: data.price,
      amount: data.amount,
      unitTypeId: data.unitTypeId,
    });
    return {
      message: 'Create ingrdient Success',
    };
  },
  delete: async (id: string): Promise<{ message: string }> => {
    await db.delete(ingredients).where(eq(ingredients.id, id));
    return {
      message: 'Delete Ingredient Success',
    };
  },
  update: async (
    data: TIngredientUpdateRequest
  ): Promise<{ message: string }> => {
    await db.update(ingredients).set(data).where(eq(ingredients.id, data.id));
    return {
      message: 'Update Ingredient Success',
    };
  },
  findAllWithSearch: async (
    search?: string
  ): Promise<Omit<TIngredient, 'logs' | 'stock' | 'amount' | 'price'>[]> => {
    return await db
      .select({
        id: ingredients.id,
        name: ingredients.name,
        createdAt: ingredients.createdAt,
        updatedAt: ingredients.updatedAt,
      })
      .from(ingredients)
      .where(ilike(ingredients.name, `%${search?.search || ''}%`))
      .orderBy(asc(ingredients.name));
  },
};
