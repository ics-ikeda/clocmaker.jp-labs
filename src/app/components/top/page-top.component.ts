import {Component, AfterViewInit, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {DataService} from '../../service/data.service';
import {ItemData} from '../../data/item-data';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-page-list',
  templateUrl: './page-top.html',
  styleUrls: [
    `./page-top.scss`,
    `../common/header.scss`,
  ],
  animations: [
    trigger('animateStateH1', [
      state('init', style({
        opacity: 0,
        transform: `translate(10px, 0)`
      })),
      state('show', style({
        opacity: 1,
        transform: `translate(0px, 0)`
      })),
      transition(':enter', animate('0.2s cubic-bezier(0, 0, 0, 1)'))
    ])
  ],
  providers: []
})
export class ListPageComponent implements OnInit, AfterViewInit {

  _viewInited: string = null;
  _playingTransition = false;
  _data: ItemData[];

  constructor(private _dataService: DataService,
              private _router: Router) {
  }

  ngOnInit() {
    if (window['ga']) {
      window['ga']('send', 'pageview', location.pathname);
    }


    this._dataService.getJson().then((items) => {
      this._data = items;
    });
  }

  ngAfterViewInit() {
    requestAnimationFrame(() => {
      this._viewInited = 'show';
    });
  }

}
