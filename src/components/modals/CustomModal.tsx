import { Dialog, DialogContent } from "@mui/material";
import { BsCheckCircleFill } from "react-icons/bs";
import { ButtonComponent } from "@components/buttons";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { IoMdClose } from "react-icons/io";
import { MdError } from "react-icons/md";
import { ReactNode } from "react";

export type ModalStatus = "loading" | "success" | "error";

interface CustomModalProps {
  isOpen: boolean;
  onClose?: () => void;
  status?: ModalStatus;
  title?: string;
  message?: string | ReactNode;
  primaryButton?: {
    label: string;
    onClick: () => void;
  };
  secondaryButton?: {
    label: string;
    onClick: () => void;
  };
  showCloseButton?: boolean;
  customIcon?: ReactNode;
  className?: string;
}

const getStatusIcon = (status: ModalStatus, customIcon?: ReactNode) => {
  if (customIcon) return customIcon;

  switch (status) {
    case "loading":
      return <AiOutlineLoading3Quarters className="text-3xl animate-spin" />;
    case "success":
      return <BsCheckCircleFill className="text-3xl text-green-500" />;
    case "error":
      return <MdError className="text-3xl text-red-500" />;
    default:
      return null;
  }
};

const CustomModal: React.FC<CustomModalProps> = ({
  isOpen,
  onClose,
  status = "success",
  title,
  message,
  primaryButton,
  secondaryButton,
  showCloseButton = true,
  customIcon,
  className,
}) => {
  return (
    <Dialog
      open={isOpen}
      onClose={() => status !== "loading" && onClose?.()}
      maxWidth="xs"
      fullWidth
      PaperProps={{
        className: `rounded-xl p-6 ${className}`,
      }}
      BackdropProps={{
        className: "backdrop-blur-sm bg-black/80",
      }}
    >
      <DialogContent className="flex flex-col items-center text-center p-0">
        {showCloseButton && status !== "loading" && (
          <button
            onClick={onClose}
            className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
          >
            <IoMdClose size={24} />
          </button>
        )}

        <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
          {getStatusIcon(status, customIcon)}
        </div>

        {title && <h2 className="text-2xl font-semibold mb-2">{title}</h2>}

        {message && <div className="text-gray-600 mb-6 text-sm">{message}</div>}

        <div className="w-full space-y-3">
          {primaryButton && (
            <ButtonComponent
              onClick={primaryButton.onClick}
              className="w-full"
              disabled={status === "loading"}
            >
              {primaryButton.label}
            </ButtonComponent>
          )}

          {secondaryButton && (
            <ButtonComponent
              onClick={secondaryButton.onClick}
              className="w-full"
              disabled={status === "loading"}
            >
              {secondaryButton.label}
            </ButtonComponent>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CustomModal;
