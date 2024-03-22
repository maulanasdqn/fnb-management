import { TMetaResponse } from '..';
import { TBase } from '../common';

export type TRoleDetailResponse = TBase & {
  id: string;
  name: string;
  permissions: Array<string>;
};

export type TRoleQueryParams = {
  id?: string;
  search?: string;
};

export type TRoleCreateRequest = {
  id: string;
  name: string;
  permissions: Array<string>;
};

export type TRoleUpdateRequest = {
  id?: string;
  name?: string;
  permissions?: Array<string>;
};

export type TRoleCreateResponse = TMetaResponse<TRoleDetailResponse>;
export type TRoleUpdateResponse = TMetaResponse<TRoleDetailResponse>;
export type TRoleListResponse = TMetaResponse<TRoleDetailResponse[]>;
