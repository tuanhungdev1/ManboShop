import { useState } from "react";
import { IoChatboxEllipses } from "react-icons/io5";
import { CgClose } from "react-icons/cg";
import { cn } from "@utils/cn";
import { ChatBoxProps, ChatHeader } from "./ChatHeader";
import { ChatMessages } from "./ChatMessages";
import { ChatInput } from "./ChatInput";
import { useGemini } from "@hooks/useGemini";

const ChatBoxAi = ({ title = "Chatbot" }: ChatBoxProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { messages, isLoading, sendMessage } = useGemini();

  const toggleOpenChatbot = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <>
      <div
        onClick={toggleOpenChatbot}
        className="fixed transition-all cursor-pointer duration-200 bottom-[30px] right-[22px] select-none"
      >
        <div>
          <div
            className={cn(
              "w-[50px] h-[50px] text-[24px] relative flex items-center justify-center rounded-full bg-gray-800 text-white"
            )}
          >
            <IoChatboxEllipses
              className={cn(
                "transition-all duration-300 ease-in-out absolute",
                !isOpen
                  ? "opacity-100 visible scale-100"
                  : "opacity-0 invisible scale-75"
              )}
            />
            <CgClose
              className={cn(
                "transition-all duration-300 ease-in-out absolute",
                isOpen
                  ? "rotate-0 opacity-100 visible scale-100"
                  : "-rotate-180 invisible opacity-0 scale-75"
              )}
            />
          </div>
        </div>
      </div>
      {isOpen && (
        <div
          className={cn(
            "fixed flex-col flex transition-all duration-200 right-[22px] bottom-[100px] w-[420px] h-[580px] rounded-xl shadow-lg bg-white overflow-hidden",
            isOpen ? "opacity-100 visible" : "opacity-0 invisible scale-75"
          )}
        >
          <ChatHeader title={title} onClose={toggleOpenChatbot} />
          <ChatMessages messages={messages} isLoading={isLoading} />
          <ChatInput onSendMessage={sendMessage} isLoading={isLoading} />
        </div>
      )}
    </>
  );
};

export default ChatBoxAi;
