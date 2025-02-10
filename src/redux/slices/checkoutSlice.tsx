import { RootState } from "@redux/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PaymentMethod } from "@types-d/enums";

interface CheckoutState {
  activeStep: number;
  cartId: number | null;
  selectedAddressId: number | null;
  paymentMethod: PaymentMethod | null;
  note: string | null;
}

const initialState: CheckoutState = {
  activeStep: 0,
  cartId: null,
  selectedAddressId: null,
  paymentMethod: null,
  note: "",
};

const checkoutSlice = createSlice({
  name: "checkout",
  initialState,
  reducers: {
    setActiveStep: (state, action: PayloadAction<number>) => {
      state.activeStep = action.payload;
    },
    setSelectedAddress: (state, action: PayloadAction<number>) => {
      state.selectedAddressId = action.payload;
    },

    setPaymentMethod: (state, action: PayloadAction<PaymentMethod>) => {
      state.paymentMethod = action.payload;
    },
    setNote: (state, action: PayloadAction<string>) => {
      state.note = action.payload;
    },
    setCartId: (state, action: PayloadAction<number>) => {
      state.cartId = action.payload;
    },
    resetCheckout: () => initialState,
  },
});

export const {
  setActiveStep,
  setNote,
  setPaymentMethod,
  setSelectedAddress,
  setCartId,
} = checkoutSlice.actions;

export default checkoutSlice.reducer;

// Selectors
export const selectCheckoutActiveStep = (state: RootState) =>
  state.checkout.activeStep;

export const selectCheckoutSelectedAddressId = (state: RootState) =>
  state.checkout.selectedAddressId;

export const selectCheckoutPaymentMethod = (state: RootState) =>
  state.checkout.paymentMethod;

export const selectCheckoutNote = (state: RootState) => state.checkout.note;

export const selectCheckoutState = (state: RootState) => state.checkout;

export const selectCheckoutCartId = (state: RootState) => state.checkout.cartId;
