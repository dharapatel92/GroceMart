import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'singleCallFunction'
})
export class SingleCallFunctionPipe implements PipeTransform {
  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }
}
