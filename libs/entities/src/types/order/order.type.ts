import { z } from 'zod';
import { EOrderStatus } from '../../enums/order.enum';
import { baseSchema, TBaseResponse } from '../common';
import { orderDetailSchema } from './order-detail.type';

export const orderSchema = z.object({
  customer: z.object({
    id: z.string(),
    name: z.string(),
  }),
  place: z.object({
    id: z.string(),
    name: z.string(),
  }),
  payment: z.object({
    id: z.string(),
    name: z.string(),
  }),
  amountTotal: z.number(),
  invoiceNumber: z.string().optional(),
  status: z.string().optional(),
  type: z.string().optional(),
  servedBy: z.string().optional(),
  orderDetails: z.array(orderDetailSchema),
  ...baseSchema.shape,
});

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

export const orderUpdateRequestSchema = z.object({
  id: z.string(),
  status: z.string(),
});

export type TOrder = z.infer<typeof orderSchema>;
export type TOrderCreateRequest = z.infer<typeof orderCreateRequestSchema>;
export type TOrderUpdateRequest = z.infer<typeof orderUpdateRequestSchema>;
export type TOrderSingleResponse = TBaseResponse<TOrder>;
export type TOrderResponse = TBaseResponse<TOrder[]>;
