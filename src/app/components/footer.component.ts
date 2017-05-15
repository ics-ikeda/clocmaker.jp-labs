import {Component, AfterViewInit, ViewChild, Input} from '@angular/core';
import ShuffleText from 'shuffle-text';


@Component({
  selector: 'app-site-footer',
  template: `
    <footer>
      <div class="pull-md-left hidden-sm-down" style="margin-left:10px;">
        <span #metaElement><i class="fa fa-code"></i> {{meta}}</span>
      </div>
      <div class="pull-md-right">
        <span class="created">All works are created by <a href="https://twitter.com/clockmaker" target="_blank">Yasunobu Ikeda</a>.</span>
        <span class="copyright"> &copy; {{_year}} <a href="http://clockmaker.jp/blog">clockmaker.jp</a></span>
      </div>
    </footer>`,
  styles: [`
  `]
})

export class FooterComponent implements AfterViewInit {
  @Input() meta: string;
  _year: number;
  _textShuffleMeta: ShuffleText;

  @ViewChild('metaElement') metaElement;

  constructor() {
    this._year = new Date().getFullYear();
  }

  ngAfterViewInit() {
// this._textShuffleMeta = new ShuffleText(this.metaElement.nativeElement);
// this._textShuffleMeta.duration = 500;
// this._textShuffleMeta.sourceRandomCharacter = "";
//  this._textShuffleMeta.emptyCharacter = ".";
//  this._textShuffleMeta.setText(this.meta);
// this._textShuffleMeta.start();
  }
}
