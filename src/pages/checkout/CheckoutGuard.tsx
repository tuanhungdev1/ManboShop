import { useAppSelector } from "@redux/hooks";
import {
  selectCheckoutNewAddress,
  selectCheckoutPaymentMethod,
  selectCheckoutSelectedAddressId,
} from "@redux/slices/checkoutSlice";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const CheckoutGuard: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const addressId = useAppSelector(selectCheckoutSelectedAddressId);
  const newAddress = useAppSelector(selectCheckoutNewAddress);
  const paymentMethod = useAppSelector(selectCheckoutPaymentMethod);
  useEffect(() => {
    // Kiểm tra điều kiện truy cập từng trang
    if (
      location.pathname === "/checkout/payment" &&
      !addressId &&
      !newAddress
    ) {
      navigate("/checkout/address");
    }

    if (location.pathname === "/checkout/preview" && !paymentMethod) {
      navigate("/checkout/payment");
    }
  }, [location, addressId, newAddress, paymentMethod]);

  return <>{children}</>;
};

export default CheckoutGuard;
