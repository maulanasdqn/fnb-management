import { z } from 'zod';
import { TBase, TBaseResponse } from '../common';

export const roleResponseSchema = z.object({
  id: z.string(),
  name: z.string(),
  createdAt: z.date().nullable(),
  updatedAt: z.date().nullable(),
  permissions: z
    .array(
      z.object({
        id: z.string(),
        name: z.string(),
        key: z.string(),
        group: z.string(),
        parent: z.string(),
        createdAt: z.date().nullable(),
        updatedAt: z.date().nullable(),
      })
    )
    .optional(),
});

export type TRole = z.infer<typeof roleResponseSchema>;

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
