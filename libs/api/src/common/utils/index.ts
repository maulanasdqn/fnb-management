import * as argon2 from 'argon2';
import jwt from 'jsonwebtoken';
import { config } from 'dotenv';
import {
  TCCommonObject,
  TOption,
  TPermission,
  TPermissionGroup,
} from '@fms/entities';

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

export const groupPermissions = (data: TPermission[]): TPermissionGroup[] => {
  const result: {
    [group: string]: {
      [parent: string]: TPermission[];
    };
  } = data.reduce(
    (acc, permission) => {
      const { group, parent } = permission;
      if (!acc[group]) {
        acc[group] = {};
      }
      if (!acc[group][parent]) {
        acc[group][parent] = [];
      }
      acc[group][parent].push(permission);
      return acc;
    },
    {} as {
      [group: string]: {
        [parent: string]: TPermission[];
      };
    }
  );

  return Object.entries(result).map(([group, parents]) => ({
    group,
    parents: Object.entries(parents).map(([parent, permissions]) => ({
      parent,
      permissions,
    })),
  }));
};

export const dropdownOptions = (props: TCCommonObject[]): TOption[] => {
  return props.map((val) => {
    const result: TOption = {
      label: val.name,
      value: val.id,
    };

    if (val?.data) {
      result.data = val.data.map((val) => ({
        name: val.name,
        id: val.id,
      }));
    }

    return result;
  });
};
