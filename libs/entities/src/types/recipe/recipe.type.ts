import { z } from 'zod';
import { baseSchema, TBaseResponse } from '../common';

export const recipeIngredientSchema = z.object({
  amount: z.number(),
  unitType: z.object({
    id: z.string(),
    name: z.string(),
  }),
  ingredient: z.object({
    id: z.string(),
    name: z.string(),
  }),
});

export const recipeSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  details: z.array(recipeIngredientSchema).optional(),
  ...baseSchema.omit({ id: true }).shape,
});

export const recipeCreateSchema = z.object({
  name: z.string(),
  description: z.string().optional(),
  details: z.array(
    z.object({
      amount: z.number(),
      unitTypeId: z.string(),
      ingredientId: z.string(),
    })
  ),
});

export const recipeUpdateSchema = z.object({
  id: z.string(),
  name: z.string().optional(),
  description: z.string().optional(),
  details: z
    .array(
      z.object({
        amount: z.number().optional(),
        unitTypeId: z.string().optional(),
        ingredientId: z.string().optional(),
      })
    )
    .optional(),
});

export type TRecipe = z.infer<typeof recipeSchema>;
export type TRecipeCreateRequest = z.infer<typeof recipeCreateSchema>;
export type TRecipeUpdateRequest = z.infer<typeof recipeUpdateSchema>;
export type TRecipeResponse = TBaseResponse<TRecipe[]>;
export type TRecipeSingleResponse = TBaseResponse<TRecipe>;
