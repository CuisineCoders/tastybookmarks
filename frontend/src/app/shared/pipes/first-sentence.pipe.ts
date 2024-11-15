import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'firstSentence',
    standalone: true
})
export class FirstSentencePipe implements PipeTransform {

    public transform(value: string): string {
        if (!value) return ''; // Falls der Wert leer ist
        const index = value.indexOf('.');
        return index !== -1 ? value.substring(0, index) : value; // Schneidet bis vor den ersten Punkt
    }

}
