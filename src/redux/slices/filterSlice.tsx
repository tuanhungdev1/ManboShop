// store/slices/filterSlice.ts
import { FilterState } from "@constants/filters/filter";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: FilterState = {
  brands: [],
  colors: [],
  productTypes: [],
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    toggleBrand(state, action: PayloadAction<string>) {
      const brandId = action.payload;
      const index = state.brands.indexOf(brandId);
      if (index === -1) {
        state.brands.push(brandId);
      } else {
        state.brands.splice(index, 1);
      }
    },
    toggleColor(state, action: PayloadAction<string>) {
      const colorId = action.payload;
      const index = state.colors.indexOf(colorId);
      if (index === -1) {
        state.colors.push(colorId);
      } else {
        state.colors.splice(index, 1);
      }
    },
    toggleProductType(state, action: PayloadAction<string>) {
      const typeId = action.payload;
      const index = state.productTypes.indexOf(typeId);
      if (index === -1) {
        state.productTypes.push(typeId);
      } else {
        state.productTypes.splice(index, 1);
      }
    },
    resetFilters() {
      return initialState;
    },
  },
});

export const { toggleBrand, toggleColor, toggleProductType, resetFilters } =
  filterSlice.actions;
export default filterSlice.reducer;
