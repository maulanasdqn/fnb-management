import { TMetaResponse } from '..';
import { TBase } from '../common';

export type TPlaceDetailResponse = TBase & {
  name: string;
};

export type TPlaceQueryParams = {
  id?: string;
  search?: string;
};

export type TPlaceCreateRequest = {
  name: string;
};

export type TPlaceUpdateRequest = {
  id?: string;
  name?: string;
};

export type TPlaceCreateResponse = TMetaResponse<TPlaceDetailResponse>;
export type TPlaceUpdateResponse = TMetaResponse<TPlaceDetailResponse>;
export type TPlaceListResponse = TMetaResponse<TPlaceDetailResponse[]>;
