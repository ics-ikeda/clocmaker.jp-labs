import { Component, AfterViewInit, OnInit, OnDestroy, HostBinding } from '@angular/core';
import {NavigationStart, Router} from '@angular/router';
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
    trigger('routerTransition', [
      transition(':enter', [
        style({}),
        animate('0.5s ease-in-out', style({}))
      ]),
      transition(':leave', [
        style({}),
        animate('0.5s ease-in-out', style({}))
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
export class ListPageComponent implements OnInit, AfterViewInit {

  viewInited: string | null = null;

  itemDataList?: ItemData[];

  @HostBinding('@routerTransition') routerTransition = true;

  constructor(private dataService: DataService) {
  }

  ngOnInit(): void{
    if ((globalThis as any).ga) {
      (globalThis as any).ga('send', 'pageview', location.pathname);
    }

    this.dataService.getJson().then((items) => {
      this.itemDataList = items;
    });
  }

  ngAfterViewInit(): void{
    requestAnimationFrame(() => {
      this.viewInited = 'show';
    });
  }
}
