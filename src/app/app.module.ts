import {HttpClientModule} from '@angular/common/http';
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';

import {RouterModule} from '@angular/router';
import {ListPageComponent} from './components/top/page-top.component';
import {DetailPageComponent} from './components/detail/page-detail.component';
import {SnsComponent} from './components/common/sns.component';
import {ListItemComponent} from './components/top/list-item.component';
import {FooterComponent} from './components/common/footer.component';
import {HeaderAuthorComponent} from './components/common/header-author.component';
import {AppComponent} from './components/app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    SnsComponent,
    ListPageComponent,
    ListItemComponent,
    DetailPageComponent,
    FooterComponent,
    HeaderAuthorComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    RouterModule.forRoot([
    {
        path: '',
        component: ListPageComponent
    },
    {
        path: 'works/:id',
        component: DetailPageComponent
    }
], { relativeLinkResolution: 'legacy' })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
