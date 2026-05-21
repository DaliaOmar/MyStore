import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent implements OnInit {
  @Input() product!: Product;
  @Output() addToCart = new EventEmitter<{ product: Product; quantity: number }>();

  selectedQuantity: number = 1;
  quantities: number[] = [1, 2, 3, 4, 5];

  ngOnInit(): void {}

  onQuantityChange(value: string): void {
    this.selectedQuantity = parseInt(value, 10);
  }

  onAddToCart(): void {
    this.addToCart.emit({ product: this.product, quantity: this.selectedQuantity });
    this.selectedQuantity = 1;
  }
}
