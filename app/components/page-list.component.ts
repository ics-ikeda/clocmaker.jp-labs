import {Component, OnInit, AfterViewInit} from 'angular2/core';
import {ItemData}          from '../data/item-data';
import {DataService}       from '../service/data.service';
import {ListItemComponent} from "./list-item.component";
import {Router, RouteParams, ROUTER_PROVIDERS} from 'angular2/router'
import {ViewChild} from "angular2/core";
import {FooterComponent} from "./footer.component";
import {HeaderAuthorComponent} from "./header-author.component";
import {OnActivate, OnDeactivate} from "angular2/router";
import {ComponentInstruction} from "angular2/router";


@Component({
  selector: 'page-list',
  template: `
  <div class="topPage" [ngClass]="{showing: playingTransition == true}">
    <nav class="myNavi">
      <div class="header-h1-top">
        <h1  [ngClass]="{show : viewInited}" >ClockMaker Labs</h1>
      </div>
      <!-- <header-author></header-author> -->
    </nav>

    <div class="main-content">
      <h2 class="subTitle"><img src="_labs/images/title.png" width="358" height="34" alt="Interaction Design &times; Web Technology" /></h2>

      <div class="my-hero">
        <div class="container-fluid my-main-area">
          <div id="contentListHTML5" class="row">
            <item *ngFor="#dataItem of _dataService.data"
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
  directives: [ListItemComponent, FooterComponent, HeaderAuthorComponent],
  providers: []
})
export class ListPageComponent implements OnInit, AfterViewInit, OnActivate, OnDeactivate {
  constructor(private _dataService:DataService,
              private _router:Router) {
  }

  private viewInited:boolean = false;
  private playingTransition:boolean = false;

  ngOnInit() {
    window["ga"]('send', 'pageview', location.pathname);
  }

  ngAfterViewInit() {
    requestAnimationFrame(()=> {
      this.viewInited = true;
    })
  }

  routerOnActivate(nextInstruction:ComponentInstruction, prevInstruction:ComponentInstruction) {

    this.playingTransition = true;

    return new Promise((res, rej) => {
      setTimeout(() => {
        this.playingTransition = false;
        res('Now ready.');
      }, 16);
    }).then();
  }

  routerOnDeactivate(nextInstruction:ComponentInstruction, prevInstruction:ComponentInstruction) {
    this.playingTransition = true;

    return new Promise((res, rej) => {
      setTimeout(() => {
        this.playingTransition = false;
        res('Now ready.');
      }, 300);
    }).then();
  }
}