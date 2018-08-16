import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {
  urlCurrency = 'https://www.cbr-xml-daily.ru/daily_json.js';

  currencyStatus = [
    {name: 'rub', symbol: '₽', status: true, date: 1},
    {name: 'usd', symbol: '$', status: false, date: null},
    {name: 'eur', symbol: '€', status: false, date: null}
  ];

  filterStatus: object = {
    all: {status: false, filterColl: item => item, data: []},
    no: {status: false, filterColl: item => item.stops === 0, data: []},
    one: {status: false, filterColl: item => item.stops === 1, data: []},
    two: {status: false, filterColl: item => item.stops === 2, data: []},
    tree: {status: false, filterColl: item => item.stops === 3, data: []}
  };

  noFilterData: any;
  @Input() data: any;
  @Output() filteredData = new EventEmitter<any>();
  @Output() currency = new EventEmitter<any>();

  constructor(private http: HttpClient) {
  }

  ngOnInit() {
    this.noModifiedData();
    this.getCurrencyData();
  }

  getCurrencyData() {
    this.http.get(this.urlCurrency).subscribe(date => this.addCurrencyStatus(date));
  }

  addCurrencyStatus(date) {
    this.currencyStatus[1].date = date['Valute'].USD.Value;
    this.currencyStatus[2].date = date['Valute'].EUR.Value;
  }

  noModifiedData() {
    this.noFilterData = this.data.slice();
  }

  checkCurrency(currency: string) {
    this.currencyStatus.map((item) => item.name === currency ? item.status = true : item.status = false);
    this.currency.emit(this.currencyStatus.find(item => item.status));
  }

  filterStops(stop: string) {
    let result: any;
    this.filterStatus[stop].status = !this.filterStatus[stop].status;

    if (this.filterStatus[stop].status) {
      this.filterStatus[stop].data = this.noFilterData.filter(this.filterStatus[stop].filterColl);
    } else {
      this.filterStatus[stop].data = [];
    }

    if (this.filterStatus['all'].status) {
      return this.filteredData.emit(this.noFilterData);
    }

    result = [].concat(this.filterStatus['all'].data, this.filterStatus['no'].data, this.filterStatus['one'].data,
      this.filterStatus['two'].data, this.filterStatus['tree'].data);

    if (result.length === 0) {
      result = this.noFilterData;
    }

    this.filteredData.emit(result.sort((a, b) => a.price - b.price));
  }
}
