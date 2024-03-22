import { TMetaResponse } from '..';
import { TBase } from '../common';

export type TProductCategoryDetailResponse = TBase & {
  name: string;
};

export type TProductCategoryQueryParams = {
  id?: string;
  search?: string;
};

export type TProductCategoryCreateRequest = {
  name: string;
};

export type TProductCategoryUpdateRequest = {
  id?: string;
  name?: string;
};

export type TProductCategoryCreateResponse =
  TMetaResponse<TProductCategoryDetailResponse>;
export type TProductCategoryUpdateResponse =
  TMetaResponse<TProductCategoryDetailResponse>;
export type TProductCategoryListResponse = TMetaResponse<
  TProductCategoryDetailResponse[]
>;
