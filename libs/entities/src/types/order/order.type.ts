import { z } from 'zod';
import { EOrderStatus } from '../../enums/order.enum';
import { TBase, TBaseResponse } from '../common';
import { TCommonObject } from '../common';
import { orderCreateRequestSchema } from '../../validation-schemas/order/order';

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
