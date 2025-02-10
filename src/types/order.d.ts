import { AddressForCreateDto } from "./address";
import { OrderStatus, PaymentMethod } from "./enums";
import { Product } from "./product";

export interface OrderForCreateDto {
  cartId: number;
  addressId: number;
  paymentMethod: PaymentMethod;
  note?: string | null;
  status: OrderStatus;
}

export interface OrderDto {
  id: number;
  userId?: number | null;
  sessionId?: string | null;
  note?: string | null;
  status: OrderStatus;
  total: number;
  createdAt: Date;
  updatedAt?: Date | null;
  orderDetails: OrderDetailDto[];
}

export interface OrderDetailDto {
  id: number;
  quantity: number;
  price: number;
  orderId: number;
  productId: number;
  product: Product;
  createdAt: Date;
  updatedAt?: Date | null;
}
