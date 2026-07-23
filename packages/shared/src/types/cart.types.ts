import { IProduct } from './product.types';

export interface ICartItem {
  id: string;
  cartId: string;
  productId: string;
  product?: IProduct;
  quantity: number;
}

export interface ICart {
  id: string;
  userId: string;
  items: ICartItem[];
  totalItems: number;
  totalAmount: number;
}
