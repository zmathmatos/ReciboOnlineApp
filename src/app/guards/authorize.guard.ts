import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthorizeGuard implements CanActivate {
  constructor(public router: Router) { }

  canActivate(): boolean {
    let token = sessionStorage.getItem('token');

    if (token == null || token == undefined) {
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }
  
}
