import {Component, OnInit} from '@angular/core';
// @ts-ignore
import json from './common/json/tickets.json';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  tickets: any[] = json.tickets.slice();
  data: object = null;
  currency: object = {symbol: '₽', status: true, date: 1};

  ngOnInit() {
    this.dataInit();
  }

  filteredData(newData: object) {
    this.data = newData;
  }

  newCurrencyData(newCurrency: object) {
    this.currency = newCurrency;
  }

  dataInit() {
    this.data = this.tickets.sort((a, b) => a.price - b.price);
  }
}
