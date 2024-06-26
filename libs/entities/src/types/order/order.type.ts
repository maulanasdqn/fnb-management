import { z } from 'zod';
import { baseSchema, TBaseResponse } from '../common';

export const orderSchema = z.object({
  id: z.string(),
  customer: z
    .object({
      id: z.string(),
      name: z.string(),
    })
    .nullable()
    .optional(),
  place: z
    .object({
      id: z.string(),
      name: z.string(),
    })
    .nullable()
    .optional(),
  payment: z
    .object({
      id: z.string(),
      name: z.string(),
    })
    .nullable()
    .optional(),
  amountTotal: z.number(),
  invoiceNumber: z.string().optional(),
  status: z.string().nullable().optional(),
  isPaid: z.boolean().nullable().optional(),
  type: z.string().nullable().optional(),
  servedBy: z.string().optional(),
  details: z
    .array(
      z.object({
        product: z.object({
          id: z.string(),
          name: z.string(),
          varianOptions: z
            .array(
              z.object({
                id: z.string(),
                name: z.string(),
              })
            )
            .nullable()
            .optional(),
        }),
        quantity: z.number(),
      })
    )
    .optional(),
  ...baseSchema.omit({ id: true }).shape,
});

export const orderCreateSchema = z.object({
  customerName: z.string(),
  customerPhoneNumber: z.string().optional(),
  placeId: z.string().optional(),
  paymentId: z.string(),
  details: z.array(
    z.object({
      productId: z.string(),
      quantity: z.number(),
      variantOptionIds: z.array(z.string()).optional(),
    })
  ),
});

export const orderUpdateSchema = z.object({
  id: z.string(),
  status: z.string().optional(),
  isPaid: z.boolean().optional(),
});

export type TOrder = z.infer<typeof orderSchema>;
export type TOrderCreateRequest = z.infer<typeof orderCreateSchema>;
export type TOrderUpdateRequest = z.infer<typeof orderUpdateSchema>;
export type TOrderSingleResponse = TBaseResponse<TOrder>;
export type TOrderResponse = TBaseResponse<TOrder[]>;
