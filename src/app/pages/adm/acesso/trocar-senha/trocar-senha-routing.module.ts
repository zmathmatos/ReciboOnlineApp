import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TrocarSenhaPage } from './trocar-senha.page';

const routes: Routes = [
  {
    path: '',
    component: TrocarSenhaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TrocarSenhaPageRoutingModule {}
