import { z } from 'zod';

export const orderCreateRequestSchema = z.object({
  customerName: z.string(),
  customerPhoneNumber: z.string(),
  placeId: z.string().optional(),
  amounTotal: z.number(),
  paymentId: z.string(),
  products: z
    .object({
      id: z.string(),
      amount: z.number(),
    })
    .array(),
});
