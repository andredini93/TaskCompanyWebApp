import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { Observable } from "rxjs";
import { catchError, map } from "rxjs/operators";

import { BaseService } from 'src/app/services/base.service';
import { Company } from '../models/company';

@Injectable()
export class CompanyService extends BaseService {

    company: Company = new Company();

    constructor(private http: HttpClient) { super() }

    GetAll(): Observable<Company[]> {
        return this.http
            .get<Company[]>(this.UrlServiceV1 + "Company", super.getAuthHeaderJson())
            .pipe(map(super.extractData),
                  catchError(super.serviceError));
    }

    GetById(id: number): Observable<Company> {
        return this.http
            .get<Company>(this.UrlServiceV1 + "Company/GetById/" + id, super.getAuthHeaderJson())
            .pipe(map(super.extractData),
                  catchError(super.serviceError));
    }

    GetByISIN(isin: string): Observable<Company> {
      return this.http
          .get<Company>(this.UrlServiceV1 + "Company/GetByISIN/" + isin, super.getAuthHeaderJson())
          .pipe(map(super.extractData),
                catchError(super.serviceError));
  }

    NewCompany(company: Company): Observable<Company> {
        return this.http
            .post(this.UrlServiceV1 + "Company", company, this.getAuthHeaderJson())
            .pipe(
                map(super.extractData),
                catchError(super.serviceError));
    }

    UpdateCompany(company: Company): Observable<Company> {
        return this.http
            .put(this.UrlServiceV1 + "Company/" + company.id, company, super.getAuthHeaderJson())
            .pipe(
                map(super.extractData),
                catchError(super.serviceError));
    }

    DeleteCompany(id: number): Observable<Company> {
        return this.http
            .delete(this.UrlServiceV1 + "Company/" + id, super.getAuthHeaderJson())
            .pipe(
                map(super.extractData),
                catchError(super.serviceError));
    }
}
