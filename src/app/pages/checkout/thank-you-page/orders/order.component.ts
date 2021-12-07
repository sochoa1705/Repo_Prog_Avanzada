import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Order,DetailsDelivery } from 'src/app/shared/interfaces/order.interface';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrderComponent {
  @Input() order!: Order;
  name!: string;
  address!: string;
  city!: string;
  openingHours!:string;
  //count:number=0;

  getData():void{
    this.name = this.order.store === undefined ? "" :this.order.store.name;
    this.address = this.order.store === undefined ? "" :this.order.store.address;
    this.city = this.order.store === undefined ? "" :this.order.store.city;
    this.openingHours = this.order.store === undefined ? "" :this.order.store.openingHours;
  }/*
  sumarContador():number{
    this.count+=1;
    return this.count;
  }*/
}
