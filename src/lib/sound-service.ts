import { Howl } from 'howler';

export class SoundService {
  private _howlOver: Howl;
  private _howlClick: Howl;

  constructor() {
    this._howlOver = new Howl({
      src: ['/sounds/tap_03.wav'],
      volume: 0.33,
    });

    this._howlClick = new Howl({
      src: ['/sounds/toggle_on.wav'],
      volume: 0.5,
    });
  }

  public playClickSound(): void {
    this._howlClick.play();
  }

  public playMouseOverSound(): void {
    this._howlOver.play();
  }
}
