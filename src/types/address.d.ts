import { RequestParameters } from "./type";

export interface AddressForCreateDto {
  name: string;
  phoneNumber: string;
  addressLine: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
  isDefault: boolean;
}

export interface AddressForUpdateDto {
  name: string;
  phoneNumber: string;
  addressLine: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
  isDefault: boolean;
}

export interface AddressDto {
  id: number;
  userId: number;
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
