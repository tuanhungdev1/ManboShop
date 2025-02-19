// services/geminiApi.ts
import { ApiResponse } from "@types-d/type";
import { baseApi } from "./baseApi";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(
  import.meta.env.VITE_PUBLIC_GEMINI_API_KEY || ""
);

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

          return {
            data: {
              statusCode: 200,
              success: true,
              message: "Response generated successfully",
              data: text,
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
