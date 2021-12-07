import { ShoppingCartService } from './../../shared/services/shopping-cart.service';
import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { switchMap, tap } from 'rxjs/operators';
import { Store } from 'src/app/shared/interfaces/stores.interface';
import { DataService } from 'src/app/shared/services/data.service';
import { Details, Order } from 'src/app/shared/interfaces/order.interface';
import { Product } from '../products/interfaces/product.interface';
import { Router } from '@angular/router';
import { ProductsService } from '../products/services/products.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { getAuth } from "firebase/auth";

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  auth = getAuth();
  user = this.auth.currentUser;
  email?:any;
  model = {
    name: '',
    store: '',
    shippingAddress: '',
    city: ''
  };
  isDelivery = true;
  cart: Product[] = [];
  stores: Store[] = [];
  isChangPage = false;



  constructor(
    private dataSvc: DataService,
    private shoppingCartSvc: ShoppingCartService,
    private router: Router,
    private productsSvc: ProductsService,
    private authSvc: AuthService
  ) {
    this.checkIfCartIsEmpty();
  }

  ngOnInit(): void {
    this.getStores();
    this.getDataCart();
    this.prepareDetails();
    if (this.user) {
      this.email = this.user.email;
      console.log(this.email);
    }
  }

  onPickupOrDelivery(value: boolean): void {
    this.isDelivery = value;
  }

  onSubmit({ value: formData }: NgForm): void {
    console.log('Guardar', formData);
    const data: Order = {
      ...formData,
      date: this.getCurrentDay(),
      email:this.email,
      isDelivery: this.isDelivery
    }
    this.dataSvc.saveOrder(data)
      .pipe(
        tap(res => console.log('Order ->', res)),
        switchMap(({ id: orderId }) => {
          const details = this.prepareDetails();
          this.isChangPage = true;
          return this.dataSvc.saveDetailsOrder({ details, orderId });
        }),
        tap(() => this.shoppingCartSvc.resetCart()),
        tap(() => this.router.navigate(['/checkout/thank-you-page']))
      )
      .subscribe();
  }

  private getStores(): void {
    this.dataSvc.getStores()
      .pipe(
        tap((stores: Store[]) => this.stores = stores))
      .subscribe()
  }

  private getCurrentDay(): string {
    return new Date().toLocaleDateString();
  }

  private prepareDetails(): Details[] {
    const details: Details[] = [];
    this.cart.forEach((product: Product) => {
      const { id: productId, name: productName, qty: quantity, stock } = product;
      const updateStock = (stock - quantity);

      this.productsSvc.updateStock(productId, updateStock)
        .pipe(
          tap(() => details.push({ productId, productName, quantity }))
        )
        .subscribe()


    })
    return details;
  }

  private getDataCart(): void {
    this.shoppingCartSvc.cartAction$
      .pipe(
        tap((products: Product[]) => this.cart = products)
      )
      .subscribe()
  }

  private checkIfCartIsEmpty(): void {
    this.shoppingCartSvc.cartAction$
      .pipe(
        tap((products: Product[]) => {
          if (Array.isArray(products) && !products.length && this.isChangPage==true) {
            this.router.navigate(['/checkout/thank-you-page']);
          }
        })
      )
      .subscribe()
  }
}

