import { z } from 'zod';
import { TBaseResponse } from '../common';
import { permissionSchema } from './permission.type';

export const roleSchema = z.object({
  id: z.string(),
  name: z.string(),
  createdAt: z.date().nullable(),
  updatedAt: z.date().nullable(),
  permissions: z.array(permissionSchema).optional(),
});

export const roleCreateSchema = z.object({
  name: z.string(),
  permissions: z.array(z.string()),
});

export const roleUpdateSchema = z.object({
  id: z.string(),
  name: z.string().optional(),
  permissions: z.array(z.string()).optional(),
});

export type TRole = z.infer<typeof roleSchema>;
export type TRoleCreateRequest = z.infer<typeof roleCreateSchema>;
export type TRoleUpdateRequest = z.infer<typeof roleUpdateSchema>;
export type TRoleSingleResponse = TBaseResponse<TRole>;
export type TRoleResponse = TBaseResponse<TRole[]>;
