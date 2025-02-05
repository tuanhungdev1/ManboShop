export interface User {
  id: number;
  userName: string;
  email: string;
  firstName?: string;
  lastName?: string;
  address?: string;
  profilePictureUrl?: string;
  phoneNumber?: string;
  totalFavoriteProducts: number;
  totalCartProducts: number;
  createdAt: Date;
  updatedAt?: Date;
  roles: string[];
}

export interface UserRequestParameters {
  pageSize?: number;
  pageNumber?: number;
  orderBy?: string;
  searchTerm?: string;
  orderKey?: string;
}

export interface UserForCreateDto {
  userName: string;
  email: string;
  password: string;
  confirmPassword: string;
  firstName?: string;
  lastName?: string;
  address?: string;
  phoneNumber?: string;
  profilePictureUrl?: string;
  roles: string[];
}

export interface UserForUpdateDto {
  firstName?: string;
  lastName?: string;
  address?: string;
  phoneNumber?: string;
  profilePictureUrl?: string;
  email?: string;
  currentPassword?: string;
  newPassword?: string;
  confirmNewPassword?: string;
  roles?: string[];
}

export interface ChangePasswordDto {
  userName: string;
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}
