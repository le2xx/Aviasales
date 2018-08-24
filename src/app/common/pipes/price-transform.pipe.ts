import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'priceTransform'
})
export class PriceTransformPipe implements PipeTransform {

  transform(value: number, currency: number, args?: any): any {
    const date = Math.round((value / currency) * 100) / 100;
    const price = String(date).split('').reverse();
    price.splice(3, 0, ' ');
    return String(price.reverse().join(''));
  }

}
