import { Pipe, PipeTransform } from '@angular/core';
import { Transaction } from '../interfaces/transaction.interface';

@Pipe({
  name: 'calcBalance'
})
export class CalcBalancePipe implements PipeTransform {

  transform(value: Transaction[]): number {
    const incomes = value.filter(item => item.type === 'income').map(({amount}) => amount).reduce((prev, curr) => prev + curr, 0)
    const outcomes = value.filter(item => item.type === 'outcome').map(({amount}) => amount).reduce((prev, curr) => prev + curr, 0)
    return incomes - outcomes;
  }

}
