import { Injectable } from '@angular/core';
import { Order } from '../models/order.model';

@Injectable({ providedIn: 'root' })
export class OrderService {
  private currentOrder: Order | null = null;

  setOrder(order: Order): void { this.currentOrder = order; }
  getOrder(): Order | null { return this.currentOrder; }
  generateOrderNumber(): string {
    return 'PJ-' + Math.random().toString(36).substr(2, 8).toUpperCase();
  }
}
