import { SolicitacaoService } from '../../../../services/solicitacao.service';
import { ReciboService } from '../../../../services/recibo.service';
import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { UtilService } from 'src/services/util.service';
import { FormGroup, FormBuilder, FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-publicar-recibo',
  templateUrl: './publicar-recibo.page.html',
  styleUrls: ['./publicar-recibo.page.scss'],
})
export class PublicarReciboPage implements OnInit {
  isChecked: boolean = false;
  public formGroup: FormGroup;
  mesAno: string;
  loading: boolean = false;
  form: FormGroup;
  constructor(
    public formBuilder: FormBuilder,
    private solicitacaoService: SolicitacaoService,
    private utilService: UtilService,
    private navCtrl: NavController
  ) {
    this.formGroup = formBuilder.group({
      matricula: new FormControl('', Validators.compose([Validators.required, Validators.maxLength(10), Validators.minLength(1),])),
      mes: new FormControl('', Validators.compose([Validators.required, Validators.maxLength(2), Validators.minLength(1),])),
      ano: new FormControl('', Validators.compose([Validators.required, Validators.maxLength(4), Validators.minLength(1),])),
      tipoFolha: new FormControl('', Validators.compose([Validators.required, Validators.maxLength(1), Validators.minLength(1),])),
      todasMatriculas: new FormControl('', Validators.compose([Validators.required, Validators.maxLength(1), Validators.minLength(1),])),

    });
  }

  ngOnInit() {}

  adicionar() {
    this.utilService.showLoading();
    this.loading = true;
    this.solicitacaoService.adicionar(this.formGroup.value)
      .then((response: any) => {
          console.log("Resposta da API:", response);
          this.utilService.hideLoading();
          this.loading = false;

          if (response.success === true) {
            this.utilService.showAlert("Solicitação enviada com sucesso!", () => {
              this.navCtrl.navigateRoot('adm/solicitacoes');
            });
          } else {
            // Verificar se a resposta da API contém uma mensagem de erro específica para exibir ao usuário
            if (response.errorMessage) {
              this.utilService.showAlert(response.errorMessage);
            } else {
              this.utilService.showAlert("Erro desconhecido ao processar a solicitação.");
            }
          }
        })
        .catch((error) => {
          console.log("Erro na chamada à API:", error);
          this.utilService.hideLoading();
          this.loading = false;
          this.utilService.showAlert("Desculpe, operação falhou! Tente novamente mais tarde.");
        });
  }
}

