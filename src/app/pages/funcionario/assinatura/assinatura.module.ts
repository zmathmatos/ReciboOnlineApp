import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AssinaturaPageRoutingModule } from './assinatura-routing.module';

import { AssinaturaPage } from './assinatura.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AssinaturaPageRoutingModule
  ],
  declarations: [AssinaturaPage]
})
export class AssinaturaPageModule {}
