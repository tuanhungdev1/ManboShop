export interface Category {
  id: number;
  name: string;
  imageUrl?: string;
  parentCategoryId?: number;
  subCategories?: Category[];
  createdAt: Date;
  updatedAt?: Date;
}

export interface CategoryRequestParameters {
  pageSize?: number;
  pageNumber?: number;
  orderBy?: string;
  searchTerm?: string;
  orderKey?: string;
}

export interface CategoryForCreateDto {
  name: string;
  parentCategoryId?: number;
}

export interface CategoryForUpdateDto {
  name: string;
  parentCategoryId?: number;
}
