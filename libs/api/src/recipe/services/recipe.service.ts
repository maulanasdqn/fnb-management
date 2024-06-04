// import { db, recipes, recipeDetails as RD, items } from '@fms/drizzle';
// import {
//   TRecipe,
//   TRecipeDetail,
//   TRecipeQueryParams,
//   TRecipeCreateRequest,
//   TRecipeUpdateRequest,
//   TRecipeResponse,
//   TRecipeSingleResponse,
// } from '@fms/entities';
// import { ilike, asc, eq } from 'drizzle-orm';
// import { TRPCError } from '@trpc/server';

// export const findMany = async (
//   params?: TRecipeQueryParams
// ): Promise<TRecipeResponse> => {
//   const data = await db
//     .select({
//       id: recipes.id,
//       name: recipes.name,
//       variants: recipes.variants,
//       recipeAmount: RD.amount,
//       recipeDetailsId: RD.id,
//       itemId: items.id,
//       itemName: items.name,
//       itemPrice: items.price,
//       itemAmount: items.itemAmount,
//       itemAmountTypeId: items.itemAmountTypeId,
//       itemIngredientUnit: items.ingredientUnit,
//       itemIngredientAmount: items.ingredientAmount,
//     })
//     .from(recipes)
//     .fullJoin(RD, eq(recipes.id, RD.recipeId))
//     .fullJoin(items, eq(items.id, RD.itemId))
//     .where(ilike(recipes.name, `%${params?.search || ''}%`))
//     .orderBy(asc(recipes.name));

//   const response: TRecipe[] = data.reduce((acc, recipe) => {
//     if (!recipe.id || acc.map((d) => d.id).includes(recipe.id)) {
//       return acc;
//     }

//     const recipeDetails: TRecipeDetail[] = data
//       .filter((d) => d.id === recipe.id)
//       .map((d) => ({
//         id: d.recipeDetailsId as string,
//         amount: parseInt(d.recipeAmount as string),
//         item: {
//           id: d.itemId as string,
//           name: d.itemName as string,
//           price: d.itemPrice as number,
//           itemAmount: d.itemAmount as string,
//           ingredientAmount: d.itemIngredientUnit as string,
//           itemAmountTypeId: d.itemAmountTypeId as string,
//           ingredientUnit: d.itemIngredientUnit as string,
//         },
//       }));

//     acc.push({
//       id: recipe.id,
//       name: recipe.name as string,
//       variants: recipe.variants as string[],
//       recipeDetails: recipeDetails as TRecipeDetail[],
//     });
//     return acc;
//   }, [] as TRecipe[]);

//   return response as TRecipeResponse;
// };

// export const findOne = async (id: string): Promise<TRecipeSingleResponse> => {
//   const data = await db
//     .select({
//       id: recipes.id,
//       name: recipes.name,
//       variants: recipes.variants,
//       recipeAmount: RD.amount,
//       recipeDetailsId: RD.id,
//       itemId: items.id,
//       itemName: items.name,
//       itemPrice: items.price,
//       itemAmount: items.itemAmount,
//       itemAmountTypeId: items.itemAmountTypeId,
//       itemIngredientUnit: items.ingredientUnit,
//       itemIngredientAmount: items.ingredientAmount,
//     })
//     .from(recipes)
//     .fullJoin(RD, eq(recipes.id, RD.recipeId))
//     .fullJoin(items, eq(items.id, RD.itemId))
//     .where(eq(recipes.id, id))
//     .orderBy(asc(recipes.name));

//   const response: TRecipe[] = data.reduce((acc, recipe) => {
//     if (!recipe.id || acc.map((d) => d.id).includes(recipe.id)) {
//       return acc;
//     }

//     const recipeDetails: TRecipeDetail[] = data
//       .filter((d) => d.id === recipe.id)
//       .map((d) => ({
//         id: d.recipeDetailsId as string,
//         amount: parseInt(d.recipeAmount as string),
//         item: {
//           id: d.itemId as string,
//           name: d.itemName as string,
//           price: d.itemPrice as number,
//           itemAmount: d.itemAmount as string,
//           ingredientAmount: d.itemIngredientUnit as string,
//           itemAmountTypeId: d.itemAmountTypeId as string,
//           ingredientUnit: d.itemIngredientUnit as string,
//         },
//       }));

