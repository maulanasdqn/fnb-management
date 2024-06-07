import { db, permissions } from '@fms/drizzle';
import { TQueryParams } from '@fms/entities';
import { z } from 'zod';
import { groupPermissions } from '../../common/utils';

export const findMany = async (params?: TQueryParams): Promise<any> => {
  const data = await db
    .select({
      id: permissions.id,
      name: permissions.name,
      parent: permissions.parent,
      group: permissions.group,
      key: permissions.key,
      createdAt: permissions.createdAt,
      updatedAt: permissions.updatedAt,
    })
    .from(permissions);

  return {
    data: groupPermissions(data),
  };
};
