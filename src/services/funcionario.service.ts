import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UtilService } from './util.service';
@Injectable({
  providedIn: 'root',
})
export class FuncionarioService {
  constructor(private http: HttpClient, private utilService: UtilService) {}

  autenticar(request: any) {
    let url = this.utilService.obterUrlDaApi() + 'funcionario/autenticar';
    let headers: any = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.http.post(url, request, headers).toPromise();
  }

  adicionar(form: any) {
    let url = this.utilService.obterUrlDaApi() + 'funcionario/adicionar';
    var header = this.utilService.obterHeaderApi();
    let token = atob(sessionStorage.getItem('token'));

    var header = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', `application/json`),
    };

    return this.http.post(url, form, header).toPromise();
  }

  alterar(form: any) {
    let url = this.utilService.obterUrlDaApi() + 'funcionario/alterar';
    var header = this.utilService.obterHeaderApi();

    return this.http.put(url, form, header).toPromise();
  }

  listarFuncionario() {
    let url = this.utilService.obterUrlDaApi() + 'funcionario/listar';
    var header = this.utilService.obterHeaderApi();

    return this.http.get(url, header).toPromise();
  }

  bloquear(form: any) {
    let url = this.utilService.obterUrlDaApi() + 'funcionario/bloquear';
    var header = this.utilService.obterHeaderApi();

    return this.http.put(url, form, header).toPromise();
  }

  mudarStatus(form: any) {
    let url = this.utilService.obterUrlDaApi() + 'funcionario/mudarStatus';
    var header = this.utilService.obterHeaderApi();

    return this.http.put(url, form, header).toPromise();
  }

  excluir(idFuncionario: any) {
    let url =
      this.utilService.obterUrlDaApi() + 'funcionario/excluir/' + idFuncionario;

    let token = atob(sessionStorage.getItem('token'));

    var header = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', `application/json`),
    };

    return this.http.delete(url, header).toPromise();
  }

  desbloquear(form: any) {
    let url = this.utilService.obterUrlDaApi() + 'funcionario/desbloquear';
    var header = this.utilService.obterHeaderApi();

    return this.http.put(url, form, header).toPromise();
  }

  resetarSenha(form: any) {
    let url = this.utilService.obterUrlDaApi() + 'funcionario/ResetarSenha';
    var header = {
      headers: new HttpHeaders().set('Content-Type', `application/json`),
    };

    return this.http.post(url, form, header).toPromise();
  }

  alterarSenha(form: any) {
    let url = this.utilService.obterUrlDaApi() + 'Funcionario/AlterarSenha';
    var header = {
      headers: new HttpHeaders().set('Content-Type', `application/json`),
    };

    return this.http.put(url, form, header).toPromise();
  }

  listarPor(nome) {
    let url =
      this.utilService.obterUrlDaApi() + 'Funcionario/listarPor/' + nome;
    var header = this.utilService.obterHeaderApi();

    return this.http.get(url, header).toPromise();
  }

  obterPorId(idFuncionario) {
    let url =
      this.utilService.obterUrlDaApi() +
      'Funcionario/obterPorId/' +
      idFuncionario;
    var header = this.utilService.obterHeaderApi();

    return this.http.get(url, header).toPromise();
  }
}
