#  Pajama Store — Premium Pajama Store

A full-featured Angular 17 single-page e-commerce application for a premium pajama brand. Soft editorial aesthetic with warm cream tones, dusty rose accents, and Cormorant Garamond typography.

## Quick Start

**Requirements:** Node.js ≥ 18, npm ≥ 9

```bash
npm install
ng serve
# Open http://localhost:4200
```

## Pages & Features

| Page | Route | Description |
|---|---|---|
| Shop | `/` | Product grid with Women / Men / Kids filter |
| Product Detail | `/product/:id` | Photo, name, price, description, add to cart |
| Cart | `/cart` | Items, quantity controls, remove, order total |
| Checkout | `/checkout` | Validated shipping + payment form |
| Confirmation | `/confirmation` | Order number, summary, delivery estimate |

## Project Structure

```
src/
├── app/
│   ├── components/
│   │   ├── product-list/         
│   │   ├── product-item/       
│   │   ├── product-detail/      
│   │   ├── shopping-cart/       
│   │   ├── checkout/            
│   │   └── order-confirmation/   
│   ├── models/
│   │   ├── product.model.ts
│   │   ├── cart-item.model.ts
│   │   └── order.model.ts
│   ├── services/
│   │   ├── product.service.ts   
│   │   ├── cart.service.ts      
│   │   └── order.service.ts     
│   ├── app-routing.module.ts
│   ├── app.module.ts
│   └── app.component.*         
├── assets/
│   └── data.json             
├── index.html
├── main.ts
└── styles.css                   
```

## Angular Concepts Used

| Concept | Where |
|---|---|
| `HttpClient` + `Observable` | `ProductService.getProducts()` |
| `*ngFor` | Product grid, cart rows, order summary |
| `*ngIf` | Loading states, empty states, error messages |
| `[(ngModel)]` + `(ngModelChange)` | Quantity selectors & checkout inputs |
| `(click)` event binding | Add to cart, remove, navigate, submit |
| `@Input()` | `product` prop on `ProductItemComponent` |
| `@Output()` + `EventEmitter` | `addToCart` event from `ProductItemComponent` |
| `BehaviorSubject` service | `CartService` shared between unrelated components |
| `<router-outlet>` + `routerLink` | SPA navigation, no page reload |
| `routerLinkActive` | Active state on nav links |
| `ActivatedRoute` | Reads `:id` param on detail page |
| TypeScript interfaces | `Product`, `CartItem`, `Order` |
| Client-side validation | ZIP regex, 16-digit card, min-length names |
