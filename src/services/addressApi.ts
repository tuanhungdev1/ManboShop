import { ApiResponse } from "@types-d/type";
import { baseApi } from "./baseApi";
import {
  AddressDto,
  AddressForCreateDto,
  AddressForUpdateDto,
} from "@types-d/address";

export const addressApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUserAddresses: builder.query<ApiResponse<AddressDto[]>, void>({
      query: () => "Address",
      providesTags: ["Address"],
    }),

    getAddressById: builder.query<ApiResponse<AddressDto>, number>({
      query: (id) => `Address/${id}`,
    }),

    getDefaultAddress: builder.query<ApiResponse<AddressDto>, void>({
      query: () => "Address/default",
    }),

    createAddress: builder.mutation<
      ApiResponse<AddressDto>,
      AddressForCreateDto
    >({
      query: (addressDto) => ({
        url: "Address",
        method: "POST",
        body: addressDto,
      }),
      invalidatesTags: ["Address"],
    }),

    updateAddress: builder.mutation<
      ApiResponse<AddressDto>,
      { id: number; addressDto: AddressForUpdateDto }
    >({
      query: ({ id, addressDto }) => ({
        url: `Address/${id}`,
        method: "PUT",
        body: addressDto,
      }),
      invalidatesTags: ["Address"],
    }),

    deleteAddress: builder.mutation<ApiResponse<object>, number>({
      query: (id) => ({
        url: `Address/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Address"],
    }),

    setDefaultAddress: builder.mutation<ApiResponse<AddressDto>, number>({
      query: (id) => ({
        url: `Address/${id}/default`,
        method: "PUT",
      }),
      invalidatesTags: ["Address"],
    }),
  }),
});

export const {
  useGetUserAddressesQuery,
  useGetAddressByIdQuery,
  useGetDefaultAddressQuery,
  useCreateAddressMutation,
  useUpdateAddressMutation,
  useDeleteAddressMutation,
  useSetDefaultAddressMutation,
} = addressApi;
