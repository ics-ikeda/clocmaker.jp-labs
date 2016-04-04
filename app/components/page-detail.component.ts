import {Component, EventEmitter} from "angular2/core";
import {OnInit} from "angular2/core";
import {OnActivate} from "angular2/router";
import {OnDeactivate} from "angular2/router";
import {Router, RouteParams} from "angular2/router";
import {CanDeactivate, ComponentInstruction} from 'angular2/router';
import {ViewChild} from "angular2/core";
import {AfterViewInit} from "angular2/core";
import {FooterComponent} from "./footer.component";
import {HeaderAuthorComponent} from "./header-author.component";
import {ShuffleText} from "../effects/ShuffleText";
import Sound = createjs.Sound;

import {ItemData} from "../data/item-data";
import {DataService} from "../service/data.service";

@Component({
  selector: "page-detail",
  template: `
  <div class="detailPage" [ngClass]="{showing: playingTransition == true}">
    <div *ngIf="data" [ngClass]="{show : !isLoading}" >

      <nav class="myNavi">
        <div class="header-detail-ui">

          <div class="btn-back"
            style="margin-right: 10px;"
            (mouseenter)="onRollOver()"
            (click)="onClick()">
            <i class="fa fa-th"></i><span class="btn-label-prev">TOP</span>
          </div>

          <div class="btn-back"
            style="margin-right: 1px;"
            (mouseenter)="onRollOver()"
            (click)="onClickPrev()">
            <i class="fa fa-chevron-left"></i><span class="btn-label-prev">PREV</span>
          </div>
          <div class="btn-back"
            (mouseenter)="onRollOver()"
            (click)="onClickNext()">
            <span class="btn-label-next">NEXT</span><i class="fa fa-chevron-right"></i>
          </div>
        </div>
        <div *ngIf="isLoading" class="loading">
          <i class="fa fa-refresh"></i> Now Loading...
        </div>

        <h1 #textTitle class="header-detail-h1">{{data.title}} <span class="content-type">{{data.type}}</span></h1>

        <!-- <header-author></header-author> -->
      </nav>

      <div class="main-content">
        <iframe src="{{data.demo}}" (load)="onLoad()"></iframe>
      </div>

      <site-footer meta="{{data.date}} - This work is build with {{data.technology.join(', ')}}."></site-footer>
    </div>
  </div>`,
  styles: [`

  `],
  directives: [FooterComponent, HeaderAuthorComponent],
  inputs: ["data"],
  events: ["close"]
})

export class DetailPageComponent implements OnInit, AfterViewInit, OnActivate, OnDeactivate  {

  private data:ItemData;
  private close = new EventEmitter();
  private isLoading:boolean = false;
  private _textShuffleTitle:ShuffleText;
  private playingTransition:boolean = false;

  @ViewChild("textTitle") textTitle;

  constructor(private _dataService:DataService,
              private _router:Router,
              private _routeParams:RouteParams) {
  }

  ngOnInit() {
    let id = this._routeParams.get("id");

    this._dataService.getDetail(id).then(data => {
      if (data != null) {
        this.data = data;
      } else {
        this._router.navigate(["Top"]);
      }
    });
    this.isLoading = true;


    window["ga"]('send', 'pageview', location.pathname);
  }

  ngAfterViewInit() {
    //this._textShuffleTitle = new ShuffleText(this.textTitle.nativeElement);
    //this._textShuffleTitle.setText(this.data.title);
    //this._textShuffleTitle.start();
  }

  private onClick() {
    Sound.play("click");
    this._router.navigate(["Top"]);
  }

  private onLoad() {
    // 画面更新の予備のため、1ターンだけ待つ
    requestAnimationFrame(()=>{
      this.isLoading = false;
    });
  }

  private onRollOver() {
    Sound.play("over", Sound.INTERRUPT_ANY, 0, 0, 0, 0.3);
  }

  private onClickPrev() {
    this.gotoPage(-1);
  }

  private onClickNext() {
    this.gotoPage(+1);
  }

  private gotoPage(pageShift:number) {
    Sound.play("click");

    let id = this._routeParams.get("id");
    let index = this._dataService.getIndex(id);

    let dataItem = this._dataService.getItemAt(index + pageShift);

    this._router.navigate(
        [
          "Detail",
          {id: dataItem.id}
        ]
    );

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
      }, 200);
    }).then();
  }
}