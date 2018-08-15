import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {
  currencyStatus: object = {
    rub: {status: true, date: 1},
    usd: {status: false, date: null},
    eur: {status: false, date: null},
  };

  filterStatus: object = {
    all: {status: false, filterColl: item => item, data: []},
    no: {status: false, filterColl: item => item.stops === 0, data: []},
    one: {status: false, filterColl: item => item.stops === 1, data: []},
    two: {status: false, filterColl: item => item.stops === 2, data: []},
    tree: {status: false, filterColl: item => item.stops === 3, data: []}
  };

  @Input() data: any;
  noFilterData: any;
  @Output() filteredData = new EventEmitter<any>();

  constructor() {
  }

  ngOnInit() {
    this.etalonData();
  }

  etalonData() {
    this.noFilterData = this.data.slice();
  }

  checkCurrency(currency: string) {
    this.currencyStatus[currency].status = !this.currencyStatus[currency].status;
    console.log(this.currencyStatus);
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
