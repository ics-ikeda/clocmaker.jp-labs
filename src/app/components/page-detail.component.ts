import {ItemData} from '../data/item-data';
import {DataService} from '../service/data.service';
import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import {animate, state, style, transition, trigger} from '@angular/animations';
import 'rxjs/add/operator/switchMap';
import {SoundService} from '../service/sound.service';


@Component({
  selector: 'app-page-detail',
  template: `
    <div class="detailPage" [ngClass]="{showing: _playingTransition == true}">
      <div *ngIf="data" [ngClass]="{show : !_isLoading}">

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
          <div *ngIf="_isLoading" class="loading">
            <i class="fa fa-refresh"></i> Now Loading...
          </div>

          <h1 class="header-detail-h1"
              [@animateStateH1]="_transitionState">
            {{data.title}}
            <span class="content-type">{{data.type}}</span>
          </h1>

          <app-header-author></app-header-author>
        </nav>

        <div class="main-content" [@transitionState]="_transitionState">
          <iframe [src]="_iframeUrl" (load)="onLoad()"></iframe>
        </div>

        <app-site-footer
          meta="{{data.date}} - This work is build with {{data.technology.join(', ')}}.">
        </app-site-footer>
      </div>
    </div>`,
  host: {'[@routerTransition]': ''},
  animations: [
    trigger('routerTransition', [
      state('void', style({})),
      state('*', style({})),
      transition(':enter', [
        style({opacity: 0.0}),
        animate('0.5s ease-in-out', style({opacity: 1.0}))
      ]),
      transition(':leave', [
        style({opacity: 1.0}),
        animate('0.5s ease-in-out', style({opacity: 0.0}))
      ])
    ]),
    trigger('transitionState', [
      state('hide', style({
        filter: `brightness(0%)`
      })),
      state('show', style({
        filter: `brightness(100%)`
      })),
      transition('hide => show', animate('0.5s ease-in')),
      transition('show => hide', animate('0.5s ease-out'))
    ]),
    trigger('animateStateH1', [
      state('hide', style({
        opacity: 0,
        transform: `translate(-10px, 0)`
      })),
      state('show', style({
        opacity: 1,
        transform: `translate(0px, 0)`
      })),
      transition('hide => show', animate('0.5s cubic-bezier(0, 0, 0, 1)')),
      transition('show => hide', animate('0.5s cubic-bezier(0, 0, 0, 1)')),
    ])
  ]
})

export class DetailPageComponent implements OnInit {

  @Input() data: ItemData;

  @Output() private close = new EventEmitter();


  _isLoading = false;
  _transitionState = 'hide';
  _playingTransition = false;
  _iframeUrl: SafeResourceUrl;
  _id: string = null;

  constructor(private _dataService: DataService,
              private _router: Router,
              private _route: ActivatedRoute,
              private _sanitizer: DomSanitizer,
              private _sound: SoundService) {
  }

  ngOnInit() {

    this._route.params
      .switchMap((params: Params) => this._dataService.getDetail(params['id']))
      .subscribe((data: ItemData) => {
        if (data != null) {

          requestAnimationFrame(() => {

            this._transitionState = 'hide';

            console.log(this._id);
            console.log(this._id === null);
            const delay = (this._id === null)
              ? 0
              : 500;

            setTimeout(() => {
              this.data = data;
              this._updateVideoUrl();
              this._transitionState = 'show';

              this._id = data.id;
            }, delay);
          });
        } else {
          this._router.navigate(['']);
        }
      });

    this._isLoading = true;

    if (window['ga']) {
      window['ga']('send', 'pageview', location.pathname);
    }
  }

  _updateVideoUrl(): void {
    this._iframeUrl =
      this._sanitizer.bypassSecurityTrustResourceUrl(this.data.demo);
  }

  private onLoad() {
    // 画面更新の予備のため、1ターンだけ待つ
    requestAnimationFrame(() => {
      this._isLoading = false;
    });
  }

  private onClick() {
    this._sound.playClickSound();
    this._router.navigate(['']);
  }

  private onRollOver() {
    this._sound.playMouseOverSound();
  }

  private onClickPrev() {
    this._gotoPage(-1);
  }

  private onClickNext() {
    this._gotoPage(+1);
  }

  private _gotoPage(pageShift: number) {
    this._sound.playClickSound();

    const id = this._id;
    const index = this._dataService.getIndex(id);
    const dataItem = this._dataService.getItemAt(index + pageShift);

    this._router.navigate(
      [
        '/works',
        dataItem.id
      ]
    );
  }

  routerOnActivate(nextInstruction, prevInstruction) {

    console.log('routerOnActivate', 'start');
    this._playingTransition = true;

    return new Promise((res, rej) => {
      requestAnimationFrame(() => {
        this._playingTransition = false;

        console.log('routerOnActivate', 'end');
        res('Now ready.');
      });
    }).then();
  }

  routerOnDeactivate(nextInstruction, prevInstruction) {
    this._playingTransition = true;
    console.log('routerOnDeactivate', 'start');

    return new Promise((res, rej) => {
      setTimeout(() => {
        this._playingTransition = false;
        console.log('routerOnDeactivate', 'end');
        res('Now ready.');
      }, 5000);
    }).then();
  }
}
