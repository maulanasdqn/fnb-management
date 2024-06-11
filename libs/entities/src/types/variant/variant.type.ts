import { z } from 'zod';
import { TBaseResponse } from '../common';

export const variantOptionSchema = z.object({
  id: z.string(),
  name: z.string(),
  options: z.array(z.object({ id: z.string(), name: z.string() })),
});

export const variantOptionCreateSchema = z.object({
  name: z.string(),
});

export type TVariantOption = z.infer<typeof variantOptionSchema>;
export type TVariantOptionSingleResponse = TBaseResponse<TVariantOption>;
export type TVariantOptionResponse = TBaseResponse<TVariantOption[]>;
