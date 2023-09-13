import { NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-relatorios',
  templateUrl: './relatorios.page.html',
  styleUrls: ['./relatorios.page.scss'],
})
export class RelatoriosPage implements OnInit {
  constructor(public navCntrl: NavController) {}

  ngOnInit() {}

  relatoriosConsultarClick() {
    this.navCntrl.navigateForward('adm/relatorio-visualizacoes');
  }
}
