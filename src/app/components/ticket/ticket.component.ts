import {Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css']
})
export class TicketComponent implements OnInit {
  @Input() ticket: object;
  stops: any = ['ПЕРЕСАДОК', 'ПЕРЕСАДКА', 'ПЕРЕСАДКИ', 'ПЕРЕСАДКИ'];
  months: any = ['', 'янв', 'фев', 'мар', 'апр', 'май', 'июн', 'июл', 'авг', 'сен', 'окт', 'ноя', 'дек'];
  week: any = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];

  constructor() {
  }

  ngOnInit() {
  }

  dateTransform(date: string) {
    const day: number = Number(date.substr(0, 2));
    const month: number = Number(date.substr(3, 2));
    const year: number = Number(date.substr(6, 2));
    const dayWeek: any = new Date(year + 2000, month - 1, day).getDay();
    return `${day} ${this.months[month]} 20${year}, ${this.week[dayWeek]}`;
  }

  priceTransform(date: number) {
    const price = String(date).split('').reverse();
    const arr = price.splice(3, 0, ' ');
    return price.reverse().join('');
  }

}
