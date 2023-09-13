import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ReciboService } from '../../../../../services/recibo.service';
import { UtilService } from '../../../../../services/util.service';
import { FormGroup, FormBuilder} from '@angular/forms';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-relatorio-visualizacoes',
  templateUrl: './relatorio-visualizacoes.page.html',
  styleUrls: ['./relatorio-visualizacoes.page.scss'],
})
export class RelatorioVisualizacoesPage implements OnInit {
  public formGroup: FormGroup;
  loading = false;
  visualizado: any;
  ano: any;
  mes: any;
  matricula: any;
  relatorioCollection: any[] = [];
  funcionarioCollection: any[] = [];
  funcionarioCollectionClone: any[] = [];
  palavra: string;

  @ViewChild('pdfContent') pdfContent: ElementRef;

  constructor(
    private reciboService: ReciboService,
    private utilService: UtilService,
    public formBuilder: FormBuilder
  ) { }

  ngOnInit() {}

  loadRelatorio() {
    this.loading = true;
    this.reciboService.listarVisualizacao(this.mes, this.ano)
      .then((response: any) => {
        this.loading = false;
        this.relatorioCollection = response.data;
        if (this.visualizado) {
          this.relatorioCollection.forEach((item: any) => {item.visualizado = 1;});
        }
      })
      .catch((erro) => {
        this.loading = false;
        console.log(erro);
      });
  }

  filtrar(evt) {
    this.funcionarioCollection = this.funcionarioCollectionClone;
    const searchTerm = evt.srcElement.value;

    if (!searchTerm) {
      return;
    }

    this.funcionarioCollection = this.funcionarioCollection.filter((c) => {
      if (searchTerm) {
        if (
          c.matricula.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1 ||
          c.nome.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1
        ) {
          return true;
        }
        return false;
      }
    });
  }

  gerarPDF() {
    const content = this.pdfContent.nativeElement;
    const pdf = new jspdf.jsPDF();

    const options = {
      scale: 2 // Aumenta a escala para garantir que todo o conteúdo seja capturado
    };

    html2canvas(content, options).then((canvas) => {
      const imgData = canvas.toDataURL('image/jpeg');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      const imgProps = pdf.getImageProperties(imgData);

      let currentHeight = 0;
      let imgDataRemaining = imgData;

      while (currentHeight < pdfHeight) {
        pdf.addImage(imgDataRemaining, 'JPEG', 0, currentHeight, pdfWidth, pdfHeight - currentHeight);

        currentHeight += pdfHeight;

        if (currentHeight < pdfHeight) {
          pdf.addPage();
          imgDataRemaining = imgData.substring(canvas.width * currentHeight / pdfHeight);
        }
      }

      pdf.save('relatorio.pdf');
    });
  }

}
