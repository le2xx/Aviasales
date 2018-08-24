import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {
  urlCurrency = 'https://www.cbr-xml-daily.ru/daily_json.js';

  currencyStatus = {
    rub: {symbol: '₽', status: true, date: 1},
    usd: {symbol: '$', status: false, date: null},
    eur: {symbol: '€', status: false, date: null}
  };

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
    this.currencyStatus.usd.date = date['Valute'].USD.Value;
    this.currencyStatus.eur.date = date['Valute'].EUR.Value;
  }

  noModifiedData() {
    this.noFilterData = this.data.slice();
  }

  checkCurrency(currency: string) {
    switch (currency) {
      case 'rub':
        this.currencyStatus.rub.status = true;
        this.currencyStatus.usd.status = false;
        this.currencyStatus.eur.status = false;
        break;
      case 'usd':
        this.currencyStatus.rub.status = false;
        this.currencyStatus.usd.status = true;
        this.currencyStatus.eur.status = false;
        break;
      case 'eur':
        this.currencyStatus.rub.status = false;
        this.currencyStatus.usd.status = false;
        this.currencyStatus.eur.status = true;
        break;
      default:
    }
    this.currency.emit(this.currencyStatus[currency]);
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
