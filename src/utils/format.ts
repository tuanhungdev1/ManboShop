/**
 * Format a number to Vietnamese currency format
 * @param price - The price to format
 * @param currency - The currency symbol (default: '₫')
 * @returns Formatted price string
 *
 * Example:
 * formatPrice(1000000) => "1.000.000₫"
 * formatPrice(1500000, 'VNĐ') => "1.500.000 VNĐ"
 */
export const formatPrice = (price: number, currency: string = "₫"): string => {
  try {
    // Convert to number if input is string
    const numericPrice = typeof price === "string" ? parseFloat(price) : price;

    // Check if price is valid number
    if (isNaN(numericPrice)) {
      return "0₫";
    }

    // Format number with dots as thousand separators
    const formattedPrice = numericPrice.toLocaleString("vi-VN", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });

    // Add currency symbol with space if it's more than 1 character
    return currency.length > 1
      ? `${formattedPrice} ${currency}`
      : `${formattedPrice}${currency}`;
  } catch (error) {
    console.error("Error formatting price:", error);
    return "0₫";
  }
};

/**
 * Format a price range
 * @param minPrice - Minimum price
 * @param maxPrice - Maximum price
 * @returns Formatted price range string
 *
 * Example:
 * formatPriceRange(100000, 200000) => "100.000₫ - 200.000₫"
 */
export const formatPriceRange = (
  minPrice: number,
  maxPrice: number
): string => {
  return `${formatPrice(minPrice)} - ${formatPrice(maxPrice)}`;
};

/**
 * Remove currency symbol and formatting from price string
 * @param formattedPrice - The formatted price string
 * @returns number
 *
 * Example:
 * unformatPrice("1.000.000₫") => 1000000
 */
export const unformatPrice = (formattedPrice: string): number => {
  try {
    // Remove currency symbol and all non-numeric characters except decimal point
    const numericString = formattedPrice.replace(/[^\d,.-]/g, "");
    // Convert to number
    return parseFloat(numericString.replace(/\./g, ""));
  } catch (error) {
    console.error("Error unformatting price:", error);
    return 0;
  }
};
export function formatDateTime(dateTimeString: string): string {
  const date = new Date(dateTimeString);
  const now = new Date();

  const isCurrentYear = date.getFullYear() === now.getFullYear(); // Kiểm tra có phải năm hiện tại không

  const options: Intl.DateTimeFormatOptions = {
    month: "long", // Tháng (dạng chữ)
    day: "numeric", // Ngày
    ...(isCurrentYear ? {} : { year: "numeric" }), // Chỉ thêm năm nếu khác năm hiện tại
  };

  const formattedDate = date.toLocaleDateString("vi-VN", options);

  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: "2-digit", // Giờ
    minute: "2-digit", // Phút
    hour12: false, // Hiển thị theo định dạng 24h
  };

  const formattedTime = date.toLocaleTimeString("vi-VN", timeOptions);

  return `Ngày ${formattedDate} lúc ${formattedTime}`;
}

import { addDays } from "date-fns";

/**
 * Hàm lấy ngày giao hàng dự kiến (+6 ngày từ ngày hiện tại)
 * @returns {string} Ngày giao hàng định dạng tiếng Việt
 */
export const getEstimatedDeliveryDate = (): string => {
  const estimatedDate = addDays(new Date(), 6);

  return new Intl.DateTimeFormat("vi-VN", {
    weekday: "long", // Hiển thị thứ (Thứ Hai, Thứ Ba, ...)
    day: "2-digit", // Hiển thị ngày (01, 02, 03, ...)
    month: "long", // Hiển thị tháng (tháng 1, tháng 2, ...)
    year: "numeric", // Hiển thị năm (2024, 2025, ...)
  }).format(estimatedDate);
};
