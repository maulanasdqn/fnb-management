import { EOrderStatus } from '../../enums/order.enum';
import { TMetaResponse } from '..';
import { TBase } from '../common';
import { TCommonObject } from '../common';

export type TOrderDetailResponse = TBase & {
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

export type TOrderCreateResponse = TMetaResponse<TOrderDetailResponse>;
export type TOrderUpdateResponse = TMetaResponse<TOrderDetailResponse>;
export type TOrderListResponse = TMetaResponse<TOrderDetailResponse[]>;
