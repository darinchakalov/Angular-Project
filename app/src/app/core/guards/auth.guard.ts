import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  // storedUser: boolean = false;
  constructor(private router: Router, private store: Store<any>) {
    // console.log(!!JSON.parse(localStorage.getItem('user')!).user);
    // if (localStorage.getItem('user') != null) {
    //   this.storedUser = false;
    // }
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const { authenticationRequired, authenticationFailureRedirectUrl } =
      route.data;

    if (
      typeof authenticationRequired === 'boolean' &&
      authenticationRequired ===
        !!JSON.parse(localStorage.getItem('user')!).user
    ) {
      return true;
    }

    let authRedirectUrl = authenticationFailureRedirectUrl;
    if (authenticationRequired) {
      const loginRedirectUrl = route.routeConfig?.path || '';
      authRedirectUrl += `?redirectUrl=/${loginRedirectUrl}`;
    }

    return this.router.parseUrl(authRedirectUrl || '/');
  }
}
