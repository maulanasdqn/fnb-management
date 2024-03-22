import { TMetaResponse } from '..';
import { TBase } from '../common';

export type TCustomerDetailResponse = TBase & {
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

export type TCustomerCreateResponse = TMetaResponse<TCustomerDetailResponse>;
export type TCustomerUpdateResponse = TMetaResponse<TCustomerDetailResponse>;
export type TCustomerListResponse = TMetaResponse<TCustomerDetailResponse[]>;
