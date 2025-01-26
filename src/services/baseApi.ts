// services/baseApi.ts
import { RootState } from "@redux/store";
import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { createApi } from "@reduxjs/toolkit/query/react";

const customBaseQuery = async (args: any, api: any, extraOptions: any) => {
  // Log the request details
  console.log("Request URL:", api.endpoint);
  console.log("Request Headers:", api.headers);
  console.log("Request Arguments:", args);

  // Call the default fetchBaseQuery
  const result = await fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const state = getState() as RootState;
      const token = state.auth.accessToken;
      console.log(token === localStorage.getItem("accessToken"));
      if (token) {
        console.log(`Bearer ${token}`);
        headers.set("Authorization", `Bearer ${token}`);
      }
      headers.set("Content-Type", "application/json; charset=utf-8");
      headers.set("Accept", "application/json");
      return headers;
    },
  })(args, api, extraOptions);

  return result;
};

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: customBaseQuery,
  endpoints: () => ({}),
});
