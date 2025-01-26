import { ApiResponse } from "@types-d/type"; // Adjust the import based on your types
import { baseApi } from "./baseApi";
import {
  ChangePasswordDto,
  User,
  UserForCreateDto,
  UserRequestParameters,
} from "@types-d/user";
import { UpdateProfileFormData } from "@components/modals/UpdateProfileModal";
// Adjust the import based on your DTOs

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get users with pagination
    getUsers: builder.query<ApiResponse<User[]>, UserRequestParameters>({
      query: (params) => ({
        url: "Users",
        params: {
          PageSize: params.pageSize,
          PageNumber: params.pageNumber,
          // Add any other parameters if needed
        },
      }),
    }),

    getUser: builder.query<ApiResponse<User>, void>({
      query: () => `Users/current`, // Assuming the endpoint is /Users/me
    }),
    // Get user by ID
    getUserById: builder.query<ApiResponse<User>, number>({
      query: (id) => `Users/${id}`,
    }),

    // Get user by email
    getUserByEmail: builder.query<ApiResponse<User>, string>({
      query: (email) => `Users/email/${email}`,
    }),

    // Create user
    createUser: builder.mutation<ApiResponse<User>, UserForCreateDto>({
      query: (userForCreateDto) => ({
        url: "Users",
        method: "POST",
        body: userForCreateDto,
      }),
    }),

    // Update user
    updateUser: builder.mutation<ApiResponse<User>, UpdateProfileFormData>({
      query: (userForUpdateDto) => ({
        url: `Users/current`,
        method: "PUT",
        body: userForUpdateDto,
      }),
    }),

    // Delete user
    deleteUser: builder.mutation<ApiResponse<object>, number>({
      query: (id) => ({
        url: `Users/${id}`,
        method: "DELETE",
      }),
    }),

    // Change user password
    changePassword: builder.mutation<
      ApiResponse<object>,
      { id: number; changePasswordDto: ChangePasswordDto }
    >({
      query: ({ id, changePasswordDto }) => ({
        url: `Users/${id}/changepassword`,
        method: "POST",
        body: changePasswordDto,
      }),
    }),
  }),
});

// Export hooks for usage in functional components
export const {
  useGetUserQuery,
  useGetUsersQuery,
  useGetUserByIdQuery,
  useGetUserByEmailQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useChangePasswordMutation,
} = userApi;
