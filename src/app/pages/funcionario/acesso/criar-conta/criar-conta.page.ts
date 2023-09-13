import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, ReactiveFormsModule } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { UtilService } from 'src/services/util.service';
import { FuncionarioService } from 'src/services/funcionario.service';
@Component({
  selector: 'app-criar-conta',
  templateUrl: './criar-conta.page.html',
  styleUrls: ['./criar-conta.page.scss'],
})
export class CriarContaPage implements OnInit {
  public formGroup: FormGroup;
  loading: boolean = false;


  constructor(public formBuilder: FormBuilder, private navCtrl: NavController, private funcionarioService: FuncionarioService, private utilService: UtilService) {
    this.formGroup = formBuilder.group({
      matricula: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.maxLength(10),
          Validators.minLength(3),
        ])
      ),
      nome: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.maxLength(150),
          Validators.minLength(3),
        ])
      ),
      email: new FormControl('', Validators.email),
      senha: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.maxLength(32),
          Validators.minLength(3),
        ])
      ),
    });
  }

  ngOnInit() {

  }

  adicionar() {

    this.utilService.showLoading();
    this.loading = true;
    this.funcionarioService.adicionar(this.formGroup.value)
      .then((response: any) => {
        this.utilService.hideLoading();
        this.loading = false;
        if (response.success == true) {
          this.utilService.showAlert("Operação realizada com sucesso! Uma solicitação de ativação foi enviada ao administrador.", () => {
            this.navCtrl.navigateRoot('funcionario/login');
          });
        }
        else {
          this.utilService.hideLoading();
          this.loading = false;
          this.utilService.showError(response);

        }

      })
      .catch((error) => {
        this.loading = false;

        this.utilService.showAlert("Desculpe, operação falhou! Tente novamente mais tarde.");
      });
  }

  voltar(){
    this.navCtrl.navigateBack('funcionario/login');
  }
}
