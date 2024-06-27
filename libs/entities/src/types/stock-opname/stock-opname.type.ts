import { z } from 'zod';
import { baseSchema, TBaseResponse } from '../common';

export const stockOpnameSchema = z.object({
  id: z.string(),
  ingredient: z
    .object({
      id: z.string(),
      name: z.string(),
    })
    .nullable()
    .optional(),
  unitType: z
    .object({
      id: z.string(),
      name: z.string(),
    })
    .nullable()
    .optional(),
  amount: z.number(),
  ...baseSchema.omit({ id: true }).shape,
});

export const stockOpnameCreateSchema = z.object({
  ingredientId: z.string(),
  unitTypeId: z.string(),
  amount: z.number(),
});

export const stockOpnameUpdateSchema = z.object({
  id: z.string(),
  ingredientId: z.string().optional(),
  unitTypeId: z.string().optional(),
  amount: z.number().optional(),
});

export type TStockOpname = z.infer<typeof stockOpnameSchema>;
export type TStockOpnameCreateRequest = z.infer<typeof stockOpnameCreateSchema>;
export type TStockOpnameUpdateRequest = z.infer<typeof stockOpnameUpdateSchema>;
export type TStockOpnameSingleResponse = TBaseResponse<TStockOpname>;
export type TStockOpnameResponse = TBaseResponse<TStockOpname[]>;
