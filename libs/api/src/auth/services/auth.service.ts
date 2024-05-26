import { db, users } from '@fms/drizzle';
import { loginRequestSchema, TRole, TUser } from '@fms/entities';
import { TRPCError } from '@trpc/server';
import { error } from 'console';
import { eq } from 'drizzle-orm';
import { z } from 'zod';
// eslint-disable-next-line @nx/enforce-module-boundaries
import {
  comparePassword,
  generateAccessToken,
  generateRefreshToken,
} from '@fms/utilities';

export const login = async (request: z.infer<typeof loginRequestSchema>) => {
  try {
    const user = await db.query.users.findFirst({
      where: eq(users.username, request.userName),
      with: {
        role: {
          with: {
            rolesToPermissions: {
              with: {
                permission: true,
              },
            },
          },
        },
      },
    });

    if (!user) {
      throw error('User tidak ditemukan');
    }

    const isPasswordSame = comparePassword(user.password, request.password);

    if (!isPasswordSame) {
      throw error('Password tidak valid');
    }
    const dataUser: TUser = {
      id: user.id,
      fullname: user.fullname,
      role: {
        id: user.role.id,
        name: user.role.name,
        createdAt: user.role.createdAt,
        updatedAt: user.role.updatedAt,
        permissions: user.role.rolesToPermissions.flatMap((rtp) => {
          return rtp.permission.map((permission) => ({
            id: permission.id,
            name: permission.name,
          }));
        }),
      },
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
    return {
      user: dataUser,
      token: {
        accessToken: generateAccessToken(user),
        refreshToken: generateRefreshToken(user),
      },
    };
  } catch (error) {
    throw new TRPCError({
      message: (error as any).message as string,
      code: 'BAD_REQUEST',
    });
  }
};
