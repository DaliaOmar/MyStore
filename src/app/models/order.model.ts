import { CartItem } from './cart-item.model';

export interface Order {
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  creditCard: string;
  items: CartItem[];
  total: number;
  orderNumber: string;
  date: string;
}
