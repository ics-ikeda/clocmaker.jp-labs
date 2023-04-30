import { Injectable } from '@angular/core';
import { Howl, Howler } from 'howler';

@Injectable()
export class SoundService {
  private _howl: Howl;
  private _howlClick: Howl;
  constructor() {
    this._howl = new Howl({
      src: ['assets/sounds/tap_04.wav'],
    });

    this._howlClick = new Howl({
      src: ['assets/sounds/toggle_on.wav'],
    });
  }

  public playClickSound(): void {
    this._howlClick.play();
  }

  public playMouseOverSound(): void {
    this._howl.play();
  }
}
