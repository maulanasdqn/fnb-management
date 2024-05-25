import { db } from '@fms/drizzle';
import { TQueryParams, TResponse, roleResponseSchema } from '@fms/entities';
import { z } from 'zod';

export const findMany = async (
  params?: TQueryParams
): Promise<TResponse<z.infer<typeof roleResponseSchema>[]>> => {
  const data = await db.query.roles.findMany({
    columns: {
      id: true,
      name: true,
    },
    with: {
      rolesToPermissions: {
        with: {
          permission: true,
        },
      },
    },
  });

  const mappingData = data.map((role) => ({
    id: role.id,
    name: role.name,
    permissions: role.rolesToPermissions.flatMap((rtp) => {
      return rtp.permission.map((permission) => ({
        id: permission.id,
        name: permission.name,
      }));
    }),
  }));

  return {
    data: mappingData,
  };
};
