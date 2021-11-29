import { Component} from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  public user$:Observable<any>=this.authSvc.afAuth.user;

  constructor(public authSvc: AuthService,private router: Router) { }

  goToCheckout(): void {
    this.router.navigate(['/checkout']);
  }

  async onLogout() {
    try {
      await this.authSvc.logout();
      this.router.navigate(['/']);
    } catch (error) {
      console.log(error);
    }
  }
}
