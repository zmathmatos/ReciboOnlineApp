import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FuncConsultarPage } from './func-consultar.page';

const routes: Routes = [
  {
    path: '',
    component: FuncConsultarPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FuncConsultarPageRoutingModule {}
