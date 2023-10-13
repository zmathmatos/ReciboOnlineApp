import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AssinaturaPage } from './assinatura.page';

const routes: Routes = [
  {
    path: '',
    component: AssinaturaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AssinaturaPageRoutingModule {}
