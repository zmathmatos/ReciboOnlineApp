import { Component, OnInit } from '@angular/core';
import { FuncionarioService } from 'src/services/funcionario.service';
import { UtilService } from 'src/services/util.service';
import { NavController, MenuController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-trocar-senha',
  templateUrl: './trocar-senha.page.html',
  styleUrls: ['./trocar-senha.page.scss'],
})
export class TrocarSenhaPage implements OnInit {
  public formGroup: FormGroup;
  emailEnviado : boolean=false;
  loading: boolean = false;

  constructor(public formBuilder: FormBuilder, private funcionarioService : FuncionarioService, private utilService : UtilService, private navCtrl : NavController, public menuCtrl: MenuController) {

    this.formGroup = formBuilder.group({

      email: new FormControl('', Validators.email),
      token: new FormControl('', Validators.compose([
        //Validators.required,
        Validators.minLength(36),
      ])),
      senha: new FormControl('', Validators.compose([
        //Validators.required,
        Validators.maxLength(32),
        Validators.minLength(3),
      ])),

    });
   }

  ngOnInit() {
    this.menuCtrl.enable(false);
    this.menuCtrl.swipeGesture(false);
  }

  openLogin(){
    this.navCtrl.navigateRoot('funcionario/login');
  }

  enviarEmail(){
    this.emailEnviado = false;

    this.utilService.showLoading();
    this.funcionarioService.resetarSenha({email : this.formGroup.value.email})
    .then((response: any) => {
      if (response.success == true) {
        this.utilService.showAlert(response.data.message, ()=>{
            this.emailEnviado = true;
        });
      }
      else {
        this.utilService.showError(response);
      }

    })
    .catch((error) => {
      console.error(error);
      this.utilService.showAlert("Desculpe, operação falhou! Tente novamente mais tarde.");
    }).finally(() => {
      this.utilService.hideLoading();
    });
  }

  alterarSenha(){
    this.utilService.showLoading();
    this.funcionarioService.alterarSenha({email : this.formGroup.value.email, token: this.formGroup.value.token, novaSenha : this.formGroup.value.senha})
    .then((response: any) => {
      if (response.success == true) {
        this.utilService.showAlert('Operação realizada com sucesso!', ()=>{
          this.navCtrl.navigateRoot('funcionario/login');
        });
      }
      else {

        this.utilService.showError(response);

      }

    })
    .catch((error) => {
      this.utilService.showAlert("Desculpe, operação falhou! Tente novamente mais tarde.");
    }).finally(() => {
      this.utilService.hideLoading();
    });
  }

  showLoginFuncionario(){
    this.navCtrl.navigateBack('funcionario/login');
  }
}
