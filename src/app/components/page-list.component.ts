import {Component, AfterViewInit, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {DataService} from '../service/data.service';
import {ItemData} from '../data/item-data';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'page-list',
  template: `
    <div class="topPage" [ngClass]="{showing: playingTransition == true}">
      <nav class="myNavi">
        <div class="header-h1-top">
          <h1 [@animateStateH1]="viewInited">ClockMaker Labs</h1>
        </div>
        <header-author></header-author>
      </nav>

      <div class="main-content">
        <h2 class="subTitle">
          <img src="_labs/images/title.png" width="358" height="34" alt="Interaction Design &times; Web Technology"/>
        </h2>

        <div class="my-hero">
          <div class="container-fluid my-main-area">
            <div id="contentListHTML5" class="row">
              <item *ngFor="let dataItem of data"
                    [data]="dataItem"
                    class="item col-xs-6 col-sm-4 col-md-3 col-lg-2 col-xl-2"
              ></item>
            </div>
          </div>
        </div>
      </div>

      <site-footer meta="This website is build with Angular 2. "></site-footer>
    </div>
  `,
  styles: [`

  `],
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
  constructor(private _dataService: DataService,
              private _router: Router) {
  }

  private viewInited: string = null;
  private playingTransition: boolean = false;

  private data: ItemData[];


  ngOnInit() {
    if (window['ga']) {
      window['ga']('send', 'pageview', location.pathname);
    }


    this._dataService.getJson().then((items) => {
      this.data = items;
    });
  }

  ngAfterViewInit() {
    requestAnimationFrame(() => {
      this.viewInited = 'show';
    });
  }

  routerOnActivate(nextInstruction, prevInstruction) {

    this.playingTransition = true;

    return new Promise((res, rej) => {
      setTimeout(() => {
        this.playingTransition = false;
        res('Now ready.');
      }, 16);
    }).then();
  }

  routerOnDeactivate(nextInstruction, prevInstruction) {
    this.playingTransition = true;

    return new Promise((res, rej) => {
      setTimeout(() => {
        this.playingTransition = false;
        res('Now ready.');
      }, 300);
    }).then();
  }
}
