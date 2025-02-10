import { ApiResponse } from "@types-d/type";
import { baseApi } from "./baseApi";
import {
  Cart,
  CartItem,
  CartItemForCreate,
  CartItemForUpdate,
} from "@types-d/cart";
import { OrderDto, OrderForCreateDto } from "@types-d/order";

export const cartApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCart: builder.query<ApiResponse<Cart>, void>({
      query: () => "Cart",
      providesTags: ["Cart"],
    }),

    getCartBySessionId: builder.query<ApiResponse<Cart>, string>({
      query: (sessionId) => `Cart/session/${sessionId}`,
    }),

    getCartByUserId: builder.query<ApiResponse<Cart>, number>({
      query: (userId) => `Cart/user/${userId}`,
    }),

    mergeSessionCartToUserCart: builder.mutation<ApiResponse<object>, number>({
      query: (userId) => ({
        url: `Cart/merge-to-user/${userId}`,
        method: "POST",
      }),
    }),

    addItemToCart: builder.mutation<ApiResponse<CartItem>, CartItemForCreate>({
      query: (cartItem) => ({
        url: "Cart/items",
        method: "POST",
        body: cartItem,
      }),
      invalidatesTags: ["Cart"],
    }),

    updateCartItem: builder.mutation<
      ApiResponse<CartItem>,
      { itemId: number; cartItem: CartItemForUpdate }
    >({
      query: ({ itemId, cartItem }) => ({
        url: `Cart/items/${itemId}`,
        method: "PUT",
        body: cartItem,
      }),
      invalidatesTags: ["Cart"],
    }),

    removeCartItem: builder.mutation<ApiResponse<object>, number>({
      query: (itemId) => ({
        url: `Cart/items/${itemId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Cart"],
    }),

    checkoutCart: builder.mutation<ApiResponse<OrderDto>, OrderForCreateDto>({
      query: (orderForCreateDto) => ({
        url: "Cart/checkout",
        method: "POST",
        body: orderForCreateDto,
      }),
      invalidatesTags: ["Cart", "User"],
    }),

    clearCart: builder.mutation<ApiResponse<object>, void>({
      query: () => ({
        url: "Cart/clear",
        method: "POST",
      }),
    }),
  }),
});

export const {
  useGetCartQuery,
  useGetCartBySessionIdQuery,
  useGetCartByUserIdQuery,
  useMergeSessionCartToUserCartMutation,
  useAddItemToCartMutation,
  useUpdateCartItemMutation,
  useRemoveCartItemMutation,
  useClearCartMutation,
  useCheckoutCartMutation,
} = cartApi;
