import { ApiResponse } from "@types-d/type";
import { baseApi } from "./baseApi";
import { Product, ProductRequestParameters } from "@types-d/product";

export const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query<
      ApiResponse<Product[]>,
      ProductRequestParameters
    >({
      query: (params) => {
        const queryParams = new URLSearchParams();

        // Chỉ thêm params có giá trị
        if (params.PageSize)
          queryParams.append("PageSize", params.PageSize.toString());
        if (params.PageNumber)
          queryParams.append("PageNumber", params.PageNumber.toString());
        if (params.SearchTerm)
          queryParams.append("SearchTerm", params.SearchTerm);
        if (params.OrderBy) queryParams.append("OrderBy", params.OrderBy);
        if (params.Brands) queryParams.append("Brands", params.Brands);
        if (params.Colors) queryParams.append("Colors", params.Colors);
        if (params.Sizes) queryParams.append("Sizes", params.Sizes);
        if (params.Categories)
          queryParams.append("Categories", params.Categories);
        if (params.PriceRange)
          queryParams.append("PriceRange", params.PriceRange);

        return {
          url: `Products?${queryParams.toString()}`,
          method: "GET",
          // Có thể thêm headers nếu cần
          headers: {
            "Content-Type": "application/json",
          },
        };
      },
      // Thêm để invalidate cache khi cần
      providesTags: ["Products"],
    }),

    // Get product by ID
    getProduct: builder.query<ApiResponse<Product>, number>({
      query: (id) => `Products/${id}`,
    }),
    // Get product by SLUG NAME
    getProductBySlugName: builder.query<ApiResponse<Product>, string>({
      query: (slug) => `Products/bySlug/${slug}`,
    }),
    // Get products by category
    getProductsByCategory: builder.query<ApiResponse<Product[]>, number>({
      query: (categoryId) => `Products/category/${categoryId}`,
    }),

    // Get products by brand
    getProductsByBrand: builder.query<ApiResponse<Product[]>, number>({
      query: (brandId) => `Products/brand/${brandId}`,
    }),

    // Create new product
    createProduct: builder.mutation<
      ApiResponse<Product>,
      FormData // Using FormData because endpoint accepts multipart/form-data
    >({
      query: (productData) => ({
        url: "Products",
        method: "POST",
        body: productData,
      }),
    }),

    // Update product
    updateProduct: builder.mutation<
      ApiResponse<Product>,
      { id: number; productData: FormData }
    >({
      query: ({ id, productData }) => ({
        url: `Products/${id}`,
        method: "PUT",
        body: productData,
      }),
    }),

    // Delete product
    deleteProduct: builder.mutation<ApiResponse<void>, number>({
      query: (id) => ({
        url: `Products/${id}`,
        method: "DELETE",
      }),
    }),

    // Update product quantity
    updateProductQuantity: builder.mutation<
      ApiResponse<{ id: number; quantity: number }>,
      { id: number; quantity: number }
    >({
      query: ({ id, quantity }) => ({
        url: `Products/${id}/quantity`,
        method: "PUT",
        body: { quantity },
      }),
    }),
  }),
});

// Export hooks for usage in components
export const {
  useGetProductsQuery,
  useGetProductQuery,
  useGetProductBySlugNameQuery,
  useGetProductsByCategoryQuery,
  useGetProductsByBrandQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useUpdateProductQuantityMutation,
} = productApi;
