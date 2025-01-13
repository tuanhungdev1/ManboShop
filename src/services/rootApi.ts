import { RootState } from "@redux/store";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const rootApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      console.log({ store: getState() });
      const state = getState() as RootState;
      const token = state.auth.accessToken;

      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => {
    return {
      register: builder.mutation({
        query: ({ email, password, confirmPassword, username }) => {
          return {
            url: "/signup",
            body: { username, email, password, confirmPassword },
            method: "POST",
          };
        },
      }),
    };
  },
});
