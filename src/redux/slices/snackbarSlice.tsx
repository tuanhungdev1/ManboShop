import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SnackbarState {
  open: boolean;
  message: string | null;
  type: "success" | "error" | "info" | "warning";
}

const initialState: SnackbarState = {
  open: false,
  message: null,
  type: "success",
};

export const snackbarSlice = createSlice({
  name: "snackbar",
  initialState,
  reducers: {
    openSnackbar: (
      state,
      action: PayloadAction<{ message: string; type: SnackbarState["type"] }>
    ) => {
      state.open = true;
      state.message = action.payload.message;
      state.type = action.payload.type;
    },
    closeSnackbar: () => {
      return initialState;
    },
  },
});

// Export actions and reducer
export const { openSnackbar, closeSnackbar } = snackbarSlice.actions;
export default snackbarSlice.reducer;
