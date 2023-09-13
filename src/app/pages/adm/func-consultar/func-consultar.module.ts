import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms'; // Importe o ReactiveFormsModule
import { IonicModule } from '@ionic/angular';

import { FuncConsultarPageRoutingModule } from './func-consultar-routing.module';

import { FuncConsultarPage } from './func-consultar.page';
import { SharedComponentsModule } from 'src/app/components/shared-components-module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule, // Adicione o ReactiveFormsModule
    IonicModule,
    SharedComponentsModule,
    FuncConsultarPageRoutingModule
  ],
  declarations: [FuncConsultarPage],
  providers: [FormBuilder] // Adicione o FormBuilder ao provedor de serviços
})
export class FuncConsultarPageModule {}
