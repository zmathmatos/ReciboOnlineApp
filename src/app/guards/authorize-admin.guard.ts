import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthorizeGuardAdmin implements CanActivate {
  constructor(public router: Router) { }

  canActivate(): boolean {
    let token = sessionStorage.getItem('token_admin');

    if (token == null || token == undefined) {
      this.router.navigate(['adm/login']);
      return false;
    }
    return true;
  }

}
