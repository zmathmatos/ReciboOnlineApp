import { Component, OnInit } from '@angular/core';
import { MenuController, NavController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  public funcionarioLogado: boolean;
  public usuarioLogado: boolean;

  constructor(public menuCtrl: MenuController, public navCtrl: NavController) {
    this.menuCtrl.enable(true);
    this.menuCtrl.swipeGesture(true);
  }

  ngOnInit() {
    if (this.usuarioLogado == true) {
      this.funcionarioLogado = false;
    }
  }

  publicarRecibo() {
    this.navCtrl.navigateForward('adm/publicar-recibo');
  }

  funcionariosClick() {
    this.navCtrl.navigateForward('adm/func-consultar');
  }

  relatoriosClick() {
    this.navCtrl.navigateForward('adm/relatorios');
  }

  administradoresClick() {
    this.navCtrl.navigateForward('adm/adm-consultar');
  }
}
