import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { map, take } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(private authSrv: AuthService, private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ):
        | boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        return this.authSrv.user$.pipe(
            take(1),
            map((user) => {
                if (user) {
                    return true;
                }
                alert('Per visualizzare questa risorsa devi essere loggato! Accedi o registrati')
                return this.router.createUrlTree(['/login'])
            })
        )
    }
}
