import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UtilService } from './util.service';
@Injectable({
  providedIn: 'root',
})
export class ReciboService {
  constructor(private http: HttpClient, private utilService: UtilService) {}

  obterRecibo(matricula, mes, ano) {
    let url =
      this.utilService.obterUrlDaApi() +
      'Recibo/ObterRecibo/' +
      matricula +
      '/' +
      mes +
      '/' +
      ano;
    let token = atob(sessionStorage.getItem('token_funcionario'));

    var header = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', `application/json`),
    };

    return this.http.get(url, header).toPromise();
  }


  enviarVisualizacao(form: any ){
    let url = this.utilService.obterUrlDaApi() + 'Visualizacao/EnviarVisualizacao'
    let token = atob(sessionStorage.getItem('token_funcionario'));

    var header = new HttpHeaders()
    .set('Authorization', `Bearer ${token}`)
    .set('Content-Type', `application/json`);

    return this.http.post(url, form, { headers: header }).toPromise();

  }


  listar() {
    let url = this.utilService.obterUrlDaApi() + 'Recibo/ListarRecibo/';

    let token = atob(sessionStorage.getItem('token_funcionario'));

    var header = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', `application/json`),
    };

    return this.http.get(url, header).toPromise();
  }


  listarVisualizacao(mes, ano ) {
    let url =
      this.utilService.obterUrlDaApi() +
      'Visualizacao/RelatorioVisualizacoes/' +
      mes + "/" + ano ;

    let token = atob(sessionStorage.getItem('token'));

    var header = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', `application/json`),
    };

    return this.http.get(url, header).toPromise();
  }
}
