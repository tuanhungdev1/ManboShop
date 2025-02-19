// ChatInput.tsx
import { IoArrowUp } from "react-icons/io5";
import { useState } from "react";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
}

export const ChatInput = ({ onSendMessage, isLoading }: ChatInputProps) => {
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (input.trim() && !isLoading) {
      onSendMessage(input);
      setInput("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex items-center justify-center px-5 py-4">
      <div className="flex items-center w-full border-[2px] pr-[4px] rounded-full overflow-hidden">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Message..."
          className="outline-none border-none text-base flex-1 h-[50px] px-5 placeholder:text-base"
          disabled={isLoading}
          spellCheck={false}
        />
        <button
          onClick={handleSend}
          disabled={isLoading}
          className="flex items-center justify-center h-[42px] w-[42px] cursor-pointer rounded-full bg-gray-900 text-white disabled:opacity-50"
        >
          <IoArrowUp />
        </button>
      </div>
    </div>
  );
};
