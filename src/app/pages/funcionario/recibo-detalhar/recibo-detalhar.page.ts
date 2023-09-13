//import { ReciboService } from './../../../../services/recibo.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MenuController, NavController } from '@ionic/angular';
import { ReciboService } from 'src/services/recibo.service';
import { UtilService } from 'src/services/util.service';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-recibo-detalhar',
  templateUrl: './recibo-detalhar.page.html',
  styleUrls: ['./recibo-detalhar.page.scss'],
})
export class ReciboDetalharPage implements OnInit {
  visualizado: any;
  mes: any;
  ano: any;
  matricula: any;
  loading: boolean = false;
  reciboCollection: any[] = [];


  @ViewChild('pdfContent') pdfContent: ElementRef;

  constructor(
    private route: ActivatedRoute,
    public menu: MenuController,
    public reciboService: ReciboService,
    public utilService: UtilService
  ) {}


  ngOnInit() {}

  ionViewDidEnter() {
    this.loading = false;
    this.utilService.hideLoading();
 // Armazena o valor em localStorage como uma string
    let matricula = localStorage.getItem('matricula_funcionario');
    let mes = localStorage.getItem('mes');
    let ano = localStorage.getItem('ano');

    if (matricula && mes && ano) {
      this.obterDetalhesDoRecibo(matricula, mes, ano);
    } else {
      console.log('Dados do recibo não encontrados!');
    }

  }

  getNomeMes(numeroMes: number): string {
    const meses = [
      'Janeiro', 'Fevereiro', 'Março', 'Abril',
      'Maio', 'Junho', 'Julho', 'Agosto',
      'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ];

    return meses[numeroMes - 1] || '';
  }

  gerarPDF() {
    const content = this.pdfContent.nativeElement;
    const pdfWidthPercentage = 0.43; // Porcentagem de largura do PDF (40%)
    const pdfHeightPercentage = 0.83; // Porcentagem de altura do PDF (80%)

    // Obter as dimensões da página em pixels
    const pageWidthInPixels = window.innerWidth;
    const pageHeightInPixels = window.innerHeight;

    // Calcular a largura e altura do PDF em pixels com base na porcentagem
    const pdfWidthInPixels = pageWidthInPixels * pdfWidthPercentage;
    const pdfHeightInPixels = pageHeightInPixels * pdfHeightPercentage;

    const pdf = new jspdf.jsPDF({
      unit: 'px',
      format: [pdfWidthInPixels, pdfHeightInPixels]
    });

    const options = {
      scale: 6 // Ajusta a escala com base na largura do conteúdo
    };

    html2canvas(content, options).then((canvas) => {
      const imgData = canvas.toDataURL('image/jpeg');

      const imgProps = pdf.getImageProperties(imgData);
      const imgWidth = pdfWidthInPixels;
      const imgHeight = (imgProps.height * imgWidth) / imgProps.width;

      const xOffset = (pdfWidthInPixels - imgWidth) / 4; // Calcula o deslocamento X para centralizar a imagem
      const yOffset = (pdfHeightInPixels - imgHeight) / 4; // Calcula o deslocamento Y para centralizar a imagem

      pdf.addImage(imgData, 'JPEG', xOffset, yOffset, imgWidth, imgHeight);

      pdf.save('Recibo ' + localStorage.getItem('mes') +'.'+ localStorage.getItem('ano') + '.pdf');
    });
  }

  obterDetalhesDoRecibo(matricula: string, mes: string, ano: string) {
    this.loading = true;
    this.reciboService
      .obterRecibo(matricula, mes , ano)
      .then((response: any) => {
        this.loading = false;
        this.reciboCollection = response.data;
      })
      .catch((erro) => {
        this.loading = false;
        console.log(erro);
      });
  }
}
