import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PublicarReciboPageRoutingModule } from './publicar-recibo-routing.module';

import { PublicarReciboPage } from './publicar-recibo.page';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    IonicModule,
    PublicarReciboPageRoutingModule
  ],
  declarations: [PublicarReciboPage]
})
export class PublicarReciboPageModule {}
