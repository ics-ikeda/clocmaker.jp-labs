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
  year: number;

  @ViewChild('metaElement', {static: true}) metaElement;

  constructor() {
    this.year = new Date().getFullYear();
  }
}
