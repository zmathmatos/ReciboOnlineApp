import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/services/usuario.service';
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

  constructor(public formBuilder: FormBuilder, private usuarioService : UsuarioService, private utilService : UtilService, private navCtrl : NavController, public menuCtrl: MenuController) {

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
    this.navCtrl.navigateRoot('adm/login');
  }

  enviarEmail(){
    this.emailEnviado = false;

    this.utilService.showLoading();
    this.usuarioService.resetarSenha({email : this.formGroup.value.email})
    .then((response: any) => {
      if (response.success == true) {
      this.utilService.hideLoading();
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
      this.utilService.hideLoading();

      if (error.status === 400) {
        this.utilService.showAlert("O E-mail inserido não está cadastrado no sistema... Consulte um administrador.");
      } else if (error.status === 500) {
        this.utilService.showAlert("Ocorreu um erro interno no servidor.");
      } else {
        this.utilService.showAlert("Desculpe, ocorreu um erro. Tente novamente mais tarde.");
      }
    });
  }

  alterarSenha(){
    this.utilService.showLoading();
    this.usuarioService.alterarSenha({email : this.formGroup.value.email, token: this.formGroup.value.token, novaSenha : this.formGroup.value.senha})
    .then((response: any) => {
      if (response.success == true) {
        this.utilService.showAlert('Operação realizada com sucesso!', ()=>{
          this.navCtrl.navigateRoot('adm/login');
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
    this.navCtrl.navigateBack('adm/login');
  }
}
