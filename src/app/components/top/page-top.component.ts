import {Component, AfterViewInit, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {DataService} from '../../service/data.service';
import {ItemData} from '../../data/item-data';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-page-list',
  template: `
    <div class="topPage" [ngClass]="{showing: _playingTransition == true}">
      <nav class="my-navi">
        <div class="header-h1-top">
          <h1 [@animateStateH1]="_viewInited">ClockMaker Labs</h1>
        </div>
        <!--<app-header-author></app-header-author>-->
      </nav>

      <div class="main-content">
        <h2 class="subTitle">
          <img src="assets/images/title.png" width="358" height="34" alt="Interaction Design &times; Web Technology"/>
        </h2>

        <div class="my-hero">
          <div class="container-fluid my-main-area">
            <div id="contentListHTML5" class="row">
              <div data-component="item"
                   *ngFor="let dataItem of _data"
                   [data]="dataItem"
                   class="list-item col-xs-6 col-sm-4 col-md-3 col-lg-2 col-xl-2"
              ></div>
            </div>
          </div>
        </div>
      </div>

      <app-site-footer meta="This website is build with Angular 4. "></app-site-footer>
    </div>
  `,
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
