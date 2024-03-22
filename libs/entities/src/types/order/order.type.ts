import { EOrderStatus } from '../../enums/order.enum';
import { TMetaResponse } from '..';
import { TBase } from '../common';
import { TCommonObject } from '../common';

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

export type TOrderCreateRequest = {
  customerId: string;
  placeId: string;
  paymentId: string;
  amountTotal: number;
  invoiceNumber: number;
  orderDetails: Array<{
    productId: string;
    qty: number;
    price: number;
    amount: number;
  }>;
};

export type TOrderUpdateRequest = {
  id?: string;
  status?: EOrderStatus;
};

export type TOrderSingleResponse = TMetaResponse<TOrder>;
export type TOrderResponse = TMetaResponse<TOrder[]>;
