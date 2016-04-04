import {Component} from "angular2/core";
import {AfterViewInit} from "angular2/core";
import {ShuffleText} from "../effects/ShuffleText";
import {ViewChild} from "angular2/core";

@Component({
  selector: "site-footer",
  template: `
  <footer>
    <div class="pull-md-left hidden-sm-down" style="margin-left:10px;">
      <span #metaElement><i class="fa fa-code"></i> {{meta}}</span>
    </div>
    <div class="pull-md-right">
      <span class="created">All works are created by <a href="https://twitter.com/clockmaker" target="_blank">Yasunobu Ikeda</a>.</span>
      <span class="copyright"> &copy; {{year}} <a href="http://clockmaker.jp/blog">clockmaker.jp</a></span>
    </div>
  </footer>`,
  styles: [`
  `],
  inputs: ["meta"]
})

export class FooterComponent implements AfterViewInit {
  private meta:string;
  private year:number;
  private _textShuffleMeta:ShuffleText;

  @ViewChild("metaElement") metaElement;

  constructor() {
    this.year = new Date().getFullYear();
  }

  ngAfterViewInit(){
    //this._textShuffleMeta = new ShuffleText(this.metaElement.nativeElement);
    //this._textShuffleMeta.duration = 500;
    //this._textShuffleMeta.sourceRandomCharacter = "";
    //this._textShuffleMeta.emptyCharacter = ".";
    //this._textShuffleMeta.setText(this.meta);
    //this._textShuffleMeta.start();
  }
}