//     acc.push({
//       id: recipe.id,
//       name: recipe.name as string,
//       variants: recipe.variants as string[],
//       recipeDetails: recipeDetails as TRecipeDetail[],
//     });
//     return acc;
//   }, [] as TRecipe[]);

//   return response[0] as TRecipeSingleResponse;
// };

// export const create = async ({
//   name,
//   variants,
//   recipeDetails,
// }: TRecipeCreateRequest): Promise<TRecipeSingleResponse> => {
//   const returnData: TRecipeSingleResponse = await db.transaction(async (tx) => {
//     let responseData = {} as TRecipeSingleResponse;
//     const data = await tx
//       .insert(recipes)
//       .values({
//         name,
//         variants,
//       })
//       .returning();
//     responseData = {
//       ...data[0],
//       variants: data[0].variants ?? [],
//       recipeDetails: [],
//     };

//     if (!data[0].id) {
//       throw new TRPCError({
//         code: 'INTERNAL_SERVER_ERROR',
//         message: 'Failed to create recipe',
//       });
//     }

//     recipeDetails.forEach(async (d) => {
//       const item = await tx.select().from(items).where(eq(items.id, d.itemId));

//       if (!item) {
//         throw new TRPCError({
//           code: 'INTERNAL_SERVER_ERROR',
//           message: 'Failed to find item',
//         });
//       }

//       const detail = await tx
//         .insert(RD)
//         .values({
//           itemId: d.itemId,
//           amount: d.amount.toString(),
//           recipeId: data[0].id,
//         })
//         .returning();

//       responseData.recipeDetails.push({
//         id: detail[0].id,
//         amount: parseInt(detail[0].amount),
//         item: {
//           id: item[0].id,
//           name: item[0].name,
//           price: item[0].price,
//           itemAmount: item[0].itemAmount,
//           ingredientAmount: item[0].ingredientAmount,
//           itemAmountTypeId: item[0].itemAmountTypeId,
//           ingredientUnit: item[0].ingredientUnit,
//         },
//       });
//     });

//     return responseData as TRecipeSingleResponse;
//   });
//   return returnData as TRecipeSingleResponse;
// };

// export const update = async ({
//   id,
//   name,
//   variants,
//   recipeDetails,
// }: TRecipeUpdateRequest) => {
//   const returnData: TRecipeSingleResponse = await db.transaction(async (tx) => {
//     let responseData = {} as TRecipeSingleResponse;
//     const data = await tx
//       .update(recipes)
//       .set({
//         name,
//         variants,
//       })
//       .where(eq(recipes.id, id))
//       .returning();

//     if (!data[0].id) {
//       throw new TRPCError({
//         code: 'INTERNAL_SERVER_ERROR',
//         message: 'Failed to create recipe',
//       });
//     }

//     responseData = {
//       ...data[0],
//       variants: data[0].variants ?? [],
//       recipeDetails: [],
//     };

//     await tx.delete(RD).where(eq(RD.recipeId, id));

//     recipeDetails.forEach(async (d) => {
//       const item = await tx.select().from(items).where(eq(items.id, d.itemId));

//       if (!item) {
//         throw new TRPCError({
//           code: 'INTERNAL_SERVER_ERROR',
//           message: 'Failed to find item',
//         });
//       }

//       const detail = await tx
//         .insert(RD)
//         .values({
//           itemId: d.itemId,
//           amount: d.amount.toString(),
//           recipeId: id,
//         })
//         .returning();

//       returnData.recipeDetails.push({
//         id: detail[0].id,
//         amount: parseInt(detail[0].amount),
//         item: {
//           id: item[0].id,
//           name: item[0].name,
//           price: item[0].price,
//           itemAmount: item[0].itemAmount,
//           ingredientAmount: item[0].ingredientAmount,
//           itemAmountTypeId: item[0].itemAmountTypeId,
//           ingredientUnit: item[0].ingredientUnit,
//         },
//       });
//     });

//     return responseData as TRecipeSingleResponse;
//   });
//   return returnData as TRecipeSingleResponse;
// };

// export const destroy = async (id: string) => {
//   await db.delete(recipes).where(eq(recipes.id, id)).returning();
//   return {
//     message: 'Delete Recipe Success',
//   };
// };
