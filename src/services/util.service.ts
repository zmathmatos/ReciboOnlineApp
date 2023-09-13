import { Injectable } from '@angular/core';
import {
  LoadingController,
  AlertController,
  ToastController,
} from '@ionic/angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UtilService {
  public load: HTMLIonLoadingElement;

  constructor(
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private http: HttpClient
  ) {}

  obterUrlDaApi() {
    return 'https://reciboonline.api.qsti.com.br/api/';
    //return 'http://localhost:8081/api/';
    //return "http://192.168.1.4:8181/api/";
  }

  private eventSubject = new Subject<any>();

  publishEvent(key: any, value: any) {
    let data = { key: key, value: value };
    this.eventSubject.next(data);
  }

  getEvent(): Subject<any> {
    return this.eventSubject;
  }

  obterHeaderApi() {
    let token = atob(sessionStorage.getItem('token'));
    var header = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', `application/json`),
    };
    return header;
  }

  async showLoading(message = 'Processando') {
    this.load = await this.loadingCtrl.create({ message: message });
    this.load.present();
  }

  hideLoading() {
    if (this.load != undefined && this.load != null) {
      this.load.dismiss();
    } else {
      setTimeout(() => {
        this.hideLoading();
      }, 1000);
    }
  }

  async showAlertLogin(message: string, callback: any = null) {
    const alert = await this.alertCtrl.create({
      header: 'Usuário Logado!',
      message: message,
      backdropDismiss: false,
      animated: true,
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            if (callback != null) {
              callback();
            }
          },
        },
      ],
    });

    await alert.present();
  }

  async showAlert(message: string, callback: any = null) {
    const alert = await this.alertCtrl.create({
      header: 'Atenção!',
      message: message,
      backdropDismiss: false,
      animated: true,
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            if (callback != null) {
              callback();
            }
          },
        },
      ],
    });

    await alert.present();
  }

  async showAlertFuncionarioLogado(message: string, callback: any = null) {
    const alert = await this.alertCtrl.create({
      header: 'Funcionário Logado!',
      message: message,
      backdropDismiss: false,
      animated: true,
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            if (callback != null) {
              callback();
            }
          },
        },
      ],
    });

    await alert.present();
  }


  async showAlertUsuarioLogado(message: string, callback: any = null) {
    const alert = await this.alertCtrl.create({
      header: 'Usuário Logado!',
      message: message,
      backdropDismiss: false,
      animated: true,
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            if (callback != null) {
              callback();
            }
          },
        },
      ],
    });

    await alert.present();
  }

  async showAlertConfirm(
    message: string,
    header: string = 'Atenção',
    callback: any = null
  ) {
    const alert = await this.alertCtrl.create({
      header: 'Atenção',
      message: message,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {},
        },
        {
          text: 'Ok',
          handler: () => {
            if (callback != null) {
              callback();
            }
          },
        },
      ],
    });

    await alert.present();
  }

  async showToast(
    message: string,
    duration: number = 2000,
    position: any = 'middle'
  ) {
    const toast = await this.toastCtrl.create({
      message: message,
      duration: duration,
      cssClass: 'animated bounceInRight',
      color: 'secondary',
      position: position,
    });
    toast.present();
  }

  async showErrorLogin(response: any) {
    //debugger;

    if (response.error == undefined) {
      this.showAlertLogin('Operação falhou!');
      return;
    }
    let notifications = response.error.notifications;

    if (response.status != 400 || notifications == undefined) {
      this.showAlertLogin('Operação falhou!');
      return;
    }

    let html: string = '<ion-list no-lines>';
    (notifications as any[]).forEach((notification) => {
      //console.log(notification.message);

      let ionItem: string = '<ion-item>' + notification.message + '</ion-item>';
      html += ionItem;
      //this.showToast(notification.message);
    });

    html += '</ion-list>';

    //this.showToast(html, 5000);
    this.showAlertLogin(html);
  }

  async showError(response: any) {
    //debugger;

    if (response.error == undefined) {
      this.showAlert('Operação falhou!');
      return;
    }
    let notifications = response.error.notifications;

    if (response.status != 400 || notifications == undefined) {
      this.showAlert('Operação falhou!');
      return;
    }

    let html: string = '<ion-list no-lines>';
    (notifications as any[]).forEach((notification) => {
      //console.log(notification.message);
      let message = '';
      if (notification.message == undefined) {
        message = notification;
      } else {
        message = notification.message;
      }

      let ionItem: string = '<ion-item>' + message + '</ion-item>';
      html += ionItem;
      //this.showToast(notification.message);
    });

    html += '</ion-list>';

    //this.showToast(html, 5000);
    this.showAlert(html);
  }

  private dataSubject = new Subject<any>();

  publishSomeData(data: any) {
    this.dataSubject.next(data);
  }

  getObservable(): Subject<any> {
    return this.dataSubject;
  }

  getUserLevel(): string {
    const userData = JSON.parse(localStorage.getItem('user'));
    return userData.level;
  }

  enviarPush(form: any) {
    let url = this.obterUrlDaApi() + 'Util/EnviarAvisoPush';

    let token = atob(sessionStorage.getItem('token'));

    var header = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', `application/json`),
    };

    return this.http.post(url, form, header).toPromise();
  }
}
