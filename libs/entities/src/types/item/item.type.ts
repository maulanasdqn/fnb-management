import {
  itemQueryParamSchema,
  itemResponseSchema,
  itemCreateRequestSchema,
  itemUpdateRequestSchema
} from '../../validation-schemas/item/item.schema';
import { z } from 'zod';
export type TItem = z.infer<typeof itemResponseSchema>;
export type TItemResponse = TItem[];
export type TItemSingleResponse = TItem;
export type TItemQueryParams = z.infer<typeof itemQueryParamSchema>;
export type TItemCreateRequest = z.infer<typeof itemCreateRequestSchema>;
export type TItemUpdateRequest = z.infer<typeof itemUpdateRequestSchema>;
