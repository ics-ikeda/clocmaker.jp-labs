/// <reference path="../libs/soundjs/soundjs.d.ts" />

import {ShuffleText} from '../effects/ShuffleText';
import {ItemData} from '../data/item-data';
import {DataService} from '../service/data.service';
import {
  Component,
  HostBinding,
  OnInit,
  AfterViewInit,
  ViewChild,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import Sound = createjs.Sound;
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'page-detail',
  template: `
    <div class="detailPage" [ngClass]="{showing: playingTransition == true}">
      <div *ngIf="data" [ngClass]="{show : !isLoading}" [@heroState]="heroState">

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

          <h1 #textTitle class="header-detail-h1" [@animateStateH1]="heroState">{{data.title}}
            <span class="content-type">{{data.type}}</span></h1>

          <!-- <header-author></header-author> -->
        </nav>

        <div class="main-content">
          <iframe [src]="iframeUrl" (load)="onLoad()"></iframe>
        </div>

        <site-footer meta="{{data.date}} - This work is build with {{data.technology.join(', ')}}."></site-footer>
      </div>
    </div>`,
  animations: [
    trigger('routeAnimation', [
      state('*',
        style({
          opacity: 1,
          // transform: 'translateX(0)'
        })
      ),
      transition(':enter', [
        style({
          opacity: 0,
          // transform: 'translateX(-100%)'
        }),
        animate('500ms ease-out')
      ]),
      transition(':leave', [
        animate('0.5s ease-out', style({
          opacity: 0,
          // transform: 'translateY(100%)'
        }))
      ])
    ]),
    trigger('heroState', [
      state('init', style({
        backgroundColor: '#eee'
      })),
      state('show', style({
        backgroundColor: '#cfd8dc'
      })),
      transition('inactive => active', animate('1000ms ease-in')),
      transition('active => inactive', animate('1000ms ease-out'))
    ]),
    trigger('animateStateH1', [
      state('init', style({
        opacity: 0,
        transform: `translate(-10px, 0)`
      })),
      state('show', style({
        opacity: 1,
        transform: `translate(0px, 0)`
      })),
      transition('init => show', animate('0.6s cubic-bezier(0, 0, 0, 1)'))
    ])
  ]
})

export class DetailPageComponent implements OnInit, AfterViewInit {

  @Input() private data: ItemData;

  @Output() private close = new EventEmitter();

  @HostBinding('@routeAnimation') get routeAnimation() {
    return true;
  }


  private isLoading: boolean = false;
  private heroState: string = 'init';
  private _textShuffleTitle: ShuffleText;
  private playingTransition: boolean = false;
  private iframeUrl: SafeResourceUrl;
  private id: string;


  @ViewChild('textTitle') textTitle;

  constructor(private _dataService: DataService,
              private _router: Router,
              private _route: ActivatedRoute,
              private sanitizer: DomSanitizer) {
  }

  ngOnInit() {
    this._route.params.forEach((params: Params) => {
      this.id = params['id'];

      this._dataService.getDetail(this.id).then(data => {
        if (data != null) {
          this.data = data;

          this.updateVideoUrl();
        } else {
          this._router.navigate(['']);
        }
      });
    });

    this.isLoading = true;

    setTimeout(() => {
      this.heroState = 'show';
    }, 0);


    if (window['ga']) {
      window['ga']('send', 'pageview', location.pathname);
    }
  }

  private updateVideoUrl(): void {
    this.iframeUrl =
      this.sanitizer.bypassSecurityTrustResourceUrl(this.data.demo);
  }


  ngAfterViewInit() {
    //this._textShuffleTitle = new ShuffleText(this.textTitle.nativeElement);
    //this._textShuffleTitle.setText(this.data.title);
    //this._textShuffleTitle.start();
  }

  private onClick() {
    Sound.play('click');
    this._router.navigate(['']);
  }

  private onLoad() {
    // 画面更新の予備のため、1ターンだけ待つ
    requestAnimationFrame(() => {
      this.isLoading = false;
    });
  }

  private onRollOver() {
    Sound.play('over', Sound.INTERRUPT_ANY, 0, 0, 0, 0.3);
  }

  private onClickPrev() {
    this.gotoPage(-1);
  }

  private onClickNext() {
    this.gotoPage(+1);
  }

  private gotoPage(pageShift: number) {
    Sound.play('click');

    let id = this.id;
    let index = this._dataService.getIndex(id);

    let dataItem = this._dataService.getItemAt(index + pageShift);

    this._router.navigate(
      [
        '/works',
        dataItem.id
      ]
    );

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
      }, 200);
    }).then();
  }
}
