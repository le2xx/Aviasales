import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateTransform'
})
export class DateTransformPipe implements PipeTransform {

  transform(value: string, args?: any): any {
    const months = ['', 'янв', 'фев', 'мар', 'апр', 'май', 'июн', 'июл', 'авг', 'сен', 'окт', 'ноя', 'дек'];
    const days = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];
    const day = Number(value.substr(0, 2));
    const month = Number(value.substr(3, 2));
    const year = Number(value.substr(6, 2));
    const dayWeek = new Date(year + 2000, month - 1, day).getDay();
    return String(`${day} ${months[month]} 20${year}, ${days[dayWeek]}`);
  }

}
