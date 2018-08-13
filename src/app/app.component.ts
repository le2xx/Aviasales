import { Component } from '@angular/core';
// @ts-ignore
import json from '../assets/json/tickets.json';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  tickets: any = json.tickets.slice();
  get data(): object {
    return this.tickets.sort((a, b) => a.price - b.price);
  }
}
