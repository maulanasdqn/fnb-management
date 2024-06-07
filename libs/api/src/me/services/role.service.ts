import { db, roles } from '@fms/drizzle';
import {
  TQueryParams,
  TRoleResponse,
  TRoleSingleResponse,
} from '@fms/entities';
import { eq } from 'drizzle-orm';

export const findMany = async (
  params?: TQueryParams
): Promise<TRoleResponse> => {
  const data = await db.query.roles.findMany({
    columns: {
      id: true,
      name: true,
      createdAt: true,
      updatedAt: true,
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
    createdAt: role.createdAt,
    updatedAt: role.updatedAt,
    permissions: role.rolesToPermissions.map((rtp) => ({
      id: rtp.permission.id,
      name: rtp.permission.name,
      key: rtp.permission.key,
      group: rtp.permission.group,
      parent: rtp.permission.parent,
      createdAt: rtp.permission.createdAt,
      updatedAt: rtp.permission.updatedAt,
    })),
  }));

  return {
    data: mappingData,
  };
};

export const findOne = async (id: string): Promise<TRoleSingleResponse> => {
  const data = await db.query.roles.findFirst({
    where: eq(roles.id, id),
    columns: {
      id: true,
      name: true,
      createdAt: true,
      updatedAt: true,
    },
    with: {
      rolesToPermissions: {
        with: {
          permission: true,
        },
      },
    },
  });

  if (!data) {
    throw Error('Role tidak ditemukan');
  }

  const permissions = data?.rolesToPermissions?.map((rtp) => ({
    id: rtp.permission.id,
    name: rtp.permission.name,
    key: rtp.permission.key,
    group: rtp.permission.group,
    parent: rtp.permission.parent,
    createdAt: rtp.permission.createdAt,
    updatedAt: rtp.permission.updatedAt,
  }));

  return {
    data: {
      id: data.id,
      name: data.name,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
      permissions,
    },
  };
};
