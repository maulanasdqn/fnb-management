import { TLoginResponse, TUser } from '@fms/entities';

export const userService = {
  getUserData: (): TLoginResponse['user'] =>
    JSON.parse(localStorage.getItem('userData') as string),
  setUserData: (userData: TUser) =>
    localStorage.setItem('userData', JSON.stringify(userData)),
  removeUserData: () => localStorage.removeItem('userData'),
};
