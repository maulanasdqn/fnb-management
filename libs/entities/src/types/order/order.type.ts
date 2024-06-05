import { z } from 'zod';
import { EOrderStatus } from '../../enums/order.enum';
import { baseSchema, TBase, TBaseResponse } from '../common';
import { TCommonObject } from '../common';

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
  status: z.string().optional(),
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

export type TOrder = TBase & {
  customer: TCommonObject;
  place: TCommonObject;
  payment: TCommonObject;
  orderDetails: Array<{
    product: TCommonObject;
    qty: number;
    price: number;
    amount: number;
  }>;
  amountTotal: number;
  invoiceNumber: number;
  status: EOrderStatus;
};

export type TOrderQueryParams = {
  id?: string;
};

export type TOrderCreateRequest = z.infer<typeof orderCreateRequestSchema>;

export type TOrderUpdateRequest = {
  id?: string;
  status?: EOrderStatus;
};

export type TOrderSingleResponse = TBaseResponse<TOrder>;
export type TOrderResponse = TBaseResponse<TOrder[]>;
