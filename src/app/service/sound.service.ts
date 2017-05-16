import {Injectable} from '@angular/core';

/// <reference path="../../../node_modules/@types/soundjs/index.d.ts" />
// 効かないので仕方なくdeclareで…
declare const createjs: any;

@Injectable()
export class SoundService {
  constructor() {

    createjs.Sound.registerSound('assets/sounds/BtnOverSound.mp3', 'over');
    createjs.Sound.registerSound('assets/sounds/BtnClickSound.wav', 'click');
  }

  public playClickSound(): void {
    createjs.Sound.play('click');
  }

  public playMouseOverSound(): void {
    createjs.Sound.play('over', createjs.Sound.INTERRUPT_ANY, 0, 0, 0, 0.3);
  }

}
