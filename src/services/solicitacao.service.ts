import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UtilService } from './util.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SolicitacaoService {
  constructor(private http: HttpClient, private utilService: UtilService) {}

  listar(status: any) {
    let url = this.utilService.obterUrlDaApi() + 'Solicitacao/Listar/' + status;

    let token = atob(sessionStorage.getItem('token'));

    var header = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', `application/json`),
    };

    return this.http.get(url, header).toPromise();
  }

  adicionar(form: any) {
    let url = this.utilService.obterUrlDaApi() + 'Solicitacao/AdicionarSolicitacao';

    let token = atob(sessionStorage.getItem('token'));

    var header = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', `application/json`)
    }

    return this.http.post(url, form, header).toPromise();
  }

  excluir(id: any) {
    let url = this.utilService.obterUrlDaApi() + 'Solicitacao/excluir/' + id;

    let token = atob(sessionStorage.getItem('token'));

    var header = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', `application/json`),
    };

    return this.http.delete(url, header).toPromise();
  }

  obterPorId(id) {
    let url = this.utilService.obterUrlDaApi() + 'Solicitacao/obterPorId/' + id;

    let token = atob(sessionStorage.getItem('token'));

    var header = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', `application/json`),
    };

    return this.http.get(url, header).toPromise();
    //return this.http.get(url).toPromise();
  }
}
