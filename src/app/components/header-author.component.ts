import {Component} from '@angular/core';
import {SoundService} from '../service/sound.service';

@Component({
  selector: 'app-header-author',
  template: `
    <div class="header-author hidden-xs-down">
      <a href="https://twitter.com/clockmaker"
         target="_blank" class="btn-back"
         title="Twitter"
         (mouseenter)="_onRollOver()"
         (click)="_onClick()">
        <i class="fa fa-twitter"></i>
      </a>
      <span class="m-l-1">&nbsp;</span>
      <a href="https://www.facebook.com/clockmaker.jp"
         target="_blank"
         class="btn-back"
         title="Facebook"
         (mouseenter)="_onRollOver()"
         (click)="_onClick()">
        <i class="fa fa-facebook"></i>
      </a>
      <span class="m-l-1">&nbsp;</span>
      <a href="https://www.flickr.com/photos/clockmaker-jp/"
         target="_blank"
         class="btn-back"
         title="Flickr"
         (mouseenter)="_onRollOver()"
         (click)="_onClick()">
        <i class="fa fa-flickr"></i>
      </a>
    </div>`
})

export class HeaderAuthorComponent {
  constructor(private _sound: SoundService) {

  }

  _onRollOver(): void {
    this._sound.playMouseOverSound();
  }

  _onClick(): void {
    this._sound.playClickSound();
  }

}
