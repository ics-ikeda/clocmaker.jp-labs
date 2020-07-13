import {Component, Input, ViewChild} from '@angular/core';

@Component({
  selector: 'app-site-footer',
  templateUrl: './footer.html',
  styleUrls: [
    './footer.scss'
  ]
})

export class FooterComponent {
  @Input() meta!: string;
  year: number;

  constructor() {
    this.year = new Date().getFullYear();
  }
}
