export enum InputType {
  Text = "text",
  Number = "number",
  Email = "email",
  Password = "password",
  Date = "date",
  DatetimeLocal = "datetime-local",
  Month = "month",
  Week = "week",
  Time = "time",
  Url = "url",
  Tel = "tel",
  Search = "search",
  Color = "color",
}

export enum OrderStatus {
  Pending = 1, // Đơn hàng đang chờ xử lý
  Confirmed = 2, // Đơn hàng đã được xác nhận
  Processing = 3, // Đơn hàng đang được xử lý
  Shipped = 4, // Đơn hàng đã được vận chuyển
  Delivered = 5, // Đơn hàng đã giao thành công
  Cancelled = 6, // Đơn hàng bị hủy
  Refunded = 7, // Đơn hàng được hoàn tiền
  Failed = 8, // Đơn hàng thất bại
}

export enum PaymentMethod {
  COD = 1,
  ZaloPay = 2,
  VNPay = 3,
}

export enum PaymentStatus {
  Pending = 1, // Chờ thanh toán
  Paid = 2, // Đã thanh toán
  Failed = 3, // Thanh toán thất bại
  Refunded = 4, // Đã hoàn tiền
}
