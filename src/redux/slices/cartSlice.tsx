import { RootState } from "@redux/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartItem } from "@types-d/cart";

interface CartState {
  cartItems: CartItem[];
  totalItems: number;
  totalAmount: number;
  isLoading: boolean;
}

const initialState: CartState = {
  cartItems: [],
  totalItems: 0,
  totalAmount: 0,
  isLoading: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    saveCart: (state, action: PayloadAction<CartItem[]>) => {
      state.cartItems = action.payload;
      state.totalItems = action.payload.reduce(
        (total, item) => total + item.quantity,
        0
      );
      state.totalAmount = action.payload.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
      state.isLoading = false;
    },
    syncCartLoading: (state) => {
      state.isLoading = true;
    },
  },
});

export const { saveCart, syncCartLoading } = cartSlice.actions;
export default cartSlice.reducer;

// Selectors
export const selectCartItems = (state: RootState) => state.cart.cartItems;
export const selectCartTotalItems = (state: RootState) => state.cart.totalItems;
export const selectCartTotalAmount = (state: RootState) =>
  state.cart.totalAmount;
export const selectIsCartLoading = (state: RootState) => state.cart.isLoading;
