import { z } from 'zod';
import { baseSchema } from '../common';

export const orderDetailSchema = z.object({
  product: z.object({
    id: z.string(),
    name: z.string(),
  }),
  quantity: z.number(),
  price: z.number(),
  ...baseSchema.shape,
});
