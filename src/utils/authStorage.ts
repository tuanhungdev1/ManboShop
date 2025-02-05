import { Token } from "@types-d/type";

export const authStorage = {
  saveAuthData: (data: Token, isRemember: boolean) => {
    const storage = isRemember ? localStorage : sessionStorage;
    storage.setItem("auth", JSON.stringify(data));
  },

  getAuthData: (): Token | null => {
    const data = localStorage.getItem("auth") || sessionStorage.getItem("auth");
    return data ? JSON.parse(data) : null;
  },

  clearAuthData: () => {
    localStorage.removeItem("auth");
    sessionStorage.removeItem("auth");
  },

  saveSessionTokens: (token: Token) => {
    sessionStorage.setItem("auth", JSON.stringify(token));
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
