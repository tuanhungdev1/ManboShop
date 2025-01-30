import { useAppDispatch } from "@redux/hooks";
import { saveCart, syncCartLoading } from "@redux/slices/cartSlice";
import { useGetCartQuery } from "@services/cartApi";
import { useEffect } from "react";

const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useAppDispatch();
  const { data: cart, isSuccess, isLoading } = useGetCartQuery();

  useEffect(() => {
    if (isLoading) {
      dispatch(syncCartLoading());
    }
  }, [isLoading]);

  useEffect(() => {
    if (isSuccess) {
      dispatch(saveCart(cart.data?.cartItems!));
    }
  }, [isSuccess, cart]);

  return children;
};

export default CartProvider;
