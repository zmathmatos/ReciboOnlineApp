import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-nao-ha-dados',
  templateUrl: './nao-ha-dados.component.html',
  styleUrls: ['./nao-ha-dados.component.scss'],
})
export class NaoHaDadosComponent implements OnInit {
  @Input() carregando: boolean;
  @Input() temDados: boolean;
  constructor() { }

  ngOnInit() {}

}
