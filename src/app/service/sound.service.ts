import { Injectable } from '@angular/core';
// import Sound = createjs.Sound;

@Injectable()
export class SoundService {

  constructor() {
    // Sound.registerSound('assets/sounds/BtnOverSound.mp3', 'over');
    // Sound.registerSound('assets/sounds/BtnClickSound.wav', 'click');
  }

  playClickSound(){
    // Sound.play('click');
  }

  playMouseOverSound(){
    // Sound.play('over', Sound.INTERRUPT_ANY, 0, 0, 0, 0.3);
  }

}
