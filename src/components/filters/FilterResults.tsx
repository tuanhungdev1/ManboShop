import { useAppDispatch, useAppSelector } from "@redux/hooks";
import {
  resetBrands,
  resetColors,
  resetFilters,
  resetPriceRange,
  resetProductTypes,
  resetSearchTerm,
  resetSizes,
  resetSortBy,
  selectBrands,
  selectColors,
  selectPriceRange,
  selectProductTypes,
  selectSearchTerm,
  selectSizes,
  selectSortBy,
} from "@redux/slices/filterSlice";
import FilterResultsTag from "./FilterResultsTag";

const FilterResults = () => {
  const dispatch = useAppDispatch();
  const brands = useAppSelector(selectBrands);
  const productCategories = useAppSelector(selectProductTypes);
  const colors = useAppSelector(selectColors);
  const availableSizes = useAppSelector(selectSizes);
  const priceRange = useAppSelector(selectPriceRange);
  const sortBy = useAppSelector(selectSortBy);
  const searchTerm = useAppSelector(selectSearchTerm);

  return (
    <div className="flex flex-wrap items-center gap-4">
      {brands && brands.length > 0 && (
        <FilterResultsTag
          label="Thương hiệu:"
          data={brands}
          onClose={() => dispatch(resetBrands())}
        />
      )}

      {colors && colors.length > 0 && (
        <FilterResultsTag
          label="Màu sắc:"
          data={colors}
          onClose={() => dispatch(resetColors())}
        />
      )}

      {productCategories && productCategories.length > 0 && (
        <FilterResultsTag
          label="Danh mục:"
          data={productCategories}
          onClose={() => dispatch(resetProductTypes())}
        />
      )}

      {availableSizes && availableSizes.length > 0 && (
        <FilterResultsTag
          label="Kích cỡ:"
          data={availableSizes}
          onClose={() => dispatch(resetSizes())}
        />
      )}

      {priceRange && (
        <FilterResultsTag
          data={priceRange}
          onClose={() => dispatch(resetPriceRange())}
        />
      )}
      {sortBy && (
        <FilterResultsTag
          data={{ sortBy }}
          onClose={() => dispatch(resetSortBy())}
        />
      )}

      {searchTerm && (
        <FilterResultsTag
          label="Tìm kiếm:"
          data={{ searchTerm }}
          onClose={() => dispatch(resetSearchTerm())}
        />
      )}

      {brands.length > 0 ||
      productCategories.length > 0 ||
      availableSizes.length > 0 ||
      priceRange ||
      sortBy ? (
        <span
          className="font-semibold capitalize text-[14px] underline cursor-pointer"
          onClick={() => dispatch(resetFilters())}
        >
          xóa bộ lọc
        </span>
      ) : null}
    </div>
  );
};

export default FilterResults;
