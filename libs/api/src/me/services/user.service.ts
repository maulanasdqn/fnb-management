import { db, roles, users } from '@fms/drizzle';
import {
  TQueryParams,
  TUserCreateRequest,
  TUserResponse,
  TUserSingleResponse,
  TUserUpdateRequest,
} from '@fms/entities';
import { asc, eq, ilike } from 'drizzle-orm';
import { encryptPassword } from '../../common';

export const userService = {
  pagination: async (params: TQueryParams): Promise<TUserResponse> => {
    const page = params?.page || 1;
    const perPage = params?.perPage || 10;
    const offset = (page - 1) * perPage;

    const data = await db
      .select({
        id: users.id,
        fullname: users.fullname,
        username: users.username,
        role: {
          id: roles.id,
          name: roles.name,
        },
        createdAt: users.createdAt,
        updatedAt: users.updatedAt,
      })
      .from(users)
      .where(ilike(users.fullname, `%${params?.search || ''}%`))
      .leftJoin(roles, eq(roles.id, users.roleId))
      .limit(perPage)
      .offset(params?.search ? 0 : offset)
      .orderBy(asc(users.fullname));

    const count = await db
      .select({ id: users.id })
      .from(users)
      .then((res) => res.length);

    const totalPage = Math.ceil(count / perPage);
    const nextPage = page < totalPage ? Number(page) + 1 : null;
    const prevPage = page > 1 ? Number(page - 1) : null;

    return {
      meta: {
        page,
        nextPage,
        prevPage,
        perPage,
        totalPage,
      },
      data,
    };
  },
  detail: async (id: string): Promise<TUserSingleResponse> => {
    const data = await db.query.users.findFirst({
      where: eq(users.id, id),
      columns: {
        id: true,
        fullname: true,
        username: true,
        avatar: true,
      },
      with: {
        role: {
          columns: {
            id: true,
            name: true,
          },
        },
      },
    });
    if (!data) {
      throw new Error('User not found');
    }
    return {
      data,
    };
  },
  create: async (
    data: TUserCreateRequest
  ): Promise<{
    message: string;
  }> => {
    await db.insert(users).values({
      fullname: data.fullname,
      username: data.username,
      avatar: data.avatar,
      password: await encryptPassword(data.password),
      roleId: data.roleId,
    });
    return {
      message: 'Create User Success',
    };
  },
  update: async (
    data: TUserUpdateRequest
  ): Promise<{
    message: string;
  }> => {
    await db
      .update(users)
      .set({
        fullname: data.fullname,
        username: data.username,
        avatar: data.avatar,
        password: data?.password && (await encryptPassword(data.password)),
        roleId: data.roleId,
      })
      .where(eq(users.id, data.id));

    return {
      message: 'Update User Success',
    };
  },
  delete: async (
    id: string
  ): Promise<{
    message: string;
  }> => {
    await db.delete(users).where(eq(users.id, id));

    return {
      message: 'Delete User Success',
    };
  },
};
