import {Component, OnInit} from '@angular/core';
// @ts-ignore
import json from '../assets/json/tickets.json';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  tickets: any = json.tickets.slice();
  data: object;

  ngOnInit() {
    this.dataInit();
  }

  filteredData(newData: any) {
    this.data = newData;
  }

  dataInit() {
    this.data = this.tickets.sort((a, b) => a.price - b.price);
  }
}
