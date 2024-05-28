import { atom, useRecoilState } from 'recoil';
import { tokenService } from '../local-storage';

export const useIsAuthenticated = () => {
  const state = useRecoilState(isAuthenticated);
  return state;
};

export const isAuthenticated = atom({
  key: 'isAuthenticated',
  default: tokenService.getAccessToken() === null ? false : true,
});
