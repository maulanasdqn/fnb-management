import { z } from 'zod';
import { baseSchema, TBaseResponse } from '../common';

export const ingredientLogSchema = z.object({
  ingredient: z.object({
    id: z.string(),
    name: z.string(),
  }),
  amountBefore: z.number(),
  amountAfter: z.number(),
  amountCurrent: z.number(),
  ...baseSchema.shape,
});

export type TIngredientLog = z.infer<typeof ingredientLogSchema>;
export type TIngredientLogSingleResponse = TBaseResponse<TIngredientLog>;
export type TIngredientLogResponse = TBaseResponse<TIngredientLog[]>;
