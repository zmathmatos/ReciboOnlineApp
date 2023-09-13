import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FuncAdicionarPage } from './func-adicionar.page';

const routes: Routes = [
  {
    path: '',
    component: FuncAdicionarPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FuncAdicionarPageRoutingModule {}
