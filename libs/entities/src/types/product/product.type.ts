import {
  productQueryParamSchema,
  productResponseSchema,
} from '../../validation-schemas/product/product.schema';
import { z } from 'zod';

export type TProductListResponse = z.infer<typeof productResponseSchema>;
export type TProductQueryParams = z.infer<typeof productQueryParamSchema>;
