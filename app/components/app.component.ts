import {Component, OnInit} from 'angular2/core';
import {Route, RouteConfig, RouterOutlet, ROUTER_DIRECTIVES, ROUTER_PROVIDERS, Location, LocationStrategy, HashLocationStrategy} from 'angular2/router'
import {ItemData} from '../data/item-data';
import {DataService} from '../service/data.service';
import {ListPageComponent} from "./page-list.component";
import {DetailPageComponent} from "./page-detail.component";
import {SnsComponent} from "./sns.component";
import Sound = createjs.Sound;

@Component({
  selector: 'my-app',
  template: `
    <router-outlet></router-outlet>
    <sns></sns>
	`,
  directives: [RouterOutlet, SnsComponent],
  providers: [DataService]
})


@RouteConfig([
  new Route({
    useAsDefault: true,
    path: '/',
    component: ListPageComponent,
    name: 'Top'
  }),
  new Route({
    path: '/works/:id',
    component: DetailPageComponent,
    name: 'Detail'
  }),
])

export class AppComponent implements OnInit {
  constructor(private _dataService:DataService) {
    Sound.registerSound("_labs/sounds/BtnOverSound.mp3", "over");
    Sound.registerSound("_labs/sounds/BtnClickSound.wav", "click");
  }

  ngOnInit() {
    this._dataService.getJson().then(items => {
    });
  }
}