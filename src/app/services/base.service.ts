import { HttpHeaders, HttpErrorResponse } from "@angular/common/http";
import { throwError } from "rxjs";
import { environment } from 'src/environments/environment';
import { LocalStorageUtils } from '../utils/localstorage';

export abstract class BaseService {

    protected UrlServiceV1: string = environment.apiUrlv1;
    public LocalStorage = new LocalStorageUtils();

    protected getHeaderJson() {
        return {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        };
    }

    protected getAuthHeaderJson() {
        return {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.LocalStorage.getUserToken()}`
            })
        };
    }

    protected extractData(response: any) {
        return response.data || {};
    }

    protected serviceError(response: Response | any) {
        let customError: string[] = [];
        let customResponse = { error: { errors: [] }}

        if (response instanceof HttpErrorResponse) {

            if (response.statusText === "Unknown Error") {
                customError.push("An unknown error has occurred");
                response.error.errors = customError;
            }
        }
        if (response.status === 500) {
            customError.push("There was an error processing, please try again later or contact our support.");

            customResponse.error.errors = customError;
            return throwError(customResponse);
        }

        console.error(response);
        return throwError(response);
    }
}
