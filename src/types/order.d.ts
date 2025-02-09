import { AddressForCreateDto } from "./address";
import { OrderStatus, PaymentMethod } from "./enums";

export interface OrderForCreateDto {
  userId: number;
  addressId?: number | null;
  addressForCreate?: AddressForCreateDto | null; 
  paymentMethod: PaymentMethod; 
  note?: string | null; 
  status?: OrderStatus; 
}
