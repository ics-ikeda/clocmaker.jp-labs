import {ItemData} from '../data/item-data';

import {AfterViewInit, Component, Input, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import ShuffleText from 'shuffle-text';

import Sound = createjs.Sound;

@Component({
  selector: 'app-item',
  template: `
    <div class="thumb" (mouseenter)="onMouseOver()" (mouseleave)="onMouseOut()" (click)="onClick()" [ngClass]="{show : isRollOver}">
      <div class="imgContainer">
        <img src="{{data.img}}" width="460" height="200" (load)="onLoadComplete()" [ngClass]="{show : !isLoadComplete}">
        <div class="imgRollOver"></div>
      </div>

      <div class="meta">
        <div #textTitle class="title">{{data.title}}</div>
        <div #textDate class="date">{{data.date}}</div>
      </div>
    </div>
    <div>
      <a class="btnLink" *ngIf="data.blog_ja != null"
         (mouseenter)="playSoundRollOver()"
         (click)="playSoundClick()"
         href="{{data.blog_ja}}" target="_blank">
        MORE - JP
      </a>
      <a class="btnLink" *ngIf="data.blog_en != null"
         (mouseenter)="playSoundRollOver()"
         (click)="playSoundClick()"
         href="{{data.blog_en}}" target="_blank">
        MORE - EN
      </a>
    </div>
  `
})

export class ListItemComponent implements AfterViewInit {
  @Input() public data: ItemData;

  @ViewChild('textTitle') textTitle;
  @ViewChild('textDate') textDate;

  private _shuffleTextTitle: ShuffleText;
  private _shuffleTextDate: ShuffleText;
  private isRollOver = false;
  private isLoadComplete = false;

  constructor(private _router: Router) {

  }

  ngAfterViewInit() {
    this._shuffleTextTitle = new ShuffleText(this.textTitle.nativeElement);
    this._shuffleTextDate = new ShuffleText(this.textDate.nativeElement);

    this._shuffleTextTitle.emptyCharacter = '---';
    this._shuffleTextDate.emptyCharacter = '---';
  }

  private onMouseOver(): void {
    this._shuffleTextTitle.start();
    this._shuffleTextDate.start();

    this.playSoundRollOver();

    this.isRollOver = true;
  }

  private onMouseOut(): void {
    this._shuffleTextTitle.start();
    this._shuffleTextDate.start();

    this.isRollOver = false;
  }

  private onClick(): void {

    this.playSoundClick();
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

  private onLoadComplete(): void {
    this.isLoadComplete = true;
  }

  private playSoundRollOver(): void {
    Sound.play('over', Sound.INTERRUPT_ANY, 0, 0, 0, 0.3);
  }

  private playSoundClick(): void {
    Sound.play('click');
  }

}
