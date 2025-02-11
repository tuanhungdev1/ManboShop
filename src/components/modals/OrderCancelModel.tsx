import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import { useState } from "react";
import CustomModal, { ModalStatus } from "./CustomModal";
import { useNavigate } from "react-router-dom";

const OrderCanceledSuccessModal = ({
  isOpen,
  onClose,
  onBackToOrderPage,
}: {
  isOpen: boolean;
  onClose: () => void;
  onBackToOrderPage: () => void;
}) => (
  <CustomModal
    isOpen={isOpen}
    onClose={onClose}
    status="success"
    title="Your order has been canceled"
    message={
      <>
        Your order has been successfully canceled.
        <br />
        If you have any questions, please contact our support team.
      </>
    }
    secondaryButton={{
      label: "Back to My Orders",
      onClick: onBackToOrderPage,
    }}
  />
);

const LoadingCancelModal = ({ isOpen }: { isOpen: boolean }) => (
  <CustomModal
    isOpen={isOpen}
    status="loading"
    title="Canceling Order"
    message="Please wait while we process your cancellation request..."
    showCloseButton={false}
  />
);

const ErrorCancelModal = ({
  isOpen,
  onClose,
  onRetry,
}: {
  isOpen: boolean;
  onClose: () => void;
  onRetry: () => void;
}) => (
  <CustomModal
    isOpen={isOpen}
    onClose={onClose}
    status="error"
    title="Cancellation Failed"
    message="There was an issue canceling your order. Please try again."
    primaryButton={{
      label: "Try Again",
      onClick: onRetry,
    }}
    secondaryButton={{
      label: "Close",
      onClick: onClose,
    }}
  />
);

const CANCEL_REASONS = [
  "Changed my mind",
  "Found a better price elsewhere",
  "Delivery taking too long",
  "Product not as described",
  "Ordered by mistake",
  "Other",
];

interface OrderCancelModalProps {
  open: boolean;
  onClose: () => void;
  onConfirmCancel: (reason: string) => void;
  orderId: number;
}

const OrderCancelModel: React.FC<OrderCancelModalProps> = ({
  open,
  onClose,
  onConfirmCancel,
  orderId,
}) => {
  const [selectedReason, setSelectedReason] = useState("");
  const [customReason, setCustomReason] = useState("");
  const [error, setError] = useState(false);
  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    status: ModalStatus;
  }>({
    isOpen: false,
    status: "loading",
  });

  const navigate = useNavigate();

  const handleReasonChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedReason(event.target.value);
    setError(false);
  };

  const onBackToOrderPage = () => {
    setModalState({
      isOpen: false,
      status: "success",
    });
    onClose();
    navigate("/user/orders");
  };

  const handleConfirmCANCEL = async () => {
    if (!selectedReason) {
      setError(true);
      return;
    }

    const finalReason =
      selectedReason === "Other" ? customReason : selectedReason;

    setModalState({
      isOpen: true,
      status: "loading",
    });
    try {
      await onConfirmCancel(finalReason);
      setModalState({
        isOpen: true,
        status: "success",
      });
    } catch (error: any) {
      setModalState({
        isOpen: true,
        status: "error",
      });
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle className="text-center font-bold text-xl text-red-600">
        Cancel Order #{orderId}
      </DialogTitle>

      <DialogContent>
        <FormControl
          component="fieldset"
          fullWidth
          error={error}
          className="mb-4"
        >
          <FormLabel
            component="legend"
            className="text-base font-semibold mb-2"
          >
            Reason for Cancellation
          </FormLabel>

          <RadioGroup value={selectedReason} onChange={handleReasonChange}>
            {CANCEL_REASONS.map((reason) => (
              <FormControlLabel
                key={reason}
                value={reason}
                control={<Radio />}
                label={reason}
                className="mb-2"
              />
            ))}
          </RadioGroup>

          {error && (
            <p className="text-red-500 text-sm mt-2">
              Please select a reason for cancellation
            </p>
          )}
        </FormControl>

        {selectedReason === "Other" && (
          <TextField
            fullWidth
            multiline
            rows={4}
            variant="outlined"
            label="Detailed Reason"
            value={customReason}
            onChange={(e) => setCustomReason(e.target.value)}
            placeholder="Please provide a detailed explanation"
            className="mt-4"
          />
        )}
      </DialogContent>

      <DialogActions className="p-6 flex justify-between">
        <Button onClick={onClose} variant="outlined" color="secondary">
          Keep Order
        </Button>

        <Button
          onClick={handleConfirmCANCEL}
          variant="contained"
          color="error"
          disabled={!selectedReason}
        >
          Confirm Cancel
        </Button>
      </DialogActions>

      {modalState.status === "loading" && (
        <LoadingCancelModal isOpen={modalState.isOpen} />
      )}

      {modalState.status === "success" && (
        <OrderCanceledSuccessModal
          isOpen={modalState.isOpen}
          onClose={() => setModalState({ ...modalState, isOpen: false })}
          onBackToOrderPage={onBackToOrderPage}
        />
      )}

      {modalState.status === "error" && (
        <ErrorCancelModal
          isOpen={modalState.isOpen}
          onClose={() => setModalState({ ...modalState, isOpen: false })}
          onRetry={() => handleConfirmCANCEL()}
        />
      )}
    </Dialog>
  );
};

export default OrderCancelModel;
