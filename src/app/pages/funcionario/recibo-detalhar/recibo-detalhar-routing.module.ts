import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReciboDetalharPage } from './recibo-detalhar.page';

const routes: Routes = [
  {
    path: '',
    component: ReciboDetalharPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReciboDetalharPageRoutingModule {}
