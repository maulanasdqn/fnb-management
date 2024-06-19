import { db, roles, rolesToPermissions } from '@fms/drizzle';
import {
  TQueryParams,
  TRoleResponse,
  TRoleSingleResponse,
  TRoleCreateRequest,
  TRoleUpdateRequest,
} from '@fms/entities';
import { eq } from 'drizzle-orm';

export const create = async (
  request: TRoleCreateRequest
): Promise<TRoleSingleResponse> => {
  await db.transaction(async (tx) => {
    const createRole = await db
      .insert(roles)
      .values({
        name: request.name,
      })
      .returning({
        id: roles.id,
      })
      .then((res) => res.at(0));

    for await (const permissionId of request.permissionIds) {
      await tx
        .insert(rolesToPermissions)
        .values({ roleId: createRole?.id as string, permissionId });
    }
  });
  await db.insert(roles).values({
    name: request.name,
  });

  return {
    message: 'Create Role Success',
  };
};

export const update = async (request: TRoleUpdateRequest) => {
  await db.transaction(async (tx) => {
    if (request?.name) {
      await tx
        .update(roles)
        .set({ name: request.name })
        .where(eq(roles.id, request.id));
    }

    if (request?.permissionIds) {
      await tx
        .delete(rolesToPermissions)
        .where(eq(rolesToPermissions.roleId, request.id));

      for await (const permissionId of request.permissionIds) {
        await tx
          .insert(rolesToPermissions)
          .values({ roleId: request.id, permissionId });
      }
    }
  });
  return {
    message: 'Update Role Success',
  };
};

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

export const deleteRole = async (id: string): Promise<TRoleSingleResponse> => {
  await db.transaction(async (tx) => {
    await tx.delete(roles).where(eq(roles.id, id));

    await tx
      .delete(rolesToPermissions)
      .where(eq(rolesToPermissions.roleId, id));
  });

  return {
    message: 'Delete Role Success',
  };
};
