import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { ProductsService } from './products.service';
import {
  Product,
  ResponseProduct,
} from '../../../shared/interfaces/product.interface';

describe('ProductsService', () => {
  let service: ProductsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [ProductsService],
    });

    service = TestBed.inject(ProductsService);
  });

  it('debería ser creado', () => {
    expect(service).toBeTruthy();
  });

  it('debería obtener la lista de productos con paginación', (done: DoneFn) => {
    service.getProducts(1, 2, 1, '').subscribe(
      (response: ResponseProduct) => {
        expect(response).toBeTruthy();
        expect(response.products.length).toBeGreaterThan(0);
        done();
      },
      (error) => {
        fail('No se pudo obtener la lista de productos: ' + error.message);
        done();
      },
    );
  });

  it('debería obtener un producto por ID', (done: DoneFn) => {
    service.getProduct('1').subscribe(
      (product: Product) => {
        expect(product).toBeTruthy();
        expect(product.id).toBe(1);
        done();
      },
      (error) => {
        fail('No se pudo obtener el producto: ' + error.message);
        done();
      },
    );
  });

  it('deberia obtener productos por nombre', (done: DoneFn) => {
    service.getProducts(1, 2, 1, 'Torta').subscribe(
      (response: ResponseProduct) => {
        expect(response).toBeTruthy();
        expect(response.products.length).toBeGreaterThan(0);
        expect(response.products[0].nombre).toContain('Torta');
        done();
      },
      (error) => {
        fail('No se pudo obtener la lista de productos: ' + error.message);
        done();
      },
    );
  });
});
