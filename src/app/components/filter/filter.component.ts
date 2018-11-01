import {Component, Output, EventEmitter} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CurrencyStatus} from 'src/app/common/interfaces/currency-status';
import {Ticket} from 'src/app/common/interfaces/ticket';
import {Tickets} from '../../common/interfaces/tickets';
import {Valutes} from '../../common/interfaces/valutes';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent {
  urlCurrency = 'https://www.cbr-xml-daily.ru/daily_json.js';
  urlJsonFile = 'src/app/common/json/tickets.json';

  currencyStatus = {
    rub: {symbol: '₽', status: true, date: 1},
    usd: {symbol: '$', status: false, date: null},
    eur: {symbol: '€', status: false, date: null}
  };

  filterStatus = {
    all: {status: true, filterCallBack: item => item},
    no: {status: true, filterCallBack: item => item.stops === 0},
    one: {status: true, filterCallBack: item => item.stops === 1},
    two: {status: true, filterCallBack: item => item.stops === 2},
    tree: {status: true, filterCallBack: item => item.stops === 3}
  };

  data: Ticket[] = [];
  @Output() filteredData = new EventEmitter<Ticket[]>();
  @Output() currency = new EventEmitter<CurrencyStatus>();

  constructor(private currencyApi: HttpClient, private jsonFileApi: HttpClient) {
    this.currencyApi.get(this.urlCurrency).subscribe((date: Valutes) => this.addCurrencyStatus(date));

    this.jsonFileApi.get(this.urlJsonFile).subscribe((date: Tickets) => {
      this.data = date.tickets.sort((a, b) => a.price - b.price);
      this.filteredData.emit(this.data);
    });
  }

  addCurrencyStatus(date: Valutes) {
    this.currencyStatus.usd.date = date.Valute.USD.Value;
    this.currencyStatus.eur.date = date.Valute.EUR.Value;
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
    let result = [];

    const filterSelect = (select: string) => {
      return this.filterStatus[select].status;
    };

    const filterData = (select: string) => {
      const callBack = this.filterStatus[select].filterCallBack;
      return this.data.filter(callBack);
    };

    if (stop === 'all') {
      this.filterStatus.all.status = !this.filterStatus.all.status;
      this.filterStatus.no.status = this.filterStatus.all.status;
      this.filterStatus.one.status = this.filterStatus.all.status;
      this.filterStatus.two.status = this.filterStatus.all.status;
      this.filterStatus.tree.status = this.filterStatus.all.status;

      this.filterStatus.all.status ? result = this.data : result = [];

      return this.filteredData.emit(result);
    }

    this.filterStatus[stop].status = !this.filterStatus[stop].status;

    result = [].concat(
      filterSelect('no') ? filterData('no') : [],
      filterSelect('one') ? filterData('one') : [],
      filterSelect('two') ? filterData('two') : [],
      filterSelect('tree') ? filterData('tree') : []
    );

    return this.filteredData.emit(result.sort((a, b) => a.price - b.price));
  }
}
