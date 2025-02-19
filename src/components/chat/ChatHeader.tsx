import { IoIosArrowDown } from "react-icons/io";
import { BsRobot } from "react-icons/bs";

interface ChatHeaderProps {
  onClose: () => void;
  title: string;
}

export interface Message {
  id: string;
  content: string;
  sender: "user" | "bot";
  timestamp: Date;
}

export interface ChatBoxProps {
  title?: string;
}

export const ChatHeader = ({ onClose, title }: ChatHeaderProps) => (
  <div className="flex items-center justify-between bg-gray-800 px-5 h-[72px] text-white">
    <div className="flex items-center gap-3">
      <div className="w-[38px] h-[38px] text-xl text-black rounded-full bg-white flex items-center justify-center">
        <BsRobot />
      </div>
      <span className="text-base font-semibold">{title}</span>
    </div>
    <div
      className="cursor-pointer w-[40px] flex justify-end py-2"
      onClick={onClose}
    >
      <IoIosArrowDown />
    </div>
  </div>
);
