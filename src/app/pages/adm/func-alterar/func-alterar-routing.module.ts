import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FuncAlterarPage } from './func-alterar.page';

const routes: Routes = [
  {
    path: '',
    component: FuncAlterarPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FuncAlterarPageRoutingModule {}
