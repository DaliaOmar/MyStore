import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CartItem } from '../models/cart-item.model';
import { Product } from '../models/product.model';

@Injectable({ providedIn: 'root' })
export class CartService {
  private cartItemsSubject = new BehaviorSubject<CartItem[]>([]);
  cartItems$ = this.cartItemsSubject.asObservable();

  private notificationSubject = new BehaviorSubject<string>('');
  notification$ = this.notificationSubject.asObservable();

  getCartItems(): CartItem[] {
    return this.cartItemsSubject.getValue();
  }

  addToCart(product: Product, quantity: number): void {
    const current = this.getCartItems();
    const existing = current.find(i => i.product.id === product.id);
    if (existing) {
      existing.quantity += quantity;
      this.cartItemsSubject.next([...current]);
    } else {
      this.cartItemsSubject.next([...current, { product, quantity }]);
    }
    this.notificationSubject.next(`"${product.name}" added to your cart!`);
    setTimeout(() => this.notificationSubject.next(''), 3000);
  }

  removeFromCart(productId: number): void {
    const item = this.getCartItems().find(i => i.product.id === productId);
    this.cartItemsSubject.next(this.getCartItems().filter(i => i.product.id !== productId));
    if (item) {
      this.notificationSubject.next(`"${item.product.name}" removed from your cart.`);
      setTimeout(() => this.notificationSubject.next(''), 3000);
    }
  }

  updateQuantity(productId: number, quantity: number): void {
    const current = this.getCartItems();
    const item = current.find(i => i.product.id === productId);
    if (item) { item.quantity = quantity; this.cartItemsSubject.next([...current]); }
  }

  getTotal(): number {
    return this.getCartItems().reduce((s, i) => s + i.product.price * i.quantity, 0);
  }

  getItemCount(): number {
    return this.getCartItems().reduce((c, i) => c + i.quantity, 0);
  }

  clearCart(): void {
    this.cartItemsSubject.next([]);
  }
}