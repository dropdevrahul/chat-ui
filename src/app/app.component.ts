import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { AuthenticationService } from './auth/auth.service';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';
import { UserIdleService } from 'angular-user-idle';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent  implements OnDestroy, OnInit {
  title = 'assigment-ui';
  constructor(public authService: AuthenticationService,
        private router: Router, private userIdle: UserIdleService) { }

  ngOnInit(){
  }

  logout() {
      this.authService.logout();
      this.router.navigate(['login']);
  }

  ngOnDestroy() {
  }

}
