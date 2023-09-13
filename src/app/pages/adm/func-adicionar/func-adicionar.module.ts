import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FuncAdicionarPageRoutingModule } from './func-adicionar-routing.module';

import { FuncAdicionarPage } from './func-adicionar.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    FuncAdicionarPageRoutingModule
  ],
  declarations: [FuncAdicionarPage]
})
export class FuncAdicionarPageModule {}
