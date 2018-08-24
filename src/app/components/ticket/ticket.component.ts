import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css']
})
export class TicketComponent {
  @Input() ticket: any[];
  @Input() currency: object;

  stops: string[] = ['ПЕРЕСАДОК', 'ПЕРЕСАДКА', 'ПЕРЕСАДКИ', 'ПЕРЕСАДКИ'];
}
