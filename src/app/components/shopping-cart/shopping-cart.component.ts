import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { CartItem } from '../../models/cart-item.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  cartItems: CartItem[] = [];
  quantities: number[] = [1,2,3,4,5,6,7,8,9,10];
  notification: string = '';

  constructor(private cartService: CartService, private router: Router) {}

  ngOnInit(): void {
    this.cartService.cartItems$.subscribe(items => { this.cartItems = items; });
    this.cartService.notification$.subscribe(msg => { this.notification = msg; });
  }

  get total(): number { return this.cartService.getTotal(); }

  onQuantityChange(productId: number, value: string): void {
    this.cartService.updateQuantity(productId, parseInt(value, 10));
  }

  onRemove(productId: number): void { this.cartService.removeFromCart(productId); }
  onCheckout(): void { this.router.navigate(['/checkout']); }
  goShopping(): void { this.router.navigate(['/']); }
}