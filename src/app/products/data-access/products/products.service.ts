import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseHttpService } from '../../../shared/data-access/base-http.service';
import {
  ExistStockResponse,
  Product,
  ResponseProduct,
} from '../../../shared/interfaces/product.interface';

@Injectable({ providedIn: 'root' })
export class ProductsService extends BaseHttpService {
  getProducts(
    page: number,
    size: number,
    categoriaId: number,
    nombre: string,
    sortBy = 'precio',
    sortDirection = 'asc',
  ): Observable<ResponseProduct> {
    return this.http.get<ResponseProduct>(
      `${this.apiUrl}/productos/pagination`,
      {
        params: {
          size,
          page,
          categoriaId,
          nombre,
          sortBy,
          sortDirection,
        },
      },
    );
  }

  getProduct(id: string): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/productos/${id}`);
  }

  verificarStock(id: string, cantidad: number): Observable<ExistStockResponse> {
    return this.http.get<ExistStockResponse>(
      `${this.apiUrl}/productos/verificar-stock?productoId=${id}&cantidad=${cantidad}`,
    );
  }
}
