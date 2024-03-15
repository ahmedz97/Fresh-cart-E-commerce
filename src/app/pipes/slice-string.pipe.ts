import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sliceString'
})
export class SliceStringPipe implements PipeTransform {
  transform(str: string, len: number): unknown {
    return str.split(" ").slice(0, len).join(" ");
  }
}
