import { Component } from '@angular/core';
import { Order } from 'src/app/shared/interfaces/order.interface';
import { tap } from 'rxjs/operators';
import { DataService }from 'src/app/shared/services/data.service';

@Component({
  selector: 'app-thank-you-page',
  template: `
  <div class="container">
    <h1 class="title">Gracias por haber realizado tu pedido!</h1>
  </div>
    <p class="content">Estas son tus ordenes realizadas:</p>
  <section class="orders">
  <app-order
      [order]="order"
      *ngFor="let order of orders"
    ></app-order>
    </section>`,
  styleUrls: ['./thank-you-page.component.scss']
})
export class ThankYouPageComponent {
  //todo mio
  orders!: Order[];
  constructor(private orderSvc: DataService) { }

  ngOnInit(): void {
    this.orderSvc.getOrders()
      .pipe(
        tap((orders: Order[]) => this.orders = orders)
      )
      .subscribe();
  }
}
