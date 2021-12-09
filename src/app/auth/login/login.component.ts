import { FormGroup, FormControl } from '@angular/forms';
import { Component } from '@angular/core';

import { AuthService } from 'src/app/shared/services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });
  constructor(private authSvc: AuthService, private router: Router) {}

  async onGoogleLogin() {
    try {
      const user = await this.authSvc.loginGoogle();
      if (user) {
        //this.checkUserIsVerified(user);
        this.router.navigate(['/']);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async onLogin(){
    const {email, password}=this.loginForm.value;
    try{
      const user= await this.authSvc.login(email, password);
      if(user && user.user?.emailVerified){
        this.router.navigate(['/products']);
      }else if(user){
        this.router.navigate(['/verification-email']);
      }else{
        alert("Usuario o contraseña incorrectas")
        //this.router.navigate(['/register']);
      }
    }catch(error){
        return console.log(error);
    }
  }
}
