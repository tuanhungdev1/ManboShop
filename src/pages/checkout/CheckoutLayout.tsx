import { Step, StepLabel, Stepper, Button, Grid, Box } from "@mui/material";
import { useAppSelector } from "@redux/hooks";
import { selectCheckoutState } from "@redux/slices/checkoutSlice";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { GoHome } from "react-icons/go";
import { MdPayment } from "react-icons/md";
import { BsFileText } from "react-icons/bs";
import { ButtonComponent } from "@components/buttons";
import { formatPrice } from "@utils/format";
import { selectCartTotalAmount } from "@redux/slices/cartSlice";
import { useEffect, useState } from "react";
import { useCheckoutCartMutation } from "@services/cartApi";
import { OrderStatus } from "@types-d/enums";
import CustomModal, { ModalStatus } from "@components/modals/CustomModal";

const OrderSuccessModal = ({
  isOpen,
  onClose,
  onBackToHome,
  handleOrderRedirect,
}: {
  isOpen: boolean;
  onClose: () => void;
  onBackToHome: () => void;
  handleOrderRedirect: () => void;
}) => (
  <CustomModal
    isOpen={isOpen}
    onClose={onClose}
    status="success"
    title="Đơn hàng của bạn đã được xác nhận"
    message={
      <>
        Cảm ơn bạn đã mua sắm! Đơn hàng của bạn chưa được giao, nhưng chúng tôi
        sẽ gửi email khi đơn hàng được vận chuyển.
      </>
    }
    secondaryButton={{
      label: "Về trang chủ",
      onClick: onBackToHome,
    }}
    primaryButton={{
      label: "Xem đơn hàng",
      onClick: handleOrderRedirect,
    }}
  />
);

const LoadingModal = ({ isOpen }: { isOpen: boolean }) => (
  <CustomModal
    isOpen={isOpen}
    status="loading"
    title="Đang xử lý đơn hàng"
    message="Vui lòng chờ trong khi chúng tôi xử lý đơn hàng của bạn..."
    showCloseButton={false}
  />
);

