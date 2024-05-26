import { TBase, TBaseResponse } from '../common';

export type TRole = TBase & {
  id: string;
  name: string;
  permissions: Array<{
    id: string;
    name: string;
  }>;
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

export type TRoleSingleResponse = TBaseResponse<TRole>;
export type TRoleResponse = TBaseResponse<TRole[]>;
