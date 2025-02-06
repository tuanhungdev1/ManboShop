import { ApiResponse } from "@types-d/type";
import { baseApi } from "./baseApi";
import { Product, ProductRequestParameters } from "@types-d/product";

export const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get all products with filters
    getProducts: builder.query<
      ApiResponse<Product[]>,
      ProductRequestParameters
    >({
      query: (params) => ({
        url: "Products",
        params: {
          PageSize: params.pageSize,
          PageNumber: params.pageNumber,
          SearchTerm: params.searchTerm,
          OrderBy: params.orderBy,
          Brands: params.brands,
          Colors: params.colors,
          Sizes: params.sizes,
          Categories: params.categories,
          PriceRange: params.priceRange,
        },
      }),
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
