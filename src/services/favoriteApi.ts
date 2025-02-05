import { ApiResponse } from "@types-d/type";
import { baseApi } from "./baseApi";
import { Favorite } from "@types-d/favorite";
import { Product } from "@types-d/product";

export const favoriteApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addProductFavorite: builder.mutation<ApiResponse<object>, Favorite>({
      query: (favorite) => ({
        url: "Favorite",
        method: "POST",
        body: favorite,
      }),
      invalidatesTags: ["User"],
    }),

    getFavoritesProduct: builder.query<ApiResponse<Product[]>, void>({
      query: () => "Favorite",
    }),

    removeProductFavorite: builder.mutation<ApiResponse<object>, Favorite>({
      query: (favorite) => ({
        url: "Favorite",
        method: "DELETE",
        body: favorite,
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useAddProductFavoriteMutation,
  useGetFavoritesProductQuery,
  useRemoveProductFavoriteMutation,
} = favoriteApi;
