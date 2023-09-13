import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdmAdicionarPageRoutingModule } from './adm-adicionar-routing.module';

import { AdmAdicionarPage } from './adm-adicionar.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    AdmAdicionarPageRoutingModule
  ],
  declarations: [AdmAdicionarPage]
})
export class AdmAdicionarPageModule {}
