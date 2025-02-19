import { BsRobot } from "react-icons/bs";
import { Message } from "./ChatHeader";
import { MessageLoader } from "@components/loadings";
import { useEffect, useRef } from "react";

interface ChatMessagesProps {
  messages: Message[];
  isLoading: boolean;
}

export const ChatMessages = ({ messages, isLoading }: ChatMessagesProps) => {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (ref.current) {
      ref.current.scrollTop = ref.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const splitShoeSizes = (content: string) => {
    const items = content
      .split("-")
      .map((item) => {
        return item.trim();
      })
      .filter((item) => item.length > 0);

    return items;
  };
  return (
    <div
      ref={ref}
      className="flex-1 px-5 py-3 gap-5 overflow-y-auto flex flex-col text-black text-sm font-medium"
    >
      {messages.map((message) =>
        message.sender === "bot" ? (
          <div key={message.id} className="flex items-end gap-3">
            <div className="w-[38px] h-[38px] min-w-[38px] text-xl text-white rounded-full bg-gray-800 flex items-center justify-center">
              <BsRobot />
            </div>
            <div className="py-3 flex flex-col gap-1 px-4 rounded-bl-none rounded-tl-xl rounded-br-xl rounded-lg bg-gray-100">
              {splitShoeSizes(message.content).map((item, index) => {
                let contents = item
                  .split("**")
                  .map((i) => i.trim())
                  .filter((i) => i.length > 0);

                return (
                  <div key={index} className="mb-2">
                    {contents.length === 2 && (
                      <div>
                        <span className="font-bold">{`${contents[0]} `}</span>
                        <span>{contents[1]}</span>
                      </div>
                    )}
                    {contents.length === 1 && (
                      <div>
                        <span className="">{item}</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <div key={message.id} className="flex justify-end">
            <div className="py-3 flex flex-col gap-1 px-4 rounded-br-none rounded-lg rounded-tr-xl rounded-bl-xl text-white bg-gray-800">
              <div>{message.content}</div>
            </div>
          </div>
        )
      )}

      {/* Hiển thị tin nhắn "thinking..." hoặc biểu tượng loading nếu đang tải */}
      {isLoading && (
        <div className="flex items-end gap-3">
          <div className="w-[38px] h-[38px] min-w-[38px] text-xl text-white rounded-full bg-gray-800 flex items-center justify-center">
            <BsRobot />
          </div>
          <div className="py-2 flex items-center justify-center gap-1 px-4 rounded-bl-none rounded-tl-xl rounded-br-xl rounded-lg bg-gray-100">
            <MessageLoader />
          </div>
        </div>
      )}
    </div>
  );
};
