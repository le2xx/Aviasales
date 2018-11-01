import {Component} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Tickets} from 'src/app/common/interfaces/tickets';
import {Ticket} from 'src/app/common/interfaces/ticket';
import {CurrencyStatus} from 'src/app/common/interfaces/currency-status';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  data: Ticket[] = [];
  currency: CurrencyStatus = {symbol: '₽', status: true, date: 1};

  filteredData(newData: Ticket[]) {
    this.data = newData;
  }

  newCurrencyData(newCurrency: CurrencyStatus) {
    this.currency = newCurrency;
  }
}
