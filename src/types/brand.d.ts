export interface Brand {
  id: number;
  name: string;
  imageUrl?: string;
  createdAt: Date;
  updatedAt?: Date;
}

export interface BrandForCreateDto {
  name: string;
}

export interface BrandForUpdateDto {
  name: string;
}

export interface BrandRequestParameters {
  pageSize?: number;
  pageNumber?: number;
  orderBy?: string;
  searchTerm?: string;
  orderKey?: string;
}
