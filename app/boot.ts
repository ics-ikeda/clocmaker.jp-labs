import {bootstrap}        from 'angular2/platform/browser'
import {HTTP_PROVIDERS}   from "angular2/http";
import {provide}          from 'angular2/core';
import {ROUTER_PROVIDERS, LocationStrategy, HashLocationStrategy} from 'angular2/router'
import {AppComponent}     from './components/app.component';
import {PathLocationStrategy} from "angular2/router";
import {APP_BASE_HREF} from "angular2/router";
import {ROUTER_PRIMARY_COMPONENT} from "angular2/router";
import {bind} from "angular2/core";
import {enableProdMode} from "angular2/core";

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
