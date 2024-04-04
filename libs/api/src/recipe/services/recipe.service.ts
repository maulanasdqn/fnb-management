import { db, recipes, recipeDetails, items } from '@fms/drizzle';
import {
  TRecipeQueryParams,
  TRecipeCreateRequest,
  TRecipeUpdateRequest,
  TRecipeResponse,
  TRecipeSingleResponse,
} from '@fms/entities';
import { ilike, asc, eq, desc } from 'drizzle-orm';

export const findMany = async (
  params?: TRecipeQueryParams
): Promise<TRecipeResponse> => {
  const data = await db
    .select({
      id: recipes.id,
      name: recipes.name,
      variants: recipes.variants,
      recipeAmount: recipeDetails.amount,
      recipeDetailsId: recipeDetails.id,
      itemId: items.id,
      itemName: items.name,
      itemPrice: items.price,
      itemAmount: items.itemAmount,
      itemAmountTypeId: items.itemAmountTypeId,
      itemIngredientUnit: items.ingredientUnit,
      itemIngredientAmount: items.ingredientAmount,
    })
    .from(recipes)
    .fullJoin(recipeDetails, eq(recipes.id, recipeDetails.recipeId))
    .fullJoin(items, eq(items.id, recipeDetails.itemId))
    .where(ilike(recipes.name, `%${params?.search || ''}%`))
    .orderBy(asc(recipes.name));
  const response = data.map((recipe) => {
    return {
      id: recipe.id,
      name: recipe.name,
      variants: recipe.variants,
      recipeDetails: data.filter((detail) => {
        if (detail.id === recipe.id) {
          return {
            amount: detail.recipeAmount,
            item: data.filter((item) => {
              if (item.recipeDetailsId === detail.recipeDetailsId) {
                return {
                  id: item.itemId,
                  name: item.itemName,
                  price: item.itemPrice,
                  amount: item.itemAmount,
                  amountTypeId: item.itemAmountTypeId,
                  ingredientUnit: item.itemIngredientUnit,
                  ingredientAmount: item.itemIngredientAmount,
                };
              }
            }),
          };
        }
      }),
    };
  });
  console.log(response);

  return [] as TRecipeResponse;
};

// export const findOne = async (id: string): Promise<TRecipeSingleResponse> => {
//   const data = await db
//     .select({
//       id: recipes.id,
//       name: recipes.name,
//       price: recipes.price,
//       recipeAmount: recipes.recipeAmount,
//       recipeAmountTypeId: recipes.recipeAmountTypeId,
//       ingredientUnit: recipes.ingredientUnit,
//       ingredientAmount: recipes.ingredientAmount,
//     })
//     .from(recipes)
//     .where(eq(recipes.id, id))
//     .then((data) => data?.at(0));
//   return data as TRecipeSingleResponse;
// };
//
// export const create = async ({
//   name,
//   price,
//   recipeAmount,
//   recipeAmountTypeId,
//   ingredientUnit,
//   quantity,
//   ingredientAmount,
// }: TRecipeCreateRequest): Promise<TRecipeSingleResponse> => {
//
//   const returnData: TRecipeSingleResponse = await db.transaction(
//     async (tx) => {
//       const data = await tx
//         .insert(recipes)
//         .values({
//           name,
//           price,
//           recipeAmount,
//           recipeAmountTypeId,
//           ingredientUnit,
//           ingredientAmount,
//         })
//         .returning();
//
//       if (!data[0].id) {
//         return data[0] as TRecipeSingleResponse;
//       }
//
//       await tx
//         .insert(recipeLogs)
//         .values({
//           recipeId: data[0].id,
//           qtyBefore: '0',
//           qtyCurrent: quantity ? quantity.toString() : '0',
//           qtyAfter: quantity ? quantity.toString() : '0',
//         })
//         .returning();
//
//       return data[0] as TRecipeSingleResponse;
//     }
//   )
//   return returnData as TRecipeSingleResponse;
// };
//
// export const update = async ({
//   id,
//   name,
//   price,
//   quantity,
//   recipeAmount,
//   recipeAmountTypeId,
//   ingredientUnit,
//   ingredientAmount,
// }: TRecipeUpdateRequest) => {
//   const returnData: TRecipeSingleResponse = await db.transaction(
//     async (tx) => {
//       const data = await tx
//         .update(recipes)
//         .set({
//           name,
//           price,
//           recipeAmount,
//           recipeAmountTypeId,
//           ingredientUnit,
//           ingredientAmount,
//         })
//         .where(eq(recipes.id, id))
//         .returning();
//
//       if (!data[0].id) {
//         return data[0] as TRecipeSingleResponse;
//       }
//
//       let qtyBefore = 0
//       let qtyAfter = quantity
//
//       const logs = await tx
//         .select({
//           qtyAfter: recipeLogs.qtyAfter,
//         })
//         .from(recipeLogs)
//         .where(eq(recipeLogs.recipeId, id))
//         .orderBy(desc(
//           recipeLogs.createdAt
//         ));
//
//       if (logs.length > 0) {
//         qtyBefore = Number(logs[0].qtyAfter);
//         qtyAfter = quantity
//           ? Number(logs[0].qtyAfter) + Number(quantity)
//           : Number(logs[0].qtyAfter);
//       }
//
//       if (quantity !== qtyBefore) {
//         await tx
//           .insert(recipeLogs)
//           .values({
//             recipeId: data[0].id,
//             qtyBefore: qtyBefore.toString(),
//             qtyCurrent: quantity ? quantity.toString() : '0',
//             qtyAfter: qtyAfter.toString(),
//           })
//           .returning();
//
//       }
//
//       return data[0] as TRecipeSingleResponse;
//     }
//   )
//   return returnData as TRecipeSingleResponse;
// };
//
// export const destroy = async (id: string) => {
//   const data = await db
//     .delete(recipes)
//     .where(eq(recipes.id, id))
//     .returning();
//   return data[0] as TRecipeSingleResponse;
// };
