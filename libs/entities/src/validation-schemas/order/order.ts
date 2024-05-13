import { z } from 'zod';
import { baseSchema } from '../common';

export const orderCreateRequestSchema = z.object({
  customerName: z.string(),
  customerPhoneNumber: z.string().optional(),
  placeId: z.string().optional(),
  paymentId: z.string().optional(),
  products: z
    .object({
      id: z.string(),
      amount: z.number(),
    })
    .array(),
});

export const orderResponseSchema = z.object({
  id: z.string(),
  customerId: z.string(),
  placeId: z.string().optional(),
  amountTotal: z.number(),
  paymentId: z.string().optional(),
  invoiceNumber: z.string().optional(),
  status : z.string().optional(),
  products: z
    .object({
      id: z.string(),
      amount: z.number(),
    })
    .array(),
  ...baseSchema.omit({ id: true }).shape,
});
export const orderQueryParamSchema = z.object({
  id: z.string(),
  search: z.string().optional(),
  productCategoryId: z.string().optional(),
});