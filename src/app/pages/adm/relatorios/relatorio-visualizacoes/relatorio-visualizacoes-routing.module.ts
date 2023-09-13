import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RelatorioVisualizacoesPage } from './relatorio-visualizacoes.page';

const routes: Routes = [
  {
    path: '',
    component: RelatorioVisualizacoesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RelatorioVisualizacoesPageRoutingModule {}
