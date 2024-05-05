import { z } from 'zod';

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
