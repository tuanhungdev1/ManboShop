import { Modal, Box, Typography, Button, IconButton } from "@mui/material";
import { FiX } from "react-icons/fi";

interface ConfirmModalProps {
  isOpen: boolean;
  message: string;
  onClose: () => void;
  onConfirm?: () => void;
}

const ConfirmModal = ({
  isOpen,
  message,
  onClose,
  onConfirm,
}: ConfirmModalProps) => {
  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 3,
          borderRadius: 2,
        }}
      >
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={2}
        >
          <Typography variant="h6">Xác nhận 🚀</Typography>
          <IconButton onClick={onClose}>
            <FiX />
          </IconButton>
        </Box>

        <Typography variant="body1" mb={3} py={1}>
          {message}
        </Typography>

        <Box display="flex" justifyContent="flex-end" gap={2}>
          <Button variant="contained" color="error" onClick={onClose}>
            Hủy
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              if (onConfirm) onConfirm();
              onClose();
            }}
          >
            OK
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default ConfirmModal;
