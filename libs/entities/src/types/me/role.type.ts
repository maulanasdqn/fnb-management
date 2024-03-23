import { TMetaResponse } from '..';
import { TBase } from '../common';

export type TRole = TBase & {
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

export type TRoleSingleResponse = TMetaResponse<TRole>;
export type TRoleResponse = TMetaResponse<TRole[]>;
