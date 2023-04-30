import { ItemData } from '../../../data/item-data';

import { AfterViewInit, Component, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import ShuffleText from 'shuffle-text';

import { SoundService } from '../../../service/sound.service';

@Component({
  selector: 'app-work-item',
  templateUrl: './work-item.html',
  styleUrls: [`./work-item.scss`],
})
export class WorkItemComponent implements AfterViewInit {
  @Input() data!: ItemData;

  @ViewChild('textTitle', { static: true }) textTitle: any;
  @ViewChild('textDate', { static: true }) textDate: any;

  shuffleTextTitle!: ShuffleText;
  shuffleTextDate!: ShuffleText;
  isRollOver = false;
  isLoadComplete = false;

  constructor(private router: Router, private soundService: SoundService) {}

  ngAfterViewInit(): void {
    this.shuffleTextTitle = new ShuffleText(this.textTitle.nativeElement);
    this.shuffleTextDate = new ShuffleText(this.textDate.nativeElement);

    this.shuffleTextTitle.emptyCharacter = '---';
    this.shuffleTextDate.emptyCharacter = '---';
  }

  _onMouseOver(): void {
    this.shuffleTextTitle.start();
    this.shuffleTextDate.start();

    this._playSoundRollOver();

    this.isRollOver = true;
  }

  _onMouseOut(): void {
    this.shuffleTextTitle.start();
    this.shuffleTextDate.start();

    this.isRollOver = false;
  }

  _onClick(): void {
    this._playSoundClick();
    // ページ幅を見て挙動をかえる
    if (window.innerWidth < 768) {
      // タブレット未満のサイズであれば
      const win = window.open(this.data.demo);
      if (win) {
        win.focus();
      }
    } else {
      this.router.navigate(['/works', this.data.id]);
    }
  }

  _onLoadComplete(): void {
    this.isLoadComplete = true;
  }

  _playSoundRollOver(): void {
    this.soundService.playMouseOverSound();
  }

  _playSoundClick(): void {
    this.soundService.playClickSound();
  }
}
