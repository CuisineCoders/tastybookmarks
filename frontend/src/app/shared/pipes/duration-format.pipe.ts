import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'durationFormat',
  standalone: true,
})
export class DurationFormatPipe implements PipeTransform {

  transform(value: string): string {
    if (!value || !value.startsWith('P')) {
      return value; // Falls die Eingabe ungültig ist, einfach zurückgeben
    }

    // Regex zur Extraktion von Tagen, Stunden, Minuten und Sekunden
    const regex = /P(?:(\d+)D)?T(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/;
    const matches = value.match(regex);

    if (!matches) {
      return value; // Rückgabe der Originalzeichenkette bei Fehler
    }

    const days = parseInt(matches[1] || '0', 10);
    const hours = parseInt(matches[2] || '0', 10);
    const minutes = parseInt(matches[3] || '0', 10);
    const seconds = parseInt(matches[4] || '0', 10);

    // Aufbau der Ausgabekette
    const parts: string[] = [];
    if (days > 0) {
      parts.push(`${days} Tag${days > 1 ? 'e' : ''}`);
    }
    if (hours > 0) {
      parts.push(`${hours} Stunde${hours > 1 ? 'n' : ''}`);
    }
    if (minutes > 0) {
      parts.push(`${minutes} Minute${minutes > 1 ? 'n' : ''}`);
    }
    if (seconds > 0) {
      parts.push(`${seconds} Sekunde${seconds > 1 ? 'n' : ''}`);
    }

    return parts.join(' ');
  }
}
