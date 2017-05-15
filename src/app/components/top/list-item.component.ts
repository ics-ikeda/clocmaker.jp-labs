import {ItemData} from '../../data/item-data';

import {AfterViewInit, Component, Input, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import ShuffleText from 'shuffle-text';

import {SoundService} from '../../service/sound.service';

@Component({
  selector: 'div[data-component="item"]',
  template: `
    <div class="item thumb" (mouseenter)="_onMouseOver()" (mouseleave)="_onMouseOut()" (click)="_onClick()" [ngClass]="{show : isRollOver}">
      <div class="imgContainer">
        <img src="{{data.img}}" width="460" height="200" (load)="_onLoadComplete()" [ngClass]="{show : !isLoadComplete}">
        <div class="imgRollOver"></div>
      </div>

      <div class="meta">
        <div #textTitle class="title">{{data.title}}</div>
        <div #textDate class="date">{{data.date}}</div>
      </div>
    </div>
    <div>
      <a class="btnLink" *ngIf="data.blog_ja != null"
         (mouseenter)="_playSoundRollOver()"
         (click)="_playSoundClick()"
         href="{{data.blog_ja}}" target="_blank">
        MORE - JP
      </a>
      <a class="btnLink" *ngIf="data.blog_en != null"
         (mouseenter)="_playSoundRollOver()"
         (click)="_playSoundClick()"
         href="{{data.blog_en}}" target="_blank">
        MORE - EN
      </a>
    </div>
  `,
  styleUrls: [
    `./list-item.scss`
  ]
})

export class ListItemComponent implements AfterViewInit {
  @Input() data: ItemData;

  @ViewChild('textTitle') textTitle;
  @ViewChild('textDate') textDate;

  _shuffleTextTitle: ShuffleText;
  _shuffleTextDate: ShuffleText;
  isRollOver = false;
  isLoadComplete = false;

  constructor(private _router: Router,
              private _sound: SoundService) {

  }

  ngAfterViewInit() {
    this._shuffleTextTitle = new ShuffleText(this.textTitle.nativeElement);
    this._shuffleTextDate = new ShuffleText(this.textDate.nativeElement);

    this._shuffleTextTitle.emptyCharacter = '---';
    this._shuffleTextDate.emptyCharacter = '---';
  }

  _onMouseOver(): void {
    this._shuffleTextTitle.start();
    this._shuffleTextDate.start();

    this._playSoundRollOver();

    this.isRollOver = true;
  }

  _onMouseOut(): void {
    this._shuffleTextTitle.start();
    this._shuffleTextDate.start();

    this.isRollOver = false;
  }

  _onClick(): void {

    this._playSoundClick();
    // ページ幅を見て挙動をかえる
    if (window.innerWidth < 768) { // タブレット未満のサイズであれば
      const win = window.open(this.data.demo);
      win.focus();
    } else {
      this._router.navigate(
        [
          '/works',
          this.data.id
        ]
      );
    }
  }

  _onLoadComplete(): void {
    this.isLoadComplete = true;
  }

  _playSoundRollOver(): void {
    this._sound.playMouseOverSound();
  }

  _playSoundClick(): void {
    this._sound.playClickSound();
  }

}
