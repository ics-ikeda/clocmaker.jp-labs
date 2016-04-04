import {Component} from "angular2/core";
import Sound = createjs.Sound;
@Component({
  selector: "header-author",
  template: `
    <div class="header-author hidden-xs-down">
      <a href="https://twitter.com/clockmaker"
        target="_blank" class="btn-back"
        title="Twitter"
        (mouseenter)="onRoll0ver()"
        (click)="onClick()">
          <i class="fa fa-twitter"></i>
      </a>
      <span class="m-l-1">&nbsp;</span>
      <a href="https://www.facebook.com/clockmaker.jp"
        target="_blank"
        class="btn-back"
        title="Facebook"
        (mouseenter)="onRoll0ver()"
        (click)="onClick()">
          <i class="fa fa-facebook"></i>
      </a>
      <span class="m-l-1">&nbsp;</span>
      <a href="https://www.flickr.com/photos/clockmaker-jp/"
        target="_blank"
        class="btn-back"
        title="Flickr"
        (mouseenter)="onRoll0ver()"
        (click)="onClick()">
         <i class="fa fa-flickr"></i>
      </a>
    </div>`
})

export class HeaderAuthorComponent {

  private onRoll0ver():void {
    Sound.play("over", Sound.INTERRUPT_ANY, 0, 0, 0, 0.3);
  }

  private onClick():void {
    Sound.play("click");
  }

}