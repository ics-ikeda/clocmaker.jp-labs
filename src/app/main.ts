require("../node_modules/createjs-soundjs/lib/soundjs-0.6.2.min.js");
require("../node_modules/core-js/client/shim.min.js");
require("../node_modules/zone.js/dist/zone.js");
require("../node_modules/reflect-metadata/Reflect.js");



import {platformBrowserDynamic} from "@angular/platform-browser-dynamic";
import {AppModule} from "./app.module";





// -----------------------------------------------
// 本番環境のみ適用
// -----------------------------------------------
// let baseUrl:string = "";
// if (location.href.indexOf("http://clockmaker.jp") > -1) {
//   enableProdMode();
//   baseUrl = "/labs/";
// } else {
//   baseUrl = "/160101_angular2/";
// }

const platform = platformBrowserDynamic();

platform.bootstrapModule(AppModule);


//
//
// bootstrap(AppComponent,
//     [
//       HTTP_PROVIDERS,
//       ROUTER_PROVIDERS,
//       bind(APP_BASE_HREF).toValue(baseUrl)
//     ]
// );


