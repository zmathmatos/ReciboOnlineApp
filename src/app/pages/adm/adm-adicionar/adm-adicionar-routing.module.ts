import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdmAdicionarPage } from './adm-adicionar.page';

const routes: Routes = [
  {
    path: '',
    component: AdmAdicionarPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdmAdicionarPageRoutingModule {}
