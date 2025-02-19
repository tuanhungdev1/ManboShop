// services/geminiApi.ts
import { ApiResponse } from "@types-d/type";
import { baseApi } from "./baseApi";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(
  import.meta.env.VITE_PUBLIC_GEMINI_API_KEY || ""
);

// Tạo prompt template để format phản hồi
const createPrompt = (message: string) => `
Please provide a clear and concise response to the following message:
"${message}"

Guidelines for the response:
- Use proper paragraphs and line breaks
- Keep sentences clear and well-structured
- Use bullet points for lists if needed
- Maintain a friendly and helpful tone
- Format code blocks with proper indentation if included
`;

const formatResponse = (text: string): string => {
  // Loại bỏ khoảng trắng thừa
  let formatted = text.trim();

  // Xử lý bullet points
  formatted = formatted.replace(/•/g, "- ");

  // Đảm bảo khoảng cách sau dấu chấm
  formatted = formatted.replace(/\./g, ". ");

  // Xử lý xuống dòng
  formatted = formatted.replace(/\n{3,}/g, "\n\n");

  return formatted;
};

export const geminiApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    generateAiResponse: builder.mutation<ApiResponse<string>, string>({
      queryFn: async (message) => {
        try {
          const model = genAI.getGenerativeModel({ model: "gemini-pro" });
          const prompt = createPrompt(message);
          const result = await model.generateContent(prompt);
          const response = await result.response;
          const text = await response.text();

          const formattedText = formatResponse(text);

          return {
            data: {
              statusCode: 200,
              success: true,
              message: "Response generated successfully",
              data: formattedText,
            },
          };
        } catch (error: any) {
          return {
            error: {
              status: 500,
              data: {
                statusCode: 500,
                success: false,
                message: error.message || "Failed to generate response",
                errors: [error.message || "Unknown error occurred"],
              },
            },
          };
        }
      },
    }),
  }),
});

export const { useGenerateAiResponseMutation } = geminiApi;
