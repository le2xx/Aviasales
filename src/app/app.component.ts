import {Component, OnInit} from '@angular/core';
// @ts-ignore
import json from './common/json/tickets.json';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  tickets = json.tickets.slice();
  data: object;
  currency = {symbol: '₽', status: true, date: 1};

  ngOnInit() {
    this.dataInit();
  }

  filteredData(newData: any) {
    this.data = newData;
  }

  newCurrencyData(newCurrency: any) {
    this.currency = newCurrency;
  }

  dataInit() {
    this.data = this.tickets.sort((a, b) => a.price - b.price);
  }
}
