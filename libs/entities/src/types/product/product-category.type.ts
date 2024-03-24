import { TBase, TBaseResponse } from '../common';

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

export type TProductCategorySingleResponse = TBaseResponse<TProductCategory>;
export type TProductCategoryResponse = TBaseResponse<TProductCategory[]>;
