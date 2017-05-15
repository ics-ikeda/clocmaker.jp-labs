import {Component, OnInit} from '@angular/core';
import {DataService} from '../service/data.service';
import {SoundService} from '../service/sound.service';


@Component({
  selector: 'app-root',
  template: `
    <router-outlet></router-outlet>
    <app-sns></app-sns>
  `,
  providers: [DataService, SoundService]
})

export class AppComponent implements OnInit {
  constructor(private _dataService: DataService) {

  }

  ngOnInit() {
    this._dataService.getJson().then(items => {
    });
  }
}
