import { Product } from "./product";
import { RequestParameters } from "./type";
import { User } from "./user";

export interface FeedbackDto {
  id: number;
  title: string;
  content: string;
  star: number;
  userId: number;
  productId: number;
  totalLikes: number;
  isLiked: boolean;
  user: User;
  product: Product;
  createdAt: Date;
  updatedAt?: Date;
}

export interface FeedbackForCreateDto {
  content: string;
  title: string;
  star?: number;
  productId?: number;
}

export interface FeedbackForUpdateDto {
  content: string;
  title: string;
  star: number;
}

export interface FeedbackLikeDto {
  id: number;
  feedbackId: number;
  userId: number;
  createdAt: string;
}

export enum ReportStatus {
  Pending = "Pending",
  Approved = "Approved",
  Rejected = "Rejected",
}

export interface FeedbackReportDto {
  id: number;
  feedbackId: number;
  userId: number;
  reason: string;
  status: ReportStatus;
  createdAt: string;
}

export interface FeedbackReportForCreateDto {
  reason: string;
}

export interface FeedbackRequestParameters extends RequestParameters {}
