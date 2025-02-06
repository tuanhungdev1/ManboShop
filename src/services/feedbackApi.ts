import { ApiResponse } from "@types-d/type";
import { baseApi } from "./baseApi";
import {
  FeedbackDto,
  FeedbackForCreateDto,
  FeedbackForUpdateDto,
  FeedbackLikeDto,
  FeedbackReportDto,
  FeedbackReportForCreateDto,
  FeedbackRequestParameters,
  ReportStatus,
} from "@types-d/feedback";

export const feedbackApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getFeedbacks: builder.query<ApiResponse<FeedbackDto[]>, void>({
      query: () => "Feedbacks",
      providesTags: ["Feedback"],
    }),

    getFeedbackById: builder.query<ApiResponse<FeedbackDto>, number>({
      query: (id) => `Feedbacks/${id}`,
    }),

    getFeedbacksByProduct: builder.query<
      ApiResponse<FeedbackDto[]>,
      {
        productId: number;
        feedbackRequestParameters: FeedbackRequestParameters;
      }
    >({
      query: ({ productId, feedbackRequestParameters }) => ({
        url: `Feedbacks/product/${productId}`,
        params: {
          PageSize: feedbackRequestParameters.pageSize,
          PageNumber: feedbackRequestParameters.pageNumber,
          OrderBy: feedbackRequestParameters.orderBy,
        },
      }),
      providesTags: ["Feedback"],
    }),

    getFeedbacksByUser: builder.query<ApiResponse<FeedbackDto[]>, number>({
      query: (userId) => `Feedbacks/user/${userId}`,
    }),

    getFeedbacksByRating: builder.query<ApiResponse<FeedbackDto[]>, number>({
      query: (rating) => `Feedbacks/rating/${rating}`,
    }),

    getAverageRating: builder.query<ApiResponse<number>, number>({
      query: (productId) => `Feedbacks/product/${productId}/average-rating`,
      providesTags: ["Feedback", "FeedbackAverage"],
    }),

    createFeedback: builder.mutation<
      ApiResponse<FeedbackDto>,
      FeedbackForCreateDto
    >({
      query: (feedbackDto) => ({
        url: "Feedbacks",
        method: "POST",
        body: feedbackDto,
      }),
      invalidatesTags: ["Feedback", "FeedbackAverage"],
    }),

    updateFeedback: builder.mutation<
      ApiResponse<FeedbackDto>,
      { id: number; feedbackDto: FeedbackForUpdateDto }
    >({
      query: ({ id, feedbackDto }) => ({
        url: `Feedbacks/${id}`,
        method: "PUT",
        body: feedbackDto,
      }),
      invalidatesTags: ["Feedback", "FeedbackAverage", "Feedback"],
    }),

    deleteFeedback: builder.mutation<ApiResponse<object>, number>({
      query: (id) => ({
        url: `Feedbacks/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Feedback", "FeedbackAverage", "Feedback"],
    }),

    likeFeedback: builder.mutation<ApiResponse<FeedbackLikeDto>, number>({
      query: (id) => ({
        url: `Feedbacks/${id}/like`,
        method: "POST",
      }),
      // Cập nhật cache sau khi like

      invalidatesTags: ["Feedback"],
    }),

    unlikeFeedback: builder.mutation<ApiResponse<object>, number>({
      query: (id) => ({
        url: `Feedbacks/${id}/like`,
        method: "DELETE",
      }),
      invalidatesTags: ["Feedback"],
    }),

    getFeedbackLikes: builder.query<ApiResponse<FeedbackLikeDto[]>, number>({
      query: (id) => `Feedbacks/${id}/likes`,
      providesTags: ["Feedback"],
    }),

    getFeedbackLikesCount: builder.query<ApiResponse<number>, number>({
      query: (id) => `Feedbacks/${id}/likes/count`,
    }),

    checkUserLiked: builder.query<ApiResponse<boolean>, number>({
      query: (id) => `Feedbacks/${id}/likes/check`,
    }),

    reportFeedback: builder.mutation<
      ApiResponse<FeedbackReportDto>,
      { id: number; reportDto: FeedbackReportForCreateDto }
    >({
      query: ({ id, reportDto }) => ({
        url: `Feedbacks/${id}/report`,
        method: "POST",
        body: reportDto,
      }),
      invalidatesTags: ["Feedback"],
    }),

    getFeedbackReports: builder.query<ApiResponse<FeedbackReportDto[]>, number>(
      {
        query: (id) => `Feedbacks/${id}/reports`,
        providesTags: ["Feedback"],
      }
    ),

    updateReportStatus: builder.mutation<
      ApiResponse<FeedbackReportDto>,
      { reportId: number; status: ReportStatus }
    >({
      query: ({ reportId, status }) => ({
        url: `Feedbacks/reports/${reportId}/status`,
        method: "PUT",
        body: status,
      }),
      invalidatesTags: ["Feedback"],
    }),

    getPendingReports: builder.query<ApiResponse<FeedbackReportDto[]>, void>({
      query: () => `Feedbacks/reports/pending`,
      providesTags: ["Feedback"],
    }),

    deleteReport: builder.mutation<ApiResponse<object>, number>({
      query: (reportId) => ({
        url: `Feedbacks/reports/${reportId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Feedback"],
    }),
  }),
});

export const {
  useGetFeedbacksQuery,
  useGetFeedbackByIdQuery,
  useGetFeedbacksByProductQuery,
  useGetFeedbacksByUserQuery,
  useGetFeedbacksByRatingQuery,
  useGetAverageRatingQuery,
  useCreateFeedbackMutation,
  useUpdateFeedbackMutation,
  useDeleteFeedbackMutation,
  useCheckUserLikedQuery,
  useDeleteReportMutation,
  useGetFeedbackLikesCountQuery,
  useGetFeedbackLikesQuery,
  useGetFeedbackReportsQuery,
  useLikeFeedbackMutation,
  useUnlikeFeedbackMutation,
} = feedbackApi;
