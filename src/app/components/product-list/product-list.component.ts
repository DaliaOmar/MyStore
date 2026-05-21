import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  categories: string[] = [];
  selectedCategory: string = 'All';
  isLoading: boolean = true;
  notification: string = '';

  constructor(private productService: ProductService, private cartService: CartService) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe({
      next: (data: Product[]) => {
        this.products = data;
        this.filteredProducts = data;
        this.categories = ['All', ...new Set(data.map(p => p.category))];
        this.isLoading = false;
      },
      error: () => { this.isLoading = false; }
    });
    this.cartService.notification$.subscribe(msg => { this.notification = msg; });
  }

  onCategoryChange(cat: string): void {
    this.selectedCategory = cat;
    this.filteredProducts = cat === 'All'
      ? this.products
      : this.products.filter(p => p.category === cat);
  }

  onAddToCart(event: { product: Product; quantity: number }): void {
    this.cartService.addToCart(event.product, event.quantity);
  }
}
