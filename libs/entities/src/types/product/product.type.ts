import { baseSchema, TBaseResponse } from '../common';
import { z } from 'zod';
import { variantProductSchema } from '../variant';

export const productSchema = z.object({
  name: z.string(),
  priceSelling: z.number(),
  image: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  variants: z.array(variantProductSchema).optional().nullable(),
  category: z
    .object({
      id: z.string(),
      name: z.string(),
    })
    .optional()
    .nullable(),
  ingredients: z
    .array(
      z.object({
        id: z.string(),
        name: z.string(),
        amount: z.number(),
        unitType: z.object({
          id: z.string(),
          name: z.string(),
        }),
      })
    )
    .optional(),
  ...baseSchema.shape,
});

export const productCreateSchema = z.object({
  name: z.string(),
  priceSelling: z.number(),
  productCategoryId: z.string().optional(),
  image: z.string().nullable(),
  description: z.string().optional().nullable(),
  ingredientId: z.string().optional(),
  ...baseSchema.shape,
});

export const productUpdateSchema = z.object({
  name: z.string().optional(),
  priceSelling: z.number().optional(),
  productCategoryId: z.string().optional(),
  image: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  ingredientId: z.string().optional(),
  ...baseSchema.shape,
});

export type TProduct = z.infer<typeof productSchema>;
export type TProductSingleResponse = TBaseResponse<TProduct>;
export type TProductResponse = TBaseResponse<TProduct[]>;
export type TProductCreateRequest = z.infer<typeof productCreateSchema>;
export type TProductUpdateRequest = z.infer<typeof productUpdateSchema>;
