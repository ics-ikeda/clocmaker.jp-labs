import {Component, AfterViewInit, OnInit, OnDestroy} from '@angular/core';
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
  host: {'[@routerTransition]': ''},
  animations: [
    trigger('routerTransition', [
      transition(':enter', [
        style({}),
        animate('1.5s ease-in-out', style({}))
      ]),
      transition(':leave', [
        style({}),
        animate('1.5s ease-in-out', style({}))
      ])
    ]),
    trigger('animateStateH1', [
      state('void', style({
        opacity: 1,
        transform: `translate(300px, 0)`
      })),
      state('show', style({
        opacity: 1,
        transform: `translate(0px, 0)`
      })),
      transition('void => show', animate('0.5s cubic-bezier(0, 0, 0, 1)')),
      transition('show => void', animate('0.5s ease')),
    ])
  ],
  providers: []
})
export class ListPageComponent implements OnInit, AfterViewInit, OnDestroy {

  _viewInited: string = null;
  _playingTransition = false;
  _data: ItemData[];
  private _event;

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


    this._event = this._router.events.subscribe(event => {
      console.log(event);

      this._viewInited = null;

      if (event.constructor.name === 'NavigationStart') {
        console.log((<any>event).url.indexOf('/works'));
        if ((<any>event).url.indexOf('/works') === 0) {
          console.log('⭐');
          this._viewInited = null;
        }
      }
    });
  }

  ngAfterViewInit() {
    requestAnimationFrame(() => {
      this._viewInited = 'show';
    });


  }

  ngOnDestroy() {
    this._event.unsubscribe();
  }

}
