import Sound = createjs.Sound;
import {Component, OnInit} from '@angular/core';
import {DataService} from '../service/data.service';


@Component({
  selector: 'app-root',
  template: `
    <router-outlet></router-outlet>
    <!--<sns></sns>-->
  `,
  providers: [DataService]
})

export class AppComponent implements OnInit {
  constructor(private _dataService: DataService) {
    Sound.registerSound('assets/sounds/BtnOverSound.mp3', 'over');
    Sound.registerSound('assets/sounds/BtnClickSound.wav', 'click');
  }

  ngOnInit() {
    this._dataService.getJson().then(items => {
    });
  }
}
