import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { RouterModule } from '@angular/router';
import { ListPageComponent } from './components/top/page-top/page-top.component';
import { DetailPageComponent } from './components/detail/page-detail.component';
import { WorkItemComponent } from './components/top/work-item/work-item.component';
import { FooterComponent } from './components/common/footer/footer.component';
import { AppComponent } from './components/app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    ListPageComponent,
    WorkItemComponent,
    DetailPageComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(
      [
        {
          path: '',
          component: ListPageComponent,
        },
        {
          path: 'works/:id',
          component: DetailPageComponent,
        },
      ],
      {}
    ),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
