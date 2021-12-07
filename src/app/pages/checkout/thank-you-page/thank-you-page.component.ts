import { Component } from '@angular/core';
import { Order } from 'src/app/shared/interfaces/order.interface';
import { tap } from 'rxjs/operators';
import { DataService }from 'src/app/shared/services/data.service';
import { getAuth } from "firebase/auth";

@Component({
  selector: 'app-thank-you-page',
  template: `
  <div class="container">
    <h1 class="title">Gracias por haber realizado tu pedido!!    Estas son tus ordenes realizadas:</h1>
  </div>
  <section class="orders">
  <app-order
      [order]="order"
      *ngFor="let order of orders"
    ></app-order>
    </section>`,
  styleUrls: ['./thank-you-page.component.scss']
})
export class ThankYouPageComponent {
  auth = getAuth();
  user = this.auth.currentUser;
  orders!: Order[];
  email?:any;
  constructor(private orderSvc: DataService) { }

  ngOnInit(): void {
    if (this.user) {
      this.email = this.user.email;
      console.log(this.email);
    }
    this.orderSvc.getOrders(this.email)
      .pipe(
        tap((orders: Order[]) =>{
          //console.log("Ordenes:"+orders)
          this.orders = orders} )
      )
      .subscribe();
  }
}
