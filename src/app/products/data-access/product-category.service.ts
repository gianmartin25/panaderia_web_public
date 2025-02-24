import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseHttpService } from '../../shared/data-access/base-http.service';
import { ProductCategory } from '../../shared/interfaces/product-category.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductCategoryService extends BaseHttpService {
  getCategories(): Observable<ProductCategory[]> {
    return this.http.get<ProductCategory[]>(`${this.apiUrl}/categorias`);
  }

}
