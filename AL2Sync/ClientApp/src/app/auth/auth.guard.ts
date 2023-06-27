import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserResponse } from '../models/responses/userResponse.model';
import { SessionmanagerService } from '../services/sessionmanager.service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private sessionmanagerService: SessionmanagerService,
    private router: Router) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if (!this.authService.isAuthenticated()) {
        this.router.navigate(['/login']);
        return false;
    }
    if (this.authService.authenticatedUser === null && localStorage['user']) {
      return this.sessionmanagerService.isAdmin().toPromise().then((user: any) => {
        if (user) {
          this.authService.reAuthenticatedUser(user.isadmin);
          return true;
        } else {
          this.router.navigate(['/login']);
          return false;
        }
      }).catch(error => {
        if (error.status == 401) {
          localStorage.clear();
          this.router.navigate(['/login']);
        }
        console.error(error);
        return false;
      })
    } else {
      return true;
    }
  }

}
