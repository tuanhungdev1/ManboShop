import { PriceRange } from "@redux/slices/filterSlice";
import { Brand } from "./brand";
import { Category } from "./category";
import { RequestParameters } from "./type";

export interface Product {
  id: number;
  name: string;
  description: string;
  specification?: string;
  price: number;
  oldPrice: number;
  buyTurn: number;
  quantity: number;
  category?: Category;
  brand?: Brand;
  createdAt: string;
  updatedAt?: string;
  productImages: ProductImage[];
  attributes: ProductAttributeValue[];
  variants: ProductVariant[];
  variantValues: ProductVariantValue[];
}

export interface ProductImage {
  id: number;
  imageUrl?: string;
  productId: number;
  createdAt: string;
  updatedAt?: string;
}

export interface ProductAttributeValue {
  id: number;
  name: string;
  value: string;
  createdAt: string;
  updatedAt?: string;
}

export interface ProductVariant {
  id: number;
  name: string;
  values: VariantValue[];
  createdAt: string;
  updatedAt?: string;
}

export interface VariantValue {
  id: number;
  value: string;
  variantId: number;
  variantValueImages: VariantValueImage[];
  createdAt: string;
  updatedAt?: string;
}

export interface VariantValueImage {
  id: number;
  variantValueId: number;
  imageUrl: string;
  createdAt: Date;
  updatedAt?: Date;
}

export interface ProductVariantValue {
  id: number;
  sku: string;
  price: number;
  oldPrice?: number;
  stock: number;
  variantCombination: ProductVariantDetail[];
  createdAt: string;
  updatedAt?: string;
}

export interface ProductVariantDetail {
  variantName: string;
  value: string;
}

export interface ProductRequestParameters extends RequestParameters {
  Brands?: string;
  Categories?: string;
  Colors?: string;
  Sizes?: string;
  PriceRange?: string;
}
