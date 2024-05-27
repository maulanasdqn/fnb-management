import { db, users } from '@fms/drizzle';
import { loginRequestSchema, TUser } from '@fms/entities';
import { TRPCError } from '@trpc/server';
import { eq } from 'drizzle-orm';
import { z } from 'zod';
import {
  comparePassword,
  generateAccessToken,
  generateRefreshToken,
} from '../../common';
// eslint-disable-next-line @nx/enforce-module-boundaries

export const login = async (request: z.infer<typeof loginRequestSchema>) => {
  try {
    const user = await db.query.users
      .findFirst({
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
      throw Error('User tidak ditemukan');
    }

    const isPasswordSame = await comparePassword(user.password, request.password);

    if (!isPasswordSame) {
      throw Error('Password tidak valid');
    }
    const dataUser: TUser = {
      id: user.id,
      fullname: user.fullname,
      role: {
        id: user.role.id,
        name: user.role.name,
        createdAt: user.role.createdAt,
        updatedAt: user.role.updatedAt,
        permissions: user.role.rolesToPermissions.map((rtp) => ({
          id: rtp.permission.id,
          name: rtp.permission.name,
        })),
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
