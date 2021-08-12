import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tabla',
})
export class TablaPipe implements PipeTransform {
  transform(value: unknown, ...args: string[]): unknown {
    let tipo: string = args[0];
    tipo = tipo?.split('[')[1]?.split(']')[0];
    // console.log(value, tipo);

    switch (tipo) {
      case '$':
        return typeof value == 'number' ? value.toFixed(0) + ' $' : 0 + ' $';
      case '%':
        return typeof value == 'number' ? value.toFixed(1) + '%' : 0 + '%';
      case 'días':
        return typeof value == 'number' ? value.toFixed(1) : 0;
      case undefined:
        return typeof value == 'number'
          ? value % 1 != 0
            ? value.toFixed(1)
            : value
          : value;

      default:
        break;
    }
    return value;
  }
}
