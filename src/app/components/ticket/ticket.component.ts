import {Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css']
})
export class TicketComponent implements OnInit {
  @Input() ticket;
  @Input() currency;

  stops = ['ПЕРЕСАДОК', 'ПЕРЕСАДКА', 'ПЕРЕСАДКИ', 'ПЕРЕСАДКИ'];

  constructor() {
  }

  ngOnInit() {
  }
}
