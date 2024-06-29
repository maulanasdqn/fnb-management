import { db, recipeIngredients, recipes } from '@fms/drizzle';
import {
  TRecipe,
  TRecipeCreateRequest,
  TRecipeUpdateRequest,
  TRecipeResponse,
  TRecipeSingleResponse,
  TQueryParams,
} from '@fms/entities';
import { ilike, asc, eq } from 'drizzle-orm';

export const recipeService = {
  pagination: async (params?: TQueryParams): Promise<TRecipeResponse> => {
    const page = params?.page || 1;
    const perPage = params?.perPage || 10;
    const offset = (page - 1) * perPage;

    const data = await db
      .select({
        id: recipes.id,
        name: recipes.name,
        description: recipes.description,
        createdAt: recipes.createdAt,
        updatedAt: recipes.updatedAt,
      })
      .from(recipes)
      .where(ilike(recipes.name, `%${params?.search || ''}%`))
      .limit(perPage)
      .offset(params?.search ? 0 : offset)
      .orderBy(asc(recipes.name));

    const count = await db
      .select({ id: recipes.id })
      .from(recipes)
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
  detail: async (id: string): Promise<TRecipeSingleResponse> => {
    const data = await db.query.recipes.findFirst({
      where: eq(recipes.id, id),
      with: {
        recipeIngredients: {
          columns: {
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
      throw new Error('Recipe not found');
    }

    return {
      data: {
        id: data.id,
        name: data.name,
        description: data.description,
        details: data.recipeIngredients?.map((el) => ({
          amount: el.amount,
          unitType: el.unitType,
          ingredient: el.ingredient,
        })),
      },
    };
  },

  create: async (
    data: TRecipeCreateRequest
  ): Promise<{
    message: string;
  }> => {
    await db.transaction(async (tx) => {
      const createRecipe = await tx
        .insert(recipes)
        .values({
          name: data.name,
          description: data.description,
        })
        .returning({
          id: recipes.id,
        })
        .then((data) => data[0]);

      for (const detail of data.details) {
        await tx.insert(recipeIngredients).values({
          amount: detail.amount,
          unitTypeId: detail.unitTypeId,
          ingredientId: detail.ingredientId,
          recipeId: createRecipe.id,
        });
      }
    });
    return {
      message: 'Create Recipe Success',
    };
  },

  update: async (
    data: TRecipeUpdateRequest
  ): Promise<{
    message: string;
  }> => {
    await db.transaction(async (tx) => {
      if (data?.name || data?.description) {
        await tx
          .update(recipes)
          .set({ name: data.name, description: data.description })
          .where(eq(recipes.id, data.id));
      }
      if (data?.details) {
        await tx
          .delete(recipeIngredients)
          .where(eq(recipeIngredients.recipeId, data.id));

        for (const detail of data.details) {
          await tx.insert(recipeIngredients).values({
            unitTypeId: detail.unitTypeId,
            ingredientId: detail.ingredientId,
            recipeId: data.id,
            amount: detail.amount,
          });
        }
      }
    });

    return {
      message: 'Update Recipe Success',
    };
  },

  delete: async (
    id: string
  ): Promise<{
    message: string;
  }> => {
    await db.delete(recipes).where(eq(recipes.id, id));

    return {
      message: 'Delete Recipe Success',
    };
  },
  findAllWithSearch: async (search?: string): Promise<TRecipe[]> => {
    return await db
      .select({
        id: recipes.id,
        name: recipes.name,
        description: recipes.description,
        createdAt: recipes.createdAt,
        updatedAt: recipes.updatedAt,
      })
      .from(recipes)
      .where(ilike(recipes.name, `%${search?.search || ''}%`))
      .orderBy(asc(recipes.name));
  },
};
