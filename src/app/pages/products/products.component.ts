import { Component, OnInit } from '@angular/core';
import { ProductsService } from './services/products.service';
import { tap } from 'rxjs/operators';
import { Product } from './interfaces/product.interface';
import { ShoppingCartService } from 'src/app/shared/services/shopping-cart.service';

import { Observable } from 'rxjs';

@Component({
  selector: 'app-products',
  template: `
  <div class="container">
    <h1 class="title">Bienvenido!! Estos son los productos que oferta la Tienda</h1>
  </div>
  <section class="products">
    <app-product
      (addToCartClick)="addToCart($event)"
      [product]="product"
      *ngFor="let product of products"
    ></app-product>
  </section>
  `,
  styleUrls: ['./products.component.scss']
})

export class ProductsComponent implements OnInit {
  products!: Product[];
  //public usuario:any;

  constructor(private productSvc: ProductsService, private shoppingCartSvc: ShoppingCartService) { }

  ngOnInit(): void {
    this.productSvc.getProducts()
      .pipe(
        tap((products: Product[]) => this.products = products)
      )
      .subscribe();
  }

  addToCart(product: Product): void {
    console.log('Add to cart', product);
    this.shoppingCartSvc.updateCart(product);
  }
}
