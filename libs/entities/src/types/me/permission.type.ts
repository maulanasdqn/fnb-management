import { z } from 'zod';
import { TBaseResponse } from '../common';

export const permissionSchema = z.object({
  name: z.string(),
  id: z.string(),
  parent: z.string(),
  group: z.string(),
  key: z.string(),
  createdAt: z.date().nullable(),
  updatedAt: z.date().nullable(),
});

export type TPermission = z.infer<typeof permissionSchema>;
export type TPermissionSinggleResponse = TBaseResponse<TPermission>;
export type TPermissionResponse = TBaseResponse<TPermission[]>;

export type TPermissionParent = {
  parent: string;
  permissions: TPermission[];
};

export type TPermissionGroup = {
  group: string;
  parents: TPermissionParent[];
};
