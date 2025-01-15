import { ApiResponse } from "@types-d/type";
import { baseApi } from "./baseApi";
import {
  Category,
  CategoryForCreateDto,
  CategoryForUpdateDto,
  CategoryRequestParameters,
} from "@types-d/category";

export const categoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query<
      ApiResponse<Category[]>,
      CategoryRequestParameters
    >({
      query: (params) => ({
        url: "Categories",
        params: {
          PageSize: params.pageSize,
          PageNumber: params.pageNumber,
          OrderBy: params.orderBy,
        },
      }),
    }),

    // Get category by ID
    getCategoryById: builder.query<ApiResponse<Category>, number>({
      query: (id) => `Categories/${id}`,
    }),

    // Get category by name
    getCategoryByName: builder.query<ApiResponse<Category>, string>({
      query: (name) => `Categories/name/${name}`,
    }),

    // Create category
    createCategory: builder.mutation<ApiResponse<object>, CategoryForCreateDto>(
      {
        query: (category) => ({
          url: "Categories",
          method: "POST",
          body: category,
        }),
      }
    ),

    // Update category
    updateCategory: builder.mutation<
      ApiResponse<object>,
      { id: number; category: CategoryForUpdateDto }
    >({
      query: ({ id, category }) => ({
        url: `Categories/${id}`,
        method: "PUT",
        body: category,
      }),
    }),

    deleteCategory: builder.mutation<ApiResponse<object>, number>({
      query: (id) => ({
        url: `Categories/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useGetCategoryByIdQuery,
  useGetCategoryByNameQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = categoryApi;
