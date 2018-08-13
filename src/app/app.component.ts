import { Component, OnInit, OnDestroy, Input, Output } from '@angular/core';
// @ts-ignore
import json from '../assets/json/tickets.json';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  data: object = json.tickets;
}
