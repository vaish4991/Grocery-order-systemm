export interface IReview {
  id: string;
  userId: string;
  userName: string;
  productId: string;
  rating: number;
  comment?: string;
  isVerifiedPurchase: boolean;
  createdAt: Date;
  updatedAt: Date;
}
