import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { tap } from 'rxjs/operators';
import { AuthData } from './auth-data.interface';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
@Injectable({
    providedIn: 'root'
})
export class AuthService {

    jwtHelper = new JwtHelperService();
    baseURL = environment.baseURL;
    private authSubj = new BehaviorSubject<null | AuthData>(null);
    utente!: AuthData;

    user$ = this.authSubj.asObservable();
    timeoutLogout: any;

    constructor(private http: HttpClient, private router: Router) {
    }

    //Il login deve scrivere il token, quindi non si tratta di una GET ma di una POST
    login(data: { email: string, password: string }) {
        return this.http.post<AuthData>(`${this.baseURL}login`, data).pipe(
            tap((data) => {
                console.log(data);
                this.authSubj.next(data);
                this.utente = data;
                console.log(this.utente);
                localStorage.setItem('user', JSON.stringify(data));
                this.autoLogout(data);
            })
        );
    }

    restore() {
        const user = localStorage.getItem('user');
        if (!user) {
            return
        }
        const userData: AuthData = JSON.parse(user);
        if (this.jwtHelper.isTokenExpired(userData.accessToken)) {
            return;
        }
        this.authSubj.next(userData);
        this.autoLogout(userData);
    }

    signup(data: { name: string, lastName: string, email: string, password: string }) {
        return this.http.post(`${this.baseURL}register`, data);
    }

    logout() {
        this.authSubj.next(null);
        localStorage.removeItem('user');
        this.router.navigate(['/']);
        if (this.timeoutLogout) {
            clearTimeout(this.timeoutLogout);
        }
    }
    autoLogout(data: AuthData) {
        const expirationDate = this.jwtHelper.getTokenExpirationDate(data.accessToken) as Date;
        const expirationMilliseconds = expirationDate.getTime() - new Date().getTime();
        this.timeoutLogout = setTimeout(() => {
            this.logout();
        }, expirationMilliseconds);
    }
}
