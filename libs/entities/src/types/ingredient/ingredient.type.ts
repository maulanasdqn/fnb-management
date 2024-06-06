import { z } from 'zod';
import { baseSchema, TBaseResponse } from '../common';
import { ingredientLogSchema } from './ingredient-log.type';

export const ingredientSchema = z.object({
  name: z.string(),
  price: z.number(),
  amount: z.number(),
  unitType: z.object({
    id: z.string(),
    name: z.string(),
  }),
  logs: z.array(ingredientLogSchema).optional(),
  ...baseSchema.shape,
});

export const ingredientCreateSchema = z.object({
  name: z.string(),
  price: z.number(),
  amount: z.number(),
  unitTypeId: z.string(),
});

export const ingredientUpdateSchema = z.object({
  id: z.string(),
  name: z.string().optional(),
  price: z.number().optional(),
  amount: z.number().optional(),
  unitTypeId: z.string().optional(),
});

export type TIngredient = z.infer<typeof ingredientSchema>;
export type TIngredientCreateRequest = z.infer<typeof ingredientCreateSchema>;
export type TIngredientUpdateRequest = z.infer<typeof ingredientUpdateSchema>;
export type TIngredientSingleResponse = TBaseResponse<TIngredient>;
export type TIngredientResponse = TBaseResponse<TIngredient[]>;
