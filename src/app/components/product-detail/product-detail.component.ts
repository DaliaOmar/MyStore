import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  product: Product | undefined;
  selectedQuantity: number = 1;
  quantities: number[] = [1, 2, 3, 4, 5];
  notification: string = '';
  isLoading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.productService.getProducts().subscribe({
      next: (products: Product[]) => {
        this.product = this.productService.getProductById(id, products);
        this.isLoading = false;
        if (!this.product) this.router.navigate(['/']);
      },
      error: () => { this.isLoading = false; this.router.navigate(['/']); }
    });
    this.cartService.notification$.subscribe(msg => { this.notification = msg; });
  }

  onQuantityChange(value: string): void {
    this.selectedQuantity = parseInt(value, 10);
  }

  onAddToCart(): void {
    if (this.product) {
      this.cartService.addToCart(this.product, this.selectedQuantity);
      this.selectedQuantity = 1;
    }
  }

  goBack(): void { this.router.navigate(['/']); }
}
