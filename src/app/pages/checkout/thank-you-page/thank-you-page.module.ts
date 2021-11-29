import { OrderComponent } from './orders/order.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ThankYouPageRoutingModule } from './thank-you-page-routing.module';
import { ThankYouPageComponent } from './thank-you-page.component';
import { MaterialModule } from 'src/app/material.module';

@NgModule({
  declarations: [
    ThankYouPageComponent,
    OrderComponent
  ],
  imports: [
    CommonModule,
    ThankYouPageRoutingModule,
    MaterialModule
  ]
})
export class ThankYouPageModule { }
