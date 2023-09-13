import { UsuarioService } from './../../../../../services/usuario.service';
import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { UtilService } from '../../../../../services/util.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loading = false;
  isIconClicked: boolean = false;
  login = { email: '', senha: ''};
  deferredPrompt;
  constructor(public menuCtrl: MenuController, public navCtrl: NavController,
     private usuarioService: UsuarioService, private utilService: UtilService) {}

  ngOnInit() {
    this.menuCtrl.enable(false);
    this.menuCtrl.swipeGesture(false);
    this.utilService.publishSomeData({ key: 'usuarioLogado', value: false });

    setTimeout(() => {
      let pushEnabled = localStorage.getItem("push-enabled");
      if (pushEnabled == 'false') {
        this.utilService.showToast('Notificação desabilitada! Você não receberá notificações do sistema.', 3000, 'top');
      }
    }, 2000);
  }

    public handleIconClick(): void {
    this.isIconClicked = !this.isIconClicked; // Inverte o valor da variável
  }

  autenticar() {

    this.loading = true;
    //this.navCtrl.navigateRoot('home');
    let form: any = this.login;
    form.tokenPush = localStorage.getItem('token_push');

    this.usuarioService.autenticar(form)
      .then((response: any) => {
        this.loading = false;

        if (response.autenticado == false) {

          this.utilService.showAlert(response.mensagem);
          return;
        }
        let boasvindas = 'Olá, ' + response.nome +'. Seja bem vindo(a)!';
        sessionStorage.setItem('token', btoa(response.token));
        this.utilService.publishSomeData({ key: 'usuarioLogado', value: true });
        this.utilService.showAlertUsuarioLogado(boasvindas, () => {

          this.navCtrl.navigateRoot('adm/home');

          //this.navCtrl.pop();
        });
      })
      .catch((erro) => {
        this.loading = false;
        this.utilService.showAlert('Operação falhou, tente novamente mais tarde!');
      });
  }


  ionViewWillEnter(){
    this.menuCtrl.enable(false);
  }

  showLoginFuncionario() {
    this.navCtrl.navigateRoot('funcionario/login');
  }

  openTrocarSenha() {
    this.navCtrl.navigateForward('adm/trocar-senha');
  }

}
