import { baseSchema, TBaseResponse } from '../common';

import { z } from 'zod';

export const productCategorySchema = z.object({
  name: z.string(),
  ...baseSchema.shape,
});

export const productCategoryCreateSchema = z.object({
  name: z.string(),
});

export const productCategoryUpdateSchema = z.object({
  id: z.string(),
  name: z.string(),
});

export type TProductCategory = z.infer<typeof productCategorySchema>;
export type TProductCategoryCreateRequest = z.infer<
  typeof productCategoryCreateSchema
>;
export type TProductCategoryUpdateRequest = z.infer<
  typeof productCategoryUpdateSchema
>;
export type TProductCategorySingleResponse = TBaseResponse<TProductCategory>;
export type TProductCategoryResponse = TBaseResponse<TProductCategory[]>;
