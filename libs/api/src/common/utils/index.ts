import * as argon2 from 'argon2';
import jwt from 'jsonwebtoken';

export const encryptPassword = async (password: string): Promise<string> => {
  return await argon2.hash(password);
};

export const comparePassword = async (
  password: string,
  hash: string
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
