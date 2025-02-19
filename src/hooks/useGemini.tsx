// hooks/useGemini.ts
import { Message } from "@components/chat/ChatHeader";
import { useState, useCallback } from "react";
import { v4 as uuidv4 } from "uuid";
import { useGenerateAiResponseMutation } from "../services/geminiApi";

export const useGemini = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: uuidv4(),
      content: "Hey there! How can I help you today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);

  const [generateAiResponse, { isLoading }] = useGenerateAiResponseMutation();

  const sendMessage = useCallback(
    async (content: string) => {
      try {
        const userMessage: Message = {
          id: uuidv4(),
          content,
          sender: "user",
          timestamp: new Date(),
        };

        setMessages((prev) => [...prev, userMessage]);

        const response = await generateAiResponse(content).unwrap();

        if (response.success && response.data) {
          const botMessage: Message = {
            id: uuidv4(),
            content: response.data,
            sender: "bot",
            timestamp: new Date(),
          };

          setMessages((prev) => [...prev, botMessage]);
        } else {
          throw new Error(response.message || response.errors?.[0]);
        }
      } catch (error) {
        console.error("Error sending message:", error);
        const errorMessage: Message = {
          id: uuidv4(),
          content: "Sorry, I couldn't process your request. Please try again.",
          sender: "bot",
          timestamp: new Date(),
        };

        setMessages((prev) => [...prev, errorMessage]);
      }
    },
    [generateAiResponse]
  );

  return {
    messages,
    isLoading,
    sendMessage,
  };
};
