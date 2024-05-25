import { db, permissions } from '@fms/drizzle';
import {
  TQueryParams,
  TResponse,
  permissionResponseSchema,
} from '@fms/entities';
import { z } from 'zod';

export const findMany = async (
  params?: TQueryParams
): Promise<TResponse<z.infer<typeof permissionResponseSchema>[]>> => {
  const data = await db
    .select({
      id: permissions.id,
      name: permissions.name,
    })
    .from(permissions);

  return {
    data,
  };
};
