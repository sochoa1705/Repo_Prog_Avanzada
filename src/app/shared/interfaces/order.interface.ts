import { Product } from 'src/app/pages/products/interfaces/product.interface';

export interface Details {
  productId: number;
  productName: string;
  quantity: number;
  productPrice: number;
}

export interface DetailsDelivery {
  id:number;
  name: string;
  address: string;
  city: string;
  openingHours:string;
}

export interface Order {
  name: string;
  store:DetailsDelivery;
  shippingAddress: string;
  city: string;
  date: string;
  email: string;
  isDelivery: boolean;
  id: number;
}

export interface DetailsOrder {
  details: Details[];
  orderId: number;
}
