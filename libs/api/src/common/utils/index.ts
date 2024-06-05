import * as argon2 from 'argon2';
import jwt from 'jsonwebtoken';
import { config } from 'dotenv';
import { permissionResponseSchema } from '@fms/entities';
import { z } from 'zod';

config();
export const encryptPassword = async (password: string): Promise<string> => {
  return await argon2.hash(password);
};

export const comparePassword = async (
  hash: string,
  password: string
): Promise<boolean> => {
  return await argon2.verify(hash, password);
};

export const generateAccessToken = (payload: {
  id: string;
  fullname: string;
}): string => {
  const accessToken = jwt.sign(
    payload,
    process.env['ACCESS_SECRET'] as string,
    {
      expiresIn: '15m',
    }
  );

  return accessToken;
};

export const generateRefreshToken = (payload: {
  id: string;
  fullname: string;
}): string => {
  const refreshToken = jwt.sign(
    payload,
    process.env['REFRESH_SECRET'] as string,
    { expiresIn: '7d' }
  );

  return refreshToken;
};

interface Permission {
  name: string;
  id: string;
  key: string;
  createdAt: Date | null;
  updatedAt: Date | null;
}

interface ParentGroup {
  parent: string;
  permissions: Permission[];
}

interface GroupedData {
  group: string;
  parents: ParentGroup[];
}

export const groupPermissions = (
  data: z.infer<typeof permissionResponseSchema>[]
): GroupedData[] => {
  const result: { [group: string]: { [parent: string]: Permission[] } } =
    data.reduce(
      (acc, { group, parent, id, name, key, createdAt, updatedAt }) => {
        if (!acc[group]) {
          acc[group] = {};
        }
        if (!acc[group][parent]) {
          acc[group][parent] = [];
        }
        acc[group][parent].push({ id, name, key, createdAt, updatedAt });
        return acc;
      },
      {} as { [group: string]: { [parent: string]: Permission[] } }
    );

  return Object.entries(result).map(([group, parents]) => ({
    group,
    parents: Object.entries(parents).map(([parent, permissions]) => ({
      parent,
      permissions,
    })),
  }));
};
