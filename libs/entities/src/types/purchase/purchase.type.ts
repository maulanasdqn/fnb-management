import { EPurchaseStatus } from '../../enums/purchase.enum';
import { TBase, TBaseResponse } from '../common';

import { TCommonObject } from '../common';

export type TPurchase = TBase & {
  amountTotal: number;
  invoiceNumber: string;
  supplier: TCommonObject;
  status: EPurchaseStatus;
  purchaseDetails: Array<{
    item: TCommonObject;
    qty: number;
    price: number;
    amount: number;
  }>;
};

export type TPurchaseQueryParams = {
  id?: string;
  search?: string;
};

export type TPurchaseCreateRequest = {
  amountTotal: number;
  invoiceNumber: string;
  supplierId: string;
  status: EPurchaseStatus;
  purchaseDetails: Array<{
    itemId: string;
    qty: number;
    price: number;
    amount: number;
  }>;
};

export type TPurchaseUpdateRequest = {
  id?: string;
  amountTotal?: number;
  invoiceNumber?: string;
  supplierId?: string;
  status?: EPurchaseStatus;
  purchaseDetails?: Array<{
    itemId: string;
    qty: number;
    price: number;
    amount: number;
  }>;
};

export type TPurchaseSingleResponse = TBaseResponse<TPurchase>;
export type TPurchaseResponse = TBaseResponse<TPurchase[]>;
