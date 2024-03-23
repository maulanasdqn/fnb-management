import { TMetaResponse } from '..';
import { TBase } from '../common';

export type TProductCategory = TBase & {
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

export type TProductCategorySingleResponse = TMetaResponse<TProductCategory>;
export type TProductCategoryResponse = TMetaResponse<TProductCategory[]>;
