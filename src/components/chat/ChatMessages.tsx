import { BsRobot } from "react-icons/bs";
import { Message } from "./ChatHeader";
import { MessageLoader } from "@components/loadings";
import { useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import { CodeProps } from "react-markdown/lib/ast-to-react";
interface ChatMessagesProps {
  messages: Message[];
  isLoading: boolean;
}

const formatMessage = (content: string) => {
  const paragraphs = content.split("\n").filter((p) => p.trim().length > 0);

  const sentences = content.split(".").filter((s) => s.trim().length > 0);

  if (paragraphs.length > 1) {
    return paragraphs;
  }

  if (sentences.length > 1) {
    return sentences;
  }

  return [content];
};
export const ChatMessages = ({ messages, isLoading }: ChatMessagesProps) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.scrollTop = ref.current.scrollHeight;
    }
  }, [messages, isLoading]);

  return (
    <div
      ref={ref}
      className="flex-1 px-5 max-w-full py-3 gap-5 overflow-y-auto flex flex-col text-black text-sm font-medium"
    >
      {messages.map((message) =>
        message.sender === "bot" ? (
          <div key={message.id} className="flex items-end gap-3 w-full">
            <div className="w-[38px] h-[38px] min-w-[38px] text-xl text-white rounded-full bg-gray-800 flex items-center justify-center">
              <BsRobot />
            </div>
            <div className="py-3 px-4 rounded-bl-none rounded-tl-xl rounded-br-xl rounded-lg bg-gray-100 max-w-[85%] break-words">
              <ReactMarkdown
                className="text-sm overflow-hidden"
                components={{
                  p: ({ children }) => (
                    <span className="block mb-2 break-words whitespace-pre-wrap">
                      {children}
                    </span>
                  ),
                  code: ({ inline, children, ...props }: CodeProps) =>
                    inline ? (
                      <code
                        className="bg-gray-200 px-1 rounded text-sm"
                        {...props}
                      >
                        {children}
                      </code>
                    ) : (
                      <pre className="bg-gray-800 text-white p-2 rounded-lg text-sm my-2 whitespace-pre-wrap break-words">
                        <code {...props}>{children}</code>
                      </pre>
                    ),
                  ul: ({ children }) => (
                    <ul className="list-disc ml-4 mb-2 break-words">
                      {children}
                    </ul>
                  ),
                  ol: ({ children }) => (
                    <ol className="list-decimal ml-4 mb-2 break-words">
                      {children}
                    </ol>
                  ),
                  li: ({ children }) => (
                    <li className="mb-1 break-words">{children}</li>
                  ),
                }}
              >
                {message.content}
              </ReactMarkdown>
            </div>
          </div>
        ) : (
          <div key={message.id} className="flex justify-end">
            <div className="py-3 px-4 rounded-br-none rounded-lg rounded-tr-xl rounded-bl-xl text-white bg-gray-800">
              <ReactMarkdown
                className="text-sm text-white"
                components={{
                  p: ({ children }) => <span>{children}</span>,
                }}
              >
                {message.content}
              </ReactMarkdown>
            </div>
          </div>
        )
      )}

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
