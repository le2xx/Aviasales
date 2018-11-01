import {Component, Input} from '@angular/core';
import {CurrencyStatus} from '../../common/interfaces/currency-status';
import {Ticket} from '../../common/interfaces/ticket';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css']
})
export class TicketComponent {
  @Input() ticket: Ticket;
  @Input() currency: CurrencyStatus;

  stops: string[] = ['ПЕРЕСАДОК', 'ПЕРЕСАДКА', 'ПЕРЕСАДКИ', 'ПЕРЕСАДКИ'];
}
