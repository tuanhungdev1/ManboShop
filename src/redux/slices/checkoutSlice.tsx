import { RootState } from "@redux/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AddressDto, AddressForCreateDto } from "@types-d/address";
import { PaymentMethod } from "@types-d/enums";

interface CheckoutState {
  activeStep: number;
  selectedAddressId: number | null;
  newAddress: AddressForCreateDto | null;
  paymentMethod: PaymentMethod | null;
  note: string | null;
  existingAddresses: AddressDto[];
}

const initialState: CheckoutState = {
  activeStep: 0,
  selectedAddressId: null,
  newAddress: null,
  paymentMethod: null,
  note: "",
  existingAddresses: [],
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
      state.newAddress = null;
    },
    setNewAddress: (state, action: PayloadAction<AddressForCreateDto>) => {
      state.newAddress = action.payload;
      state.selectedAddressId = null;
    },
    setPaymentMethod: (state, action: PayloadAction<PaymentMethod>) => {
      state.paymentMethod = action.payload;
    },
    setNote: (state, action: PayloadAction<string>) => {
      state.note = action.payload;
    },
    setExistingAddresses: (state, action: PayloadAction<AddressDto[]>) => {
      state.existingAddresses = action.payload;
    },
    resetCheckout: () => initialState,
  },
});

export const {
  setActiveStep,
  setExistingAddresses,
  setNewAddress,
  setNote,
  setPaymentMethod,
  setSelectedAddress,
} = checkoutSlice.actions;

export default checkoutSlice.reducer;

// Selectors
export const selectCheckoutActiveStep = (state: RootState) =>
  state.checkout.activeStep;

export const selectCheckoutSelectedAddressId = (state: RootState) =>
  state.checkout.selectedAddressId;

export const selectCheckoutNewAddress = (state: RootState) =>
  state.checkout.newAddress;

export const selectCheckoutPaymentMethod = (state: RootState) =>
  state.checkout.paymentMethod;

export const selectCheckoutNote = (state: RootState) => state.checkout.note;

export const selectCheckoutExistingAddresses = (state: RootState) =>
  state.checkout.existingAddresses;

export const selectCheckoutState = (state: RootState) => state.checkout;