// Modal lỗi
const ErrorModal = ({
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
    title="Đặt hàng thất bại"
    message="Đã xảy ra lỗi khi xử lý đơn hàng của bạn. Vui lòng thử lại."
    primaryButton={{
      label: "Thử lại",
      onClick: onRetry,
    }}
    secondaryButton={{
      label: "Hủy",
      onClick: onClose,
    }}
  />
);

// Custom styling cho Stepper
const CustomStepper = styled(Stepper)({
  "& .MuiStepConnector-line": {
    borderStyle: "dashed",
    borderWidth: "1px",
    borderColor: "#000",
  },
  "& .MuiStepLabel-label": {
    marginTop: "8px",
    fontSize: "14px",
    fontWeight: 500,
  },
});

// Custom styling cho Step icon
const CustomStep = styled(Step)({
  "& .MuiStepLabel-iconContainer": {
    "& .MuiSvgIcon-root": {
      width: "35px",
      height: "35px",
      border: "2px solid #000",
      borderRadius: "8px",
      backgroundColor: "#fff",
    },
    "& .Mui-active": {
      backgroundColor: "#000",
      color: "#fff",
    },
    "& .Mui-completed": {
      backgroundColor: "#000",
      color: "#fff",
    },
  },
});

const CheckoutLayout: React.FC = () => {
  const { paymentMethod, selectedAddressId, cartId, note } =
    useAppSelector(selectCheckoutState);
  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    status: ModalStatus;
  }>({
    isOpen: false,
    status: "loading",
  });

  const steps = [
    { label: "Địa chỉ nhận hàng", icon: GoHome, path: "/checkout/address" },
    {
      label: "Phương thức thanh toán",
      icon: MdPayment,
      path: "/checkout/payment",
    },
    {
      label: "Xem trước đơn hàng",
      icon: BsFileText,
      path: "/checkout/preview",
    },
  ];

  const navigate = useNavigate();
  const location = useLocation();

  const subTotal = useAppSelector(selectCartTotalAmount);
  const deliveryCharge = 5; // Example delivery charge
  const discount = 0; // Example discount
  const grandTotal = subTotal + deliveryCharge - discount;
  // Xác định bước hiện tại dựa trên đường dẫn
  const activeStep = steps.findIndex((step) => step.path === location.pathname);

  const [checkout] = useCheckoutCartMutation();

  const handleCheckout = async () => {
    try {
      setModalState({ isOpen: true, status: "loading" });
      if (selectedAddressId && paymentMethod && cartId) {
        await checkout({
          addressId: selectedAddressId,
          cartId: cartId,
          paymentMethod: paymentMethod,
          note: note,
          status: OrderStatus.Pending,
        }).unwrap();

        setModalState({ isOpen: true, status: "success" });
      }
    } catch (error: any) {
      setModalState({ isOpen: true, status: "error" });
    }
  };

  const handleBackToHome = () => {
    setModalState({ isOpen: false, status: "success" });
    navigate("/");
  };

  const handleOrderRedirect = () => {
    setModalState({ isOpen: false, status: "success" });
    navigate("/user/orders");
  };

  useEffect(() => {
    navigate("/checkout/address");
  }, []);

  const handleNext = () => {
    if (activeStep < steps.length - 1) {
      navigate(steps[activeStep + 1].path);
    }
  };

  const handleBack = () => {
    if (activeStep > 0) {
      navigate(steps[activeStep - 1].path);
    }
  };

  return (
    <div className="mt-[50px]">
      <h1 className="text-4xl font-medium mb-[80px] text-center xl:text-left">
        Checkout
      </h1>

      <Grid container spacing={4}>
        <Grid item xs={12} xl={8}>
          <div className="max-w-full mx-auto">
            <CustomStepper activeStep={activeStep}>
              {steps.map((step, index) => (
                <CustomStep key={step.label}>
                  <StepLabel
                    StepIconComponent={() => (
                      <div
                        className={`flex flex-col items-center gap-4 text-center ${
                          activeStep >= index ? "opacity-100" : "opacity-50"
                        }`}
                      >
                        <div
                          className={`
                        w-[50px] h-[50px] 
                        text-2xl
                        border-2 border-black 
                        rounded-lg
                        flex items-center justify-center
                        ${
                          activeStep >= index
                            ? "bg-black text-white"
                            : "bg-white text-black"
                        }
                      `}
                        >
                          <step.icon />
                        </div>
                        <div className="font-medium">{step.label}</div>
                      </div>
                    )}
                  />
                </CustomStep>
              ))}
            </CustomStepper>
          </div>

          <div className="checkout-content mt-20">
            <Outlet />
          </div>

          <div className=" mt-10 hidden xl:block">
            <div className="flex items-center justify-between">
              <Button
                onClick={handleBack}
                disabled={activeStep === 0}
                variant="outlined"
                sx={{
                  textTransform: "capitalize",
                }}
              >
                Quay lại
              </Button>
              <Button
                onClick={handleNext}
                disabled={activeStep === steps.length - 1}
                variant="contained"
                sx={{
                  textTransform: "capitalize",
                }}
              >
                Tiếp theo
              </Button>
            </div>
          </div>
        </Grid>
        <Grid item xs={12} xl={4}>
          <Box p={2} border="1px solid #e0e0e0" borderRadius={2}>
            <div className="flex items-center pt-2 pb-4 border-b justify-between text-[16px] font-semibold">
              <span>Tạm tính</span>
              <span>{formatPrice(subTotal)}</span>
            </div>
            <div className="pt-2 pb-4 border-b">
              <label
                className="text-[12px] mt-4 block cursor-pointer"
                htmlFor="discount-input"
              >
                Nhập mã giảm giá
              </label>
              <div className="flex items-stretch mt-2">
                <input
                  id="discount-input"
                  type="text"
                  className="h-[54px] flex-1 cursor-pointer w-full border-[1px] placeholder:font-normal placeholder:text-sm rounded-tr-none rounded-br-none border-black rounded-lg px-4 outline-none"
                  placeholder="NHẬP MÃ"
                />
                <ButtonComponent className="rounded-tl-none rounded-bl-none flex-1 w-[40%] border-[1px] border-black">
                  Áp dụng
                </ButtonComponent>
              </div>

              <div className="flex items-center justify-between pt-4 text-[14px] font-medium">
                <span>Phí vận chuyển</span>
                <span>{formatPrice(5)}</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 text-[18px] font-bold">
              <span>Tổng cộng</span>
              <span>{formatPrice(grandTotal)}</span>
            </div>

            {selectedAddressId && cartId && paymentMethod && (
              <ButtonComponent className="w-full mt-4" onClick={handleCheckout}>
                Đặt hàng
              </ButtonComponent>
            )}

            {modalState.status === "loading" && (
              <LoadingModal isOpen={modalState.isOpen} />
            )}

            {modalState.status === "success" && (
              <OrderSuccessModal
                isOpen={modalState.isOpen}
                onClose={() => setModalState({ ...modalState, isOpen: false })}
                onBackToHome={handleBackToHome}
                handleOrderRedirect={handleOrderRedirect}
              />
            )}

            {modalState.status === "error" && (
              <ErrorModal
                isOpen={modalState.isOpen}
                onClose={() => setModalState({ ...modalState, isOpen: false })}
                onRetry={handleCheckout}
              />
            )}
          </Box>
        </Grid>
      </Grid>

      {/* Nút điều hướng */}
      <div className=" mt-10 block xl:hidden">
        <div className="flex items-center justify-between">
          <Button
            onClick={handleBack}
            disabled={activeStep === 0}
            variant="outlined"
            sx={{
              textTransform: "capitalize",
            }}
          >
            Quay lại
          </Button>
          <Button
            onClick={handleNext}
            disabled={activeStep === steps.length - 1}
            variant="contained"
            sx={{
              textTransform: "capitalize",
            }}
          >
            Tiếp theo
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutLayout;
