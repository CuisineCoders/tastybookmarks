import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'durationFormat',
  standalone: true,
})
export class DurationFormatPipe implements PipeTransform {

  transform(value: string): string {
    if (!value.startsWith('P')) {
      return value;
    }

    const regexToExtractDuration = /P(?:(\d+)D)?T(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/;
    const matches = value.match(regexToExtractDuration);

    if (!matches) {
      return value;
    }

    const units = [
      { value: parseInt(matches[1] || '0', 10), singular: 'Tag', plural: 'Tage' },
      { value: parseInt(matches[2] || '0', 10), singular: 'Stunde', plural: 'Stunden' },
      { value: parseInt(matches[3] || '0', 10), singular: 'Minute', plural: 'Minuten' },
      { value: parseInt(matches[4] || '0', 10), singular: 'Sekunde', plural: 'Sekunden' },
    ];

    return units
      .filter(({ value }) => value > 0)
      .map(({ value, plural, singular }) => `${value} ${value > 1 ? plural : singular}`)
      .join(' ');
  }
}
