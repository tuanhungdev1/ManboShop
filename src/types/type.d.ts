export interface Token {
  accessToken: string;
  refreshToken: string;
  isRemembered?: boolean;
}

export interface ApiErrorResponse {
  Message: string;
  StatusCode: number;
}

export interface MetaData {
  currentPage: number;
  totalPage: number;
  pageSize: number;
  totalCount: number;
  hasPrevious: boolean;
  hasNext: boolean;
}

export interface ApiResponse<T> {
  statusCode: number;
  success: boolean;
  message: string;
  data?: T;
  token?: Token;
  errors?: string[];
  pagination?: MetaData;
}

export interface RequestParameters {
  PageNumber?: number;
  PageSize?: number;
  SearchTerm?: string;
  OrderBy?: string;
  OrderKey?: string;
}
