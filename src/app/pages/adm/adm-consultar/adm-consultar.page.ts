import { NavController,  AlertController  } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { UsuarioService } from './../../../../services/usuario.service';
import { UtilService } from './../../../../services/util.service';

@Component({
  selector: 'app-adm-consultar',
  templateUrl: './adm-consultar.page.html',
  styleUrls: ['./adm-consultar.page.scss'],
})
export class AdmConsultarPage implements OnInit {
  loading: boolean = false;
  usuarioCollection: any[] = [];
  usuarioCollectionClone: any[] = [];
  palavra: string;
  constructor(public navCtrl: NavController,  private usuarioService: UsuarioService, private alertCtrl: AlertController, private utilService: UtilService) { }

  ngOnInit() {
  }

  ionViewDidEnter(){
    this.listarUsuario();
  }

  filtrar(evt) {
    this.usuarioCollection = this.usuarioCollectionClone;
    const searchTerm = evt.srcElement.value;

    if (!searchTerm) {
      return;
    }

    this.usuarioCollection = this.usuarioCollection.filter(c => {
      if (searchTerm) {
        if (
          (c.nome.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1) ||
          (c.email.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1)
        ) {
          return true;
        }
        return false;
      }
    });
  }

  listarUsuario(callback=null) {
    this.loading = true;
    this.usuarioService.listar()
      .then((response: any) => {
        this.loading = false;
        this.usuarioCollection = response.data;
        this.usuarioCollectionClone = this.usuarioCollection;

        if (callback!=null){
          callback();
        }
      })
      .catch((erro) => {
        this.loading = false;
        console.log(erro);
      }).finally(() => {
        //this.utilService.hideLoading();
      });
  }

  mudarStatus(idUsuario, status) {
    let form = {
      "idUsuario": idUsuario,
      "status": status
    }
    this.loading = true;
    this.usuarioService.mudarStatus(form)
      .then((response: any) => {
        this.loading = false;
        if (response.success == true) {
          this.utilService.showAlert("Operação realizada com sucesso", () => {
            this.listarUsuario();
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

  async excluir(idUsuario: any) {
    const alert = await this.alertCtrl.create({
      header: 'Atenção!',
      message: 'Tem certeza que deseja excluír?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {

          }
        }, {
          text: 'OK',
          handler: () => {
            this.loading = true;
            this.usuarioService.excluir(idUsuario)
              .then((response: any) => {
                this.loading = false;
                if (response.success == true) {
                  this.utilService.showAlert("Operação realizada com sucesso", () => {
                    this.listarUsuario();
                    this.navCtrl.navigateRoot('adm/adm-consultar');
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
        }
      ]
    });

    await alert.present();
  }
  administradorAdicionar(){
    this.navCtrl.navigateForward('adm/adm-adicionar');
  }


  atualizar(event) {
    this.palavra = '';
    this.listarUsuario(() => {
      event.target.complete();
    });
  }
}
