import { DetailsOrder,Order} from './../interfaces/order.interface';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '../interfaces/stores.interface';

@Injectable({
  providedIn: 'root'
})

export class DataService {
  private apiURL = 'http://localhost:3000';
  constructor(private http: HttpClient) { }

  getStores(): Observable<Store[]> {
    return this.http.get<Store[]>(`${this.apiURL}/stores`)
  }
  //Cambio
  getOrders(correo:string): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.apiURL}/orders/?email=${correo}`);
  }
  //
  saveOrder(order: Order): Observable<Order> {
    return this.http.post<Order>(`${this.apiURL}/orders`, order);
  }

  saveDetailsOrder(details: DetailsOrder): Observable<DetailsOrder> {
    return this.http.post<DetailsOrder>(`${this.apiURL}/detailsOrders`, details);
  }

  findDetailsOrderByOrderId(orderId:number): Observable<DetailsOrder> {
    console.log("el id es:",orderId);
    return this.http.get<DetailsOrder>(`${this.apiURL}/detailsOrders/?id=${orderId}`);
  }
  getDetailsOrderByOrderId(): Observable<DetailsOrder[]> {
    return this.http.get<DetailsOrder[]>(`${this.apiURL}/detailsOrders`);
  }
}
