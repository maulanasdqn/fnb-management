import {
  productQueryParamSchema,
  productResponseSchema,
} from '../../validation-schemas/product/product.schema';
import { z } from 'zod';
export type TProduct = z.infer<typeof productResponseSchema>;
export type TProductResponse = TProduct[];
export type TProductSingleResponse = TProduct;
export type TProductQueryParams = z.infer<typeof productQueryParamSchema>;
