import { TMetaResponse } from '..';
import { TBase } from '../common';

export type TSupplier = TBase & {
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

export type TSupplierSingleResponse = TMetaResponse<TSupplier>;
export type TSupplierResponse = TMetaResponse<TSupplier[]>;
