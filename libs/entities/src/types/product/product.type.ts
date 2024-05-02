import {
  productQueryParamSchema,
  productResponseSchema,
  productCreateRequestSchema,
  productUpdateRequestSchema
} from '../../validation-schemas/product/product.schema';
import { TBaseResponse } from '../common';

import { z } from 'zod';
export type TProduct = z.infer<typeof productResponseSchema>;
export type TProductResponse = TBaseResponse<TProduct[]>;
export type TProductSingleResponse = TBaseResponse<TProduct>;
export type TProductQueryParams = z.infer<typeof productQueryParamSchema>;
export type TProductCreateRequest = z.infer<typeof productCreateRequestSchema>;
export type TProductUpdateRequest = z.infer<typeof productUpdateRequestSchema>;
