import { Component, OnInit } from '@angular/core';
import { SolicitacaoService } from 'src/services/solicitacao.service';
import { UtilService } from 'src/services/util.service';
import { AlertController, MenuController, NavController  } from '@ionic/angular';

@Component({
  selector: 'app-solicitacoes',
  templateUrl: './solicitacoes.page.html',
  styleUrls: ['./solicitacoes.page.scss'],
})
export class SolicitacoesPage implements OnInit {
  statusSelecionado: string = '2';
  solicitacaoConcluidaCollection: any[] = [];
  solicitacaoSolicitadaCollection: any[] = [];
  loading: boolean = false;


  constructor(
    private menuCtrl: MenuController,
    private navCtrl: NavController,
    private utilService: UtilService,
    private solicitacaoService: SolicitacaoService,
    private alertCtrl: AlertController,

  ) {
    this.menuCtrl.enable(true);
  }

  ngOnInit() {}

  getNomeMes(numeroMes: number): string {
    const meses = [
      'Janeiro', 'Fevereiro', 'Março', 'Abril',
      'Maio', 'Junho', 'Julho', 'Agosto',
      'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ];

    return meses[numeroMes - 1] || '';
  }

  ionViewDidEnter() {
    this.listarSolicitacaoConcluida();
    this.listarSolicitacaoSolicitada();
  }


  listarSolicitacaoConcluida(callback = null) {
    this.loading = true;
    this.solicitacaoService.listar(2)
      .then((response: any) => {
        this.loading = false;
        this.solicitacaoConcluidaCollection = response;
        if (callback != null) {
          callback();
        }
      })
      .catch((response) => {
        if ((response.status = 401)) {
          this.navCtrl.navigateRoot('adm/home');
        }

        this.loading = false;
      })
      .finally(() => {
        //this.utilService.hideLoading();
      });
  }

  listarSolicitacaoSolicitada(callback = null) {
    this.loading = true;
    this.solicitacaoService.listar(0)
      .then((response: any) => {
        this.loading = false;
        this.solicitacaoSolicitadaCollection = response;
        if (callback != null) {
          callback();
        }
      })
      .catch((response) => {
        if ((response.status = 401)) {
          this.navCtrl.navigateRoot('adm/home');
        }

        this.loading = false;
      }).finally(() => {
        //this.utilService.hideLoading();
      });
  }

  hasData(): boolean {
    return (
      this.solicitacaoConcluidaCollection.length > 0 ||
      this.solicitacaoSolicitadaCollection.length > 0
    );
  }

  selecionar(ev: any) {
    this.statusSelecionado = ev.detail.value;
  }

  async excluir(id: any) {
    const alert = await this.alertCtrl.create({
      header: 'Atenção!',
      message: 'Tem certeza que deseja excluír a solicitação?',
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
            this.solicitacaoService
              .excluir(id)
              .then((response: any) => {
                this.loading = false;
                if (response.success == true) {
                      this.listarSolicitacaoConcluida();
                      this.listarSolicitacaoSolicitada();

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
        }
      ]
    });

    await alert.present();
  }


  atualizar(event) {
    this.listarSolicitacaoSolicitada();
    this.listarSolicitacaoConcluida(() => {
      event.target.complete();
    });
  }

}
