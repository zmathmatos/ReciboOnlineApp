import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdmConsultarPage } from './adm-consultar.page';

const routes: Routes = [
  {
    path: '',
    component: AdmConsultarPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdmConsultarPageRoutingModule {}
