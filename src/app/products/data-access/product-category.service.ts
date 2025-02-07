import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseHttpService } from '../../shared/data-access/base-http.service';
import { ProducCategory } from '../../shared/interfaces/product-category.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductCategoryService extends BaseHttpService {
  getCategories(): Observable<ProducCategory[]> {
    return this.http.get<ProducCategory[]>(`${this.apiUrl}/categorias`);
  }

}
