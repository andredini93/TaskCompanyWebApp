import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Company } from '../models/company';
import { CompanyService } from './company.service';

@Injectable()
export class CompanyResolve implements Resolve<Company> {

    constructor(private companyService: CompanyService) { }

    resolve(route: ActivatedRouteSnapshot) {
        return this.companyService.GetById(route.params['id']);
    }
}
