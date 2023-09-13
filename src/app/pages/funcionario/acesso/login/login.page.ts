import { Component, OnInit } from '@angular/core';
import { NavController, MenuController } from '@ionic/angular';
import { FuncionarioService } from '../../../../../services/funcionario.service';
import { UtilService } from '../../../../../services/util.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  isIconClicked: boolean = false;
  loading = false;
  login = { matricula: '', senha: '' };
  showBtn: boolean = false;
  deferredPrompt;
  constructor(
    public menuCtrl: MenuController,
    private navCtrl: NavController,
    private funcionarioService: FuncionarioService,
    private utilService: UtilService
  ) {}

  ngOnInit() {
    this.menuCtrl.enable(false);
    this.menuCtrl.swipeGesture(false);
    this.utilService.publishSomeData({
      key: 'funcionarioLogado',
      value: false,
    });

    setTimeout(() => {
      let pushEnabled = localStorage.getItem('push-enabled');
      if (pushEnabled == 'false') {
        this.utilService.showToast(
          'Notificação desabilitada! Você não receberá notificações do sistema.',
          3000,
          'top'
        );
      }
    }, 2000);
  }

  ionViewWillEnter() {
    this.menuCtrl.enable(false);
    window.addEventListener('beforeinstallprompt', (e) => {
      // Prevent Chrome 67 and earlier from automatically showing the prompt
      e.preventDefault();
      // Stash the event so it can be triggered later on the button event.
      this.deferredPrompt = e;

      // Update UI by showing a button to notify the user they can add to home screen
      this.showBtn = true;
    });

    //button click event to show the promt

    window.addEventListener('appinstalled', (event) => {
      alert('installed');
    });

    if (window.matchMedia('(display-mode: standalone)').matches) {
      alert('display-mode is standalone');
    }
  }

  public handleIconClick(): void {
    this.isIconClicked = !this.isIconClicked; // Inverte o valor da variável
  }
  addToHome(e) {
    // hide our user interface that shows our button
    // Show the prompt
    this.deferredPrompt.prompt();
    // Wait for the user to respond to the prompt
    this.deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        alert('User accepted the prompt');
      } else {
        alert('User dismissed the prompt');
      }
      this.deferredPrompt = null;
    });
  }

  autenticar() {
    this.loading = true;
    //this.navCtrl.navigateRoot('home');
    let form: any = this.login;
    form.tokenPush = localStorage.getItem('token_push');

    this.funcionarioService
      .autenticar(form)
      .then((response: any) => {
        this.loading = false;

        if (response.autenticado == false) {
          this.utilService.showAlert(response.mensagem);
          return;
        }

        localStorage.setItem('matricula_funcionario', this.login.matricula);

        let boasvindas = 'Olá, ' + response.nome + '. Seja bem vindo(a)!';
        sessionStorage.setItem('token_funcionario', btoa(response.token));
        this.utilService.publishSomeData({
          key: 'funcionarioLogado',
          value: true,
        });
        this.utilService.showAlertFuncionarioLogado(boasvindas, () => {
          this.navCtrl.navigateRoot('funcionario/home');

          //this.navCtrl.pop();
        });
      })
      .catch((erro) => {
        this.loading = false;
        this.utilService.showAlert(
          'Operação falhou, tente novamente mais tarde!'
        );
      });
  }

  showLoginAdministrador() {
    this.navCtrl.navigateRoot('adm/login');
  }

  criarConta(){
    this.navCtrl.navigateForward('funcionario/criar-conta');
  }

  openTrocarSenha() {
    this.navCtrl.navigateForward('funcionario/trocar-senha');
  }
}
