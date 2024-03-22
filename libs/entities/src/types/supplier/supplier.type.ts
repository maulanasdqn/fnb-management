import { TMetaResponse } from '..';
import { TBase } from '../common';

export type TSupplierDetailResponse = TBase & {
  fullname: string;
  address: string;
  phoneNumber: string;
};

export type TSupplierQueryParams = {
  id?: string;
  search?: string;
};

export type TSupplierCreateRequest = {
  fullname: string;
  address: string;
  phoneNumber: string;
};

export type TSupplierUpdateRequest = {
  id?: string;
  fullname?: string;
  address?: string;
  phoneNumber?: string;
};

export type TSupplierCreateResponse = TMetaResponse<TSupplierDetailResponse>;
export type TSupplierUpdateResponse = TMetaResponse<TSupplierDetailResponse>;
export type TSupplierListResponse = TMetaResponse<TSupplierDetailResponse[]>;
