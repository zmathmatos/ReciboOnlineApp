import { Component, OnInit } from '@angular/core';
import {
  Platform,
  NavController,
  ToastController,
  AlertController,
  IonSplitPane,
} from '@ionic/angular';
import { MenuController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { FirebaseApp } from '@firebase/app';
import { SwUpdate } from '@angular/service-worker';
import { UtilService } from 'src/services/util.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  public selectedIndex = 1;
  //public toggle_theme : boolean;
  public funcionarioLogado: boolean;
  public usuarioLogado: boolean;
  public appPagesFuncionario = [
    { title: 'Recibos', url: 'funcionario/home', icon: 'receipt' },
  ];
  public appPagesAdm = [
    { title: 'Home', url: 'adm/home', icon: 'home' },
    {
      title: 'Histórico de Publicações',
      url: 'adm/solicitacoes',
      icon: 'reader',
    },
  ];
  private promptInstallEvent;
  private toast: HTMLIonToastElement;
  constructor(
    private platform: Platform,
    private navCtrl: NavController,
    private statusBar: StatusBar,
    private splashScreen: SplashScreen,
    private utilService: UtilService,
    private swUpdate: SwUpdate,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController,
    public menuCtrl: MenuController
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.splashScreen.hide();
      this.statusBar.backgroundColorByHexString('#000000'); // Substitua com a cor desejada

    });
    if(localStorage.getItem('darkMode') === null){
      localStorage.setItem('darkMode', "false");
    }
  }

  /*
  verifyDarkTheme() : boolean{
    if(localStorage.getItem('color-theme')){
    document.body.setAttribute('color-theme', 'dark');
    return true;
    }
    else{
      document.body.setAttribute('color-theme', 'light');
      return false;

    }
  }*/

  async ngOnInit() {
    /*if(this.verifyDarkTheme() === true){
      this.toggle_theme = true;
    }else{
      this.toggle_theme = false;
    }*/

    console.log(
      `Runing app ${this.isPWAInstalled ? 'standalone' : 'in browser'}`
    );

    this.swUpdate.available.subscribe(async (event) => {
      console.log('current version is', event.current);
      console.log('available version is', event.available);

      if (event.current !== event.available) {
        const alert = await this.alertCtrl.create({
          header: 'Oba, Temos Novidades!',
          subHeader: 'Há uma nova versão disponível da aplicação.',
          message: 'Deseja atualizar agora?',
          buttons: [
            {
              text: 'Instalar',
              handler: () => {
                this.swUpdate.activateUpdate();
              },
            },
            'Mais tarde',
          ],
        });
        alert.present();
      }
    });

    this.swUpdate.activated.subscribe((event) => {
      console.log('old version was', event.previous);
      console.log('new version is', event.current);
    });

    await this.platform.ready();

    if (!this.isMobile) {
      this.checkForUpdate();
      if (!this.isPWAInstalled) {
        this.listenForInstallEvent();
      }
    }

    console.log('swUpdate.isEnabled: ' + this.swUpdate.isEnabled);
    //this.swUpdate.checkForUpdate();

    this.utilService.getObservable().subscribe((data) => {
      if (data.key == 'usuarioLogado') {
        this.usuarioLogado = data.value;
        if (this.usuarioLogado == true) {
          this.funcionarioLogado = false;
        }
      }

      if (data.key == 'funcionarioLogado') {
        this.funcionarioLogado = data.value;
        if (this.funcionarioLogado == true) {
          this.usuarioLogado = false;
        }
      }
    });

    let token: string = '';
    token = sessionStorage.getItem('token_funcionario');

    if (token != null && token != undefined) {
      this.funcionarioLogado = true;
    }

    token = sessionStorage.getItem('token');

    if (token != null && token != undefined) {
      this.usuarioLogado = true;
    }
  }

  private listenForInstallEvent() {
    window.addEventListener('beforeinstallprompt', async (e) => {
      e.preventDefault();
      this.promptInstallEvent = e;

      setTimeout(() => {
        this.suggestInstall();
      }, 5000);
    });
  }
  private async suggestInstall() {
    this.toast = await this.toastCtrl.create({
      message: 'Você pode usar este aplicativo offline',
      buttons: [
        {
          text: 'Baixar',
          handler: () => {
            this.installPWA();
          },
        },
        {
          text: '',
          icon: 'close',
        },
      ],
      duration: 0,
    });
    this.toast.present();
  }

  private installPWA() {
    this.toast.dismiss();
    // Show the prompt
    this.promptInstallEvent.prompt();
    // Wait for the user to respond to the prompt
    this.promptInstallEvent.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the A2HS prompt');
      } else {
        console.log('User dismissed the A2HS prompt');
      }
      this.promptInstallEvent = null;
    });
  }

  get isMobile() {
    return this.platform.is('mobile');
  }
  get isPWAInstalled(): boolean {
    return (
      window.matchMedia('(display-mode: standalone)').matches ||
      (window.navigator as any).standalone
    );
  }

  async checkForUpdate() {
    console.log('Check for updates');
    try {
      await this.swUpdate.checkForUpdate();
    } catch (e) {
      console.debug('service worker not available');
    }
  }

/*
changeTheme(event){
  if(event.detail.checked){
   document.body.setAttribute('color-theme', 'dark');
   localStorage.setItem('color-theme', 'true');
  }
   else{
     document.body.setAttribute('color-theme', 'light');
     localStorage.removeItem('color-theme');
   }

}*/

  sairAdm() {
    localStorage.clear();
    sessionStorage.clear();
    this.navCtrl.navigateBack('adm/login');
  }

  sairFunc() {
    localStorage.clear();
    sessionStorage.clear();
    this.navCtrl.navigateBack('funcionario/login');
  }
}
