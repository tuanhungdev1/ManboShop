import { FilterState } from "@redux/slices/filterSlice";
import { ProductRequestParameters } from "@types-d/product";

export const formatQueryParams = (
  filters: FilterState,
  pageNumber: number,
  pageSize: number
): ProductRequestParameters => {
  const params: ProductRequestParameters = {
    pageSize: pageSize,
    pageNumber: pageNumber,
    brands: filters.brands.length
      ? sanitizeArrayParam(filters.brands)
      : undefined,
    categories: filters.productTypes.length
      ? sanitizeArrayParam(filters.productTypes)
      : undefined,
    colors: filters.colors.length
      ? sanitizeArrayParam(filters.colors)
      : undefined,
    sizes: filters.sizes.length ? sanitizeArrayParam(filters.sizes) : undefined,
    priceRange: filters.priceRange
      ? `${filters.priceRange.min}-${filters.priceRange.max}`
      : undefined,
    orderBy: filters.sortBy ?? undefined,
    searchTerm: filters.searchTerm ?? undefined,
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

const removeDiacritics = (str: string): string => {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // Loại bỏ dấu tiếng Việt
    .toLowerCase() // Chuyển thành chữ thường
    .replace(/\s+/g, ""); // Xóa khoảng trắng
};

const removeEmptyParams = (
  params: ProductRequestParameters
): ProductRequestParameters => {
  return Object.fromEntries(
    Object.entries(params).filter(([_, value]) => value !== undefined)
  ) as ProductRequestParameters;
};
