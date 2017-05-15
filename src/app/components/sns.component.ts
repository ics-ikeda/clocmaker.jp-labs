import Sound = createjs.Sound;
import {AfterViewInit, Component} from '@angular/core';

@Component({
  selector: 'app-sns',
  template: `
    <div class="header-sns hidden-xs-down">
      <a href="https://twitter.com/share" class="twitter-share-button">Tweet</a>
      <span style="margin-left : 5px "></span>
      <div class="fb-like"
           data-href="http://clockmaker.jp/labs/"
           data-layout="button_count"
           data-action="like"
           data-show-faces="true"
           data-share="false"></div>
      <span style="margin-left : 5px "></span>
      <a href="http://b.hatena.ne.jp/entry/"
         class="hatena-bookmark-button"
         data-hatena-bookmark-layout="simple-balloon"
         data-hatena-bookmark-lang="ja"
         title="このエントリーをはてなブックマークに追加">
        <img src="https://b.st-hatena.com/images/entry-button/button-only@2x.png" 
             alt="このエントリーをはてなブックマークに追加" 
             width="20" height="20" 
             style="border: none;"/>
      </a>
    </div>
  `
})

export class SnsComponent implements AfterViewInit {
  constructor() {
  }

  ngAfterViewInit() {

    const langLong = 'ja_JP';

    (function (d, s, id) {
      let js;
      const fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {
        return;
      }
      js = d.createElement(s);
      js.id = id;
      js.src = 'https://b.st-hatena.com/js/bookmark_button.js';
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'hatena'));

    (function (d: Document, s, id) {
      let js;
      const fjs = d.getElementsByTagName(s)[0];
      const p = /^http:/.test(d.location.toString()) ? 'http' : 'https';
      if (!d.getElementById(id)) {
        js = d.createElement(s);
        js.id = id;
        js.src = p + '://platform.twitter.com/widgets.js';
        fjs.parentNode.insertBefore(js, fjs);
      }
    }(document, 'script', 'twitter-wjs'));

    (function (d, s, id) {
      let js;
      const fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {
        return;
      }
      js = d.createElement(s);
      js.id = id;
      js.src = `//connect.facebook.net/${langLong}/sdk.js#xfbml=1&version=v2.5&appId=566926136738876`;
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
  }
}
