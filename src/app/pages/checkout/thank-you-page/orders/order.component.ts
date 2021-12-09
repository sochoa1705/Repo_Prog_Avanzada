import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Order,DetailsDelivery,DetailsOrder,Details } from 'src/app/shared/interfaces/order.interface';
import { tap } from 'rxjs/operators';
import { DataService }from 'src/app/shared/services/data.service';
import { AuthService } from 'src/app/shared/services/auth.service'
import { Observable } from 'rxjs';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrderComponent {
  @Input() order!: Order;
  public user$:Observable<any>=this.authSvc.afAuth.user;
  name!: string;
  address!: string;
  city!: string;
  openingHours!:string;
  detailsOrder!: DetailsOrder[];
  producName!:string;
  quantity!: number;
  productPrice!: number;

  constructor(
    private authSvc: AuthService,
    private orderSvc: DataService
    ) { }

  ngOnInit(): void {
     /* this.orderSvc.findDetailsOrderByOrderId(this.order.id)
    .pipe(
      tap((detailsOrder: DetailsOrder[]) =>{
        console.log("Detalle1:"+detailsOrder)
        this.detailsOrder = detailsOrder} )
    )
    .subscribe();
    console.log("Detalle de la orden",this.detailsOrder);
    console.log("Id orden",this.order.id);
    /*this.detailsOrder.details.forEach((details:Details)=>{
      this.producName = details.productName;
      this.quantity = details.quantity;
      this.productPrice = details.productPrice;
    })*/
  }

  getData():void{
    this.name = this.order.store === undefined ? "" :this.order.store.name;
    this.address = this.order.store === undefined ? "" :this.order.store.address;
    this.city = this.order.store === undefined ? "" :this.order.store.city;
    this.openingHours = this.order.store === undefined ? "" :this.order.store.openingHours;
  }
  findDetailOrder():void{

  }
}
