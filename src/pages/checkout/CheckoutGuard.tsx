import { useAppDispatch, useAppSelector } from "@redux/hooks";
import {
  selectCheckoutPaymentMethod,
  selectCheckoutSelectedAddressId,
} from "@redux/slices/checkoutSlice";
import { openSnackbar } from "@redux/slices/snackbarSlice";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const CheckoutGuard: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const location = useLocation();
  const addressId = useAppSelector(selectCheckoutSelectedAddressId);
  const paymentMethod = useAppSelector(selectCheckoutPaymentMethod);
  useEffect(() => {
    // Kiểm tra điều kiện truy cập từng trang
    if (location.pathname === "/checkout/payment" && !addressId) {
      dispatch(
        openSnackbar({
          type: "warning",
          message: "Bạn phải hoàn thành thông tin về địa chỉ!",
        })
      );
      navigate("/checkout/address");
    }

    if (location.pathname === "/checkout/preview" && !paymentMethod) {
      dispatch(
        openSnackbar({
          type: "warning",
          message: "Bạn phải hoàn thành thông tin về thanh toán!",
        })
      );
      navigate("/checkout/payment");
    }
  }, [location, addressId, paymentMethod]);

  return <>{children}</>;
};

export default CheckoutGuard;
