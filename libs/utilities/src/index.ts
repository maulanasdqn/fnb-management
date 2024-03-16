import { redirect } from 'react-router-dom';
import { tokenService, userService } from '@fms/web-services';

export function permissionChecker<T>(arr1: T[], arr2: T[]): boolean {
  const [shorter, longer] =
    arr1?.length < arr2?.length ? [arr1, arr2] : [arr2, arr1];
  const set = new Set<T>(shorter);
  return longer?.some((element) => set.has(element));
}

export const isAuthenticated = tokenService.getAccessToken();

export const logOut = () => {
  tokenService.removeAccessToken();
  tokenService.removeRefreshToken();
  userService.removeUserData();
  window.location.reload();
};

export const pagePermission = (permissions: Array<string>) => {
  if (!isAuthenticated) {
    return redirect('/auth/login');
  }

  if (
    !permissionChecker(
      permissions,
      userService?.getUserData()?.role?.permissions
    )
  ) {
    return redirect('/permission-denied');
  }

  return null;
};
