import { Component } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';


import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
  providers:[AuthService]
})
export class ForgotPasswordComponent {
  userEmail = new FormControl('');
  constructor(private authSvc: AuthService, private router: Router) {}

  async onReset() {
    try {
      const email = this.userEmail.value;
      await this.authSvc.resetPassword(email);
      window.alert('Correo electrónico enviado, revise su bandeja de entrada!');
      this.router.navigate(['/login']);
      //console.log(email);
    } catch (error) {
      console.log(error);
    }
  }
}
