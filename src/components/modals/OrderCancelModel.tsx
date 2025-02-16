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
    title="Đơn hàng của bạn đã được hủy"
    message={
      <>
        Đơn hàng của bạn đã được hủy thành công.
        <br />
        Nếu bạn có bất kỳ câu hỏi nào, vui lòng liên hệ với đội ngũ hỗ trợ của
        chúng tôi.
      </>
    }
    secondaryButton={{
      label: "Quay lại đơn hàng của tôi",
      onClick: onBackToOrderPage,
    }}
  />
);

const LoadingCancelModal = ({ isOpen }: { isOpen: boolean }) => (
  <CustomModal
    isOpen={isOpen}
    status="loading"
    title="Đang hủy đơn hàng"
    message="Vui lòng chờ trong khi chúng tôi xử lý yêu cầu hủy đơn hàng của bạn..."
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
    title="Hủy đơn hàng thất bại"
    message="Có lỗi xảy ra khi hủy đơn hàng của bạn. Vui lòng thử lại."
    primaryButton={{
      label: "Thử lại",
      onClick: onRetry,
    }}
    secondaryButton={{
      label: "Đóng",
      onClick: onClose,
    }}
  />
);

const CANCEL_REASONS = [
  "Thay đổi ý định",
  "Tìm thấy giá tốt hơn ở nơi khác",
  "Thời gian giao hàng quá lâu",
  "Sản phẩm không đúng mô tả",
  "Đặt hàng nhầm",
  "Khác",
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
      selectedReason === "Khác" ? customReason : selectedReason;

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
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      sx={{
        fontSize: "14px",
      }}
    >
      <DialogTitle className="text-center font-bold text-xl text-red-600">
        Hủy đơn hàng #{orderId}
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
            Lý do hủy đơn hàng
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
              Vui lòng chọn lý do hủy đơn hàng
            </p>
          )}
        </FormControl>

        {selectedReason === "Khác" && (
          <TextField
            fullWidth
            multiline
            rows={4}
            variant="outlined"
            label="Lý do chi tiết"
            value={customReason}
            onChange={(e) => setCustomReason(e.target.value)}
            placeholder="Vui lòng cung cấp mô tả chi tiết"
            className="mt-4"
          />
        )}
      </DialogContent>

      <DialogActions className="p-6 flex justify-between">
        <Button
          onClick={onClose}
          variant="outlined"
          color="secondary"
          sx={{
            textTransform: "capitalize",
          }}
        >
          Giữ lại đơn hàng
        </Button>

        <Button
          onClick={handleConfirmCANCEL}
          variant="contained"
          color="error"
          disabled={!selectedReason}
          sx={{
            textTransform: "capitalize",
          }}
        >
          Xác nhận hủy
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
