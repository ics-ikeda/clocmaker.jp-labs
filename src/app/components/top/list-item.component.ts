import {ItemData} from '../../data/item-data';

import {AfterViewInit, Component, Input, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import ShuffleText from 'shuffle-text';

import {SoundService} from '../../service/sound.service';

@Component({
  selector: 'div[data-component="item"]',
  templateUrl: './list-item.html',
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
