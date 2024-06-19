import { redirect } from 'react-router-dom';
import { tokenService, userService } from '@fms/web-services';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { isAuthenticated as isBabi } from '@fms/web-services';

export function permissionChecker<T>(arr1: T[], arr2: T[]): boolean {
  const [shorter, longer] =
    arr1?.length < arr2?.length ? [arr1, arr2] : [arr2, arr1];
  const set = new Set<T>(shorter);

  if (arr1.length === 0) {
    return true;
  }
  return longer?.some((element) => set.has(element));
}

export const isAuthenticated = (): boolean => {
  const isAuth = useRecoilValue(isBabi);
  return isAuth;
};

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
      userService?.getUserData()?.role?.permissions?.map((val) => val?.name) as Array<string>
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

export const useLocalStorage = <T>(key: string, initialValue: T) => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === 'undefined') {
      return initialValue;
    }
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.log(error);
      return initialValue;
    }
  });
  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.log(error);
    }
  };
  return [storedValue, setValue] as const;
};

export const useGetLocalStorage = <T>(key: string) => {
  const [value, setValue] = useLocalStorage<T>(key, {} as T);
  return [value, setValue] as const;
};

export const calculateTotalPages = (total: number, limit: number): number => {
  return Math.ceil(total / limit);
};

export const formatedDate = (date: Date) => {
  return new Intl.DateTimeFormat('id-ID', {
    dateStyle: 'full',
  }).format(date);
};

export const capitalizeWords = (str: string) => {
  if (!str) return undefined;
  return str.toLowerCase().replace(/(^|\s)\S/g, function (firstLetter) {
    return firstLetter.toUpperCase();
  });
};
