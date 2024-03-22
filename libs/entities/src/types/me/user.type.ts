import { TMetaResponse } from '..';
import { TBase } from '../common';

import { TRole } from './role.type';

export type TUser = TBase & {
  fullname: string;
  email: string;
  password?: string;
  role: TRole;
};

export type TUserQueryParams = {
  id?: string;
  search?: string;
};

export type TUserCreateRequest = {
  fullname: string;
  username: string;
  avatar: string;
  password: string;
  roleId: string;
};

export type TUserUpdateRequest = {
  id?: string;
  fullname?: string;
  username?: string;
  avatar?: string;
  password?: string;
  roleId?: string;
};

export type TUserResponse = TMetaResponse<TUser>;
export type TUserSingleResponse = TMetaResponse<TUser[]>;
