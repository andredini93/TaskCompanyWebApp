import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanDeactivate } from '@angular/router';
import { LocalStorageUtils } from 'src/app/utils/localstorage';
import { CreateComponent } from '../create/create.component';

@Injectable()
export class CompanyGuard implements CanActivate, CanDeactivate<CreateComponent> {

    localStorageUtils = new LocalStorageUtils();

    constructor(private router: Router) { }

    canDeactivate(component: CreateComponent) {
        if(component.changesNotSaved) {
            return window.confirm('Are you sure you want to abandon filling out the form?');
        }
        return true
    }

    canActivate(routeAc: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

        if (!this.localStorageUtils.getUserToken()) {
            this.router.navigate(['/conta/login']);
        }

        let user = this.localStorageUtils.getUser();
        if(user === undefined){
          this.browseAccessDenied()
        }
        else{
          return true;
        }
    }

    browseAccessDenied() {
        this.router.navigate(['/acesso-negado']);
    }
}
