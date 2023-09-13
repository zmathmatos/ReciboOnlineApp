import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { TrocarSenhaPageRoutingModule } from './trocar-senha-routing.module';
import { SharedComponentsModule } from 'src/app/components/shared-components-module';
import { TrocarSenhaPage } from './trocar-senha.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    SharedComponentsModule,
    TrocarSenhaPageRoutingModule
  ],
  declarations: [TrocarSenhaPage]
})
export class TrocarSenhaPageModule {}
