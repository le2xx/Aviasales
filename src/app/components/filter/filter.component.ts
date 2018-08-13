import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {
  filterStatus: object = {
    all: false,
    no: false,
    one: false,
    two: false,
    tree: false
  };

  constructor() {
  }

  ngOnInit() {
  }

  checkCurency(curency: string) {
    console.log(curency);
  }

  filterStops(stop: string) {
    this.filterStatus[stop] = !this.filterStatus[stop];
    console.log(this.filterStatus);
  }

}
