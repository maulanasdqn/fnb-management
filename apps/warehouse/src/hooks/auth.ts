import { tokenService } from '@fms/web-services';
import { atom, useRecoilState, useRecoilValue } from 'recoil';

export const useIsAuthenticated = () => {
  const state = useRecoilState(isAuthenticated);
  return state;
};

export const isAuthenticated = atom({
  key: 'isAuthenticated',
  default: !!tokenService.getAccessToken,
});

export const useIsAuthed = () => {
  const value = useRecoilValue(isAuthenticated);
  return value;
};
