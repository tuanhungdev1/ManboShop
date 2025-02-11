import { ApiResponse } from "@types-d/type";
import { baseApi } from "./baseApi";
import {
  OrderCancelDto,
  OrderDto,
  OrderForCreateDto,
  OrderForUserRequestParameters,
} from "@types-d/order";

export const orderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getOrders: builder.query<ApiResponse<OrderDto[]>, void>({
      query: () => "Order",
      providesTags: ["Order"],
    }),

    getOrderById: builder.query<ApiResponse<OrderDto>, string>({
      query: (orderId) => `Order/${orderId}`,
      providesTags: ["Order"],
    }),

    getOrdersByUserId: builder.query<
      ApiResponse<OrderDto[]>,
      OrderForUserRequestParameters
    >({
      query: (params) => ({
        url: `Order/user`,
        params: {
          PageSize: 1000000,
          PageNumber: 1,
          SearchTerm: params.searchTerm,
          OrderBy: params.orderBy,
        },
      }),

      providesTags: ["Order"],
    }),

    createOrder: builder.mutation<ApiResponse<OrderDto>, OrderForCreateDto>({
      query: (orderData) => ({
        url: "Order",
        method: "POST",
        body: orderData,
      }),
      invalidatesTags: ["Order", "Cart"],
    }),

    // updateOrderStatus: builder.mutation<
    //   ApiResponse<OrderDto>,
    //   { orderId: string; statusData: OrderStatusUpdateDto }
    // >({
    //   query: ({ orderId, statusData }) => ({
    //     url: `Order/${orderId}/status`,
    //     method: "PUT",
    //     body: statusData,
    //   }),
    //   invalidatesTags: ["Order"],
    // }),

    cancelOrder: builder.mutation<ApiResponse<object>, OrderCancelDto>({
      query: ({ id, orderForCancelDto }) => ({
        url: `Order/${id}/cancel`,
        method: "PUT",
        body: orderForCancelDto,
      }),
      invalidatesTags: ["Order"],
    }),

    deleteOrder: builder.mutation<ApiResponse<object>, string>({
      query: (orderId) => ({
        url: `Order/${orderId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Order"],
    }),
  }),
});

export const {
  useGetOrdersQuery,
  useGetOrderByIdQuery,
  useGetOrdersByUserIdQuery,
  useCreateOrderMutation,
  //   useUpdateOrderStatusMutation,
  useCancelOrderMutation,
  useDeleteOrderMutation,
} = orderApi;
