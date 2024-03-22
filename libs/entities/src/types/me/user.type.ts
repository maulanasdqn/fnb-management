import { TMetaResponse } from '..';
import { TBase } from '../common';

import { TRoleDetailResponse } from './role.type';

export type TUser = {
  id: string;
  fullname: string;
  email: string;
  password?: string;
  role: {
    id: string;
    name: string;
    permissions: Array<string>;
  };
};

export type TUserDetailReponse = TBase & {
  fullname: string;
  username: string;
  avatar: string;
  password: string;
  role: TRoleDetailResponse;
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

export type TUserCreateResponse = TMetaResponse<TUserDetailReponse>;
export type TUserUpdateResponse = TMetaResponse<TUserDetailReponse>;
export type TUserListResponse = TMetaResponse<TUserDetailReponse[]>;
