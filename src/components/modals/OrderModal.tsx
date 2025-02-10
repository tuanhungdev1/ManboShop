import { Dialog, DialogContent } from "@mui/material";
import { BsCheckCircleFill } from "react-icons/bs";
import { ButtonComponent } from "@components/buttons";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

interface OrderModalProps {
  isOpen: boolean;
  isLoading: boolean;
  onClose: () => void;
  onBackToHome: () => void;
}

const OrderModal: React.FC<OrderModalProps> = ({
  isOpen,
  isLoading,
  onClose,
  onBackToHome,
}) => {
  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      maxWidth="xs"
      fullWidth
      PaperProps={{
        style: {
          backgroundColor: "white",
          borderRadius: "12px",
          padding: "24px",
        },
      }}
      BackdropProps={{
        style: {
          backgroundColor: "rgba(0, 0, 0, 0.8)",
          backdropFilter: "blur(4px)",
        },
      }}
    >
      <DialogContent className="flex flex-col items-center text-center">
        {isLoading ? (
          <>
            <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
              <AiOutlineLoading3Quarters className="text-3xl animate-spin text-black" />
            </div>
            <h2 className="text-2xl font-semibold mb-2">Processing Order</h2>
            <p className="text-gray-600 text-sm">
              Please wait while we process your order...
            </p>
          </>
        ) : (
          <>
            <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
              <BsCheckCircleFill className="text-3xl text-black" />
            </div>
            <h2 className="text-2xl font-semibold mb-2">
              Your order is confirmed
            </h2>
            <p className="text-gray-600 mb-6 text-sm">
              Thanks for shopping! Your order hasn't shipped yet,
              <br />
              but we will send you an email when it does.
            </p>
            <div className="w-full space-y-3">
              <ButtonComponent onClick={onBackToHome} className="w-full">
                Back to Home
              </ButtonComponent>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default OrderModal;
