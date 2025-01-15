import { ApiResponse } from "@types-d/type";
import { baseApi } from "./baseApi";
import {
  Brand,
  BrandForCreateDto,
  BrandForUpdateDto,
  BrandRequestParameters,
} from "@types-d/brand";

export const brandApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getBrands: builder.query<ApiResponse<Brand[]>, BrandRequestParameters>({
      query: (params) => ({
        url: "Brand",
        params: {
          PageSize: params.pageSize,
          PageNumber: params.pageNumber,
          OrderBy: params.orderBy,
        },
      }),
    }),

    // Get brand by ID
    getBrandById: builder.query<ApiResponse<Brand>, number>({
      query: (id) => `Brand/${id}`,
    }),

    // Get brand by name
    getBrandByName: builder.query<ApiResponse<Brand>, string>({
      query: (name) => `Brand/name/${name}`,
    }),

    // Create brand
    createBrand: builder.mutation<ApiResponse<object>, BrandForCreateDto>({
      query: (brand) => ({
        url: "Brand",
        method: "POST",
        body: brand,
      }),
    }),

    // Update brand
    updateBrand: builder.mutation<
      ApiResponse<object>,
      { id: number; brand: BrandForUpdateDto }
    >({
      query: ({ id, brand }) => ({
        url: `Brand/${id}`,
        method: "PUT",
        body: brand,
      }),
    }),

    // Delete brand
    deleteBrand: builder.mutation<ApiResponse<object>, number>({
      query: (id) => ({
        url: `Brand/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetBrandsQuery,
  useGetBrandByIdQuery,
  useGetBrandByNameQuery,
  useCreateBrandMutation,
  useUpdateBrandMutation,
  useDeleteBrandMutation,
} = brandApi;
