import { TUser } from '@fms/entities';

export function permissionChecker<T>(arr1: T[], arr2: T[]): boolean {
  const [shorter, longer] =
    arr1?.length < arr2?.length ? [arr1, arr2] : [arr2, arr1];
  const set = new Set<T>(shorter);
  return longer?.some((element) => set.has(element));
}

export const isAuthenticated = localStorage.getItem('accessToken');

export const userData: TUser = JSON.parse(
  localStorage.getItem('userData') as string
);

export const logOut = () => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('userData');
  window.location.reload();
};
