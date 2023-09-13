import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,     ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RelatorioVisualizacoesPageRoutingModule } from './relatorio-visualizacoes-routing.module';

import { RelatorioVisualizacoesPage } from './relatorio-visualizacoes.page';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    IonicModule,
    RelatorioVisualizacoesPageRoutingModule
  ],
  declarations: [RelatorioVisualizacoesPage]
})
export class RelatorioVisualizacoesPageModule {}
