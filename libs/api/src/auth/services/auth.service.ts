import { db, users } from '@fms/drizzle';
import { loginRequestSchema } from '@fms/entities';
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
    });

    if (!user) {
      throw error('User tidak ditemukan');
    }

    const isPasswordSame = comparePassword(user.password, request.password);

    if (!isPasswordSame) {
      throw error('Password tidak valid');
    }
    const { password, ...restData } = user;

    return {
      user: restData,
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
