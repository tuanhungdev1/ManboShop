import { Product, ProductVariantValue } from "./product";

export interface Cart {
  id: number;
  sessionId?: string;
  userId?: number;
  cartItems: CartItem[];
  createdAt: Date;
  updatedAt?: Date;
}

export interface CartItem {
  id: number;
  cartId: number;
  productId: number;
  sku: string;
  price: number;
  oldPrice?: number;
  productVariantValueId: number;
  productVariantValue: ProductVariantValue;
  product: Product;
  stock: number;
  quantity: number;
  createdAt: Date;
  updatedAt?: Date;
  totalPrice: number;
}

// Implementing totalPrice as a getter function
export function getTotalPrice(cartItem: CartItem): number {
  return cartItem.price * cartItem.quantity;
}

export interface CartItemForCreate {
  productId: number;
  productVariantValueId: number;
  quantity: number;
}

export interface CartItemForUpdate {
  quantity: number;
}
