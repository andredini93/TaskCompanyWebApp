import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageUtils } from 'src/app/utils/localstorage';

@Component({
  selector: 'app-menu-login',
  templateUrl: './menu-login.component.html'
})
export class MenuLoginComponent {

  token: string = "";
  user: any;
  email: string = "";
  localStorageUtils = new LocalStorageUtils();

  constructor(private router: Router) {  }

  loggedUser(): boolean {
    this.token = this.localStorageUtils.getUserToken();
    this.user = this.localStorageUtils.getUser();

    if (this.user)
      this.email = this.user.email;

    return this.token !== null;
  }

  logout() {
    this.localStorageUtils.cleanUserLocalData();
    this.router.navigate(['/home']);
  }
}
