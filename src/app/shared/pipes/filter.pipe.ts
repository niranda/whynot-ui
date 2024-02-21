import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, searchValue: string): any {
    if (!searchValue) return value;
    return value.filter((v: any) => 
    {
      return v.firstName.toLowerCase().includes(searchValue.toLowerCase()) ||
      v.lastName.toLowerCase().includes(searchValue.toLowerCase())
    })
  }

}
