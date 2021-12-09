import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Order,DetailsDelivery,DetailsOrder,Details } from 'src/app/shared/interfaces/order.interface';
import { tap } from 'rxjs/operators';
import { DataService }from 'src/app/shared/services/data.service';

@Component({
  selector: 'app-detailOrder',
  templateUrl: './detailOrder.component.html',
  styleUrls: ['./detailOrder.component.scss']
})
export class DetailOrderComponent {
  @Input() orderId!: number;
  //detailsOrder = this.orderSvc.findDetailsOrderByOrderId(this.orderId);
  detailsOrder!:DetailsOrder;
  producName!:string;
  detailsOrd!: Details[];
  quantity!: number;
  productPrice!: number;

  constructor(private orderSvc: DataService) { }

  ngOnInit(): void {

    this.orderSvc.findDetailsOrderByOrderId(this.orderId).pipe(
      tap((details: DetailsOrder) =>{
        this.detailsOrd = details.details
        console.log("Detalle2 de la orden",this.detailsOrd);
      } )
    )
    .subscribe();
    //this.detailsOrd.details
    console.log("Detalle de la orden",this.detailsOrd);
    /*this.detailsOrd.details.forEach((details:Details)=>{
      this.producName = details.productName;
      console.log("Name",this.producName)
      this.quantity = details.quantity;
      this.productPrice = details.productPrice;
    })*/
  }
}
