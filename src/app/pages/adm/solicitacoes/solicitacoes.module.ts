import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SolicitacoesPageRoutingModule } from './solicitacoes-routing.module';
import { SharedComponentsModule } from 'src/app/components/shared-components-module';
import { SolicitacoesPage } from './solicitacoes.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SolicitacoesPageRoutingModule,
    SharedComponentsModule
  ],
  declarations: [SolicitacoesPage]
})
export class SolicitacoesPageModule {}
