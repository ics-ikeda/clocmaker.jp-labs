import {Component, Input, ViewChild} from '@angular/core';

@Component({
  selector: 'app-site-footer',
  templateUrl: './footer.html',
  styleUrls: [
    './footer.scss'
  ]
})

export class FooterComponent {
  @Input() meta: string;
  _year: number;

  @ViewChild('metaElement') metaElement;

  constructor() {
    this._year = new Date().getFullYear();
  }
}
