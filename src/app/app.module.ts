import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {FilterComponent} from './components/filter/filter.component';
import {TicketComponent} from './components/ticket/ticket.component';
import {HttpClientModule} from '@angular/common/http';
import {DateTransformPipe} from './common/pipes/date-transform.pipe';
import {PriceTransformPipe} from './common/pipes/price-transform.pipe';


@NgModule({
  declarations: [
    AppComponent,
    FilterComponent,
    TicketComponent,
    DateTransformPipe,
    PriceTransformPipe,
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
