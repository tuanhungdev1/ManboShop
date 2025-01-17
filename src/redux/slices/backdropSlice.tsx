import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface BackdropState {
  isVisible: boolean;
  opacity: number;
  zIndex: number;
}

const initialState: BackdropState = {
  isVisible: false,
  opacity: 0.4,
  zIndex: 40,
};

export const backdropSlice = createSlice({
  name: "backdrop",
  initialState,
  reducers: {
    showBackdrop: (state, action: PayloadAction<Partial<BackdropState>>) => {
      state.isVisible = true;
      if (action.payload.opacity) state.opacity = action.payload.opacity;
      if (action.payload.zIndex) state.zIndex = action.payload.zIndex;
    },
    hideBackdrop: (state) => {
      state.isVisible = false;
    },
  },
});

export const { showBackdrop, hideBackdrop } = backdropSlice.actions;
export default backdropSlice.reducer;
