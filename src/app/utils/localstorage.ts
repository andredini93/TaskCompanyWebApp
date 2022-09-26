import { User } from '../account/models/user';
export class LocalStorageUtils {

    public getUser() {
        return JSON.parse(localStorage.getItem('devio.user'));
    }

    public saveUserLocalData(response: any, user: User) {
        this.saveUserToken(response.accessToken);
        this.saveUser(user.email);
    }

    public cleanUserLocalData() {
        localStorage.removeItem('devio.token');
        localStorage.removeItem('devio.user');
    }

    public getUserToken(): string {
        return localStorage.getItem('devio.token');
    }

    public saveUserToken(token: string) {
        localStorage.setItem('devio.token', token);
    }

    public saveUser(user: string) {
        localStorage.setItem('devio.user', JSON.stringify(user));
    }

}
