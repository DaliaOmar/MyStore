import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { OrderService } from '../../services/order.service';
import { CartItem } from '../../models/cart-item.model';
import { Order } from '../../models/order.model';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  cartItems: CartItem[] = [];

  firstName: string = '';
  lastName: string = '';
  address: string = '';
  city: string = '';
  state: string = '';
  zip: string = '';
  creditCard: string = '';

  formErrors: { [key: string]: string } = {};
  submitted: boolean = false;

  constructor(
    private cartService: CartService,
    private orderService: OrderService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cartService.cartItems$.subscribe(items => { this.cartItems = items; });
    if (this.cartItems.length === 0) this.router.navigate(['/cart']);
  }

  get total(): number { return this.cartService.getTotal(); }

  validate(): boolean {
    this.formErrors = {};
    if (!this.firstName || this.firstName.trim().length < 2)
      this.formErrors['firstName'] = 'First name must be at least 2 characters.';
    if (!this.lastName || this.lastName.trim().length < 2)
      this.formErrors['lastName'] = 'Last name must be at least 2 characters.';
    if (!this.address || this.address.trim().length < 5)
      this.formErrors['address'] = 'Please enter a valid street address.';
    if (!this.city || this.city.trim().length < 2)
      this.formErrors['city'] = 'Please enter your city.';
    if (!this.state || this.state.trim().length < 2)
      this.formErrors['state'] = 'Please enter your state.';
    if (!this.zip || !/^\d{5}(-\d{4})?$/.test(this.zip))
      this.formErrors['zip'] = 'Please enter a valid ZIP code (e.g. 10001).';
    if (!this.creditCard || !/^\d{16}$/.test(this.creditCard.replace(/\s/g, '')))
      this.formErrors['creditCard'] = 'Please enter a valid 16-digit card number.';
    return Object.keys(this.formErrors).length === 0;
  }

  onSubmit(): void {
    this.submitted = true;
    if (!this.validate()) return;

    const order: Order = {
      firstName: this.firstName,
      lastName: this.lastName,
      address: this.address,
      city: this.city,
      state: this.state,
      zip: this.zip,
      creditCard: this.creditCard,
      items: [...this.cartItems],
      total: this.total,
      orderNumber: this.orderService.generateOrderNumber(),
      date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    };

    this.orderService.setOrder(order);
    this.cartService.clearCart();
    this.router.navigate(['/confirmation']);
  }

  goToCart(): void { this.router.navigate(['/cart']); }
}
