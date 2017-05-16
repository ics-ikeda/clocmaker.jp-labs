import {ItemData} from '../../data/item-data';
import {DataService} from '../../service/data.service';
import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import {animate, state, style, transition, trigger} from '@angular/animations';
import 'rxjs/add/operator/switchMap';
import {SoundService} from '../../service/sound.service';


@Component({
  selector: 'app-page-detail',
  templateUrl: './page-detail.html',
  host: {'[@routerTransition]': ''},
  animations: [
    trigger('routerTransition', [
      transition(':enter', [
        style({opacity: 0.0}),
        animate('0.5s ease-in-out', style({opacity: 1.0}))
      ]),
      transition(':leave', [
        style({}),
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
  ],
  styleUrls: [
    '../common/header.scss',
    './page-detail.scss',
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

  private _updateVideoUrl(): void {
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
}
