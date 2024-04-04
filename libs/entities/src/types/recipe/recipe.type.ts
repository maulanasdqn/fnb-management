import {
  recipeQueryParamSchema,
  recipeResponseSchema,
  recipeCreateRequestSchema,
  recipeUpdateRequestSchema
} from '../../validation-schemas/recipe/recipe.schema';
import { z } from 'zod';
export type TRecipe = z.infer<typeof recipeResponseSchema>;
export type TRecipeResponse = TRecipe[];
export type TRecipeSingleResponse = TRecipe;
export type TRecipeQueryParams = z.infer<typeof recipeQueryParamSchema>;
export type TRecipeCreateRequest = z.infer<typeof recipeCreateRequestSchema>;
export type TRecipeUpdateRequest = z.infer<typeof recipeUpdateRequestSchema>;
