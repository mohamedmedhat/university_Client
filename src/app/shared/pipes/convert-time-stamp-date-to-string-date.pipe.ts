import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'convertTimeStampDateToStringDate',
  standalone: true,
})
export class ConvertTimeStampDateToStringDatePipe implements PipeTransform {
  transform(value: Date | string | undefined): string {
    return value ? new Date(value).toLocaleDateString() : 'N/A';
  }
}
