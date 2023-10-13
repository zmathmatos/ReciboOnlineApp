import SignaturePad from 'signature_pad';
import { Component, ElementRef, OnInit, ViewChild, AfterViewInit  } from '@angular/core';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { MenuController } from '@ionic/angular';


@Component({
  selector: 'app-assinatura',
  templateUrl: './assinatura.page.html',
  styleUrls: ['./assinatura.page.scss'],
})
export class AssinaturaPage implements AfterViewInit {
  signaturePad: SignaturePad;


  signatureImg: string;

  @ViewChild('canvas') canvasEl: ElementRef;

  constructor(public menuCtrl: MenuController) { }

  ngOnInit() {
    this.menuCtrl.swipeGesture(false);

  }

  ngAfterViewInit(){
    this.signaturePad = new SignaturePad(this.canvasEl.nativeElement);
    this.signaturePad.minWidth = 1; // Defina a largura mínima da linha
    this.signaturePad.maxWidth = 1;

  }


  clearPad(){
    this.signaturePad.clear();
  }

  savePad(){
    const base64Data = this.signaturePad.toDataURL();
    this.signatureImg = base64Data;
  }
}
