import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SendEmailComponent } from './send-email.component';

import { SendEmailRoutingModule } from './send-email-routing.module';

@NgModule({
  declarations: [
    SendEmailComponent
  ],
  imports: [
    CommonModule,
    SendEmailRoutingModule
  ]
})
export class SendEmailModule { }
