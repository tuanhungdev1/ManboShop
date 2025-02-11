import { AddressForCreateDto } from "./address";
import { OrderStatus, PaymentMethod } from "./enums";
import { Product } from "./product";
import { RequestParameters } from "./type";
import { User } from "./user";

export interface OrderForCreateDto {
  cartId: number;
  addressId: number;
  paymentMethod: PaymentMethod;
  note?: string | null;
  status: OrderStatus;
}

export interface OrderAddress {
  orderId: number;
  name: string;
  phoneNumber: string;
  addressLine: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
  isDefault: boolean;
  createdAt: Date;
  updatedAt?: Date;
}
export interface OrderDto {
  id: number;
  userId?: number | null;
  user: User;
  shippingAddressId;
  shippingAddress: OrderAddress;
  note?: string | null;
  status: OrderStatus;
  paymentMethod: PaymentMethod;
  subTotal: number;
  shippingFee: number;
  total: number;
  confirmedAt?: Date;
  processedAt?: Date;
  shippedAt?: Date;
  deliveredAt?: Date;
  cancelledAt?: Date;
  createdAt: Date;
  updatedAt?: Date | null;
  orderDetails: OrderDetailDto[];
}
export interface OrderCancelDto {
  id: number;
  orderForCancelDto?: OrderForCancelDto;
}

interface OrderForCancelDto {
  cancellationReason: string; // Match với backend DTO
}
export interface OrderDetailDto {
  id: number;
  quantity: number;
  sku: string;
  productVariantValueId: number;
  productVariantValue: ProductVariantValue;
  product: Product;
  price: number;
  orderId: number;
  productId: number;
  product: Product;
  createdAt: Date;
  updatedAt?: Date | null;
}

export interface OrderForUserRequestParameters extends RequestParameters {}
