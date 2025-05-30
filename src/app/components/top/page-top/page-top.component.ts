import { AfterViewInit, Component, HostBinding, OnInit } from '@angular/core';
import { DataService } from '../../../service/data.service';
import type { ItemData } from '../../../data/item-data';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { CommonModule } from '@angular/common';
import { FooterComponent } from '../../common/footer/footer.component';
import { WorkItemComponent } from '../work-item/work-item.component';

@Component({
  selector: 'app-page-list',
  standalone: true,
  imports: [CommonModule, FooterComponent, WorkItemComponent],
  templateUrl: './page-top.html',
  styleUrls: [`./page-top.scss`, `../../common/header/header.scss`],
  animations: [
    trigger('routerTransition', [
      transition(':enter', [style({}), animate('0.5s ease-in-out', style({}))]),
      transition(':leave', [style({}), animate('0.5s ease-in-out', style({}))]),
    ]),
    trigger('animateStateH1', [
      state(
        'void',
        style({
          opacity: 1,
          transform: `translate(300px, 0)`,
        }),
      ),
      state(
        'show',
        style({
          opacity: 1,
          transform: `translate(0px, 0)`,
        }),
      ),
      transition('void => show', animate('0.5s cubic-bezier(0, 0, 0, 1)')),
      transition('show => void', animate('0.5s ease')),
    ]),
  ],
  providers: [],
})
export class ListPageComponent implements OnInit, AfterViewInit {
  viewInited: string | null = null;

  itemDataList?: ItemData[];

  @HostBinding('@routerTransition') routerTransition = true;

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    if ((globalThis as any).ga) {
      (globalThis as any).ga('send', 'pageview', location.pathname);
    }

    this.dataService.getJson().then((items) => {
      this.itemDataList = items;
    });
  }

  ngAfterViewInit(): void {
    requestAnimationFrame(() => {
      this.viewInited = 'show';
    });
  }
}
