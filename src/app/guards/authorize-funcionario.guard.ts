import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthorizeGuardFuncionario implements CanActivate {
  constructor(public router: Router) { }

  canActivate(): boolean {
    let token = sessionStorage.getItem('token_funcionario');

    if (token == null || token == undefined) {
      this.router.navigate(['funcionario/login']);
      return false;
    }
    return true;
  }

}
