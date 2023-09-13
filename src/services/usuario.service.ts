import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UtilService } from './util.service';
@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  userType: string;
  constructor(private http: HttpClient, private utilService: UtilService) { }

  autenticar(request: any) {
    let url = this.utilService.obterUrlDaApi() + 'Usuario/Autenticar';
    let headers: any = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(url, request, headers).toPromise();
  }

  adicionar(form: any) {
    let url = this.utilService.obterUrlDaApi() + 'Usuario/Adicionar';
    let token = atob(sessionStorage.getItem('token'));

    var header = {
      headers: new HttpHeaders()
        .set('Content-Type', `application/json`)
    };

    return this.http.post(url, form, header).toPromise();
  }

  alterar(form: any) {
    let url = this.utilService.obterUrlDaApi() + 'usuario/Alterar';
    var header = this.utilService.obterHeaderApi();

    return this.http.put(url, form, header).toPromise();
  }
  listar() {
    let url = this.utilService.obterUrlDaApi() + 'usuario/listar/';

    let token = atob(sessionStorage.getItem('token'));

    var header = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', `application/json`)
    }

    return this.http.get(url, header).toPromise();
  }

  resetarSenha(form: any) {
    let url = this.utilService.obterUrlDaApi() + 'Usuario/ResetarSenha';
    var header = {
      headers: new HttpHeaders()
        .set('Content-Type', `application/json`)
    };

    return this.http.post(url, form, header).toPromise();
  }

  excluir(idUsuario: any) {
    let url = this.utilService.obterUrlDaApi() + 'usuario/excluir/' + idUsuario;

    let token = atob(sessionStorage.getItem('token_admin'));

    var header = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', `application/json`)
    }

    return this.http.delete(url, header).toPromise();
  }

  alterarSenha(form: any) {
    let url = this.utilService.obterUrlDaApi() + 'usuario/AlterarSenha';
    var header = {
      headers: new HttpHeaders()
        .set('Content-Type', `application/json`)
    };

    return this.http.put(url, form, header).toPromise();
  }

  mudarStatus(form: any) {
    let url = this.utilService.obterUrlDaApi() + 'usuario/mudarStatus';
    var header = this.utilService.obterHeaderApi();

    return this.http.put(url, form, header).toPromise();
  }
}
