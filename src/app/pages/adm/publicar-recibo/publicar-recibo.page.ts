import { SolicitacaoService } from '../../../../services/solicitacao.service';
import { ReciboService } from '../../../../services/recibo.service';
import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { UtilService } from 'src/services/util.service';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-publicar-recibo',
  templateUrl: './publicar-recibo.page.html',
  styleUrls: ['./publicar-recibo.page.scss'],
})
export class PublicarReciboPage implements OnInit {
  isChecked: boolean = false;
  ano: any;
  mes: any;
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
      matricula: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.maxLength(10),
          Validators.minLength(1),
        ])
      ),
      mes: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.maxLength(2),
          Validators.minLength(1),
        ])
      ),
      ano: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.maxLength(4),
          Validators.minLength(1),
        ])
      ),
      tipoFolha: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.maxLength(1),
          Validators.minLength(1),
        ])
      ),
      todasMatriculas: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.maxLength(1),
          Validators.minLength(1),
        ])
      ),
    });
  }

  ngOnInit() {}

  formatarNumero(valor: string, campo: string) {
    const numero = parseInt(valor, 10);
    if (!isNaN(numero)) {
      // Remover qualquer zero à esquerda e atribir o valor
      this[campo] = numero.toString();
    } else {
      // Se o valor inserido não for um número válido, define como vazio
      this[campo] = '';
    }
  }

  adicionar() {
    // Obter os valores do formulário
    const formData = this.formGroup.value;
    const mes = formData.mes;
    const ano = formData.ano;
    const matricula = formData.matricula;
    const tipoFolha = formData.tipoFolha;

    // Verificar se o mês e o ano são inválidos
    if (mes <= 0 || mes > 12) {
      this.utilService.showAlert('Mês inválido, verifique o campo.');

      return; // Impede que a chamada à API seja feita se os campos forem inválidos
    }

    if (ano <= 0 || ano.toString().length < 4) {
      this.utilService.hideLoading();
      this.loading = false;
      this.utilService.showAlert('Ano inválido, verifique o campo.');

      return;
    }

    if (matricula == null && this.isChecked == false) {
      this.utilService.showAlert(
        "O campo 'Matrícula' precisa ser preenchido se a publicação não for para todas as matrículas."
      );
      return;
    }

    if (matricula <= 0 && this.isChecked == false) {
      this.utilService.showAlert(
        "O campo 'Matrícula' não pode ser menor ou igual a 0 (zero)."
      );
      return;
    }

    if (tipoFolha === null) {
      this.utilService.showAlert('Selecione o tipo de Folha!');

      return;
    }

    if (!mes || !ano || !matricula || !this.isChecked || !tipoFolha) {
      this.utilService.showAlert(
        'Campos obrigatórios não preenchidos. Preencha todos os campos.'
      );
      return;
    }

    this.utilService.showLoading();
    this.loading = true;
    this.solicitacaoService
      .adicionar(formData)
      .then((response: any) => {
        console.log('Resposta da API:', response);
        this.utilService.hideLoading();
        this.loading = false;
        if (response.success === true) {
          this.utilService.showAlert('Solicitação enviada com sucesso!', () => {
            this.navCtrl.navigateRoot('adm/solicitacoes');
          });
        } else {
          if (response.errorMessage) {
            this.utilService.showAlert(response.errorMessage);
          } else {
            this.utilService.showAlert(
              'Erro desconhecido ao processar a solicitação.'
            );
          }
        }
      })
      .catch((error) => {
        console.log('Erro na chamada à API:', error);
        this.utilService.hideLoading();
        this.loading = false;
        this.utilService.showAlert(
          'Desculpe, operação falhou! Tente novamente mais tarde.'
        );
      });
  }
}
