import { FilterState } from "@redux/slices/filterSlice";
import { ProductRequestParameters } from "@types-d/product";

export const formatQueryParams = (
  filters: FilterState,
  pageNumber: number,
  pageSize: number
): ProductRequestParameters => {
  const params: ProductRequestParameters = {
    PageSize: pageSize,
    PageNumber: pageNumber,
    Brands: filters.brands.length ? sanitizeArrayParam(filters.brands) : "",
    Categories: filters.productTypes.length
      ? sanitizeArrayParam(filters.productTypes)
      : "",
    Colors: filters.colors.length
      ? sanitizeArrayParam(filters.colors)
      : undefined,
    Sizes: filters.sizes.length ? sanitizeArrayParam(filters.sizes) : "",
    PriceRange: filters.priceRange
      ? `${filters.priceRange.min}-${filters.priceRange.max}`
      : "",
    OrderBy: filters.sortBy ?? "",
    SearchTerm: filters.searchTerm ?? "",
  };

  return removeEmptyParams(params);
};

const sanitizeArrayParam = (arr: string[]): string => {
  return arr
    .filter(Boolean)
    .filter((item) => item.length <= 50)
    .map((item) => item.trim())
    .join(",");
};

const removeEmptyParams = (
  params: ProductRequestParameters
): ProductRequestParameters => {
  return Object.fromEntries(
    Object.entries(params).filter(([_, value]) => value !== undefined)
  ) as ProductRequestParameters;
};
