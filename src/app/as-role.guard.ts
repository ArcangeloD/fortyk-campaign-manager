import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AsRoleGuard implements CanActivate {
  
  constructor (private authService: AuthService, private router: Router) {}
  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let roles = route.data.roles as Array<string>;
    if (this.authService.user)
    {
      if (this.authService.user.user_metadata)
      {
        if (this.authService.user.user_metadata.special_role)
        {
          if (roles.includes(this.authService.user.user_metadata.special_role))
          {
            return true;
          }
        }
      }
    }
    return this.router.parseUrl('not-found');
  }
  
}
