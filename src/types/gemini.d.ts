export interface GeminiResponse {
  text: string;
  status: "success" | "error";
}

export interface ChatRequestParameters {
  prompt: string;
  model?: string;
  temperature?: number;
  maxTokens?: number;
}

export interface ChatHistoryItem {
  role: "user" | "assistant";
  content: string;
}

export interface ChatRequest {
  messages: ChatHistoryItem[];
  parameters?: {
    temperature?: number;
    maxTokens?: number;
  };
}
