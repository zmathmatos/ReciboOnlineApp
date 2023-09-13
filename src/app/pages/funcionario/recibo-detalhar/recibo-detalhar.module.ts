import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ReciboDetalharPageRoutingModule } from './recibo-detalhar-routing.module';
import { ReciboDetalharPage } from './recibo-detalhar.page';
import { SharedComponentsModule } from 'src/app/components/shared-components-module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReciboDetalharPageRoutingModule,
    SharedComponentsModule
  ],
  declarations: [ReciboDetalharPage]
})
export class ReciboDetalharPageModule {}
