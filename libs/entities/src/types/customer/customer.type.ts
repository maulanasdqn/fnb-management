import { TMetaResponse } from '..';
import { TBase } from '../common';

export type TCustomer = TBase & {
  name: string;
  phoneNumber: string;
};

export type TCustomerQueryParams = {
  id?: string;
  search?: string;
};

export type TCustomerCreateRequest = {
  name: string;
  phoneNumber: string;
};

export type TCustomerUpdateRequest = {
  id?: string;
  name?: string;
  phoneNumber?: string;
};

export type TCustomerSingleResponse = TMetaResponse<TCustomer>;
export type TCustomerResponse = TMetaResponse<TCustomer[]>;
