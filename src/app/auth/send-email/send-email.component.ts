import { AuthService } from 'src/app/shared/services/auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
//import { User } from '@shared/models/user.interface';

@Component({
  selector: 'app-send-email',
  templateUrl: './send-email.component.html',
  styleUrls: ['./send-email.component.scss']
  //providers:[AuthService]
})
export class SendEmailComponent implements OnInit {
  public user$:Observable<any>=this.authSvc.afAuth.user;

  constructor(private authSvc: AuthService) {}

  ngOnInit(): void {
  }
  onSendEmail(): void {
    this.authSvc.sendVerificationEmail();
  }

  ngOnDestroy() {
    this.authSvc.logout();
  }
}
