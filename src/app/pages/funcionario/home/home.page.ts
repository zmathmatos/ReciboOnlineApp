import { SolicitacaoService } from 'src/services/solicitacao.service';
import { MenuController, NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { ReciboService } from 'src/services/recibo.service';
import { UtilService } from 'src/services/util.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  loading: boolean = false;
  reciboCollection: any[] = [];
  solicitacaoCollection: any[] = [];
  reciboCollectionClone: any[] = [];
  palavra: string;
  visualizado: any;
  public funcionarioLogado: boolean;
  public usuarioLogado: boolean;
  anosUnicos: number[];
  anoSelecionado: number;

  constructor(
    public menuCtrl: MenuController,
    public navCtrl: NavController,
    public reciboService: ReciboService,
    public solicitacaoService: SolicitacaoService,
    public utilService: UtilService
  ) {
    this.menuCtrl.enable(true);
    this.menuCtrl.swipeGesture(true);
  }

  ngOnInit() {}

  getAnosUnicos(recibos: any[]): number[] {
    const anosUnicos = [...new Set(recibos.map((recibo) => recibo.ano))];
    return anosUnicos.sort((a, b) => b - a);
  }

  ionViewDidEnter() {
    let matricula = localStorage.getItem('matricula_funcionario');
    if (matricula) {
      this.listarRecibos(matricula);
    } else {
      // exibe uma mensagem de erro caso a matrícula não esteja disponível
      console.log('Nenhum recibo foi atribuído a esta matrícula!');
    }

    this.solicitacaoCollection = this.solicitacaoCollection.filter(
      (item) => item.status == 2
    );
  }

  filtrar(evt) {
    this.reciboCollection = this.reciboCollectionClone;
    const searchTerm = evt.srcElement.value;

    if (!searchTerm) {
      return;
    }

    this.reciboCollection = this.reciboCollection.filter((c) => {
      if (searchTerm) {
        const searchTermLower = searchTerm.toLowerCase();
        if (
          c.ano.toLowerCase().indexOf(searchTermLower) > -1 ||
          this.getNomeMes(c.mes).toLowerCase().indexOf(searchTermLower) > -1
        ) {
          return true;
        }
        return false;
      }
    });
  }

  salvarNoLocalStorage(mes: string, ano: string) {
    localStorage.setItem('mes', mes);
    localStorage.setItem('ano', ano);
  }

  enviarVisualizacao(matricula, mes, ano, visualizado) {
    visualizado = 1;
    localStorage.setItem('visualizado', visualizado);
    let form = {
      matricula: (matricula = localStorage.getItem('matricula_funcionario')),
      mes: mes,
      ano: ano,
      visualizado: visualizado,
    };
    this.reciboService.enviarVisualizacao(form);
  }

  filtrarRecibosPorAno() {
    this.reciboCollection = this.reciboCollectionClone.filter(
      (recibo) => recibo.ano === this.anoSelecionado
    );
  }

  listarRecibos(matricula: string) {
    this.loading = true;
    this.reciboService
      .listar()
      .then((response: any) => {
        this.loading = false;
        this.reciboCollection = response.data.filter(
          (item) =>
            (item.status == 2 && item.matricula == matricula) ||
            item.todasMatriculas == true
        );

        // Extrair anos únicos
        this.anosUnicos = this.getAnosUnicos(this.reciboCollection);
        this.anosUnicos = this.getAnosUnicos(this.reciboCollection);
        this.anoSelecionado = this.anosUnicos[0];

        this.reciboCollection.sort((a, b) => {
          if (a.ano !== b.ano) {
            return b.ano - a.ano; // Ordena os anos de forma ascendente
          }
          if (a.mes !== b.mes) {
            return b.mes - a.mes; // Ordena os meses de forma ascendente
          }
          return 0; // Os anos e meses são iguais, mantém a ordem
        });
        this.reciboCollectionClone = this.reciboCollection;
        this.filtrarRecibosPorAno();
      })
      .catch((erro) => {
        this.loading = false;
        console.log(erro);
      })
      .finally(() => {
        //this.utilService.hideLoading();
      });
  }

  getNomeMes(numeroMes: number): string {
    const meses = [
      'Janeiro',
      'Fevereiro',
      'Março',
      'Abril',
      'Maio',
      'Junho',
      'Julho',
      'Agosto',
      'Setembro',
      'Outubro',
      'Novembro',
      'Dezembro',
    ];

    return meses[numeroMes - 1] || '';
  }

  showPageDetalhar(matricula, mes, ano, visualizado) {
    this.utilService.showLoading();
    this.enviarVisualizacao(matricula, mes, ano, visualizado);
    this.navCtrl.navigateForward('funcionario/recibo-detalhar');
  }

  atualizar(event) {
    this.palavra = '';
    event.target.complete();
    let matricula = localStorage.getItem('matricula_funcionario');
    this.listarRecibos(matricula);
  }
}
