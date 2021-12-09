import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Product } from '../interfaces/product.interface';
import { Observable } from 'rxjs';

import { AuthService } from 'src/app/shared/services/auth.service'

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductComponent {
  public user$:Observable<any>=this.authSvc.afAuth.user;
  constructor(private authSvc: AuthService) {
  }
  @Input() product!: Product;
  @Output() addToCartClick = new EventEmitter<Product>();


  onClick(): void {
    this.addToCartClick.emit(this.product);
  }

}
