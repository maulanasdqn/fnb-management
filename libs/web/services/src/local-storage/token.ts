export const tokenService = {
  getAccessToken: () => localStorage.getItem('accessToken'),
  setAccessToken: (token: string) => localStorage.setItem('accessToken', token),
  removeAccessToken: () => localStorage.removeItem('accessToken'),
  getRefreshToken: () => localStorage.getItem('refreshToken'),
  setRefreshToken: (token: string) =>
    localStorage.setItem('refreshToken', token),
  removeRefreshToken: () => localStorage.removeItem('refreshToken'),
};
