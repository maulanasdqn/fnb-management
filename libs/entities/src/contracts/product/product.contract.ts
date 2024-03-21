import {
  productQueryParamSchema,
  productResponseSchema,
} from './product.schema';
import { z } from 'zod';

export type TCProductListResponse = z.infer<typeof productResponseSchema>;
export type TCProductQueryParams = z.infer<typeof productQueryParamSchema>;
