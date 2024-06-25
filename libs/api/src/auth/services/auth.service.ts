import { db, users } from '@fms/drizzle';
import {
  loginRequestSchema,
  TLoginRequest,
  TLoginResponse,
  TUser,
} from '@fms/entities';
import { TRPCError } from '@trpc/server';
import { eq } from 'drizzle-orm';
import { z } from 'zod';
import {
  comparePassword,
  generateAccessToken,
  generateRefreshToken,
} from '../../common';
// eslint-disable-next-line @nx/enforce-module-boundaries

export const login = async (
  request: TLoginRequest
): Promise<TLoginResponse> => {
  try {
    const user = await db.query.users.findFirst({
      where: eq(users.username, request.userName),
      with: {
        role: {
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
        },
      },
    });

    if (!user) {
      throw Error('User tidak ditemukan');
    }

    const isPasswordSame = await comparePassword(
      user.password,
      request.password
    );

    if (!isPasswordSame) {
      throw Error('Password tidak valid');
    }

    return {
      user: {
        id: user.id,
        fullname: user.fullname,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        username: user.username,
        avatar: user.avatar,
        role: {
          id: user.role.id,
          name: user.role.name,
          createdAt: user.role.createdAt,
          updatedAt: user.role?.updatedAt,
          permissions: user.role.rolesToPermissions.map((rtp) => ({
            id: rtp.permission.id,
            name: rtp.permission.key,
            key: rtp.permission.key,
            group: rtp.permission.group,
            parent: rtp.permission.parent,
            createdAt: rtp.permission.createdAt,
            updatedAt: rtp.permission.updatedAt,
          })),
        },
      },
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
