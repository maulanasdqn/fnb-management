import { z } from 'zod';
import { baseSchema, TBaseResponse } from '../common';
import { permissionSchema } from './permission.type';

export const userSchema = z.object({
  id: z.string(),
  fullname: z.string(),
  username: z.string(),
  avatar: z.string().nullable(),
  role: z.object({
    id: z.string(),
    name: z.string(),
  }),
  ...baseSchema.omit({ id: true }).shape,
});

export const userDetailSchema = z.object({
  ...userSchema.omit({ role: true }).shape,
  role: z.object({
    id: z.string(),
    name: z.string(),
    permissions: z.array(permissionSchema),
    ...baseSchema.omit({ id: true }).shape,
  }),
});

export const userCreateSchema = z.object({
  fullname: z.string(),
  username: z.string(),
  avatar: z.string().optional(),
  password: z.string(),
  roleId: z.string(),
});

export const userUpdateSchema = z.object({
  id: z.string(),
  fullname: z.string().optional(),
  username: z.string().optional(),
  avatar: z.string().optional(),
  password: z.string().optional(),
  roleId: z.string().optional(),
});

export type TUser = z.infer<typeof userSchema>;
export type TUserDetail = z.infer<typeof userDetailSchema>;
export type TUserCreateRequest = z.infer<typeof userCreateSchema>;
export type TUserUpdateRequest = z.infer<typeof userUpdateSchema>;
export type TUserResponse = TBaseResponse<Omit<TUser, 'avatar' | 'role'>[]>;
export type TUserSingleResponse = TBaseResponse<TUserDetail>;
