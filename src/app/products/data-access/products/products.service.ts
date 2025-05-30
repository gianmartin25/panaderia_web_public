import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseHttpService } from '../../../shared/data-access/base-http.service';
import { Product, ResponseProduct } from '../../../shared/interfaces/product.interface';


@Injectable({ providedIn: 'root' })
export class ProductsService extends BaseHttpService {
  getProducts(page: number, size: number, categoriaId: number, nombre: string): Observable<ResponseProduct> {
    return this.http.get<ResponseProduct>(`${this.apiUrl}/productos/pagination`, {
      params: {
        size: size,
        page: page,
        categoriaId,
        nombre
      },
    });
  }

  getProduct(id: string): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/productos/${id}`);
  }
}
