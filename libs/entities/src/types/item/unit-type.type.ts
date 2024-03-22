import { TMetaResponse } from '../../types';
import { TBase } from '../common';

export type TUnitTypeDetailResponse = TBase & {
  name: string;
};

export type TUnitTypeQueryParams = {
  id?: string;
  search?: string;
};

export type TUnitTypeCreateRequest = {
  name: string;
};

export type TUnitTypeUpdateRequest = {
  id?: string;
  name?: string;
};

export type TUnitTypeCreateResponse = TMetaResponse<TUnitTypeDetailResponse>;
export type TUnitTypeUpdateResponse = TMetaResponse<TUnitTypeDetailResponse>;
export type TUnitTypeListResponse = TMetaResponse<TUnitTypeDetailResponse[]>;
