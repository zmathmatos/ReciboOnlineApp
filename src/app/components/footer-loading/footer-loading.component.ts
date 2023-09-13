import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-footer-loading',
  templateUrl: './footer-loading.component.html',
  styleUrls: ['./footer-loading.component.scss'],
})
export class FooterLoadingComponent implements OnInit {
  @Input("loading")
  loading: string;
  constructor() { }

  ngOnInit() {}

}
