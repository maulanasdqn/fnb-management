import { redirect } from 'react-router-dom';
import { tokenService, userService } from '@fms/web-services';
import { useEffect, useState } from 'react';

export function permissionChecker<T>(arr1: T[], arr2: T[]): boolean {
  const [shorter, longer] =
    arr1?.length < arr2?.length ? [arr1, arr2] : [arr2, arr1];
  const set = new Set<T>(shorter);

  if (arr1.length === 0) {
    return true;
  }
  return longer?.some((element) => set.has(element));
}

export const isAuthenticated = tokenService.getAccessToken();

export const logOut = () => {
  window.location.reload();
  tokenService.removeAccessToken();
  tokenService.removeRefreshToken();
  userService.removeUserData();
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

export const currencyFormat = (value: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    minimumFractionDigits: 0,
    currency: 'IDR',
  }).format(value);
};

export const useDebounce = <T>(value: T, delay: number): T => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);
  return debouncedValue;
};
