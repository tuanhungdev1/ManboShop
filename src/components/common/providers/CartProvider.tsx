import { useAppDispatch } from "@redux/hooks";
import { saveCart, syncCartLoading } from "@redux/slices/cartSlice";
import { setCartId } from "@redux/slices/checkoutSlice";
import { useGetCartQuery } from "@services/cartApi";
import { useEffect } from "react";

const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useAppDispatch();
  const { data: cart, isSuccess, isLoading, refetch } = useGetCartQuery();

  useEffect(() => {
    refetch();
  }, []);

  useEffect(() => {
    if (isLoading) {
      dispatch(syncCartLoading());
    }
  }, [isLoading]);

  useEffect(() => {
    if (isSuccess) {
      dispatch(saveCart(cart.data?.cartItems!));
      dispatch(setCartId(cart.data?.id!));
    }
  }, [isSuccess, cart]);

  return children;
};

export default CartProvider;
