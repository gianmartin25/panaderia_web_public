import { Injectable, inject } from '@angular/core';
import { Product } from '../../shared/interfaces/product.interface';
import { signalSlice } from 'ngxtension/signal-slice';
import { Subject, catchError, map, of, startWith, switchMap } from 'rxjs';
import { ProductsService } from './products/products.service';

interface State {
  products: Product[];
  status: 'loading' | 'success' | 'error';
  totalPages: number;
  currentPage: number;
  totalItems: number;
  categoriaId: number;
}

interface StatePage {
  page: number;
  size: number;
  categoriaId: number;
  nombre: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProductsStateService {
  private productsService = inject(ProductsService);

  private initialState: State = {
    products: [],
    status: 'loading' as const,
    currentPage: 1,
    totalItems: 0,
    totalPages: 0,
    categoriaId: 0,
  };

  changePage$ = new Subject<StatePage>();

  loadProducts$ = this.changePage$.pipe(
    startWith({ page: 1, size: 5, categoriaId: 0, nombre: '' }),
    switchMap(({ page, size, categoriaId, nombre }) => this.productsService.getProducts(page, size, categoriaId, nombre).pipe(
      map((productResponse) => ({
        ...productResponse,
        status: 'success' as const,
        currentPage: page, // actualizamos la página actual
      })),
      catchError(() => {
        return of({
          ...this.initialState,
          status: 'error' as const,
        });
      })
    ))
  );

  state = signalSlice({
    initialState: this.initialState,
    sources: [
      this.loadProducts$,
    ],
  });

  changePage(statePage: StatePage) {
    this.changePage$.next(statePage);
  }
}