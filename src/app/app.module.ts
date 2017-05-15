import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import {RouterModule} from '@angular/router';
import {ListPageComponent} from './components/page-list.component';
import {DetailPageComponent} from './components/page-detail.component';
import {SnsComponent} from './components/sns.component';
import {ListItemComponent} from './components/list-item.component';
import {FooterComponent} from './components/footer.component';
import {HeaderAuthorComponent} from './components/header-author.component';
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
    HttpModule,
    BrowserAnimationsModule,
    // NoopAnimationsModule,
    RouterModule.forRoot([
      {
        path: '',
        component: ListPageComponent
      },
      {
        path: 'works/:id',
        component: DetailPageComponent
      }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
