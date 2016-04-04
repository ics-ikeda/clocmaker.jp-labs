import "es6-shim";
import "reflect-metadata";
import "rxjs/Rx";
import "zone.js/dist/zone"

import {bootstrap}        from 'angular2/platform/browser'
import {HTTP_PROVIDERS}   from "angular2/http";
import {ROUTER_PROVIDERS} from 'angular2/router'
import {APP_BASE_HREF} from "angular2/router";
import {bind} from "angular2/core";
import {enableProdMode} from "angular2/core";
import {AppComponent} from './components/app.component';

// -----------------------------------------------
// 本番環境のみ適用
// -----------------------------------------------
let baseUrl:string = "";
if (location.href.indexOf("http://clockmaker.jp") > -1) {
  enableProdMode();
  baseUrl = "/labs/";
} else {
  baseUrl = "/160101_angular2/";
}

bootstrap(AppComponent,
    [
      HTTP_PROVIDERS,
      ROUTER_PROVIDERS,
      bind(APP_BASE_HREF).toValue(baseUrl)
    ]
);
