import { Pipe, PipeTransform } from '@angular/core';
import { Transaction } from '../interfaces/transaction.interface';

@Pipe({
  name: 'calcIncomes'
})
export class CalcIncomesPipe implements PipeTransform {

  transform(value: Transaction[], type: 'income' | 'outcome'): number {
    let toReturn = 0;
    value.forEach(val => {
      if (val.type === type) {
        toReturn += val.amount;
      }
    })
    return toReturn;
  }

}
