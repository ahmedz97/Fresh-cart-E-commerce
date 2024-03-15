import { Pipe, PipeTransform } from '@angular/core';
import { productData } from '../interfaces/Product';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {
  transform(productsList: productData[], searchTitle: string): productData[] {
    return productsList.filter((el) => el.title.toLowerCase().includes(searchTitle.toLowerCase()))
  }
}
