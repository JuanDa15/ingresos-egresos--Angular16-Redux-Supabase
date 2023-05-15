import { Pipe, PipeTransform } from '@angular/core';
import { Transaction } from '../interfaces/transaction.interface';

@Pipe({
  name: 'itemsQuantity'
})
export class ItemsQuantityPipe implements PipeTransform {

  transform(value: Transaction[], type: 'income' | 'outcome'): number {
    return value.filter(item => item.type === type).length
  }

}
