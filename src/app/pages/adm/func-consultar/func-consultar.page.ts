import { NavController, AlertController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { FuncionarioService } from '../../../../services/funcionario.service';
import { UtilService } from '../../../../services/util.service';

@Component({
  selector: 'app-func-consultar',
  templateUrl: './func-consultar.page.html',
  styleUrls: ['./func-consultar.page.scss'],
})
export class FuncConsultarPage implements OnInit {
  loading: boolean = false;
  funcionarioCollection: any[] = [];
  funcionarioCollectionClone: any[] = [];
  palavra: string;

  constructor(
    public navCtrl: NavController,
    private funcionarioService: FuncionarioService,
    private alertCtrl: AlertController,
    private utilService: UtilService
  ) {}

  ngOnInit() {}

  ionViewDidEnter() {
    this.listarFuncionario();
  }

  listarFuncionario(callback = null) {
    this.loading = true;
    this.funcionarioService
      .listarFuncionario()
      .then((response: any) => {
        this.loading = false;
        this.funcionarioCollection = response.data;
        this.funcionarioCollectionClone = this.funcionarioCollection;

        if (callback != null) {
          callback();
        }
      })
      .catch((erro) => {
        this.loading = false;
        console.log(erro);
      })
      .finally(() => {
        //this.utilService.hideLoading();
      });
  }

  filtrar(evt) {
    this.funcionarioCollection = this.funcionarioCollectionClone;
    const searchTerm = evt.srcElement.value;

    if (!searchTerm) {
      return;
    }

    this.funcionarioCollection = this.funcionarioCollection.filter((c) => {
      if (searchTerm) {
        if (
          c.matricula.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1 ||
          c.nome.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1
        ) {
          return true;
        }
        return false;
      }
    });
  }

  async bloquear(idFuncionario) {
    const alert = await this.alertCtrl.create({
      header: 'Atenção!',
      message: 'Tem certeza que deseja bloquear o acesso deste funcionario?',
      buttons: [
        {
          text: 'Não',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {},
        },
        {
          text: 'OK',
          handler: () => {
            this.bloquearFuncionario(idFuncionario);
          },
        },
      ],
    });

    await alert.present();
  }

  bloquearFuncionario(idFuncionario) {
    let form = {
      idFuncionario: idFuncionario,
      idUsuario: null,
    };
    this.loading = true;
    this.funcionarioService
      .bloquear(form)
      .then((response: any) => {
        this.loading = false;
        if (response.success == true) {
          this.utilService.showAlert('Operação realizada com sucesso', () => {
            this.listarFuncionario();
          });
        } else {
          this.utilService.showError(response);
        }
      })
      .catch((error) => {
        this.loading = false;
        //console.error(error);
        this.utilService.showAlert(
          'Desculpe, operação falhou! Tente novamente mais tarde.'
        );
      })
      .finally(() => {
        this.utilService.hideLoading();
      });
  }

  async desbloquear(idFuncionario) {
    const alert = await this.alertCtrl.create({
      header: 'Atenção!',
      message: 'Tem certeza que deseja desbloquear o acesso deste funcionario?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {},
        },
        {
          text: 'OK',
          handler: () => {
            this.desbloquearFuncionario(idFuncionario);
          },
        },
      ],
    });

    await alert.present();
  }

  async excluir(idFuncionario: any) {
    const alert = await this.alertCtrl.create({
      header: 'Atenção!',
      message: 'Tem certeza que deseja excluír?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {},
        },
        {
          text: 'OK',
          handler: () => {
            this.loading = true;
            this.funcionarioService
              .excluir(idFuncionario)
              .then((response: any) => {
                this.loading = false;
                if (response.success == true) {
                  this.utilService.showAlert(
                    'Operação realizada com sucesso',
                    () => {
                      this.listarFuncionario();
                      this.navCtrl.navigateRoot('adm/func-consultar');
                    }
                  );
                } else {
                  this.utilService.showError(response);

                  //this.response = response;
                  // (response.notifications as any[]).forEach(notification => {

                  //   this.utilService.showToast(notification.message);
                  // });
                }
              })
              .catch((error) => {
                this.loading = false;
                //console.error(error);
                this.utilService.showAlert(
                  'Desculpe, operação falhou! Tente novamente mais tarde.'
                );
              })
              .finally(() => {
                this.utilService.hideLoading();
              });
          },
        },
      ],
    });

    await alert.present();
  }

  desbloquearFuncionario(idFuncionario) {
    let form = {
      idFuncionario: idFuncionario,
      idUsuario: null,
    };
    this.loading = true;
    this.funcionarioService
      .desbloquear(form)
      .then((response: any) => {
        this.loading = false;
        if (response.success == true) {
          this.utilService.showAlert('Operação realizada com sucesso', () => {
            this.listarFuncionario();
          });
        } else {
          this.utilService.showError(response);
        }
      })
      .catch((error) => {
        this.loading = false;
        //console.error(error);
        this.utilService.showAlert(
          'Desculpe, operação falhou! Tente novamente mais tarde.'
        );
      })
      .finally(() => {
        this.utilService.hideLoading();
      });
  }

  mudarStatus(idFuncionario, status) {
    let form = {
      "idFuncionario": idFuncionario,
      "status": status
    }
    this.loading = true;
    this.funcionarioService.mudarStatus(form)
      .then((response: any) => {
        this.loading = false;
        if (response.success == true) {
          this.utilService.showAlert("Operação realizada com sucesso", () => {
            this.listarFuncionario();
          });
        }
        else {

          this.utilService.showError(response);
        }

      })
      .catch((error) => {
        this.loading = false;
        //console.error(error);
        this.utilService.showAlert("Desculpe, operação falhou! Tente novamente mais tarde.");
      }).finally(() => {
        this.utilService.hideLoading();
      });
  }


  funcionarioAdicionar() {
    this.navCtrl.navigateForward('adm/func-adicionar');
  }

  funcionarioAlterar(idFuncionario) {
    this.navCtrl.navigateForward('adm/func-alterar/' + idFuncionario);
  }

  atualizar(event) {
    this.palavra = '';
    this.listarFuncionario(() => {
      event.target.complete();
    });
  }
}
