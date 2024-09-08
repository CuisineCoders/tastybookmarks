import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'kebabCase',
  standalone: true,
})
export class KebabCasePipe implements PipeTransform {
  public transform(value: string): string {
    return value ? value.replace(/\s+/g, '-').toLowerCase() : '';
  }
}
