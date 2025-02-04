export const authStorage = {
  saveAuthData: (data: object, isRemember: boolean) => {
    const storage = isRemember ? localStorage : sessionStorage;
    storage.setItem("auth", JSON.stringify(data));
  },

  getAuthData: (): object | null => {
    const data = localStorage.getItem("auth") || sessionStorage.getItem("auth");
    return data ? JSON.parse(data) : null;
  },

  clearAuthData: () => {
    localStorage.removeItem("auth");
    sessionStorage.removeItem("auth");
  },

  saveTokens: (
    accessToken: string,
    refreshToken: string,
    isRemember: boolean
  ) => {
    const storage = isRemember ? localStorage : sessionStorage;
    storage.setItem("accessToken", accessToken);
    storage.setItem("refreshToken", refreshToken);
  },

  getAccessToken: (): string | null => {
    return (
      localStorage.getItem("accessToken") ||
      sessionStorage.getItem("accessToken")
    );
  },

  getRefreshToken: (): string | null => {
    return (
      localStorage.getItem("refreshToken") ||
      sessionStorage.getItem("refreshToken")
    );
  },
};
