// src/store/slices/filterSlice.ts

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PriceRange {
  min: number;
  max: number;
}

interface FilterState {
  productTypes: string[];
  sizes: string[];
  brands: string[];
  colors: string[];
  priceRange: PriceRange | null;
  sortBy: string | null;
}

const initialState: FilterState = {
  productTypes: [],
  sizes: [],
  brands: [],
  colors: [],
  priceRange: null,
  sortBy: null,
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    // Product Types
    toggleProductType: (state, action: PayloadAction<string>) => {
      const typeId = action.payload;
      const index = state.productTypes.indexOf(typeId);
      if (index === -1) {
        state.productTypes.push(typeId);
      } else {
        state.productTypes.splice(index, 1);
      }
    },

    // Sizes
    toggleSize: (state, action: PayloadAction<string>) => {
      const sizeId = action.payload;
      const index = state.sizes.indexOf(sizeId);
      if (index === -1) {
        state.sizes.push(sizeId);
      } else {
        state.sizes.splice(index, 1);
      }
    },

    // Brands
    toggleBrand: (state, action: PayloadAction<string>) => {
      const brandId = action.payload;
      const index = state.brands.indexOf(brandId);
      if (index === -1) {
        state.brands.push(brandId);
      } else {
        state.brands.splice(index, 1);
      }
    },

    // Colors
    toggleColor: (state, action: PayloadAction<string>) => {
      const colorId = action.payload;
      const index = state.colors.indexOf(colorId);
      if (index === -1) {
        state.colors.push(colorId);
      } else {
        state.colors.splice(index, 1);
      }
    },

    // Price Range
    setPriceRange: (state, action: PayloadAction<PriceRange>) => {
      state.priceRange = action.payload;
    },

    // Sort
    setSortBy: (state, action: PayloadAction<string>) => {
      state.sortBy = action.payload;
    },

    resetProductTypes: (state) => {
      state.productTypes = [];
    },

    // Reset Sizes
    resetSizes: (state) => {
      state.sizes = [];
    },

    // Reset Brands
    resetBrands: (state) => {
      state.brands = [];
    },

    // Reset Colors
    resetColors: (state) => {
      state.colors = [];
    },

    // Reset Price Range
    resetPriceRange: (state) => {
      state.priceRange = null;
    },

    // Reset Sort By
    resetSortBy: (state) => {
      state.sortBy = null;
    },

    // Reset all filters
    resetFilters: () => {
      return initialState;
    },
  },
});

// Export actions
export const {
  toggleProductType,
  toggleSize,
  toggleBrand,
  toggleColor,
  setPriceRange,
  setSortBy,
  resetFilters,
  resetBrands,
  resetColors,
  resetPriceRange,
  resetProductTypes,
  resetSizes,
  resetSortBy,
} = filterSlice.actions;

// Selectors
export const selectProductTypes = (state: { filter: FilterState }) =>
  state.filter.productTypes;
export const selectSizes = (state: { filter: FilterState }) =>
  state.filter.sizes;
export const selectBrands = (state: { filter: FilterState }) =>
  state.filter.brands;
export const selectColors = (state: { filter: FilterState }) =>
  state.filter.colors;
export const selectPriceRange = (state: { filter: FilterState }) =>
  state.filter.priceRange;
export const selectSortBy = (state: { filter: FilterState }) =>
  state.filter.sortBy;

export default filterSlice.reducer;
