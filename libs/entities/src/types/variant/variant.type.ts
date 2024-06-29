import { z } from 'zod';
import { baseSchema, TBaseResponse } from '../common';

export const variantProductSchema = z.object({
  id: z.string(),
  name: z.string(),
  options: z.array(z.object({ id: z.string(), name: z.string() })),
});

export const variantOptionSchema = z.object({
  id: z.string(),
  name: z.string(),
  options: z
    .array(
      z.object({
        id: z.string(),
        name: z.string(),
        amount: z.number().nullable().optional(),
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
      })
    )
    .optional(),
  ...baseSchema.omit({ id: true }).shape,
});

export const variantOptionCreateSchema = z.object({
  name: z.string(),
  options: z.array(
    z.object({
      name: z.string(),
      ingredientId: z.string(),
      unitTypeId: z.string(),
      amount: z.number(),
    })
  ),
});

export const variantOptionUpdateSchema = z.object({
  id: z.string(),
  name: z.string().optional(),
  options: z.array(
    z.object({
      name: z.string(),
      ingredientId: z.string(),
      unitTypeId: z.string(),
      amount: z.number(),
    })
  ),
});

export type TVariantProduct = z.infer<typeof variantProductSchema>;
export type TVariantOption = z.infer<typeof variantOptionSchema>;
export type TVariantOptionSingleResponse = TBaseResponse<TVariantOption>;
export type TVariantOptionResponse = TBaseResponse<
  Omit<TVariantOption, 'options'>[]
>;
export type TVariantOptionCreateRequest = z.infer<
  typeof variantOptionCreateSchema
>;
export type TVariantOptionUpdateRequest = z.infer<
  typeof variantOptionUpdateSchema
>;
