import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FuncAlterarPageRoutingModule } from './func-alterar-routing.module';

import { FuncAlterarPage } from './func-alterar.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    FuncAlterarPageRoutingModule
  ],
  declarations: [FuncAlterarPage]
})
export class FuncAlterarPageModule {}
