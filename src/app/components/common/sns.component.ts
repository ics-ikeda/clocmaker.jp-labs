import { AfterViewInit, Component } from '@angular/core';

@Component({
  selector: 'app-sns',
  templateUrl: 'sns.html',
  styleUrls: [`./sns.scss`],
})
export class SnsComponent implements AfterViewInit {
  constructor() {}

  ngAfterViewInit(): void {
    const langLong = 'ja_JP';

    ((d, s: 'script', id) => {
      let js: HTMLScriptElement;
      const fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {
        return;
      }
      js = d.createElement(s);
      js.id = id;
      js.src = 'https://b.st-hatena.com/js/bookmark_button.js';
      fjs.parentNode?.insertBefore(js, fjs);
    })(document, 'script', 'hatena');

    ((d: Document, s: 'script', id) => {
      let js: HTMLScriptElement;
      const fjs = d.getElementsByTagName(s)[0];
      const p = /^http:/.test(d.location.toString()) ? 'http' : 'https';
      if (!d.getElementById(id)) {
        js = d.createElement(s);
        js.id = id;
        js.src = p + '://platform.twitter.com/widgets.js';
        fjs.parentNode?.insertBefore(js, fjs);
      }
    })(document, 'script', 'twitter-wjs');

    ((d, s: 'script', id) => {
      let js: HTMLScriptElement;
      const fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {
        return;
      }
      js = d.createElement(s);
      js.id = id;
      js.src = `//connect.facebook.net/${langLong}/sdk.js#xfbml=1&version=v2.5&appId=566926136738876`;
      fjs.parentNode?.insertBefore(js, fjs);
    })(document, 'script', 'facebook-jssdk');
  }
}
