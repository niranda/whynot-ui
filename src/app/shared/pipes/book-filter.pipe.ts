import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'bookFilter'
})
export class BookFilterPipe implements PipeTransform {

  transform(value: any, searchValue: string): any {
    if (!searchValue) return value;
    return value.filter((v: any) => 
    {        
      return v.title.toLowerCase().includes(searchValue.toLowerCase()) ||
      v.author.toLowerCase().includes(searchValue.toLowerCase())
    })
  }

}
