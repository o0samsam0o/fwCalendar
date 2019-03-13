import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'constToArray'
})
export class ConstToArrayPipe implements PipeTransform {

  transform(data: Object) {
    const keys = Object.keys(data);
    return keys;
  }

}
