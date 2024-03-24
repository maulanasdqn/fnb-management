import { TBase, TBaseResponse } from '../common';

export type TPayment = TBase & {
  name: string;
  accountName: string;
  accountNumber: string;
  amount: string;
};

export type TPaymentQueryParams = {
  id?: string;
  search?: string;
};

export type TPaymentCreateRequest = {
  name: string;
  accountName: string;
  accountNumber: string;
};

export type TPaymentUpdateRequest = {
  id?: string;
  name?: string;
  accountName?: string;
  accountNumber?: string;
  amount?: string;
};

export type TPaymentSingleResponse = TBaseResponse<TPayment>;
export type TPaymentResponse = TBaseResponse<TPayment[]>;
