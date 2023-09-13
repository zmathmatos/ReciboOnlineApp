import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms'; // Importe o ReactiveFormsModule
import { IonicModule } from '@ionic/angular';

import { AdmConsultarPageRoutingModule } from './adm-consultar-routing.module';

import { AdmConsultarPage } from './adm-consultar.page';
import { SharedComponentsModule } from 'src/app/components/shared-components-module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule, // Adicione o ReactiveFormsModule
    IonicModule,
    SharedComponentsModule,
    AdmConsultarPageRoutingModule
  ],
  declarations: [AdmConsultarPage],
  providers: [FormBuilder] // Adicione o FormBuilder ao provedor de serviços
})
export class AdmConsultarPageModule {}
